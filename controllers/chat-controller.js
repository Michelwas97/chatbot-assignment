const express = require('express')
const router = express.Router();

/** Home route **/
router.get('/chatlobby', async (req, res) => {
    res.render('pages/chatlobby');
})


module.exports = router;