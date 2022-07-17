import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ImageDetail } from '../../Photos';
import ExpandableImage from '../../Photos/ExpandableImage';
import './style.scss';

const InfiniteColumn = ({ style, images, index }: { style: object; images: ImageDetail[]; index: number }) => {
  const [visibleImages, setVisibleImages] = useState(images.slice(0, 3));
  const [imageIndex, setImageIndex] = useState(3);
  const endRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { rootMargin: '10000px 0px 1000px 0px' });
    observer.observe(endRef.current as HTMLDivElement);

    return () => observer.unobserve(endRef.current as HTMLDivElement);
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
      <div className='masonry-end' id={`column-${index}`} ref={endRef} />
    </div>
  );
};

export default InfiniteColumn;
