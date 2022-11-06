const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require("./databaze/connect");
const getGraph = require("./routes/GET/getGraph");
const saveGraph = require("./routes/POST/saveGraph");

const database = new dbConnect();
const cors = require("cors");
database.connect();

/**
 * Middleware
 * Povolme přijímat JSON z frontendu
 */
 app.use(express.json({extended:false}));
 app.use(express.text({extended:false}));

/***
 * 
 * Routy - GET
 */
app.use("/", cors(), getGraph);

/***
 * ROUTY - POST
 */
app.use("/", saveGraph);

app.get("/", (req, res) => {
   res.send("jsi na hlavní stránce milý uživateli");
});

app.listen(PORT, (err) => {
   console.log("Server běží na portu: " + PORT);
})