function getInput() {
  const number = +prompt('Predict a number between 1 to 10 " ');

  return number;
}

function printMessage(randomNumber, result) {
  if (result === true){
    const message = '--Number is ' + randomNumber + '--';
    console.log('--congratulations-- 🎉\n ' + message);
    return;
  }
  console.log('--You Failed-- 💩\n--Try again--');
}

function printClue(number, userNumber, chance) {
  if (chance === 3) {
    if(number < userNumber) {
      console.log ('Clue : Number less than ' + userNumber);
      return;
    }

    console.log ('Clue : Number greater than ' + userNumber);
  }

  if (chance === 2) {
    if (number % 2 === 0) {
      console.log('Clue : Number is Even');
      return;
    }

    console.log('Clue : Number is Odd');
  }

  return;
}

function game(randomNumber, chance) {
  if (chance < 1) {
    return;
  }

  console.log('You have ' + chance + ' chances!');

  const number = getInput();
  const result = number === randomNumber;

  printMessage(randomNumber, result);
  if (result) {
    return;
  }
  printClue(randomNumber, number, chance);

  return game(randomNumber, chance - 1);
}

function gameInterface() {
  console.log('--- Welcome To Predict Game ---');
  let playAgain = confirm('You want to predict number : ');
  while (playAgain) {
    const number = Math.round(Math.random() * 10);
    game(number, 3);
    playAgain = confirm('\n\nYou want to predict number again : ');
  }
  console.log('--- 👋 ---');
}

gameInterface();
