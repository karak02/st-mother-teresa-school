const https = require('https');
const fs = require('fs');

// Simple .env loader
if (fs.existsSync('.env')) {
  fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k && v.length) process.env[k.trim()] = v.join('=').trim();
  });
}

const token = process.env.AIRTABLE_PAT;
const baseId = process.env.AIRTABLE_BASE_ID || 'appobdzv7otsf1fIF';

if (!token) {
  console.error('Please set AIRTABLE_PAT in your .env file or environment variables.');
  process.exit(1);
}

function apiRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.airtable.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(dataString ? { 'Content-Length': Buffer.byteLength(dataString) } : {})
      }
    }, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseBody);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseBody });
        }
      });
    });

    req.on('error', reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

async function inspect() {
  console.log('Fetching Base schema & tables...');
  const res = await apiRequest(`/v0/meta/bases/${baseId}/tables`);
  console.log('Status:', res.status);
  console.log('Tables:', JSON.stringify(res.data, null, 2));
}

inspect();
