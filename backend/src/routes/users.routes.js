const express = require('express');
const { addUser } = require('../controlers/users.controler');

const router = express.Router();

router.route('/registor').get(addUser);

module.exports = router; 