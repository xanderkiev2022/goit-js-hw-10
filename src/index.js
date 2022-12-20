import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetch-countries';
import { createCountriesList, createCountryInfo,} from './js/create-markup';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  clearView();
  event.preventDefault();
  const searchQuery = event.target.value.trim();

  if (searchQuery === '') return;

  fetchCountries(searchQuery)
    .then(data => {
      if (data.length === 1) {
        countryInfo.insertAdjacentHTML('beforeend', createCountryInfo(data[0]))}
      if (data.length > 1 && data.length <= 10) {
        countryList.insertAdjacentHTML('beforeend', createCountriesList(data));}
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');}})
    .catch(error => {
        Notify.failure('Oops, there is no country with that name');});
}

function clearView() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}