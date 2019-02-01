//* A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//* A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
let friends = require("../data/friends.js");

// Export the function
module.exports = function(app) {
  //a GET route that displays JSON of all possible friends
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    //grabs the new friend's scores to compare with friends in friends array
    // let newFriendScores = req.body.scores;
    // let scoresArray = [];
    // let friendCount = 0;

    let bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };
    console.log(req.body);

    let userData = req.body;
    let userScores = userData.scores;
    let totalDifference = 0;
    //runs through all current friends in list
    for (let i = 0; i < friends.length; i++) {
      console.log(friends[i].name);

      //run through scores to compare friends
      for (let j = 0; j < friends[i].scores[j]; j++) {
        totalDifference += Math.abs(
          parseInt(userScores[j]) - parseInt(friends[i].scores[j])
        );
      }

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friend[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference - totalDifference;
      }

      //push results into scoresArray
      friends.push(userData);
    }

    res.json.push(bestMatch);
  });
};
