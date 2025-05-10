const express = require('express');
const { addUser, loginUser } = require('../controlers/users.controler');

const router = express.Router();

router.route('/registor').post(addUser);
router.route('/login').get(loginUser);

module.exports = router; 