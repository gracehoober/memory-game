"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];
const colors = shuffle(COLORS);

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.
  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  };
  return items;
};
/** button to start game and button to restart game*/
let start = document.querySelector(".start");
start.addEventListener("click", createCards, {once:true});
start.addEventListener("click", hideStart, {once:true});

// let newGame = document.querySelector(".newGame");
// newGame.addEventListener("click", )

/** create cards an add event listener */
function createCards() {
  const gameBoard = document.getElementById("game");
  //create cards with classes and ids
  for (let i = 0; i < colors.length; i++) {
    let card = document.createElement("div");
    card.classList.add(colors[i]);
    card.classList.add("card");
    card.setAttribute("id", "card" + i);
    gameBoard.append(card);
  //add event listener
    let eventListenToCard = document.getElementById("card" + i);
    eventListenToCard.addEventListener("click", /*(evt) => {
      evt.target.style["background-color"] = colors[i];
    }*/ handleCardClick);
  };
};

/** Handle clicking on a card: this could be first-card or second-card. */
let clickedOn = [];//outside of function so it does not go back to an empty arr with each click, way of counting how many clicks occur
let delayFlip;
function handleCardClick(evt) {
  //add color to card if the number of clicks is <= 2;
  let clickedCard = evt.target;//access div where click occurred

  if(clickedOn.length < 2){// add color to cards //this condition needs to be in it's own if statement without else if, etc. bc the cards need to change with a click consistently
      //maybe use flipCard function here? so need access to the card that was clicked on
      if(clickedOn.includes(clickedCard)){//will this work so you cant click ont the same card twice?
        return;
      };
      clickedOn.push(clickedCard);//only put card into array if it is less than 2, if you put div in with every click the limit would be off
      flipCard(clickedCard);
  };
  if (clickedOn.length === 2){
    let firstCardColor = clickedOn[0].classList[0];//access colors of both cards
    let secondCardColor = clickedOn[1].classList[0];

    if(firstCardColor !== secondCardColor){
      //use unFlipCard here../ need to delay this by 1 second so the viewer can see the color change
      delayFlip = setTimeout(unFlipCard, 1000, clickedOn);//clickedOn is passed into the unflipcard function
      /*clear the timer but not before the unflip function has ran...
      so need to pass in the variable to the unflip function?? how do
      i do this? unflip needs access to this variable to create variable
      outside of both functions??*/
    }else{
      clickedOn.length = 0; //clear clickedOn if colors are the same
    };
  };// can clickedOn ever be greater than 2?
};

/** Flip a card face-up. */
function flipCard(card) {
  let colorOfClicked = card.classList[0];//the first class value on all the cards is a color, accessing this color
  card.style["background-color"] = colorOfClicked;//dynamically adding the background color
};

/** Flip a card face-down. */
function unFlipCard(twoCards) {
  twoCards.forEach(card => card.style["background-color"] = "");// how to put it back to original color?? not reset it...
  clearTimeout(delayFlip);// clear timeout here? make sure the cards change back before timer is cleared...
  clickedOn.length = 0;//clear clickedOn array so next guess can happen--> this clear should happen no matter if the cards match or not so the next match can happen between the next two cards
};

function hideStart(start){
  let parentOfStart = document.querySelector("body");
  parentOfStart.remove(start);
}
