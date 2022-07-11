import { useState } from 'react';
import CustomModal from '../../CustomModal';
import './style.scss';

const ExpandableImage = ({ image, className }: { image: { src: string; alt: string }; className?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={image.src}
        alt={image.alt}
        loading='eager'
        className={className}
        onClick={() => {
          setOpen(true);
        }}
      />
      <CustomModal open={open} setOpen={setOpen}>
        <img id='modal-photo' src={image.src} alt={image.alt} />
      </CustomModal>
    </>
  );
};

export default ExpandableImage;
