const mysql = require('./db');

const Books = function (book) {
    this.title = book.title;
    this.author = book.author || "Unknown";
    this.description = book.description || "No description";
    this.content = book.content;
    this.uploaded_by = book.userId;
}

Books.getAllBooks = (result) => {
    mysql.query('SELECT * FROM books', (error, response) => {
        if (error) {
            result(error);
        }
        result(null, response);
    })
}

Books.addBook = (book, result) => {
    mysql.query(
        "INSERT INTO books (title, author, description, content, uploaded_by ) VALUES (?, ?, ?, ?, ?)",
        [book.title, book.author, book.description, book.content, book.uploaded_by],
        (error, response) => {
            if (error) {
                return result(error);
            }
            result(null, response);
        
        }
    )
}

module.exports = Books;