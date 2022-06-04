import { useEffect, useState } from 'react';
import './style.scss';

const About = () => {
  const descs = ['software developer', 'student', 'music enthusiast'];

  const writeDesc = (writing: boolean, descIndex: number) => {
    const descHolder = document.getElementById('desc');
    const desc = descs[descIndex];

    if (descHolder && writing) {
      descHolder.innerHTML += desc[descHolder.innerHTML.length - 1];

      if (descHolder.innerHTML.length === desc.length + 1) {
        writing = false;
        descIndex += 1;

        if (descIndex === descs.length) descIndex = 0;
      }

      setTimeout(writeDesc, 50 + (writing ? 0 : 1600), writing, descIndex);
    } else if (descHolder && !writing) {
      descHolder.innerHTML = descHolder.innerHTML.slice(0, -1);
      if (descHolder.innerHTML.length === 1) writing = true;
      setTimeout(writeDesc, 50 + (descIndex === 0 && descHolder.innerHTML.length === 1 ? 1750 : 0), writing, descIndex);
    }
  };

  useEffect(() => {
    writeDesc(true, 0);
  }, []);

  return (
    <div className='about center'>
      <h1>
        Hi! My name is
        <br /> <span className='about-name'>Muhammad Sohail</span>
      </h1>
      <div className='about-desc center'>
        <p id='desc'> </p>
        <p id='text-caret'>|</p>
      </div>
    </div>
  );
};

export default About;
