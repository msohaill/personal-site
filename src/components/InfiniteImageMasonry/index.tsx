import { ImageDetail } from '../Photos';
import InfiniteColumn from './InfiniteColumn';
import './style.scss';

export const createGroups = <T,>(arr: T[], numGroups: number) => {
  const perGroup = Math.ceil(arr.length / numGroups);
  return new Array(numGroups).fill('').map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
};

const InfiniteMasonry = ({ children, cols, spacing }: { children: ImageDetail[]; cols: number; spacing: number }) => {
  const splitImages = createGroups(children, cols);

  return (
    <div id='gallery' className='masonry-container' style={{ gap: spacing }}>
      {Array(cols)
        .fill('')
        .map((_, index) => (
          <InfiniteColumn index={index} images={splitImages[index]} style={{ gap: spacing, width: `${100 / cols}%` }} />
        ))}
    </div>
  );
};

export default InfiniteMasonry;
