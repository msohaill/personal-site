import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/Theme';
import Header from '..//Header';
import { Masonry } from '@mui/lab';

const r = require.context('../../assets/images/gallery', false, /\.(png|jpe?g|svg)$/i);
const images = r.keys().map(r) as string[];

const Photos = () => {
  const { theme } = useContext(ThemeContext);
  const [loaded, setLoaded] = useState(false);

  window.onscroll = () => {
    const header = document.getElementsByTagName('header')[0];
    if (window.scrollY >= header.offsetHeight / 2) header.classList.add('active');
    else header.classList.remove('active');
  };

  return (
    <div className={`page ${theme} center`}>
      <Header showMain={false} />
      <main className='content'>
        <Masonry columns={{ xs: 1, sm: 2, lg: 3 }} spacing={1} style={{ display: loaded ? undefined : 'none' }}>
          {images.map((item, index) => (
            <img
              src={`${item}?w=248&fit=crop&auto=format`}
              srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.substring(item.lastIndexOf('/') + 1).replace(/(\..*)(\.(png|jpe?g|svg))$/, '$2')}
              loading='eager'
              onLoad={() => index === 4 && setLoaded(true)}
              key={item.substring(item.lastIndexOf('/') + 1).replace(/(\..*)(\.(png|jpe?g|svg))$/, '$2')}
            />
          ))}
        </Masonry>
      </main>
    </div>
  );
};

export default Photos;
