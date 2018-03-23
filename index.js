const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const config = require("./config");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: config.serverImg.cloduName, 
    api_key: config.serverImg.apikey, 
    api_secret: config.serverImg.apiSecret 
});

mongoose.connect(config.database.mlab, err =>{
    if(err) throw err;
    console.log("database ok!");
})

app.use(cors());
app.use("/",routes);
app.listen(config.server.port, err => {
    if (err) throw err;
    console.log("server running in port", config.server.port)
})