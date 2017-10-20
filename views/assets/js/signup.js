function onSignIn(googleUser) {
    var googleprofile = googleUser.getBasicProfile();
    var myUserEntity = {};
    myUserEntity.Id = googleprofile.getId();
    myUserEntity.Name = googleprofile.getName();
    sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
    $("#first-name").val(googleprofile.getGivenName());
    $("#last-name").val(googleprofile.getFamilyName());
    $("#email").val(googleprofile.getEmail());
    $.get("/profile/googleid/" + googleprofile.getId(), function(data) {
        if (!data) {
            $(document).on("click", "#user-submit", function() {
                var docPatient = $("input[name='radio']:checked").val();
                var user = {
                    firstName: $("#first-name").val(),
                    lastName: $("#last-name").val(),
                    dob: $("#dob").val(),
                    city: $("#city").val(),
                    state: $("#state").val(),
                    imgUrl: googleprofile.getImageUrl(),
                    googleId: googleprofile.getId(),
                    token: googleUser.getAuthResponse().id_token,
                    email: googleprofile.getEmail(),
                    docPatient: docPatient
                }
                $.post("/user", user)
                .then(function() {
                    if (docPatient === "1") {
                        window.location.href = "/signup-doctor";
                    } else {
                        window.location.href = "/signup-patient";
                    }
                });
            });
        } else if(data.docPatient === true) {
            $.get("/doctor/user/" + data.id, function(doctorData) {
               if (!doctorData) {
                    window.location.href = "/signup-doctor"
                } else {
                    window.location.href = "/dashboard-doctor"    
                }
            })
        } else {
            $.get("/patient/user/" + data.id, function(patientData) {
               if (!patientData) {
                    window.location.href = "/signup-patient"
                } else {
                    window.location.href = "/dashboard-patient"
                }
            })
        }
    });
}
