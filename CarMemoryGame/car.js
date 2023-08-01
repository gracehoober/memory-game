"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


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
/* create cards an add event listener */
function createCards(colors) {
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

/* action on click */
let clickedOn = [];//outside of function so it does not go back to an empty arr with each click
function handleCardClick(evt) {
  //add color to card if the number of clicks is <= 2;
  let clickedCard = evt.target;
  clickedOn.push(clickedCard);

  if(clickedOn.length <= 2){// add color to cards
    let colorOfClicked = clickedCard.classList.item(0);//first class on all the cards is a color
    clickedCard.style["background-color"] = colorOfClicked;
  }else{
    let firstCard = clickedOn[0];
    let secondCard = clickedOn[1];

    if(firstCard.style["background-color"] !== secondCard.style["background-color"]){
      unFlipCard(clickedOn);
    };
    clickedOn.length = 0;
  };
};


/** Flip a card face-up. */
function flipCard(card) {
  // ... you need to write this ...
}

/** Flip a card face-down. */
function unFlipCard(arrOf2cards) {
  let timerId = setTimeout(function flipOver(){
    arrOf2cards.forEach(card => card.style["background-color"] = "")
  }, 1000);
};

/** Handle clicking on a card: this could be first-card or second-card. */
