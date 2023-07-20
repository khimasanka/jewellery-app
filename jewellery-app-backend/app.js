const express = require('express');
const mongoose = require('mongoose');

const customer = require('./routes/customer');
const items = require('./routes/items');

const app = express();
const port = 4000;

const url = 'mongodb://127.0.0.1/jewelleryshop';

mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection;

con.on("open", () => {
  console.log("MongoDB Connected...!")
});

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
