import axios from 'axios';

export class imgApi {
  BASE_URL = 'https://pixabay.com/api/';
  API_KEY = '32447292-607f396f27b1a7487e1dc502e';

  pageNumber = 1;

  fetchPhotos(name) {
    return axios.get(`${this.BASE_URL}`, {
      params: {
        key: this.API_KEY,
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.pageNumber,
        per_page: 40,
      },
    });
  }
}
