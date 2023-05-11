const { getSlugAndDescription } = require("../models/get.models");
const { retreiveArticle } = require ("../models/get.models")

exports.getSlugAndDescription = (req, res) => {
  getSlugAndDescription().then((topics) => {
      res.status(200).send({ topics: topics });
  });
    
};

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;

  retreiveArticle(article_id)
    .then((article) => {
      res.status(200).send({ article: article[0] });
    })
    .catch(next)
};