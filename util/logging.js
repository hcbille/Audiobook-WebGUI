const winston = require('winston');

// Set up the Winston logger to log to a file
module.exports = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'web-audiobook-dl.log',
      maxSize: 50 * 1024 * 1024, // 50 MB
      maxFiles: 3
    }),
  ]
}
);
