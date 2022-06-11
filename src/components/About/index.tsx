import { useEffect } from 'react';
import { GitHub, LinkedIn, EmailRounded } from '@mui/icons-material';
import './style.scss';
import resume from '../../assets/pdf/Muhammad_Sohail_Resume.pdf';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    const roles = ['software developer', 'student', 'photographer'];

    const writeRole = (writing: boolean, roleIndex: number) => {
      const roleHolder = document.getElementById('role');
      const role = roles[roleIndex];

      if (roleHolder && writing) {
        roleHolder.innerHTML += role[roleHolder.innerHTML.length - 1];

        if (roleHolder.innerHTML.length === role.length + 1) {
          writing = false;
          roleIndex += 1;
          if (roleIndex === roles.length) roleIndex = 0;
        }

        setTimeout(writeRole, 75 + (writing ? 0 : 1600), writing, roleIndex);
      } else if (roleHolder && !writing) {
        roleHolder.innerHTML = roleHolder.innerHTML.slice(0, -1);
        if (roleHolder.innerHTML.length === 1) writing = true;
        setTimeout(
          writeRole,
          75 + (roleIndex === 0 && roleHolder.innerHTML.length === 1 ? 1750 : 0),
          writing,
          roleIndex
        );
      }
    };

    writeRole(true, 0);
  }, []);

  return (
    <div className='about center'>
      <h1>
        Hi! My name is
        <br /> <span className='about-name'>Muhammad Sohail</span>
      </h1>
      <div className='about-role center'>
        <p id='role'> </p>
        <p id='text-caret'>|</p>
      </div>
      <div className='about-links center'>
        <a href='https://github.com/msohaill/' target='_blank' rel='noopener noreferrer' className='about-icon'>
          <GitHub />
        </a>
        <a
          href='https://www.linkedin.com/in/mhsohail56/'
          target='_blank'
          rel='noopener noreferrer'
          className='about-icon'
        >
          <LinkedIn />
        </a>
        <a href='mailto:muhammad.sohail@mail.mcgill.ca' className='about-icon'>
          <EmailRounded />
        </a>
      </div>
      <a href={resume} target='_blank' rel='noopener noreferrer' className='about-link'>
        resume
      </a>
      <div className='about-desc'>
        {/* prettier-ignore */}
        <p>
          Welcome to my little corner of the internet! When I'm not  <span className='desc-link' 
          onClick={() => window.scrollTo(0, document.body.scrollHeight)}>jamming</span> or out <Link to='/photos' 
          className='desc-link'>taking photos</Link>, you can usually find me at <a href='https://www.mcgill.ca' 
          className='desc-link' target='_blank' rel='noopener noreferrer'>McGill University</a>, where I'm currently 
          studying Honours Computer Science. I'm really interested in data science, AI, and web development. Apart
          from this, I enjoy playing basketball, spending time outdoors, and exploring <a 
          href='https://goo.gl/maps/y21867TsVit1S4Ne8' className='desc-link' target='_blank' rel='noopener noreferrer'>
          Montréal</a>!
        </p>
      </div>
    </div>
  );
};

export default About;
