import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/Theme';
import { CloseRounded } from '@mui/icons-material';
import Header from '..//Header';
import Footer from '../Footer';
import Masonry from '../Masonry';
import './style.scss';

const Photos = ({ images }: { images: React.ReactNode[] }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = 'Muhammad Sohail - some of my photos';
  }, []);

  window.onscroll = () => {
    const header = document.getElementsByTagName('header')[0];
    if (window.scrollY >= header.offsetHeight / 2) header.classList.add('active');
    else header.classList.remove('active');
  };

  const closeModal = () => {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
  };

  return (
    <div className={`page ${theme} center`}>
      <Header showMain={false} />
      <main className='content'>
        <Masonry cols={window.innerWidth < 800 ? 1 : window.innerWidth < 1200 ? 2 : 3} spacing={7}>
          {images}
        </Masonry>
        <div id='modal' onClick={closeModal}>
          <img id='modal-photo' onClick={(e) => e.stopPropagation()} />
          <CloseRounded id='modal-close' onClick={closeModal} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Photos;
