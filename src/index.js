import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// countryList.textContent = 'Type the country name';

searchBox.addEventListener('input', debounce(onSearch, 1000));

function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.value;
  countryList.textContent = searchQuery;
  fetchCountries(searchQuery);

  // event.target.reset();

  //   API.fetch(searchQuery)
//     .then(renderCard)
//     .catch(onFetchError)
//     .finally(() => form.reset());
}

function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}`)
    .then(response => response.json())
    .then(data => renderCountries(data));
}

function renderCountries(data) {
    console.log(data)
  const flag = data[0].flags.png;
const markup = `<img src="${flag}" alt="{{name}}"></img>`
countryInfo.insertAdjacentHTML('beforeend', markup);

}





// function onFetchError(error) {
//   alert('error!');
// }


