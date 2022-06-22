import { CloseRounded } from '@mui/icons-material';
import './style.scss';

const ImageModal = () => {
  const closeModal = () => {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
  };

  return (
    <div id='modal' onClick={closeModal}>
      <img id='modal-photo' onClick={(e) => e.stopPropagation()} />
      <CloseRounded id='modal-close' onClick={closeModal} />
    </div>
  );
};

export default ImageModal;
