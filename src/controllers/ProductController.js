const Image = require('../models/Image');
const Product = require('../models/Product');

module.exports = {
  async create(req,res){
    const { name, value, description, quantity, images, category, createdBy } = req.body;
    
    const product = await Product.create({
      name,
      value:parseFloat(value), 
      description,
      quantity,
      category,
      images,
      createdBy
    });

    return res.json(product);
  },

  async listAll(req,res){
    var products = undefined;

    if ( req.params.id ) products = await Product.findById(req.params.id);
    else products = await (await (Product.find()).populate('images'));

    return res.json(products);
  },

  async getById(req,res){
    const product = await (await (Product.findById(req.params.id)).populate('images'));
    if( product ) {
      return res.json(product);
    }
    else return res.status(404).send("Produto não encontrado");
  },

  async delete(req,res){
    var product = undefined;
    if( req.params.id ) product = await Product.findById(req.params.id);
    if( product ) {
      await product.remove();
      return res.send();
    }else{
      return res.status(404).send("Produto não encontrado.")
    }
  },

  async update(req, res) {
    const product = await Product.findById(req.params.id);
    
    if( product ) return res.json( await product.updateOne(req.body, {new: true}));
    else return res.status(404).send("Produto não encontrado.");   
  },

  async getCategories(req,res) {
    const query = await Product.distinct('category');

    return res.send(query);
  },

  async getByCategory(req, res){
    return res.json(await Product.find({category:req.params.category}));
  }
}