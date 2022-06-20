import './style.scss';
import { NightsStayRounded, WbTwilightRounded, Menu } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../contexts/Theme';
import { Link } from 'react-router-dom';
import { setNavLinkColors } from '../../../utils/set-nav-link-colors.util';

const Navbar = ({ showMain }: { showMain: boolean }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [navVisible, setNavVisible] = useState(false);

  const toggleNavList = () => setNavVisible((prevState) => !prevState);

  window.onresize = () => {
    window.innerWidth > 800 && navVisible && toggleNavList();

    setNavLinkColors();
  };

  const goToSection = (elementId: string) => {
    const element = document.getElementById(elementId) as HTMLElement;

    window.scrollTo({
      top: element.offsetTop - 150,
      behavior: 'smooth',
    });

    navVisible && toggleNavList();
  };

  return (
    <nav className='center nav-bar'>
      <ul className='nav-list' style={{ display: showMain ? (navVisible ? 'flex' : undefined) : 'none' }}>
        <button type='button' onClick={() => goToSection('experience')}>
          <li className='nav-link'>experience</li>
        </button>
        <button type='button' onClick={() => goToSection('projects')}>
          <li className='nav-link'>projects</li>
        </button>
        <a href='/#'>
          <li className='nav-link'>skills</li>
        </a>
        <li className='nav-divider'></li>
        <Link to='/photos'>
          <li className='nav-link photos-link'>photos</li>
        </Link>
      </ul>
      <button className='nav-theme' type='button' onClick={toggleTheme}>
        {theme === 'dark' ? <WbTwilightRounded /> : <NightsStayRounded />}
      </button>
      <button
        className='nav-menu'
        type='button'
        onClick={toggleNavList}
        style={{ display: showMain ? undefined : 'none' }}
      >
        <Menu />
      </button>
    </nav>
  );
};

export default Navbar;
