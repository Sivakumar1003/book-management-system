const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { roleAuthorization } = require('../middlewares/roleAuthorization');
const { getAllBooks } = require('../controlers/books.controler');

const router = express.Router();

router.route('/allBooks').get(verifyToken, roleAuthorization(["admin", "user"]), getAllBooks);

module.exports = router;