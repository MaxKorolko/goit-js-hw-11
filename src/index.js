import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhoto } from './js/fetch-photo';
import makeGalleryCard from './js/gallery-card-render';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { perPage } from './js/fetch-photo';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMore: document.querySelector('.load-more'),
  loadMoreContainer: document.querySelector('.load-more-container'),
};

const gallery = new SimpleLightbox('.gallery__item');

refs.form.addEventListener('submit', onSearchForm);
refs.loadMore.addEventListener('click', onSeeMore);

let request = '';
let page = 0;

function onSearchForm(event) {
  event.preventDefault();
  request = event.currentTarget.elements.searchQuery.value;

  if (!request) {
    return;
  }

  page = 1;

  fetchPhoto(request.trim(), page).then(response => {
    if (response.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.form.reset();
    } else {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      refs.gallery.innerHTML = makeGalleryCard(response);
      refs.loadMoreContainer.classList.remove('is-hidden');
      gallery.refresh();
    }
  });
}

function onSeeMore(event) {
  event.preventDefault();
  page += 1;

  fetchPhoto(request, page).then(response => {
    if (perPage * page > response.data.totalHits) {
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      refs.loadMoreContainer.classList.add('is-hidden');
    } else {
      refs.gallery.insertAdjacentHTML('beforeend', makeGalleryCard(response));
      gallery.refresh();
    }
  });
}
