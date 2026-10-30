const { createServer } = require('node:http');
const { readFileSync } = require('node:fs');

createServer((_request, response) => {
  response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  response.end(readFileSync('phase1-preview.html'));
}).listen(4173, '127.0.0.1', () => {
  process.stdout.write('Preview ready at http://127.0.0.1:4173\n');
});
