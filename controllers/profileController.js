var express = require("express");
var db = require("../models");
var profileRouter = express.Router();
var path = require("path");
var bodyParser = require("body-parser");

//Set up parsing
profileRouter.use(bodyParser.urlencoded({ extended: true }));
profileRouter.use(bodyParser.json());
profileRouter.use(bodyParser.text());
profileRouter.use(bodyParser.json({ type: "application/vnd.api+json" }));


//Get the profile data for a specific user from the Users table and either the Doctor or Patient table
profileRouter.get("/profile/:id", function(req, res){
	db.User.findOne(
		{
			where: {
				id: req.params.id,
				isActive: true
			},
			include: [db.Doctor, db.Patient]
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Gets the profile data for a specific user based on the Google Id
profileRouter.get("/profile/googleid/:googleid", function(req, res){
	db.User.findOne(
		{
			where: {
				googleid: req.params.googleid,
				isActive: true
			},
			include: [db.Doctor, db.Patient]
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Get All Active Doctors
profileRouter.get("/activeDrs", function(req, res){
	console.log("get dr");
	db.Doctor.findAll(
	{
			where: {
				isActive: true
			},
			include: [db.User, db.Patient],
			order: [[db.User, "lastName", "ASC"]]
	}).then(function(data){
		console.log(data);
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Get Patient based on userId
profileRouter.get("/patient/user/:userid", function(req, res){
	db.Patient.findOne(
		{
			where: {
				UserId: req.params.userid,
				isActive: true
			},
			include: [db.User]
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Get Doctor based on userId
profileRouter.get("/doctor/user/:userid", function(req, res){
	db.Doctor.findOne(
		{
			where: {
				UserId: req.params.userid,
				isActive: true
			},
			include: [db.User]
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Get Doctor based on doctorId
profileRouter.get("/doctor/doctor/:doctorid", function(req, res){
	db.Doctor.findOne(
		{
			where: {
				id: req.params.doctorid,
				isActive: true
			},
			include: [db.User]
	}).then(function(data){
		console.log(data);
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Get All Active Patients of a Specific Doctor
profileRouter.get("/profile/patients/:drId", function(req, res){
	db.Patient.findAll(
		{
			where:{
				isActive: true,
				DoctorId: req.params.drId
			},
			include: [db.User],
			order: [[db.User, "lastName", "ASC"]]
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Update a specific user's user data
profileRouter.put("/profile/user/:id", function(req, res){
	var user = req.body;
	db.User.update(
		user, 
		{
			where: {
				id: req.params.id
			}
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Update a specific doctor's doctor data
profileRouter.put("/profile/dr/:id", function(req, res){
	var doctor = req.body;
	db.Doctor.update(
	  doctor,
	  {
	  	where: {
	  		id: req.params.id
	  	}
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Update a specific patient's patient data
profileRouter.put("/profile/patient/:id", function(req, res){
	var patient = req.body;
	db.Patient.update(
	  patient, 
	  {
	  	where: {
	  		id: req.params.id
	  	}
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Create a specific user
profileRouter.post("/user", function(req, res){
	var user = req.body;
	console.log(user);
	db.User.create(user).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Create a specific Doctor - must have User ID in req.body
profileRouter.post("/doctor", function(req, res){
	var doctor = req.body;
	db.Doctor.create(doctor).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Create a specific Patient - must have User ID in req.body
profileRouter.post("/patient", function(req, res){
	var patient = req.body;
	db.Patient.create(patient).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Delete a specific user, also cascades to delete associated Doctor/Patient profile.  
//Soft Delete - changes isActive to false, does not remove record
profileRouter.delete("/profile/:id", function(req, res){
	db.User.update(
		{
			isActive: false
		},
		{
			where: {
				id: req.params.id
			}
		}
	).then(function(data){
		db.User.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(result){
			if (result.docPatient){
				db.Doctor.update(
				  {
				  	isActive: false
				  },
				  {
				  	where: {
				  		UserId: req.params.id
				  	}
				  }
				).then(function(finaldata){
					res.json(finaldata);
				}).catch(function(error){
					throw error;
				});
			}
			else{
				db.Patient.update(
				  {
				  	isActive: false
				  },
				  {
				  	where: {
				  		UserId: req.params.id
				  	}
				  }
				).then(function(finaldata){
					res.json(finaldata);
				}).catch(function(error){
					throw error;
				});				
			}
		});
	}).catch(function(err){
		throw err;
	});
});

module.exports = profileRouter;
