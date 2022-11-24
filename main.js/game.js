'use stirct'
const LIFE = "💗"




var gBoard = []
var gTimerInterval 
var elIcon
var elLives
var gLevel = { 
    SIZE: 0,
    MINES: 0
}
var gGame = {
    isOn: false,
    shownCount: 0,
     markedCount: 0,
      secsPassed: 0,
      lives:3,
      gameOver: false
 }

function onInit(level, mines){
    elIcon = document.querySelector('.restGame')
    // elLives= document.querySelector('.lifeCount')
    // elLives.innerText = LIFE+LIFE+LIFE
    elIcon.innerText = "😁"
    gGame.gameOver = false
    gLevel.SIZE = level
    gLevel.MINES = mines
    console.log('glevel',gLevel);
    createBoard()
    renderBoard(gBoard)
    gGame.isOn = false
    document.getElementById("minesCount").innerText = mines
    
}

function resetCurrLevel(){
   onInit(gLevel.SIZE,gLevel.MINES)
}

function createBoard() {
   var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
       var newline = []
        for (var j = 0; j < gLevel.SIZE; j++) {
        var cell = { minesAroundCount: 4, isShown: false, isMine: false, isMarked: false }
        newline.push(cell)
        } board.push(newline)
    
    }
         
    gBoard = board
   renderBoard(board)
        return board
    
}

function renderBoard() {
 
        var elBoard = document.querySelector('.board')
        var strHTML = ''
        for (var i = 0; i < gBoard.length; i++) {
            strHTML += '<tr>'
            for (var j = 0; j < gBoard[0].length; j++) {
                 var currCell = getCellImg(i,j)
          
                
                strHTML += `<td class="cell" oncontextmenu="setFlag(${i},${j},event)" onclick="cellClicked(this,${i},${j})">${currCell}`
    
            
    
                strHTML += '</td>'
            }
            strHTML += '</tr>'
        }
    
        elBoard.innerHTML = strHTML
      
        
}
function getClassName(location) {
        var cellClass = 'cell-' + location.i + '-' + location.j
        return cellClass
}    


function getRandomMines(){
        var counterMines = 0
        while(counterMines < gLevel.MINES){
            var i = getRandomInt(0,gLevel.SIZE - 1)
            var j = getRandomInt(0,gLevel.SIZE - 1)
            if(gBoard[i][j].isShown === false && gBoard[i][j].isMine === false){
                 gBoard[i][j].isMine = true
                 counterMines++
            }   
            
        }
        
}


function setMinesNegsCount(board, rowIdx, colIdx) {
var counter = 0
    for (var i = rowIdx -1 ; i <= rowIdx +1;i++) {
      if (i<0 || i >= board.length) continue
      for (var j = colIdx -1 ; j <= colIdx +1 ; j++) {
        if (i === rowIdx && j === colIdx) continue
        if (j <0|| j >= board[0].length) continue
        if(gBoard[i][j].isMine)counter++
        
      }
    }
    gBoard[rowIdx][colIdx].minesAroundCount=counter
  }

function checkMinesNegs(){
    for(var i =0;i<gBoard.length;i++){
        for(var j = 0;j<gBoard[i].length;j++){
            setMinesNegsCount(gBoard,i,j)
        }
    }
}

function cellClicked(elCell, i, j) {
    if(gBoard[i][j].isMarked===true)return
    if(gGame.gameOver === true) return

    gBoard[i][j].isShown=true
    if(!gGame.isOn){
        gGame.isOn = true
        getRandomMines()
        checkMinesNegs()    
    }

    gGame.isOn = true

    if(gBoard[i][j].isMine){
        elIcon.innerText = '🤕'
        gGame.gameOver=true
    }
    if(!gBoard[i][j].isMine){
        getCellImg(i,j)
        gameOver()
        
    }renderBoard(gBoard)
}


function getCellImg(i,j){
    var cell = gBoard[i][j]
    if(!cell.isShown&&cell.isMarked) return `<img class='cellImg' src="./imegs/flag.jpeg"/>`
    if(!cell.isShown) return `<img class="cellImg" src="./imegs/cell.jpeg"/>`
    if(cell.isShown&&cell.isMine)return `<img class="cellImg" src="./imegs/mine.jpeg"/>`
    if(cell.isShown&&cell.minesAroundCount===0)return `<img class="cellImg" src="./imegs/empty.jpeg"/>`
    if(cell.isShown&&cell.minesAroundCount===1)return `<img class="cellImg" src="./imegs/one.jpeg"/>`
    if(cell.isShown&&cell.minesAroundCount===2)return `<img class="cellImg" src="./imegs/two.jpeg"/>`
    if(cell.isShown&&cell.minesAroundCount===3)return `<img class="cellImg" src="./imegs/three.jpeg"/>`
    if(cell.isShown&&cell.minesAroundCount===4)return `<img class="cellImg" src="./imegs/four.jpeg"/>`
    

}
function setFlag(i,j,ev){
   ev.preventDefault()
   gBoard[i][j].isMarked = !gBoard[i][j].isMarked
   renderBoard()
   console.log('riught click');
    
}


function gameOver(){
    if(gGame.shownCount === gLevel.SIZE * gLevel.SIZE){
        gGame.gameOver = true
        alert('Game Over');
      }

}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

