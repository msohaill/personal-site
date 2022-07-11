import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/Theme';
import Header from '..//Header';
import Footer from '../Footer';
import Masonry from '../Masonry';

const Photos = ({ images }: { images: JSX.Element[] }) => {
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
        <Masonry cols={window.innerWidth < 800 ? 1 : window.innerWidth < 1200 ? 2 : 3} spacing={7}>
          {images}
        </Masonry>
      </main>

      <Footer />
    </div>
  );
};

export default Photos;
