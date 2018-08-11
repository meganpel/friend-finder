var path = require("path");
var fs = require("fs");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {

    fs.readFile(path.join(__dirname, "../app/data/friends.js"), function read(err, data) {
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/friends", function(req, res) {
    fs.readFile(path.join(__dirname, "../app/data/friends.js"), function read(err, data) {
      var friends = JSON.parse(data);

      var name = req.body.name;
      var photo = req.body.photo;
      var scores = req.body.scores;

      var bestFriend = null;
      var bestFriendDifference = 0;

      for (var i = 0; i < friends.length; i++) {

        var difference = 0;
        for (var s = 0; s < scores.length; s++) {
          difference = difference + Math.abs(friends[i].Scores[s] - scores[s]);
        }

        if (bestFriend === null || difference < bestFriendDifference) {
          bestFriend = friends[i];
          bestFriendDifference = difference;
        }
      }

      // save new person to the friends json
      var newFriend = {
        "Name": name,
        "Photo": photo,
        "Scores": scores
      };

      friends.push(newFriend);

      fs.writeFile(path.join(__dirname, "../app/data/friends.js"), JSON.stringify(friends), function(err) {
        var response = {
          name: bestFriend.Name,
          photo: bestFriend.Photo,
        };

        res.send(response);
      });

    });

  });
};
