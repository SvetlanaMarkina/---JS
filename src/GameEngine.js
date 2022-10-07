
class GameEngine {

    constructor(canvas, ctx, blockSize) {
        this.blockSize = blockSize;
        this.rows = canvas.height / blockSize;
        this.columns = canvas.width / blockSize;
        this.ctx = ctx;
        const { x, y } = this.randomCoordinates();
        this.snake = new Snake(0, 0, canvas, this.ctx, "#FF4500", "#FF7F50", blockSize);
        this.apple = new Apple(x, y, ctx, "#DC143C", blockSize);
        this.currentScore = 0;
        this.highestScore = 0;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.gameLoop = this.gameLoop.bind(this);

        window.setInterval(this.gameLoop, 500);
        window.addEventListener('keydown', this.onKeyDown);

    }
    
    


    randomCoordinates() {
        return {
            x: (Math.floor(Math.random() * this.columns - 1) + 1) * this.blockSize,
            y: (Math.floor(Math.random() * this.rows - 1) + 1) * this.blockSize
        }
    }

    gameLoop() {
        // Clear Previous State
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw Apple
        this.apple.draw();
        // Update and Draw Snake
        this.snake.update();
        this.snake.draw();

        // Handle Collision
        if (this.snake.tailCollision()) {
            this.currentScore = 0;
            this.snake.total = 1;
            this.snake.tail = [];

            this.updateScore();
        }

        if (this.snake.eat(this.apple)) {
            const { x, y } = this.randomCoordinates();
            this.apple.x = x;
            this.apple.y = y;
            this.currentScore++;
            this.snake.total = this.currentScore;
            this.updateScore();
        }
    }


   

    updateScore() {
        if (this.currentScore > this.highestScore) { this.highestScore = this.currentScore; }
        const currentScore = document.getElementById("current-score");
        const highestScore = document.getElementById("highest-score");

        currentScore.textContent = `${this.currentScore}`
        highestScore.textContent = `${this.highestScore}`
    }

    onKeyDown(e) {
        switch(e.key) {
            case 'ArrowDown':
                this.snake.xSpeed = 0;
                this.snake.ySpeed = this.blockSize;
                break;
            case 'ArrowUp':
                this.snake.xSpeed = 0;
                this.snake.ySpeed = -this.blockSize;
                break;
            case 'ArrowLeft':
                this.snake.xSpeed = -this.blockSize;
                this.snake.ySpeed = 0;
                break;
            case 'ArrowRight':
                this.snake.xSpeed = this.blockSize;
                this.snake.ySpeed = 0;
                break;
        }
    }
}

  