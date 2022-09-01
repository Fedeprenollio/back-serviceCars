const AutoModel = require("../models/auto.model");
const userModel = require("../models/user.model");

const autoMethods = {};

autoMethods.getAutos = async (req, res) => {
  const allAutos = await AutoModel.find();

  res.send(allAutos);
};

autoMethods.getAutosOneUser = async (req, res) => {
  const userId = req.user.userId;

try {
  const allAutos = await AutoModel.find({ owner: userId });
  res.send(allAutos);
  
} catch (error) {
  console.log(error)
}


};
autoMethods.getAutosNextServiceDays = async (req, res) => {
  const userId = req.user.userId;
  const { day } = req.query;

  try {
    const allAutos = await AutoModel.find({ owner: userId });

    const autosFilter = allAutos.map((auto) => {
      return {
        vehiculo: auto.vehiculo,
        kilometraje: auto.kilometraje,
        service: auto.service.filter((serv) => {
          let day1 = new Date();
          let day2 = new Date(serv.nextServiceFecha);

          var difference = Math.abs(day2 - day1);
          let days = difference / (1000 * 3600 * 24);
          return days < day;
        }),
      };
    });

    res.send(autosFilter);
  } catch (error) {
    console.log(error);
  }
};
autoMethods.getAutosNextServiceKm = async (req, res) => {
  const userId = req.user.userId;
  const { km } = req.query;

  try {
    const allAutos = await AutoModel.find({ owner: userId });

    const autosFilter = allAutos.map((auto) => {
      return {
        vehiculo: auto.vehiculo,
        kilometraje: auto.kilometraje,
        service: auto.service.filter((serv) => {
          return serv.nextServiceKm - (auto.kilometraje - serv.currentKm) < km;
        }),
      };
    });

    res.send(autosFilter);
  } catch (error) {
    console.log(error);
  }
};
autoMethods.getAutosStatus = async (req, res) => {
  const userId = req.user.userId;
  const { status } = req.query;

  try {
    const allAutos = await AutoModel.find({ owner: userId });

    const autosFilter = allAutos.map((auto) => {
      return {
        vehiculo: auto.vehiculo,
        kilometraje: auto.kilometraje,
        service: auto.service.filter((serv) => {
          return serv.serviceStatus.toString() ===  status.toString();
        }),
      };
    });

    res.send(autosFilter);
  } catch (error) {
    console.log(error);
  }
};
autoMethods.getAutosCategory = async (req, res) => {
  const userId = req.user.userId;
  const { category } = req.query;

  try {
    const allAutos = await AutoModel.find({ owner: userId });

    const autosFilter = allAutos.map((auto) => {
      return {
        vehiculo: auto.vehiculo,
        kilometraje: auto.kilometraje,
        service: auto.service.filter((serv) => {
          return serv.categoria ===  category;
        }),
      };
    });

    res.send(autosFilter);
  } catch (error) {
    console.log(error);
  }
};

autoMethods.postAuto = async (req, res) => {
  const { vehiculo, model, kilometraje, notes } = req.body;
  const userId =req.user.userId;
  try {
    const newAuto = await AutoModel({
      vehiculo,
      model,
      kilometraje,
      owner: userId,
      notes
    });

    newAuto.save();
    res.send(newAuto);
  } catch (err) {
    res.send("error");
  }
};
autoMethods.putAuto = async (req, res) => {
  const { idAuto } = req.query;
  const { vehiculo, model, kilometraje, notes } = req.body;
  console.log(kilometraje);

  try {
    await AutoModel.findByIdAndUpdate(idAuto, {
      vehiculo,
      model,
      kilometraje,
      notes
    });

    res.send("auto editado");
  } catch (error) {
    res.send("error");
  }
};

autoMethods.addAutoToUser = async (req, res) => {
  const { idUser } = req.body;
  const { auto } = req.body;

  try {
    const userUpdate = await userModel.findByIdAndUpdate(idUser, {
      $push: { auto: auto },
    });
    res.send(userUpdate);
  } catch {}
};

autoMethods.addServiceToAuto = async (req, res) => {
  const { idAuto } = req.params;
  const { service } = req.body;


  
  const autoUpdate = await AutoModel.findByIdAndUpdate(idAuto, {
    $push: { service: service },
  });
  res.send(autoUpdate);
};

autoMethods.deleteAuto = async (req, res) => {
  const { idAuto } = req.params;

  try {
    await AutoModel.findByIdAndDelete(idAuto);
    res.send("Eliminado el auto");
  } catch {
    res.send("Error al eliminar");
  }
};

autoMethods.getAutoDetail = async (req, res) => {
  const { idAuto } = req.params;
  const { status, category } = req.query;
  console.log(status, category);
  try {
    if (status && category) {
      const auto = await AutoModel.findById(idAuto);
      //  console.log("detail", autoDetail)
      const autoStatus = auto.service.filter(
        (serv) =>
          serv.serviceStatus.toString() === status.toString() &&
          serv.categoria === category
      );
      return res.send({ kilometraje: auto.kilometraje, service: autoStatus });
    }
    if (status && (category === "" || category === "all")) {
      const auto = await AutoModel.findById(idAuto);
      //  console.log("detail", autoDetail)
      const autoStatus = auto.service.filter(
        (serv) => serv.serviceStatus.toString() === status.toString()
      );
      return res.send({ kilometraje: auto.kilometraje, service: autoStatus });
    }
    if ((status === "" || status === "all") && category) {
      const auto = await AutoModel.findById(idAuto);
      const autoStatus = auto.service.filter(
        (serv) => serv.categoria === category
      );
      return res.send({ kilometraje: auto.kilometraje, service: autoStatus });
    }

    const autoDetail = await AutoModel.findById(idAuto);
    res.send(autoDetail);
  } catch (error) {
    console.log(error);
    res.send("Error en obtener el detalle");
  }
};

autoMethods.getAutoDetailNextServicesDays = async (req, res) => {
  const { idAuto } = req.params;
  const { day } = req.query;
  try {
    if (day) {
      const auto = await AutoModel.findById(idAuto);
      //  console.log("detail", autoDetail)
      const autoStatus = auto.service.filter((serv) => {
        let day1 = new Date();
        let day2 = new Date(serv.nextServiceFecha);

        var difference = Math.abs(day2 - day1);
        let days = difference / (1000 * 3600 * 24);
        return days < day;
      });
      return res.send({ kilometraje: auto.kilometraje, service: autoStatus });
    }

    const autoDetail = await AutoModel.findById(idAuto);
    res.send(autoDetail);
  } catch (error) {
    console.log(error);
    res.send("Error en obtener el detalle");
  }
};
autoMethods.getAutoDetailNextServicesKm = async (req, res) => {
  const { idAuto } = req.params;
  const { km } = req.query;
  console.log(km);
  try {
    if (km) {
      const auto = await AutoModel.findById(idAuto);
      //  console.log("detail", autoDetail)
      const autoStatus = auto.service.filter((serv) => {
        return serv.nextServiceKm - (auto.kilometraje - serv.currentKm) < km;
      });
      console.log(auto);
      return res.send({ kilometraje: auto.kilometraje, service: autoStatus });
    }

    const autoDetail = await AutoModel.findById(idAuto);
    res.send(autoDetail);
  } catch (error) {
    console.log(error);
    res.send("Error en obtener el detalle en km");
  }
};

module.exports = autoMethods;
