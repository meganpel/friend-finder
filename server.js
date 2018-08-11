var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require(path.join(__dirname, "./routing/apiRoutes"))(app);
require(path.join(__dirname, "./routing/htmlRoutes"))(app);

app.listen(process.env.PORT || PORT, function() {
  console.log("App listening on PORT " + PORT);
});