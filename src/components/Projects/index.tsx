import MainSection from '../MainSection';
import ProjectCard from './ProjectCard';
import './style.scss';

const input = {
  name: 'Wrappedify',
  imageSrc: require('../../assets/images/projects/wrappedify.png'),
  desc: 'This is a super cool project that is like really really coooool! This is a super cool project that is like really really coooool! This is a super cool project that is like really really coooool! This is a super cool project that is like really really coooool! This is a super cool project that is like really really coooool! This is a super cool project that is like really really coooool! This is a super cool project that is like really really coooool!',
  externalLink: 'https://wrappedify.herokuapp.com',
  githubLink: 'https://github.com/msohaill/wrappedify',
  tools: [
    'Python',
    'HTML',
    'CSS',
    'JavaScript',
    'AJAX',
    'jQuery',
    'D3.js',
    'Django',
    'Celery',
    'Redis',
    'Heroku',
    'PostgreSQL',
  ],
};

const Projects = () => {
  return (
    <MainSection heading='projects' headingId='projects'>
      <div className='projects-container'>
        <div className='projects-viewport'>
          <ProjectCard {...input} githubLink={undefined} />
          <ProjectCard {...input} externalLink={undefined} />
          <ProjectCard {...input} />
          <ProjectCard {...input} />
          <ProjectCard {...input} />
        </div>
      </div>
    </MainSection>
  );
};

export default Projects;
