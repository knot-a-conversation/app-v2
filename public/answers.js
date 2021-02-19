
//variable for the GPT3 answers
let answerGPT;

async function GPTAnswer(){
  // let allanswers = selectAll('spanAns')
  // for (var i=0;i<allanswers.length;i++){
  //   allanswers[i].remove();
  // }
    let ref = database.ref('answers')
    ref.on('value',(snapshot) => {
      const data = snapshot.val();
      let keys = Object.keys(data)
     
        k = keys[keys.length-1]
        answerGPT = data[k].name;
        answerfinal= answerGPT; 
    
    });
    // console.log(answerGPT);
    
  };
  

