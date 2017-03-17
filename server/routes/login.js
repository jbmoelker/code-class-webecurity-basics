const crypto = require('../../lib/crypto');
const express = require('express');
const nunjucks = require('nunjucks');
const userUtils = require('../../lib/user');

const router = express.Router();

/* POST message */
router.get('/', (req, res, next) => {
	const html = nunjucks.render('login/login.html', {});
	return res.send(html);
});

router.post('/', (req, res, next) => {
	let body = req.body;

	userUtils.getUserByUsername(body.username)
		.then(user => {
			if(user.password === crypto.dataToHex(body.password)) {
				req.session.user = user;
				return res.redirect('/slots');
			} else {
				const html = nunjucks.render('login/login.html', {error: 'Password or username did not match'});
				return res.send(html);
			}
		}).
		catch(err => {
			const html = nunjucks.render('login/login.html', {error: 'Password or username did not match'});
			return res.send(html);
		})
});

module.exports = router;
