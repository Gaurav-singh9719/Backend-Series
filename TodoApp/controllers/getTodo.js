const Todo = require("../models/todo")


exports.getTodo = async (req, res) => {
  try {
    // fetch all todo items from database
    const todos = await Todo.find({});

    // response
    res.status(200)
    .json({
        success:true,
        data:todos,
        message:"Entire Todo is fetched",
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


exports.getTodoById = async(req, res) =>{
    try {
        // extract todo items basis on id
        const id = req.params.id;
        const todo = await Todo.findById({_id:id})

        // data for given id not found
        if(!todo){
            return res.status(404)
            .json({
                success:false,
                message:"No Data Found with Given ID",
            })
        }
        // data for given id
        res.status(200)
        .json({
            success:true,
            data:todo,
            message:`Todo ${id} data successfully fetched`
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
}