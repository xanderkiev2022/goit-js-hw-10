function createCountriesList(country) {
  return countries.reduce(
    (acc, { flags, name }) =>
      acc +
      `
    <li><img src="${flags.svg}"alt="${name.official}" width = 50px class="flag">${name.common}</li>`,
    ''
  );
}

function createCountryInfo(country) {
  const { name, capital, population, flags, languages } = country;
  return `
  <h1><img src="${flags.svg}" alt="${
    name.official
  }" width = 40px class="flag"> ${name.common}</h1> 
  <p><b>Capital:</b> ${capital}</p>
  <p><b>Population:</b> ${population}</p>
  <p><b>Languages:</b> ${Object.values(languages).join(', ')}</p>
  `;
}

function renderCreatedMarkup(markup, element) {
  element.insertAdjacentHTML('beforeend', markup);
}

export { createCountriesList, createCountryInfo, renderCreatedMarkup };
