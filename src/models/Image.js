const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

const ImageSchema = new mongoose.Schema({
  type: Object,
  name:{
    type: String,
    required:true
  },
  size:{
    type: Number,
    required:true
  },
  key:{
    type: String,
    required: true
  },
  url:{
    type: String,
    required:true
  },
  reference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: '/^Product$|^User$/',
    required: true
  }
});

ImageSchema.pre('save', function(){
  if ( this.url==="NoN" ){
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

ImageSchema.pre('remove', function(){
  if ( process.env.STORAGE_TYPE === 's3' ){
    return s3.deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: this.key
    }).promise()
  }else{
    return promisify(fs.unlink)(path.resolve(__dirname,'..','..','tmp','uploads',this.key));
  }
});

module.exports = mongoose.model("Image", ImageSchema);