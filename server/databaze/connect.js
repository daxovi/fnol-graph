const Mongoose = require("mongoose");
const dotenv = require("dotenv");

class dbConnect {
    connect(){
        dotenv.config();

        Mongoose.connect(process.env.DB_CONNECT, {}, (err) => { 
            if(err) throw new Error("K databázi se nejde připojit");
            else console.log("Připojeno úspěšně k databázi");
         })
    }
}

module.exports = dbConnect;