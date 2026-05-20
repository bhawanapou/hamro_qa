import http from 'http';
import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), 'mock_site');
const port = process.env.MOCK_PORT ? Number(process.env.MOCK_PORT) : 3000;

function contentType(file) {
  if (file.endsWith('.html')) return 'text/html; charset=utf-8';
  if (file.endsWith('.svg')) return 'image/svg+xml';
  if (file.endsWith('.png')) return 'image/png';
  if (file.endsWith('.js')) return 'application/javascript';
  if (file.endsWith('.css')) return 'text/css';
  return 'application/octet-stream';
}

export function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = req.url.split('?')[0];
    // map known routes to mock html files for deterministic behavior
    let filePath;
    if (urlPath === '/' || urlPath === '/index.html') filePath = path.join(root, 'index.html');
    else if (urlPath.startsWith('/news')) filePath = path.join(root, 'news.html');
    else if (urlPath.startsWith('/calendar')) filePath = path.join(root, 'calendar.html');
    else if (urlPath.startsWith('/notes')) filePath = path.join(root, 'notes.html');
    else filePath = path.join(root, urlPath);
    if (!path.extname(filePath)) {
      const tryHtml = filePath + '.html';
      if (fs.existsSync(tryHtml)) filePath = tryHtml;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType(filePath) });
      res.end(data);
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`Mock site serving ${root} at http://localhost:${port}`);
      resolve(server);
    });
  });
}

if (process.argv[1].endsWith('server.js')) {
  (async () => {
    await startServer();
  })();
}
