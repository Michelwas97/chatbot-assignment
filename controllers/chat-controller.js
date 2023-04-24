const express = require('express')
const router = express.Router();

/** Home route **/
router.get('/chatlobby', function(req, res) {
    const username = req.query.username;
    const room = req.query.room;
    res.render('chatlobby', { username, room });
});


module.exports = router;