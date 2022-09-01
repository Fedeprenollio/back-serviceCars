
const jwt = require("jsonwebtoken")
require("dotenv").config()



const verifyMethod = {};


verifyMethod.verify = (req, res, next) => {
  const token  = req.headers["token"];

  if(token === null || token === undefined || token === ""){
    return res.json({
        status: false,
        message: "Token no valido"
    })
  }

  const auth = jwt.verify(token, process.env.SECURE_KEY)
  if(!auth){
    return res.json({
        status: false,
        message: "Token no valido"
    })
  }

  //incrustamos en req una nueva propiedad, userId
  req.user= auth

  next();
};

module.exports = verifyMethod;
