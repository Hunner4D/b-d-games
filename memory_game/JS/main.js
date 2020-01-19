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
	if (cardsInPlay[0] === cardsInPlay[1] && cardsInPlay.length === 2) {
  		console.log("You found a match!");
	} else if (cardsInPlay[0] !== cardsInPlay[1] && cardsInPlay.length === 2) {
  		console.log("No match, try again.");
	}
	else {
		console.log("Pick a card.")
	}
}

function flipCard(cardId) {
	checkForMatch();

	cardsInPlay.push(cards[cardId].rank);
	console.log(cards[cardId].rank + " of " + cards[cardId].suit + " was chosen.----");
	console.log(cards[cardId].cardImage);
}

flipCard(0);
flipCard(1);
checkForMatch();