const express = require("express");
const app = express();
const { getSlugAndDescription, getArticles } = require("../controllers/get.controllers")
const endpoints = require("../endpoints.json")

app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).send({ endpoints: endpoints })
 })


app.get("/api/topics", getSlugAndDescription);

app.get("/api/articles/:article_id", getArticles);



app.all("*", (req, res) => {
    res.status(404).send({ msg : "please enter a valid url"})
})

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request!" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error!");
});

module.exports = app;