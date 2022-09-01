const express = require("express");
const { postAuto, addAutoToUser, getAutos,addServiceToAuto,getAutosOneUser, deleteAuto,putAuto ,getAutoDetail, getAutoDetailNextServicesDays, getAutoDetailNextServicesKm,getAutosNextServiceDays,getAutosNextServiceKm,getAutosStatus,getAutosCategory} = require("../controllers/auto.controller");

const { verify } = require("../controllers/verify.controller");
const router = express.Router();

router.post("/", verify ,postAuto )
router.get("/",verify, getAutos )

router.get("/user", verify ,getAutosOneUser)
router.get("/user/nextServiceDays", verify ,getAutosNextServiceDays )
router.get("/user/nextServiceKm", verify ,getAutosNextServiceKm )
router.get("/user/status", verify ,getAutosStatus)
router.get("/user/category", verify ,getAutosCategory)



router.get("/detail/:idAuto", verify ,getAutoDetail)
router.get("/detailNextDays/:idAuto", verify ,getAutoDetailNextServicesDays)
router.get("/detailNextKm/:idAuto", verify ,getAutoDetailNextServicesKm)
router.put("/",verify, putAuto )
router.put("/addAutoToUser",verify, addAutoToUser )
router.put("/addServiceToAuto/:idAuto",verify ,addServiceToAuto   )
router.delete("/:idAuto", deleteAuto   )


module.exports = router;
