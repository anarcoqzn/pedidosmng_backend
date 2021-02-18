const Event = require("../models/Event");
const Product = require("../models/Product");
const mongoose = require('mongoose');

module.exports = {
  
  async create(req,res){
    
    const product = {
      title, 
      description, 
      manager, 
      local, 
      startDate, 
      endDate, 
      ordering_limit_date,
      products,
      createdBy
    } = req.body;
    
    const event = await Event.create({product});

    return res.json(event);
  },

  async listAll(req,res){
    var events;
    // const today = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
    if ( req.query.productId ) {
     events = await Event.find({products:req.query.productId});
    }
    else{
      events = await Event.find();
    }
    return res.json(events);
  },

  async delete(req,res){
    const event = await Event.findById(req.params.id);
    if( event ){
      await event.remove();
      return res.send();
    } else{
      return res.status(404).send("Evento não encontrado");
    }
  },

  async update(req,res){
    var event = await Event.findById(req.params.id);
    if( event ){
      if( Object.keys(req.body).length > 0 ) {
        if( req.body.products ){
          var products = req.body.products;
          for (let i = 0; i < products.length; i++) {
            let temp_id = mongoose.Types.ObjectId(products[i]);
            
            if ( mongoose.Types.ObjectId.isValid(temp_id) ){
              const p = await Product.findById(temp_id);
              
              if ( !p ) return res.status(500).send("Produto "+temp_id+" não existe");

              products[i] = temp_id;

            }else{
              return res.status(400).send("ID inválido");
            }
          }
          req.body.products = products;
        }
        return res.json(await event.updateOne(req.body,{new:true}));
      }
            
      return res.send();
    }else{
      return res.status(404).send("Evento não encontrado.")
    }
  },

  async getById(req,res){
    const id = req.params.id;
    if( mongoose.Types.ObjectId.isValid(id) ){
      const t_event = await (await (Event.findById(id)).populate({path:'products',populate:{path:'images'}})); 
      if( t_event ) return res.json(t_event);
      else return res.status(404).send("Evento não encontrado");
    }
    else
      return( res.status(400).send("ID inválido"));
  }
}