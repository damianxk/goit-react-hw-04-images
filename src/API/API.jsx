import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '38252665-7f08167a7ac72c66bae4a569f';
const PER_PAGE = 12;

export const fetchImages = async (searchQuery, page) => {
  try {
    const response = await axios.get(
      `${API_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );
    if (response.status !== 200) throw new Error('Request failed');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
