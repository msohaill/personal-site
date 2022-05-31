import './style.scss';

const Masonry = ({ children, cols, spacing }: { children: React.ReactNode[]; cols: number; spacing: number }) => {
  const createGroups = <T,>(arr: T[], numGroups: number) => {
    const perGroup = Math.ceil(arr.length / numGroups);
    return new Array(numGroups).fill('').map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
  };

  const splitImages = createGroups(children, cols);

  return (
    <div id='gallery' className='masonry-container' style={{ gap: spacing }}>
      {Array(cols)
        .fill('')
        .map((_, index) => (
          <div key={index} className='masonry-column' style={{ gap: spacing, width: `${100 / cols}%` }}>
            {splitImages[index]}
          </div>
        ))}
    </div>
  );
};

export default Masonry;
