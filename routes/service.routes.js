const express = require("express");
const { postService, getService,addServiceToAuto,getServiceUser ,putService,deleteService, selectStatus} = require("../controllers/service.controller");

const { verify } = require("../controllers/verify.controller");
const router = express.Router();

router.post("/", verify, postService )
router.get("/", getService )
router.get("/user", verify, getServiceUser )
router.delete("/:idService", verify, deleteService )
router.put("/:idService", verify,putService )

router.get("/status", verify,selectStatus )


module.exports = router;
