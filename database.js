const mongoose = require("mongoose");
const db = mongoose.connection;
require("dotenv").config()

const URI = process.env.MONGO_ATLAS  ? process.env.MONGO_ATLAS  : process.env.CONNECTION_URI 

function connectDB(){
mongoose.connect( URI ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true no soportado
})

db.on("open", ()=>{
    console.log("DB connected")
});
db.on("error", (error)=>{
    console.log(error)
})

}

connectDB()