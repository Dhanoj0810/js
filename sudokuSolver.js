const sudokuNumbers = '123456789';

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

function getInput(message) {
  const number = prompt(message);

  if (isCharPresent(sudokuNumbers, number)) {
    return +number;
  }

  console.log('Wrong input!!\nEnter again !! : ');
  return  getInput(message);
}

function showBoard(board) {
  console.log(board);
}

function getColumnIndices(index) {
  if (index === 1) {
    return space(3) + index;
  }

  return getColumnIndices(index - 1) + space(3) + index;
}

function getRow(cellValues, rowNumber) {
  let row = '┃';

  for (let columnNumber = 0; columnNumber < 9; columnNumber++){
    const separator = columnNumber % 3 === 2 ? '┃' : '|';
    const index = columnNumber + (9 * rowNumber);

    row += space(1) + cellValues[index] + space(1) + separator;
  }

  return row + '\n';
}

function makeRowUnderLine(rowNumber) {
  const isLastRow = rowNumber === 8;
  const borderLeftChar = isLastRow ? '   ┗' : '   ┣';
  const borderRightChar = isLastRow === 8 ? '┛' : '┫\n';

  return borderLeftChar + getHyphen(35) + borderRightChar;
}

function getBoard(cells) {
  // Header - column indices
  // top border - 
  // bottom border
  // Body - 7 rows
  // row - 
  // left end and right end  - 1st row, last row, rest are exactly same
  const gridHeader = space(2) + getColumnIndices(9);
  const gridTopBoader = '\n'+space(3) + '┏' + getHyphen(35) + '┓\n';
  let gridBody = '';

  for (let rowNumber = 0; rowNumber < 9; rowNumber++) {
    const rowIndex = space(1) + (rowNumber + 1) + space(1);
    const row = getRow(cells, rowNumber);
    const underLine = makeRowUnderLine(rowNumber);

    gridBody += rowIndex + row + underLine;
  }

  return gridHeader + gridTopBoader + gridBody;
}

function replaceAt(string, position, replacement) {
  let replacedString = '';

  for (let index = 0; index < 81; index++) {
    const charToAdd = index === position ? replacement : string[index];
    replacedString += charToAdd;
  }

  return replacedString;
}

function getIndexOfNumber(rowNumber, columnNumber) {
  return (9 * (rowNumber - 1)) + (columnNumber - 1);
}

function getStartIndexOfBox(number) {
  return (Math.floor(number / 27) * 27) + ((Math.floor(number / 3) % 3) * 3);
}

function getRowNumber(index) {
  return Math.floor(index / 9);
}

function getColumnNumber(index) {
  return index % 9;
}

function isPresentInColumn(cellValues, columnNumber, number) {
  const endIndex = (9  * 8) + columnNumber;
  
  for (let index = columnNumber; index <= endIndex; index += 9) {
    if (+cellValues[index] === number) {
      return true;
    }
  }
  
  return false;
}

function isPresentInRow(cellValues, rowNumber, number) {
  const endIndex = 9  * (rowNumber + 1);
  
  for (let index = 9 * rowNumber; index < endIndex; index++) {
    if (+cellValues[index] === number) {
      return true;
    }
  }
  
  return false;
}

function isPresentInBox(cellValues, number, position) {
  let startIndex = getStartIndexOfBox(position);
  let index = startIndex + 20;

  for(let boxRowStartIndex = startIndex; boxRowStartIndex < index; boxRowStartIndex +=9) {
    for (let index = boxRowStartIndex; index < boxRowStartIndex + 3; index++) {
      if (+cellValues[index] === number) {
        return true;
      }
    }
  }
  
  // for (let i = 0; i < 9; i++) {
  //   if (+cellValues[index] === number) {
  //     return true;
  //   }
    
  //   index++;
    
  //   if (index === startIndex + 3) {
  //     index = index + 6;
  //     startIndex = index;
  //   }
  // }
  
  return false;
}

function isNewNumber(cellValues, number, position) {
  const rowNumber = getRowNumber(position);
  if (isPresentInRow(cellValues, rowNumber, number)) {
    return false;
  }
  
  const columnNumber = getColumnNumber(position);

  if (isPresentInColumn(cellValues, columnNumber, number)) {
    return false;
  }
  
  return !isPresentInBox(cellValues, number, position);
}

function getUserBoard(cellValues) {
  let currentCellValues = cellValues;
  const wantToSolve = confirm('You Want To Solve this sudoku : ')
  if (wantToSolve) {
    return currentCellValues;
  }

  // Reorder - first - the position, then the number
  const rPosition = getInput('Enter row position : ');
  const cPosition = getInput('Enter column position : ');
  const number = getInput('Enter the number : ');
  const index = getIndexOfNumber(rPosition, cPosition);
  
  console.clear();
  currentCellValues = replaceAt(currentCellValues, index, number);
  showBoard(getBoard(currentCellValues));
  
  return getUserBoard(currentCellValues);
}

function getNewNumber(cellValues, position) {
  for (let itteration = 0; itteration < 30; itteration++) {
    const number = getRandomNumber();
    const isNumberNew = isNewNumber(cellValues, number, position);
    
    if (isNumberNew) {
      return number;
    }
  }

  return 0;
}

// is it inputNumbers ? - current state of the board
function solveSudoku(cellValues, index) {
  let currentCellValues = cellValues;

  if(index > 80) {
    return currentCellValues;
  }

  if (currentCellValues[index] === ' ') {
    
    const number = getNewNumber(currentCellValues, index);

    currentCellValues = replaceAt(currentCellValues, index, number);
  }
  
  // updating row and column - write a fn 
  // if (column + 1 > 8) {
  //   row = row + 1;
  //   column = -1;
  // }
  
  return solveSudoku(currentCellValues, index + 1);
}

function sudokuSolver() {
  const emptyCells = space(81);

  showBoard(getBoard(emptyCells));
  
  const currentCellValues = getUserBoard(emptyCells);
  let isSolved = false;
  let solvedCellValues = '';

  while (!isSolved) {
    solvedCellValues = solveSudoku(currentCellValues, 0);
    isSolved = !isCharPresent(solvedCellValues, '0');
  }

  showBoard(getBoard(solvedCellValues));
}

sudokuSolver();
