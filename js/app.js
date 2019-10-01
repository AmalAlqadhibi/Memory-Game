
//Create a list that holds all of your cards
const cards = document.querySelectorAll('.card');
let playerMoves = document.querySelector('.moves');
const restartButton = document.querySelector('.restart');
let cardName = [];
let openCard = [];
let movment = 0;
resetGame();

function resetGame() {
     cardName = [];
     openCard = [];
    playerMoves.textContent = 0;
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
        $(document).ready(function() {

            $(document).ready(function() {
                $(openCard[0]).effect("highlight", {
                    times: 3
                });
                $(openCard[1]).effect("highlight", {
                    times: 3
                });
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

        if (!card.classList.contains("open")) {
            movment += 1;
            playerMoves.textContent = movment
            openCard.push(card);
            if (openCard.length <= 2) {
                card.classList.add('open', 'show');
                setTimeout(function() {
                    card.classList.remove('open', 'show');
                    openCard = [];
                }, 1300);

            }
            if (openCard.length == 2) {
                isMatched(card)
            }
        }
    });
});

function playAgainButton() {
    document.getElementById("myDialog").close();
    resetGame();
}
restartButton.addEventListener("click",resetGame)