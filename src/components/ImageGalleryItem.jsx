import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGalleryItem = ({ src, alt, largeImageURL, onClick }) => {
  const handleClick = () => {
    onClick(largeImageURL);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        className={css.ImageGalleryItemImage}
        onClick={handleClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
