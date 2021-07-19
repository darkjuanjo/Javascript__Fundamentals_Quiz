// Create DOM Elements
var bodyEl = document.querySelector('body');
var content_containerEl = document.createElement('div');
var  h1El = document.createElement('h1');
var scores_containerEl = document.createElement('div');
var list_containerEl = document.createElement('div');
var listEl = document.createElement('ul');
var button_containerEl = document.createElement('div');
var go_back_button_containerEl = document.createElement('div');
var go_back_button = document.createElement('button');
var clear_highscore_button_containerEl = document.createElement('div');
var clear_highscore_button = document.createElement('button');

// Give Attributes to DOM Elements
content_containerEl.className = "content-container";
h1El.innerText = "High Scores!";
scores_containerEl.className = "scores-container";
list_containerEl.className = "list-container";
listEl.className = "list";
button_containerEl.className = "button-container";
go_back_button_containerEl.className = "go-back-container";
go_back_button.id = "go-back";
go_back_button.innerText = "Go back";
clear_highscore_button_containerEl.className = "clear-highscores-container";
clear_highscore_button.id = "clear-highscores";
clear_highscore_button.innerText = "Clear High Scores"

//Attach DOM Elements
bodyEl.appendChild(content_containerEl);
content_containerEl.appendChild(h1El);
content_containerEl.appendChild(scores_containerEl);
scores_containerEl.appendChild(list_containerEl);
list_containerEl.appendChild(listEl);
content_containerEl.appendChild(button_containerEl);
button_containerEl.appendChild(go_back_button_containerEl);
go_back_button_containerEl.appendChild(go_back_button);
button_containerEl.appendChild(clear_highscore_button_containerEl);
clear_highscore_button_containerEl.appendChild(clear_highscore_button);

var scores = JSON.parse(localStorage.getItem('saved')) || []
var load_saved_data = function () {
        if(scores.length != 0)
        {
            for(let i = 0; i < scores.length; i++)
            {
                var list_itemEl = document.createElement('li');
                list_itemEl.innerText = scores[i].name + " - " + scores[i].score ;
                listEl.appendChild(list_itemEl);
            }
        }
};

clear_highscore_button.onclick = function(){
    localStorage.removeItem('saved');
    while(listEl.firstChild){
        listEl.removeChild(listEl.firstChild);
    }
}

go_back_button.onclick = function(){
    open("./index.html","_self");
}

load_saved_data();
console.log(listEl);