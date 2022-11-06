const getMaterials = require("express").Router();
getMaterials.get("/get-materials", (req, res) => { 
    res.json({
        msg:"úspěšně získané suroviny",
        seznamSuroviny:[
            {surovina:"Mrkev"},
            {suroviny:"Celer"},
            {surovina:"Brambora"}
        ]
    })
 })

 module.exports = getMaterials;