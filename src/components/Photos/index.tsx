import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/Theme';
import Header from '../Header';
import Footer from '../Footer';
import InfiniteImageMasonry from '../InfiniteImageMasonry';
const imagesData = require('../../assets/data/image-data.json');

const shuffleArray = <T,>(arr: T[]) => {
  let i = arr.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

const r = require.context('../../assets/images/gallery', false, /\.(png|jpe?g|svg)$/i);
const imageDetails: Array<ImageDetail> = (shuffleArray(r.keys().map(r)) as string[]).map((src) => ({
  src: src,
  ...imagesData[src.substring(src.lastIndexOf('/') + 1).replace(/(\..*)(\.(png|jpe?g|svg))$/i, '$2')],
}));

export type ImageDetail = {
  src: string;
  caption: string;
  date: string;
  location: string;
};

const Photos = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = 'Muhammad Sohail - Some of My Photos';
  }, []);

  window.onscroll = () => {
    const header = document.getElementsByTagName('header')[0];
    if (window.scrollY >= header.offsetHeight / 2) header.classList.add('active');
    else header.classList.remove('active');
  };

  return (
    <div className={`page ${theme} center`}>
      <Header showMain={false} />

      <main className='content'>
        <InfiniteImageMasonry cols={window.innerWidth < 800 ? 1 : window.innerWidth < 1200 ? 2 : 3} spacing={8}>
          {imageDetails}
        </InfiniteImageMasonry>
      </main>

      <Footer />
    </div>
  );
};

export default Photos;
