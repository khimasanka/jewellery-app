const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  code:{
    type:String,
    required: true,
    unique: true,
  },
  name:{
    type:String,
    required: true,
  },
  telephone:{
    type:String,
    required: true,
  },
  address:{
    type:String,
    required: true,
  }
});

module.exports = mongoose.model('Customer', customerSchema);
