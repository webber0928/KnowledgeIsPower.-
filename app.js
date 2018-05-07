let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// let customApi = require('./routes/customApi');
// let sampleApi = require('./routes/sample');
let routes = require('./routes');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/api/custom-api', customApi);
// app.use('/api/custom-sample', sampleApi, sampleApi);

// app.use(`/api/demo1`, routes['demo1']);
// app.use(`/api/demo2`, routes['demo2']);
// app.use(`/api/demo3`, routes['demo3']);
// app.use(`/api/demo4`, routes['demo4']);
// app.use(`/api/demo5`, routes['demo5']);
// app.use(`/api/demo6`, routes['demo6']);
// app.use(`/api/demo7`, routes['demo7']);
app.use(`/api/demo8`, routes['demo8'].checkGoogleHomeOAuth, routes['demo8'].pretreat, routes['demo8']);
// app.use(`/api/demo9`, routes['demo9']);
app.use(`/api/demo10`, routes['demo10'].pretreat);
// app.use(`/api/demo10`, routes['demo10'].pretreat, routes['demo10']);
app.use(`/api/demo11`, routes['demo11'].pretreat, routes['demo11']);

app.use('*', function(req, res, next) {
  res.json({data: 'Hello Google!'});
});

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
  res.json(res.locals);
});

module.exports = app;
