const sudokuNumbers = '123456789';

function isSubstring(string, subString) {
    for (let index = 0; index <= string.length; index++) {
      if (string[index] === subString) {
        return true;
      }
    }

  return false;
}

function getRandomNumber() {
  const number = Math.ceil(Math.random() * (10 - 1));
  return number;
}

function repeat(value, times) {
  if (times < 1) {
    return '';
  }
  
  return value + repeat(value, times - 1);
}

function isCharPresent(string, char) {
  for (let index = 0; index < string.length; index++) {
    if (string[index] === char) {
      return true;
    }
  }

  return false;
}

function space(count) {
  return repeat(' ', count);
}

function getHyphen(count) {
  return repeat('━', count);
}

function getInput(argument) {
  const number = prompt(argument);

  if (isCharPresent(sudokuNumbers, number)) {
    return +number;
  }

  console.log('Wrong input!!\nEnter again !! : ');
  return  getInput(argument);
}

function showBoard(board) {
  console.log(board);
}

function getIndexOfColumn(index) {
  if (index === 1) {
    return space(3) + index;
  }

  return getIndexOfColumn(index - 1) + space(3) + index;
}

function getBoard(string) {
  let board = space(2) +getIndexOfColumn(9);
  board += '\n'+space(3) + '┏' + getHyphen(35) + '┓\n';

  for (let rowNum = 0; rowNum < 9; rowNum++) {
    board += space(1) + (rowNum + 1) + space(1);

    for (let colNum = 0; colNum < 9; colNum++) {
      if (colNum === 8) {
        board += '┃ ' + string[colNum + (9 * rowNum)] + ' ┃';
      } else {
        board += '┃ ' + string[colNum + (9 * rowNum)] + ' ';
      }
    }

    let borderChar1 = rowNum === 8 ? '\n   ┗' : '\n   ┣';
    let borderChar2 = rowNum === 8 ? '┛' : '┫\n';

    board += borderChar1 + getHyphen(35) + borderChar2;
  }

  return board;
}

function replace(string, position, replacement) {
  let replacedString = '';

  for (let index = 0; index < 81; index++) {
    const charToAdd = string[index];
    replacedString += index === position ? replacement : charToAdd;
  }

  return replacedString;
}

function getIndexOfNumber(rPosition, cPosition) {
  return (9 * (rPosition - 1)) + (cPosition - 1);
}

function getStartIndexOfBox(number) {
  return (Math.floor(number / 27) * 27) + ((Math.floor(number / 3) % 3) * 3);
}

function isPresentInColumn(numbers, columnNumber, number) {
  const endIndex = (9  * 8) + columnNumber;
  
  for (let index = columnNumber; index <= endIndex; index += 9) {
    if (numbers[index] * 1 === number) {
      return true;
    }
  }
  
  return false;
}

function isPresentInRow(numbers, rowNumber, number) {
  const endIndex = 9  * (rowNumber + 1);
  
  for (let index = 9 * rowNumber; index < endIndex; index++) {
    if (+numbers[index] === number) {
      return true;
    }
  }
  
  return false;
}

function isPresentInBox(numbers, number, position) {
  let startIndex = getStartIndexOfBox(position);
  let index = startIndex;
  
  for (let i = 0; i < 9; i++) {
    if (+numbers[index] === number) {
      return true;
    }
    
    index++;
    
    if (index === startIndex + 3) {
      index = index + 6;
      startIndex = index;
    }
  }
  
  return false;
}

function isNewNumber(numbers, rowNumber, columnNumber, number, position) {
  if (isPresentInRow(numbers, rowNumber, number)) {
    return false;
  }
  
  if (isPresentInColumn(numbers, columnNumber, number)) {
    return false;
  }
  
  return !isPresentInBox(numbers, number, position);
}

function getUserBoard(numbersForBoard) {
  const wantToSolve = confirm('You Want To Solve this sudoku : ')
  if (wantToSolve) {
    return numbersForBoard;
  }
  
  const number = getInput('Enter the number : ');
  const rPosition = getInput('Enter row position : ');
  const cPosition = getInput('Enter column position : ');
  const index = getIndexOfNumber(rPosition, cPosition);
  
  console.clear();
  numbersForBoard = replace(numbersForBoard, index, number);
  showBoard(getBoard(numbersForBoard));
  
  return getUserBoard(numbersForBoard);
}

function getNewNumber(numbers, rowNumber, columnNumber, position) {
  for (let index = 0; index < 30; index++) {
    const number = getRandomNumber();
    
    const isNumberNew = isNewNumber(numbers,rowNumber, columnNumber, number, position);
    if (isNumberNew) {
      return number;
    }
  }

  return 0;
}

function solveSudoku(inputNumbers, row, column, index) {
  if(row > 8) {
    return inputNumbers;
  }

  if (inputNumbers[index] === ' ') {
    const number = getNewNumber(inputNumbers, row, column, index);

    inputNumbers = replace(inputNumbers, index, number);
  }
  
  if (column + 1 > 8) {
    row = row + 1;
    column = -1;
  }
  
  return solveSudoku(inputNumbers, row, column + 1, index + 1);
}

function sudokuSolver() {
  let numbersForBoard = repeat(' ', 81);

  showBoard(getBoard(numbersForBoard));
  
  numbersForBoard = getUserBoard(numbersForBoard);
  let isSolved = false;
  let solvedSudokuNumbers = '';

  while (!isSolved) {
    solvedSudokuNumbers = solveSudoku(numbersForBoard, 0, 0, 0);
    isSolved = !isSubstring(solvedSudokuNumbers, '0');
  }

  showBoard(getBoard(solvedSudokuNumbers));
}

sudokuSolver();
