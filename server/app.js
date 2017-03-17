const _config = require('./_config');
const authCheck = require('./middleware/authCheck');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const express = require('express');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const redis = require("redis");
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

var app = express()

//Nunjucks configuration
nunjucks.configure('server/templates', {
  autoescape: false,
  express   : app
});

//App setup
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/static')));
app.use(session({
    name: "pokeslots_session",
	secret: _config.SERVER_SECRET,
	store: new RedisStore({ client: redis.createClient()}),
	saveUninitialized: false,
	resave: true,
	cookie: {
		maxAge: 3600000,
		secure: _config.SECURE_COOKIE
	}
}));
app.use(authCheck());

// App routes
const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const slots = require('./routes/pokeslots');
const users = require('./routes/users');

app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);

// app.use(csrf());

app.use('/slots', slots);
app.use('/users',  users);
app.use('/', function(req, res, next) {
    res.redirect('/slots');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
