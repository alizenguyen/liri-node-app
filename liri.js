// KEYS & VARIABLES

var keys = require("./keys.js");

var userInput = process.argv[2];
var userChoice = process.argv[3];

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

    var Twitter = require("twitter");
    
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    
    var params = {
        screen_name: 'node-testing',
        count: 20,
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
};

function spotifySong() {

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: "342380a4e1574dcea4a9500716e28c1d",
        secret: "fec13ce1905749b8a6df6f916864b9d0",
    });

    spotify.search({
        type: 'track',
        query: 'All the Small Things'
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });

};