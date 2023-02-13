var inches = 0;
var stepvalue = 1;
var stepcount = 0;

var squares = 0;
var achievement_1square = false;
var achievement_10squares = false;
var achievement_25squares = false;

var pentagons = 0;
var pentagonmultiplier = 0.10;

function produce(clicked){
	increase = stepvalue
	if(clicked){
		stepcount++;
	}
	if(pentagons>0){
		increase = Math.ceil(increase*(1+(pentagons*pentagonmultiplier)))
	}
	inches = inches + increase;
	document.getElementById('inches').innerHTML = inches;
};

function buySquare(){
	var squareCost = Math.floor(4 * Math.pow(1.15,squares));
	if(inches>=squareCost){
		squares = squares + 1;
		inches = inches - squareCost;
		document.getElementById('squares').innerHTML = squares;
		document.getElementById('inches').innerHTML = inches;
		updateInfo()
		// Update breakpoint bonuses
		switch (squares) {
			case 1:
				if(!achievement_1square){
					document.getElementById('squareblurbrank').innerHTML = "<br />Next breakpoint at 10.";
					achievement_1square = true;
				}
				break;
			case 10:
				if(!achievement_10squares){
					stepvalue+=4;
					document.getElementById('squareblurbrank').innerHTML = "<br />They increase step value by 4'.<br />Next breakpoint at 25.";
					achievement_10squares = true;
				}
				break;
			case 25:
				if(!achievement_25squares){
					stepvalue+=2;
					document.getElementById('buttonpentagon').style.display = "inline-block";
					document.getElementById('pentagoninfo').style.display = "block";
					document.getElementById('squareblurbrank').innerHTML = "<br />They increase step value by 6'.<br />Next breakpoint at 50.";
					achievement_10squares = true;
				}
				break;
			default: 
				break;
		}
	}
	var nextCost = Math.floor(4 * Math.pow(1.15,squares));
	document.getElementById('squareCost').innerHTML = nextCost;
	
}

function buyPentagon(){
	var pentagonCost = Math.floor(2 * Math.pow(1.5,pentagons));
	if(squares>=pentagonCost){
		pentagons = pentagons + 1;
		squares = squares - pentagonCost;
		var squareCost = Math.floor(4 * Math.pow(1.15,squares));
	    document.getElementById('squareCost').innerHTML = squareCost;
		document.getElementById('squares').innerHTML = squares;
		document.getElementById('pentagons').innerHTML = pentagons;
	}
	updateInfo();
	var nextCost = Math.floor(2 * Math.pow(1.5,pentagons));
	document.getElementById('pentagonCost').innerHTML = nextCost;
}

function updateInfo(){
	//Update square steps
	switch (true) {
		case (squares >= 100):
			document.getElementById('squareblurbsteps').innerHTML = "They are moving you 3 steps each second.";
			break;
		case (squares >= 10):
			document.getElementById('squareblurbsteps').innerHTML = "They are moving you 2 steps each second.";
			break;
		case (squares >= 1):
			document.getElementById('squareblurbsteps').innerHTML = "They are moving you a step each second.";
			break;
		default:
			document.getElementById('squareblurbsteps').innerHTML = "They are not moving you.";
			break;
	}
}

function income(){
	for (var squareValue = squares; squareValue >= 1; squareValue = Math.floor(squareValue/10))
		produce()
}

window.setInterval(function(){
	income();
}, 1000);