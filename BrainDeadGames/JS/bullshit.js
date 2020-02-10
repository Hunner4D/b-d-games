//bullshit card game

let cardDeck = ["card-deck-css/images/hearts/hearts-A.svg", "card-deck-css/images/hearts/hearts-1.svg", "card-deck-css/images/hearts/hearts-2.svg",
"card-deck-css/images/hearts/hearts-3.svg", "card-deck-css/images/hearts/hearts-4.svg", "card-deck-css/images/hearts/hearts-5.svg", 
"card-deck-css/images/hearts/hearts-6.svg", "card-deck-css/images/hearts/hearts-7.svg", "card-deck-css/images/hearts/hearts-8.svg", 
"card-deck-css/images/hearts/hearts-9.svg", "card-deck-css/images/hearts/hearts-10.svg", "card-deck-css/images/hearts/hearts-J.svg", 
"card-deck-css/images/hearts/hearts-Q.svg", "card-deck-css/images/hearts/hearts-K.svg"];

let playerOneHand = [];
let playerTwoHand = [];
let playerThreeHand = [];
let playerFourHand = [];
let shuffledDeck = [];


//THREAD STARTS HERE
dealPlayers();

function dealPlayers() {

    playerOneHand = [];
    playerTwoHand = [];
    playerThreeHand = [];
    playerFourHand = [];
    shuffledDeck = [];

    while (shuffledDeck.length < 52) {
        let randomCard = Math.floor((Math.random() * 52) + 1);
        if (!shuffledDeck.includes(randomCard)) {
            shuffledDeck.push(randomCard);
        }
    }
    console.log("remaining deck " + shuffledDeck);


    while (playerOneHand.length < 13) {
        playerOneHand.push(shuffledDeck.shift());
    }
    console.log("player one hand " + playerOneHand);
    console.log("remaining deck " + shuffledDeck);

    while (playerTwoHand.length < 13) {
        playerTwoHand.push(shuffledDeck.shift());
    }
    console.log("player two hand " + playerTwoHand);
    console.log("remaining deck " + shuffledDeck);

    while (playerThreeHand.length < 13) {
        playerThreeHand.push(shuffledDeck.shift());
    }
    console.log("player three hand " + playerThreeHand);
    console.log("remaining deck " + shuffledDeck);

    while (playerFourHand.length < 13) {
        playerFourHand.push(shuffledDeck.shift());
    }
    console.log("player four hand " + playerFourHand);
    console.log("remaining deck " + shuffledDeck);

    startGame()
}



function startGame() {
    let cardInPlay = document.createElement('img');
    cardInPlay.setAttribute('src', cardDeck[0]);
    // cardInPlay.setAttribute('background-color', 'white');
    document.getElementById('card-in-play').appendChild(cardInPlay);

}