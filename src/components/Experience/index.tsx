import ExperienceCard, { ExperienceInput } from './ExperienceCard';
import './style.scss';

const Experience = ({ experiences }: { experiences: Array<ExperienceInput> }) => {
  return (
    <div className='experience'>
      <h1 id='experience-title'>experience</h1>
      {experiences.map((e) => (
        <ExperienceCard {...e} key={e.date.start} />
      ))}
    </div>
  );
};

export default Experience;
