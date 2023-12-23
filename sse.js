const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
app.use(require("cors")())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('data: Connected\n\n');

  const sendDate = () => {
    res.write(`data: [LOG]:${new Date().getTime().toLocaleString()}\n\n`);
  };

  const intervalId = setInterval(sendDate, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
