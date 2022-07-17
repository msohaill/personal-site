import './App.scss';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './contexts/Theme';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { ExperienceInput } from './components/Experience/ExperienceCard';
import { ProjectInput } from './components/Projects/ProjectCard';
import { setNavLinkColors } from './utils/set-nav-link-colors.util';
import { shuffleArray } from './utils/shuffle-array';
import experiencesData from './assets/data/experience-data.json';
import projectsData from './assets/data/project-data.json';
import skillData from './assets/data/skill-data.json';

const experiences = experiencesData.map((experience: ExperienceInput) => ({
  ...experience,
  logoSrc: require(`./assets/images/experience/${experience.logoSrc}`),
}));
const projects = projectsData.map((project: ProjectInput) => ({
  ...project,
  imageSrc: require(`./assets/images/projects/${project.imageSrc}`),
}));
const skills = shuffleArray(skillData);

const App = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = 'Muhammad Sohail';
  }, []);

  window.onscroll = () => {
    const header = document.getElementsByTagName('header')[0];

    if (window.scrollY >= header.offsetHeight / 2) header.classList.add('active');
    else header.classList.remove('active');

    setNavLinkColors();
  };

  return (
    <div className={`page ${theme} center`}>
      <Header showMain={true} />

      <main className='content center'>
        <About />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Skills skills={skills} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
