const cards=document.getElementsByClassName("bottom");
const choosenCards=[];
let colorChoices=[];
let foundPair =[];

function delayedTurn() {
    window.setTimeout(slowTurn, 1500);
}

function slowTurn(){
    cards[choosenCards[0]].classList.remove("turned")
    cards[choosenCards[1]].classList.remove("turned")
    choosenCards.shift(choosenCards[1]);
    choosenCards.shift(choosenCards[0]);
}

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


