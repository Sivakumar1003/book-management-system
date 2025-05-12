const Books = require('../models/books.model')

exports.getAllBooks = (req, res) => {
    Books.getAllBooks((error, allbooks) => {
        if(error) {
            res.status(400).json({message: "Database connection failed.", error})
        }
        res.status(200).json({message: "sucess", allbooks});
    })
}