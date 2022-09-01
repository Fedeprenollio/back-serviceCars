const express = require("express")
const { signin, signup, signupGoogle, getUsers, deleteUser,verifyToken } = require("../controllers/auth.controller")
const { verify } = require("../controllers/verify.controller")
const router = express.Router()

router.post("/singup", signup)
router.post("/singupGoogle", signupGoogle)
router.post("/singin", signin)
router.get("/users", getUsers)
router.delete("/users/:userId", deleteUser)
router.get("/token/verifyToken", verify,verifyToken)



module.exports = router