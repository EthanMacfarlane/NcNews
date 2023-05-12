const connection = require("../db/connection");

exports.createCommentNumber = (articles) => {
  return connection
    .query(
      `SELECT article_id, COUNT(*) as comment_count FROM comments GROUP BY article_id`
    )
    .then((result) => {
      const commentCounts = result.rows.reduce((acc, row) => {
        acc[row.article_id] = parseInt(row.comment_count);
        return acc;
      }, {});
      articles.forEach((article) => {
        article.comment_count = commentCounts[article.article_id] || 0;
      });
      return articles;
    });
};