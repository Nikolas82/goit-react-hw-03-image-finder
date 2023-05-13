import React, { Component } from 'react';

import { queryImages } from './queryImages';
import { ToastContainer } from 'react-toastify';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Modal } from './Modal';

export class App extends Component {
  state = {
    images: [],
    searchImages: '',
    page: 1,
    isLoading: false,
    total: 0,
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchImages !== this.state.searchImages ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages(this.state.searchImages, this.state.page);
    }
  }

  fetchImages = async (searchImages, page) => {
    try {
      this.setState({ isLoading: true });
      const data = await queryImages(searchImages, page);

      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = searchImages => {
    this.setState({ searchImages, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = largeImageURL => {
    this.setState({ showModal: true, selectedImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { images, isLoading, total, showModal, selectedImage } = this.state;
    const totalPage = total / images.length;

    return (
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images} onClick={this.handleOpenModal} />
        )}
        {isLoading && <Loader />}
        {totalPage > 1 && !isLoading && images.length !== 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
        <ToastContainer autoClose={3000} />

        {showModal && (
          <Modal src={selectedImage} alt="" onClick={this.handleCloseModal} />
        )}
      </div>
    );
  }
}
