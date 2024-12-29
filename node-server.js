var http = require('http');

const PORT = 3000;
const UPLOAD_DIR = './uploads';

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const filePath = path.join(UPLOAD_DIR, req.url);
    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
      res.writeHead(201);
      res.end('File uploaded successfully!');
    });
  } else if (req.method === 'GET') {
    const filePath = path.join(UPLOAD_DIR, req.url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});