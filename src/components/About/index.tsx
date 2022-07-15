import { useEffect, useState } from 'react';
import { GitHub, LinkedIn, EmailRounded } from '@mui/icons-material';
import './style.scss';
import { Link } from 'react-router-dom';
import CustomModal from '../CustomModal';
import SnakeGame from '../SnakeGame';

const About = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const writeRoles = async (roles: Array<string>, element: HTMLElement) => {
      const writeSingleRole = async (role: string, element: HTMLElement) => {
        for (let i = 0; i < role.length; i++) {
          element.innerHTML += role[i];
          await sleep(75);
        }
      };

      const eraseSingleRole = async (role: string, element: HTMLElement) => {
        for (let i = 0; i < role.length; i++) {
          element.innerHTML = element.innerHTML.slice(0, -1);
          await sleep(75);
        }
      };

      for (;;) {
        for (const role of roles) {
          await writeSingleRole(role, element);
          await sleep(1600);
          await eraseSingleRole(role, element);
          await sleep(100);
        }
        await sleep(1500);
      }
    };

    const roles = ['software developer', 'student', 'photographer'];
    const roleHolder = document.getElementById('role') as HTMLElement;
    writeRoles(roles, roleHolder);
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
      <a
        href={`${process.env.PUBLIC_URL}static/media/Muhammad_Sohail_Resume.pdf`}
        target='_blank'
        rel='noopener noreferrer'
        className='about-link'
      >
        resume
      </a>
      <div className='about-desc'>
        {/* prettier-ignore */}
        <p>
          Welcome to my little corner of the internet! When I&apos;m not  <span className='desc-link'
          onClick={() => window.scrollTo(0, document.body.scrollHeight)}>jamming</span> or out <Link to='/photos'
          className='desc-link'>taking photos</Link>, you can usually find me at <a href='https://www.mcgill.ca'
          className='desc-link' target='_blank' rel='noopener noreferrer'>McGill University</a>, where I&apos;m currently
          studying Honours Computer Science. I&apos;m really interested in data science, AI, and web development. Apart
          from this, I enjoy playing basketball, spending time outdoors, and exploring <a
          href='https://goo.gl/maps/y21867TsVit1S4Ne8' className='desc-link' target='_blank' rel='noopener noreferrer'>
          Montréal!</a> And if you&apos;re just bored, why not play some <button className='desc-link'
          onClick={() => setOpen(true)}>snake!</button>
        </p>
        <CustomModal open={open} setOpen={setOpen}>
          <SnakeGame />
        </CustomModal>
      </div>
    </div>
  );
};

export default About;
