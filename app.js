var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var AWS = require("aws-sdk");
var expressSession = require('express-session');
var flash=require('connect-flash');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login');
var bitlinkRouter = require('./routes/bitlink');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({secret: 'WHg0jIQteq', saveUninitialized: true, resave: false}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/login',loginRouter);
app.use('/bitlink',bitlinkRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
