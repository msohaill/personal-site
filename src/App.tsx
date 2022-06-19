import './App.scss';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './contexts/Theme';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Experience from './components/Experience';
const experiencesData = require('./assets/data/experience-data.json');

const experiences = experiencesData.map((experience: any) => ({
  ...experience,
  logoSrc: require(`./assets/images/experience/${experience.logoSrc}`),
}));

const App = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = 'Muhammad Sohail';
  }, []);

  window.onscroll = () => {
    const header = document.getElementsByTagName('header')[0];
    const experience = document.getElementById('experience-title') as HTMLElement;

    const navLinks = Array.from(document.getElementsByClassName('nav-link') as HTMLCollectionOf<HTMLElement>);

    if (window.scrollY >= header.offsetHeight / 2) header.classList.add('active');
    else header.classList.remove('active');

    switch (true) {
      case window.scrollY < experience.offsetTop - window.innerHeight / 2:
        navLinks.forEach((element) => {
          element.style.color = '';
        });
        break;
      default:
        navLinks[0].style.color = '#af4d54';
    }
  };

  return (
    <div className={`page ${theme} center`}>
      <Header showMain={true} />

      <main className='content center'>
        <About />
        <Experience experiences={experiences} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
