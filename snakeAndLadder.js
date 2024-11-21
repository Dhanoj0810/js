const samePosChar = '🤝';
const player1Char = '👹';
const player2Char = '😈';

function getChar(index, position1, position2) {
  if (index === position1 && index === position2) {
    return samePosChar;
  }
  if (index === position1) {
    return player1Char;
  }

  return player2Char;
}

function getGameSymbol100(number) {
  switch (number) {
    case 4 : return '🪜';
    case 12: return '🪜';
    case 14: return '🪜';
    case 22: return '🪜';
    case 28 : return '🐍';
    case 37 : return '🐍';
    case 41: return '🪜';
    case 48 : return '🐍';
    case 54: return '🪜';
    case 75 : return '🐍';
    case 94 : return '🐍';
    case 98 : return '🐍';
    default : return number;
  }
}

function getGameSymbol50(index) {
  switch (index) {
    case 5 : return '🪜';
    case 14: return '🐍';
    case 19: return '🪜';
    case 28 : return '🐍';
    case 35 : return '🪜';
    case 49: return '🐍';
    default : return '' + index;
  }
}

function getGrid(startIndex, index, position1, position2, charToPrint, gameSymbol) {
  if (index === position1 || index === position2) {
    if (index === 100) {
      return '┃ ' + charToPrint + ' ┃';
    }
    return index % 10 !== 0 ? ' ' + charToPrint + ' ┃' : '\n┃ ' + charToPrint + ' ┃';
  }

  if (index === startIndex) {
    return '┃ 🏁 ┃';
  }

  if (index === 1) {
    return ' 🚩 ┃';
  }
  
  if (index < 10) {
    if ('' + +gameSymbol === 'NaN') {
      return ' ' + gameSymbol + ' ┃';
    }

    return ' ' + 0 + index + ' ┃';
  }

  return ' ' + gameSymbol + ' ┃';
}

function getHyphen(count) {
  if (count < 1) {
    return '';
  }
  
  return '━' + getHyphen(count - 1);
}

function getBoard(size, position1, position2, player1, player2){
  let board = player1 + ' : ' + player1Char + '\n' + player2 + ' : ' + player2Char;
  let getGameSymbol = getGameSymbol100;
  let column = size;

  board += '\n┏' + getHyphen(49) + '┓\n';
  
  while(column > 0) {
    const increment = column % 2 === 0 ? -1 : 1;

    for (let row = 0; row < 10 && row > -10; row += increment) {
      const index = column + row;
      const charToPrint = getChar(index, position1, position2);
      const gameSymbol = getGameSymbol(index);
      
      board += getGrid(size, index , position1, position2, charToPrint, gameSymbol);
    }

    let borderChar1 = '┣';
    let borderChar2 = '┫\n┃';
    
    if (column === 1 || column === 10) {
      borderChar1 = '┗';
      borderChar2 = '┛';  
    }

    board += '\n' + borderChar1 + getHyphen(49) + borderChar2;
    column -= column % 2 === 0 ? 19 : 1;
  }

  return board;
}

function delay(times) { 
  for (let i = 0; i < times * 1000000; i++) {}
}

function getRandomNumber() {
  const number = Math.round(Math.random() * 10);

  if (number >= 1 && number <= 6) {
    return number;
  }

  return getRandomNumber();
}

function dice(number) {
  switch (number) {
    case 1 : return '┃⚫️ ⚫️ ⚫️┃\n┃⚫️ ⚪️ ⚫️┃\n┃⚫️ ⚫️ ⚫️┃';
    case 2 : return '┃⚪️ ⚫️ ⚫️┃\n┃⚫️ ⚫️ ⚫️┃\n┃⚫️ ⚫️ ⚪️┃';
    case 3 : return '┃⚪️ ⚫️ ⚫️┃\n┃⚫️ ⚪️ ⚫️┃\n┃⚫️ ⚫️ ⚪️┃';
    case 4 : return '┃⚪️ ⚫️ ⚪️┃\n┃⚫️ ⚫️ ⚫️┃\n┃⚪️ ⚫️ ⚪️┃';
    case 5 : return '┃⚪️ ⚫️ ⚪️┃\n┃⚫️ ⚪️ ⚫️┃\n┃⚪️ ⚫️ ⚪️┃';
    default : return '┃⚪️ ⚫️ ⚪️┃\n┃⚪️ ⚫️ ⚪️┃\n┃⚪️ ⚫️ ⚪️┃';
  }
}

function rollDiceAndGetNumber(board) {
  let number = 0;
  
  for (let itteration = 1; itteration < 400; itteration += 20) {
    console.clear();
    console.log(board);
    number = getRandomNumber();
    console.log('\n\n┏━━━━━━━━┓\n' + dice(number) + '\n┗━━━━━━━━┛');
    delay(itteration);
  }

  return number;
}

function showDiceAndBoard(board, diceNumber) {
  console.clear();
  console.log(board);
  console.log('\n\n┏'+ getHyphen(8) + '┓\n' + dice(diceNumber) + '\n┗━━━━━━━━┛');
}

function snakeAndLadderPosition100(number) {
  switch (number) {
    case 4 : return 34;
    case 12: return 30;
    case 14: return 45;
    case 22: return 48;
    case 28 : return 10;
    case 37 : return 3;
    case 41: return 69;
    case 48 : return 16;
    case 54: return 82;
    case 75 : return 32;
    case 94 : return 71;
    case 98 : return 42;
    default : return number;
  }
}

function snakeAndLadderPosition50(number) {
  switch (number) {
    case 5 : return 23;
    case 14: return 2;
    case 19: return 33;
    case 28 : return 7;
    case 35 : return 47;
    case 49: return 26;
    default : return number;
  }
}

function isNumberOne(position, number) {
  if (position !== 0) {
    return true;
  }

  if (number === 1) {
    return true;
  }

  return false;
}

function getPoint(player, position, sAndLPosition, winningPosition, board) {
  prompt('\n'+ player + '\'s move, press enter to roll the dice');
  const number = rollDiceAndGetNumber(board);

  if (!isNumberOne(position, number)) {
    console.log("To start game you need 1!!");
    return 0;
  }

  let positionToMove = sAndLPosition(position + number);

  if (position + number > winningPosition) {
    return position;
  }

  if (position + number < positionToMove) {
    console.log('You climbed a 🪜 from ' + (position + number) + ' to ' + positionToMove);
    return positionToMove;
  }

  if (position + number > positionToMove) {
    console.log('A 🐍 bit you \n You move from ' + (position + number) + ' to ' + positionToMove);
    return positionToMove;
  }

  return positionToMove;
}

function printWinner(player1, player1Position, player2, winningPosition) {
  let winner = player2;

  if (player1Position === winningPosition) {
    winner = player1;
  }

  console.log('--congratulations-- 🎉\n--- ' + winner + 'You Won ---');
}

function game() {
  console.log('\nWhich grid  you want to play :');
  const gridSize = +prompt('1. 50\n2. 100\nEnter 1 or 2 : ');
  let winningPosition = 100;
  let snakeAndLadderPosition = snakeAndLadderPosition100;

  if(gridSize === 1) {
    winningPosition = 50;
    snakeAndLadderPosition = snakeAndLadderPosition50;
  }

  const player1 = prompt('\nEnter first player name : ');
  const player2 = prompt('Enter second player name : ');
  let board = '';
  let player1Position = 0;
  let player2Position = 0;
  let isAnyOneWon = player1Position === winningPosition || player2Position === winningPosition;
  
  console.clear();
  board = getBoard(winningPosition, player1Position, player2Position, player1, player2);
  showDiceAndBoard(board, 1);
  
  while (!isAnyOneWon) {
    player1Position = getPoint(player1, player1Position, snakeAndLadderPosition, winningPosition, board);

    console.log('\n' + player1 + ' position : ' + player1Position);
    console.log(player2 + ' position : ' + player2Position);
    
    board = getBoard(winningPosition, player1Position, player2Position, player1, player2);
    delay(4000);
    showDiceAndBoard(board, 1);
    
    player2Position = getPoint(player2, player2Position, snakeAndLadderPosition, winningPosition, board);

    console.log('\n' + player1 + ' position : ' + player1Position);
    console.log(player2 + ' position : ' + player2Position);
    
    board = getBoard(winningPosition, player1Position, player2Position, player1, player2);
    delay(5000);
    showDiceAndBoard(board, 1);

    isAnyOneWon = player1Position === winningPosition || player2Position === winningPosition;
  }

  printWinner(player1, player1Position, player2, winningPosition);
}

function gameInterface() {
  console.log('---Snake And Ladder 2.0---');
  console.log('----------Welcome---------');
  let intersted = confirm('\nYou want to play 🐍 and 🪜 ❓ : ');

  while(intersted) {
    game();
    intersted = confirm('\nYou want to play 🐍 and 🪜 again ❓ : ');
  }

  console.log('\n---------ThankYou---------\n')
}

gameInterface();
