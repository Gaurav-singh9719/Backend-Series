
const express = require("express");
const app = express();

// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000

// middleware to parse json request body
app.use(express.json());

// import routes for todo API
const todoRoutes = require("./routes/todos")

// mount the todos API Routes
app.use("/api/v1", todoRoutes);

// Start Sever
app.listen(PORT, () =>{
    console.log(`Server Successfully Started at Port Number ${PORT}`);
})

// Connect To the database
const dbConnect = require("./config/database")
dbConnect();

// default Route
app.get("/", (req, res) =>{
    res.send(`<h1> this is HomePage </h1>`)
})