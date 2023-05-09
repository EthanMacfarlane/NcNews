const connection = require("../db/connection");


exports.getSlugAndDiscription = () => { 
    return connection
    .query(`SELECT * FROM topics`)
        .then((topics) => {
        return topics.rows;
    }) 
};
