// const options = {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// };




export default fetchedCountry = function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
  ).then(response =>
  response.json());
  }
// export default fetchedCountry = function fetchCountries(name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
//   ).then(response => {
//     if (response.status === 200) {
//       return response.json();
//     }

//     if (response.status === 404) {
//       return Promise.reject('not found');
//     }
//   });
// };

// export const fetchCountries = name => {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
//   ).then(response => {
//     if (response.status === 200) {
//       return response.json();
//     }

//     if (response.status === 404) {
//       return Promise.reject('not found');
//     }
//   });
//   // .then(console.log);
// };
