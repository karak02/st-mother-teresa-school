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
      subject: '✅ Verification: Auto-Email Form Notifications Active',
      text: 'Congratulations! Your GoDaddy SMTP email configuration is active and working properly. You will now receive automatic email alerts whenever anyone submits a form on your school website.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #0A58CA, #0D9488); padding: 24px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">St. Mother Teresa International School</h2>
            <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Website Form Email Dispatcher</p>
          </div>
          <div style="padding: 24px; color: #334155;">
            <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 16px; margin-bottom: 20px; border-radius: 4px;">
              <p style="margin: 0; font-size: 15px; font-weight: bold; color: #065f46;">
                🎉 SMTP Integration Test Successful!
              </p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #047857;">
                Emails are now ready to be automatically dispatched to your inbox upon form submission.
              </p>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px 16px; margin-bottom: 20px; border-radius: 6px;">
              <p style="margin: 0; font-size: 13px; color: #0f172a;"><strong>SMTP Host:</strong> ${config.host}:${config.port}</p>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #0f172a;"><strong>Sender Mailbox:</strong> ${config.auth.user}</p>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #0f172a;"><strong>Receiver Inbox:</strong> ${config.receiver}</p>
            </div>
            <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
              When any parent or applicant fills out the <strong>Admission Enquiry</strong> or <strong>Career Form</strong> on the website, this mailbox will immediately receive their submitted details.
            </p>
          </div>
          <div style="background: #f1f5f9; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8;">
            © 2026 St. Mother Teresa International School Website Automation
          </div>
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
