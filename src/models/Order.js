const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  event:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Event'
  },
  products:[{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Product'
  }],
  client:{
    type: Object,
    required: true,
    name:{
      type: String,
      required: true
    },
    contact:{
      type: String,
      required: false
    }
  }
});

module.exports = mongoose.model("Order", OrderSchema)