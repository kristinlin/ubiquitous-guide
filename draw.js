// Eric L and Kristin L

// DOM elements
var board = document.getElementById("board");
var clear = document.getElementById("clear");

//dict to hold objs
var objs = {};
var next_id = 0;

//=========================================================

// clicked on board; create new obj; add to board and list of objs
var draw = function(e) {
    var another = makeObj(e.offsetX, e.offsetY);
    another.display();
    another.update();
    objs[another.id] = another;
}

// circle clicked on again; obtain object in list
var again = function(e) {
    var clicked = objs[this.getAttribute("id")];
    if (clicked.del) {
	clicked.second();
    } else {
	clicked.first();
    }
    e.stopPropagation();
}


//=========================================================

var makeObj = function(x, y) {
    var cic = document.createElementNS("http://www.w3.org/2000/svg",
				       "circle");
    var ret = {
	"id" : next_id,
	"x" : x,
	"y" : y,
	"r" : 25,
	"fill" : "#000000",
	"del" : false,
	"svg" : cic,
	"display" : function() {
	    //use this.svg
	    //add event listener
	    //append child
	    //updateid
	},
	"update" : function() {
	    //resets attributes using setAttribute and this.svg
	},
	"first" : function() {
	    this.del = true;
	    this.fill = rand_color();
	    this.update();
	},
	"second": function() {
	    this.svg.remove();
	    this.svg = document.createElementNS("http://www.w3.org/2000/svg",
						"circle");
	    //resets color, del, x, y, puts it on board with display and update
	}
    };
    
    return ret;

}

//rand color
var values = '0123456789ABCDEF';
var rand_color = function() {
    var color = '#';
    for (var x = 0; x < 6; x++) {
        color += values[Math.floor(Math.random() * 16)];
    }
    return color;
}


//=========================================================

//delete all child nodes and reseting previous x and y
var clearing = function(e) {
    while (board.hasChildNodes()) {
	board.removeChild(board.childNodes[0]);
    }
    objs.clear();
}

board.addEventListener("click", draw);
clear.addEventListener("click", clearing);
