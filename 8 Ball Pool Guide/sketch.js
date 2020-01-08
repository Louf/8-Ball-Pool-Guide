console.log("Get ready to win, ahahaha");

var clicked = false;
var currentHole = 1;
var currentText = new Map();
var currentBallPos = [0, 0];

var s = function(sketch) {
  // setup canvas

  sketch.setup = function() {
    console.log('p5 running');
    let c = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    c.position(0, 0);
    c.style('pointer-events', 'none');
    sketch.clear();
    sketch.stroke(150);
    sketch.textSize(5);
  }
  // draw the guidelines
  sketch.draw = function() {
		sketch.clear();
    // set stroke weight
    sketch.strokeWeight(1);
    sketch.fill(0);
    sketch.rect(10, 10, 10, 10);

    for(var item of currentText.entries())
    {
      sketch.text(item[0].toString(), item[1][0], item[1][1]);
    }

    for(var item of currentText.entries())
    {
      sketch.line(currentBallPos[0], currentBallPos[1], item[1][0], item[1][1]);
    }
	}

  sketch.keyPressed = function() {
    console.log("STILL HERE");
    if(sketch.keyCode == sketch.CONTROL) sketch.setup();

    if(sketch.keyCode == sketch.ALT){
      if(sketch.keyIsDown(sketch.SHIFT))
      {
        currentText.set(currentHole, [sketch.mouseX, sketch.mouseY]);
        if(currentHole == 6) currentHole = 1;
        else currentHole += 1;

        document.body.style['pointer-events'] = 'none';
      }
    }

    if(sketch.keyCode == sketch.BACKSPACE){
      if(sketch.keyIsDown(sketch.SHIFT))
      {
        currentBallPos[0] = sketch.mouseX;
        currentBallPos[1] = sketch.mouseY;
        document.body.style['pointer-events'] = 'none';
      }
    }
  }

  sketch.keyReleased = function(){
    document.body.style['pointer-events'] = 'auto';
  }
};

// The above function closure is passed into a p5 object constructor
// this starts the sketch.
var myp5 = new p5(s);
