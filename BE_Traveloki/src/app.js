require("dotenv").config();

const express = require('express')
// const session = require("express-session");
const morgan = require('morgan')
const compression = require('compression')
const { default : helmet } = require('helmet')
const cors = require('cors');
// const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express()

// Middewares
app.use(cors());
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
app.use('/', require('./routes/index'))

//hanlding errors
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
