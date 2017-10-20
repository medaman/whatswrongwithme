var express = require("express");
var db = require("../models");
var makeDir = require("make-dir");
var bodyParser = require("body-parser");
var fs = require("fs");

var router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

/*
//read from db and display the newest file's waveform and assign 5 play button to reflect the 5 newest wav file.
router.get("/media", function(req, res){
    
    console.log("hit /media with get method");

    db.Media.findAll({

        order: [["id", "DESC"]],
        limit: 5,

    }).then(function(media){

        res.render("index", {data: media})

    })

});
*/

//sends the result from db as json so the correct wave file is played back
router.get("/media/data/:id", function(req, res){
    
    console.log("hit /meia/data with get method");
/*
    var nameString = req.params.name;
    var nameArr = nameString.split("_");
    console.log("username is: " + nameArr);
    var fName = nameArr[0];
    var lName = nameArr[1];

    db.User.findOne({
        
                where: {
                    firstName: fName,
                    lastName: lName
                },
                include: [db.Doctor, db.Patient]
        
    }).then(function(data){
*/
        var patientId = req.params.id;
        console.log(patientId);


        db.Media.findAll({
        
                where: {
                    patientId: patientId,
                },
                include: [db.Patient],
                order: [["id", "DESC"]],
                limit: 5,
        
            }).then(function(result){
        
                res.json(result);
        
            })


    /*})*/


});
router.post('/media/:id', function (req, res) {

  
    var audioBlob = req.body;
    /*var nameString = req.params.name;*/
    /*var nameArr = nameString.split("_");*/
    var now = Date.now();
    var fileName = now + ".wav";
    //var location = 'media/' + 'username/' + '/wav';
    //var patientId = 0;
    var patientId = req.params.id;

    /*console.log(nameArr);
    var fName = nameArr[0];
    var lName = nameArr[1];

    db.User.findOne({

        where: {
            firstName: fName,
            lastName: lName
        },
        include: [db.Patient]

    }).then(function(result){*/
/*        console.log("-----------------")
        console.log("-----------------")
        console.log("-----------------")
        console.log("-----------------")
        console.log(patientId);
        console.log("-----------------")
        console.log(patientId);
        console.log("-----------------")
        console.log("-----------------")
        console.log("-----------------")
        console.log("-----------------")
*/        /*var patientId = result.Patient.dataValues.id;*/
        /*console.log(result.Patient.dataValues.id);*/
        location = 'media/' + patientId + '/wav';

        makeDir(location).then(path => {
            
                    fs.writeFile(path + "/" + fileName, audioBlob, function(err){
                        
                        if (err) {
                        
                            return console.log(err);
                        
                        }
            
                        console.log("written file");
            
                        //using Media_Test
                        db.Media.create({
            
                            filename: fileName,
                            location: location,
                            PatientId: patientId,
                            type: "wav"
                            //PatientId: req.params.id
            
                        }).then(function(result){
            
                            res.json("written file");
            
                        }).catch(function(err){
            
                            return console.log(err);
            
                        })
                  
                    })
            
                });

/*
    }).catch(function(err){

        throw err;

    })*/


    
});

//This is for uploading any file.
router.post("/media/api/upload", function(req, res) {
    var post = req.body;
    var id = post.id;
    var file = req.files.upload;
    var fileName = file.name;

    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
      file.mv('views/uploads/'+file.name, function(err) {
        if (err) {
          return console.log(err);
        }
        db.Media.create({

            filename: fileName,
            location: "",
            type: "image",
            PatientId: id

        }).then(function(data){

            res.redirect("/myfiles");

        }).catch(function(err){

            throw err;

        })
      });
    } else if(file.mimetype == "video/mp4" ||file.mimetype == "video/3gpp"||file.mimetype == "video/mpeg"||file.mimetype == "video/x-msvideo"||file.mimetype == "video/quicktime" ){
      file.mv('views/uploads/'+file.name, function(err) {
        if (err) {
          return err;
        }
        db.Media.create({

            filename: fileName,
            location: "",
            type: "video",
            PatientId: id

        }).then(function(result){

            res.redirect("/myfiles");

        }).catch(function(err){

            throw err;

        })
      });
    } else if(file.mimetype == "audio/mpeg" ||file.mimetype == "audio/ogg"||file.mimetype == "audio/wav"||file.mimetype == "video/x-msvideo"||file.mimetype == "video/quicktime" ){
      file.mv('views/uploads/'+file.name, function(err) {
        if (err) {
          return err;
        }
        db.Media.create({

            filename: fileName,
            location: "",
            type: "audio",
            PatientId: id

        }).then(function(result){

            res.redirect("/myfiles");

        }).catch(function(err){

            throw err;

        })
      });
    } else {
      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render("hello");
    }
})

//This is for getting the list of all files for a particular patient.
router.get("/all-patient-uploads/:patientId", function(req, res) {
    db.Media.findAll({ where: { PatientId: req.params.patientId}}).then(function(data){
        res.json(data)
    })
})


module.exports = router;