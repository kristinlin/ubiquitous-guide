// Eric L and Kristin L

// DOM elements
var board = document.getElementById("board");
var clear = document.getElementById("clear");


//=========================================================

// clicked on board; create new obj; add to board and list of objs
var draw = function(e) {
    var another = makeObj(e.offsetX, e.offsetY);
    another.display();
}

var draw_two = function(x,y) {
    var another = makeObj(x, y);
    another.display();
}


//=========================================================

var makeObj = function(x, y) {
    var cic = document.createElementNS("http://www.w3.org/2000/svg",
				       "circle");
    var ret = {
	"x" : x,
	"y" : y,
	"r" : 25,
	"fill" : "black",
	"del" : false,
	"svg" : cic,
	display : function(e) {
	    ret.svg.setAttribute("cx", this.x);
	    ret.svg.setAttribute("cy", this.y);
	    ret.svg.setAttribute("r", this.r);
	    ret.svg.setAttribute("fill", this.fill);
	    board.append(cic);
	},
	remove: function(e){
		board.removeChild(this.svg)
	},
	click : function(e) {
	    e.stopPropagation();
	    if (this.fill=="black"){
	    	//console.log("hi")
	    	this.fill=rand_color();
	    	this.display();
	    }
	    else{
	    	//console.log("bye")
	    	this.remove();
	    	console.log("abc")
	    	draw_two(Math.random() * 500,Math.random() * 500)
	    }
	}
    };
    ret.svg.addEventListener("click", function(e){ret.click(e)});
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
}

board.addEventListener("click", draw);
clear.addEventListener("click", clearing);
