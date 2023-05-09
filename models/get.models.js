const connection = require("../db/connection");


exports.getSlugAndDescription = () => { 
    return connection
    .query(`SELECT * FROM topics`)
        .then((topics) => {
        return topics.rows;
    }) 
};
