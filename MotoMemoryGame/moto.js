"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;

/*const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];*/
let inputArr =['url(https://media.evo.co.uk/image/private/s---glmcXE9--/v1604681456/evo/2020/11/996%20Porsche%20911%20GT3.jpg)', 'url(https://10619-2.s.cdn12.com/rests/original/503_457568408.jpg)', 'url(https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2955,w_2955,x_443,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_auto/13094333294_aa946ee2b3_o_qcpqn9.jpg)'];
inputArr = inputArr.concat(inputArr);


const colors = shuffle(inputArr);
//const colors = shuffle(COLORS);
const gameBoard = document.getElementById("game");
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
start.addEventListener("click", displayScore)

function hideStart(){
  start.remove();
};

/** Display Score */
let score = 0;
function displayScore(){
  let body = document.querySelector("body");
  let scoreDiv = document.createElement("div");
  scoreDiv.classList.add("score");
  // add text to this div... something with innerHTML? or text then add? createTextNode? append?
    //used https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode example to add text to this div
  scoreText(scoreDiv);
  body.insertBefore(scoreDiv, gameBoard);
}
function scoreText(textToDiv){
  const text = document.createTextNode("Number of guesses: " + score);
  textToDiv.appendChild(text);
};
function updateScore(){//textNode... like change it. what is innerHTML? okay so already created a text node... now just want to replace it with new content
  let accessScoreDiv = document.querySelector(".score");
  accessScoreDiv.innerHTML = "Number of guesses: " + score;
};

/** create cards an add event listener */
function createCards() {
  //create cards with classes and ids
  for (let i = 0; i < colors.length; i++) {
    let card = document.createElement("div");
    card.classList.add(colors[i]);
    card.setAttribute("id", "card");
    gameBoard.append(card);
  //add event listener
    card.addEventListener("click", /*(evt) => {
      evt.target.style["background-color"] = colors[i];
    }*/ handleCardClick);
  };
};


/** Handle clicking on a card: this could be first-card or second-card. */
let clickedOn = [];//outside of function so it does not go back to an empty arr with each click, way of counting how many clicks occur
let delayFlip;
function handleCardClick(evt) {
  let clickedCard = evt.target;//access div where click occurred

  if(clickedOn.length < 2){// add color to cards //this condition needs to be in it's own if statement without else if, etc. bc the cards need to change with a click consistently
      if(clickedOn.includes(clickedCard)){//prevent same card cliked on twice from counting as a match
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
    score ++;
    updateScore();
  };// can clickedOn ever be greater than 2?
};

/** Flip a card face-up. */
// function flipCard(card) {
//   let colorOfClicked = card.classList[0];//the first class value on all the cards is a color, accessing this color
//   card.style["background-color"] = colorOfClicked;//dynamically adding the background color
// };
function flipCard(card) {
  let colorOfClicked = card.classList[0];//the first class value on all the cards is a color, accessing this color
  //card.style["background-color"] = colorOfClicked;//dynamically adding the background color
  card.style["background-image"] = colorOfClicked;
};

/** Flip a card face-down. */
function unFlipCard(twoCards) {
  twoCards.forEach(card => card.style["background-image"] = "");// how to put it back to original color?? not reset it...
  clearTimeout(delayFlip);// clear timeout here? make sure the cards change back before timer is cleared...
  clickedOn.length = 0;//clear clickedOn array so next guess can happen--> this clear should happen no matter if the cards match or not so the next match can happen between the next two cards
};


