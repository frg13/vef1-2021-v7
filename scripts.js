/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

/** Global breyta sem heldur utan um fjölda leikja */
let gameAmount = 0;

/** Global strengir fyrir skilaboð í alert-gluggum */
const playerSkaeri = 'Þú valdir skæri';
const playerBlad = 'Þú valdir blað';
const playerSteinn = 'Þú valdir stein';
const computerSkaeri = 'Tölvan valdi skæri';
const computerBlad = 'Tölvan valdi blað';
const computerSteinn = 'Tölvan valdi stein';
const playerWin = 'Þú sigraðir!';
const computerWin = 'Tölvan sigraði!';

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  if ((bestOf % 2 != 0) && (bestOf < MAX_BEST_OF)) {
    return true;
  } else {
    return false;
  }
}
//console.assert(isValidBestOf(1) === true, '1 er valid best of');
//console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
//console.assert(isValidBestOf(9) === true, '9 er valid best of');

function playAsText(play) {
  if (play == '1') {
    return 'Skæri';
  } 
  else if (play == '2') {
    return 'Blað';
  } 
  else if (play == '3') {
    return 'Steinn';
  }
  else {
    return 'Óþekkt';
  }
}
//console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
//console.assert(playAsText('2') === 'Blað', '2 táknar blað');
//console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
//console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  //ef leikmaður velur skæri eða '1'
  if (player == '1' && computer == '1') {
    return 0;
  }
  else if (player == '1' && computer == '2') {
    return 1;
  }
  else if (player == '1' && computer == '3') {
    return -1;
  }

  //Ef leikmaður velur blað eða '2'
  else if (player == '2' && computer == '1') {
    return -1;
  }
  else if (player == '2' && computer == '2') {
    return 0;
  }
  else if (player == '2' && computer == '3') {
    return 1;
  }
  
  //ef leikmaður velur stein eða '3'
  else if (player == '3' && computer == '1') {
    return 1;
  }
  else if (player == '3' && computer == '2') {
    return -1;
  }
  else if (player == '3' && computer == '3') {
    return 0;
  }
}

/*
console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');
*/

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann, 2 ef spilari hættir við
 */
function round() {
  // 1. Spyrja um hvað spilað, ef cancel, hætta
  let playerChoice = prompt('Hvað velur þú? Skæri (1), blað (2) eða steinn(3)?');
  if (!playerChoice) {
    return 2;
  }

  // 2. Ef ógilt, tölva vinnur
  if ((playerChoice != '1') && (playerChoice != '2') && (playerChoice != '3')) {
    alert('Ógilt gildi! Tölvan vann þessa umferð!')
    console.log('Ógilt gildi! Tölvan vann þessa umferð');
    return -1;
  }

  // 3. Velja gildi fyrir tölvu með `Math.floor(Math.random() * 3) + 1` sem skilar heiltölu á [1, 3]
  let computerChoice = Math.floor(Math.random() * 3) + 1;  
  // 4. Nota `checkGame()` til að finna hver vann
  // 5. Birta hver vann
  // 6. Skila hver vann
  if (checkGame(playerChoice, computerChoice) == 1) {
    alert('Þú vannst!\n Þú valdir: ' + playAsText(playerChoice) + 
          '\n Tölvan valdi: ' + playAsText(computerChoice));
    console.log('Þú vannst þessa umferð!');
    return 1;
  }
  else if (checkGame(playerChoice, computerChoice) == 0) {
    alert('Jafntefli í þessari umferð!\n Þú valdir: ' + playAsText(playerChoice) + 
          '\n Tölvan valdi: ' + playAsText(computerChoice) + 
          '\n Þessi umferð verður endurtekin!');
    console.log('Jafntefli í þessari umferð!!');
    return 0;
  }
  else {
    alert('Þú tapaðir!\n Þú valdir: ' + playAsText(playerChoice) + 
    '\n Tölvan valdi: ' + playAsText(computerChoice));
    console.log('Tölvan vann þessa umferð!');
    return -1;
  }
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {
  // 1. Spyrja um fjölda leikja
  let nrOfRounds = prompt('Besta af hve mörgum leikjum?\n Verður að vera oddatala minni en 10');

  // 2. Staðfesta að fjöldi leikja sé gilt gildi
  if (isValidBestOf(nrOfRounds) == false) {
    return console.error(nrOfRounds + ' ekki gilt gildi!');
  }

  // 3. Keyra fjölda leikja og spila umferð þar til sigurvegari er krýndur
  let computerWins = 0;
  let playerWins = 0;
  let cnt = 0;

  while (cnt < nrOfRounds) {
    let thisRound = round();
    if (thisRound == 2) {
      return alert ('Hætt við leik!');
      break;
    }

    if (thisRound == -1) {
      cnt++;
      computerWins++;
    }
    else if (thisRound == 1) {
      cnt++;
      playerWins++;
    }

    if  (computerWins > (nrOfRounds / 2)) {
      losses++;
      gameAmount++;
      return alert('Tölvan sigraði viðureignina! Gangi þér betur næst!')
      //return console.log('Tölvan sigraði viðureignina!');
    }

    else if (playerWins > (nrOfRounds / 2)) {
      wins++;
      gameAmount++;
      return alert('Leikmaður sigraði viðureignina!')
      //return console.log('Leikmaður sigraði viðureignina!');
    }
  }
  // 4. Birta hvort spilari eða tölva vann
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  if (gameAmount == 0) {
    console.log('Þú hefur spilað 0 leiki.');
  } else {
    console.log('Þú hefur spilað ' + gameAmount + ' leiki.');
    console.log('Þú hefur unnið ' + wins + ', eða ' + (wins/gameAmount * 100).toFixed(2) + '% af heild.');
    console.log('Þú hefur tapað ' + losses + ', eða ' + (losses/gameAmount * 100).toFixed(2) + '% af heild.')
  }
}
// Hér getum við ekki skrifað test þar sem fallið les úr global state
