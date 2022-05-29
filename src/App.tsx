import logo from './logo.svg';
import './App.scss';
import { useContext } from 'react';
import { ThemeContext } from './contexts/Theme';
import Header from './components/Header';

const App = () => {
  const { theme } = useContext(ThemeContext);

  window.onscroll = () => {
    const header = document.getElementsByTagName('header')[0];
    if (window.scrollY >= header.offsetHeight / 2) header.classList.add('active');
    else header.classList.remove('active');
  };

  return (
    <div className={`app ${theme} center`}>
      <Header />
      <div className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </div>
    </div>
  );
};

export default App;
