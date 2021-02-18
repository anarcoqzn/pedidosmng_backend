const mongoose = require('mongoose');
const Event = require('./Event');
const Image = require('./Image');
const ProductSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  value:{
    type: Number,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now(),
    required: true
  },
  description:{
    type: String,
    required: false
  },
  size:[{
    type: String,
    enum:["PP","P","M","G","GG"]
  }],
  quantity:{
    type: Number,
    required: false
  },
  images:[{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Image'
  }],
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'User'
  },
  category:{
    type: String,
  },
  rating:{
    type: Number,
    max: 5,
    min: 0,
    default: 0
  }
});

ProductSchema.pre('remove', async function(){
  await Event.updateMany({products:this._id},
              {$pull:{products:this._id}},
              {multi: true}).exec();

  const images = await Image.find({reference: this._id});
  images.forEach(async img => img.remove());
});

module.exports = mongoose.model("Product", ProductSchema);