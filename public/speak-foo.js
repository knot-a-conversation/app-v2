///speak foo

//added p5 speech
let foo = new p5.Speech();
foo.setRate(0.87)
foo.setVoice('Google US English')
//this allows from any other actions to override the speech, otherwise you have to wait for the speech to finish
foo.interrupt = true;
foo.onStart = speechStarted;

function speechStarted() {
    //callback function for mobile audio activation
    console.log("audio synthesis should work now")
  }
