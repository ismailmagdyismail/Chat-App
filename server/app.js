const express = require('express');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const xssClean = require('xss-clean');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const morgan  = require('morgan');
const rateLimiter = require('express-rate-limit');

const  app = express();
app.use(morgan('dev'));       /// Logging
app.use(helmet());           /// Add-Protection-Headers
app.use(express.json());    /// Body-Parsing
app.use(cookieParser());   /// HTML-Cookie-Parsing
app.use(mongoSanitize()); /// Prevent-SQL-Injection
app.use(hpp());          /// Prevent-Parameter-Pollution
app.use(xssClean());    /// Prevent Cross-site-forgery

const limiter = rateLimiter({
    max:100,
    windowMs:60*60*1000,
    message:"To many requests from same IP , Try again later",
});
app.use('/',limiter); /// Rate-Limiting




module.exports = app;