
var seconds;
var intervalID;

const stopCountdown = function(){
    clearInterval(intervalID);
    console.log('Stopped');
}

var startTimer = (length)=>{
    seconds = length; 
    intervalID = setInterval(()=>{
        console.log(seconds);
        seconds--;
        if(seconds < 28){
            console.log('Below');
            stopCountdown();        
        }
    }, 1000);
}
startTimer(30);
   



