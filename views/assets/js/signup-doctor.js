var profileSelected = false;
var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Virgin Islands', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
var abb = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY']
for (var i=0; i<states.length; i++) {
  var state = $("<option>");
  state.text(abb[i] + ": " + states[i]);
  state.val(abb[i]);
  $("#states").append(state);
}

function onSignIn(googleUser) {
  var googleprofile = googleUser.getBasicProfile();
  var myUserEntity = {};
  myUserEntity.Id = googleprofile.getId();
  myUserEntity.Name = googleprofile.getName();
  sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
  $.get("/profile/googleid/" + googleprofile.getId(), function(data) {
    if ((data) && (data.docPatient === true)) {
      $.get("/doctor/user/" + data.id, function(docData) {
        if(!docData) {
          $("#doctor-name").val(googleprofile.getName());
          $("#search-for-doctor").on("click", function() {
            $("#search-for-doctor").attr("style", "display:none");
            $("#reset").attr("style", "display:inline")
            $("#doc-display").empty();
            var name = $("#doctor-name").val() || "";
            var state = $("#states").val() || "";
            var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&location=" + state + "&skip=0&limit=10&user_key=d9aae6ac51be978b847e7ed2a8ee5b21";
            $.ajax({
              method:"GET",
              url:queryURL
            }).done (function(response) {
              for(var i=0; i<response.data.length; i++) {
                var doc = $("<div>");
                doc.attr("class", "col-md-12 selected-doc")
                var firstName = response.data[i].profile.first_name;
                var lastName = response.data[i].profile.last_name;
                var pic = $("<img>");
                pic.attr("src", response.data[i].profile.image_url);
                pic.attr("class", "docpic")
                doc.attr("value", i)
                doc.append(pic);
                doc.append(firstName + " " + lastName)
                $("#doc-display").append(doc);
                profileSelected = false;
              }
              $(document).on("click", ".selected-doc", function () {
                $("#doc-display").empty();
                var val = parseInt($(this).attr("value"));
                $("#doc-display").append("<p><strong>" + response.data[val].profile.first_name + " " + response.data[val].profile.last_name + "</strong></p>");
                $("#doc-display").append("<p>" + response.data[val].specialties[0].name + "</p>")
                $("#doc-display").append("<p>" + response.data[val].profile.bio + "</p>")
                var insurances = $("<ul>");
                for (var i=0; i<response.data[val].insurances.length; i++) {
                  var ins = "<li>" + response.data[val].insurances[i].insurance_plan.name + "</li>"
                  insurances.append(ins);
                }
                $("#doc-display").append("Insurances Accepted: ")
                $("#doc-display").append(insurances);
                profileSelected = true;

                $("#create-doctor").on("click", function() {
                  console.log(response.data);
                  console.log(response.data[val]);
                  if(profileSelected) {
                    var doctor = {
                      specialization: response.data[val].specialties[0].name,
                      betterDoctorId: response.data[val].uid,
                      UserId: data.id
                    }
                    $.post("/doctor", doctor)
                    .then(window.location.href = "/dashboard-doctor")
                  }
                })
              });
            });
          })
        } else {
          window.location.href = "/dashboard-doctor"
        }
      })
    } else if (!data) {
        window.location.href = "/login";
    } else if (data.docPatient === false) {
      window.location.href = "/gnup-patient"
    }
  })
}