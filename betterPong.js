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
var pisteet = 0;
var pisteet2 = 0;

var colorArray = [
    'rgba(219, 98, 33 ,0.2)',
    'rgba(33, 169, 219 ,0.2)',
    'rgba(153, 105, 219 ,0.2)',
    'rgba(163, 0, 0 ,0.2)',
]

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
    x: 0,
    y: 0,
    size: 15,
    max: 8,
    dx: 0,
    dy: 0,
}
function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle='white';
    ctx.fill();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

//antaa random spawn pointin pallolle
function randomSpawn(turn) {
    circle.x = Math.random() * canvas.width;
    circle.dx = (Math.random() * 6) - 3;
    if (circle.x < 15) {
        circle.x = 15
    } else if (circle.x > canvas.width - 15) {
        circle.x = canvas.width - 15;
    }
    if (turn) {
        circle.y = 50;
        circle.dy = 3;
    } else {
        circle.y = canvas.height - 50;
        circle.dy = -3;
    }
}


function drawEnemyPaddle() {
    ctx.beginPath();
    ctx.rect(enemyPaddleX, 0 , enemyPaddleWidth, enemyPaddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// vihollinen seuraa pallon x koordinaattia
function enemyMove() {
    if (enemyPaddleX + 40 > circle.x && enemyPaddleX >= 0) {

        enemyPaddleX -= 2.5;
    } else if (enemyPaddleX + 40< circle.x && enemyPaddleX + enemyPaddleWidth < canvas.width) {

        enemyPaddleX += 2.5;
    }
    
}
randomSpawn(true)

//pallo kimpoaa pelaajista tietyllä nopeudella
function bounceSpeed(enemy) {
    let spare = 0;
    if (enemy) {
        circle.dx = Math.random() * circle.max - circle.max / 2;
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

//tekee erikois palloja
var circleArray = [];
var i = 0;
function powerUP() {
    while (circleArray.length < 4) {
        var radius = 15;
        var x = Math.random() * canvas.width - 15;
        var y = Math.random() * canvas.height - 15;

        if (x <= 15) {
            x = 15
        }
        if (y <= 30) {
            y = 30;
        } 

        circleArray.push(new Circle(x, y, radius, i));
        i++
    }
}

function Circle(x, y, radius,i) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = colorArray[i]
    this.i = i;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill();
    }

    this.update = function() {
        console.log(this.i)
        this.draw();
    }

    //tarkistaa osuiko pallo erikois palloihin
    function getPowerUP(x, y, i) {
        checkCollision(x, y, i)
    }
}

function update() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0,0,canvas.width,10);
    ctx.fillRect(0,canvas.height-10,canvas.width,canvas.height);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    drawCircle();
    drawPaddle();
    drawEnemyPaddle();
    enemyMove();
    powerUP()
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    
    circle.x +=circle.dx;
    circle.y += circle.dy;
    if(circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
        circle.dx *=-1;
    }

    //jos osuu pohjaan tietokone saa pisteen
    if(circle.y + circle.size > canvas.height) {
        randomSpawn(false);
        alert("Vihollinen sai pisteen");
        pisteet2 = pisteet2 + 1;
        document.getElementById("pisteet2").innerHTML="Pisteet: " + pisteet2;
    }
    
    //(jos) pallo osuu vihollisen puolelle kattoon niin pelaaja saa pisteen
    if (circle.y - circle.size < 0) {
        pisteet = pisteet + 1;
        alert("Sait pisteen")
        randomSpawn(true);
        document.getElementById("pisteet").innerHTML="Pisteet: " + pisteet;
    }
    //pallo kimpoaa pelaajasta
    if (circle.x >= paddleX && circle.x <= paddleX + 80) {
        if (circle.y >= canvas.height - (paddleHeight + circle.size)) {
            bounceSpeed(false)
        }
    }
    //pallo kimpoaa vihollisesta
    if (circle.x >= enemyPaddleX && circle.x <= enemyPaddleX + 80)  {
        if (circle.y <= 0 + enemyPaddleHeight + circle.size) {
            bounceSpeed(true)  
        }
    }
    //pisteidenlasku
    if (pisteet >= 5) {
        alert("Voitit pelin!");
        location.reload();
    } 
    if (pisteet2 >= 5) {
        alert("Hävisit pelin!")
        location.reload();
    }
    

    requestAnimationFrame(update);
   

    if(rightPressed) {
        paddleX += 4;
    } else if(leftPressed) {
        paddleX -= 4;
    } 

    if(rightPressed) {
        paddleX += 4;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    } else if(leftPressed) {
        paddleX -= 4;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
}

update();