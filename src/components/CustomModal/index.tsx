import { CloseRounded } from '@mui/icons-material';
import { Modal } from '@mui/material';
import './style.scss';

const CustomModal = ({
  children,
  open,
  setOpen,
}: {
  children: JSX.Element;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)} container={document.getElementsByClassName('page')[0]}>
      <>
        <div className='modal-element'>{children}</div>
        <CloseRounded id='modal-close' onClick={() => setOpen(false)} />
      </>
    </Modal>
  );
};

export default CustomModal;
