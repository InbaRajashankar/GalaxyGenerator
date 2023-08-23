var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d")
var starCoords = [];
const pi = Math.PI;
const e = Math.E;

function drawPoint(xPos, yPos, size, color){
  ctx.fillStyle = color;
  ctx.fillRect(xPos,yPos,size,size);
}

function generateStars(num, color) {
  var xCoords = [];
  var yCoords = [];
  
  for (var i = 0; i < num; i++) {
    // Generate polars.
    var theta = ((4 * pi) * Math.sqrt((Math.random())));

    if (Math.random() > 0.5) {
      var radius = 8 * (Math.pow(e, 0.3 * theta));
    } else {
      var radius = -8 * (Math.pow(e, 0.3 * theta));
    }
    
    radius = radius * (1 + (Math.random() * 0.3));

    // Convert polars to cartesian.
    var x = radius * Math.cos(theta) + 500;
    var y = radius * Math.sin(theta) + 500;

    // Add random scattering to x & y coordinates
    if (theta < 2 * pi) {
      x = x * ((Math.random() * 0.1) + 1)
      y = y * ((Math.random() * 0.1) + 1)
    } else if (theta < 3 * pi) {
      x = x * ((Math.random() * 0.05) + 1)
      y = y * ((Math.random() * 0.05) + 1)
    }

    xCoords.push(x);
    yCoords.push(y);
  }

  // Draw stars
  for (var i = 0; i < num; i++) {
    let colors  = ["hotpink", "fuchsia", "coral", "darkorange", "red", "firebrick"];
    let colorChoice = Math.round(Math.random() * 5);

    drawPoint(xCoords[i], yCoords[i], 2, colors[colorChoice]);
  }

  return [xCoords, yCoords];
}

// functions to generating 8 warp points
function generateWarps() {
  var thetaValues = [12, 11, 9.5, 5, 5, 9.5, 11, 12];
  var radiusValues = [0, 0, 0, 0, 0, 0, 0, 0];

  for (var i = 0; i < 8; i++) {
    if (i < 4) {
      radiusValues[i] = 8 * (Math.pow(e, 0.3 * thetaValues[i]));
    } else {
      radiusValues[i] = (-8) * (Math.pow(e, 0.3 * thetaValues[i]));
    } 
  }

  // Transform polar coords to cartesian coords
  var xVals = [0, 0, 0, 0, 0, 0, 0, 0];
  var yVals = [0, 0, 0, 0, 0, 0, 0, 0];

  for (var i = 0; i < 8; i++) {
    xVals[i] = radiusValues[i] * Math.cos(thetaValues[i]) + 500;
    yVals[i] = radiusValues[i] * Math.sin(thetaValues[i]) + 500;
  }
  
  for (var i = 0; i < 8; i++) {
    drawPoint(xVals[i], yVals[i], 3, "yellow");
  }

  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 0.3;

  ctx.beginPath();
  ctx.moveTo(xVals[0] + 1.5, yVals[0] + 1.5);
  for (var i = 0; i < 8; i++) {
    ctx.lineTo(xVals[i + 1] + 1.5, yVals[i + 1] + 1.5);
  }
  ctx.stroke();

  return [xVals, yVals];
}

function generateRuins(num) {
  var xCoords = [];
  var yCoords = [];
  
  for (var i = 0; i < num; i++) {
    // Generate polars.
    var theta = ((4 * pi) * Math.sqrt((Math.random())));
    var radius = ((250) * Math.sqrt((Math.random()))) + (200);

    // Convert polars to cartesian.
    var x = radius * Math.cos(theta) + 500;
    var y = radius * Math.sin(theta) + 500;

    xCoords.push(x);
    yCoords.push(y);

    // Re-generate coordinates if too close to existing ruin
    if (i > 0) {
      for (var j = 0; j < (xCoords.length - 1); j++) {
        if (findDistance(xCoords[i], yCoords[i], xCoords[j], yCoords[j]) < 30) {
          xCoords.pop();
          yCoords.pop();
          i--;
        }
      }
    }
  }

  // Draw points
  for (var i = 0; i < num; i++) {
    drawPoint(xCoords[i], yCoords[i], 2, "cyan");
  }

  return [xCoords, yCoords];
}

function findDistance(x1, y1, x2, y2) {
  let diffx = x1 - x2;
  let diffy = y1 - y2;
  return Math.sqrt(diffx * diffx + diffy * diffy);
}

generateStars(200, "red");
generateWarps();
generateRuins(20);