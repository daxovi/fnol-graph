const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => { 
    res.send("jsi na hlavní stránce milý uživateli");
 });

 app.listen(PORT, (err) => { 
    console.log("Server běží na portu: " + PORT);
  })