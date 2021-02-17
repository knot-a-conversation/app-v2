// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Jb-0xkPsL/';

//details for hte classifier
let label = "";
let conf;
let confArr = [];

// let confArr2;
//make a variable for a changing div
let awrd;
//keywords for the different knots
let k1;
let k2;
let k3;
let k4;
let k5;

//a global variable for gpt3 prompt
let prompt;

//a global variable for gpt3 generated output
let outputgen;

//basic requirements
let button; //accept button
let answerbtn;
let intro;
let constraints;
let machAns;
let machAns2;
let answerfinal;
let diff;
let bk;
//video variable
let vid;

//dictionary for the qna
let dict;

//added p5 speech
let foo = new p5.Speech('Google US English');

//variable for the GPT3 answers
let answerGPT;

//firebase database intialise
let database;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  dict = loadJSON("dict.json")
}

function setup() {
  // createCanvas(200, 200);
  // background(200)
  noCanvas()
  constraints = {
    video: {

      facingMode: {
        exact: "environment"
      }

    },
    audio: false
  };

//speed of talking
  foo.setRate(0.87)
//this allows from any other actions to override the speech, otherwise you have to wait for the speech to finish
  foo.interrupt = true;

  textFont('Rajdhani')
  button = createButton("Accept")
  button.addClass("btnclass")
  button.mousePressed(startStream)

  awrd = createDiv("")
  awrd.addClass("awrd")

  machAns = createDiv("")
  machAns.addClass("rAns")

  machAns2 = createP("")
  machAns2.parent(machAns)
  machAns2.addClass("spanAns")


  bk = createButton("Back")
  bk.addClass("back")
  bk.hide()
  bk.mousePressed(moveBG)


  k1 = dict.knotalist[0].question
  rq = floor(random() * dict.knotalist[1].question.length)
  k2 = dict.knotalist[1].question[rq]
  k3 = dict.knotalist[2].question
  k4 = dict.knotalist[3].question
  k5 = dict.knotalist[4].question

  answerbtn = createButton("Generate answer")

  answerbtn.hide()
  answerbtn.id("ansB")

  //setting up firebase in the client
  var firebaseConfig = {
    apiKey: "AIzaSyBizXRA5EPNr0Du4EHLLZlMWxvHK5J-FYk",
    authDomain: "kac-v2.firebaseapp.com",
    databaseURL: "https://kac-v2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kac-v2",
    storageBucket: "kac-v2.appspot.com",
    messagingSenderId: "966696925385",
    appId: "1:966696925385:web:722ea36d26842775173518",
    measurementId: "G-J2L0SYH0GK"
  };

  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  
}
//check orientation rather than platform
function startStream() {

  if (navigator.platform == "iPhone" || navigator.platform == "Linux armv8l") {
    vid = createCapture(VIDEO, constraints)
  } else {

    vid = createCapture(VIDEO);
  }

  vid.position(0, 0)
  button.remove()
  select("#accept").remove()

  classifyVideo()

//added this callback function from the p5 speech library to ensure that speech audio is activated in mobile phones
  foo.onStart = speechStarted;
}
// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(vid, gotResult);

}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.

  label = results[0].label;
  conf = results[0].confidence
  // Classify again!
  classifyVideo();
  answerbtn.show()
}



function draw() {

  addFrm()
  // sendData()

}

function addFrm() {
  if (conf > 0.8) {
    if (label == "Knot 1") {
      cArr(k1, 0)
    }
    if (label == "Knot 2") {
      cArr(k2, 1)
    }
    if (label == "Knot 3") {
      cArr(k3, 2)
    }
    if (label == "Knot 4") {
      cArr(k4, 3)
    }
    if (label == "Knot 5") {
      cArr(k5, 4)
    }

  }
}


function GPTAnswer(){
  let ref = database.ref('answers')
  ref.on('value',(snapshot) => {
    const data = snapshot.val();
    // console.log(data)
    let keys = Object.keys(data)
    for(let i=0;i<keys.length;i++){
      k = keys[i]
    
    // console.log(keys.length)
    // let lastkey = keys.lastIndexOf()
      answerGPT = data[k].name;
      console.log(answerGPT)
      answerfinal= answerGPT;
      
    }
    machAns2.html(answerfinal)
    
  //when you click generate answer, the generated answer will synthesis as audio

    foo.speak(answerfinal)
  });
};

//sendata about the knots to the server
async function sendData(prompt){
  if(label != ""){
    const knotdata = {prompt};
    // console.log(knotdata)
    const options ={
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(knotdata)
    };
     fetch('/api',options);
    console.log("sent question prompt")
  } else {
    console.log('no data incoming')
  }
  // const result = GPTAnswer();
  console.log("received GPT answer")
}

function giveanswer() {
  

   sendData(prompt).then(()=>GPTAnswer()).then(()=>addAnswerPage())
    

    if (machAns2 != "") {
      bk.show()
    }
  }

function addAnswerPage(){
    answerbtn.hide()
    machAns.show()
   
    // machAns2.html(answerfinal)
    
  }
 
  // confArr = []

function cArr(k, i) {
  awrd.html(k);
  answerbtn.mousePressed(giveanswer)
  prompt = k;
  

}

function moveBG() {
  //if you click back button the audio will stop
  foo.stop()
  machAns.hide()
  bk.hide()
}

function speechStarted() {
  //callback function for mobile audio activation
  console.log("audio synthesis should work now")
}


