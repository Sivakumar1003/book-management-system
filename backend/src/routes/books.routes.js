const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { roleAuthorization } = require('../middlewares/roleAuthorization');
const { getAllBooks, addBook } = require('../controlers/books.controler');

const router = express.Router();

router.route('/allBooks').get(verifyToken, roleAuthorization(["admin", "user"]), getAllBooks);
router.route('/addBook').post(verifyToken, roleAuthorization(["admin"]), addBook)

module.exports = router;