import './style.scss';
import { NightsStayRounded, WbTwilightRounded, Menu } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/Theme';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [navVisible, setNavVisible] = useState(false);

  const toggleNavList = () => setNavVisible((prevState) => !prevState);

  window.onresize = () => window.innerWidth > 800 && navVisible && toggleNavList();

  return (
    <nav className='center nav-bar'>
      <ul className='nav-list' style={{ display: navVisible ? 'flex' : undefined }}>
        <a className='nav-link'>
          <li>experience</li>
        </a>
        <a className='nav-link'>
          <li>projects</li>
        </a>
        <a className='nav-link'>
          <li>skills</li>
        </a>
        <a className='nav-link'>
          <li>contact</li>
        </a>
        <a className='nav-link'>
          <li>photos</li>
        </a>
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
