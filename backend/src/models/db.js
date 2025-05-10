const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

connection.connect(error => {
    if (error) {
        console.log(error);
    } else {
        console.log("database connceted.")
    }
})

module.exports = connection;