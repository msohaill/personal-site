export const setModalImage = (src: string) => {
  const modal = document.getElementById('modal') as HTMLElement;
  const modalPhoto = document.getElementById('modal-photo') as HTMLImageElement;

  modalPhoto.src = src;
  modal.style.display = 'flex';
};
