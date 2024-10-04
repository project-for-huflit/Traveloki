const http = require('http');
const { proxy } = require('./src/server/app')
// Create load balancer server
const server = http.createServer((req, res) => {
    proxy(req, res);
  });
  
  const port = process.env.PORT || 4000;
  server.listen(port, () => {
    console.log(`Load balancer running on port ${port}`);
  });