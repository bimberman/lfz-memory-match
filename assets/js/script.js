/*            Global Variable declaration            */
//Game space
var cardContainerEle = document.getElementById("gameCards");
var cards = [];
var cardsFront = [];
var cardsBack = [];

// Card matching mechanics
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;

// The modal which will inform the user they have won
var winModalEle = document.getElementById("win-modal");
var attempts = 0;
var gamesPlayed = 0;

// Stats column elements
var gamesPlayedEle = document.getElementById("games-played");
var attemptsEle = document.getElementById("attempts");
var accuracyEle = document.getElementById("accuracy");

// Game reset mechanics
var resetButtonEle = document.getElementById("reset-button");

/*            function calls            */
createCards();
addCards();

/*            Event Listeners            */
// Event listener for a click on a card
cardContainerEle.addEventListener("click", handleClick);
//Event listener to reset the game
resetButtonEle.addEventListener("click", resetGame);

/*            Functions            */
// Handles the click on the cards
function handleClick(event){
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }

  event.target.classList.add("hidden");

  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.classList.value;
  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.classList.value;
    cardContainerEle.removeEventListener("click", handleClick);

    if (firstCardClasses === secondCardClasses) {
      cardContainerEle.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      displayStats();
      if(matches===maxMatches){
        winModalEle.classList.remove("hidden");
      }
    } else {
      setTimeout(unhide, 1500);
    }
  }
}

function unhide(){
  firstCardClicked.classList.remove("hidden");
  secondCardClicked.classList.remove("hidden");
  cardContainerEle.addEventListener("click", handleClick);
  firstCardClicked = null;
  secondCardClicked = null;
  attempts++;
  displayStats();
}

function displayStats(){
  gamesPlayedEle.textContent = gamesPlayed;
  attemptsEle.textContent = attempts;
  accuracyEle.textContent = calculateAccuracy(matches, attempts);
}

function calculateAccuracy(matches, attempts){
  if(!attempts){
    return "0%";
  }
  return `${Math.floor((matches / attempts) * 100)}%`;
}

function resetGame(){
  gamesPlayed++;
  matches = 0;
  attempts = 0;
  displayStats();
  resetCards();
  winModalEle.classList.add("hidden");
}

function resetCards(){
  let cardBacks = cardContainerEle.getElementsByClassName("card-back");
  for (let cardBacksIndex = 0; cardBacksIndex < cardBacks.length; cardBacksIndex++){
    cardBacks[cardBacksIndex].classList.remove("hidden");
  }
}

function shuffleCards(){
  let currentIndex = cards.length;
  let tempValue;
  let randomIndex;

  while (cardContainerEle.firstElementChild) {
    if (cardContainerEle.lastElementChild.id==="win-modal"){
      break;
    }
      cardContainerEle.removeChild(cardContainerEle.lastChild);
  }

  while(0!==currentIndex){
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex--;

    tempValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = tempValue;
  }
  addCards();
}

function addCards(){
  if(!cards){
    console.log("No cards in the collection");
    return "No cards in the collection";
  }

  for (let cardIndex = 0; cardIndex < 18; cardIndex++) {
    cardContainerEle.append(cards[cardIndex]);
  }
}

function createCards(){
  if(cards || cardsFront || cardBacks){
    cards = [];
    cardsFront = [];
    cardsBack = [];
  }

  for(let cardIndex = 0; cardIndex<18 ; cardIndex++){
    cards.push(document.createElement("div"));
    cardsFront.push(document.createElement("div"));
    cardsBack.push(document.createElement("div"));

    cards[cardIndex].classList.add("card", "col-2");
    cards[cardIndex].setAttribute("id", `card${cardIndex}`)

    cardsFront[cardIndex].classList.add("card-front");
    cardsFront[cardIndex].setAttribute("id", `card-front${cardIndex}`);

    switch(cardIndex){
      case 0: case 9: cardsFront[cardIndex].classList.add("css-logo"); break;
      case 1: case 10: cardsFront[cardIndex].classList.add("docker-logo"); break;
      case 2: case 11: cardsFront[cardIndex].classList.add("github-logo"); break;
      case 3: case 12: cardsFront[cardIndex].classList.add("html-logo"); break;
      case 4: case 13: cardsFront[cardIndex].classList.add("js-logo"); break;
      case 5: case 14: cardsFront[cardIndex].classList.add("mysql-logo"); break;
      case 6: case 15: cardsFront[cardIndex].classList.add("node-logo"); break;
      case 7: case 16: cardsFront[cardIndex].classList.add("php-logo"); break;
      case 8: case 17: cardsFront[cardIndex].classList.add("react-logo"); break;
      default: break;
    }

    cardsBack[cardIndex].classList.add("card-back");
    cardsBack[cardIndex].setAttribute("id", `card-back${cardIndex}`);

    cards[cardIndex].appendChild(cardsFront[cardIndex]);
    cards[cardIndex].appendChild(cardsBack[cardIndex]);
  }
}
