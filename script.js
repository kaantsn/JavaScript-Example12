document.addEventListener("DOMContentLoaded", function () {
    // Game area
    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");

    // Snake initial position
    let snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
        { x: 160, y: 200 }
    ];

    // Snake movement direction
    let dx = 10;
    let dy = 0;

    // Food random positioning
    let foodX;
    let foodY;

    // Game score
    let score = 0;

    // Size of the snake
    const snakeSize = 10;

    // Game speed
    let gameSpeed = 100;

    // Create food
    function createFood() {
        foodX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
        foodY = Math.floor(Math.random() * (canvas.height / 10)) * 10;

        // If the food is on the snake, reposition it
        snake.forEach(function (part) {
            if (part.x === foodX && part.y === foodY) {
                createFood();
            }
        });
    }

    // Move the snake
    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        // Check if the snake has eaten the food
        if (snake[0].x === foodX && snake[0].y === foodY) {
            score += 10;
            gameSpeed -= 5; // You can increase the speed of the game here
            createFood();
        } else {
            snake.pop();
        }
    }

    // Draw the game
    function drawGame() {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the snake
        snake.forEach(function (part) {
            context.fillStyle = "#00FF00";
            context.fillRect(part.x, part.y, snakeSize, snakeSize);
        });

        // Draw the food
        context.fillStyle = "#FF0000";
        context.fillRect(foodX, foodY, snakeSize, snakeSize);

        // Display the score
        context.fillStyle = "#FFFFFF";
        context.font = "16px Arial";
        context.fillText("Score: " + score, 10, 20);
    }

    // Game loop
    function gameLoop() {
        setTimeout(function () {
            moveSnake();
            drawGame();

            // Check if the snake is out of bounds
            if (
                snake[0].x < 0 ||
                snake[0].x >= canvas.width ||
                snake[0].y < 0 ||
                snake[0].y >= canvas.height
            ) {
                gameOverAnimation();
                alert("Game over!");
                return;
            }

            // Check if the snake has collided with itself
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                    gameOverAnimation();
                    alert("Game over!");
                    return;
                }
            }

            gameLoop();
        }, gameSpeed);
    }

    // Handle key events
    document.addEventListener("keydown", function (event) {
        const keyPressed = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;

        if (keyPressed === 37 && !goingRight) {
            dx = -10;
            dy = 0;
        }

        if (keyPressed === 38 && !goingDown) {
            dx = 0;
            dy = -10;
        }

        if (keyPressed === 39 && !goingLeft) {
            dx = 10;
            dy = 0;
        }

        if (keyPressed === 40 && !goingUp) {
            dx = 0;
            dy = 10;
        }
    });

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    createFood();
    gameLoop();
});
// Prevent arrow key scrolling
window.addEventListener("keydown", function (e) {
    // Check if arrow key is pressed
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
});
// Game over animation
function gameOverAnimation() {
    let animationSpeed = 50;
    let animationInterval = setInterval(function () {
        // Shrink the snake
        snake.pop();

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the snake
        snake.forEach(function (part) {
            context.fillStyle = "#00FF00";
            context.fillRect(part.x, part.y, snakeSize, snakeSize);
        });

        // Stop the animation when the snake is fully shrunk
        if (snake.length === 0) {
            clearInterval(animationInterval);
        }
    }, animationSpeed);
}
