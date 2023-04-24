import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const list = document.querySelector('.country-list');

const onInput = debounce(evt => {
  const name = evt.target.value.trim();
  if (!name) {
    countryInfo.innerHTML = '';
    list.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(optionCountry)
    .catch(error => console.log(error));
}, DEBOUNCE_DELAY);

function optionCountry(countries) {
  const arrLength = countries.length;
  if (arrLength > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryInfo.innerHTML = '';
    list.innerHTML = '';
    return;
  }
  if (arrLength === 1) {
    list.innerHTML = '';
    return reproduceCountryInfo(countries);
  }
  if (arrLength > 1) {
    countryInfo.innerHTML = '';
    return reproduceCountriesAll(countries);
  }
}

function reproduceCountryInfo(countries) {
  const markup = countries
    .map(country => {
      return `<div class="country">
      <img src="${country.flags.svg}" width="50" height="30" alt="flag of ${
        country.name.official
      }">
      <h2 class="country-title">${country.name.official}</h2></div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

function reproduceCountriesAll(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country">
      <img src="${country.flags.svg}" width="50" height="30" alt="flag of ${country.name.official}">
      <p>${country.name.official}</p></li>`;
    })
    .join('');
  list.innerHTML = markup;
}

input.addEventListener('input', onInput);
