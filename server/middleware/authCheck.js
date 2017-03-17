module.exports = function(options) {
	return function(req, res, next) {
		if(req.path !== '/login' && req.path !== '/signup' && !req.session.user) {
			return res.redirect('/login');
		}
		next();
	}
}
