

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require('./song.js')

var AlbumSchema = new Schema({
    artistName : String,
    name : String,
    releaseDate: String,
    songs:[Song],
    genres: [String]
});
var Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;