import Navbar from './Navbar';
import siteLogo from '../../assets/images/site-logo.png';
import siteLogoActive from '../../assets/images/site-logo-active.png';
import './style.scss';
import { Link } from 'react-router-dom';

const Header = ({ showMain }: { showMain: boolean }) => {
  return (
    <header className='center'>
      <Link to='/'>
        <img
          src={siteLogo}
          id='site-logo'
          alt='site-logo'
          onMouseOver={(e) => (e.currentTarget.src = siteLogoActive)}
          onMouseOut={(e) => (e.currentTarget.src = siteLogo)}
        />
      </Link>
      <Navbar showMain={showMain} />
    </header>
  );
};

export default Header;
