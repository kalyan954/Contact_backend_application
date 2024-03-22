const express = require('express');
const router = express.Router();
const { register, login, current } = require('../Controllers/userControllers');
const validateToken = require('../middleware/accessTokenHandler')

router.post('/register',register);
router.post('/login',login);
router.get('/current', validateToken, current);

module.exports = router;