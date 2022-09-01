const {Schema, model} = require("mongoose")

const autoSchema = new Schema({
    vehiculo: String,
    model: Number,
    kilometraje: Number,
    owner: String,
    notes: String,
   
    create_at:{
        type: Date,
        default: new Date()
    },
    service: [{ type: Schema.Types.ObjectId, ref: 'service', autopopulate: true }] ,
    

},{ versionKey: false })

autoSchema.plugin(require("mongoose-autopopulate"))

module.exports = model("auto", autoSchema)