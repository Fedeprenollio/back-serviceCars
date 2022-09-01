const app = require("./app");
require("dotenv").config()
require("./database")

async function init (){
   await app.listen(process.env.PORT || 3001, ()=>{
        console.log("escuchando en el puerto", process.env.PORT)
    })
}

init()