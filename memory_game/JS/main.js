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

function checkForMatch() {
	console.log(cardsInPlay);
	//this.setAttribute('src', cards[cardId].cardImage);

	if (cardsInPlay[0] === cardsInPlay[1] && cardsInPlay.length === 2) {
  		alert("You found a match!");
  		score.won += 1;
  		console.log(score);
  		scoreBoard();
	} else if (cardsInPlay[0] !== cardsInPlay[1] && cardsInPlay.length === 2) {
  		alert("No match, try again.");
  		score.lost += 1;
  		console.log(score);
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

function createBoard() {
	clearImages();

	for (let i = 0; i < cards.length; i++) {
		let cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById("game-board").appendChild(cardElement);
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
	resetButton.innerHTML = 'Reset Button';
	document.getElementById("game-board").appendChild(resetButton);
	resetButton.addEventListener('click', createBoard);
}

createBoard();


