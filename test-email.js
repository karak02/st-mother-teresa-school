const nodemailer = require('nodemailer');
const fs = require('fs');

// Simple .env loader
if (fs.existsSync('.env')) {
  fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k && v.length) process.env[k.trim()] = v.join('=').trim();
  });
}

const config = {
  host: process.env.GODADDY_SMTP_HOST || 'smtpout.secureserver.net',
  port: parseInt(process.env.GODADDY_SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.GODADDY_EMAIL_USER || 'office@stmtinternationalschool.com',
    pass: process.env.GODADDY_EMAIL_PASS,
  },
  receiver: process.env.NOTIFICATION_RECEIVER || 'office@stmtinternationalschool.com',
};

console.log('--- GoDaddy SMTP Test Diagnostic ---');
console.log(`Connecting to: ${config.host}:${config.port} (SSL: ${config.secure})`);
console.log(`Authenticating as: ${config.auth.user}`);
console.log(`Sending test notification to: ${config.receiver}`);
console.log('------------------------------------');

const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: config.auth,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

async function runTest() {
  try {
    console.log('Verifying SMTP transporter connection...');
    await transporter.verify();
    console.log('✅ SMTP connection & authentication verified successfully!');

    console.log('Sending test email message...');
    const info = await transporter.sendMail({
      from: `"St. Mother Teresa International School" <${config.auth.user}>`,
      to: config.receiver,
      replyTo: config.auth.user,
      subject: 'New Admission Enquiry: Test Student',
      text: `New Admission Enquiry:
----------------------------------------
Name: Test Student
Guardian Name: Test Parent
Class: Class 1 (10AM to 4PM)
Phone: +91 98765 43210
Email: parent@example.com
Message / Query:
Testing simple email format delivery.
----------------------------------------
St. Mother Teresa International School Website`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
          <h2 style="margin-top: 0; margin-bottom: 16px; color: #0A58CA; border-bottom: 2px solid #0A58CA; padding-bottom: 8px; font-size: 18px;">
            New Admission Enquiry
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
            <tbody>
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 35%; font-weight: bold;">Name:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">Test Student</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Guardian Name:</td>
                <td style="padding: 6px 0; color: #0f172a;">Test Parent</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Class / Position:</td>
                <td style="padding: 6px 0; color: #0f172a;">Class 1 (10AM to 4PM)</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Phone:</td>
                <td style="padding: 6px 0; color: #0f172a;"><a href="tel:+919876543210" style="color: #0A58CA; text-decoration: none;">+91 98765 43210</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Email:</td>
                <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:parent@example.com" style="color: #0A58CA; text-decoration: none;">parent@example.com</a></td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 12px; margin-bottom: 20px;">
            <p style="margin: 0 0 6px 0; font-weight: bold; color: #64748b; font-size: 13px;">Message / Query:</p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; font-size: 13px; color: #334155; white-space: pre-wrap;">Testing simple email format delivery.</div>
          </div>

          <hr style="margin-top: 20px; margin-bottom: 12px; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">Sent from St. Mother Teresa International School Website</p>
        </div>
      `,
    });

    console.log('🎉 SUCCESS: Test email sent to ' + config.receiver);
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  } catch (error) {
    console.error('❌ FAILED with error:');
    console.error(`Code: ${error.code || 'N/A'}`);
    console.error(`Message: ${error.message}`);
  }
}

runTest();
