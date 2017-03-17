const express = require('express');
const nunjucks = require('nunjucks');
const passport = require('passport');
const userUtils = require('../../lib/user');

const router = express.Router();

/* POST message */
router.get('/', (req, res, next) => {
	if(req.session.user) {
		return res.redirect('/slots');
	}

	userUtils.getUserByUsername('bla');

	const html = nunjucks.render('signup/signup.html', {});
	return res.send(html);
});

router.post('/', (req, res, next) => {
	if(req.session.user) {
		return res.redirect('/slots');
	}

	let body = req.body;

	if(body.password[0] !== body.password[1]) {
		const html = nunjucks.render('signup/signup.html', {
			error: "Passwords did not match, please try again"
		});
		return res.send(html);
	}

	userUtils.userExists(body.username)
		.then(exists => {
			if(exists) {
				const html = nunjucks.render('signup/signup.html', {error: 'Username already taken!'});
				return res.send(html);
			} else {
				userUtils.createUser(req.body)
					.then(response => {
						return res.redirect('/login')
					});
			}
		});
});

module.exports = router;
