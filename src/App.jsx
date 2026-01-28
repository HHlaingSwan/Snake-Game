import { useState, useEffect, useRef } from "react";
import "./SnakeGame.css";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const Direction = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const App = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef(direction);
  const gameOverRef = useRef(gameOver);
  const isPausedRef = useRef(isPaused);

  // Generate random food position
  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    // Make sure food doesn't appear on snake
    const isOnSnake = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y,
    );

    if (isOnSnake) {
      return generateFood();
    }

    return newFood;
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent opposite directions
      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current !== Direction.DOWN) {
            setDirection(Direction.UP);
            directionRef.current = Direction.UP;
          }
          break;
        case "ArrowDown":
          if (directionRef.current !== Direction.UP) {
            setDirection(Direction.DOWN);
            directionRef.current = Direction.DOWN;
          }
          break;
        case "ArrowLeft":
          if (directionRef.current !== Direction.RIGHT) {
            setDirection(Direction.LEFT);
            directionRef.current = Direction.LEFT;
          }
          break;
        case "ArrowRight":
          if (directionRef.current !== Direction.LEFT) {
            setDirection(Direction.RIGHT);
            directionRef.current = Direction.RIGHT;
          }
          break;
        case " ":
          // Toggle pause
          setIsPaused((prev) => !prev);
          isPausedRef.current = !isPausedRef.current;
          break;
        case "r":
        case "R":
          // Restart game
          if (gameOverRef.current) {
            resetGame();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      if (isPausedRef.current || gameOverRef.current) return;

      setSnake((prevSnake) => {
        // Create new head based on current direction
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        // Check for collisions with walls
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          gameOverRef.current = true;
          return prevSnake;
        }

        // Check for collisions with self
        if (
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y,
          )
        ) {
          setGameOver(true);
          gameOverRef.current = true;
          return prevSnake;
        }

        // Check if snake eats food
        if (newHead.x === food.x && newHead.y === food.y) {
          // Generate new food
          setFood(generateFood());
          // Increase score
          setScore((prev) => prev + 10);
          // Increase speed slightly
          setSpeed((prev) => Math.max(prev - 5, 50));
          // Return new snake with new head (snake grows)
          return [newHead, ...prevSnake];
        }

        // Return new snake with new head and without the tail
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [food, gameOver, speed]);

  // Reset game function
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection(Direction.RIGHT);
    directionRef.current = Direction.RIGHT;
    setGameOver(false);
    gameOverRef.current = false;
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    isPausedRef.current = false;
  };

  // Render game grid
  const renderGrid = () => {
    const grid = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const isSnake = snake.some(
          (segment) => segment.x === col && segment.y === row,
        );
        const isHead = snake[0].x === col && snake[0].y === row;
        const isFood = food.x === col && food.y === row;

        let cellClass = "cell";
        if (isHead) cellClass += " head";
        else if (isSnake) cellClass += " snake";
        if (isFood) cellClass += " food";

        grid.push(
          <div
            key={`${row}-${col}`}
            className={cellClass}
            style={{
              left: col * CELL_SIZE + "px",
              top: row * CELL_SIZE + "px",
              width: CELL_SIZE + "px",
              height: CELL_SIZE + "px",
            }}
          />,
        );
      }
    }

    return grid;
  };

  // Handle touch controls for mobile/tablet
  const handleDirectionChange = (newDirection) => {
    // Prevent opposite directions
    switch (newDirection) {
      case Direction.UP:
        if (directionRef.current !== Direction.DOWN) {
          setDirection(Direction.UP);
          directionRef.current = Direction.UP;
        }
        break;
      case Direction.DOWN:
        if (directionRef.current !== Direction.UP) {
          setDirection(Direction.DOWN);
          directionRef.current = Direction.DOWN;
        }
        break;
      case Direction.LEFT:
        if (directionRef.current !== Direction.RIGHT) {
          setDirection(Direction.LEFT);
          directionRef.current = Direction.LEFT;
        }
        break;
      case Direction.RIGHT:
        if (directionRef.current !== Direction.LEFT) {
          setDirection(Direction.RIGHT);
          directionRef.current = Direction.RIGHT;
        }
        break;
      default:
        break;
    }
  };

  // Toggle pause function
  const togglePause = () => {
    setIsPaused((prev) => !prev);
    isPausedRef.current = !isPausedRef.current;
  };

  return (
    <div className="snake-game-container">
      <h1>Snake Game</h1>

      <div className="game-info">
        <div className="score">Score: {score}</div>
        {isPaused && !gameOver && <div className="paused">PAUSED</div>}
      </div>

      <div className="game-layout">
        <div className="controls-info  left">
          <p>Use arrow keys to move</p>
          <p>Press Space to pause</p>
        </div>

        <div
          className="game-board"
          style={{
            width: GRID_SIZE * CELL_SIZE + "px",
            height: GRID_SIZE * CELL_SIZE + "px",
          }}
        >
          {renderGrid()}

          {gameOver && (
            <div className="game-over">
              <h2>Game Over!</h2>
              <p>Your score: {score}</p>
              <button onClick={resetGame}>Play Again</button>
            </div>
          )}
        </div>

        <div className="controls-info  right">
          <p>Press R to restart</p>
          <p>when game over</p>
        </div>
      </div>

      {/* Mobile/Tablet Touch Controls */}
      <div className="touch-controls">
        <div className="touch-controls-row">
          <button
            className="control-btn up-btn"
            onClick={() => handleDirectionChange(Direction.UP)}
            aria-label="Move Up"
          >
            ▲
          </button>
        </div>
        <div className="touch-controls-row">
          <button
            className="control-btn left-btn"
            onClick={() => handleDirectionChange(Direction.LEFT)}
            aria-label="Move Left"
          >
            ◀
          </button>
          <button
            className="control-btn pause-btn"
            onClick={togglePause}
            aria-label="Pause Game"
          >
            {isPaused ? "▶" : "❚❚"}
          </button>
          <button
            className="control-btn right-btn"
            onClick={() => handleDirectionChange(Direction.RIGHT)}
            aria-label="Move Right"
          >
            ▶
          </button>
        </div>
        <div className="touch-controls-row">
          <button
            className="control-btn down-btn"
            onClick={() => handleDirectionChange(Direction.DOWN)}
            aria-label="Move Down"
          >
            ▼
          </button>
        </div>
        {gameOver && (
          <div className="touch-controls-row">
            <button
              className="control-btn restart-btn"
              onClick={resetGame}
              aria-label="Restart Game"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
