const mysql = require("mysql");

const db = mysql.createPool({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b023ea9187d485',
    password: 'a5bd0165',
    database: 'heroku_caad988da016f21'
});

module.exports = db;