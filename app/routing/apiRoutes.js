// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friend data
// ===============================================================================
var friendData = require("../data/friends.js");

module.exports = function(app) {
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/api/friends", function(req, res) {
    res.json(friendData)
  });

app.post("/api/friends", function(req, res) {
  var newperson = req.body;
  console.log(newperson);

  var mostCompatibileName = "";
  var mostCompatibilePic = "";
  var leastDifference = 20; //most compatibile
  for (var i=0; i<friendData.length;i++) {
    var totalDifference = 0;
    for (var j=0; j < 10;j++) {
      totalDifference += Math.abs(parseInt(newperson["scores"][j])-friendData[i]["scores"][j]);
    }
    if (totalDifference < leastDifference) {
      mostCompatibileName = friendData[i]["name"];
      mostCompatibilePic = friendData[i]["photo"];
      leastDifference = totalDifference;
    }
  }
  console.log(leastDifference);
  console.log(mostCompatibileName);
  console.log(mostCompatibilePic);
  res.json({ name: mostCompatibileName, photo: mostCompatibilePic });
  });
}