/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');
const handler = require('serve-handler');
const http = require('http');

const FETCH_API = 'http://127.0.0.1:8444';
const DIST = path.join(__dirname, 'dist');

// Windows equivalent of deploy/copy_to_dist.sh
function copyPublicToDist() {
  const copies = [
    { src: 'public', dest: '' },
    { src: 'src/lib/rlottie/rlottie-wasm.wasm', dest: 'rlottie-wasm.wasm' },
    { src: 'node_modules/opus-recorder/dist/decoderWorker.min.wasm', dest: 'decoderWorker.min.wasm' },
    { src: 'node_modules/emoji-data-ios/img-apple-64', dest: 'img-apple-64' },
    { src: 'node_modules/emoji-data-ios/img-apple-160', dest: 'img-apple-160' },
  ];

  for (const { src, dest } of copies) {
    const srcPath = path.join(__dirname, src);
    const destPath = path.join(DIST, dest);
    if (!fs.existsSync(srcPath)) continue;

    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true, force: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyPublicToDist();

const server = http.createServer((req, res) => {
  // Proxy /extract and /files/ to the Fetch API backend
  if (req.url.startsWith('/extract') || req.url.startsWith('/files/')) {
    const proxyReq = http.request(
      `${FETCH_API}${req.url}`,
      { method: req.method, headers: req.headers },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
      },
    );
    proxyReq.on('error', () => {
      res.writeHead(502);
      res.end('Fetch API unavailable');
    });
    req.pipe(proxyReq);
    return;
  }

  // Prevent Cloudflare from caching (small user base, not needed)
  res.setHeader('Cache-Control', 'no-store');

  // Serve static files from dist/ (Telegram uses hash routing, no SPA rewrite needed)
  return handler(req, res, {
    public: 'dist',
  });
});

server.listen(8445);
