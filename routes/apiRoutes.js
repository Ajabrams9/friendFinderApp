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

    var difference = 40;
    var matchName = '';
    var matchPhoto = '';

    friends.forEach(function (friend) {
        var matchedScoresArray = [];
        var totalDifference = 40;

        function add(total, num) {
            return total + num;
        }
        for (var i = 0; i < friend.scores.length; i++) {
            matchedScoresArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

        }

        totalDifference = matchedScoresArray.reduce(add, 0);

        if (totalDifference < difference) {
           
            difference = totalDifference;
            matchName = friend.name;
            matchPhoto = friend.photo;
        }
    });

    res.json({
        name: matchName,
        photo: matchPhoto
    });

    friends.push(req.body);


});

};