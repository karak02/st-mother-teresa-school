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

    const emailSubject = `🔔 New ${formType} Submission: ${name}`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #0A58CA 0%, #0D9488 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">St. Mother Teresa International School</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">New Form Submission</p>
        </div>

        <div style="padding: 28px 24px; color: #1e293b;">
          <div style="display: inline-block; background-color: #e0f2fe; color: #0369a1; padding: 6px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700; margin-bottom: 20px;">
            ${formType}
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
            <tbody>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 38%;">Applicant / Student Name</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">${name}</td>
              </tr>
              ${
                guardianName
                  ? `<tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Parent / Guardian Name</td>
                      <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${guardianName}</td>
                    </tr>`
                  : ''
              }
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Applying Class / Role</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${details || 'N/A'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Phone Number</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">
                  <a href="tel:${contactPhone}" style="color: #0A58CA; text-decoration: none;">${contactPhone || 'N/A'}</a>
                </td>
              </tr>
              ${
                email
                  ? `<tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Email Address</td>
                      <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">
                        <a href="mailto:${email}" style="color: #0A58CA; text-decoration: none;">${email}</a>
                      </td>
                    </tr>`
                  : ''
              }
            </tbody>
          </table>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Message / Query:</p>
            <p style="margin: 0; font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${userMessage || 'None provided'}</p>
          </div>

          <div style="text-align: center;">
            <a href="tel:${contactPhone}" style="display: inline-block; background: #0A58CA; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; font-weight: 700;">
              Call Applicant Now
            </a>
          </div>
        </div>

        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8;">
          This is an automated notification sent from the official website of St. Mother Teresa International School.
        </div>
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
        text: `New ${formType} submission:\n\nName: ${name}\nPhone: ${contactPhone}\nDetails: ${details}\nMessage: ${userMessage}`,
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
