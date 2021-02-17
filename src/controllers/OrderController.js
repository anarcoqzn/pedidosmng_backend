const Order = require('../models/Order');
const Event = require('../models/Event');
const Product = require('../models/Product');

module.exports = {
  async create (req,res) {
    const {event, products, client}  = req.body;
   
    const t_event = await Event.findById(event);
    var order_products = [];

    if( !t_event ) return res.status(500).send("Evento não encontrado.");

    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      const t_product = await Product.findById(element);

      if( !t_product ) return res.status(404).send("Produto não encontrado.");
      else {
        if (t_event.products.includes(t_product._id)) order_products.push(t_product._id);
        else return res.status(500).send("Produto não pertence ao evento.");
      }
    }
    
    const order = await Order.create({
      event,
      products:order_products,
      client
    }).
    catch((err) => {return res.status(500).json(err)});
    return res.json(order);
  },

  async listAll(req, res){
    const orders = await Order.find({addressedTo:req.userId});
    return res.json(orders);
  },

  async delete(req,res) {
    const order = await Order.findById(req.params.id);
    if( order ){
      await order.remove();
      return res.send();
    }else{
      return res.status(500).send("Pedido não encontrado.")
    } 
  }
}