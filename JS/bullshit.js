//bullshit card game

let cardDeck = ["card-deck-css/images/hearts/hearts-A.svg", "card-deck-css/images/hearts/hearts-r02.svg",
    "card-deck-css/images/hearts/hearts-r03.svg", "card-deck-css/images/hearts/hearts-r04.svg", "card-deck-css/images/hearts/hearts-r05.svg",
    "card-deck-css/images/hearts/hearts-r06.svg", "card-deck-css/images/hearts/hearts-r07.svg", "card-deck-css/images/hearts/hearts-r08.svg",
    "card-deck-css/images/hearts/hearts-r09.svg", "card-deck-css/images/hearts/hearts-r10.svg", "card-deck-css/images/hearts/hearts-J.svg",
    "card-deck-css/images/hearts/hearts-Q.svg", "card-deck-css/images/hearts/hearts-K.svg"];

let shuffledDeck = [];
let cardsInPlay = [];
let submittedCards = [];
let playerText = document.getElementById('player-text');
let playerHand = document.getElementById('player-hand');
let startingAce;
let turn = 0;
let round = 0; 
let clickCount = 0;
let cardRank = 0;

let playerSubmitting;
let bullshitMeter = 0;
let truthButton = document.createElement('button');
let falseButton = document.createElement('button');
let nextRoundButton = document.createElement('button');
let readyButton;
let cardStageOne;
let submitButton;

truthButton.innerHTML = 'Truth';
falseButton.innerHTML = 'Bullshit';
nextRoundButton.innerHTML = 'Click For Next Round';

let playerOne = {
    number: "One",
    hand: []
}

let playerTwo = {
    number: "Two",
    hand: []
}

let playerThree = {
    number: "Three",
    hand: []
}

let playerFour = {
    number: "Four",
    hand: []
}

function trackTurn() {
    clickCount = (clickCount + 1)
    if(clickCount % 4 == 0){
        turn = (((turn + 1 ) % 4) + 1) % 4;
      } else {
        turn = ((turn + 1 ) % 4);
      }
}

function trackCard() {
    clickCount = (clickCount + 1)
    if(clickCount % 13 == 0){
        cardRank = (((cardRank + 1 ) % 13) + 1) % 13;
      } else {
        cardRank = ((cardRank + 1 ) % 13);
      }
}

function clearPlayerHand() {
    if (document.getElementById("player-hand").hasChildNodes()) {
        var resetScene = document.getElementById("player-hand");

        while (resetScene.hasChildNodes()) {
            resetScene.removeChild(resetScene.firstChild);
        }
    }
}
function clearCardsInPlay() {
    if (document.getElementById("card-in-play").hasChildNodes()) {
        var resetScene = document.getElementById("card-in-play");

        while (resetScene.hasChildNodes()) {
            resetScene.removeChild(resetScene.firstChild);
        }
    }
}

function clearButtons() {
    console.log("clearing...")
    // readyButton.removeEventListener('click', function() {translateNumToCard(returnCurrentPlayer())} );
    truthButton.removeEventListener('click', firstPlayerDecision)
    truthButton.removeEventListener('click', secondPlayerDecision)
    truthButton.removeEventListener('click', thirdPlayerDecision) 
    truthButton.removeEventListener('click', function() {
        // trackTurn()
        // trackCard()
        readyPlayer(returnCurrentPlayer())
    });
    falseButton.removeEventListener('click', checkForBullshit)
    nextRoundButton.removeEventListener('click', function() {readyPlayer(returnCurrentPlayer())} );
    // cardStageOne.removeEventListener('click', readySubmitCards);
    // submitButton.removeEventListener('click', submitCards);

    if (document.getElementById("buttons").hasChildNodes()) {
        var resetScene = document.getElementById("buttons");

        while (resetScene.hasChildNodes()) {
            resetScene.removeChild(resetScene.firstChild);
        }
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------------

shuffleDeckFxn();

function shuffleDeckFxn() {
    playerOne.hand = [];
    playerTwo.hand = [];
    playerThree.hand = [];
    playerFour.hand = [];
    shuffledDeck = [];
    cardsInPlay = [];
    submittedCards = [];
    while (shuffledDeck.length < 52) {
        let randomCard = Math.floor((Math.random() * 52) + 1);
        if (!shuffledDeck.includes(randomCard)) {
            shuffledDeck.push(randomCard);
        }
    }
    console.log("Shuffled  deck " + shuffledDeck);
    dealPlayers(playerOne)
    dealPlayers(playerTwo)
    dealPlayers(playerThree)
    dealPlayers(playerFour)
    startButton()
}

function dealPlayers(player) {
    while (player.hand.length < 13) {
        player.hand.push(shuffledDeck.shift());
    }
    console.log("Player " + player.number + " hand: " + player.hand);
    console.log("remaining deck: " + shuffledDeck);
}

function startButton() {
    let startButt = document.createElement('button');
    startButt.setAttribute('id', 'start-button');
    startButt.innerHTML = 'Start the Lies!';
    document.getElementById('buttons').appendChild(startButt);
    startButt.addEventListener('click', startGame);
}

function startGame() {
    clearButtons()
    cardsInPlay.push(0);
    document.getElementById('cards-in-play-text').innerHTML = `Cards in play: ${cardsInPlay.length}`;
    startingAce = document.createElement('img');
    startingAce.setAttribute('src', cardDeck[0]);
    console.log("cards in play: " + cardsInPlay);
    document.getElementById('card-in-play').appendChild(startingAce);
    readyPlayer()
}

function readyPlayer() {
    submittedCards = [];
    clearButtons()
    playerText.innerHTML = `Player ${returnCurrentPlayer().number}`;
    readyButton = document.createElement('button');
    readyButton.innerHTML = `Ready Player ${returnCurrentPlayer().number}?`;
    document.getElementById("buttons").appendChild(readyButton);

    playerSubmitting = "";
    playerSubmitting = returnCurrentPlayer().number;
    
    for (let i = 0; i < returnCurrentPlayer().hand.length; i++) {
        let cardBlankOne = document.createElement('img');
        cardBlankOne.setAttribute('src', 'card-deck-css/images/backs/red.svg');
        document.getElementById("player-hand").appendChild(cardBlankOne);
    }
    readyButton.addEventListener('click', function() {translateNumToCard(returnCurrentPlayer())} );
}

function displayTargetCard(idx) {
    cardStageOne = document.createElement('img');
    // cardStageOne.removeEventListener('click', readySubmitCards);
    cardStageOne.setAttribute('src', cardDeck[idx]);
    cardStageOne.setAttribute('data-id', idx);
    document.getElementById("player-hand").appendChild(cardStageOne);
    cardStageOne.addEventListener('click', readySubmitCards);
}

function translateNumToCard(player) {
    console.log('turn is now: ' + turn)
    clearPlayerHand()
    clearButtons()
    for (let i = 0; i < player.hand.length; i++) {
        if (player.hand[i] === 1 || player.hand[i] === 14 || player.hand[i] === 27 || player.hand[i] === 40) {
            displayTargetCard(0);
        }
        else if (player.hand[i] === 2 || player.hand[i] === 15 || player.hand[i] === 28 || player.hand[i] === 41) {
            displayTargetCard(1)
        }
        else if (player.hand[i] === 3 || player.hand[i] === 16 || player.hand[i] === 29 || player.hand[i] === 42) {
            displayTargetCard(2)
        }
        else if (player.hand[i] === 4 || player.hand[i] === 17 || player.hand[i] === 30 || player.hand[i] === 43) {
            displayTargetCard(3)
        }
        else if (player.hand[i] === 5 || player.hand[i] === 18 || player.hand[i] === 31 || player.hand[i] === 44) {
            displayTargetCard(4)
        }
        else if (player.hand[i] === 6 || player.hand[i] === 19 || player.hand[i] === 32 || player.hand[i] === 45) {
            displayTargetCard(5)
        }
        else if (player.hand[i] === 7 || player.hand[i] === 20 || player.hand[i] === 33 || player.hand[i] === 46) {
            displayTargetCard(6)
        }
        else if (player.hand[i] === 8 || player.hand[i] === 21 || player.hand[i] === 34 || player.hand[i] === 47) {
            displayTargetCard(7)
        }
        else if (player.hand[i] === 9 || player.hand[i] === 22 || player.hand[i] === 35 || player.hand[i] === 48) {
            displayTargetCard(8)
        }
        else if (player.hand[i] === 10 || player.hand[i] === 23 || player.hand[i] === 36 || player.hand[i] === 49) {
            displayTargetCard(9)
        }
        else if (player.hand[i] === 11 || player.hand[i] === 24 || player.hand[i] === 37 || player.hand[i] === 50) {
            displayTargetCard(10)
        }
        else if (player.hand[i] === 12 || player.hand[i] === 25 || player.hand[i] === 38 || player.hand[i] === 51) {
            displayTargetCard(11)
        }
        else if (player.hand[i] === 13 || player.hand[i] === 26 || player.hand[i] === 39 || player.hand[i] === 52) {
            displayTargetCard(12)
        }
    }
    submitButton = document.createElement('button');
    submitButton.innerHTML = 'Submit Cards';
    submitButton.setAttribute('id', 'submit-button');
    document.getElementById("buttons").appendChild(submitButton);
}

function readySubmitCards() {
    if (submittedCards.length >= 4) return
    if (this.getAttribute('src') === 'card-deck-css/images/backs/red.svg') return
    this.setAttribute('src', 'card-deck-css/images/backs/red.svg');
    submittedCards.push(parseInt(this.getAttribute('data-id')));
    submitButton.addEventListener('click', submitCards);
    console.log("cards submitted: " + submittedCards);
}

function submitCards() {
    trackTurn()
    submittedCards.forEach(element => cardsInPlay.push(element));
    console.log("cards in play: " + cardsInPlay)
    startingAce.setAttribute('src', 'card-deck-css/images/backs/red.svg');
    document.getElementById('cards-in-play-text').innerHTML = `Cards In Play: ${cardsInPlay.length}`;
    clearPlayerHand()
    
    firstPlayerDecision()
}

function firstPlayerDecision() {   
    clearButtons()
    // trackTurn() 
    playerText.innerHTML = `Pass controls to Player ${returnCurrentPlayer().number}<br>Player ${returnCurrentPlayer().number}... Truth? Or BS?`;
    document.getElementById("buttons").appendChild(truthButton);
    document.getElementById("buttons").appendChild(falseButton);
    truthButton.addEventListener('click', secondPlayerDecision) //
    falseButton.addEventListener('click', checkForBullshit)
    console.log('turn is now: ' + turn)
    console.log('card rank is: ' + cardRank)
}

function secondPlayerDecision() {
    clearButtons()
    trackTurn()
    playerText.innerHTML = `Pass controls to Player ${returnCurrentPlayer().number}<br>Player ${returnCurrentPlayer().number}... Truth? Or BS?`;
    document.getElementById("buttons").appendChild(truthButton);
    document.getElementById("buttons").appendChild(falseButton);
    truthButton.addEventListener('click', thirdPlayerDecision) //
    falseButton.addEventListener('click', checkForBullshit)
    console.log('turn is now: ' + turn)
    console.log('card rank is: ' + cardRank)
}

function thirdPlayerDecision() {
    clearButtons()
    trackTurn()
    playerText.innerHTML = `Pass controls to Player ${returnCurrentPlayer().number}<br>Player ${returnCurrentPlayer().number}... Truth? Or BS?`;
    document.getElementById("buttons").appendChild(truthButton);
    document.getElementById("buttons").appendChild(falseButton);
    truthButton.addEventListener('click', function() {
        trackTurn()
        trackCard()
        readyPlayer(returnCurrentPlayer())
    }); //
    falseButton.addEventListener('click', checkForBullshit)
    console.log('turn is now: ' + turn)
    console.log('card rank is: ' + cardRank)
}

function returnCurrentPlayer() {
    if (turn === 0) {
        return playerOne
    }
    else if (turn === 1) {
        return playerTwo
    }
    else if (turn === 2) {
        return playerThree
    }
    else if (turn === 3) {
        return playerFour
    }
}

function returnSubmittingPlayer() {
    if (playerSubmitting === "One") {
        return playerOne
    }
    else if (playerSubmitting === "Two") {
        return playerTwo
    }
    else if (playerSubmitting === "Three") {
        return playerThree
    }
    else if (playerSubmitting === "Four") {
        return playerFour
    }
}

function checkForBullshit() {
    submittedCards.forEach(element => {
        if (element !== cardRank + 1) {
            bullshitMeter += 1;
        }
    });
    if (bullshitMeter !== 0) {
        console.log("bullshit boiiiii")
        clearButtons()
        clearCardsInPlay()
        // trackTurn()
        // trackCard()
        while (cardsInPlay.length > 0) {
            returnSubmittingPlayer().hand.push(cardsInPlay.shift());
        }
        playerText.innerHTML = `Player ${returnSubmittingPlayer().number} got caught! Player ${returnSubmittingPlayer().number} has picked up all the cards! Player ${returnSubmittingPlayer().number} now has ${returnSubmittingPlayer().hand.length} cards!`;
        document.getElementById('cards-in-play-text').innerHTML = `Cards In Play: ${cardsInPlay.length}`;
        console.log(`Player ${returnSubmittingPlayer().number}'s hand is now ${returnSubmittingPlayer().hand}`);
        nextRoundButton.addEventListener('click', function() {readyPlayer(returnCurrentPlayer())} );
        document.getElementById("buttons").appendChild(nextRoundButton);
        console.log('turn is now: ' + turn)
        cardsInPlay = [];
        submittedCards = [];
    }
    else if (bullshitMeter === 0) {
        console.log("He is safe")
        clearButtons()
        clearCardsInPlay()
        // trackTurn()
        // trackCard()
        while (cardsInPlay.length > 0) {
            returnCurrentPlayer().hand.push(cardsInPlay.shift());
        }
        playerText.innerHTML = `Player ${returnCurrentPlayer().number} was wrong to call! Player ${returnCurrentPlayer().number} has picked up all the cards! Player ${returnCurrentPlayer().number} now has ${returnCurrentPlayer().hand.length} cards!`;
        document.getElementById('cards-in-play-text').innerHTML = `Cards In Play: ${cardsInPlay.length}`;
        console.log(`Player ${returnCurrentPlayer().number}'s hand is now ${returnCurrentPlayer().hand}`);
        nextRoundButton.addEventListener('click', function() {readyPlayer(returnCurrentPlayer())} );
        document.getElementById("buttons").appendChild(nextRoundButton);
        console.log('turn is now: ' + turn)
        cardsInPlay = [];
        submittedCards = [];
    }
    // trackTurn()
}