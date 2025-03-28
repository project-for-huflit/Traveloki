require("dotenv").config();

const express = require('express')
// const session = require("express-session");
const morgan = require('morgan')
const compression = require('compression')
const { default : helmet } = require('helmet')
const cors = require('cors');
// const { runConsumer } = require('./config/config.kafka')
// const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express()
// const http = require("http");
// const { Server } = require("socket.io");
// Middewares
// app.use(cors());
app.use(cors({
  origin: [
    'http://localhost:5175',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5181',
    "http://localhost:3000",

    // MY DEPLOY
    'https://traveloki.vercel.app',
    'https://traveloki-dash.vercel.app',
    "https://client-traveloki-ziu9.onrender.com",
    "https://traveloki-dash.onrender.com",
    "https://dash-traveloki-testing.netlify.app",
    "https://dash-traveloki.netlify.app",
    "https://traveloki.netlify.app",

    "https://api-traveloki.onrender.com",

    // NGUYEN
    "https://pointer.io.vn",
    "https://wallet.pointer.io.vn",
    "https://presspay-wallet.vercel.app",
    "https://presspay.vercel.app",

    "https://presspay-api.azurewebsites.net",
    "https://api-presspay.azurewebsites.net",
    "https://api-wallet.pointer.io.vn"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true, // Cho phép credentials (cookies, headers...)
}));
app.use(morgan("dev"))

// app.use(morgan("combined")); // Log HTTP requests

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// app.disable("x-powered-by"); // Hide Express server information

// database
require('./data/init.mongodb')

// routes
app.use('', require('./routes/index'))

// message queue
// runConsumer().catch(console.error)

// hanlding errors
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
  })

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    stack: error.stack,
    message: error.message || 'Internal Server Error!'
  })
})

module.exports = app
