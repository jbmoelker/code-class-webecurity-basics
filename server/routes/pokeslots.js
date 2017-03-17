const express = require('express');
const nunjucks = require('nunjucks');
const userUtils = require('../../lib/user');

const router = express.Router();

/* GET message */
router.get('/', (req, res, next) => {
	userUtils.getAllUsers()
		.then(users => {
			res.send(nunjucks.render('pokeslots/pokeslots.html', {
				users: users,
				current_user: req.session.user
				// csrfToken: req.csrfToken()
			}));
		});
});

module.exports = router;
