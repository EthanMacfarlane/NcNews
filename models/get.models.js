const connection = require("../db/connection");


exports.getSlugAndDescription = () => { 
    return connection
    .query(`SELECT * FROM topics`)
        .then((topics) => {
        return topics.rows;
    }) 
};


exports.retreiveArticle = (article_id) => {
  return connection
    .query(` SELECT  *  FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found!" });
      }
      return result.rows;
    });
};