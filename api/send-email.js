const nodemailer = require('nodemailer');
const https = require('https');

// Helper to save records directly to Airtable
function saveToAirtable({ baseId, token, tableName, fields }) {
  return new Promise((resolve) => {
    if (!token || !baseId) return resolve(null);

    const payload = JSON.stringify({
      records: [{ fields }]
    });

    const req = https.request({
      hostname: 'api.airtable.com',
      path: `/v0/${baseId}/${encodeURIComponent(tableName)}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 8000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({ status: res.statusCode });
        }
      });
    });

    req.on('error', (err) => {
      console.error('Airtable sync error:', err.message);
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const {
      formType = 'Admission Enquiry',
      studentName,
      guardianName,
      applyingClass,
      applicantName,
      jobPosition,
      phone,
      message,
      email,
    } = req.body || {};

    const name = applicantName || studentName || 'Not specified';
    const contactPhone = phone || '';
    const details = applyingClass || jobPosition || '';
    const userMessage = message || '';

    // GoDaddy SMTP Configuration
    const smtpHost = process.env.GODADDY_SMTP_HOST || 'smtpout.secureserver.net';
    const smtpPort = parseInt(process.env.GODADDY_SMTP_PORT || '465', 10);
    const smtpUser = process.env.GODADDY_EMAIL_USER || 'office@stmtinternationalschool.com';
    const smtpPass = process.env.GODADDY_EMAIL_PASS;
    const receiver = process.env.NOTIFICATION_RECEIVER || 'office@stmtinternationalschool.com';

    // Airtable Configuration
    const airtableToken = process.env.AIRTABLE_PAT;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID || 'appobdzv7otsf1fIF';

    // 1. Send Email Notification
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 15000,
    });

    const emailSubject = `New ${formType}: ${name}`;

    const textContent = `New ${formType} Submission:
----------------------------------------
Name: ${name}
${guardianName ? `Guardian: ${guardianName}\n` : ''}Applying For / Class: ${details || 'N/A'}
Phone: ${contactPhone || 'N/A'}
${email ? `Email: ${email}\n` : ''}
Message / Query:
${userMessage || 'None provided'}
----------------------------------------
St. Mother Teresa International School Website`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <h2 style="margin-top: 0; margin-bottom: 16px; color: #0A58CA; border-bottom: 2px solid #0A58CA; padding-bottom: 8px; font-size: 18px;">
          New ${formType}
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
          <tbody>
            <tr>
              <td style="padding: 6px 0; color: #64748b; width: 35%; font-weight: bold;">Name:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${name}</td>
            </tr>
            ${
              guardianName
                ? `<tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Guardian Name:</td>
                    <td style="padding: 6px 0; color: #0f172a;">${guardianName}</td>
                  </tr>`
                : ''
            }
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Class / Position:</td>
              <td style="padding: 6px 0; color: #0f172a;">${details || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Phone:</td>
              <td style="padding: 6px 0; color: #0f172a;"><a href="tel:${contactPhone}" style="color: #0A58CA; text-decoration: none;">${contactPhone || 'N/A'}</a></td>
            </tr>
            ${
              email
                ? `<tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Email:</td>
                    <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #0A58CA; text-decoration: none;">${email}</a></td>
                  </tr>`
                : ''
            }
          </tbody>
        </table>

        <div style="margin-top: 12px; margin-bottom: 20px;">
          <p style="margin: 0 0 6px 0; font-weight: bold; color: #64748b; font-size: 13px;">Message / Query:</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; font-size: 13px; color: #334155; white-space: pre-wrap;">${userMessage || 'None provided'}</div>
        </div>

        <hr style="margin-top: 20px; margin-bottom: 12px; border: none; border-top: 1px solid #e2e8f0;" />
        <p style="font-size: 11px; color: #94a3b8; margin: 0;">Sent from St. Mother Teresa International School Website</p>
      </div>
    `;

    // 2. Sync to Airtable
    let airtableTableName = 'Admission Enquiries';
    let airtableFields = {};

    if (formType === 'Teaching Career') {
      airtableTableName = 'Career Applications';
      airtableFields = {
        'Applicant Name': name,
        'Position Applied For': jobPosition || details || 'Teaching Faculty',
        'Contact Phone': contactPhone,
        'Email': email || '',
        'Experience & Qualifications': userMessage,
        'Status': 'Applied'
      };
    } else if (formType === 'General Contact') {
      airtableTableName = 'General Enquiries';
      airtableFields = {
        'Full Name': name,
        'Contact Phone': contactPhone,
        'Email': email || '',
        'Query Category': 'Other Enquiry',
        'Message': userMessage,
        'Status': 'Unread'
      };
    } else {
      // Default: Admission Enquiry
      airtableTableName = 'Admission Enquiries';
      airtableFields = {
        'Student Name': name,
        'Guardian Name': guardianName || '',
        'Applying Class': applyingClass || details || 'Class 1 (10AM to 4PM)',
        'Contact Phone': contactPhone,
        'Email': email || '',
        'Message / Query': userMessage,
        'Status': 'New Enquiry'
      };
    }

    // Execute Email and Airtable concurrently
    const [mailResult, airtableResult] = await Promise.allSettled([
      transporter.sendMail({
        from: `"STMT School Website" <${smtpUser}>`,
        to: receiver,
        replyTo: email || smtpUser,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      }),
      saveToAirtable({
        baseId: airtableBaseId,
        token: airtableToken,
        tableName: airtableTableName,
        fields: airtableFields
      })
    ]);

    return res.status(200).json({
      success: true,
      message: 'Form submitted and synchronized successfully',
      emailDelivered: mailResult.status === 'fulfilled',
      airtableSaved: airtableResult.status === 'fulfilled'
    });
  } catch (error) {
    console.error('Submission handling error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to dispatch notification',
    });
  }
};
