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

function checkForMatch() {
	console.log(cardsInPlay);
	//this.setAttribute('src', cards[cardId].cardImage);

	if (cardsInPlay[0] === cardsInPlay[1] && cardsInPlay.length === 2) {
  		alert("You found a match!");
  		// resetButt();
	} else if (cardsInPlay[0] !== cardsInPlay[1] && cardsInPlay.length === 2) {
  		alert("No match, try again.");
  		// resetButt();
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
	// var resetImages = document.getElementById("game-board");
	// if (resetImages.hasChildNodes()) {
	// 	while (resetImages.hasChildNodes()) {
	// 		resetImages.removeChild(list.firstChild);
	// 	}		
	// }

	for (let i = 0; i < cards.length; i++) {
		let cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById("game-board").appendChild(cardElement);
	}
}

// function resetButt() {
// 	let resetButton = document.createElement('button');
// 	resetButton.innerHTML = 'Reset Button';
// 	document.getElementById("game-board").appendChild(resetButton);
// 	resetButton.addEventListener('click', createBoard);
// }

createBoard();


