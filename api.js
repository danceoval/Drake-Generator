var express = require('express');
var app = express();
var db = require('./db.json');
var path = require('path');


app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});


// ROUTES

app.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.json(db)
})



// SERVER
var port = process.env.PORT || 4000
var server = app.listen(port, function(){
  console.log('listening on port ', port);
});