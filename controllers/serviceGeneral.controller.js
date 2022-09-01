const serviceGeneralModel = require("../models/serviceGeneral.model");



const serviceoGralMethods = {};

serviceoGralMethods.postServiceGral = async (req, res) => {
    const { categoria, servicio, description, tiempoProgramado } = req.body
    try {
        const newService = await new serviceGeneralModel({
            categoria, servicio, description, tiempoProgramado
        })

        newService.save()
        res.send(newService)
    } catch {
        res.send("error")
    }




}
serviceoGralMethods.getServiceGral = async (req, res) => {

    const allService = await serviceGeneralModel.find()

    res.send(allService)

}
serviceoGralMethods.deleteServiceGral = async (req, res) => {
    const { id } = req.params


    try {
        await serviceGeneralModel.findByIdAndDelete(id)

        res.send("Eliminado correctamente")

    }catch {
        res.send("Error")
    }

}



module.exports = serviceoGralMethods;
