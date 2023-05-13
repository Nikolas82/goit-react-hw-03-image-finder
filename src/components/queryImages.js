import axios from 'axios';

export const queryImages = async (searchImages, page) => {
  try {
    const images = await axios.get(
      `https://pixabay.com/api/?q=${searchImages}&page=${page}&key=36175777-84737cb6eab08fb199aa8dc6e&image_type=photo&orientation=horizontal&per_page=12`
    );

    return images.data;
  } catch (error) {
    console.log(error);
  }
};
