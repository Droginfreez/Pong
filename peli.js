
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var paddleHeight = 10;
var paddleWidth = 80;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

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
    x:200,
    y:500,
    size: 15,
    dx: 0,
    dy: 0.5,
}
function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
ctx.fillStyle='black';
ctx.fill();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}


function update() {
ctx.clearRect(0,0, canvas.width, canvas.height);

    drawCircle();
    drawPaddle();

    circle.x +=circle.dx;
    circle.y += circle.dy;
    if(circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
        circle.dx *= -1;
    }     if(circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
        circle.dy *= -1;
    }
    if (circle.x >= paddleX - 80 && circle.x <= paddleX + 80) {
        if (circle.y == canvas.height - (paddleHeight + circle.size)) {
            circle.dy *= -1;  
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
x += dx;
    y += dy;
}
update();
