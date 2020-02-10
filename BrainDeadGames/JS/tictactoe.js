/*----- constants -----*/
/*----- app's state (variables) -----*/

let board = [null, null, null, null, null, null, null, null, null];
let button1 = document.getElementById('player-one');
let button2 = document.getElementById('player-two');
let turn = 0;
let showGrid = document.getElementById('grid-a');

/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/

button1.addEventListener('click', playerOneStarts);
button2.addEventListener('click', playerTwoStarts);


function playerOneStarts() {
	turn = 0;
	turn += 1;
	button1.removeEventListener('click', playerOneStarts);
	prepEvent();
}

function playerTwoStarts() {
	turn = 0;
	turn += -1;
	button2.removeEventListener('click', playerTwoStarts);
	prepEvent();
}

function prepEvent() {
	showGrid.setAttribute('id', 'grid-b')
	showGrid.addEventListener('click', handleClick);
	clearWinner();
}

function handleClick(evt) {
	let index = evt.target.id;
	index = index.replace('box', '')

	if (turn === 1 && board[index] === null) {
		evt.target.textContent = 'X';
		board[index] = turn;
		console.log(`at index ${index}, make turn ${turn}`);
		console.log(board);
		turn *= -1;
		checkWinner();
	}
	else if (turn === -1  && board[index] === null) {
		evt.target.textContent = 'O';
		board[index] = turn;
		console.log(`at index ${index}, make turn ${turn}`);
		console.log(board);
		turn *= -1;
		checkWinner();
	}
}

function checkWinner() {
	if (board[0] !== null && board[0] === board[1] && board[0] === board[2]) {
		chickenDinner();
		setTimeout(chickenDinner, 300);
		setTimeout(chickenDinner, 600);
	}
	else if (board[3] !== null && board[3] === board[4] && board[3] === board[5]) {
		chickenDinner();
		setTimeout(chickenDinner, 300);
		setTimeout(chickenDinner, 600);
	}
	else if (board[6] !== null && board[6] === board[7] && board[6] === board[8]) {
		chickenDinner();
		setTimeout(chickenDinner, 300);
		setTimeout(chickenDinner, 600);
	}
	else if (board[0] !== null && board[0] === board[3] && board[0] === board[6]) {
		chickenDinner();
		setTimeout(chickenDinner, 300);
		setTimeout(chickenDinner, 600);
	}
	else if (board[1] !== null && board[1] === board[4] && board[1] === board[7]) {
		chickenDinner();
		setTimeout(chickenDinner, 300);
		setTimeout(chickenDinner, 600);
	}
	else if (board[2] !== null && board[2] === board[5] && board[2] === board[8]) {
		chickenDinner();
		setTimeout(chickenDinner, 300);
		setTimeout(chickenDinner, 600);
	}
	else if (board[0] !== null && board[0] === board[4] && board[0] === board[8]) {
		chickenDinner();
		setTimeout(chickenDinner, 300);
		setTimeout(chickenDinner, 600);
	}
	else if (board[2] !== null && board[2] === board[4] && board[2] === board[6]) {
		chickenDinner();
		setTimeout(chickenDinner, 300);
		setTimeout(chickenDinner, 600);
	}
	else if(board[0] !== null && board[1] !== null && board[2] !== null && board[3] !== null && board[4] !== null && board[5] !== null && board[6] !== null && board[7] !== null && board[8] !== null){
		noChicken();
		setTimeout(noChicken, 300);
		setTimeout(noChicken, 600);
	}
}

function chickenDinner() {
	showGrid.setAttribute('id', 'grid-a');
	let winner = document.createElement('h1');
	winner.textContent = 'Winner Winner Chicken Dinner';
	winner.setAttribute('id', 'winner-css');
	document.getElementById('winner-text').appendChild(winner);
	button1.addEventListener('click', playerOneStarts);
	button2.addEventListener('click', playerTwoStarts);
}

function noChicken() {
	showGrid.setAttribute('id', 'grid-a');
	let tie = document.createElement('h1');
	tie.textContent = 'Close game but no chicken!';
	tie.setAttribute('id', 'winner-css');
	document.getElementById('winner-text').appendChild(tie);
	button1.addEventListener('click', playerOneStarts);
	button2.addEventListener('click', playerTwoStarts);
}

function clearWinner() {
	if (document.getElementById("winner-text").hasChildNodes()) {
		var newGame = document.getElementById("winner-text");

		while (newGame.hasChildNodes()) {
			newGame.removeChild(newGame.firstChild);
		}
		showGrid.childNodes.forEach(e => e.textContent = '');
		board = [null, null, null, null, null, null, null, null, null];
	}
}


