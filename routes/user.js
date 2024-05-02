const router = require('express').Router();

const userController = require('../controllers/user');

router.get('/login', userController.login);


module.exports = router;