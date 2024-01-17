import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search');
const gallery = document.querySelector('.gallery');
const textInput = document.querySelector('.textInput');
const modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(e) {
  e.preventDefault();
  const value = e.target.elements.search.value;
  gallery.innerHTML = '';
  textInput.value = '';
  loader.style.display = 'block';
  fetchData(formQueryUrl(value));
}

function formQueryUrl(v) {
  const BASE_URL = 'https://pixabay.com/api';
  const OPTIONS = new URLSearchParams({
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: 'true',
    key: '29710136-0ffe1ca247b000977a61f6ae2',
  });
  return `${BASE_URL}/?q=${v}&${OPTIONS.toString()}`;
}

function fetchData(requestData) {
  fetch(requestData)
    .then(response => {
      loader.style.display = 'none';
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#FAFAFB',
          backgroundColor: '#EF4040',
          position: 'topRight',
        });
        return;
      }
      const imagesHTML = data.hits.reduce((html, image) => {
        return html + imageCard(image);
      }, '');

      gallery.innerHTML = imagesHTML;
      modal.refresh();
      
    })
    .catch(error => {
      alert(error.toString());
    });
}

function imageCard(images) {
  return `<li>
        <a href="${images.largeImageURL}">
          <img src="${images.webformatURL}" alt="${images.tags}">
        </a>
        <div class="info">
          <div class="image-info">
            <span>Likes</span>
            <span class="image-value">${images.likes}</span>
          </div>
          <div class="image-info">
            <span>Views</span>
            <span class="image-value">${images.views}</span>
          </div>
          <div class="image-info">
            <span>Comments</span>
            <span class="image-value">${images.comments}</span>
          </div>
          <div class="image-info">
            <span>Downloads</span>
            <span class="image-value">${images.downloads}</span>
          </div>
        </div>
      </li>
    `;
}