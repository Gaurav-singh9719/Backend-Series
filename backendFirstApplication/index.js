
// server instance/import
const express = require("express")
// server application created by taking server instantiated
const app = express();
const port = 3000;

// adding middleware
app.use(express.json());

// get Request
app.get("/", (req, res) =>{
    res.send(`<h1>this is a heading </h1>`)
})

app.post("/car", (req, res) =>{
    res.send("Received a post request ")
})
// server listen to port number 3000
app.listen(3000,() =>{
    console.log("App started");
}) 