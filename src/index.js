import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import card from './teamplates/card.hbs';

import { imgApi } from './find_pic_on_serwer.js';

const form = document.querySelector('#search-form');
const input = document.getElementsByName('searchQuery')[0];
const imageBox = document.querySelector('.gallery');
const butt = document.getElementsByTagName('button')[0];
const loadButt = document.querySelector('.load-more');

let imageName = input.value;
// let pageNumber = 1;
const galery = new SimpleLightbox('.gallery__item');

const imgAapi = new imgApi();

async function getImg(imageName) {
  const response = await imgAapi.fetchPhotos(imageName);
  try {
    if (response.data.totalHits === 0) {
      throw new Error();
    } else if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results.",
        loadButt.classList.add('hide')
      );
    } else {
      loadButt.classList.remove('hide');
      imageBox.insertAdjacentHTML('beforeend', card(response.data.hits));
    }
    galery.refresh();
  } catch (err) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function inputImage(el) {
  el.preventDefault();
  imageName = el.target.searchQuery.value.trim();
  imgAapi.pageNumber = 1;

  if (imageName.length === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  imageBox.innerHTML = '';

  getImg(imageName);
}

function addPhotos() {
  loadButt.classList.add('hide');
  imgAapi.pageNumber += 1;
  getImg(imageName);
  galery.refresh();
}

form.addEventListener('submit', inputImage);
loadButt.addEventListener('click', addPhotos);
