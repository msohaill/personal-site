import './style.scss';
import { LocationOnOutlined, CalendarMonthOutlined } from '@mui/icons-material';

export type ExperienceInput = {
  logoSrc: string;
  title: string;
  company: string;
  location: string;
  date: {
    start: string;
    end: string;
  };
  desc: string;
};

const ExperienceCard = (experience: ExperienceInput) => {
  return (
    <div className='experience-card'>
      <div className='experience-header center'>
        <div className='experience-logo-holder center'>
          <img alt='pattern logo' className='experience-logo' src={experience.logoSrc} />
        </div>
        <div className='experience-divider' />
        <div className='experience-main'>
          <h2>{experience.title}</h2>
          <div className='experience-main-info'>
            <h4>{experience.company}</h4>
            <div className='experience-info-with-icon'>
              <LocationOnOutlined />
              <h4>{experience.location}</h4>
            </div>
            <div className='experience-info-with-icon'>
              <CalendarMonthOutlined />
              <h4>
                {experience.date.start} - {experience.date.end}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className='experience-desc'>
        <p dangerouslySetInnerHTML={{ __html: experience.desc }}></p>
      </div>
    </div>
  );
};

export default ExperienceCard;
