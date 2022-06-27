import MainSection from '../MainSection';
import ProjectCard, { ProjectInput } from './ProjectCard';
import './style.scss';

const Projects = ({ projects }: { projects: Array<ProjectInput> }) => {
  return (
    <MainSection heading='projects' headingId='projects'>
      <div className='projects-container'>
        <div className='projects-viewport'>
          {projects.map((e) => (
            <ProjectCard {...e} key={e.name} />
          ))}
        </div>
      </div>
    </MainSection>
  );
};

export default Projects;
