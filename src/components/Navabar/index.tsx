import './style.scss';
import { NightsStayRounded, WbTwilightRounded, Menu } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/Theme';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [, setVisibleNav] = useState(false);

  const toggleNavList = () => {
    const navList = document.getElementsByClassName('nav-list')[0] as HTMLElement;

    setVisibleNav((prevState) => {
      if (prevState) {
        navList.classList.remove('nav-list-visible');
        navList.style.transform = 'translateY(0)';
      } else {
        navList.classList.add('nav-list-visible');
        navList.style.transform = 'translateY(calc(100% + 6em))';
      }
      return !prevState;
    });
  };

  return (
    <nav className='center nav-bar'>
      <ul className='nav-list'>
        <li>
          <a className='nav-link'>experience</a>
        </li>
        <li>
          <a className='nav-link'>projects</a>
        </li>
        <li>
          <a className='nav-link'>skills</a>
        </li>
        <li>
          <a className='nav-link'>contact</a>
        </li>
      </ul>
      <button className='nav-theme' type='button' onClick={toggleTheme}>
        {theme === 'dark' ? <WbTwilightRounded /> : <NightsStayRounded />}
      </button>
      <button className='nav-menu' type='button' onClick={toggleNavList}>
        <Menu />
      </button>
    </nav>
  );
};

export default Navbar;
