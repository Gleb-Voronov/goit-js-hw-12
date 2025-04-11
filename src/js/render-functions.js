import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-js');
const loadMoreBtn = document.querySelector('.load-more-btn');

export function createGallery(images, append = false) {
  if (!gallery) {
    console.error('Елемент галереї не знайдений.');
    return;
  }

  
  const fragment = document.createDocumentFragment();

  images.forEach(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      const item = document.createElement('li');
      item.classList.add('gallery-item');

      const link = document.createElement('a');
      link.classList.add('item-link');
      link.href = largeImageURL;

      const img = document.createElement('img');
      img.classList.add('img');
      img.src = webformatURL;
      img.alt = tags;
      img.loading = 'lazy';

      const statsList = document.createElement('ul');
      statsList.classList.add('statistic-list');

      const stats = [
        { label: 'Likes', value: likes },
        { label: 'Views', value: views },
        { label: 'Comments', value: comments },
        { label: 'Downloads', value: downloads },
      ];

      stats.forEach(({ label, value }) => {
        const statItem = document.createElement('li');
        statItem.classList.add('statistic-item');

        const statText = document.createElement('p');
        statText.classList.add('statistic-text');
        statText.textContent = label;

        const statValue = document.createElement('p');
        statValue.classList.add('statistic-value');
        statValue.textContent = value;

        statItem.appendChild(statText);
        statItem.appendChild(statValue);
        statsList.appendChild(statItem);
      });

      link.appendChild(img);
      link.appendChild(statsList);
      item.appendChild(link);
      fragment.appendChild(item);
    }
  );

 
  if (!append) {
    gallery.innerHTML = '';
  }

  
  gallery.appendChild(fragment);

 
  new SimpleLightbox('.gallery li a', {
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();
}

export function clearGallery() {
  if (gallery) {
    gallery.innerHTML = '';
  } else {
    console.error('Елемент галереї не знайдений.');
  }
}

export function showLoader() {
  if (loader) {
    loader.classList.add('loader');
  } else {
    console.error('Елемент завантажувача не знайдений.');
  }
}

export function hideLoader() {
  if (loader) {
    loader.classList.remove('loader');
  } else {
    console.error('Елемент завантажувача не знайдений.');
  }
}

export function showLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    console.error('Елемент кнопки "Load more" не знайдений.');
  }
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('hidden');
  } else {
    console.error('Елемент кнопки "Load more" не знайдений.');
  }
}

export function scrollToNewImages() {
  if (gallery) {
    const firstNewImage = gallery.querySelector('.gallery-item');
    if (firstNewImage) {
      window.scrollBy({
        top: firstNewImage.getBoundingClientRect().height * 2,
        behavior: 'smooth',
      });
    }
  } else {
    console.error('Елемент галереї не знайдений.');
  }
}
