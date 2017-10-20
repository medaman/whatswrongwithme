        //records audio from the microphone, user needs to accept the use of microphone.
        //there is NO check for if user denied microphone permission as of now
  
function wavRecorder(first, last, patientId){
        var recorder;
        var audioStream;
    
    
        //when clicked on start, start recording
        $("#start").on("click", function(e){
    
            console.log("clicked start");
    
            navigator.mediaDevices.getUserMedia({audio: true, video:false,}).then(function(stream) {
    
                audioStream = stream;
    
                var recordDuration = 5000;
    
                recorder = new StereoAudioRecorder(stream, {
                    sampleRate: 44100,
                    bufferSize: 4096,
                    numberOfAudioChannels: 1
                });
    
                recorder.record();
                console.log("start recording");
    
                setTimeout(function(){
    
                    recorder.stop(function(blob){
    
                        var now = Date.now();
                        var fileName = now + ".wav";
    
                        if(!recorder) return alert('No recording found.');

                        //var firstName = $("#first-name").text();
                        //var lastName = $("#last-name").text();
                        
                        var firstName = first;
                        var lastName = last;

                        var name = firstName + "_" + lastName;
                        console.log(name);
                    
                        $.ajax({
    
                            type: 'POST',
                            url: '/media/' + patientId,
                            data: blob,
                            processData: false,
                            contentType: false
    
                        }).done(function(data){
    
                            console.log("successfully saved wav file");
                            //jquery 
                            audioStream.stop();
                            $("#myModal").modal('toggle');
                            location.reload();
    
                        })
    
                    })
    
                }, recordDuration);
    
            }).catch(function(error) {
                
                if(error && error.name === 'ConstraintNotSatisfiedError') {
                    console.log("something bad happened");
                }
    
                errorCallback(error);
                });
    
    
    
        })

    }
    