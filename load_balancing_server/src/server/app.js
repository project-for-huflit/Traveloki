const { createProxyMiddleware } = require('http-proxy-middleware');

// Define backend servers
const servers = [
  { url: 'http://localhost:3000' },
  { url: 'http://localhost:3001' },
  { url: 'http://localhost:3002' },
];

// Create proxy middleware
const proxy = createProxyMiddleware({
  target: servers,
  changeOrigin: true,
  xfwd: true,
  router: (req) => {
    // Select backend server based on a simple round-robin algorithm
    const server = servers.shift();
    servers.push(server);
    return server.url;
  },
});

module.exports = { 
    proxy
}

