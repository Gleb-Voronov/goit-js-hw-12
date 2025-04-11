import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
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
const perPage = 15;
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
    const response = await fetchImages(currentQuery, currentPage);
    const images = response.hits;

    if (images.length === 0) {
      iziToast.warning({
        message: 'На жаль, за вашим запитом нічого не знайдено. Спробуйте інший запит!',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
      clearGallery();
      loadMoreBtn.style.display = 'none';
      hideLoader();
      return;
    }

    clearGallery();
    createGallery(images);

    if (response.totalHits <= currentPage * perPage) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: 'На жаль, ви досягли кінця результатів пошуку.',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }

    hideLoader();
  } catch (error) {
    console.error('Error fetching images:', error);
    loadMoreBtn.style.display = 'none';
    iziToast.info({
      message: 'На жаль, сторінки закінчилися.',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    clearGallery();
    hideLoader();
  }
}

async function loadMoreImages() {
  currentPage += 1;
  showLoader();

  try {
    const response = await fetchImages(currentQuery, currentPage);
    const images = response.hits;

    if (images.length === 0) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: 'На жаль, ви досягли кінця результатів пошуку.',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    createGallery(images, true);
    scrollToNewImages(images.length);

    if (response.totalHits <= currentPage * perPage) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: 'На жаль, ви досягли кінця результатів пошуку.',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    }

    hideLoader();
  } catch (error) {
    console.error('Error fetching images:', error);
    loadMoreBtn.style.display = 'none';
    iziToast.info({
      message: 'На жаль, сторінки закінчилися.',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    hideLoader();
  }
}

function scrollToNewImages(newItemsCount) {
  const gallery = document.querySelector('.gallery');
  const galleryItems = gallery.querySelectorAll('.gallery-item');
  const totalItems = galleryItems.length;
  const newItems = Array.from(galleryItems).slice(totalItems - newItemsCount);

  if (newItems.length === 0) return;

  const totalHeight = newItems.reduce((sum, item) => sum + item.offsetHeight, 0);

  window.scrollBy({
    top: totalHeight * 2,
    behavior: 'smooth',
  });
}
