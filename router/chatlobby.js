const express = require('express')
const router = express.Router();
const chat = require('../controllers/chat-controller')

/** Home page route **/
router.get('/chatlobby', chat)

module.exports = router;