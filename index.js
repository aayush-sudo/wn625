const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");
const { response } = require("express");
require("dotenv").config();

// const server = HTMLOutputElement.createServer((req,res) => {
//     res.setHeader("Access-Control-Allow-Origin","*");
//     let path = url.parse(req.url,true);
// });

const app = express();
app.use(express());
app.use(express.json());

app.use(cors({
  origin: "https://wnapp625.web.app",
  methods: ["GET", "POST"],
  credentials: true
}));


app.post("/save",(req,res) => {
    //const url = "mongodb://0.0.0.0:27017";
    const url = process.env.mongodb_url;
    const con = new MongoClient(url);
    const db = con.db("wn25june25");
    const coll = db.collection("student");
    const doc = {"name":req.body.name, "choice":req.body.choice};
    coll.insertOne(doc)
    .then(response => {
        res.send(response);
    })
    .catch(error => {
        console.log("Error " + error);
    });
});

app.listen(9000, () => {console.log("Ready to Serve @ 9000");});