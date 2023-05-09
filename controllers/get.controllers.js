const { getSlugAndDiscription } = require("../models/get.models");

exports.getSlugAndDiscription = (req, res) => {
  getSlugAndDiscription().then((topics) => {
      res.status(200).send({ topics: topics });
      console.log (topics)
  });
    
};

 