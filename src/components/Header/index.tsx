import Navbar from '../Navabar';
import siteLogo from '../../assets/images/site-logo.png';
import siteLogoActive from '../../assets/images/site-logo-active.png';
import './style.scss';

const Header = () => {
  return (
    <div className='header-wrapper center'>
      <header className='center'>
        <img
          src={siteLogo}
          id='site-logo'
          alt='site-logo'
          onMouseOver={(e) => (e.currentTarget.src = siteLogoActive)}
          onMouseOut={(e) => (e.currentTarget.src = siteLogo)}
        />
        <Navbar />
      </header>
    </div>
  );
};

export default Header;
