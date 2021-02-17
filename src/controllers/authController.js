const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(params={}){
  return jwt.sign(params, process.env.JWT_SECRET,{
    expiresIn:86400, // expira em 1 dia
  });
}

module.exports = {
  async authenticate(req,res) {
    const { login, password } = req.body;
    
    const user = await User.findOne({ $or:[ {email:login},{userName:login} ] }).select('+password');

    if ( !user ) return res.status(400).send("Usuário não encontrado.");

    if( !await bcrypt.compare(password, user.password))
      return res.status(401).send("Senha inválida.");
    
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