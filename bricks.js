const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var paddleHeight = 10;
var paddleWidth = 80;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 4;
var brickWidth = 100;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var pisteet = 0;
var elamat = 3;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
const circle = {
    x: 400,
    y: 400,
    size: 15,
    dx: 2.5,
    dy: -2.5,
}
function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle='blue';
    ctx.fill();
    ctx.closePath();
}
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (circle.x > b.x && circle.x < b.x + brickWidth && circle.y > b.y && circle.y < b.y + brickHeight) {
                    circle.dy *= -1;
                    b.status = 0;
                }
            }
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#42aa02";
    ctx.fill();
    ctx.closePath();
}

// piirtää tiilet

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        if(bricks[c][r].status == 1) {
          var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#000000";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
  

//pallo kimpoaa pelaajista tietyllä nopeudella
function bounceSpeed(enemy) {
    let spare = 0;
    if (enemy) {
        circle.dx = Math.random() * 8 - 4;
        console.log(circle.dx)
        circle.dy = (6 - ns(circle.dx));
    } else {
        circle.dx = (circle.x - (paddleX + paddleWidth / 2)) / 10;
        console.log(circle.dx)
        circle.dy = (6 - ns(circle.dx)) * -1;
    }
    //muuttaa negatiivisen numeron positiiviseks
    function ns(i) {
        if (i < 0) {
            i = i * -1;
        } 
        return i;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionDetection();
    drawBricks();
    drawCircle();
    drawPaddle();
    
    

    circle.x +=circle.dx;
    circle.y += circle.dy;
    if(circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
circle.dx *=-1;
    }
    if(circle.y - circle.size < 0) {
        circle.dy *= -1;
    }
    if(circle.y + circle.size > canvas.height + 20) {
        alert("Hävisit pelin");
    document.location.reload();
    }
    
    

    //pallo kimpoaa pelaajasta
    if (circle.x >= paddleX && circle.x <= paddleX + 80) {
        if (circle.y >= canvas.height - (paddleHeight + circle.size)) {
            bounceSpeed(false)
        }
    }

    requestAnimationFrame(update);
   


if(rightPressed) {
    paddleX += 4;
}
else if(leftPressed) {
    paddleX -= 4;
}
if(rightPressed) {
    paddleX += 4;
    if (paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
    }
}
else if(leftPressed) {
    paddleX -= 4;
    if (paddleX < 0){
        paddleX = 0;
    }
}
}

update();