const Image = require('../models/Image');

module.exports = {
  async uploadImage (req,res){
    
    const { originalname: name, size, key, location: url = "NoN"} = req.file;
    const { reference } = req.body;
    const image = await Image.create({
      name,
      size,
      key,
      url,
      reference
    })

    return res.json(image);
  },

  async getById(req, res){
    const id = req.params.id;
    const t_image = await Image.findById(id);

    if( t_image ) return res.json(t_image);
    else return res.status(404).send("Image not found.");
  },

  async delete(req,res) {
    const id = req.params.id;
    const t_image = await Image.findById(id);
    
    if( t_image ) return res.json( await t_image.remove());
    else return res.status(404).send("Image not found.");
  },

  async listAll(req,res) {

    return res.json( await Image.find());
  }
}