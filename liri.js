// Require dotenv npm to link Spotify keys file
require("dotenv").config();

// Require keys.js file 
var keys = require("./keys.js");
var request = require("request");
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var fs = require("fs");


var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

if (process.argv[2] == 'concert-this' ) {
   
    var artist = process.argv.slice(3).join(" ")
    console.log(artist);
   
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var result  =  JSON.parse(body)[0];
        //console.log("Venue name " + result.venue.name);
        //console.log("Venue location " + result.venue.city);
        //console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY"));
        console.log(response);
    });

    // Name of the venue
    // Venue location
    // Date of the Event (use moment to format this as "MM/DD/YYYY")   
} else if ( process.argv[2] == 'spotify-this-song') {

    var songName = process.argv.slice(3).join(" ");

if (songName === undefined) {
        songName = "The sign by Ace of Base";
    } 
   

     spotify.search({ type: 'track', query: songName, limit: 10  }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }

            var tableArray = [];

            for (var i = 0; i < data.tracks.items.length; i++ ) {
                var result = {
                    artist : data.tracks.items[i].album.artists[0].name,
                    album_name : data.tracks.items[i].album.name,
                    song_name : data.tracks.items[i].name,
                    preview_url : data.tracks.items[i].preview_url 
                }
                tableArray.push(result);
            }
      
            
            
    
            console.log(tableArray);

       
    });


// If no song is provided then your program will default to "The Sign" by Ace of Base.
} else if ( process.argv[2] == 'movie-this') {
    var movieName = process.argv.slice(3).join(" ");

    // if query that is passed in is undefined, Mr. Nobody becomes the default
    if (movieName == undefined) {
        movieName = "Mr. Nobody";
    } 
    
    // HTTP GET request

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body) {
        console.log(response);
        if (!error && response.statusCode === 200) {
          console.log("* Title of the movie:         " + JSON.parse(body).Title);
          console.log("* Year the movie came out:    " + JSON.parse(body).Year);
          console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
          console.log("* Country produced:           " + JSON.parse(body).Country);
          console.log("* Language of the movie:      " + JSON.parse(body).Language);
          console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
          console.log("* Actors in the movie:        " + JSON.parse(body).Actors);
  
          // For loop parses through Ratings object to see if there is a RT rating
          // 	--> and if there is, it will print it
          for(var i = 0; i < JSON.parse(body).Ratings.length; i++) {
              if(JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
                  console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
                  if(JSON.parse(body).Ratings[i].Website !== undefined) {
                      console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
                  }
              }
          }
        }
      });
    


} else if ( process.argv[2] == 'do-what-it-says') {
    console.log('do what it says')
}
   
//  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });