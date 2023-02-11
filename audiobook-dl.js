const { exec } = require('child_process');

module.exports = (app) => {
  app.post('/audiobook-dl', (req, res) => {
    const { username, password, url } = req.body;

    // Validate URL
    if (!isValidURL(url)) {
      return res.send('Invalid URL');
    }

    const command = `audiobook-dl --username ${username} --password ${password} ${url}`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return res.send(`Error: ${error.message}`);
      }

      res.send(`Command executed: ${command}\n\n${stdout}`);
    });
  });
};

function isValidURL(url) {
  // Add your URL validation logic here
  return true;
}
