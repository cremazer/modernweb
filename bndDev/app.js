var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback');
const cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', require('./routes/api'));
app.use(history());
app.use(express.static(path.join(__dirname, '../', 'fnddev', 'dist')));

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
  // res.render('error');
  res.send(
      {
        msg: err.message
      }
  )
});

module.exports = app;

//mongodb connect
const mongoose = require('mongoose');
// const User = require('./models/users');
// console.log(User);
mongoose.connect('mongodb://localhost:27017/choims', { useNewUrlParser: true }, (err) => {
    if (err) return console.error(err);
    console.log('mongoose connnected!');
});

// User.create({ name: 'haha' })
//     .then(r => console.log(r))
//     .catch(e => console.error(e));

// User.find()
//     .then(r => console.log(r))
//     .catch(e => console.error(e));

// User.updateOne({ _id: '5c09fd2cf7a12f2a90208278' }, { $set: { age: 34 }})
//     .then(r => {
//         console.log(r);
//         return User.find()
//     })
//     .then(r => console.log(r))
//     .catch(e => console.error(e));
//
// User.deleteOne({ age: 77 })
//     .then(r => console.log(r))
//     .catch(e => console.error(e));
