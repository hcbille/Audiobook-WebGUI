const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/audiobook-dl" method="post">
      <div>
        <label for="username">Username:</label>
        <select id="username" name="username">
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
          <option value="user3">User 3</option>
        </select>
      </div>
      <div>
        <label for="password">Password:</label>
        <select id="password" name="password">
          <option value="pass1">Pass 1</option>
          <option value="pass2">Pass 2</option>
          <option value="pass3">Pass 3</option>
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

require('./audiobook-dl')(app);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
``
