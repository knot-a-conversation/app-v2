//Firebase App (the core Firebase SDK) is always required and
//must be listed before other Firebase SDKs

var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_KEY,
  authDomain: "kac-v2.firebaseapp.com",
  databaseURL: "https://kac-v2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kac-v2",
  storageBucket: "kac-v2.appspot.com",
  messagingSenderId: "966696925385",
  appId: "1:966696925385:web:722ea36d26842775173518",
  measurementId: "G-J2L0SYH0GK"
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database(); 
let ref = database.ref('answers');

const express = require('express');
const app = express();
// const port = process.env.PORT;
const port = 3000;

const got = require('got');
require('dotenv').config()

let promptgpt; 

app.use(express.static('public')); 
app.use(express.json({limit:'1mb'}));

app.listen(port,()=>console.log("listening "+port));

app.post('/api',(request,response,next)=>{
    console.log("i got a request");
    promptgpt = request.body.prompt;
    console.log(promptgpt)
    response.json({
        status:'yay-works',
    });
    next();
    getGPT();
    
})

async function getGPT(){
    const url = 'https://api.openai.com/v1/engines/davinci/completions';
    const params = {
      "prompt": promptgpt,
      "max_tokens": 50,
      "temperature": 0.7,
      "frequency_penalty": 0.5
    };
    const headers = {
      'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
    };
    try {
      const response = await got.post(url, { json: params, headers: headers }).json();
      // output = `${response.choices[0].text}`;
      var outputgen = {
        // question: promptgpt,
        name: response.choices[0].text
      }
      ref.push(outputgen)
      console.log("Answer pushed to DB")
    } catch (err) {
      console.log(err);
    }
  };
