import { GitHub, Launch } from '@mui/icons-material';
import { setModalImage } from '../../../utils/set-modal-image';
import ImageModal from '../../ImageModal';
import './style.scss';

type ProjectInput = {
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
        <img
          style={{ cursor: 'pointer' }}
          src={project.imageSrc}
          className='project-picture'
          onClick={() => setModalImage(project.imageSrc)}
          alt={project.name}
        />
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
        <p>{project.desc}</p>
        <ul className='project-tools'>
          {project.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
      <ImageModal />
    </>
  );
};

export default ProjectCard;
