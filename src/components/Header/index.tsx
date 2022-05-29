import Navbar from '../Navabar';
import siteLogo from '../../assets/images/site-logo.png';
import siteLogoActive from '../../assets/images/site-logo-active.png';
import './style.scss';

const Header = () => {
    return (
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
    );
};

export default Header;
