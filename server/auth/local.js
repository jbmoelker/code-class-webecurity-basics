const LocalStrategy = require('passport-local').Strategy;
const test_user = {
	username: 'Henkie',
	password: 'spenkie',
	id: '1'
}
module.exports = new LocalStrategy(
	function(username, password, done) {
		console.log('hoooi');
		if(username === 'Henkie' && password === 'spenkie') {
			return done(null, test_user);
		} else {
			return done(null, false, { message: 'Foutje gozert' });
		}
	}
);
