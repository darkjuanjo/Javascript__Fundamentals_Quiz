const questions  = [
{q: "Commonly used data types DO Not include:", a:["alerts","strings","booleans","numbers"]},
{q: "What does DOM stand for?", a: ["Document Object Model", "Direct Object Model", "Document On Model", "Direct Orientation Model"]},
{q: "The condition in an if/else statement is enclosed with _________.", a: ["parenthesis", "quotes", "curly brackets", "square brackets"]},
{q: "Arrays in JavaScript can be used to store_________.", a: ["All of the above", "numbers and strings","other arrays","booleans"]},
{q: "String values must be enclosed within_________.", a:["quotes","curly brackets", "commas", "parenthesis"]},
{q: "A very useful tool used during development and debugging for printing content to the debugger is:", a: ["console.log","JavaScript","terminal/bash","for loops"]},
{q: "What does API stand for?", a: ["Application Programming Interface", "Analysis Process Integration", "Additional Protocol Inclusion", "Application Protocol Interface"]}
];

//None DOM global variables
var time_limit;
var timerobject;
var status = 0; //is the game finished?
var question_counter = 0;

//Declaring the initial DOM Elements 
var bodyEl = document.querySelector('body');
var headerEl = document.createElement('header');
var highscorelinkEl = document.createElement("a");
var highscore_divEl = document.createElement('div');
var highscore_h2El = document.createElement('h2');
var timer_divEl = document.createElement('div');
var timer_h2El = document.createElement('h2');
var formEl = document.createElement('form');
var maincontainerEl = document.createElement("div");
var question_containerEl = document.createElement("div");
var button_parent_containerEl = document.createElement("div");
var button_containerEl = document.createElement("div");
var start_button_containerEl = document.createElement("div");
var start_buttonEl = document.createElement('button');
var check_El = document.createElement('h2');
var TimerEl = document.getElementById("timer");
var labelEl = document.createElement('lable');
var textboxEl = document.createElement("input");
var SubmitEl = document.createElement("input");

//Assigning properties to initial DOM Elements
highscorelinkEl.href = "./highscore.html";
highscore_h2El.id = "view-highscore";
highscore_h2El.innerHTML = "View High Scores!";
timer_h2El.id = "view-highscore";
timer_h2El.innerHTML = "Time: 00:00:00";
formEl.id = "form-container";
maincontainerEl.className = "main-container";
question_containerEl.id = "question-container";
questionh1El = document.createElement('h1');
questionh1El.id = "question";
questionh1El.innerHTML = "Coding Quiz Challenge";
subTextEl = document.createElement('span');
subTextEl.innerText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
questionh1El.appendChild(subTextEl);
question_containerEl.appendChild(questionh1El);
button_parent_containerEl.className = "button-parent-container";
button_containerEl.className = "button-container";
start_button_containerEl.id = "start-button";
start_buttonEl.className = "start-button";
start_buttonEl.innerText = "Start Quiz";
check_El.id = "check";
labelEl.htmtlFor = "text";
labelEl.textContent = "Enter initials: "
textboxEl.id = "text";
SubmitEl.type = "submit";
SubmitEl.value = "Submit";
SubmitEl.id = "Submit";
SubmitEl.className = "start-button Submit"


// Attaching DOM Elements to container
highscorelinkEl.appendChild(highscore_divEl);
highscore_divEl.appendChild(highscore_h2El);
timer_divEl.appendChild(timer_h2El);
headerEl.appendChild(highscorelinkEl);
headerEl.appendChild(timer_divEl);
bodyEl.appendChild(headerEl);
start_button_containerEl.appendChild(start_buttonEl);
button_containerEl.appendChild(start_button_containerEl);
button_parent_containerEl.appendChild(button_containerEl);
maincontainerEl.appendChild(questionh1El);
maincontainerEl.appendChild(button_parent_containerEl);
maincontainerEl.appendChild(check_El);
formEl.appendChild(maincontainerEl);
bodyEl.appendChild(formEl);


function timer () {
    var countdown = setInterval(function(){
        if(time_limit >= 0 && status === "0")
        {
            time_limit--;
            timer_h2El.innerText = displayTime();
        } 
        else if (status === "1") {
            clearInterval(countdown);
        }
        else {
            timer_h2El.innerText = "Time: 00:00:00";
            alert("Time's up!");
            time_limit = 0;
            clearInterval(countdown);
            the_end();
        }
    },1000);

    return timer;
}

var save_data = function(event) {
event.preventDefault();
var items = JSON.parse(localStorage.getItem("saved")) || [];
var player = {
    name: textboxEl.value,
    score: time_limit
}
items.push(player);
if(items.length > 1)
{
 items = organize(items);
}
localStorage.setItem("saved", JSON.stringify(items));
open("./highscore.html","_self");
}

var organize = function(items) {
    var place_holder;

    for(outer_loop = 0; outer_loop < items.length; outer_loop++)
    {
        for(inner_loop = outer_loop+1; inner_loop < items.length; inner_loop++)
        {
            if(items[inner_loop].score > items[outer_loop].score)
            {
                //change positions
              place_holder = items[outer_loop];
              items[outer_loop] = items[inner_loop];
              items[inner_loop] = place_holder;
              place_holder = "";
            }
        }
    }
    if(items.length > 30)
    {
       items =  items.slice(0,29);
    }
    return items;
}

var the_end = function () {
    var buttons = document.querySelectorAll(".response-container");
    update_form(buttons);
    questionh1El.innerHTML = "All done!";
    timer_h2El.innerText = displayTime();
    subTextEl.innerText = "Your final score is " + time_limit + ".";
    subTextEl.id = "subtext";
    questionh1El.appendChild(subTextEl);
    button_parent_containerEl.appendChild(labelEl);
    button_parent_containerEl.appendChild(textboxEl);
    button_parent_containerEl.appendChild(SubmitEl);
    SubmitEl.onclick = save_data;
};

var setTimer = function(time_per_question) {
    time_limit = time_per_question * questions.length 
    }

var displayTime = function (){
    let total_seconds = time_limit;
    this.hours = Math.floor(total_seconds/3600);
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

    return ("Time: " + this.hours + ":" + this.minutes  + ":" + this.seconds);
};

var setClickEvent = function(event)
{
    var response = document.querySelectorAll(".response-container");
    for(var i = 0; i < response.length; i++)
    {
        response[i].addEventListener('click', function(event) {
         var clicked = event.target.innerText;
          event.preventDefault();
           Check_Response(clicked, response);
        });
    }
}


var load_data = function () {
    if(question_counter < questions.length)
    {
        questionh1El.innerHTML = questions[question_counter].q;
        questionh1El.className = "question";
        questionh1El.id = "";
         var copy = randomize(questions[question_counter].a);
        for(var i = 0; i < questions[question_counter].a.length; i++)
        {
            var div_responsecontainerEl = document.createElement('div');
            div_responsecontainerEl.className = "response-container";
            div_responsecontainerEl.id = i;
            var responseEl = document.createElement('button');
            responseEl.className = "start-button response";
            var text = (i + 1) + ". " + copy[i];
            responseEl.innerText = text;
            div_responsecontainerEl.appendChild(responseEl);
            button_containerEl.appendChild(div_responsecontainerEl);
        }
        setClickEvent();
    }
    else {
        status = 1;
        the_end();
    }
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

        if(clicked.substring(3,clicked.length) === questions[question_counter].a[0])
        {
            check_El.innerText = "Correct!";
        }else
        {
            check_El.innerText = "Wrong!";
            if((time_limit - 10) >= 0)
            {
            time_limit = time_limit - 10;
            }
            else {
                time_limit = 0;
            }
        }
        if(question_counter < questions.length)
        {
        question_counter++;
        update_form(response);
        load_data();
        }
    };

    var update_form = function(Element_Array) {
        for(var i = 0; i < Element_Array.length; i++)
        {
            button_containerEl.removeChild(Element_Array[i]);
        }
    }


    setTimer(10); //parameter is the amount of time per question in seconds

start_buttonEl.onclick = function(event) {
    event.preventDefault();
    start_button_containerEl.removeChild(start_buttonEl);
    button_containerEl.removeChild(start_button_containerEl);
    timerobject = timer();
    load_data();
};







