// ALEX HW7
(function() {

window.addEventListener("load", loadPage);
var numRowsColumns = 4;
var emptyRow = 3;
var emptyCol = 3;

// this calls all the functions when the page is loading
function loadPage() {
    createPuzzle();
    document.getElementById("shufflebutton").onclick = shuffle;
}

// Creates the puzzle and tiles with their respective numbers and images
function createPuzzle() {
	var num = 1;
    for (var i = 0; i < numRowsColumns; i++) {
		for (var j = 0; j < numRowsColumns; j++) {
			var tile = document.createElement("div");
			tile.classList.add("puzzlepiece");
			tile.style.left = 100 * j + "px";
			tile.style.top = 100 * i + "px"; 
			tile.style.backgroundPosition = (0 - 100 * j) + "px" + " " + (0 - 100 * i) + "px";
			tile.setAttribute("id", "square" + "_" + j + "_" + i);
			tile.innerHTML = num++;
			tile.onmouseover = cellMouseOver;
			tile.onmouseout = cellMouseOut;
			tile.onclick = tileClick;
				if (i != 3 || j != 3) { 
				document.getElementById("puzzlearea").appendChild(tile);
        }
      }
    }
}

// Checks if a tile is next to the empty one and can move
function canMove(tile) { 
	var neighbors = getNeighbors();
	if (neighbors.indexOf(tile.getAttribute("id")) != -1) {
		return true;
    } else {
		return false;
    }
}

//This function highlights the selected tile on mouseover if it's moveable
function cellMouseOver() {
    if (canMove(this)) {
	  this.addClassName("movablepiece");
    }
}

//This function unhighlights the moveable, selected tile upon removal of the mouse
  function cellMouseOut() {
    if (canMove(this)) {
	  this.removeClassName("movablepiece");
    }
}

//Helper function to pass clicked tile to moveTiles
function tileClick(){
	moveTiles(this);
}

//Swaps the selected tile if it's moveable with the empty tile
  function moveTiles(tile) {
    var tempEmptyRow = emptyRow;
    var tempEmptyColumn = emptyCol;
    if (canMove(tile)) {
      emptyRow = parseInt(tile.style.left) / 100; 
      emptyCol = parseInt(tile.style.top) / 100;
      tile.style.top = 100 * tempEmptyColumn + "px";
      tile.style.left = 100 * tempEmptyRow + "px";
      tile.setAttribute("id", "square_" + tempEmptyRow + "_" + tempEmptyColumn);
    }
  }

//Shuffle function for the puzzle which places tiles in random position
function shuffle() {   
	for (var i = 0; i < 1000; i++) {
		var neighbors = getNeighbors();
		var rand = parseInt(Math.random() * neighbors.length);
		var tile = document.getElementById(neighbors[rand]);
		moveTiles(tile);
    }
}

// Checks tiles around selected tile to see if they're empty 
function getNeighbors() {
	var up = "square_" + emptyRow + "_" + (emptyCol - 1);
    var down = "square_" + emptyRow + "_" + (emptyCol + 1);
    var left = "square_" + (emptyRow - 1) + "_" + emptyCol;
    var right = "square_" + (emptyRow + 1) + "_" + emptyCol;

    var tiles = [up, down, left, right];
    var nonEmptyTiles = [];

    for (var i = 0; i < tiles.length; i++) {
      if (document.getElementById(tiles[i]) != null) {
        nonEmptyTiles.push(tiles[i]);
      }
	}
		return nonEmptyTiles; }
})();
