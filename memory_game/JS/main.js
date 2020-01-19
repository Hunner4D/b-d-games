console.log("Up and running!");

let cards = ["queen", "queen", "king", "king"];
let cardsInPlay =[];

function checkForMatch() {
	if (cardsInPlay[0] === cardsInPlay[1] && cardsInPlay.length === 2) {
  		console.log("You found a match!");
	} else if (cardsInPlay[0] !== cardsInPlay[1] && cardsInPlay.length === 2) {
  		console.log("Sorry, try again.");
	}
	else {
		console.log("Pick a card.")
	}
}

function flipCard(cardId) {
	checkForMatch();

	console.log(cards[cardId] + " was flipped over.");
	cardsInPlay.push(cards[cardId]);
}

flipCard(0);
flipCard(1);
checkForMatch();

