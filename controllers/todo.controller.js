const TodoModel = require("../models/todo.model");

const todoMethods = {};

todoMethods.addTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;
  const newTodo = new TodoModel({
    title,
    description,
    owner: userId,
  });

  await newTodo.save();

  res.send({
    status: true,
    message: "Todo agregado correctamente",
    data: newTodo,
  });
};
todoMethods.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const update = await TodoModel.findByIdAndUpdate(id, {
      title,
      description,
    });
    return res.send({
      status: true,
      message: "actualizacion correceta",
      originTodo: update,
    });
  } catch (error) {
    console.error(error);
    res.send({
      message: "Todo no encontrado",
      error: error,
    });
  }
};

todoMethods.updateStatusTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await TodoModel.findOne({ id });
  const newStatus = await todo.isComplete();
  console.log("el id", id);
  console.log("newStatus", todo);
  if (newStatus) {
    await todo.updateOne({
      $set: { todoStatus: newStatus, complete_at: new Date() },
    });
  } else {
    await todo.updateOne({
      $set: { todoStatus: newStatus, complete_at: null },
    });
  }

  return res.send({
    status: true,
    todoEditing: todo,
  });
};
todoMethods.getTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await TodoModel.findById(id);
  return res.send({
    status: true,
    todo: todo,
  });
};
todoMethods.getAllTodo = async (req, res) => {
  const userId = req.userId;
  const allTodos = await TodoModel.find({ owner: userId });
console.log(userId)
  return res.send({
    status: true,
    todos: allTodos,
  });
};
todoMethods.getAllTodoAllUsers = async (req, res) => {



  const allTodoss = await TodoModel.find();

  return res.send(allTodoss);
};
todoMethods.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    
      await TodoModel.findByIdAndDelete(id);
    
      return res.send({
        status: true,
        message: "Eliminada correctamente",
      });
    
  } catch (error) {
    console.error(error)
    res.send({
      message:"Producto no encontrado",
      error
    })
  }
};

module.exports = todoMethods;
