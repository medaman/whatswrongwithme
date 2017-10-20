USE whatswrongwithmeTEST_db;

INSERT INTO Users 
	(firstName, lastName, dob, city, state, imgUrl, googleId, token, email, docPatient, createdAt, updatedAt)
	VALUES
	("doctortest", "user1", "1979-12-31 23:59:59", "Los Angeles", "CA", "http://www.fillmurray.com/200/200", "1234567890", "token120983", "email1@email.com", 1, "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
	("patienttest", "user2", "1980-12-31 23:59:59", "Los Angeles", "CA", "http://www.fillmurray.com/200/200", "0987654321", "token123457869", "email2@email.com", 0,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
	("doctorsecondtest", "user3", "1970-12-31 23:59:59", "New Orleans", "LA", "http://www.fillmurray.com/150/150", "2345768190", "tokenrandom0913847", "email3@email.com", 1,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
	("patientsecondtest", "user4", "2000-12-31 23:59:59", "New Orleans", "LA", "http://www.fillmurray.com/150/200", "4567298347", "tokennewrandom298347", "email4@email.com", 0,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
	("patientthirdtest", "user5", "1990-12-31 23:59:59", "Nowhere", "WA", "http://www.fillmurray.com/200/150", "239487583", "tokentoken092384", "email5@email.com", 0,  "9999-12-31 23:59:59", "9999-12-31 23:59:59");

INSERT INTO Doctors
	(specialization, betterDoctorId, UserId, createdAt, updatedAt)
	VALUES
	("pediatrics", "12345", 1,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
	("cardiology", "234987", 3,  "9999-12-31 23:59:59", "9999-12-31 23:59:59");

INSERT INTO Patients (biography, insuranceProvider, insuranceType, DoctorId, UserId, createdAt, updatedAt)
	VALUES
	("test biography", "Aetna", "localInsurance", 1, 2,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
	("second test biography", "Blue Cross", "crappyInsurance", 2, 4,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
	("third test biography", "Local Insurance", "worthless", 2, 5,  "9999-12-31 23:59:59", "9999-12-31 23:59:59");

INSERT INTO Media (filename, location, type, PatientId, createdAt, updatedAt)
	VALUES
	("10-10-2017.wav", "/files/users", "wav", 1,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
	("10-11-2017.wav", "/files/users", "wav", 1,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
	("10-12-2017.wav", "/files/users", "wav", 2,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
	("10-13-2017.wav", "/files/users", "wav", 3,  "9999-12-31 23:59:59", "9999-12-31 23:59:59");

INSERT INTO MedicalCharts (comment, isDrComment, PatientId, DoctorId, MediumId, createdAt, updatedAt)
VALUES
("test comment about 10-10-2017", 1, 1, 1, 1,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
("test comment about 10-11-2017", 0, 1, 1, 2,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
("test comment about no file", 1, 1, 1, NULL,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
("test comment about 10-12-2017", 1, 2, 2, 3,  "9999-12-31 23:59:59", "9999-12-31 23:59:59"),
("test comment about 10-13-2017", 0, 3, 2, 4,  "9999-12-31 23:59:59", "9999-12-31 23:59:59");