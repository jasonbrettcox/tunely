var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

module.exports.Album = require ('./album.js')
// add all models here such as songs