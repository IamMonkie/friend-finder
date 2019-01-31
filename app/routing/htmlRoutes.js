// * A GET Route to `/survey` which should display the survey page.
// * A default, catch-all route that leads to `home.html` which displays the home page.
let path = require("path");

//routing

module.exports = function(app) {
  //default GET route that leads to home.html
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/survey.html"));
  });

  //a USE route to home page
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  });
};
