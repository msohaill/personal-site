import { useEffect, useRef, useState } from 'react';
import './style.scss';

type Game = Array<Array<'empty' | 'snake' | 'food'>>;
type Direction = 'up' | 'left' | 'down' | 'right';
type GameState = 'play' | 'pause' | 'restart' | 'end';

const SnakeGame = () => {
  const HEIGHT = window.innerWidth < 800 ? 20 : 15;
  const WIDTH = window.innerWidth < 800 ? 12 : 20;

  const getGridLocation = (game: Game, position: number) => {
    return game[Math.floor(position / WIDTH)][position % WIDTH];
  };

  const setGridLocation = (game: Game, position: number, value: 'empty' | 'snake' | 'food') => {
    game[Math.floor(position / WIDTH)][position % WIDTH] = value;
  };

  const getRandomFreePos = (game: Game) => {
    let pos: number;

    do {
      pos = Math.floor(Math.random() * HEIGHT) * WIDTH + Math.floor(Math.random() * WIDTH);
    } while (getGridLocation(game, pos) !== 'empty');

    return pos;
  };

  const initGame: Game = [...Array(HEIGHT)].map((_) => [...Array(WIDTH)].map((_) => 'empty'));
  setGridLocation(initGame, window.innerWidth < 800 ? 62 : 151, 'snake');
  setGridLocation(initGame, window.innerWidth < 800 ? 61 : 150, 'snake');
  setGridLocation(initGame, getRandomFreePos(initGame), 'food');

  const [game, setGame] = useState(initGame);
  const [direction, setDirection] = useState<Direction>('right');
  const [gameState, setGameState] = useState<GameState>('pause');
  const [snake, setSnake] = useState(window.innerWidth < 800 ? [62, 61] : [151, 150]);
  const [speed, setSpeed] = useState(100);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const updateDisplay = () => {
    if (gameState === 'pause' || gameState === 'end') return;

    setSnake((prevSnake) => {
      let head = prevSnake[0];
      let snakeCopy = prevSnake.slice();

      switch (direction) {
        case 'up':
          head = head < WIDTH ? (HEIGHT - 1) * WIDTH + (head % WIDTH) : head - WIDTH;
          break;
        case 'left':
          head = head % WIDTH === 0 ? head + WIDTH - 1 : head - 1;
          break;
        case 'down':
          head = Math.floor(head / WIDTH) === HEIGHT - 1 ? head % WIDTH : head + WIDTH;
          break;
        case 'right':
          head = head % WIDTH === WIDTH - 1 ? head - (WIDTH - 1) : head + 1;
          break;
      }

      snakeCopy.unshift(head);

      setGame((prevGame) => {
        const newGame = prevGame.map((row) => row.slice());
        setGridLocation(newGame, head, 'snake');

        if (getGridLocation(game, head) === 'food') {
          setGridLocation(newGame, getRandomFreePos(newGame), 'food');
        } else if (getGridLocation(game, head) === 'snake') {
          setGameState('end');
          alert('You LOST');
        } else {
          const tail = snakeCopy.pop() as number;
          setGridLocation(newGame, tail, 'empty');
        }

        return newGame;
      });

      return snakeCopy;
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(key)) event.preventDefault();

    if (key === 'p') {
      setGameState('pause');
      return;
    } else if (
      gameState === 'pause' &&
      ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'w', 'a', 's', 'd'].includes(key)
    ) {
      setGameState('play');
    } else if (key === 'r') {
      setGame(initGame);
      setDirection('right');
      setGameState('pause');
      setSnake(window.innerWidth < 800 ? [62, 61] : [151, 150]);
      setSpeed(100);
      return;
    }

    setDirection((prevDirection) => {
      let newDirection: Direction;

      switch (key) {
        case 'ArrowLeft':
        case 'a':
          newDirection = prevDirection === 'right' ? 'right' : 'left';
          break;
        case 'ArrowUp':
        case 'w':
          newDirection = prevDirection === 'down' ? 'down' : 'up';
          break;
        case 'ArrowRight':
        case 'd':
          newDirection = prevDirection === 'left' ? 'left' : 'right';
          break;
        case 'ArrowDown':
        case 's':
          newDirection = prevDirection === 'up' ? 'up' : 'down';
          break;
        default:
          newDirection = prevDirection;
          break;
      }

      return newDirection;
    });
  };

  const handleSwipe = () => {
    if (gameState === 'pause') {
      setGameState('play');
    }

    setDirection((prevDirection) => {
      let newDirection: Direction;

      if (Math.abs(touchEnd.x - touchStart.x) > Math.abs(touchEnd.y - touchStart.y)) {
        if (touchEnd.x < touchStart.x) {
          newDirection = prevDirection === 'right' ? 'right' : 'left';
          alert('swiped left');
        } else {
          newDirection = prevDirection === 'left' ? 'left' : 'right';
          alert('swiped right');
        }
      } else {
        if (touchEnd.y < touchStart.y) {
          newDirection = prevDirection === 'down' ? 'down' : 'up';
          alert('swiped up');
        } else {
          newDirection = prevDirection === 'up' ? 'up' : 'down';
          alert('swiped down');
        }
      }

      return newDirection;
    });
  };

  const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(updateDisplay, speed);

  document.onkeydown = handleKeyDown;

  useEffect(() => {
    (document.getElementById('game-container') as HTMLElement).ontouchstart = (event) => {
      setTouchStart({ x: event.changedTouches[0].screenX, y: event.changedTouches[0].screenY });
    };
    (document.getElementById('game-container') as HTMLElement).ontouchend = (event) => {
      setTouchEnd({ x: event.changedTouches[0].screenX, y: event.changedTouches[0].screenY });
      handleSwipe();
    };
  }, [touchStart, touchEnd]);

  return (
    <div id='game-container'>
      {game.map((outer, indexOut) => (
        <div key={indexOut} className='game-row'>
          {outer.map((item, indexIn) => (
            <div className={`game-grid ${item}`} key={indexOut * WIDTH + indexIn} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SnakeGame;
