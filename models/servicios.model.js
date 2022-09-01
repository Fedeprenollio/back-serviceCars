const { Schema, model } = require("mongoose");

const servicioSchema = new Schema(
  {
    servicio: String,
    categoria: { 
        type: String,
        default: "Otro" },

    lugar: String,
    serviceStatus: {
      type: Boolean,
      default: false,
    },
    description: String,
    nextServiceFecha: { type: Date, default: Date.now },
    daysForNextService: {
      type: Number,
    },
    nextServiceKm: Number,
    owner: String,
    complete_at: {
      type: Date,
      default: null,
    },
    create_at: {
      type: Date,
      default: new Date(),
    },
    currentKm: Number,
    auto: [{ type: Schema.Types.ObjectId, ref: "auto", autopopulate: true }],
  },
  { versionKey: false }
);
servicioSchema.plugin(require("mongoose-autopopulate"));

module.exports = model("service", servicioSchema);
