import MainSection from '../MainSection';
import ProjectCard from './ProjectCard';
import './style.scss';

const Projects = () => {
  return (
    <MainSection heading='projects' headingId='projects'>
      <div className='projects-container'>
        <div className='projects-viewport'>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </MainSection>
  );
};

export default Projects;
