// KEYS & VARIABLES

var keys = require("./keys.js");

var userInput = process.argv[2];
var userChoice = process.argv[3];

var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

var request = require("request");
var fs = require('fs');

// COMMANDS & OUTPUTS

switch (userInput, userChoice) {
    case "my-tweets":
        showTweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doCommand();
        break;
};

// COMMAND FUNCTIONS

function showTweets() {
    
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    
    var params = {
        screen_name: 'node_testing',
        count: 20,
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i<tweets.length; i++) {
                console.log("Tweet : '" + tweets[i].text + "' , created at " + tweets[i].created_at);
            } 
        } else {
            console.log(error);
        };
    });

};

function spotifySong(userChoice) {
    var userChoice = "The Sign Ace of Base"
    var spotify = new Spotify({
        id: keys.spotifyKeys.id,
        secret: keys.spotifyKeys.secret,
    });

    if (userChoice !== undefined) {
        songInput = userChoice;
    } 

    spotify.search({
        type: 'track',
        query: songInput,
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
        } else {
            //console.log(JSON.stringify(data));
            console.log("******************************************************");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song's Name: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("******************************************************");
        };
    });

};

function movieThis() {
    var movieName = process.argv.slice(3).join(" ");

    if (movieName === undefined) {
        movieName = "Mr. Nobody"
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
    
      if (!error && response.statusCode === 200) {
        
        console.log("******************************************************");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("******************************************************");

      }; 
    });
};

function doCommand() {
    fs.readFile("random.txt", "UTF8", function(error,data) {

        if (error) {
            console.log(error);
        } 
        console.log(data);

        var dataArr = data.split(",");
        var command = dataArr[0];
        var choice = dataArr[1];

        if (command === "spotify-this-song") {
            songInput = choice;
            spotifySong();
        } else if (command === "movie this") {
            movieName = choice;
            movieThis();
        } else if (command === "showTweets") {
            showTweets();
        }

    });
};