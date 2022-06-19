import Navbar from './Navbar';
import siteLogo from '../../assets/images/site-logo.png';
import siteLogoActive from '../../assets/images/site-logo-active.png';
import './style.scss';
import { Link } from 'react-router-dom';

const Header = ({ showMain }: { showMain: boolean }) => {
  const headerLogo = (
    <img
      src={siteLogo}
      id='site-logo'
      alt='site-logo'
      onMouseOver={(e) => (e.currentTarget.src = siteLogoActive)}
      onMouseOut={(e) => (e.currentTarget.src = siteLogo)}
    />
  );

  return (
    <header className='center'>
      {window.location.pathname === '/' ? (
        <button onClick={() => window.scrollTo(0, 0)}>{headerLogo}</button>
      ) : (
        <Link to='/'>{headerLogo}</Link>
      )}
      <Navbar showMain={showMain} />
    </header>
  );
};

export default Header;
