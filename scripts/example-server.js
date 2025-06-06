// simple-server.js
import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

const PORT = 9001;
const ROOT = process.cwd();

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = `${ROOT}${parsedUrl.pathname}`;

  fs.stat(pathname, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }
    if (stats.isDirectory()) {
      pathname = path.join(pathname, 'index.html');
    }
    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // Set required headers
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        // Basic content-type
        const ext = path.parse(pathname).ext;
        const map = {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.wasm': 'application/wasm',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
        };
        res.setHeader('Content-type', map[ext] || 'text/plain');
        res.end(data);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
