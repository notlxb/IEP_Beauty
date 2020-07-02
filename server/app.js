var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var request = require('request');

const stuinfoApi = require('./api/stuApi');

var opt = {
  host:'localhost',
  port:'8082',
  method:'POST',
  path:'/api/stu/querySch',
  headers:{
  }
};

// var multipart = require('connect-multiparty');

var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(multiparty({uploadDir:'./storage' }));
var cors = require('cors')

// app.use(async function (req,res,next) {
//   if (0){
//     await request({
//       url: 'http://www.kuaidi100.com/query?type=123&postid=123123',
//       method: "POST",
//       json: true,
//       headers: {
//         "content-type": "application/json",
//       },
//     }, function(error, response, body) {
//       if (!error && response.statusCode == 200) {
//         console.log(body);
//       }
//     });
//     return;
//   }
//   next();
// });

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'storage')));

app.use('/api/stu', stuinfoApi);

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
