let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

// the center
for(i=2;i<750;i = i+20){
    ctx.fillStyle = 'white'
    ctx.fillRect(450,i,10,10)
}

//the scores
let leftScore = 0
let rightScore = 0
ctx.font = '60px Arial'
ctx.fillText(leftScore, 190,60)
ctx.font = '60px Arial'
ctx.fillText(rightScore, 670,60)

// the bars
let leftBar = {
    x : 50,
    y : 350,
    dy : 0
}
function drawLeftBar(){
    ctx.fillStyle = 'white'
    ctx.fillRect(leftBar.x,leftBar.y,15,80)
}

let rightBar = {
    x : 835,
    y : 350,
    dy : 5
}
function drawRightBar(){
    ctx.fillStyle = 'white'
    ctx.fillRect(rightBar.x,rightBar.y,15,80)
}


// moving the bars
function moveLeftBar(){
    ctx.clearRect(0,0,50,700)
    drawLeftBar()

    leftBar.y += leftBar.dy

    if(leftBar.y+80>700 || leftBar.y+80 <0 ){
        leftBar.y = leftBar.y
    }

    window.requestAnimationFrame(moveLeftBar)
}

function moveRightBar(){
    ctx.clearRect(835,0,65,700)
    drawRightBar()

    rightBar.y += rightBar.dy

    if(rightBar.y+80>700 || rightBar.y+80 <0 ){
        rightBar.y = rightBar.y
    }

    window.requestAnimationFrame(moveRightBar)
}


// the key