// usefull variables
const choosenCards=[];
const colorByValue = {
    1:"#FFC482", 
    2:"#ED1C24",
    3:"#FCFCFC",
    4:"#92AFD7",
    5:"#934B00",
    6:"#FF579F",
    7:"#9BA2FF",
    8:"#2A2E45",
    9:"#E8C547",
    10:"#CDD1C4",
    11:"#AF3B6E",
    12:"#149911",
    13:"#1EFC1E",
    14:"#7A542E",
    15:"#94ECBE",
    16:"#F4DBD8",
    17:"#E980FC ",
    18:"#6B818C",
    19:"#090C9B",
    20:"#870058"

}

const imgPeppa ={
    1:"img/peppapig/peppa_pig_splat-1.png", 
    2:"img/peppapig/george_pig_splat-1.png",
    3:"img/peppapig/daddy_pig_splat-1.png",
    4:"img/peppapig/mummy_pig_splat-1.png",
    5:"img/peppapig/grandpa_pig_splat-1.png",
    6:"img/peppapig/granny_pig_splat-1.png",
    7:"img/peppapig/candy_cat_splat-1.png",
    8:"img/peppapig/danny_dog_splat-1.png",
    9:"img/peppapig/emily_elephant_splat-1.png",
    10:"img/peppapig/freddie_fox_splat-1.png",
    11:"img/peppapig/gerald_giraffe_splat-1.png",
    12:"img/peppapig/molly_mole_splat-1.png",
    13:"img/peppapig/pedro_pony_splat-1.png",
    14:"img/peppapig/rebecca_rabbit_splat-1.png",
    15:"img/peppapig/suzy_sheep_splat-1.png",
    16:"img/peppapig/zoe_zebra_splat-1.png",
}
var deck= [];

let colorChoices=[];
let foundPair =[];
let deckSize = 8;
var speed = 1200;

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
    article.classList.add("card", "m-2", "p-0","col-3", "col-xl-2","col-lg-2", "col-md-3", "border-0", "round");
    article.style.backgroundColor = colorByValue[cardAtWork];
    let img = document.createElement("img");
    let imgBack = document.createElement("img");
    img.src =imgPeppa[cardAtWork];
    imgBack.src ="img/peppapig/peppa_george_characters.png";
    img.classList.add("effect");
    button.setAttribute("href","#");
    button.classList.add("bottom", "round");
    button.setAttribute("value",cardAtWork);
    button.appendChild(imgBack);
    article.appendChild(img);
    article.appendChild(button);
    board.appendChild(article);
}

// start function
function start(){
    bordCleaner();
    deck = deckConstructor();
    let btn = document.getElementById("start");
    btn.classList.add("turned");
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
    speed);
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
    let score =0;
    let inProgress =0;
    let trys =0;
    for (let i=0; i<cards.length;i++){
        cards[i].addEventListener ("click", function(){
            if (inProgress<2){
                cards[i].classList.add("turned");
                choosenCards.push(i);
                colorChoices.push(cards[i].value);

                inProgress+=1;
                if (colorChoices.length===2){
                    trys +=1;
                    if (colorChoices[0] === colorChoices[1]){
                        score +=1;
                        foundPair.push(colorChoices[0]);
                        // choosenCards[1].classList.add("effect");
                        // choosenCards[0].classList.add("effect");
                        choosenCards.shift(choosenCards[1]);
                        choosenCards.shift(choosenCards[0]);
                        inProgress = 0;
                    }
                    else{ 
                        cards = delayedTurn(cards);
                        inProgress = 0;
                    }
                    colorChoices=[];
                }
            }
                
        })
    };
}
