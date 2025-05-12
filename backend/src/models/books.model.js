const mysql = require('./db');

const Books = function (book) {
    this.title = book.title || "Unknown";
    this.author = book.author || "Unknown";
    this.description = book.description || "Unknown";
    this.content = book.content || "Unknown";
}

Books.getAllBooks = (result) => {
    mysql.query('SELECT * FROM books', (error, response) => {
        if (error) {
            result(error);
        }
        result(null, response);
    })
}

module.exports = Books;