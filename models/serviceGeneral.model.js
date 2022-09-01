const {Schema, model} = require("mongoose")

const servicioGeneralSchema = new Schema({
    categoria: String,
        // {
    //     select:[  "Aceite", "Neumaticos", "Amortiguadores","Frenos", "Filtros","Correa del motor","Batería", "Escobillas de limpiaparabrisas","Catalizadores y sistemas de escape","Sistema de enfriamiento","Transmisión automática","Otro"]
    // },
    servicio: String,
    description: String,
    tiempoProgramado: Number,
    nextServiceKm : Number,
    create_at:{
        type: Date,
        default: new Date()
    },
},{ versionKey: false })

module.exports = model("servicioGeneral", servicioGeneralSchema)