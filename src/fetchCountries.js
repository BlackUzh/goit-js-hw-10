import Notiflix from 'notiflix';

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        Notiflix.Notify.failure('Your country not found')
      );
    }
    return response.json();
  });
}

export { fetchCountries };
