// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends.js data.
let friends = require("../data/friends");

// ===============================================================================
// ROUTING
module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the survey)
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a  surveu... this data is then sent to the server...
    // Then the server saves the data to the friends array)
    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a friend or not.
        // req.body is available since we're using the body-parser middleware
        //Comparing user with their best friend match
        //Object to hold the best friend match
        let bestFriendMatch = {
            name: "",
            photo: "",
            matchDifference: 1000
        };



        //Take the result of the user's survey POST and parse it.
        let userData = req.body;
        let userName = userData.name;
        let userPhoto = userData.photo;
        let userScores = userData.scores;

        let totalDifference = 0;

        //Loop through all the friend possibilities in the database.
        for (let i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;

            //Loop through all the scores of each friend.
            for (let s = 0; s < friends[i].scores[s]; s++) {
                //Calculate difference between the scores and sum them into totalDifference
                totalDifference += Math.abs(parseInt(userScores[s]) - parseInt(friends[i].scores[s]));

                //If the sum of totalDifference is less than the difference of the best match
                //reset the bestFriendMatch as the new friend.
                if (totalDifference <= bestFriendMatch.matchDifference) {
                    bestFriendMatch.name = friends[i].name;
                    bestFriendMatch.photo = friends[i].photo;
                    bestFriendMatch.matchDifference = totalDifference;
                }
            }

        }

        //Save the user's data to the database, which occurs after the check.
        friends.push(userData);

        //Return a JSON with the user's bestFriendMatch. This will be used by the HTML on the next page.
        res.json(bestFriendMatch);
    });


};

