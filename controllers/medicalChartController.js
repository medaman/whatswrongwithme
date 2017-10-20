var express = require("express");
var db = require("../models");
var chartRouter = express.Router();
var path = require("path");
var bodyParser = require("body-parser");

//Set up parsing
chartRouter.use(bodyParser.urlencoded({ extended: true }));
chartRouter.use(bodyParser.json());
chartRouter.use(bodyParser.text());
chartRouter.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Get all Active comments for a specific Patient
chartRouter.get("/chart/:patientid", function(req, res){
	db.MedicalChart.findAll(
	  {
	  	where: {
	  		PatientId: req.params.patientid,
	  		isActive: true
	  	},
	  	order: [["updatedAt", "DESC"]]
	  }
	).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Create a new comment for a specific Patient
chartRouter.post("/chart", function(req, res){
	var chart = req.body;
	db.MedicalChart.create(chart).then(function(data)
	{
		res.json(data);
	}).catch(function(err)
	{
		throw err;
	});
});

//Update a specific comment
chartRouter.put("/chart/:id", function(req, res){
	var chart = req.body;
	db.MedicalChart.update(chart, 
	{
		where: {
			id: req.params.id
		}
	}).then(function(data)
	{
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Delete a comment - Soft Delete, change isActive flag to 0
chartRouter.delete("/chart/:id", function(req, res){
	db.MedicalChart.update(
	 {
	 	isActive: false
	 },
	 {
	 	where: {
	 		id: req.params.id
	 	}
	 }                      
	).then(function(data)
	{
		res.json(data);
	}).catch(function(err)
	{
		throw err;
	});
});

module.exports = chartRouter;