import './css/styles.css';
import fetchCountries from './api-service';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

let searchQuery = '';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();

  searchQuery = event.target.value.trim();
  clearView();
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
        const markup = createTenCountries(data);
        addMarkup(markup, countryList);
      }
      if (data.length === 1) {
        const markup = createOneCountry(data[0]);
        addMarkup(markup, countryInfo);
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

function iterateCounties(countries) {
  return countries.map(createCountryList).join('');
}

function createCountryList(country) {
  return `
  <li>
  <img src="${country.flags.svg}"alt="${country.name}" width = 50px class="flag"> 
  ${country.name}</li>
  `;
}

function createCountryInfo(country) {
  const languages = country.languages
    .map(language => {
      return language.name;
    })
    .join(', ');

  return `
  <h1><img src="${country.flags.svg}" alt="${country.name}" width = 40px class="flag"> ${country.name}</h1> 
  <p><b>Capital:</b> ${country.capital}</p>
  <p><b>Population:</b> ${country.population}</p>
  <p><b>Languages:</b> ${languages}</p>
  `;
}