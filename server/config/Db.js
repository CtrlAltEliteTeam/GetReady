const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'james',
    password: 'jamesthackeray',
    database: 'crud-get-ready'
});

module.exports = db;