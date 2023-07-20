const express = require('express');
const customer = require('./routes/customer');
const items = require('./routes/items');
const app = express();
const port = 4000;

app.use(express.json());
app.use('/customer', customer);
app.use('/items', items);

app.get('/', (req, res) => {
  console.log(req.body.code);
  res.send('Hello World!')
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`)
});
