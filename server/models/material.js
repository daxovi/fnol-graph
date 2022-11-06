const mongoose = require("mongoose");
const material = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:1,
        max:160
    }
})

module.exports = mongoose.model("Material", material);