import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Content, IconClose } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener(`keydown`, handleKeyDown);

    return () => window.removeEventListener(`keydown`, handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <IconClose onClick={onClose} />
      <Content>{children}</Content>
    </Overlay>,
    modalRoot
  );
}

export default Modal;

Modal.prototype = {
  onClose: PropTypes.func,
};
