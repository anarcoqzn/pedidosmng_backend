const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  local:{
    type: String,
    required: true
  },
  startDate:{
    type: Date,
    required: true
  },
  endDate:{
    type: Date,
    required: true
  },
  ordering_limit_date:{
    type: Date,
    required: true
  },
  manager:{
    type: Object,
    required: true,
    name:{
      type: String,
      required: true
    },
    phone:{
      type: String,
      required: true
    }
  },
  products:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt:{
    type: Date,
    default: Date.now
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required:false,
    ref: 'User'
  }
});

module.exports = mongoose.model("Event", EventSchema);