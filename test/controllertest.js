const expect = require("chai").expect;
const should = require("chai").should();
const profileController = require("../controllers/profileController.js");
const medicalChartController = require("../controllers/medicalChartController.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../serverTest.js");
const mysql = require("mysql");

chai.use(chaiHttp);

describe("profileController", function(){
	
});

describe("medicalChartController", function(){
	
});

//Test GET route for /profile/:id - positive outcome - get ID = 1
describe('/GET profile/:id', () => {
  it('it should GET the profile with the user ID equal to id', (done) => {
    chai.request(server)
      .get('/profile/1')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.firstName.should.be.eql("doctortest");
        done();
      });
  });
});

//Test GET route for /profile/:id - negative outcome (test should fail) - get ID = 0
describe('/GET profile/:id', () => {
  it('it should GET the profile with the user ID equal to id', (done) => {
    chai.request(server)
      .get('/profile/0')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.firstName.should.be.eql("doctortest");
        done();
      });
  });
});

//Test GET route for /profile/googleid/:googleid - positive outcome - get ID = 1234567890
describe('/GET profile/googleid/:googleid', () => {
  it('it should GET the profile with the google ID equal to googleid', (done) => {
    chai.request(server)
      .get('/profile/googleid/1234567890')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.firstName.should.be.eql("doctortest");
        done();
      });
  });
});

//Test GET route for /profile/googleid/:googleid - negative outcome - get ID = 0987654321
describe('/GET profile/googleid/:googleid', () => {
  it('it should GET the profile with the google ID equal to googleid', (done) => {
    chai.request(server)
      .get('/profile/googleid/0987654321')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.firstName.should.be.eql("doctortest");
        done();
      });
  });
});

//Test GET route for /activeDrs - positive outcome - array of doctors
describe('/GET activeDrs', () => {
  it('it should GET all of the doctors where isActive = 1', (done) => {
    chai.request(server)
      .get('/activeDrs')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
        done();
      });
  });
});

//Test GET route for /patient/user/:userid - positive outcome - get ID = 2
describe('/GET /patient/user/:userid', () => {
  it('it should GET the patient profile with the user ID equal to userid', (done) => {
    chai.request(server)
      .get('/patient/user/2')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.User.firstName.should.be.eql("patienttest");
        done();
      });
  });
});

//Test GET route for /patient/user/:userid - negative outcome - get ID = 1 (does not exist)
describe('/GET /patient/user/:userid', () => {
  it('it should GET the patient profile with the user ID equal to userid', (done) => {
    chai.request(server)
      .get('/patient/user/1')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.User.firstName.should.be.eql("doctortest");
        done();
      });
  });
});

//Test GET route for /doctor/user/:userid - positive outcome - get ID = 1
describe('/GET /doctor/user/:userid', () => {
  it('it should GET the doctor profile with the user ID equal to userid', (done) => {
    chai.request(server)
      .get('/doctor/user/1')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.User.firstName.should.be.eql("doctortest");
        done();
      });
  });
});

//Test GET route for /doctor/user/:userid - negative outcome - get ID = 2 (does not exist)
describe('/GET /doctor/user/:userid', () => {
  it('it should GET the doctor profile with the user ID equal to userid', (done) => {
    chai.request(server)
      .get('/doctor/user/2')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.User.firstName.should.be.eql("patienttest");
        done();
      });
  });
});

//Test GET route for /doctor/doctor/:doctorid - positive outcome - get ID = 2
describe('/GET /doctor/doctor/:doctorid', () => {
  it('it should GET the doctor profile with the doctor ID equal to doctorid', (done) => {
    chai.request(server)
      .get('/doctor/doctor/2')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.User.firstName.should.be.eql("doctorsecondtest");
        done();
      });
  });
});

//Test GET route for /profile/patients/:drId - positive outcome - get ID = 2
describe('/GET /profile/patients/:drId', () => {
  it('it should GET the patient profiles with the doctor ID equal to drId', (done) => {
    chai.request(server)
      .get('/profile/patients/:drId')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
        done();
      });
  });
});

//Test GET route for /chart/:patientid - positive outcome - get ID = 1
describe('/GET /chart/:patientid', () => {
  it('it should GET the comments for the patient ID equal to patientid', (done) => {
    chai.request(server)
      .get('/chart/1')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(3);
        done();
      });
  });
});

//Test GET route for /chart/:patientid - positive outcome - get ID = 4 (does not exist - should return array with length of 0)
describe('/GET /chart/:patientid', () => {
  it('it should GET the comments for the patient ID equal to patientid', (done) => {
    chai.request(server)
      .get('/chart/4')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        done();
      });
  });
});
