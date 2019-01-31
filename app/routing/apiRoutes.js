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
    let newFriendScores = req.body.scores;
    let scoresArray = [];
    let friendCount = 0;
    let bestMatch = 0;

    //runs through all current friends in list
    for (let i = 0; i < friends.length; i++) {
      let scoresDiff = 0;
      //run through scores to compare friends
      for (let j = 0; j < newFriendScores.length; j++) {
        scoresDiff += Math.abs(
          parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j])
        );
      }

      //push results into scoresArray
      scoresArray.push(scoresDiff);
    }

    //after all friends are compared, find best match
    for (let i = 0; i < scoresArray.length; i++) {
      if (scoresArray[i] <= scoresArray[bestMatch]) {
        bestMatch = i;
      }
    }

    //return bestMatch data
    let bff = friends[bestMatch];
    res.json(bff);

    //pushes new submission into the friends array
    friends.push(req.body);
  });
};
