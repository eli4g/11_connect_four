/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for(var i=0; i <HEIGHT; i++){
      board.push([]);
      
      for(let j=0; j<WIDTH; j++){
        board[i].push(null);
      }

    }

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  let htmlBoard = document.querySelector('#board');


  // TODO: add comment for this code

  // Create the  'tr' and elements for the top row, where pieces will be played
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // Add the 'click' event listener for the top row
  top.addEventListener("click", handleClick);

  // A for loop to create the top row to play game pieces
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code

  // Create the rest of the game board, but creating the rows and individual cells, based on the 'WIDTH' and 'HEIGHT' variables for the board size
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);

      // Append the cell to the current row
      row.append(cell);
    }

    // Append each row to the game board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  
  let spotForCol = -1;
  board.forEach((val,i,arr) =>{
          
        
        if(arr[i][x] === null){
          
          spotForCol = i;
        }
        
       

  } )

  if( spotForCol === -1)
    { return null;
      }else { return spotForCol;}
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let newDiv = document.createElement('div');

  currCellId = `${y}-${x}`;
  

  let currCell = document.getElementById(currCellId);
  
  newDiv.className =  `piece player-${currPlayer}`;
    currCell.append(newDiv);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  board[y][x] = currPlayer;
  
  

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  let checkEndGame = board.every((val,i,arr) => {
      return val.every((val,i,arr)=>{return val != null})
  });
  if(checkEndGame){return endGame('Tie Game!!!');}

  // switch players
  // TODO: switch currPlayer 1 <-> 2

    if(currPlayer === 1){
      currPlayer = 2;
    }else{currPlayer = 1}
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.


  // A nested set of for loops, to run through each piece on the board and check if there are 4 pieces in a row, going right, up, diagnally up and right and diagnally up and left
  for (var y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // set the player value for 4 pieces to the right
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];

      // set the player pieces for the current piece and three pieces above
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];

      // set the player pieces for the current piece and three pieces diagnally to the right and up
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // set the player pieces for the current piece and three pieces diagnally to the left and up
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // Check if any of the sets of 4 cells match and are valid values, if the '_win' function returns true, then return true and declare the winner
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
