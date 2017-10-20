function onSignIn(googleUser) {
  var googleprofile = googleUser.getBasicProfile();
  var myUserEntity = {};
  myUserEntity.Id = googleprofile.getId();
  myUserEntity.Name = googleprofile.getName();
  sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
  $.get("/profile/googleid/" + googleprofile.getId(), function(data) {
    if ((data) && (data.docPatient === true)) {
      $.get("/doctor/user/" + data.id, function(docData) {
        if(docData) {
          console.log(docData);
          $("#first-name").val(data.firstName);
          $("#last-name").val(data.lastName);

          $("#dob").val(data.dob.split("T")[0]);
          $("#city").val(data.city);
          $("#state").val(data.state);
          $("#email").val(data.email);
          $("#specialization").val(docData.specialization);

          $("#doc-image").attr("src", data.imgUrl);
          $("#doctor-name").text(" Dr. " + data.firstName + " " + data.lastName);
          var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors/" + docData.betterDoctorId + "?user_key=d9aae6ac51be978b847e7ed2a8ee5b21";
          $.ajax({
            method:"GET",
            url:queryURL
          }).done (function(response) {
            $("#bio").text(response.data.profile.bio)

            
            for (var i=0; i<response.data.insurances.length; i++) {
              var ins = "<div class='form-control' style ='font-size: 10px; width:33%; float:left'>" + response.data.insurances[i].insurance_plan.name + "</div>"
              $("#insurances").append(ins);
            }
          });

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
                  var doctor = {
                    specialization: $("#specialization").val()
                  }
                  $.ajax({
                      url: '/profile/dr/' + data.id,
                      type: 'PUT',
                      data: doctor,
                      success: function(result) {
                        $("#updated").attr("style", "display:block");
                      }
                  });
                }
            });
          })


        } else {
          window.location.href = "/signup-doctor"
        }
      })
    } else if (!data) {
        window.location.href = "/login";
    } else if (data.docPatient === false) {
      window.location.href = "/signup-patient"
    }
  })
}