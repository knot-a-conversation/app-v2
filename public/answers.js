
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
    ref.orderByKey().startAt("-MU8aTYxRZzTRFoaMgQA").on('child_added',async (snapshot) => {
      var data = snapshot.val();
      let keys = Object.keys(data)
       answerGPT = data.name;
        console.log(answerGPT)
       questionprompt = data.question;
       spl = answerGPT.split(". ");
          if(spl.length > 1){
            spl.pop();
            fStop = ". ";
            joiner = join(spl,fStop);
            finalAns = joiner+fStop;
          } else {
            finalAns = answerGPT;
          }
          
       console.log(finalAns)
          // console.log("new key should be: " + data.key)
          // console.log("Previous Post ID: " + prevChildKey);
          const ques = createP("Question: ").addClass("qna");
          var li_q = createP(data.question+"\n").addClass("db");  
          
          const answers = createP("Answer: ").addClass("qna");
          var li_a = createP(finalAns).addClass("dba");  

        set = createDiv().addClass("set-order")
        q_set = ques.parent(set);
        q_set2 =  li_q.parent(set);
        a_set= answers.parent(set);
        a_set2=  li_a.parent(set);

        // reverseSet = createDiv().addId("reverse-order")
        set.parent("reverse-order")
     
  });
  };

  
GPTAnswer();
 }
  

