
//variable for the GPT3 answers
let answerGPT;
let answerfinal;
//firebase database intialise
let database;

//setting up firebase in the client
 function setup(){
database = firebase.database();

async function GPTAnswer(){
  // let allanswers = selectAll('spanAns')
  // for (var i=0;i<allanswers.length;i++){
  //   allanswers[i].remove();
  // }
    let ref = database.ref('answers')
    ref.limitToLast(10).on('child_added',async (snapshot,prevChildKey) => {
      var data = snapshot.val();
      let keys = Object.keys(data)
       answerGPT = data.name;
       questionprompt = data.question;
      //  console.log(answerGPT)
          // console.log("new key should be: " + data.key)
          // console.log("Previous Post ID: " + prevChildKey);
          const ques = createP("Question: ").addClass("qna");
          var li_q = createSpan(data.question+"\n").addClass("db");  
         
          const answers = createP("Answer: ").addClass("qna");
          var li_a = createP(data.name).addClass("dba");  
          ques.parent("dblist");
          li_q.parent("dblist");
          answers.parent("dblist");
          li_a.parent("dblist");
       
  });
  };

  
GPTAnswer();
 }
  

