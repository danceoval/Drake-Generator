var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var api = require('genius-api');
var fs = require('fs');
var request = require('request-promise');
var Promise = require("bluebird");
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
  var options = [];
  var lyricsSet = [];
  function parseLyrics($) { // cheerio parser
    $('.song_body-lyrics .lyrics p').filter(function(){
      var data = $(this);
      var songLyrics = data.text();
      lyricsSet.push(songLyrics)
    })
  }
  //Scrape Genius for artist
  genius.search('Wocka Flocka').then(function(response) {
    var hits = response.hits;
    var promises = []
    hits.forEach(function(hit) {
      var id = hit.result['id']
      promises.push(genius.song(id));
    })
    return Promise.all(promises)
  })
  .then(function(songs) { 
    if(songs.length > 5) {
      songs = songs.slice(0,5)
    }
    songs.forEach(function(song) {
      var o = {
        uri: song.song.url,
        transform: function (body) {
            return cheerio.load(body);
        }
      }
      options.push(o);
    });
    return request(options[0])
  })
  .then(function($){
    parseLyrics($);
    return request(options[1])
  })
  .then(function($){
    parseLyrics($);
    return request(options[2])
  })
  .then(function($){
    parseLyrics($);
    return request(options[3])
  })
  .then(function($){
    parseLyrics($);
    return request(options[4])
  })
  .then(function($){
    parseLyrics($);
    var corpus = lyricsSet.join('');
    res.json({ "corpus" : corpus })
  })
  .catch(function(err){
    console.log('ERR: ', err)
  })
})



// SERVER
var port = process.env.PORT || 4000
var server = app.listen(port, function(){
  console.log('listening on port ', port);
});