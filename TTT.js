//import
const keypress = require('keypress')
const {compose} = require('ramda')
//global variables
var grid = newGrid()
var userInput = []
var isX = true
keypress(process.stdin);
//grid = [['X',"O","X"],['O','O','X'],['X','X','O']]
//functions
//win logic (bad and hardcoded - try to use reduce and adding rules)
function winCheck(inGrid){
  //row check
  if(inGrid[0][0]===inGrid[0][1]&&inGrid[0][1]===inGrid[0][2]&&inGrid[0][0]!==" "){
    return inGrid[0][0]
  }
  else if(inGrid[1][0]===inGrid[1][1]&&inGrid[1][1]===inGrid[1][2]&&inGrid[1][0]!==" "){
    return inGrid[1][0]
  }
  else if(inGrid[2][0]===inGrid[2][1]&&inGrid[2][1]===inGrid[2][2]&&inGrid[2][0]!==" "){
    return inGrid[2][0]
  } //col check
  else if(inGrid[0][0]===inGrid[1][0]&&inGrid[1][0]===inGrid[2][0]&&inGrid[0][0]!==" "){
    return inGrid[0][0]
  }
  else if(inGrid[0][1]===inGrid[1][1]&&inGrid[1][1]===inGrid[2][1]&&inGrid[0][1]!==" "){
    return inGrid[0][1]
  }
  else if(inGrid[0][2]===inGrid[1][2]&&inGrid[1][2]===inGrid[2][2]&&inGrid[0][2]!==" "){
    return inGrid[0][2]
  } //check diag
  else if(inGrid[0][0]===inGrid[1][1]&&inGrid[1][1]===inGrid[2][2]&&inGrid[0][0]!==" "){
    return inGrid[0][0]
  }
  else if(inGrid[0][3]===inGrid[1][1]&&inGrid[1][1]===inGrid[2][0]&&inGrid[0][3]!==" "){
    return inGrid[0][3]
  }
  else {
    return -1
  }
}
function getCol(arr, col){
  var column = []
    for(var i=0; i<arr.length; i++){
      column.push(matrix[i][col])
    }
  return column
}
function isGridFull(inGrid){
  return !(inGrid[0].includes(" ")||inGrid[1].includes(" ")||inGrid[2].includes(" "))
}
//print output/formatting functions
function printTTT(inGrid, isX){
  console.log(`enter 'q' to leave at any time \n`)
  console.log(inGrid[0].join('|')),
  console.log(line()),
  console.log(inGrid[1].join('|')),
  console.log(line()),
  console.log(inGrid[2].join('|'))
  console.log(`\nIt is ${isX ? "X" : "O"}'s turn, where do you want to go? (ex. "0 0")\n`)
}
function newGrid(){
  return [[" "," "," "],[" "," "," "],[" "," "," "]]
}
function line(){
  return "-----"
}
//sanitize and placement
function isValidInput(inCh){
  return Number.isInteger(parseInt(inCh)) ? (parseInt(inCh)>=0&&parseInt(inCh)<3 ? true : false) : false
}
function placePiece(row,col,isX,grid){
  isX ? grid[row][col]="X" : grid[row][col]="O"
  return grid
}
function inputResponse(userInput){
  //make sure imput is valid
  if(isValidInput(userInput[0])&&isValidInput(userInput[2])){
    if(grid[userInput[0]][userInput[2]] !== " ")
      console.log("that place is already claimed")
    else{
      grid = placePiece(userInput[0],userInput[2],isX,grid)
      isX = !isX
      printTTT(grid,isX)
    }
  }
  else
    console.log("Input was invalid, make sure to give row then col less than 2 (ex. 0 0)")
}
//keypress and gameplay
console.log("\nlets play a nice game of tic-tac-toe!")
printTTT(grid,isX)
process.stdin.on('keypress', function (ch, key) {
  userInput.push(ch)
  //exit game
  if (key &&  key.name === 'q'){
    process.stdin.pause();
  }
  // "/r -> /n" indicate that the user has finished input then do a cycle
  if(ch === "\n"){
    inputResponse(userInput)
    if(winCheck(grid) !== -1){
      console.log(`${winCheck(grid)} is the winner!\n\n`)
      console.log("Let's play again!\n")
      grid = newGrid()
      printTTT(grid, isX)
      //todo add play again logic
    }
    else if(isGridFull(grid)){
      console.log("It's a tie!\n\n")
      console.log("Let's play again!\n")
      grid = newGrid()
      printTTT(grid, isX)
    }
    userInput = []
  }
})
