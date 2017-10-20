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

$.get("/activeDrs", function(data) {
  for(var i=0; i<data.length; i++) {
    var doc = $("<option>");
    doc.attr("value", data[i].id);
    doc.text("Dr. " + data[i].User.firstName + " " + data[i].User.lastName);
    $("#doctors").append(doc)
  }
})

function onSignIn(googleUser) {
  var googleprofile = googleUser.getBasicProfile();
  var myUserEntity = {};
  myUserEntity.Id = googleprofile.getId();
  myUserEntity.Name = googleprofile.getName();
  sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
  $.get("/profile/googleid/" + googleprofile.getId(), function(data) {
    if ((data) && (data.docPatient === false)) {
      $.get("/patient/user/" + data.id, function(patientData) {
        if(!patientData) {
          $("#create-patient").on("click", function() {
            var doc = $("#doctors").val();
            console.log(doc)
            var ins = $("#ins-type").val();
            console.log(ins)
            var completed = false;
            if (doc !== null && ins !== null) {
              completed = true;
            }
            if(completed) {
              var patient = {
                biography: $("#bio").val(),
                insuranceProvider: $("#ins").val(),
                insuranceType: $("#ins-type").val(),
                UserId: data.id,
                DoctorId: $("#doctors").val()
              }
              $.post("/patient", patient)
              .then(window.location.href = "/dashboard-patient")
            }
          })
        } else {
          window.location.href = "/dashboard-patient"
        }
      })
    } else if (!data) {
        window.location.href = "/login";
    } else if (data.docPatient === true) {
      window.location.href = "/signup-doctor";
    }
  })
}