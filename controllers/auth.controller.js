const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const jwt_decode = require("jwt-decode");
const { verify } = require("./verify.controller");
const { findByIdAndDelete } = require("../models/user.model");

const authMethods = {};

authMethods.signup = async (req, res) => {
  const { username, password } = req.body;

  const usernameAvailable = await UserModel.findOne({username})

  if(usernameAvailable){
   return res.send({error: "Nombre no dispobible"})
  }
  

  const newUser = new UserModel({
    username,
    password,
  });
  newUser.password = await newUser.encryptPassword(password);

  newUser.save();

  return res.json({
    status: true,
    message: "Usuario registrado correctamente",
    data: newUser,
  });
};

const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

authMethods.signupGoogle = async (req, res) => {
  const { token } = req.body;
  const user = jwt_decode(token.credential);

  // const ticket = await client.verifyIdToken({
  //   idToken: token,
  //   audience: process.env.CLIENT_ID_GOOGLE,
  // });

  // const { name, email, given_name, family_name } = ticket.getPayload();
  const newUser = new UserModel({
    username: user.given_name,
  });

  const existeUser = await UserModel.findOne({username: newUser.username})
  //si no existe el user, lo guardamos
if(existeUser=== null){
  await newUser.save();

  const userForToken ={
    username: user.email,
    userId: user._id.toString()
  }
  


  const token2 = jwt.sign(userForToken, process.env.SECURE_KEY);
  if (!token2) {
    res.json({
      auth: false,
      message: "Token incorrecto",
    });
  }
  req.token = token2;
  
  return res.send({
    auth: true,
    token: token2,
    user,
  });

} else{
  console.log("ya existe")
  const userForToken ={
    username: existeUser.username,
    userId: existeUser._id.toString()
  }
  
  const token2 =  jwt.sign(userForToken, process.env.SECURE_KEY);
  if (!token2) {
    res.json({
      auth: false,
      message: "Token incorrecto",
    });
  }
  req.token = token2;
  return res.send({
    auth: true,
    token: token2,
    user,
  });
}


};

authMethods.signin =  async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({
    username,
  });
  if (!user) {
    res.json({
      auth: false,
      message: "Username  incorrecto",
    });
  }
try {
  const autenticate = await user.confirmPassword(password);
  if (!autenticate) {
    res.json({
      auth: false,
      message: "Password incorrecto",
    });
  }

const userForToken ={
  username: username,
  userId: user._id.toString()
}

  const token = jwt.sign(userForToken, process.env.SECURE_KEY);

  if (!token) {
    res.json({
      auth: false,
      message: "Token incorrecto",
    });
  }
  req.token = token;
  // req.user = user.username;
  return res.send({
    auth: true,
    token,
    // user: user.username,
  });
} catch (error) {
  console.log(error)
  return res.send("Error de login")
}
 

};

authMethods.getUsers = async (req, res) => {

  // await UserModel.find()
  //   .populate("auto")
  //   .exec((err, users) => {
  //     console.log(users);
  //     res.send(users);
  //   });
  //------CON AUTOPUPULADO
  const users = await UserModel.find()
  res.send(users)
};

authMethods.deleteUser= async(req,res)=>{
  const{userId} =req.params
  try {
    await UserModel.findByIdAndDelete(userId)
   return res.send("Usuario eliminado")
    
  } catch (error) {
    console.log(error)
    return res.send("Error al eliminar")
  }
}
authMethods.verifyToken= async(req,res)=>{
try {
 return res.send({msg: req.user})
} catch (error) {
  res.send({msg: null});
}
}




module.exports = authMethods;
