const player1 = prompt(`Player One: enter your name. You will be red`);
let player1Color = 'rgb(237, 45, 73)';

const player2 = prompt(`Player 2: enter your name. You will be blue`);
let player2Color = 'rgb(86, 151, 255)';

let gameOn = true;
let table = $(`table tr`);


let currentPlayer = player1;
let currentName = player1;
let currentColor = player1Color;

const changeColor = function (rowIndex, colIndex, color) {
  return table
    .eq(rowIndex)
    .find(`td`)
    .eq(colIndex)
    .find(`button`)
    .css(`background-color`, color);
};

const returnColor = function (rowIndex, colIndex) {
  return table
    .eq(rowIndex)
    .find(`td`)
    .eq(colIndex)
    .find(`button`)
    .css(`background-color`);
};

const checkBottom = function (colIndex) {
  let colorReport = returnColor(5, colIndex);
  for (let row = 5; row > -1; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row;
    }
  }
};

const colorMatchCheck = function (one, two, three, four) {
  return (
    one === two &&
    one === three &&
    one === four &&
    one !== `rgb(128, 128, 128)` &&
    one !== undefined
  );
};

const horizontalWinCheck = function () {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row, col + 1),
          returnColor(row, col + 2),
          returnColor(row, col + 3)
        )
      ) {
        return true;
      } else {
        continue;
      }
    }
  }
};

const verticalWinCheck = function () {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col),
          returnColor(row + 2, col),
          returnColor(row + 3, col)
        )
      ) {
        return true;
      } else {
        continue;
      }
    }
  }
};

const diagonalWinCheck = function() {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 7; col++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row-1, col+1),
          returnColor(row-2, col+2),
          returnColor(row-3, col+3)
        )
      ) {
        return true;
      } else if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row+1, col+1),
          returnColor(row+2, col+2),
          returnColor(row+3, col+3)
        )
      ) {
        return true;

      } else {
        continue;
      }
    }
  }
}

$("h3").text(`${currentPlayer}: It's your turn, choose the column to drop your dice`);

$('.board button').on('click', function() {
  let col = $(this).closest('td').index();
  let bottomAvail = checkBottom(col);
  changeColor(bottomAvail,col,currentColor);
  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $(`h1`).text(`${currentPlayer}, You've won!!!`);
    $('h5').removeClass(`hidden`);
    $(`h3`).fadeOut(`fast`);
    $(`h2`).fadeOut(`fast`);
    $(`table`).fadeOut(`fast`);
    return;
  }
  currentPlayer = currentPlayer===player1 ? player2 : player1;
  currentColor = currentColor===player1Color ? player2Color : player1Color;
  $(`h3`).text(`${currentPlayer}: It's your turn, choose the column to drop your dice`);
})