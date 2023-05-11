import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
