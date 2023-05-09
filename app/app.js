const express = require("express");
const app = express();
const { getSlugAndDescription } = require("../controllers/get.controllers")
const endpoints = require("../endpoints.json")

app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).send({ endpoints: endpoints })
 })


app.get("/api/topics", getSlugAndDescription);



app.all("*", (req, res) => {
    res.status(404).send({ msg : "please enter a valid url"})
})



module.exports = app;