const express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("db.db");
var killlimit=0;
app.post("/",(req,res)=>{
    try {
        killlimit++;
        if (killlimit > 110) {
            res.send("Too many requests");

            return;
        }
        console.log(req.body);
        if (!req.body.login || !req.body.password) {

            res.status(400).send("Bad request");
        } else {
            let login = req.body.login;
            let password = req.body.password;
            if (login !== "admin") {
                res.send(403).send("Bo tak");
                return;
            }
            if (password.match("GPCTF{[a-zA-Z0-9_]{14}}")) {
                db.get(`Select count(*) from users where password="${password}"`, (err, row) => {
                    if (err){
                        console.error(err);
                        res.send("Error");
                        return;
                    }
                    else {
                        if (row["count(*)"] > 0) {
                            res.status(200).send("OK");
                        } else
                            res.status(401).send("Złe hasło");
                    }
                })
            } else {
                res.send(400).send("Hasło nie spełnia regexa");
                return;
            }
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
    }
});
app.listen(3000,()=>{
    console.log("Server started");
});
process.on("uncaughtException",(err)=>{
    let ignore=true;
})
