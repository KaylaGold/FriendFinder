//Required dependecies
let path = require('path');

// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends.js data.
let friendsArray = require('../data/friends.js');

// ===============================================================================
// ROUTING
module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the survey)
    app.get('/api/friends', function (req, res) {
        res.json(friendsArray);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a  surveu... this data is then sent to the server...
    // Then the server saves the data to the friends array)
    app.post("/api/friends.js", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a friend or not.
        // req.body is available since we're using the body-parser middleware
        //Capturing the user input object
        let userInput = req.body;

        let userResponses = userInput.scores;

        //Comparing user with their best friend match
        let matchName = '';
        let matchPhoto = '';
        let totalDifference = 10000;

        //Loop through all the friend possibilities in the database.
        for (let i = 0; i < friends.length; i++) {
            // console.log('friend=' + JSON.stringify(friends[i]));

            //Compute differences for each question
            let diff = 0;

            //Loop through all the scores of each friend.
            for (let j = 0; j < userResponses.length; j++) {
                //Calculate difference between the scores and sum them into totalDifference
                diff += Math.abs(friends[i].scores[s] - userResponses[j]);
            }

            //If score is the lowest difference, record friend match
            if (diff < totalDifference) {
                // console.log('Closest match found=' + diff);
                // console.log('Friend name =' + friends[i].name);
                // console.log("Friend image =" + friends[i].photo);

                totalDifference = diff;
                matchName = friends[i].name;
                matchPhoto = friends[i].photo;
            }

        }

        //Save the user's data to the database, which occurs after the check.
        friendsArray.push(userInput);
       

        //Return a JSON with the user's bestFriendMatch. This will be used by the HTML on the next page.
        res.json({ status: 'OK', matchName: matchName, matchPhoto: matchPhoto});

    });


};

