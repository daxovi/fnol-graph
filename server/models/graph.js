const mongoose = require("mongoose");

const data = new mongoose.Schema({

})

const dataset = new mongoose.Schema({
    label:{type:String},
    data:[Number]
})

const graph = new mongoose.Schema({
    title:{type:String},
    label:{type:String},
    datasets:[dataset],
})

module.exports = mongoose.model("Graph", graph);