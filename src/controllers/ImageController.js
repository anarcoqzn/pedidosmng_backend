const Image = require('../models/Image');
const Product = require('../models/Product');

module.exports = {
  async uploadImages (req,res){
    
    const { reference } = req.body;
    console.log(req.file)
    console.log(reference)
    const product = await Product.findById(reference);
    var images = [];
    for(let i = 0; i < req.files.length; i++){
      const file = req.files[i];
      const { originalname: name, size, key, location: url = "NoN"} = file
      const tempImage = await Image.create({
        name,
        size,
        key,
        url,
        reference
      });
      images = images.concat(tempImage._id);
    }
    await product.updateOne({images:images}, {new: true});
    return res.json(product);
  },

  async getById(req, res){
    const id = req.params.id;
    const t_image = await Image.findById(id);

    if( t_image ) return res.json(t_image);
    else return res.status(404).send("Image not found.");
  },

  async delete(req,res) {
    const {ids} = req.body;

    for( let i = 0; i < ids.length; i++ ){
      const t_image = await Image.findById(id);

      if( t_image ) await t_image.remove();
      else return res.status(404).send("Image not found.");
    }
    return res.send();
  }
}