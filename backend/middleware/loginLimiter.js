const rateLimit = require('express-rate-limit');
const { logEvents } = require('./logger');

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, //Limit each IP to 5 login requests per 'window' per minute
    message: {message: 'Too many login attempts from this IP. Please try again in after 1 minute.'},
    handler: (req, res) => {
        logEvents('Too many login attempts', 'loginAttempts.log');
        res.status(429).send('Too many login attempts. Please try again in after 1 minute.');
    },
    statusHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;