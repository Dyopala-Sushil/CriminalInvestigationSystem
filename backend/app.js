var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config();
var cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('./db.init');


var indexRouter = require('./routes/index');

var app = express();
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//cloudinary configuration
cloudinary.config({
  cloud_name : process.env.CLOUD_NAME,
  api_key : process.env.API_KEY,
  api_secret : process.env.API_SECRET
})


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    data: null,
    status: false,
    message: err.message ? err.message : err
  })
});

app.listen(9000, '127.0.0.1', (error) => {
  if(error) {
    console.log("Error in listening the server");
    console.log("Error: ", error);
  } else {
    console.log(`Server running in PORT ${process.env.PORT}`);
  }
})
