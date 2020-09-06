// usefull variables

let patPatrouille={
    couleur:"#2196f3",
    image:"img/patpatrouille/depositphotos_84789388-stock-photo-yellow-and-white-dog-paw.jpg",
    logo:"img/patpatrouille/logo.png",
    dos:"img/patpatrouille/logo.png"
}

let peppa={
    couleur:"#2196f3",
    image:"img/peppapig/pattern-02-dark-blue.png",
    logo:"img/peppapig/119-1194994_peppa-pig-books-available-in-cziplee-peppa-pig.png",
    dos:"img/peppapig/peppa_george_characters.png"
}

const choosenCards=[];
const colorByValue={
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
    16:"#F4DBD8"

}
const imgPatpatrouille={
    1:"img/patpatrouille/chase_badge_patpatrouile_sq.png", 
    2:"img/patpatrouille/fermiere_rumi_patpatrouille_sq.png",
    3:"img/patpatrouille/jake_badge_patpatrouile_sq.png",
    4:"img/patpatrouille/everest_badge_patpatrouile_sq.png",
    5:"img/patpatrouille/m_le_maire_hollinger_badge_patpatrouile_sq.png",
    6:"img/patpatrouille/marcus_badge_patpatrouile_sq.png",
    7:"img/patpatrouille/maurice_badge_patpatrouile_sq.png",
    8:"img/patpatrouille/rocky_badge_patpatrouile_sq.png",
    9:"img/patpatrouille/mme_la_maire_goodway_badge_patpatrouile_sq.png",
    10:"img/patpatrouille/poule_gallinetta_badge_patpatrouile_sq.png",
    11:"img/patpatrouille/ruben_badge_patpatrouile_sq.png",
    12:"img/patpatrouille/ryder_badge_patpatrouile_sq.png",
    13:"img/patpatrouille/stella_badge_patpatrouile_sq.png",
    14:"img/patpatrouille/zuma_badge_patpatrouile_sq.png",
    15:"img/patpatrouille/capt_turbo_badge_patpatrouile_sq.png",
    16:"img/patpatrouille/4636498-la-pat-patrouille-au-complet-article_media-2.jpg"
}

const imgPeppa={
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

var deck=[];
let colorChoices=[];
let foundPair=[];
var GameSpeed=0;
var deckSize=0;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// functions

// set the turning speed
function speed(choice){
    let speeds=[
        1500,
        1000,
        600
    ]
    return speeds[choice];
}

// set the size of the deck
function size(choice){
    let deckSizes=[
        12,
        20,
        32
    ]
    return deckSizes[choice];
}

// set difficulty and pre-set speed and size
function difficulty(choice){
    deckSize=size (choice);
    choosenSpeed=speed (choice);
    let btnStart=document.getElementsByClassName("btnstart");
    for (btn of btnStart){
        btn.classList.toggle("turned");
    }
}
    
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
    var fullDeck=deck.slice(0);
    for (card of deck){
        let cardAtWork = drawOneCard(fullDeck);
        craftCard(cardAtWork);
    }
    const cards = document.getElementsByClassName("bottom");
    return cards;
}

// craft cards with the choosen set (peppa or pat patrol)
function craftCard(cardAtWork){
    let board=document.getElementById("cardBoard");
    let article=document.createElement("article");
    let button=document.createElement("button");
    article.classList.add("card", "m-2", "p-0","col-3", "col-xl-2","col-lg-2", "col-md-3", "border-0", "round");
    article.style.backgroundColor = colorByValue[cardAtWork];
    let img=document.createElement("img");
    let imgBack=document.createElement("img");
    img.src=imgSelected[cardAtWork];
    imgBack.src=imgBackSelected;
    img.classList.add("effect");
    button.setAttribute("href","#");
    button.classList.add("bottom", "round");
    button.setAttribute("value",cardAtWork);
    button.appendChild(imgBack);
    article.appendChild(img);
    article.appendChild(button);
    board.appendChild(article);
}

// draw a card form the clone deck
function drawOneCard(fullDeck){
    var cardIndex=Math.floor(Math.random()*fullDeck.length);
    var cardToCraft=fullDeck[cardIndex];
    fullDeck.splice(cardIndex,1);
    return cardToCraft;
}

// set the backgroung img with the choosen characters
function startingImg(playWith){
    let screen=document.getElementById("fullScreen");
    screen.classList.remove("turned");
    var imgSelected=0;
    if (playWith===1){
        imgSelected=imgPatpatrouille;
        let bgImg=document.getElementById("bgImg");
        bgImg.setAttribute('background',"img/patpatrouille/depositphotos_84789388-stock-photo-yellow-and-white-dog-paw.jpg");
    }
    else{
        imgSelected=imgPeppa;
        let bgImg=document.getElementById("bgImg");
        bgImg.setAttribute('background',"img/peppapig/pattern-02-dark-blue.png");
    }
    return imgSelected;
}

// switch the bottom of card to the right caracters
function startImgBack (playWith){
    var imgBackSelected=0;
    if (playWith===1){
        imgBackSelected=patPatrouille.dos;
    }
    else{
        imgBackSelected=peppa.dos;
    }
    return imgBackSelected;
}

// switch the header of card to the right caracters colors
function header (playWith){
    let header= document.getElementById("header");
    if (playWith===1){
        header.classList.add("patPatrouille");
    }
    else{
        header.classList.add("peppa");
    }
}

// switch logo
function logo (playWith){
    let logo= document.getElementById("logo");
    if (playWith===1){
        logo.setAttribute("src",patPatrouille.logo);
        logo.classList.add("patPatrouille");
    }
    else{
        logo.setAttribute("src",peppa.logo);
        logo.classList.add("peppa");
    }
}

// start the game
function start (playWith){
    imgSelected=startingImg(playWith);
    imgBackSelected=startImgBack(playWith);
    header(playWith);
    logo(playWith);
    boardCleaner();
    deck=deckConstructor();
    let btn=document.getElementById("start");
    btn.classList.add("turned");
    let cards=drawAll();
    cards=play(cards);
}

// clean the board
function boardCleaner(){
    let board=document.getElementById("cardBoard");
    board.innerHTML="";
    deck=[];
}

// add a timer before hidding 2 cards when they are not a pair
function delayedTurn(cards) {
    window.setTimeout(function(){
        slowTurn(cards);
    }, 
    choosenSpeed);
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

// main game
function play(cards){
    let score=0;
    let inProgress=0;
    let trys=0;
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
                        choosenCards.shift(choosenCards[1]);
                        choosenCards.shift(choosenCards[0]);
                        inProgress = 0;
                        if (score===(deck.length/2)){
                            victory()
                        }
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

// show an victorious event 
 function victory(){
    let victory = document.getElementById("victory");
    let start = document.getElementById("start");
    let header= document.getElementById("fullScreen");
    let board = document.getElementById("cardBoard");
    let btnStart = document.getElementsByClassName("btnstart");
    for (btn of btnStart){
        btn.classList.add("turned");
    }
    header.classList.add("turned");
    board.classList.add("turned");
    start.classList.remove("turned");
    victory.classList.remove("turned");
 }

// reload page in case of play again
 function playAgain (){
    document.location.reload(true);
 }