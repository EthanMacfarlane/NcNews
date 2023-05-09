const express = require("express");
const app = express();
const {getSlugAndDescription} = require ("../controllers/get.controllers")

app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).send({msg : "all ok" })
})

app.get("/api/topics", getSlugAndDescription);



app.all("*", (req, res) => {
    res.status(404).send({ msg : "please enter a valid url"})
})



module.exports = app;