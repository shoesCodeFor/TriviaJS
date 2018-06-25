/**
 * X-Files trivia game - By Schuyler Ankele
 */
var seconds;
var intervalID;
var qNumber = 0; 
var correct = 0;
var incorrect = 0;
var currentQuestion;

// Application flow
// Intro - Switch Backgrounds


// User clicks start (startGame) startTimer
const startGame = ()=>{
    $('#timer').attr('onclick', '');
    startTimer(30);
    pickQuestion(); 
}

// Pick/ Post questions
const pickQuestion = ()=>{
    qNumber++;
    // Randomize the selection - refactor to use later
    // let numInArray = randomNum(questions.length);
    currentQuestion = cycleQuestion(questions);
    postQuestion(currentQuestion);
}
// User answers question (checkAnswer) - which also loads another questions and resets timers
const checkAnswer = (num) =>{
    if(currentQuestion.answer == num){
        console.log('Correct');
        correct++;
    }
    else{
        console.log('Incorrect');
        incorrect++;
    }
    pickQuestion();
    stopCountdown();
    startTimer(30);
}

// If timer runs out or qNum = questions.length end the game and post a summary



const postQuestion = (qObj) =>{
    if(qObj){
        let questionHeader = `
        <h2>${qObj.question}</h2>
        `;
        let index = 0;
        let buttonList = $('<div>');
        qObj.options.forEach(element => {
            let button = $('<button>');
            button.attr({
                'type':'button',
                'class':'btn btn-primary btn-lg btn-block answer',
                'value':index,
                'onclick':`checkAnswer(${index})`
            });
            button.text(element)
            buttonList.append(button);
            index++;
        });
        $('#questions').empty().append(questionHeader).append(buttonList);
        $('.answer').on('click', function (){
            let answer = $(this).attr('value');
            console.log(answer);
            // Execute some function that checks and skips to the next answer
        });
    }
    else{
        console.log('No more questions');
        stopCountdown();
        endGame();
    }
}


// shut it down
const stopCountdown = function(){
    clearInterval(intervalID);
    console.log('Stopped');
}
// Has to be a var so it's mutable
var startTimer = (length)=>{
    seconds = length;
    let timerBtn =  $('#timer');
    intervalID = setInterval(()=>{
        console.log(seconds);
        seconds--;
        timerBtn.html(seconds);
        if(seconds < 1){
            console.log('You\'re out of time!');
            stopCountdown(); 
            timerBtn.html('Time is up!');
        }
    }, 1000);
}
// startTimer(30);

const randomNum = max => {
    return Math.floor(Math.random() * max);
}

const cycleQuestion = objArray => {
    let question = objArray.shift();
    console.log(question);
    if(question !== undefined){
        return question;
    }
    else{return false}
}

const endGame = ()=>{
    let closingCredits = `
        <h1>Game Over</h1>
        <h2>Number of Questions Answered</h2>
        <h3>${qNumber}</h3>
        <br>
        <h2>Number of Correct Answers<h2>
        <h3>${correct}</h3>
        <h2>Number of Incorrect Answers<h2>
        <h3>${incorrect}</h3>
    `;
    $('#questions').fadeOut(1000);
    $('#score').append(closingCredits).fadeIn(1000);
    stopCountdown();
    $('#timer').remove();
}

// console.log(cycleQuestion([]));



