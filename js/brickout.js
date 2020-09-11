const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

// 공 변수
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 3;
let dy = -3;
const ballRadius = 10;

// 패들 변수
const paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;

// 벽돌 변수
let brickRowCount = 3;
let brickColumnCount = 4;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for(let c = 0; c < brickColumnCount; c++){
  bricks[c] = [];
  for(let r = 0; r < brickRowCount; r++){
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// 점수 및 생명
let score = 0;
let lives = 3;

// 게임 조작 핸들러
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// 모바일
document.addEventListener("touchstart", mouseMoveHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);

function touchMoveHandler(e){
  let relativeX = e.changedTouches[0].clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width){
    paddleX = relativeX - paddleWidth/2;}
}

function mouseMoveHandler(e){
  let relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width){
    paddleX = relativeX - paddleWidth/2;
  }
}

function keyDownHandler(e){
  if(e.keyCode == 39){
    rightPressed = true;
  } else if(e.keyCode == 37){
    leftPressed = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode == 39){
    rightPressed = false;
  } else if(e.keyCode == 37){
    leftPressed = false;
  }
}

function collisionDetection(){
  for(let c=0; c<brickColumnCount; c++){
    for(let r=0; r<brickRowCount; r++){
      let b = bricks[c][r];
      if(b.status == 1){
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount){
            alert("YOU WIN");
            document.location.reload();
          }
        }
      }
    }
  }
}

// 점수 표시
function drawScore(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095dd";
  ctx.fillText("Score: "+score, 8, 20);
}

// 생명 표시
function drawLives(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095dd";
  ctx.fillText("Lives: "+ lives, canvas.width-65, 20);
}

// 공 생성
function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// 패들 생성
function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// 벽돌 생성
function drawBricks(){
  for(let c=0; c<brickColumnCount; c++){
    for(let r=0; r<brickRowCount; r++){
      if(bricks[c][r].status == 1){
        let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095dd";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  drawScore();
  drawLives();

  if(y + dy < ballRadius){
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    } else {
      lives--;
      if(!lives){
        alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 4;
        dy = -4;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius ){
    dx = -dx;
  }
  if(rightPressed && paddleX < canvas.width-paddleWidth){
    paddleX += 7;
  } else if (leftPressed && paddleX > 0){
    paddleX -= 7;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();