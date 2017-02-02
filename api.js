var express = require('express');
var app = express();
var db = require('./db.json');
var path = require('path');
var http = require('http');
var api = require('genius-api');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio')
var token = "F-rW2gY238QcxQ9oo3G75kNphoq7gsBiwWy1npm0u5PcKvQxGHFQYobR_jgsdXgD"
var genius = new api(process.env.GENIUS_CLIENT_ACCESS_TOKEN || token);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});


// ROUTES

app.get('/', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
  genius.song(378195).then(function(response) {
    console.log('song', response.song.path); 
    var songPath = 'https://genius.com' + response.song.path;
    request(songPath, function(error, response, html){
        if(!error){
          var $ = cheerio.load(html);
          $('.lyrics').filter(function(){
              var data = $(this);
              console.log('d',data.text())
          })
        } else {
          console.log('err', error)
          return
        }
    })
  
  })
})



// SERVER
var port = process.env.PORT || 4000
var server = app.listen(port, function(){
  console.log('listening on port ', port);
});