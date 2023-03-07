const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const blockSize = 10;
const width = canvas.width / blockSize;
const height = canvas.height / blockSize;

// Criação da cobra
let snake = [
  {x: 8, y: 1},
  {x: 7, y: 1},
  {x: 6, y: 1},
  {x: 5, y: 1},
  {x: 4, y: 1},
  {x: 3, y: 1},
  {x: 2, y: 1},
  {x: 1, y: 1}
];
let laser=[];
// Direção inicial da cobra
let dx = 1;
let dy = 0;

// Criação da comida
let food = {x: 50, y: 50};

let lasers =[];
// Função que desenha a cobra na tela
function drawSnake() {

    
  snake.forEach(function(block, index) {
    if(index % 2== 0)
    ctx.fillStyle = "#ff753a";
    else
    ctx.fillStyle = "#ff0000";

    ctx.fillRect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
  });
  
  
} 
// desenhando o laser e o caminho que ele deve percorrer
function drawLaser(){
   let xsnake = snake[0].x;
   let ysnake = snake[0].y;
   let directionX = dx;
   let directionY = dy;
   let index = 0;
   let intervalLaser = setInterval(()=>{
  
    
     
     const laserposition = {x: xsnake + (directionX *index), y: ysnake + (directionY * index)};

      laser.unshift(laserposition);
        ctx.fillStyle = "red";
        ctx.fillRect(laserposition.x * blockSize, laserposition.y * blockSize, blockSize, blockSize);
        ctx.clearRect((laserposition.x - directionX) * blockSize, (laserposition.y - directionY) * blockSize, blockSize, blockSize);
        index++;
 
    
        
       
    }, 5)
    lasers.push(intervalLaser);

}

function moveLaser(){

}
// Função que atualiza a posição da cobra
function moveSnake() {
  // Cria um novo bloco na frente da cobra
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
   
  snake.unshift(head);

  // Verifica se a cobra comeu a comida
  if (head.x === food.x && head.y === food.y) {
    // Cria uma nova comida em uma posição aleatória
    food = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
  } else {
    // Remove o último bloco da cobra
    var rabo = snake[snake.length - 1];
  

    ctx.clearRect(rabo.x* blockSize, rabo.y* blockSize, blockSize, blockSize);
    
    snake.pop();
  
  }
}

// Função que detecta colisões
function checkCollision() {
  // Verifica se a cobra bateu nas paredes
  if (snake[0].x < 0 || snake[0].x >= width || snake[0].y < 0 || snake[0].y >= height) {
    return true;
  }

  // Verifica se a cobra bateu em si mesma
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  return false;
}

// Função principal do jogo
async function gameLoop() {
  // Move a cobra
 await moveSnake();

  // Verifica colisões
  if (checkCollision()) {
    // Game over
    alert("Game over!");
    clearInterval(intervalId);
    return;
  }

  // Desenha a cobra e a comida
  drawSnake();

  ctx.fillStyle = "yellow";
  ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

// Inicia o jogo
let intervalId = setInterval(gameLoop, 50);

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37) {
      if(dx != 1){
      dx = -1;
      dy = 0;
      }
    } else if (event.keyCode === 38) {
      if( dy != 1){
      dx = 0;
      dy = -1;
     }
    } else if (event.keyCode === 39) {
     if(dx != -1){
      dx = 1;
      dy = 0;
    }
    } else if (event.keyCode === 40) {
      if(dy != -1){
      dx = 0;
      dy = 1;
    }
    }else if (event.keyCode === 65) {
  
   drawLaser();
    }
 
  });
  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) {
      console.log("aaa")
    aumentarVelocidade();
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.keyCode === 32) {
        pararVelocidade();
      }
  });


  function aumentarVelocidade(){
    clearInterval(intervalId);
    intervalId = setInterval(gameLoop, 10);
    


  }
  function pararVelocidade(){
    clearInterval(intervalId);
    intervalId = setInterval(gameLoop, 50);

  }