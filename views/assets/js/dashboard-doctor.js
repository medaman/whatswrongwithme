var showComments = function(patientId, patientPic, doctorPic, patientName, doctorName){
    $.get("/chart/" + patientId, function(data){
        for(var i = 0; i < data.length; i++){     
            var pic = "";
            var name = "";
            if (data[i].isDrComment){
                pic = doctorPic;
                name = doctorName;
            }
            else{
                pic = patientPic;
                name = patientName;
            }
            var updated = data[i].updatedAt;
            var chatText = data[i].comment;
            var commentHtml = '<div class="chat-box"> <div> <img class="img-circle chat-avatar" src="';
            commentHtml += pic + '"> <h5 class="chat-sender">';
            commentHtml += name + '</h5> <p class="chat-time"><i class="ace-icon fa fa-clock-o"></i>';
            commentHtml += updated + '</p> </div> <div> <p class="chat-text">'
            commentHtml += chatText + '</p> </div> </div>';
            $("#comments").append(commentHtml);
        }
    });
};

function onSignIn(googleUser) {
  var googleprofile = googleUser.getBasicProfile();
  var myUserEntity = {};
  myUserEntity.Id = googleprofile.getId();
  myUserEntity.Name = googleprofile.getName();
  sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
  $.get("/profile/googleid/" + googleprofile.getId(), function(data) {
    if ((data) && (data.docPatient === true)) {
      console.log(data)
      var doctorName = data.firstName + " " + data.lastName;
      var doctorId = data.Doctor.id;
      var doctorPic = data.imgUrl;
      $("#doctor-name").text(" Dr. " + doctorName);
      $.ajax({
          method:"GET",
          url:"/profile/patients/" + doctorId,
        }).done(function(result){
          console.log(result);
          for (var i = 0; i < result.length; i++) {
            var patient = result[i].User;
            var name = patient.firstName + " " + patient.lastName;
            var option = $("<option>");
            option.attr("id", "#p"+ (i+1));
            option.attr("data_value", result[i].UserId);
            option.text(name);
            $("#patientList").append(option.text(name));
          }

          $("#patientList").on("change",function(e){
            var patientIndex = $("#patientList")["0"].selectedOptions[0].attributes[1].nodeValue - 1;
            console.log(patientIndex);
            console.log(result[patientIndex]);
            var patientName = result[patientIndex].User.firstName + " " + result[patientIndex].User.lastName;
            var patientId = result[patientIndex].id;
            $("#patientName").text(patientName);
            var patientPic = result[patientIndex].User.imgUrl;
            $("#patientAvatar").attr("src", patientPic);
            $("#dob").text(result[patientIndex].User.dob);
            $("#email").text(result[patientIndex].User.email);
            var patientLocation = result[patientIndex].User.city + ", " + result[patientIndex].User.state;
            $("#location").text(patientLocation);
            var insurance = "";
            if(result[patientIndex].insuranceProvider == null){
              insurance = "Not Provided";
            }else{
              insurance = result[patientIndex].insuranceProvider + " - " + result[patientIndex].insuranceType;
            }
            $("#insurance").text(insurance);
            $("#comments").empty();
            showComments(result[patientIndex].id, patientPic, doctorPic, patientName, doctorName);

            displayWave(data.firstName, data.lastName, patientId);
            wavRecorder(data.firstName, data.lastName, patientId);

            $(document).on("click", "#chatBtn", insertComment);

    // Inserts a new comment into the database
            function insertComment(event) {
                event.preventDefault();
                console.log("insert");
                var newComment = {
                  comment: $("#newComment").val().trim(),
                  isDrComment: true,
                  PatientId: patientId,
                  DoctorId: doctorId
                };
                console.log(newComment);
                $.post("/chart", newComment, function(data){
                  $("#comments").empty();
                  showComments(patientId, patientPic, doctorPic, patientName, doctorName)
                  $("#newComment").val("");
                });

              };
          });
      });
    }
  });
};