
var errors = 100;
var cardList = [
    "card1",
    "card2"
]


var cardSet;
var board = [];
var rows = 4;
var columns =3;

var card1Selected;
var card2Selected;
var staticPath = '/static/img/';

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet);
    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {


    document.getElementById("board").innerHTML = '';
    
    let row = [];
    for (let r = 0; r < rows; r++) {
        
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = staticpath + cardImg + ".png";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);

        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 1);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = staticpath + "back.png";
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        let coords = this.id.split("-"); // "0-1" -> ["0", "1"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        let selectedImage = board[r][c];

        if (!card1Selected) {
            card1Selected = this;
            card1Selected.src = staticPath + selectedImage + ".png";
        } else if (!card2Selected && this !== card1Selected) {
            card2Selected = this;
            card2Selected.src = staticPath + selectedImage + ".png";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = staticpath + "back.png";
        card2Selected.src = staticpath + "back.png";
        errors  = errors - 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}
