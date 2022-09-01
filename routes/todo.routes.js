const express = require("express");
const {
  addTodo,
  getTodo,
  getAllTodo,
  deleteTodo,
  updateTodo,
  updateStatusTodo,
  getAllTodoAllUsers,
} = require("../controllers/todo.controller");
const { verify } = require("../controllers/verify.controller");
const router = express.Router();

router.get("/",verify, getAllTodo);
router.get("/oneUser/:id", verify, getTodo);
router.post("/", verify,  addTodo);
router.delete("/:id", verify, deleteTodo);
router.put("/:id", verify, updateTodo);
router.put("/status/:id", verify, updateStatusTodo);
router.get("/allUsers", getAllTodoAllUsers);

module.exports = router;
