const questions  = [
{q: "Javascript is one of the basics of any web developer?", a:["True","False"]},
{q: "what is a function?", a: ["A block of code for a specific function that can be reused", "Block of code used only once", "A way to assign variables","Imported code from Java"]},
{q: "What does DOM stand for?", a: ["Document Object Model", "Direct Object Model", "Document On Model", "Direct Orientation Model"]},
{q: "What is ''document.querySelector used for?''?", a: ["To select a specfic element from within the DOM", "To remove objects", "To select type of  new element to create", "To convert objects to string"]},
{q: "What is event delegation?", a: ["The process of attaching the event listeners from the child elements to the parents (Bubbling)", "Ask another person to check your code","A type of event organization where you start with the most important task first"]},
{q: "What will document.createElement(''div'')do?", a:["Create a new div element","Nothing will return an error", "Create an img tag", "Create a div string"]},
{q: "What is the purpose of event.preventDefault()", a: ["Stop the normal action of an element from occuring","Stops Memory Waste","Stops javascript from infinite looops"]},
{q: "What is the difference between document.querySelector(''#example'') and document.getElementbyId(''example'')?", a: ["Nothing","getElementbyId is for classes", "querySelector searches in javascript"]},
{q: "Javascript was invented to replace CSS styling", a: ["False","True"]},
{q: "What does API stand for?", a: ["Application Programming Interface", "Analysis Process Integration", "Additional Protocol Inclusion", "Application Protocol Interface"]}
];
var time_limit = questions.length*5; // 5 seconds pero questions
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

load_data();







