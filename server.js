// Server Instantiate
const express = require('express');
const app = express();

// used to parse req.body in express -> PUT or POST
const bodyParser = require('body-parser');

// specifically parse JSON data & add it to the request.Body object
app.use(bodyParser.json());

// activate the server on 3000 port
app.listen(3000, () => {
    console.log("server started at port number 3000");
})

// Routes
app.get('/', (req, res) => {
    res.send("hello jee,  kaise ho sare")
})


app.post('/api/cars', (req, res) => {
    const {name, brand} = req.body;
    console.log(name)
    console.log(brand)
    res.send("Car submitted Successfully")


})

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myDatabase',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Successful")
}).catch((err)=>{
    console.log("Received an Error");
})