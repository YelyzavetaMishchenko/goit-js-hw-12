import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.createElement('div');
loader.classList.add('loader');
document.body.appendChild(loader);

let query = '';
let page = 1;
const perPage = 15;
let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.searchQuery.value.trim();
  if (!query) return;
  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');
  await searchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await searchImages();
});

async function searchImages() {
  try {
    showLoader();
    const data = await fetchImages(query, page, perPage);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'No images found for your query. Please try a different search.',
        position: 'topRight',
      });
      return;
    }

    gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
    lightbox.refresh();
    smoothScroll();

    if (page * perPage >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'End of results',
        message: 'You have reached the end of the image search results.',
        position: 'topRight',
      });
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function smoothScroll() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
