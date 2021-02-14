const mongoose = require('mongoose');
const Event = require('./Event');
const Image = require('./Image');
const Product = require('./Product');

const UserSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  userName:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address:{
    street: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    complement:{
      type: String
    }
  },
  category:{
    type: String,
    required: true,
    enum:["Client", "Admin"]
  },
  rating:{
    type: Number,
    max: 5,
    min: 0,
    default: 0
  },
  imageProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Image'
  }
});

UserSchema.pre('remove', async function(){
  Product.remove({owner:this._id});
  Event.remove({owner:this._id});
  const image = await Image.findOne({reference:this._id});
  image.remove();
});

module.exports = mongoose.model('User', UserSchema);