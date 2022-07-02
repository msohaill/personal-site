import { useEffect, useState } from 'react';
import { ReactComponent as AppleIcon } from '../../assets/svg/apple-whole.svg';
import { ReactComponent as StrawberryIcon } from '../../assets/svg/strawberry.svg';
import { ReactComponent as BananaIcon } from '../../assets/svg/banana.svg';
import { ReactComponent as CherryIcon } from '../../assets/svg/cherries.svg';
import './style.scss';

type Direction = 'up' | 'left' | 'down' | 'right';
type GameState = 'play' | 'pause' | 'restart' | 'end';

const SnakeGame = () => {
  const HEIGHT = window.innerWidth < 800 ? 16 : 15;
  const WIDTH = window.innerWidth < 800 ? 12 : 17;

  const [contents, setContents] = useState(
    Array(HEIGHT * WIDTH)
      .fill('')
      .map((_, i) => [<div key={i} className='game-content' />])
  );

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
    let touchStart: { x: number; y: number };
    let touchEnd: { x: number; y: number };
    const borderStyle = 'solid white';
    const bWidth = '1px';
    const speed = 150;

    const tiles = Array.from(document.getElementsByClassName('game-content') as HTMLCollectionOf<HTMLElement>);
    const grid = document.getElementById('game-container') as HTMLElement;

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
      if ((b + 1) % WIDTH === a % WIDTH) return 'right';
      else if ((a + 1) % WIDTH === b % WIDTH) return 'left';
      else if (Math.abs((b + WIDTH) % (HEIGHT * WIDTH)) === a) return 'down';
      else if (Math.abs((a + WIDTH) % (HEIGHT * WIDTH)) === b) return 'up';
      throw Error('The two tiles are not connected');
    };

    const headDirection = () => {
      return getDirection(snake[snake.length - 1], snake[snake.length - 2]);
    };

    const tailDirection = () => {
      return getDirection(snake[1], snake[0]);
    };

    const initGame = () => {
      snake = window.innerWidth < 800 ? [60, 61, 62] : [120, 121, 122];

      start = undefined;
      steps = -1;
      score = 0;

      moveQueue = [];

      for (const tile of tiles) setTile(tile);
      setTile(tiles[snake[1]], {
        backgroundColor: 'brown',
        border: borderStyle,
        borderWidth: `${bWidth} 0 ${bWidth} ${bWidth}`,
      });
      setTile(tiles[snake[2]], {
        backgroundColor: 'brown',
        border: borderStyle,
        borderWidth: `${bWidth} ${bWidth} ${bWidth} 0`,
      });

      addApple();
    };

    const handleMove = (propDir: Direction) => {
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

    document.onkeydown = (e) => {
      if (!['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'p', 'q', ' '].includes(e.key)) return;
      e.preventDefault();

      const propDir = e.key.substring(5).toLowerCase() as Direction;
      handleMove(propDir);
    };

    grid.ontouchstart = (e) => (touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
    grid.ontouchend = (e) => {
      touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      handleSwipe();
    };

    const handleSwipe = () => {
      let propDir: Direction;

      if (Math.abs(touchEnd.x - touchStart.x) > Math.abs(touchEnd.y - touchStart.y)) {
        if (touchEnd.x < touchStart.x) {
          propDir = 'left';
        } else {
          propDir = 'right';
        }
      } else {
        if (touchEnd.y < touchStart.y) {
          propDir = 'up';
        } else {
          propDir = 'down';
        }
      }

      handleMove(propDir);
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
            let nextPos = head - WIDTH;

            if (nextPos < 0) {
              nextPos = (HEIGHT - 1) * WIDTH + (head % WIDTH);
            }

            if (snake.slice(1).includes(nextPos)) throw new Error('Snake hit');

            return nextPos;
          }
          case 'left': {
            let nextPos = head - 1;

            if (nextPos % WIDTH === WIDTH - 1 || nextPos < 0) {
              nextPos = head + WIDTH - 1;
            }

            if (snake.slice(1).includes(nextPos)) throw new Error('Snake hit');

            return nextPos;
          }
          case 'down': {
            let nextPos = head + WIDTH;

            if (nextPos > WIDTH * HEIGHT - 1) {
              nextPos = head % WIDTH;
            }

            if (snake.slice(1).includes(nextPos)) throw new Error('Snake hit');

            return nextPos;
          }
          case 'right': {
            let nextPos = head + 1;

            if (nextPos % WIDTH === 0) {
              nextPos = head - (head % WIDTH);
            }

            if (snake.slice(1).includes(nextPos)) throw new Error('Snake hit');

            return nextPos;
          }
        }
      };

      const newHead = getNextPos();
      snake.push(newHead);

      const prevTail = tiles[snake[0]];
      setTile(prevTail, { border: 'none' });

      if (newHead !== apple) {
        snake.shift();

        const tail = tiles[snake[0]];
        const tailDir = tailDirection();
        const tailLength = `${100 - percent * 100}%`;

        const css = { backgroundColor: 'brown', border: borderStyle };

        switch (tailDir) {
          case 'up':
            setTile(tail, { ...css, height: tailLength, top: 0, borderWidth: `0 ${bWidth} ${bWidth} ${bWidth}` });
            break;
          case 'left':
            setTile(tail, { ...css, width: tailLength, left: 0, borderWidth: `${bWidth} ${bWidth} ${bWidth} 0` });
            break;
          case 'down':
            setTile(tail, { ...css, height: tailLength, bottom: 0, borderWidth: `${bWidth} ${bWidth} 0 ${bWidth}` });
            break;
          case 'right':
            setTile(tail, { ...css, width: tailLength, right: 0, borderWidth: `${bWidth} 0 ${bWidth} ${bWidth}` });
            break;
        }
      } else {
        setContents((prevContents) => {
          const newContents = prevContents.map((e) => e.slice());
          newContents[newHead].pop();

          return newContents;
        });
      }

      const prevHead = tiles[snake[snake.length - 2]];
      const head = tiles[newHead];
      const headDir = headDirection();
      const headLength = `${percent * 100}%`;
      const css = { backgroundColor: 'brown', border: borderStyle };

      switch (headDir) {
        case 'up':
          setTile(head, { ...css, height: headLength, bottom: 0, borderWidth: `${bWidth} ${bWidth} 0 ${bWidth}` });

          switch (getDirection(snake[snake.length - 2], snake[snake.length - 3])) {
            case 'up':
              setTile(prevHead, { ...css, borderWidth: `0 ${bWidth}` });
              break;
            case 'left':
              setTile(prevHead, { ...css, borderWidth: `0 0 ${bWidth} ${bWidth}` });
              break;
            case 'right':
              setTile(prevHead, { ...css, borderWidth: `0 ${bWidth} ${bWidth} 0` });
              break;
          }

          break;
        case 'left':
          setTile(head, { ...css, width: headLength, right: 0, borderWidth: `${bWidth} 0 ${bWidth} ${bWidth}` });

          switch (getDirection(snake[snake.length - 2], snake[snake.length - 3])) {
            case 'up':
              setTile(prevHead, { ...css, borderWidth: `${bWidth} ${bWidth} 0 0` });
              break;
            case 'left':
              setTile(prevHead, { ...css, borderWidth: `${bWidth} 0` });
              break;
            case 'down':
              setTile(prevHead, { ...css, borderWidth: `0 ${bWidth} ${bWidth} 0` });
              break;
          }

          break;
        case 'down':
          setTile(head, { ...css, height: headLength, top: 0, borderWidth: `0 ${bWidth} ${bWidth} ${bWidth}` });

          switch (getDirection(snake[snake.length - 2], snake[snake.length - 3])) {
            case 'down':
              setTile(prevHead, { ...css, borderWidth: `0 ${bWidth}` });
              break;
            case 'left':
              setTile(prevHead, { ...css, borderWidth: `${bWidth} 0 0 ${bWidth}` });
              break;
            case 'right':
              setTile(prevHead, { ...css, borderWidth: `${bWidth} ${bWidth} 0 0` });
              break;
          }

          break;
        case 'right':
          setTile(head, { ...css, width: headLength, left: 0, borderWidth: `${bWidth} ${bWidth} ${bWidth} 0` });

          switch (getDirection(snake[snake.length - 2], snake[snake.length - 3])) {
            case 'up':
              setTile(prevHead, { ...css, borderWidth: `${bWidth} 0 0 ${bWidth}` });
              break;
            case 'down':
              setTile(prevHead, { ...css, borderWidth: `0 0 ${bWidth} ${bWidth}` });
              break;
            case 'right':
              setTile(prevHead, { ...css, borderWidth: `${bWidth} 0` });
              break;
          }

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
      setContents((prevContents) => {
        const newContents = prevContents.map((e) => e.slice());
        const { icon: FoodIcon, class: foodClass } = [
          { icon: AppleIcon, class: 'food-apple' },
          { icon: StrawberryIcon, class: 'food-strawberry' },
          { icon: BananaIcon, class: 'food-banana' },
          { icon: CherryIcon, class: 'food-cherries' },
        ][Math.floor(Math.random() * 4)];
        newContents[apple].push(<FoodIcon key='food' className={foodClass} />);

        return newContents;
      });
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
  }, [HEIGHT, WIDTH]);

  return (
    <div id='game-container'>
      {game.map((outer, indexOut) => (
        <div key={indexOut} className='game-row'>
          {outer.map((item, indexIn) => (
            <div className={`game-grid ${item}`} key={indexOut * WIDTH + indexIn}>
              {contents[indexOut * WIDTH + indexIn]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SnakeGame;
