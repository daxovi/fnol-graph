const saveMaterial = require("express").Router();
const modelMaterial = require("../../models/material");

saveMaterial.post("/save-material", (req,res) => { 
    res.send("Ano, navštívil jsi /save-material POSTem")
 });

 saveMaterial.get("/save-material", (req,res) => { 
    res.send("Ano, navštívil jsi /save-material GETem")
 })

 module.exports = saveMaterial;