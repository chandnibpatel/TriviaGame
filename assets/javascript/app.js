var q1 ={
    qId:"q1",
    qText:"The value of (0.625 * 0.0729 * 28.9)/(0.0017 * 0.025 * 8.1) is",
    options: ["0.3825", "3.825", "3825","382.5"],
    correctAns: "3825"
}

var q2 ={
    qId:"q2",
    qText:"The size of a wooden block is 5 * 10 * 20 cm3. How many whole such blocks you will take to construct a solid wooden cube of minimum size?",
    options: ["6", "8", "12","16"],
    correctAns: "8"
}

var q3 ={   
    qId:"q3",
    qText:"If a, b, c, ........, x, y, z are 26 natural numbers , then the value of (x – a) (x – b) (x – c)........ (x – y) (x – z) is :",
    options: ["0", "1", "26","1/2"],
    correctAns: "0"
}
var q4 ={   
    qId:"q4",
    qText:"If a and b are such numbers that a > 0 and b < 0, then which one of the following is always correct?",
    options: ["a + b > 0", "a – b > 0", "a + b < 0","a – b < 0"],
    correctAns: "a – b > 0"
}
var q5 ={   
    qId:"q5",
    qText:"In a number of three digits, the digits in the unit’s place and the ten’s place are equal and the sum of all the digits is 8. The digit of unit place is:",
    options: ["4", "3", "5","none"],
    correctAns: "3"
}
var q6 ={   
    qId:"q6",
    qText:"The sum of the squares of three consecutive natural numbers is 2030. Then what is the middle number?",
    options: ["27", "26", "25","28"],
    correctAns: "26"
}
var q7 ={   
    qId:"q7",
    qText:"The digit of two digit number are in the ratio of 2 : 3 and the number obtained by interchanging the digits is bigger than the original number by 27. What is the original number?",
    options: ["64", "96", "46","69"],
    correctAns: "69"
}
var q8 ={   
    qId:"q8",
    qText:"What is 25% of 25% equal to?",
    options: ["6.25", "0.0625", "0.00625","0.625"],
    correctAns: "0.0625"
}
var q9 ={   
    qId:"q9",
    qText:"If 8% of x = 4% of y, then 20% of x is:",
    options: ["10 % of y", "16 % of y", "80 % of y","15 % of y"],
    correctAns: "10 % of y"
}
var q10 ={   
    qId:"q10",
    qText:"75% of a number when added to 75 is equal to the number. The number is:",
    options: ["150", "200", "225","300"],
    correctAns: "300"
}
var queArr = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10];
var noOfQueToDisp = 8;
var loadedQue = [];
var remTime = 10;
var intervalId;
var rightAnswer="";
var currentQue=0;
var correctAnsCount=0;
var incorrectAnsCount=0;
var unansweredCount=0;

function startTimer(){
     remTime = 10;
       //start timer
    $("#timeRem").text(" " + remTime + " Sec")
      if(remTime > 0){
        intervalId = setInterval(count,1000);
    } 
}

function count() {
    //decrement time by 1
    if(remTime > 0){
        remTime = remTime - 1;
    }    
     $("#timeRem").text(" " + remTime + " Sec");
    if(remTime == 0)
    { 
        unansweredCount++;
        clearInterval(intervalId);
        displayResult("Unanswered") ;
        return;
     }
  }

//Load random question from array 
function loadQuePage(){
    var tempArr =[];
    for(var i=0;i<queArr.length;i++){
        tempArr[i] = queArr[i];
    }
    var qNo;
    for(var i=0;i<noOfQueToDisp;i++){
       qNo  = Math.floor(Math.random()*tempArr.length);
       loadedQue[i] = tempArr[qNo];
       tempArr.splice(qNo,1);
       
    }
}

function displayQue(){
    var newDiv;
    $("#questionDiv").show();
    $("#resultSummaryDiv").hide();
    $("#resultDiv").hide();
    
    if (currentQue<loadedQue.length)
    {
        
        $("#questionText").text(loadedQue[currentQue].qText);
      console.log(questionText);
          

       for(var j=0; j<loadedQue[currentQue].options.length;j++)
       {
           var objName=
        optionDivObj=$("#option"+j);
        optionDivObj.empty();
       // optionDivObj.text=loadedQue[currentQue].options[j]
        optionDivObj.append(loadedQue[currentQue].options[j]);
       }

      rightAnswer=loadedQue[currentQue].correctAns;
      startTimer();
    } else{
            $("#questionDiv").hide();
            $("#questionDiv").hide();
            $("#resultSummaryDiv").show();
            resultSummary();
    }
}

function displayResult(resultText){
    var qAns ;
    var imgUrl;
    
    // $("#questionDiv").hide();
    $("#resultSummaryDiv").hide();
    if (resultText==="Correct"){
        imgUrl="./assets/images/correct.gif";
        
        $("#resultlbl").text('You are correct!!...');}
    else if(resultText==="Incorrect")
       { 
        imgUrl="./assets/images/wrong.gif";
        $("#resultlbl").text("Sorry ! Correct answer is " + rightAnswer );
    }
    else {
        imgUrl="./assets/images/timeout.gif";
        $("#resultlbl").text("Timeout  ! Correct answer is " + rightAnswer );
    }
    $("#resultImg").attr("src",imgUrl);
    $("#resultDiv").show();
    var windowTimeout =setTimeout(function() {
        currentQue+=1;
       displayQue();
      }, 5000);
 }


function resultSummary(){
    $("#correctAnsCnt").text("Correct Answers: "+ correctAnsCount);
    $("#incorrectAnsCnt").text("Incorrect Answers: "+ incorrectAnsCount);
    $("#unansweredCnt").text("Unanswered: "+ unansweredCount);
}
function disableButton(){

}
function buttonClick(selectedText){
    $("#questionDiv").attr("disabled","disabled");
    clearInterval(intervalId);
    if (rightAnswer===selectedText)
    {
        correctAnsCount++;
        resultText="Correct"
    }
    else
    {
        incorrectAnsCount++;
        resultText="Incorrect"
    }
    displayResult(resultText);
   

}
//$('input[name=gender]:checked').val()
$(document).ready(function() {
    $("#questionDiv").on("click",".options", function(){
        var selectedText=$(this).text();
        console.log("This " + selectedText);
        buttonClick(selectedText);
    });

        loadQuePage();
        displayQue();
      
});