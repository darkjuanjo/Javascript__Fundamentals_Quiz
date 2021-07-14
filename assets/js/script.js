var time_limit;
const questions  = [
{q: "Javascript is one of the basics of any web developer?", a:["True","False"]},
{q: "What does DOM stand for?", a: ["Document Object Model", "Direct Object Model", "Document On Model", "Direct Orientation Model"]},
{q: "What is ''document.querySelector used for?''?", a: ["To select a specfic element from within the DOM", "To remove objects", "To select type of  new element to create", "To convert objects to string"]},
{q: "What is event delegation?", a: ["The process of attaching the event listeners from the child elements to the parents (Bubbling)", "Ask another person to check your code","A type of event organization where you start with the most important task first"]},
{q: "What will document.createElement(''div'')do?", a:["Create a new div element","Nothing will return an error", "Create an img tag", "Create a div string"]},
{q: "What is the purpose of event.preventDefault()", a: ["Stop the normal action of an element from occuring","Stops Memory Waste","Stops javascript from infinite looops"]},
{q: "What is the difference between document.querySelector(''#example'') and document.getElementbyId(''example'')?", a: ["Nothing","getElementbyId is for classes", "querySelector searches in javascript"]},
{q: "Javascript was invented to replace CSS styling", a: ["False","True"]},
{q: "What does API stand for?", a: ["Application Programming Interface", "Analysis Process Integration", "Additional Protocol Inclusion", "Application Protocol Interface"]}
];
var TimerEl = document.getElementById("timer");
var setTimer = time_per_question => {time_limit = time_per_question * questions.length }

var displayTime = function (){
    let total_seconds = time_limit;
    this.hours = Math.floor(total_seconds/60);
    total_seconds = total_seconds - (this.hours * 60);
    this.minutes = Math.floor(total_seconds/60);
    total_seconds = total_seconds - (this.minutes * 60);
    this.seconds = total_seconds;
    if(this.hours < 10)
    {
        this.hours = "0" + this.hours;
    }
    if(this.minutes < 10)
    {
        this.minutes = "0" + this.minutes;
    }

    if(this.seconds < 10)
    {
        this.seconds = "0" + this.seconds;
    }

    return (this.hours + ":" + this.minutes  + ":" + this.seconds);
};

question_counter = 0;
var bodyEl = document.querySelector('body');
var formEl = document.createElement('form');
var QuestionEl = document.createElement('h2');
QuestionEl.id = "question";
bodyEl.appendChild(formEl);
formEl.appendChild(QuestionEl);

var load_data = function () {
    if(question_counter < questions.length)
    {
    QuestionEl.textContent = questions[question_counter].q;
    var copy = randomize(questions[question_counter].a);
        for(var i = 0; i < questions[question_counter].a.length; i++)
        {
            var divEl = document.createElement('div');
            divEl.id = i;
            var responseEl = document.createElement('p');
            responseEl.innerText = copy[i];
            divEl.appendChild(responseEl);
            formEl.appendChild(divEl);
        }
    }

    setClickEvent();
}

var removefromArray = function(value,array) {
  new_array = [];
  for(var i = 0; i < array.length; i++)
  {
      if(array[i] !== value)
      {
          new_array.push(array[i]);
      }
  }
  return new_array;
}

var randomize = function(array){
    var new_array = [];
    var temp_array = array;
    for(var i = 0; i < array.length; i++)
    {
        var index = Math.floor(Math.random()*temp_array.length);
        new_array.push(temp_array[index]);
        temp_array = removefromArray(temp_array[index],temp_array);
    }
    return new_array;
}

var Check_Response = function (clicked, response){
    if(clicked === questions[question_counter].a[0])
    {
        alert("Correct!");
    }else
    {
        alert("Wrong!");
    }
    if(question_counter < questions.length)
    {
    question_counter++;
    update_form(response);
    load_data();
    }
}

var update_form = function(Element_Array) {
    for(var i = 0; i < Element_Array.length; i++)
    {
        formEl.removeChild(Element_Array[i]);
    }
}

var setClickEvent = function()
{
    var response = document.querySelectorAll("form div");
    for(var i = 0; i < response.length; i++)
    {
        response[i].addEventListener('click', function(event) {
           var clicked = event.target.innerText;
           Check_Response(clicked, response);
        });
    }
}
setTimer(5); //parameter is the amount of time per question in seconds
var countdown = setInterval(function(){
    if(time_limit >= 0)
    {
    TimerEl.innerText = displayTime();
    time_limit--;
    }
    else {
        TimerEl.innerText = "00:00:00";
        alert("Time's up!");
        clearInterval(countdown);
    }
},1000)
load_data();







