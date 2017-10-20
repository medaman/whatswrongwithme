//create wavesurfer to display a wave file onto the front end html
//this simple front end assume server returns an array with file name inside
//frontend makes a ajax request to server and display the wave form of the last file in returned data
function displayWave(first, last, patientId){
    console.log("displaywave called");

    var wavesurfer;
        
    //when page load, display the latest wav file.
    //var firstName = $("#first-name").text();
    //var lastName = $("#last-name").text();
/*    var firstName = first;
    var lastName = last;
    var name = firstName + "_" + lastName;
    console.log(name);
*/
    $.ajax({
        
        method:"GET",
        url: "/media/data/" + patientId
        
    }).done(function(data){
        
        console.log(data);
        
        //var lastIndex = data.length - 1;
        var firstIndex = 0;
        /*var patientId = data[0].PatientId;*/
        /*console.log(patientId);*/
        
        wavesurfer = WaveSurfer.create({
        
            container: "#waveform",
            waveColor: 'violet',
            progressColor: 'purple'
        
        })
        
        wavesurfer.load(patientId + "/wav/" + data[firstIndex].filename);
    
        wavesurfer.on("ready", function(){
    
    
            $("#playSound").attr("data_value", data[firstIndex].filename);
        
            $("#playSound").on("click", function(e){
        
                console.log("clicked playsound");
        
        
                wavesurfer.play();
        
            })
    
    
    
        })
    
        for (var i = 0; i < data.length; i++) {
    
            $("#op" + (i+1)).attr("data_value", data[i].filename);
    
        }
    
        //attach event listener to all the playbutton, when clicked, go to server and get the wave file, load onto frontend page and start playing
        $("#selectSound").on("change",function (e){
                
            console.log("selected...", this.selectedOptions[0]);
                
            //console.log($("#selectSound"));
                    
            //var fileToPlay = $(this).attr("data_value");
            //console.log(fileToPlay);
            var fileToPlay = this.selectedOptions[0].attributes[1].nodeValue;
                               
            //console.log(data);
                    
            for (var i = 0; i < data.length; i++) {
                    
                var fileInJson = data[i].filename;
                    
                console.log(fileInJson);
                                        
                if (fileToPlay === fileInJson) {
                    
                    wavesurfer.destroy();
                    
                    wavesurfer = WaveSurfer.create({
                    
                        container: "#waveform",
                        waveColor: 'violet',
                        progressColor: 'purple'
                    
                    });
                    
                    var fileLocation = data[i].location;
                    var fileName = data[i].filename;
                    
                    //console.log(fileLocation, fileName);
                    
                    wavesurfer.load(patientId + "/wav" + "/" + fileName);
                    
                    wavesurfer.on('ready', function () {

                        console.log("wav ready...");
                    
                        $("#playSound").on("click", function(e){
                
                            console.log("clicked playsound");
                
                
                            wavesurfer.play();
                
                         })
                
                    
                    });
                    
                }
                    
            }
                    
        })
        
    })
 }

           