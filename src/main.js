import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader-js');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSubmit(event) {
  event.preventDefault();

  currentQuery = event.target.elements.text.value.trim();
  if (!currentQuery) {
    return;
  }

  currentPage = 1;
  showLoader();

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);
    const images = response.data.hits;
    if (images.length === 0) {
      iziToast.warning({
        message: 'На жаль, за вашим запитом нічого не знайдено. Спробуйте інший запит!',
        messageColor: '#ffffff',
      });
      loadMoreBtn.style.display = 'none'; 
      clearGallery()
      hideLoader();
      return;
    }
    createGallery(images);
    if (response.data.totalHits > currentPage * 15) {
      loadMoreBtn.style.display = 'block';
    }
    hideLoader();
  } catch (error) {
    console.error(error.message);
  }
}

async function loadMoreImages() {
  currentPage += 1;
  showLoader();

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);
    const images = response.data.hits;
    if (images.length === 0) {
      loadMoreBtn.style.display = 'none'; 
      iziToast.info({
        message: "На жаль, ви досягли кінця результатів пошуку.",
        messageColor: '#ffffff',
      });
      hideLoader();
      return;
    }
    createGallery(images, true); 
    if (response.data.totalHits <= currentPage * 15) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "На жаль, ви досягли кінця результатів пошуку.",
        messageColor: '#ffffff',
      });
    }
    hideLoader();
    scrollToNewImages();
  } catch (error) {
    console.error(error.message);
  }
}

function scrollToNewImages() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lastItem = galleryItems[galleryItems.length - 1];
  if (lastItem) {
    const { top } = lastItem.getBoundingClientRect();
    window.scrollBy({
      top: top - 100,
      behavior: 'smooth',
    });
  }
}
