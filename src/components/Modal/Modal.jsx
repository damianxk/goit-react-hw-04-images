import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ src, alt, onClick }) => {
  const closeModal = event => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      onClick();
    }
  };

  useEffect(
    () => {
      window.addEventListener('keydown', closeModal);
      window.addEventListener('mousedown', closeModal);

      return () => {
        window.removeEventListener('keydown', closeModal);
        window.removeEventListener('mousedown', closeModal);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={css.wrapper} onClick={closeModal}>
      <div className={css.modal_window}>
        <img src={src} alt={alt} className={css.modalImage} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
