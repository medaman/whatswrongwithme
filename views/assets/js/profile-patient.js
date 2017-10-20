var patientId;

var insQuery = "https://api.betterdoctor.com/2016-03-01/insurances?user_key=d9aae6ac51be978b847e7ed2a8ee5b21";
$.ajax({
  method:"GET",
  url:insQuery
}).done (function(response) {
  var insOptions = [];
  for(var i=0; i<response.data.length; i++) {
    insOptions.push(response.data[i].name);
  }
  insOptions.sort();
  for(var i=0; i<insOptions.length; i++) {
    var ins = $("<option>");
    ins.attr("value", insOptions[i]);
    ins.text(insOptions[i])
    $("#ins").append(ins);
  }
  $("#ins").change(function() {
    $("#ins-type").empty();
    for(var i=0; i<response.data.length; i++) {
      if(response.data[i].name === $(this).val()) {
        var insTypes = [];
        for(var j=0; j<response.data[i].plans.length; j++) {
          insTypes.push(response.data[i].plans[j].name);
        }
        insTypes.sort();
        for(var j=0; j<insTypes.length; j++) {
          var insType = $("<option>");
          insType.attr("value", insTypes[j]);
          insType.text(insTypes[j]);
          $("#ins-type").append(insType);
        }
      }
    }
  });
});

function onSignIn(googleUser) {
  var googleprofile = googleUser.getBasicProfile();
  var myUserEntity = {};
  myUserEntity.Id = googleprofile.getId();
  myUserEntity.Name = googleprofile.getName();
  sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
  $.get("/profile/googleid/" + googleprofile.getId(), function(data) {
    if ((data) && (data.docPatient === false)) {
      $.get("/patient/user/" + data.id, function(patientData) {
        if(patientData) {
          $("#patient-id").val(patientData.id);
          $("#first-name").val(data.firstName);
          $("#last-name").val(data.lastName);
          $("#dob").val(data.dob.split("T")[0]);
          $("#city").val(data.city);
          $("#state").val(data.state);
          $("#email").val(data.email);


          displayWave(data.firstName, data.lastName, patientData.id);
          wavRecorder(data.firstName, data.lastName, patientData.id);

          $("#patient-image").attr("src", data.imgUrl);
          $("#patient-name").text(data.firstName + " " + data.lastName);
          $(".bio").text(patientData.biography);

          $("#update").on("click", function() {
            var user = {
              firstName: $("#first-name").val(),
              lastName: $("#last-name").val(),
              dob: $("#dob").val(),
              city: $("#city").val(),
              state: $("#state").val(),
              email: $("#email").val()
            };
            $.ajax({
                url: '/profile/user/' + data.id,
                type: 'PUT',
                data: user,
                success: function(result) {
                  var patient = {
                    biography: $("#biography").val(),
                    insuranceProvider: $("#ins").val(),
                    insuranceType: $("#ins-type").val()
                  }
                  $.ajax({
                      url: '/profile/patient/' + patientData.id,
                      type: 'PUT',
                      data: patient,
                      success: function(result) {
                        $(".bio").text($("#biography").val());
                        $("#updated").attr("style", "display:block");
                      }
                  });
                }
            });
          })
        } else {
          window.location.href = "/signup-patient"
        }
      })
    } else if (!data) {
        window.location.href = "/login";
    } else if (data.docPatient === true) {
      window.location.href = "/signup-doctor"
    }
  })
}