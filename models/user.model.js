const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  auto: [{ type: Schema.Types.ObjectId, ref: 'auto', autopopulate: true }],
  
},
{ versionKey: false }
);

userSchema.methods.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.confirmPassword = function  (password){
    return bcrypt.compare(password, this.password )
    //retorna tru o false
}

userSchema.plugin(require('mongoose-autopopulate'));


module.exports = model("user", userSchema);
