const Books = require('../models/books.model')

exports.getAllBooks = (req, res) => {
    Books.getAllBooks((error, allbooks) => {
        if (error) {
            return res.status(400).json({ message: "Database connection failed.", error })
        }
        res.status(200).json({ message: "sucess", allbooks });
    })
}

exports.addBook = (req, res) => {
    const { title, author, description, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content must required."})
    }

    const book = new Books({title, author, description, content, userId: req.user.id});

    Books.addBook(book, (error, response) => {
        if(error) {
            return res.status(500).json({ message:  "Database connection failed.", error})
        }
        
        if (response.affectedRows > 0) {
            res.status(201).json({ message: "Added successfully.", response});
        } else {
            res.status(500).json({ message: "Failed to add book." });
        }
    })

}