// usefull variables
const cards=document.getElementsByClassName("bottom");
const choosenCards=[];

const colorByValue = {
    1:"firstpair",
    2:"secondpair",
    3:"thirdpair",
    4:"fourthpair",
    5:"fifthpair",
    6:"sixthpair"
}

let colorChoices=[];
let foundPair =[];
let deckSize = 12;
const DECK= [];



deckConstructor()

// for (index of deck){

// }


// functions

// create a deck with the choosen size
function deckConstructor (){
    for (i=deckSize;i>0;i=i-2){
        DECK.push((i/2));
        DECK.push((i/2));
    } 
}
// clone it to work with
var fullDeck = DECK.slice(0);

// draw a card form the clone deck
function drawOneCard(){
    var cardIndex = Math.floor(Math.random()*fullDeck.length);
    var cardToCraft = fullDeck[cardIndex];
    fullDeck.splice(cardIndex,1);
    return cardToCraft;
}

// take all cards of the deck one by one // need to work on the main deck to keep size since clone deck size decrease
function drawAll (){
    for (card of DECK){
        drawOneCard();
    }
    
}

// add a timer before hidding 2 cards when they are not a pair
function delayedTurn() {
    window.setTimeout(slowTurn, 1500);
}

// hide the 2 cards
function slowTurn(){
    cards[choosenCards[0]].classList.remove("turned")
    cards[choosenCards[1]].classList.remove("turned")
    choosenCards.shift(choosenCards[1]);
    choosenCards.shift(choosenCards[0]);
}

// main 
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
                delayedTurn(cards);
            }
            colorChoices=[];
        }
    })
};


