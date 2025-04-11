import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-js');
const loadMoreBtn = document.querySelector('.load-more-btn');

export function createGallery(images, append = false) {
  const gallery = document.querySelector('.gallery');
  if (!append) {
    gallery.innerHTML = ''; // Очищаємо галерею, якщо не додаємо зображення
  }
  gallery.innerHTML += images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a class="item-link" href="${largeImageURL}">
            <img class="img" src="${webformatURL}" alt="${tags}" />
            <ul class="statistic-list">
              <li class="statistic-item">
                <p class="statistic-text">Likes</p>
                <p class="statistic-value">${likes}</p>
              </li>
              <li class="statistic-item">
                <p class="statistic-text">Views</p>
                <p class="statistic-value">${views}</p>
              </li>
              <li class="statistic-item">
                <p class="statistic-text">Comments</p>
                <p class="statistic-value">${comments}</p>
              </li>
              <li class="statistic-item">
                <p class="statistic-text">Downloads</p>
                <p class="statistic-value">${downloads}</p>
              </li>
            </ul>
          </a>
        </li>
      `
    )
    .join('');



  new SimpleLightbox('.gallery li a', {
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('loader');
}

export function hideLoader() {
  loader.classList.remove('loader');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}

export function scrollToNewImages() {
  const firstNewImage = gallery.querySelector('.gallery-item');
  if (firstNewImage) {
    window.scrollBy({
      top: firstNewImage.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    });
  }
}
