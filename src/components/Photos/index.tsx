import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/Theme';
import { shuffleArray } from '../../utils/shuffle-array';
import Header from '../Header';
import Footer from '../Footer';
import InfiniteImageMasonry from '../InfiniteImageMasonry';
import imagesRaw from '../../assets/data/image-data.json';
import './style.scss';

const imagesData: { [key: string]: { caption: string; location: string; date: string } } = imagesRaw;
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
        <h1>Photos</h1>
        <p style={{ margin: '20px 0px 50px 0px' }}>
          Here&apos;s a collection of some photos I&apos;ve taken over the years that I really like (and hope you do as
          well!)
        </p>
        <InfiniteImageMasonry cols={window.innerWidth < 800 ? 1 : window.innerWidth < 1200 ? 2 : 3} spacing={8}>
          {imageDetails}
        </InfiniteImageMasonry>
      </main>

      <Footer />
    </div>
  );
};

export default Photos;
