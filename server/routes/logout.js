const express = require('express');

const router = express.Router();

/* POST message */
router.all('/', (req, res, next) => {
    if(req.session.user) {
        delete req.session.user;
    }
    
    return res.redirect('/login');
});

module.exports = router;
