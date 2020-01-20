console.log("Up and running!");

let cards = [ {
		rank: "Queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"},
	{
		rank: "Queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"},
	{
		rank: "King",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"},
	{
		rank: "King",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"}
	];

let cardsInPlay =[];
let score = {won: 0, lost: 0};
let randomRoll = [];

function checkForMatch() {
	console.log(cardsInPlay);
	//this.setAttribute('src', cards[cardId].cardImage);

	if (cardsInPlay[0] === cardsInPlay[1] && cardsInPlay.length === 2) {
  		alert("You found a match!");
  		score.won += 1;
  		console.log(score);
  		randomRoll = [];
  		scoreBoard();
	} else if (cardsInPlay[0] !== cardsInPlay[1] && cardsInPlay.length === 2) {
  		alert("No match, try again.");
  		score.lost += 1;
  		console.log(score);
  		randomRoll = [];
  		scoreBoard();
	}
	else {
		console.log("Pick a card.");
	}
}

function flipCard() {
	let cardId = this.getAttribute('data-id');
	console.log(cards[cardId].cardImage);
	this.setAttribute('src', cards[cardId].cardImage);

	cardsInPlay.push(cards[cardId].rank);
	console.log(cards[cardId].rank + " of " + cards[cardId].suit + " was chosen.----");
	checkForMatch();
}

function createFlashBoard() {
	clearImages();

	for (let i = 0; i < cards.length; i++) {
		let cardStageOne = document.createElement('img');
		randomRoll.push((Math.floor((Math.random() * 4) + 1) - 1));
		cardStageOne.setAttribute('src', cards[randomRoll[i]].cardImage);
		cardStageOne.setAttribute('data-id', randomRoll[i]);
		document.getElementById("game-board").appendChild(cardStageOne);
	}
	setTimeout(createHiddenBoard, 300);
}

function createHiddenBoard() {
	clearImages();

	for (let i = 0; i < cards.length; i++) {
		let cardStageTwo = document.createElement('img');
		cardStageTwo.setAttribute('src', 'images/back.png');
		cardStageTwo.setAttribute('data-id', randomRoll[i]);
		cardStageTwo.addEventListener('click', flipCard);
		document.getElementById("game-board").appendChild(cardStageTwo);
	}
}

function clearImages() {
	if (document.getElementById("game-board").hasChildNodes()) {
		var resetImages = document.getElementById("game-board");

		while (resetImages.hasChildNodes()) {
			resetImages.removeChild(resetImages.firstChild);
		}
		cardsInPlay =[];
	}
}

function scoreBoard() {
	clearImages();
	let showScore = document.createElement('h1');
	showScore.setAttribute('id', 'scoreboard');
	showScore.innerHTML = 'Times won: ' + score.won + '. times lost: ' + score.lost + '.';
	document.getElementById("game-board").appendChild(showScore);

	resetButt();
}

function resetButt() {
	let resetButton = document.createElement('button');
	resetButton.innerHTML = 'Reset Game';
	document.getElementById("game-board").appendChild(resetButton);
	resetButton.addEventListener('click', createFlashBoard);
}

function startGame() {
	let startButton = document.createElement('button');
	startButton.innerHTML = 'Start Game';
	document.getElementById("game-board").appendChild(startButton);
	startButton.addEventListener('click', createFlashBoard);
}

startGame();


