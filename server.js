//Dependencies
var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
var path = require("path");
var fs = require("fs");
var http = require("http");
var busboy = require("then-busboy");
var fileUpload = require("express-fileupload");

//Initialize database
var db = require("./models");

db.sequelize.sync({ force: true }).then(function(){


  //Set up Express
  var app = express();
  var PORT = process.env.PORT || 8080;

  //Set up method-override, body-parser, and handlebars
  app.use(methodOverride("_method"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.engine("handlebars", handlebars({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");

  //Send to controller
  app.use(express.static(__dirname + '/views'));

  app.use(fileUpload());

  //Set up Controllers
  var mediaRoutes = require("./controllers/media_controller.js");
  var profileRoutes = require("./controllers/profileController.js");
  var medicalChartRoutes = require("./controllers/medicalChartController.js");
  app.use("/", mediaRoutes);
  app.use("/", profileRoutes);
  app.use("/", medicalChartRoutes);
  app.use(express.static("media"));

  //Routes
  require("./routes/html-routes.js")(app);

  //Initialize server
  app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
  });

}).catch(function(err){
  return console.log(err);
});