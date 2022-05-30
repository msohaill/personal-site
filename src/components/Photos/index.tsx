import { useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme';
import Header from '..//Header';
import Masonry from '../Masonry';

const shuffleArray = (arr: any[]) => {
  let i = arr.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

const r = require.context('./assets/images/gallery', false, /\.(png|jpe?g|svg)$/i);
const images = shuffleArray(r.keys().map(r)) as string[];

const Photos = () => {
  const { theme } = useContext(ThemeContext);

  window.onscroll = () => {
    const header = document.getElementsByTagName('header')[0];
    if (window.scrollY >= header.offsetHeight / 2) header.classList.add('active');
    else header.classList.remove('active');
  };

  return (
    <div className={`page ${theme} center`}>
      <Header showMain={false} />
      <main className='content'>
        <Masonry cols={window.innerWidth < 800 ? 1 : window.innerWidth < 1200 ? 2 : 3} spacing={7}>
          {images.map((item) => (
            <img
              src={item}
              alt={item.substring(item.lastIndexOf('/') + 1).replace(/(\..*)(\.(png|jpe?g|svg))$/, '$2')}
              key={item.substring(item.lastIndexOf('/') + 1).replace(/(\..*)(\.(png|jpe?g|svg))$/, '$2')}
              loading='eager'
            />
          ))}
        </Masonry>
      </main>
    </div>
  );
};

export default Photos;
