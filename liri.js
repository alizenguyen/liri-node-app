// KEYS & VARIABLES

var keys = require("./keys.js");

var userInput = process.argv[2];
var userChoice = process.argv[3];

var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

// COMMANDS & OUTPUTS

switch (userInput) {
    case "my-tweets":
        showTweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        break;

    case "do-what-it-says":
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

function spotifySong() {
    var songInput = "The Sign"
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
            console.log(JSON.stringify(data, null, 2));
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
        };
    });

};