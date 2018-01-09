// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var db = require('./models')
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

/* hard-coded data */



/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
  // res.json(albums);

  db.Album.find({}, function(err, docs){
    console.log("here are my db results")
      console.log(docs)
      res.json(docs)
  })

});

app.post("/api/albums", function album_create(req, res){
  // console.log(req.body)
  // console.log('4444444')
  var newAlbum = db.Album({
    name: req.body.name,
    artistName: req.body.artistName,
    releaseDate: req.body.releaseDate,
    genres: req.body.genres
  })
  newAlbum.save (function(err, Album){
    if (err) {
      return console.log("There is an error, fuckface");
    }
    res.json(Album);
  });
  // let genres = (req.body.genres).split(",");
  // console.log(genres);

  // db.Album.create( {artistName: req.body.artistName, name: req.body.name, releaseDate: req.body.releaseDate, genres: genres}, function(err, album){
  //   console.log("The album was successfully created: " + album);
  // });
  res.send(req.body);
  // res.send(req.body);
  // db.Album.create({}, function(err, docs){
  //   res.json(docs)
  });
 


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
