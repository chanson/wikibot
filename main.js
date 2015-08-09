var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var search = require('./routes/search');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', search);

// catch error and forward to handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("ERROR=================================");
    console.log(err.message);
    console.log("======================================");
});

module.exports = app;
