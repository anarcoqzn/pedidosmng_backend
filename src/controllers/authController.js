const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function generateToken(params={}){
  return jwt.sign(params, authConfig.secret,{
    expiresIn:86400, // expira em 1 dia
  });
}

module.exports = {
  async authenticate(req,res) {
    const { email, userName, password } = req.body;
    
    let user;
    
    if (email) user = await User.findOne({ email }).select('+password');
    else user = await User.findOne({ userName }).select('+password');

    if ( !user ) return res.status(400).send("Usuário não encontrado.");

    if( !await bcrypt.compare(password, user.password))
      return res.status(400).send("Senha inválida.");
    
    user.password = undefined;

    res.send({user, token: generateToken( {id: user._id} )});
  },
  async register(req,res) {
    const {name,userName, email, password, address, category, imageProfile} = req.body;
    try{
      const user = await User.create({
      name,
      userName,
      email,
      password,
      address,
      category,
      imageProfile
    });
    user.password = undefined;
    return res.status(200).send({ user, token: generateToken({id:user._id}) });
    }catch(err){
      if( err.keyValue.userName )
        return res.status(409).send("Nome de usuário já existe!");
      else if( err.keyValue.email )
        return res.status(409).send("Email já existe!");
      else return res.status(400).send(err);
    }
  }
}