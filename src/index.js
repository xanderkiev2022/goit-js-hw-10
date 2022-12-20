import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetch-countries';
import {
  createCountriesList,
  createCountryInfo,
  renderCreatedMarkup,
} from './create-markup';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  clearView();
  event.preventDefault();

  searchQuery = event.target.value.trim();
  if (searchQuery === '') {
    return;
  }
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (data.length > 1 && data.length <= 10) {
        const markup = createCountriesList(data);
        renderCreatedMarkup(markup, countryList);
      }

      if (data.length === 1) {
        const markup = createCountryInfo(data[0]);
        renderCreatedMarkup(markup, countryInfo);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function clearView() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
