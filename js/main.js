// usefull variables
const choosenCards=[];
const colorByValue = {
    1:"firstpair",
    2:"secondpair",
    3:"thirdpair",
    4:"fourthpair",
    5:"fifthpair",
    6:"sixthpair"
}

var deck= [];

let colorChoices=[];
let foundPair =[];
let deckSize = 2;



// functions

// create a deck with the choosen size
function deckConstructor (){
    for (i=deckSize;i>0;i=i-2){
        deck.push((i/2));
        deck.push((i/2));
    } 
    return deck;
}

// take all cards of the deck one by one and craft it on the board// need to work on the main deck to keep size since clone deck size decrease
function drawAll (){
    var fullDeck = deck.slice(0);
    for (card of deck){
        let cardAtWork = drawOneCard(fullDeck);
        craftCard(cardAtWork);
    }
    const cards = document.getElementsByClassName("bottom");
    return cards;
}

// draw a card form the clone deck
function drawOneCard(fullDeck){
    var cardIndex = Math.floor(Math.random()*fullDeck.length);
    var cardToCraft = fullDeck[cardIndex];
    fullDeck.splice(cardIndex,1);
    return cardToCraft;
}

function craftCard(cardAtWork){
    let board = document.getElementById("cardBoard");
    let article = document.createElement("article");
    let button = document.createElement("button");
    article.classList.add("card", "m-2", "p-0", "col-3", "border-0",colorByValue[cardAtWork]);
    button.setAttribute("href","#");
    button.classList.add("bottom");
    button.setAttribute("value",cardAtWork);
    article.appendChild(button);
    board.appendChild(article);
}

// start function
function start(){
    bordCleaner();
    deck = deckConstructor();
    // clone it to work with
    let btn = document.getElementById("start");
    // btn.classList.add("turned");
    let cards = drawAll();
    cards = play(cards);
}

function bordCleaner(){
    let board = document.getElementById("cardBoard");
    board.innerHTML="";
    deck=[];
}

// add a timer before hidding 2 cards when they are not a pair
function delayedTurn(cards) {
    window.setTimeout(function(){
        slowTurn(cards);
    }, 
    1000);
    return cards;
}

// hide the 2 cards
function slowTurn(cards){
    cards[choosenCards[0]].classList.remove("turned")
    cards[choosenCards[1]].classList.remove("turned")
    choosenCards.shift(choosenCards[1]);
    choosenCards.shift(choosenCards[0]);
    return cards;
}



// main
function play(cards){
    let trys =0;
    for (let i=0; i<cards.length;i++){
        cards[i].addEventListener ("click", function(){
            cards[i].classList.add("turned");
            choosenCards.push(i);
            colorChoices.push(cards[i].value);
            if (colorChoices.length===2){
                if (colorChoices[0] === colorChoices[1]){
                    foundPair.push(colorChoices[0]);
                    choosenCards.shift(choosenCards[1]);
                    choosenCards.shift(choosenCards[0]);
                }
                else{ 
                    cards = delayedTurn(cards);
                }
                colorChoices=[];
            }
        })
    };
    return cards;
}

