const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Hello World!')
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`)
});
