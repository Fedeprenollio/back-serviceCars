const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

 //Body Parser
 app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: true}))



//Other config
app.use(cors());
app.use(helmet());
app.use(morgan("dev"))

//Routes
app.use(("/"),require("./routes/auth.todo"))
app.use("/todo", require("./routes/todo.routes"))
app.use("/auto", require("./routes/auto.routes"))
app.use("/service", require("./routes/service.routes"))
app.use("/general", require("./routes/serviceGeneral.routes"))


module.exports= app