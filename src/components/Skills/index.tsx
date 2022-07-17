import MainSection from '../MainSection';
import { motion } from 'framer-motion';
import './style.scss';
import { SettingsRounded } from '@mui/icons-material';

export type SkillInput = {
  name: string;
  src?: string;
};

const Skills = ({ skills }: { skills: Array<SkillInput> }) => {
  return (
    <MainSection heading='skills' headingId='skills'>
      <div className='skill-container'>
        {skills.map((e) => (
          <motion.div
            key={e.name}
            className='skill-box'
            initial='hidden'
            whileInView='visible'
            variants={{
              visible: {
                y: 0,
                transition: {
                  type: 'spring',
                },
              },
              hidden: { y: 80 },
            }}
          >
            {e.src ? <img className='skill-img' src={e.src} alt={e.name} /> : <SettingsRounded fontSize='large' />}
            <h4>{e.name}</h4>
          </motion.div>
        ))}
      </div>
    </MainSection>
  );
};

export default Skills;
