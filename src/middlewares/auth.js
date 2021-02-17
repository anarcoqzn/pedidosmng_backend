const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if ( !authHeader ) return res.status(401).send("Nenhum token fornecido.");

  const parts = authHeader.split(' ');

  if ( !parts.length === 2) return res.status(401).send("Erro de token.")

  const [ scheme, token ] = parts;

  if( !(/^Bearer$/i.test(scheme)) ) return res.status(401).send("Token mal formatado.")

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
    if (err) return res.status(401).send("Token inválido.");

    req.userId = decoded.id;
    return next();
  })
}