import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

export class App extends Component {
  state = {
    searchImages: '',
  };

  handleFormSubmit = searchImages => {
    this.setState({ searchImages });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchImages={this.state.searchImages} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
