const User = require('../models/User');

module.exports = {
  async update(req,res){

  },

  async delete(req,res){
    const id = req.params.id;
    const user = await User.findById(id);
    if( user ) {
      await user.remove()
      return res.send();
    }
    else return res.status(404).send("User not found.");
  },

  async getUser(req,res){
    return res.send(await User.find().populate('imageProfile'));
  }
};