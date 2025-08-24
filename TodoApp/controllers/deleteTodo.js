const todo = require("../models/todo");
const Todo = require("../models/todo")

// define route Handler

exports.deleteTodo = async (req, res) => {
  try {
    const {id} = req.params;

    await Todo.findByIdAndDelete(id);

    res.json({
        success:true,
        data:todo,
        message:"delted Successfully"
    })
  } catch (error) {
    console.error(error)
    res.status(500)
        .json({
            success:false,
            error:error.message,
            message:"Server Error",
        })
    }
};