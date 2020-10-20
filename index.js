function randomCase() {
  var res = Math.floor(Math.random() * ((900 - 0) / 30)) * 30 + 0;
  return res;
}

// const nextMove = (e) => {
//   if(e.key === "ArrowUp"){
//     y = y + 30
//     snake.push({x:x, y:y})
//     ctx.fillRect(snake[1].x, snake[1].y, 30, 30);
//     ctx.fillRect(snake[0].x, snake[0].y, 30, 30);
//   }
// }
const canvas = document.getElementById('grid');
const context = canvas.getContext('2d');
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
}

class SnakeGame {
  constructor(){
    this.inititalSnakeX = randomCase()
    this.initialSnakeY = randomCase()
    this.snake = [{ x: this.inititalSnakeX, y: this.initialSnakeY }]
    this.playing = true
    this.direction = "ArrowUp"
  }

  draw () {
    console.log("draw");
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(this.inititalSnakeX, this.initialSnakeY, 30, 30)
  }

  move () {
    if ( this.direction === "ArrowUp"){
      this.snake[0].y = this.snake[0].y - 30
    }
    else if ( this.direction === "ArrowDown"){
      this.snake[0].y = this.snake[0].y + 30
    }
    else if ( this.direction === "ArrowRight" ) {
      this.snake[0].x = this.snake[0].x + 30
    }
    else if ( this.direction === "ArrowLeft" ) {
      this.snake[0].x = this.snake[0].x - 30
    }
  }

  printSnake () {
    context.clearRect(0, 0, 900, 900);
    console.log("start printing snake");
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(this.snake[0].x, this.snake[0].y , 30, 30)
  }

  snakeMoving () {
    this.move();
    this.printSnake();
    this.checkFailed();
  }

  changeDirection (e) {
    console.log(e.key);
    this.direction = e.key
  }

  checkFailed () {
    if ( this.snake[0].x <= 0 || this.snake[0].x >= 900 || this.snake[0].y <= 0 || this.snake[0].y >= 900 ){
      this.playing = false
    }
  }

}

const startGame = () => {
  console.log("startGame");
  const game = new SnakeGame
  game.draw()
  document.addEventListener('keydown', (e) => game.changeDirection(e))
  let gamePlaying = setInterval( function(){
    if ( game.playing === false ){
      clearInterval(gamePlaying)
      alert("You loose !")
    } else{
      game.snakeMoving()
    }
  } , 1000 )
}