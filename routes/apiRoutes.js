// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friends = require("../app/data/friends");

module.exports = function (app) {

app.get("/api/friends", function (req, res) {
    res.json(friends);

    // console.log(friends[0]);

    // // friends.forEach(x => console.log(x.scores));

    // var testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9];
    // var differencesArray = [];
    // var sumArray = [];

    // // friends.forEach(x => console.log(x.scores[0]));


    // friends.forEach((x) => {
    //     // console.log(x.scores[1]);
    //     for(i=0; i< x.scores.length; i++) {
    //         // console.log(x.scores[i]);
    //         var difference = testArray[i] - x.scores[i];
    //         differencesArray.push(difference);

    //         for(i=0; i<differencesArray.length; i++) {
    //             var sum = 0;
    //             sum += sum + differencesArray[i];
    //             // console.log(sum);
    //             sumArray.push(sum);

    //         }
    //     }

    // });

    // console.log(sumArray);


});

app.post("/api/friends", function (req, res) {
    console.log(req.body);
    // friends.push(req.body);
    // res.json(true);

    // Set variables only needed for the post
    var difference = 40;
    var matchName = '';
    var matchPhoto = '';

    // For-each loop to go through the data in friends.js to find a match
    friends.forEach(function (friend) {
        // Variables for comparing matches
        var matchedScoresArray = [];
        var totalDifference = 40;

        // Function to assist in the addition reduce() below
        function add(total, num) {
            return total + num;
        }

        // This loops through each item of the scores arrays
        // from both the stored data and the new user, 
        // and then substracts, absolutes, and then pushes the 
        // new value to the matchedScoresArray
        for (var i = 0; i < friend.scores.length; i++) {
            matchedScoresArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

        }

        // This reduces the matchScoresArray into a single value in a variable
        totalDifference = matchedScoresArray.reduce(add, 0);

        // If the above value is smaller than the previous difference...
        if (totalDifference < difference) {
            // Set it as the previous difference...
            difference = totalDifference;
            // And set these variables to the appropriate friend match
            matchName = friend.name;
            matchPhoto = friend.photo;
        }
    });
    // Once the cycle is complete, the match with the least difference will remain,
    // and that data will be sent as a json object back to the client
    res.json({
        name: matchName,
        photo: matchPhoto
    });

    // This adds the new users sent data object to friends.js
    friends.push(req.body);



});

};