const { getSlugAndDescription } = require("../models/get.models");

exports.getSlugAndDescription = (req, res) => {
  getSlugAndDescription().then((topics) => {
      res.status(200).send({ topics: topics });
  });
    
};

 