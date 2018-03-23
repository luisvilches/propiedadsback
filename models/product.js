const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product = new Schema({
    code:String,
    transa:String,
    type:String,
    region:String,
    comuna:String,
    title:String,
    cover:String,
    images:Array,
    dormitorios:Number,
    banos:Number,
    meters:Number,
    metersUtils:Number,
    destacado:Boolean,
    description:String,
    estracto:String
});

module.exports = mongoose.model("Product", Product);
