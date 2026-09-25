const nodemailer = require('nodemailer');

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
    const contactPhone = phone || 'Not specified';
    const details = applyingClass || jobPosition || 'N/A';
    const userMessage = message || 'None provided';

    const smtpHost = process.env.GODADDY_SMTP_HOST || 'smtpout.secureserver.net';
    const smtpPort = parseInt(process.env.GODADDY_SMTP_PORT || '465', 10);
    const smtpUser = process.env.GODADDY_EMAIL_USER || 'office@stmtinternationalschool.com';
    const smtpPass = process.env.GODADDY_EMAIL_PASS || 'boroMAABABA123@';
    const receiver = process.env.NOTIFICATION_RECEIVER || 'office@stmtinternationalschool.com';

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
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
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${details}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Phone Number</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">
                  <a href="tel:${contactPhone}" style="color: #0A58CA; text-decoration: none;">${contactPhone}</a>
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
            <p style="margin: 0; font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${userMessage}</p>
          </div>

          <div style="text-align: center;">
            <a href="tel:${contactPhone}" style="display: inline-block; background: #0A58CA; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; font-weight: 700;">
              Call Applicant Now
            </a>
          </div>
        </div>

        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8;">
          This is an automated notification sent from the official website contact form of St. Mother Teresa International School.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"STMT School Website" <${smtpUser}>`,
      to: receiver,
      replyTo: email || smtpUser,
      subject: emailSubject,
      text: `New ${formType} submission:\n\nName: ${name}\nPhone: ${contactPhone}\nDetails: ${details}\nMessage: ${userMessage}`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to dispatch notification email',
    });
  }
};
