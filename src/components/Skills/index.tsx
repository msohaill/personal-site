import { useEffect } from 'react';
import MainSection from '../MainSection';
import './style.scss';

const Skills = () => {
  useEffect(() => {
    const addObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.isIntersecting && entry.target.querySelector('.skill-box')?.classList.add('skill-animation');
        });
      },
      { threshold: 1 }
    );

    const removeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        !entry.isIntersecting && entry.target.querySelector('.skill-box')?.classList.remove('skill-animation');
      });
    });

    Array.from(document.getElementsByClassName('skill-box-wrapper')).forEach((e) => {
      addObserver.observe(e);
      removeObserver.observe(e);
    });
  }, []);

  return (
    <MainSection heading='skills' headingId='skills'>
      <div className='skill-container'>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>Python</div>
        </div>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>Redux</div>
        </div>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>PostgreSQL</div>
        </div>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>Java</div>
        </div>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>JavaScript</div>
        </div>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>TypeScript</div>
        </div>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>CSS</div>
        </div>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>HTML</div>
        </div>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>Django</div>
        </div>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>C</div>
        </div>
        <div className='skill-box-wrapper'>
          <div className='skill-box'>Bash</div>
        </div>
      </div>
    </MainSection>
  );
};

export default Skills;
