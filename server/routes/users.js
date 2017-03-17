const express = require('express');
const nunjucks = require('nunjucks');
const userUtils = require('../../lib/user');

const router = express.Router();

/* POST message */
router.get('/profile', (req, res, next) => {
	let html = nunjucks.render('profile/profile.html', req.session.user);

	res.send(html);
});

router.post('/transfer', (req, res, next) => {
	var body = req.body;
	userUtils.transferTo(req.session.user, body.to, body.ammount)
		.then(r => {
			console.log('rr: ', r);
			res.status(200).end();
		})
})

// router.get('/transfer', (req, res, next) => {
// 	userUtils.getAllUsers()
// 		.then(users => {
// 			res.send(nunjucks.render('transfer/transfer.html', {
// 				users: users,
// 				current_user: req.session.user
// 			}));
// 		});
// });

module.exports = router;
