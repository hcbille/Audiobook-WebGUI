const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const credentials = require('./credentials.json');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const options = Object.keys(credentials).map(key => {
    return `
      <option value="${key}">${key}</option>
    `;
  }).join('');

  res.send(`
    <form action="/audiobook-dl" method="post">
      <div>
        <label for="credentials">Credentials:</label>
        <select id="credentials" name="credentials">
          ${options}
        </select>
      </div>
      <div>
        <label for="url">URL:</label>
        <input type="text" id="url" name="url" required>
      </div>
      <button type="submit">Submit</button>
    </form>
  `);
});

require('./audiobook-dl')(app, credentials);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
