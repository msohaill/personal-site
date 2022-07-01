import { useEffect } from 'react';
import './style.scss';

type Direction = 'up' | 'left' | 'down' | 'right';
type GameState = 'play' | 'pause' | 'restart' | 'end';

const SnakeGame = () => {
  const HEIGHT = window.innerWidth < 800 ? 20 : 15;
  const WIDTH = window.innerWidth < 800 ? 12 : 20;

  const game = Array(HEIGHT)
    .fill('')
    .map(() => Array(WIDTH).fill('empty'));

  useEffect(() => {
    let snake: Array<number> = [];
    let apple: number;
    let start: DOMHighResTimeStamp | undefined;
    let steps: number;
    let score: number;
    let moveQueue: Array<Direction> = [];
    let state: GameState = 'pause';
    const speed = 150;

    const tiles = Array.from(document.getElementsByClassName('game-content') as HTMLCollectionOf<HTMLElement>);
    //const grid = document.getElementById('game-container') as HTMLElement;

    const getRandomFreePos = (height: number, width: number, snake: Array<number>) => {
      let pos: number;

      do {
        pos = Math.floor(Math.random() * height) * width + Math.floor(Math.random() * width);
      } while (snake.includes(pos));

      return pos;
    };

    const setTile = (element: HTMLElement, cssOverrides = {}) => {
      const style = {
        width: '100%',
        height: '100%',
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto',
        backgroundColor: 'transparent',
        ...cssOverrides,
      };

      Object.assign(element.style, style);
    };

    const getDirection = (a: number, b: number): Direction => {
      if (a - 1 === b) return 'right';
      else if (a + 1 === b) return 'left';
      else if (a - WIDTH === b) return 'down';
      else if (a + WIDTH === b) return 'up';
      throw Error('The two tiles are not connected');
    };

    const headDirection = () => {
      return getDirection(snake[snake.length - 1], snake[snake.length - 2]);
    };

    const tailDirection = () => {
      return getDirection(snake[1], snake[0]);
    };

    const initGame = () => {
      snake = window.innerWidth < 800 ? [60, 61, 62] : [149, 150, 151];
      apple = getRandomFreePos(HEIGHT, WIDTH, snake);

      start = undefined;
      steps = -1;
      score = 0;

      moveQueue = [];

      for (const tile of tiles) setTile(tile);
      setTile(tiles[apple], { backgroundColor: 'yellow', borderRadius: '50%' });
      for (const i of snake.slice(1)) setTile(tiles[i], { backgroundColor: 'brown' });
    };

    document.onkeydown = (e) => {
      if (!['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'p', 'q', ' '].includes(e.key)) return;
      e.preventDefault();

      const propDir = e.key.substring(5).toLowerCase() as Direction;

      if (moveQueue.length < 2 && (!moveQueue.length || moveQueue[moveQueue.length - 1] !== propDir)) {
        if (!moveQueue.length) {
          const headDir = headDirection();

          switch (propDir) {
            case 'up':
              headDir !== 'down' && moveQueue.push('up');
              state !== 'play' && startGame();
              return;
            case 'left':
              headDir !== 'right' && moveQueue.push('left');
              state !== 'play' && startGame();
              return;
            case 'down':
              headDir !== 'up' && moveQueue.push('down');
              state !== 'play' && startGame();
              return;
            case 'right':
              headDir !== 'left' && moveQueue.push('right');
              state !== 'play' && startGame();
              return;
          }
        } else {
          const lastMove = moveQueue[moveQueue.length - 1];

          switch (propDir) {
            case 'up':
              lastMove !== 'down' && moveQueue.push('up');
              state !== 'play' && startGame();
              return;
            case 'left':
              lastMove !== 'right' && moveQueue.push('left');
              state !== 'play' && startGame();
              return;
            case 'down':
              lastMove !== 'up' && moveQueue.push('down');
              state !== 'play' && startGame();
              return;
            case 'right':
              lastMove !== 'left' && moveQueue.push('right');
              state !== 'play' && startGame();
              return;
          }
        }
      }
    };

    const startGame = () => {
      state = 'play';
      window.requestAnimationFrame(main);
    };

    const stepAndTransition = (percent: number) => {
      const getNextPos = () => {
        const head = snake[snake.length - 1];
        const dir = moveQueue.shift() || headDirection();

        switch (dir) {
          case 'up': {
            const nextPos = head - WIDTH;

            if (nextPos < 0) throw new Error('Wall hit');
            else if (snake.slice(1).includes(nextPos)) throw new Error('Snake hit');

            return nextPos;
          }
          case 'left': {
            const nextPos = head - 1;

            if (nextPos % WIDTH === WIDTH - 1 || nextPos < 0) throw new Error('Wall hit');
            else if (snake.slice(1).includes(nextPos)) throw new Error('Snake hit');

            return nextPos;
          }
          case 'down': {
            const nextPos = head + WIDTH;

            if (nextPos > WIDTH * HEIGHT - 1) throw new Error('Wall hit');
            else if (snake.slice(1).includes(nextPos)) throw new Error('Snake hit');

            return nextPos;
          }
          case 'right': {
            const nextPos = head + 1;

            if (nextPos % WIDTH === 0) throw new Error('Wall hit');
            else if (snake.slice(1).includes(nextPos)) throw new Error('Snake hit');

            return nextPos;
          }
        }
      };

      const newHead = getNextPos();
      snake.push(newHead);

      const prevTail = tiles[snake[0]];
      setTile(prevTail);

      if (newHead !== apple) {
        snake.shift();

        const tail = tiles[snake[0]];
        const tailDir = tailDirection();
        const tailLength = `${100 - percent * 100}%`;

        const css = { backgroundColor: 'brown' };

        switch (tailDir) {
          case 'up':
            setTile(tail, { ...css, height: tailLength, top: 0 });
            break;
          case 'left':
            setTile(tail, { ...css, width: tailLength, left: 0 });
            break;
          case 'down':
            setTile(tail, { ...css, height: tailLength, bottom: 0 });
            break;
          case 'right':
            setTile(tail, { ...css, width: tailLength, right: 0 });
            break;
        }
      }

      const prevHead = tiles[snake[snake.length - 2]];
      setTile(prevHead, { backgroundColor: 'brown' });

      const head = tiles[newHead];
      const headDir = headDirection();
      const headLength = `${percent * 100}%`;
      const css = { backgroundColor: 'brown', borderRadius: 0 };

      switch (headDir) {
        case 'up':
          setTile(head, { ...css, height: headLength, bottom: 0 });
          break;
        case 'left':
          setTile(head, { ...css, width: headLength, right: 0 });
          break;
        case 'down':
          setTile(head, { ...css, height: headLength, top: 0 });
          break;
        case 'right':
          setTile(head, { ...css, width: headLength, left: 0 });
          break;
      }
    };

    const transition = (percent: number) => {
      const head = tiles[snake[snake.length - 1]];
      const headDir = headDirection();
      const headLength = `${percent * 100}%`;

      if (headDir === 'right' || headDir === 'left') head.style.width = headLength;
      else head.style.height = headLength;

      const tail = tiles[snake[0]];
      const tailDir = tailDirection();
      const tailLength = `${100 - percent * 100}%`;

      if (tailDir === 'right' || tailDir === 'left') tail.style.width = tailLength;
      else tail.style.height = tailLength;
    };

    const addApple = () => {
      apple = getRandomFreePos(HEIGHT, WIDTH, snake);
      setTile(tiles[apple], { backgroundColor: 'yellow', borderRadius: '50%' });
    };

    const main = (time: DOMHighResTimeStamp) => {
      try {
        if (start === undefined) start = time;

        const elapsed = time - start;

        const required = Math.floor(elapsed / speed);
        const stepPercent = (elapsed % speed) / speed;

        if (required !== steps) {
          stepAndTransition(stepPercent);

          const head = snake[snake.length - 1];

          if (head === apple) {
            score++;
            addApple();
          }
          steps++;
        } else {
          transition(stepPercent);
        }

        window.requestAnimationFrame(main);
      } catch (err) {
        console.log(err);
      }
    };

    initGame();
  });

  return (
    <div id='game-container'>
      {game.map((outer, indexOut) => (
        <div key={indexOut} className='game-row'>
          {outer.map((item, indexIn) => (
            <div className={`game-grid ${item}`} key={indexOut * WIDTH + indexIn}>
              <div className='game-content' />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SnakeGame;
