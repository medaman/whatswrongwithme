var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
    //res.render("login", {});
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
    //res.render("login", {});
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  });
  
  app.get("/signup-patient", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup-patient.html"));
  });
  
  app.get("/signup-doctor", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup-doctor.html"));
  });
  
  app.get("/profile-patient", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/profile-patient.html"));
  });
  
  app.get("/profile-doctor", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/profile-doctor.html"));
  });
  
  app.get("/dashboard-patient", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/dashboard-patient.html"));
  });
  
  app.get("/dashboard-doctor", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/dashboard-doctor.html"));
  });

  app.get("/myfiles", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/myfiles.html"));
  });

  app.get("/patientfiles", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/patientfiles.html"));
  });

};
