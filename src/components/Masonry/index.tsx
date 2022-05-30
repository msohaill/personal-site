import React, { useState } from 'react';
import './styles.scss';

type MasonryArg = {
  children: React.ReactNode[];
  cols: number | { small: number; medium: number; large: number };
  spacing: number;
};

const Masonry = ({ children, cols, spacing }: MasonryArg) => {
  let resCols: number;
  if (typeof cols === 'number') resCols = cols;
  else resCols = window.innerWidth < 800 ? cols.small : window.innerWidth < 1200 ? cols.medium : cols.large;

  const createGroups = <T,>(arr: T[], numGroups: number) => {
    const perGroup = Math.ceil(arr.length / numGroups);
    return new Array(numGroups).fill('').map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
  };

  const splitImages = createGroups(children, resCols);

  return (
    <div id='gallery' className='masonry-container' style={{ gap: spacing }}>
      {Array(resCols)
        .fill('')
        .map((_, index) => (
          <div key={index} className='masonry-column' style={{ gap: spacing, width: `${100 / resCols}%` }}>
            {splitImages[index]}
          </div>
        ))}
    </div>
  );
};

export default Masonry;
