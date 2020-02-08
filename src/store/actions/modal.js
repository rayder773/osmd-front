import modalTypes from '../types/modal';

function openModal(id) {
  return {
    type: modalTypes.OPEN_MODAL,
    payload: id,
  };
}

function closeModal() {
  return {
    type: modalTypes.CLOSE_MODAL,
  };
}

export { openModal, closeModal };
