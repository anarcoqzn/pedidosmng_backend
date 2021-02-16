const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  event:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Event'
  },
  details:[{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Product'
    },
    quantity:{
      type: Number,
      required: true
    },
    size:{
      type: String
    },
    color:{
      type: String
    }
  }],
  client:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  tempClient:{
    _id:{
      type: mongoose.Schema.Types.ObjectId,
    },
    name:{
      type: String,
      required: true
    },
    email:{
      type: String
    },
    phone:{
      type: String
    },
    deliveryAt:{
      street:{
        type: String,
        required: true
      },
      number:{
        type: String,
        required: true
      },
      complement:{
        type: String
      }
    }
  },
  addressedTo:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  }
});

OrderSchema.pre(('save'), function(){
  if ( !this.client )
    this.tempClient._id = new mongoose.Types.ObjectId();
});

module.exports = mongoose.model("Order", OrderSchema)