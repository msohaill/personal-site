import { GitHub, Launch } from '@mui/icons-material';
import ExpandableImage from '../../Photos/ExpandableImage';
import './style.scss';

export type ProjectInput = {
  name: string;
  imageSrc: string;
  externalLink?: string;
  githubLink?: string;
  desc: string;
  tools: Array<string>;
};

const ProjectCard = (project: ProjectInput) => {
  return (
    <>
      <div className='project-card'>
        <ExpandableImage image={{ src: project.imageSrc, alt: project.name }} className='project-picture' />
        <div className='project-title'>
          <h2>{project.name}</h2>
          {project.externalLink && (
            <a href={project.externalLink} target='_blank' rel='noopener noreferrer'>
              <Launch className='project-link' />
            </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target='_blank' rel='noopener noreferrer'>
              <GitHub className='project-link' />
            </a>
          )}
        </div>
        <p dangerouslySetInnerHTML={{ __html: project.desc }}></p>
        <ul className='project-tools'>
          {project.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProjectCard;
