const express = require('express');

const router = express.Router();
const userController = require('../Controller/usersController')


router.get('/allUser/:page', userController.users)


module.exports = router;