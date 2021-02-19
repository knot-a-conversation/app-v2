//a global variable for gpt3 prompt
let prompt;

//a global variable for gpt3 generated output
let outputgen;


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
      answerfinal = "";
    } else {
      console.log('no data incoming')
    }
    // const result = GPTAnswer();
    console.log("received GPT answer")
  }