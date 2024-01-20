import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const searchForm = document.querySelector('.search');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.moreBtn');
const textInput = document.querySelector('.textInput');
const loader = document.querySelector('.loader');
const modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const perPage = 40;

let currentPage = 1;
let queryValue = ''; // current value of the search

searchForm.addEventListener('submit', onSearchSubmit);
moreBtn.addEventListener('click', onMoreSubmit);

function onSearchSubmit(e) { // functions on search submit for search form
  e.preventDefault(); // cancels the event on search submit
  queryValue = e.target.elements.search.value; // get the value of the search
  gallery.innerHTML = '';
  textInput.value = '';
  loader.style.visibility = 'visible';
  currentPage = 1;
  fetchDataBtn(formQueryUrl(queryValue, currentPage));
}

function onMoreSubmit(e) { // function on more submit button
  moreBtn.style.visibility = 'hidden'; // more button is hidden
  loader.style.visibility = 'visible'; // loader is visible
  currentPage += 1; // increment the current page
  moreDataBtn(formQueryUrl(queryValue, currentPage));
}

function formQueryUrl(value, page) { // form url with query value
  const BASE_URL = 'https://pixabay.com/api';
  const OPTIONS = new URLSearchParams({
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: 'true',
    key: '29710136-0ffe1ca247b000977a61f6ae2',
    per_page: perPage,
    page,
  });
  return `${BASE_URL}/?q=${value}&${OPTIONS.toString()}`;
}

async function fetchDataBtn(requestData) { // fetch data, form result and resulting page
  try {
    currentPage = 1;
    const response = await axios.get(requestData); // fetch data
    loader.style.visibility = 'hidden'; // loader is hidden
    if (response.status !== 200) {
      myAlert(response.status); // show error message from server
    }
    if (response.data.hits.length === 0) { // no hits from server
      myAlert(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    const imagesHTML = response.data.hits.reduce((html, image) => {
      return html + imageRender(image);
    }, '');
    gallery.insertAdjacentHTML('beforeend', imagesHTML); // add images set to gallery
    modal.refresh(); // refresh SimpleLightbox
    if (response.data.totalHits > currentPage * 40) { // check if out of total page hits
      moreBtn.style.visibility = 'visible'; // show more button
    } else {
      moreBtn.style.visibility = 'hidden'; // hide more button
      myAlert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    myAlert(error.toString()); // show more error message
  }
}

async function moreDataBtn(requestData) { // button for more search results
  try {
    const response = await axios.get(requestData);
    loader.style.visibility = 'hidden'; // loader is hidden
    if (response.status !== 200) {
      myAlert(response.status); // show error message from server
    }
    if (response.data.hits.length === 0) {
      myAlert(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    const imagesHTML = response.data.hits.reduce((html, image) => {
      return html + imageRender(image);
    }, '');
    gallery.insertAdjacentHTML('beforeend', imagesHTML); // add images set to gallery
    modal.refresh(); // refresh SimpleLightbox
    if (response.data.totalHits > currentPage * 40) {
      moreBtn.style.visibility = 'visible';
      setScrolling(); // scroll to show more images
    } else {
      moreBtn.style.visibility = 'hidden';
      moreBtn.removeEventListener('click', onMoreSubmit) // remove event listener for more button to release resources 
      myAlert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    myAlert(error.toString()); // show more error message
  }
}

function setScrolling() { // set scrolling gallery
  window.scrollBy({
    top: gallery.getBoundingClientRect().height * 0.04,
    behavior: 'smooth',
  });
}

function myAlert(message) { // alert message in iziToast form
  iziToast.error({
    message: message,
    messageColor: '#FAFAFB',
    backgroundColor: '#EF4040',
    position: 'topRight',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
  });
}

function imageRender(images) { // render fetched images
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
