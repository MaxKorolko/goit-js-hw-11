import axios from 'axios';

const perPage = 40;

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '28033365-ba4821d388ed22fecf976971a';

async function fetchPhoto(request, page) {
  const fetchParams = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: request,
    per_page: perPage,
    page,
  });

  return await axios.get(`?&${fetchParams}`);
}

export { fetchPhoto, perPage };

// 28033365
