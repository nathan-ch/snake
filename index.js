function randomCase() {
  var res = Math.floor(Math.random() * ((600 - 0) / 20)) * 20 + 0;
  return res;
}

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
    this.snakeLength = 1
    this.playing = true
    this.direction = "ArrowUp"
    this.inititalFruitX = randomCase()
    this.initialFruitY = randomCase()
    this.fruit = { x: this.inititalFruitX, y: this.initialFruitY }
  }

  draw () {
    console.log("draw");
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(this.inititalSnakeX, this.initialSnakeY, 20, 20)
    ctx.fillRect(this.inititalFruitX, this.initialFruitY, 10, 10)
  }

  move () {
    context.clearRect(this.snake[this.snake.length-1].x, this.snake[this.snake.length-1].y, 20, 20);
    this.composeSnake()
    if ( this.direction === "ArrowUp"){
      this.snake[0].y = this.snake[0].y - 20
    }
    else if ( this.direction === "ArrowDown"){
      this.snake[0].y = this.snake[0].y + 20
    }
    else if ( this.direction === "ArrowRight" ) {
      this.snake[0].x = this.snake[0].x + 20
    }
    else if ( this.direction === "ArrowLeft" ) {
      this.snake[0].x = this.snake[0].x - 20
    }
  }

  printSnake () {
    console.log(this.snake);
    console.log("start printing snake");
    ctx.fillStyle = 'rgb(200, 0, 0)';
    for (let i = 0; i < this.snake.length; i++) {
      ctx.fillRect(this.snake[i].x, this.snake[i].y , 20, 20)      
    }
  }

  composeSnake () {
    for (let i = 1; i < this.snake.length; i++) {
      this.snake[i].x = this.snake[i].x
      this.snake[i].y = this.snake[i].y
    }
  }

  eatFruit () {
    if ( this.snake[0].x == this.fruit.x && this.snake[0].y == this.fruit.y ){
      this.snakeLength =+ 1
      this.snake.push({ x: this.fruit.x, y: this.fruit.y })
      this.generateFruit()
    }
  }

  generateFruit () {
    this.inititalFruitX = randomCase()
    this.initialFruitY = randomCase()
    this.fruit = { x: this.inititalFruitX, y: this.initialFruitY }
    ctx.fillRect(this.inititalFruitX, this.initialFruitY, 10, 10)
  }

  snakeMoving () {
    this.eatFruit()
    this.move();
    this.printSnake();
    this.checkFailed();
  }

  changeDirection (e) {
    console.log(e.key);
    this.direction = e.key
  }

  checkFailed () {
    if ( this.snake[0].x <= 0 || this.snake[0].x >= 600 || this.snake[0].y <= 0 || this.snake[0].y >= 600 ){
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
  } , 300 )
}