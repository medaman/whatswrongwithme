var patientId;

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
          $("#patient-image").attr("src", data.imgUrl);
          $("#patient-name").text(data.firstName + " " + data.lastName);
          $(".bio").text(patientData.biography)

          $.get("/all-patient-uploads/" + patientData.id, function(uploadData) {
            console.log(uploadData);
            for(var i=0; i<uploadData.length; i++) {
              if(uploadData[i].type === "image") {
                var div = $("<div>");
                div.addClass("col-md-3");
                div.attr("style","margin:5px 0px");
                var a = $("<a>");
                a.attr("title", uploadData[i].filename)
                a.attr("href", "#")
                var img = $("<img>");
                img.attr("src", "/uploads/" + uploadData[i].filename)
                img.attr("style", "margin:auto; height:15vh; max-width:100%")
                img.addClass("thumbnail img-responsive")
                a.append(img)
                div.append(a);
                $("#image-area").append(div);
              } else if (uploadData[i].type === "video") {
                var tr = $("<tr>");
                var td1 = $("<td>");
                td1.text(uploadData[i].filename);
                var td2 = $("<td>");
                var a = $("<a>");
                a.text("Play");
                a.attr("file", uploadData[i].filename)
                a.addClass("btn-login-ghost btn-small vid");
                a.attr("style", "margin:0px");
                td2.html(a);
                tr.append(td1);
                tr.append(td2);
                $("#video-area").append(tr);
                
              } else if (uploadData[i].type === "audio") {
                var tr = $("<tr>");
                var td1 = $("<td>");
                td1.text(uploadData[i].filename);
                var td2 = $("<td>");
                var a = $("<a>");
                a.text("Play");
                a.attr("file", uploadData[i].filename)
                a.addClass("btn-login-ghost btn-small aud");
                a.attr("style", "margin:0px");
                td2.html(a);
                tr.append(td1);
                tr.append(td2);
                $("#audio-area").append(tr);
              } /*else if (uploadData[i].type === "wav") {
                var tr = $("<tr>");
                var td1 = $("<td>");
                td1.text(uploadData[i].filename);
                var td2 = $("<td>");
                var a = $("<a>");
                a.text("Play");
                a.attr("file", uploadData[i].filename)
                a.addClass("btn-login-ghost btn-small aud");
                a.attr("style", "margin:0px");
                td2.html(a);
                tr.append(td1);
                tr.append(td2);
                $("#audio-area").append(tr);
              }*/
            }
            $(document).ready(function() {
              $(".thumbnail").on("click", function(){
                $(".img-modal-body").empty();
                var title = $(this).parent('a').attr("title");
                $(".img-modal-title").html(title);
                $($(this).parents("div").html()).appendTo(".img-modal-body");
                $("#imgModal").modal({show:true});
              });
            });

            $(document).on("click", ".vid", function() {
              $(".vid-modal-body").empty();
              var title = $(this).attr("file");
              $(".vid-modal-title").html(title);
              var video = $("<video>")
              video.attr("controls", true);
              video.attr("style", "max-height:60vh; display:block; margin:auto;")
              var source = $("<source>");
              source.attr("src", "/uploads/" + title);
              video.html(source);
              $(".vid-modal-body").html(video);
              $("#vidModal").modal({show:true});
            })

            $(document).on("click", ".aud", function() {
              $(".vid-modal-body").empty();
              var title = $(this).attr("file");
              $(".vid-modal-title").html(title);
              var video = $("<audio>")
              video.attr("controls", true);
              video.attr("style", "display:block; margin:auto;")
              var source = $("<source>");
              source.attr("src", "/uploads/" + title);
              video.html(source);
              $(".vid-modal-body").html(video);
              $("#vidModal").modal({show:true});
            })

            $('#vidModal').on('hidden.bs.modal', function () {
                $(".vid-modal-body").empty();
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


$("#image-button").on("click", function() {
  $("#image-tab").attr("class", "active");
  $("#video-tab").attr("class", "inactive");
  $("#audio-tab").attr("class", "inactive");
  $("#image-div").attr("style","display:block");
  $("#video-div").attr("style","display:none");
  $("#audio-div").attr("style","display:none");
})

$("#video-button").on("click", function() {
  $("#image-tab").attr("class", "inactive");
  $("#video-tab").attr("class", "active");
  $("#audio-tab").attr("class", "inactive");
  $("#image-div").attr("style","display:none");
  $("#video-div").attr("style","display:block");
  $("#audio-div").attr("style","display:none");
})

$("#audio-button").on("click", function() {
  $("#image-tab").attr("class", "inactive");
  $("#video-tab").attr("class", "inactive");
  $("#audio-tab").attr("class", "active");
  $("#image-div").attr("style","display:none");
  $("#video-div").attr("style","display:none");
  $("#audio-div").attr("style","display:block");
})