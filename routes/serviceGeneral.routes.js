const express = require("express");
const { postServiceGral ,deleteServiceGral,getServiceGral} = require("../controllers/serviceGeneral.controller");

const { verify } = require("../controllers/verify.controller");
const router = express.Router();

router.post("/", postServiceGral )
router.get("/",getServiceGral )
router.delete("/:id",deleteServiceGral  )
router.put("/:idService",  )


module.exports = router;
