const mongoose = require("mongoose");

const dataset = new mongoose.Schema({
    name:{type:String},
    data:{type:String}
})

const graph = new mongoose.Schema({
    title:{type:String},
    width:{type:Number},
    label:{type:String},
    datasets:[dataset],
})

module.exports = mongoose.model("Graph", graph);