// const ServiceModel = require("../models/service.model");
const serviceModel =require("../models/servicios.model")



const serviceoMethods = {};

serviceoMethods.getService= async (req,res)=>{
    const allService = await serviceModel.find()
    res.send(allService)
}
serviceoMethods.getServiceUser= async (req,res)=>{
  const userId = req.user.userId
  const {status} = req.query
  console.log(status)
try {
  if(status){
    const service = await serviceModel.find( { $and:[{owner: userId},{serviceStatus: status}]})
    return  res.send(service)
  }
    const allService = await serviceModel.find({owner: userId})
    res.send(allService)

  
} catch (error) {
  console.log(error)
}


  
}


serviceoMethods.postService = async (req, res) => {
  const {categoria, servicio, description, lugar, nextServiceFecha,nextServiceKm,currentKm, create_at } = req.body;
  const userId = req.user.userId;

const newService = await serviceModel({
  create_at, categoria,description, servicio, lugar, nextServiceFecha,nextServiceKm ,currentKm, owner: userId, 
});

  newService.save();
  res.send(newService);
};

serviceoMethods.addServiceToAuto = async (req, res) => {
  const { idService } = req.params;
  const { auto } = req.body;
  const serviceUpdate = await serviceModel.findByIdAndUpdate(idService, {
    $push: { auto: auto },
  });
  res.send(userUpdate);
};


serviceoMethods.putService= async (req,res)=>{
  const {idService} = req.params;
  const { servicio, lugar,description, nextServiceFecha,nextServiceKm,serviceStatus ,currentKm  } = req.body;
  console.log(serviceStatus)
try {
  await serviceModel.findByIdAndUpdate(idService,{
    servicio, lugar,description, nextServiceFecha,nextServiceKm,   serviceStatus,currentKm 
  })
 return res.send("Service editado correctamente")
  
} catch (error) {
  console.log("error en el put", error)
  return res.send("Error al actualizar")
}
}




serviceoMethods.deleteService= async (req,res)=>{
  const {idService} = req.params;
  // const { servicio, lugar, nextServiceFecha,nextServiceKm } = req.body;
try {
  await serviceModel.findByIdAndDelete(idService)
  res.send("Service eliminado correctamente")
  
} catch (error) {
  res.send("Error al iliminar")
}
}


//---------------

serviceoMethods.selectStatus= async (req,res)=>{
  const { status } = req.query;
try {
  const filterService= await serviceModel.find({serviceStatus: status})
  res.send(filterService)
  
} catch (error) {
  res.send("Error al filtra")
}
}

module.exports = serviceoMethods;
