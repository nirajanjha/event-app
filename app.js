var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var adminRouter = require('./routes/admin');
var eventRouter = require('./routes/admin/event');

// importing Mongoose
var mongoose = require('mongoose');
mongoose.Promise= global.Promise;

//connecting with MongoDB
mongoose.connect("mongodb://localhost:27017/freequency", { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true }, (err) => {
  if(!err){
    console.log('MongoDB connection succeeded.');
  }else{
    console.log('Error in DB Connection : ' + JSON.stringify(err, undefined, 2));
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static('uploads'));

app.use(expressSession({
  secret: 'SlaughterFace',
  saveUninitialized: false,
  resave: false
}));

// Define route
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/admin', adminRouter)
app.use('/admin/event', eventRouter)

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
