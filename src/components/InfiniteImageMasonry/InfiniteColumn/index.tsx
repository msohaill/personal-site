import { useCallback, useEffect, useState } from 'react';
import { ImageDetail } from '../../Photos';
import ExpandableImage from '../../Photos/ExpandableImage';
import './style.scss';

const InfiniteColumn = ({ style, images, index }: { style: object; images: ImageDetail[]; index: number }) => {
  const [visibleImages, setVisibleImages] = useState(images.slice(0, 3));
  const [imageIndex, setImageIndex] = useState(3);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && imageIndex < images.length) {
          setVisibleImages([...visibleImages, images[imageIndex]]);
          setImageIndex(imageIndex + 1);
        }
      });
    },
    [visibleImages, imageIndex, images]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { rootMargin: '0px 0px 800px 0px' });
    observer.observe(document.getElementById(`column-${index}`) as HTMLElement);
  }, [handleObserver, index]);

  return (
    <div className='masonry-column' style={style}>
      {visibleImages.map((image) => (
        <div
          className='img-container'
          key={image.src.substring(image.src.lastIndexOf('/') + 1).replace(/(\..*)(\.(png|jpe?g|svg))$/i, '$2')}
        >
          <ExpandableImage image={{ src: image.src, alt: image.caption }} />
          <p className='img-info'>{`${image.caption} | ${image.location} | ${image.date}`}</p>
        </div>
      ))}
      <div className='masonry-end' id={`column-${index}`} />
    </div>
  );
};

export default InfiniteColumn;
