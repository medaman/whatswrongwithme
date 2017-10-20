# Whats Wrong With Me App

Whats Wrong With Me App is an online source for patients and doctors. 

  - Provides a way for patients and doctors to interact directly
  - Patients can upload specific issues in the form of Audio, Video or Images and then the doctor is able to see these and provide a quick initial diagnosis
  - The doctor can let the patient know whether it is necessary for them to visit a doctor or not.
  - It is basically a way to receive an initial precheckup for patients.

# Features!

  - Upload Audio directly from the mic or using an Electric Stethoscope.
  - Upload Audio, Video, and Image Files
  - View these files through the User Friendly File Viewer
  - Sign up using your Google ID for maximum security
  - Have a one-to-one conversation with your chosen doctor
  - Doctor dashboard allows for easy access to patient files

# Team Members!

* [Adam Husain] - https://github.com/medaman
* [Natalie Ike] - https://github.com/natalieike
* [Stanley Wang] - https://github.com/Eszypher58
* [Chloe Chou] - https://github.com/chloechoudesign

# Tech

Whats Wrong With Me App uses a number of open source technologies to work effectively:

* [HTML] - The standard markup language for creating web pages and web applications
* [CSS] - Stylesheet language used to describe presentation
* [Javascript] - Powerful web based programming language
* [jQuery] - Extremely Powerful and Efficient Javascript Library
* [Bootstrap] - Front-end web framework for designing websites and web applications
* [Node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Sequelize] - Promise-based ORM for Node.js to create databases
* [MySQL] - Powerful open-source relational database management system
* [Google Auth] - Highly secure OAuth2 technology for managing user login

# APIs

Whats Wrong With Me App uses a number of open source APIs to access information for use with the application:

* [Better Doctor API] - An open source repository of Doctors, Insurances, and Hospitals
* [OAuth2] - An authenitcation system used for Google Login

APIs built in house include:
* Patient Controller API - Pull information about Patients and Doctors
* Media Controller API - Pull information about files uploaded by Patients
* Medical Charts Controller API - Pull all information regarding Medical Charts for Patients

# Database Structure
* Index Model
* User Database - Database of all users of the app including Patients and Doctors
* Patient Database - Database of all patients, with a direct relationship with User Database
* Doctor Database - Database of all doctors, with a direct relationship with User Database
* Media Database - Database of all uploaded files, with a direct relationship with Patient Database
* Medical Chart Database - Database of all doctors, with a direct relationship with Doctor and Patient Database

# Heroku Address

http://secret-woodland-56466.herokuapp.com/

# Directions for Future Dev
* Create databases for doctor information, so heavy reliance on Better Doctor Database can be eliminated
* Increase Security for users
* Add machine learning features which will analyze the audio and return statistics.
* Add live chat features
* Add feature to schedule appointments
* Allow for comments and diagnosis for individual files and uploads.

   [HTML]: <https://www.w3schools.com/html/>
   [CSS]: <https://www.w3schools.com/css/>
   [Javascript]: <https://www.w3schools.com/js/>
   [jQuery]: <http://jquery.com>
   [Bootstrap]: <http://getbootstrap.com/>
   [Node.js]: <http://nodejs.org>
   [Express]: <http://expressjs.com>
   [Sequelize]: <http://docs.sequelizejs.com/>
   [MySQL]: <https://www.mysql.com>
   [Google Auth]: <https://developers.google.com/identity/protocols/OAuth2>
   
   [Better Doctor API]: <http://betterdoctor.com/developers/>
   [OAuth2]: <https://oauth.net/2/>
   
   [Adam Husain]: <https://github.com/medaman>
   [Natalie Ike]: <https://github.com/natalieike>
   [Stanley Wang]: <https://github.com/Eszypher58>
   [Chloe Chou]: <https://github.com/chloechoudesign>
   
