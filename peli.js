const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var paddleHeight = 10;
var paddleWidth = 80;
var paddleX = (canvas.width-paddleWidth) / 2;
var enemyPaddleHeight = 10;
var enemyPaddleWidth = 80;
var enemyPaddleX = (canvas.width-enemyPaddleWidth) / 2;
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
    y:200,
    size: 15,
    dx: 2,
    dy: 1.5,
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


function drawEnemyPaddle() {
    ctx.beginPath();
    ctx.rect(enemyPaddleX, 0 , enemyPaddleWidth, enemyPaddleHeight);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

// vihollinen seuraa pallon x koordinaattia
function enemyMove() {
    if (enemyPaddleX + 40 > circle.x && enemyPaddleX >= 0) {
        enemyPaddleX -= 2.3;
    } else if (enemyPaddleX + 40< circle.x && enemyPaddleX + enemyPaddleWidth < canvas.width) {
        enemyPaddleX += 2.3;
    }
}


function update() {
ctx.clearRect(0,0, canvas.width, canvas.height);

    drawCircle();
    drawPaddle();
    drawEnemyPaddle()
    enemyMove()

    circle.x +=circle.dx;
    circle.y += circle.dy;
    if(circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
circle.dx *=-1;
    }
    //jos osuu pohjaan menettää elämän
    if(circle.y + circle.size > canvas.height + 20) {
        circle.x = 200,
        circle.y = 200,
        circle.size = 15,
        circle.dx = 2,
        circle.dy = 1.5,
        alert("Menetit elämän");

    }
    if (circle.y - circle.size < 0) {
        alert("vihollinen menetti elämän")
    }
    //pallo kimpoaa pelaajasta
    if (circle.x >= paddleX && circle.x <= paddleX + 80) {
        if (circle.y >= canvas.height) {
            circle.dy *= -1;  
        }
    }
    //pallo kimpoaa vihollisesta
    if (circle.x >= enemyPaddleX && circle.x <= enemyPaddleX + 80)  {
        if (circle.y <= 0 + enemyPaddleHeight + circle.size) {
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
}
update();