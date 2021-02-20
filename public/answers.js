
//variable for the GPT3 answers
let answerGPT;
let answerfinal;

async function GPTAnswer(){
  // let allanswers = selectAll('spanAns')
  // for (var i=0;i<allanswers.length;i++){
  //   allanswers[i].remove();
  // }
    let ref = database.ref('answers')
    ref.endAt().limitToLast(1).on('child_added',async (snapshot,prevChildKey) => {
      var data = snapshot.val();
      let keys = Object.keys(data)
       answerGPT = data.name;
      //  console.log(answerGPT)
          // console.log("new key should be: " + data.key)
          // console.log("Previous Post ID: " + prevChildKey);
          
  });

  };
  

