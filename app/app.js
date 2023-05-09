const express = require("express");
const app = express();
const {getSlugAndDiscription} = require ("../controllers/get.controllers")

app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).send({ })
})

app.get("/api/topics", getSlugAndDiscription);



app.all("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../endpoints.json"));
})



module.exports = app;