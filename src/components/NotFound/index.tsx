import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/Theme';
import Footer from '../Footer';
import Header from '../Header';
import './style.scss';

const NotFound = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = 'Muhammad Sohail - Not Found';
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
        <div className='not-found'>
          <h1>404: Page not found</h1>
          <p>Whoops! Seems like the page you're looking for does not exist</p>
          <Link to='/' className='desc-link'>
            Go home instead
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
