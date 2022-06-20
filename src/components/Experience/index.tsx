import MainSection from '../MainSection';
import ExperienceCard, { ExperienceInput } from './ExperienceCard';

const Experience = ({ experiences }: { experiences: Array<ExperienceInput> }) => {
  return (
    <MainSection heading='experience' headingId='experience'>
      {experiences.map((e) => (
        <ExperienceCard {...e} key={e.date.start} />
      ))}
    </MainSection>
  );
};

export default Experience;
