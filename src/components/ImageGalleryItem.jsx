import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li key={image.id}>
      <img
        className={css.ImageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onClick(image.largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),

  onClick: PropTypes.func.isRequired,
};
