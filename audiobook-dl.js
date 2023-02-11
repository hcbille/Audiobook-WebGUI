const { exec } = require('child_process');
const logger = require('./util/logging');

module.exports = (app, credentials) => {
  app.post('/audiobook-dl', (req, res) => {
    const { credentials: selectedCredentials, url } = req.body;
    const { username, password } = credentials[selectedCredentials];

    // Validate URL
    if (!isValidURL(url)) {
      return res.send('Invalid URL');
    }

    const command = `audiobook-dl --username ${username} --password ${password} ${url}`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        logger.info(`Error: ${error.message}`);
        return res.send(`Error: error logged`);
      }
      logger.info(`Command executed: ${command}\n\n${stdout}`);
      res.send(`Command executed!`);
    });
  });
};

function isValidURL(url) {
  const pattern = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
  return pattern.test(url);
}
