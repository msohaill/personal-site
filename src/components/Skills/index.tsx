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

  const skills = [
    { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    {
      name: 'PostgreSQL',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    },
    { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    {
      name: 'JavaScript',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'TypeScript',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    { name: 'CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'HTML', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'Django', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
    { name: 'C', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'Bash', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
    { name: 'Unix/Linux', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  ];

  return (
    <MainSection heading='skills' headingId='skills'>
      <div className='skill-container'>
        {skills.map((e) => (
          <div className='skill-box-wrapper'>
            <div className='skill-box'>
              <img className='skill-img' src={e.src} />
              <h4>{e.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </MainSection>
  );
};

export default Skills;
