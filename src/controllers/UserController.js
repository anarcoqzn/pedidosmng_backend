const User = require('../models/User');

module.exports = {
  async create(req,res) {
    const {name,userName, email, password, address, category, imageProfile} = req.body;
    const user = await User.create({
      name,
      userName,
      email,
      password,
      address,
      category,
      imageProfile
    });

    return res.json(user);
  },

  async update(req,res){

  },

  async delete(req,res){

  },

  async getUser(req,res){

  }
};