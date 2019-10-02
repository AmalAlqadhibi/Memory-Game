//Create a list that holds all of your cards
const cards = document.querySelectorAll('.card');
let playerMoves = document.querySelector('.moves');
let timer = document.querySelector("#timer")
const restartButton = document.querySelector('.restart');
const stars = document.querySelector('.stars');
let cardName = [];
let openCard = [];
let openedCard = [];
let movment = 0;
let timerFlag;
//for timer
var input = {
    minutes: 10,
    seconds: 30
};
let timestamp = new Date(input.minutes, input.seconds);
let interval = 1;
//start the init setting
resetGame();

function resetGame() {
    movment = 0;
    timestamp = new Date(input.minutes, input.seconds);
    cardName = [];
    openCard = [];
    openedCard = [];
    playerMoves.textContent = 0;
    timer.textContent = "0m:0s";
    stars.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    stopTimer();
    cards.forEach(function(card) {
        card.classList.remove("open", "show", "match");
        let child = card.children[0];
        cardName.push(child.className);
    });
    shuffleCard();
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function shuffleCard() {
    shuffle(cardName);
    let i = 0;
    cards.forEach(function(card) {
        card.innerHTML = `<i class="${cardName[i]}"></i>`
        i++;
    });
}

function isMatched(card) {
    if (openCard[1].children[0].className == openCard[0].children[0].className) {
        openCard[0].classList.add('open', 'match');
        openCard[1].classList.add('open', 'match');
        openedCard.push(openCard[0],openCard[1])
        $(document).ready(function() {
            $(document).ready(function() {
                $(openCard[0]).effect("highlight", {times: 3});
                $(openCard[1]).effect("highlight", {times: 3});
            });
        });
    } else {
        $(document).ready(function() {
            $(openCard[1]).effect("shake");
            $(openCard[0]).effect("shake");
        });
    }
};

cards.forEach(function(card) {

    card.addEventListener("click", function() {
        startTimer();
    if (openedCard.length != 16){
        if (!card.classList.contains("open")) {
setScorePanel();
            openCard.push(card);
            if (openCard.length <= 2) {
                card.classList.add('open', 'show');
                setTimeout(function() {
                    card.classList.remove('open', 'show');
                    openCard = [];
                }, 1100);
            }
            if (openCard.length == 2) {
                isMatched(card)
            }
        }
    }
     if (openedCard.length == 16) {
        stopTimer();
        let dialog = document.querySelector("#score").textContent= `With ${movment} Moves and ${stars.childElementCount} Stars`;
        document.getElementById("WinningDialog").showModal();
    }
    });
});
function startTimer(){
    if (!timerFlag) {
    timerFlag = setInterval(function () {
        timestamp = new Date(timestamp.getTime() + 1 * 1000);
        document.getElementById('timer').innerHTML = 'm:' + timestamp.getSeconds() + 's';
    }, Math.abs(1) * 1000);
}}
function stopTimer(){
    clearInterval(timerFlag);
    timerFlag = null;
}
function setScorePanel(){
    movment += 1;
    playerMoves.textContent = movment
        if (movment == 22) {
            stars.removeChild(stars.lastElementChild);
        } else if (movment == 29) {
              stars.removeChild(stars.lastElementChild);
           }
}
function playAgainButton() {
    document.getElementById("WinningDialog").close();
    resetGame();
}
restartButton.addEventListener("click",resetGame)