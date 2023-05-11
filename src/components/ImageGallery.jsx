import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { Loader } from './Loader';
import { Button } from './Button';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';

export class ImageGallery extends Component {
  state = {
    loading: false,
    images: null,
    error: null,
    page: 1,
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchImages !== this.props.searchImages) {
      this.setState({ loading: true, page: 1, images: null });
      this.fetchImages(1);
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.handleCloseModal();
      }
    });
  }

  fetchImages = page => {
    fetch(
      `https://pixabay.com/api/?q=${this.props.searchImages}&page=${page}&key=36175777-84737cb6eab08fb199aa8dc6e&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(data =>
        this.setState(prevState => ({
          loading: false,
          images: prevState.images
            ? [...prevState.images, ...data.hits]
            : data.hits,
          error: null,
          page: page,
        }))
      )
      .catch(error => this.setState({ error, loading: false }));
  };

  handleLoadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ loading: true });
    this.fetchImages(nextPage);
  };

  handleOpenModal = largeImageURL => {
    this.setState({ showModal: true, selectedImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { images, loading, showModal, selectedImage } = this.state;

    return (
      <>
        <ul className={css.ImageGallery}>
          {images &&
            images.map(image => (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                alt=""
                largeImageURL={image.largeImageURL}
                onClick={this.handleOpenModal}
              />
            ))}
        </ul>
        {loading && <Loader />}
        {images && images.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal src={selectedImage} alt="" onClick={this.handleCloseModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchImages: PropTypes.string.isRequired,
};
