import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

export class Searchbar extends Component {
  state = {
    searchImages: '',
  };

  handleSearchImages = e => {
    this.setState({ searchImages: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchImages.trim() === '') {
      toast.error('Please try again!');
      return;
    }
    this.props.onSubmit(this.state.searchImages);
    this.setState({ searchImages: '' });
  };

  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className={css.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.searchFormButton}>
              <span className={css.searchFormButtonLabel}>Search</span>
            </button>

            <input
              className={css.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchImages}
              onChange={this.handleSearchImages}
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
