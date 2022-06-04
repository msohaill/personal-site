import './App.scss';
import { useContext } from 'react';
import { ThemeContext } from './contexts/Theme';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';

const App = () => {
  const { theme } = useContext(ThemeContext);

  window.onscroll = () => {
    const header = document.getElementsByTagName('header')[0];
    if (window.scrollY >= header.offsetHeight / 2) header.classList.add('active');
    else header.classList.remove('active');
  };

  return (
    <div className={`page ${theme} center`}>
      <Header showMain={true} />

      <main className='content center'>
        <About />
      </main>

      <Footer />
    </div>
  );
};

export default App;
