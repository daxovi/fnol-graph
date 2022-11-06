const getGraph = require("express").Router();
const graph = require("../../models/graph");

getGraph.get("/get-graph", (req,res) => {
    graph.find({}, (err,docs) => {
        if(err){
            return res.json({
                msg:"Nepodařilo se načíst grafy",
                documents:[]
            })
        }else{
            return res.json({
                msg:"Úspěšně se porařilo načíst grafy",
                documents:docs
            })
        }
    })
})

module.exports = getGraph;