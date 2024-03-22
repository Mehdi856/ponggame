let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

// the center
function drawCenter(){
    for(i=2;i<750;i = i+20){
        ctx.fillStyle = 'white'
        ctx.fillRect(450,i,10,10)
    }
}


//the scores
let leftScore = 0
let rightScore = 0
function drawScore(){
    ctx.font = '60px Arial'
    ctx.fillText(leftScore, 190,60)
    ctx.font = '60px Arial'
    ctx.fillText(rightScore, 670,60)
}

// the bars
let leftBar = {
    x : 50,
    y : 350,
    speed : 5,
    dy : 0
}
function drawLeftBar(){
    ctx.fillStyle = 'white'
    ctx.fillRect(leftBar.x,leftBar.y,15,80)
}

let rightBar = {
    x : 835,
    y : 350,
    speed : 5,
    dy : 0
}
function drawRightBar(){
    ctx.fillStyle = 'white'
    ctx.fillRect(rightBar.x,rightBar.y,15,80)
}
/*drawLeftBar()
drawRightBar()*/

// moving the right bar
function clear(){
    ctx.clearRect(835,0,65,700)
}
function newPos(){
    rightBar.y += rightBar.dy
    detectWalls() 
}
function detectWalls(){
    if(rightBar.y +80> 700){
        rightBar.y = 620
    }
    if(rightBar.y < 0){
        rightBar.y = 0
    }
}
function update(){
    clear()
    drawRightBar()
    newPos()

    requestAnimationFrame(update)
}
update()

function moveRightBarUp(){
    rightBar.dy = -rightBar.speed
}
function moveRightBarDown(){
    rightBar.dy = rightBar.speed
}

function keyDown(e){
    if(e.key === 'ArrowUp'){
        moveRightBarUp()
    }
    if(e.key === 'ArrowDown'){
        moveRightBarDown()
    }
}
function keyUp(e){
    if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        rightBar.dx = 0
    }
}
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)







// moving left bar
function clearL(){
    ctx.clearRect(0,0,65,700)
}
function newPosL(){
    leftBar.y += leftBar.dy
    detectWallsL() 
}
function detectWallsL(){
    if(leftBar.y+80 > 700){
        leftBar.y = 620
    }
    if(leftBar.y < 0){
        leftBar.y = 0
    }
}
function updateL(){
    clearL()
    drawLeftBar()
    newPosL()

    requestAnimationFrame(updateL)
}
updateL()

function moveLeftBarUp(){
    leftBar.dy = -leftBar.speed
}
function moveLeftBarDown(){
    leftBar.dy = leftBar.speed
}

function keyDownL(e){
    if(e.key === 'z'){
        moveLeftBarUp()
    }
    if(e.key === 's'){
        moveLeftBarDown()
    }
}
function keyUpL(e){
    if(e.key === 'z' || e.key === 's'){
        leftBar.dx = 0
    }
}
document.addEventListener('keydown', keyDownL)
document.addEventListener('keyup', keyUpL)




// the ball
let ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    size : 15,
    dx : 7,
    dy : 2
}
function drawBall(){
    ctx.beginPath()
    ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2)
    ctx.fillStyle = 'white'
    ctx.fill()
}
drawBall()

function moveBall(){
    ctx.clearRect(65,0,770,700)
    drawBall()
    drawCenter()
    drawScore()

    ball.x += ball.dx
    ball.y += ball.dy

    if(ball.y -ball.size<0){
        ball.dy *= -1
    }
    if(ball.y+ ball.size>700){
        ball.dy *= -1
    }

    detectRightBar()
    detectLeftBar()
    
    rightGuyScore()
    leftGuyScore()
    

    requestAnimationFrame(moveBall)
}

function detectRightBar(){
    if((ball.x+ ball.size>rightBar.x) && ((ball.y>rightBar.y)&&(ball.y<=rightBar.y+80))){
        ball.dx *= -1
    }
}
function detectLeftBar(){
    if((ball.x-ball.size<leftBar.x +15) && ((ball.y>leftBar.y)&&(ball.y<=leftBar.y+80))){
        ball.dx *= -1
    } 
}
function rightGuyScore(){
    if(ball.x-ball.size<0){
        rightScore += 1
        reset()
        
    }
}
function leftGuyScore(){
    if(ball.x+ball.size>canvas.width){
        leftScore += 1
        reset()
    }
}

function reset(){
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball.dx *= -1
    rightBar.y = (canvas.height +80) /2
    leftBar.y = (canvas.height +80) /2
    rightBar.dy = 0
    leftBar.dy = 0
}

moveBall()