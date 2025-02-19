const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/lint', (req, res) => {
  const { code } = req.body;
  // This is where you would integrate the Lua linter
  res.json({ message: 'Your code has been linted!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
