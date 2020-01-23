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

let ranksInPlay = [];
let suitesInPlay = [];
let score = {won: 0, lost: 0};
let randomRoll = [];

function checkForMatch() {
	//this.setAttribute('src', cards[cardId].cardImage);

	if ((ranksInPlay[0] === ranksInPlay[1] && ranksInPlay.length === 2) && (suitesInPlay[0] === suitesInPlay[1] && suitesInPlay.length === 2)) {
  		showCards();
  		score.won += 1;
  		if (score.won == 30) {
  			alert("Holy shit you're good!");
  			finalScoreBoard();
  		}
  		else {
  			alert("You found a match!");
  			console.log(score);
  			scoreBoard();
  		}
  		
	} else if ((ranksInPlay[0] !== ranksInPlay[1] && ranksInPlay.length === 2) || (suitesInPlay[0] !== suitesInPlay[1] && suitesInPlay.length === 2)) {
  		showCards();
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
	if (this.getAttribute('src') == 'images/back.png') {
		let cardId = this.getAttribute('data-id');
	this.setAttribute('src', cards[cardId].cardImage);
	ranksInPlay.push(cards[cardId].rank);
	suitesInPlay.push(cards[cardId].suit);
	console.log(cards[cardId].rank + " of " + cards[cardId].suit + " was chosen.----");
	checkForMatch();
	}
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

		// causes a bug
	let zeroCard = null;
	let oneCard = null;
	let twoCard = null;
	let threeCard = null;
	for (let i = 0; i < randomRoll.length; i++) {
		if (randomRoll[i] == 0) {
			zeroCard += 1;
		}
		else if (randomRoll[i] == 1) {
			oneCard += 1;
		}
		else if (randomRoll[i] == 2) {
			twoCard += 1;
		}
		else {
			threeCard += 1;
		}
	}
	if (zeroCard == 1 && oneCard == 1 && twoCard == 1 && threeCard == 1) {
		randomRoll = [];
		createFlashBoard();
	}

	if (score.won <= 3) {
		setTimeout(createHiddenBoard, 1000);
	}
	else if (score.won <= 5) {
		setTimeout(createHiddenBoard, 900);
	}
	else if (score.won <= 7) {
		setTimeout(createHiddenBoard, 800);
	}
	else if (score.won <= 9) {
		setTimeout(createHiddenBoard, 700);
	}
	else if (score.won <= 11) {
		setTimeout(createHiddenBoard, 600);
	}
	else if (score.won <= 13) {
		setTimeout(createHiddenBoard, 500);
	}
	else if (score.won <= 15) {
		setTimeout(createHiddenBoard, 400);
	}
	else if (score.won <= 18) {
		setTimeout(createHiddenBoard, 300);
	}
	else if (score.won <= 21) {
		setTimeout(createHiddenBoard, 200);
	}
	else if (score.won <= 23) {
		setTimeout(createHiddenBoard, 100);
	}
	else if (score.won > 23) {
		setTimeout(createHiddenBoard, 50);
	}
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
	}
}

function scoreBoard() {
	clearImages();
	let showScore = document.createElement('h1');
	showScore.setAttribute('id', 'scoreboard');
	showScore.innerHTML = 'Times won: ' + score.won + '. times lost: ' + score.lost + '.';
	document.getElementById("game-board").appendChild(showScore);
	randomRoll = [];
	ranksInPlay = [];
	suitesInPlay = [];

	for (let i = 0; i < cards.length; i++) {
		let cardStageThree = document.createElement('img');
		cardStageThree.setAttribute('src', 'images/back.png');
		document.getElementById("game-board").appendChild(cardStageThree);
	}	

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
	startButton.setAttribute('id', 'startbutton');
	document.getElementById("game-board").appendChild(startButton);
	startButton.addEventListener('click', clockTimer3);
}


let clockDisplay = document.createElement('h2');

function clockTimer3() {
	setTimeout(print3, 200);
}

function print3() {
	clockDisplay.innerHTML = '3';
	document.getElementById("game-board").appendChild(clockDisplay);
	clockTimer2();
}

function clockTimer2() {
	setTimeout(print2, 1000);
}

function print2() {
	clockDisplay.innerHTML = '2';
	document.getElementById("game-board").appendChild(clockDisplay);
	clockTimer1();
}

function clockTimer1() {
	setTimeout(print1, 1000);
}

function print1() {
	clockDisplay.innerHTML = '1';
	document.getElementById("game-board").appendChild(clockDisplay);
	setTimeout(createFlashBoard, 1000);
}

function showCards() {
	for (let i = 0; i < cards.length; i++) {
		document.getElementsByTagName('img')[i].setAttribute('src', cards[randomRoll[i]].cardImage);
	}
}

function finalScoreBoard() {
	clearImages();
	let showFinalScore = document.createElement('h1');
	showFinalScore.setAttribute('id', 'scoreboard');
	showFinalScore.innerHTML = 'Game Over. You won ' + score.won + ' times. And lost ' + score.lost + ' times.';
	document.getElementById("game-board").appendChild(showFinalScore);
	randomRoll = [];
	ranksInPlay = [];
	suitesInPlay = [];
	score.won = 0;
	score.lost = 0;
	startGame();
}

startGame();


