const http = require('http');
const fs = require('fs');
const path = require('path');

// Load .env file
if (fs.existsSync('.env')) {
  fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k && v.length) process.env[k.trim()] = v.join('=').trim();
  });
}

const sendEmailHandler = require('./api/send-email.js');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Handle API route: /api/send-email
  if (pathname === '/api/send-email' || pathname === '/api/send-email.js') {
    let bodyData = '';
    req.on('data', chunk => bodyData += chunk);
    req.on('end', () => {
      try {
        req.body = bodyData ? JSON.parse(bodyData) : {};
      } catch {
        req.body = {};
      }

      // Wrap response helpers for serverless function compatibility
      res.status = (code) => {
        res.statusCode = code;
        return {
          json: (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          },
          end: () => res.end(),
        };
      };

      sendEmailHandler(req, res);
    });
    return;
  }

  // Handle Static Files & Clean URLs
  if (pathname === '/') {
    pathname = '/index.html';
  }

  let filePath = path.join(__dirname, pathname);

  // Clean URL support (e.g. /about -> /about.html)
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h2>404 Not Found</h2><p>File ${pathname} does not exist.</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 St. Mother Teresa International School Local Server`);
  console.log(`📍 Local URL:    http://localhost:${PORT}`);
  console.log(`📧 API Endpoint: http://localhost:${PORT}/api/send-email`);
  console.log(`==================================================\n`);
});
