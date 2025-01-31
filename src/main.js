import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

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
    const data = await fetchImages(query, page, perPage);
    if (data.hits.length === 0) {
      alert('No images found. Try a different search query.');
      return;
    }

    gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
    lightbox.refresh();

    if (page * perPage >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      alert("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    alert('Something went wrong. Please try again later.');
  }
}
