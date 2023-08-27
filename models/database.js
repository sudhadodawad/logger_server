const mongoose = require('mongoose');
const Schema=mongoose.Schema;


const LogSchema = new mongoose.Schema({
    product: String,
    timestamp: { type: Date, default: Date.now },
    logLevel: String,
    message: String,
  });

  

  module.exports = mongoose.model('Log', LogSchema);
