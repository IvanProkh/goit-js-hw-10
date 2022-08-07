// Используй публичный API Rest Countries, а именно ресурс name, возвращающий массив объектов стран удовлетворивших критерий поиска.
// *Добавь минимальное оформление элементов интерфейса.

// Напиши функцию fetchCountries(name) которая делает HTTP - запрос на ресурс name и возвращает промис с массивом стран
// - результатом запроса.Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.

//     Фильтрация полей
// *В ответе от бэкенда возвращаются объекты, большая часть свойств которых тебе не пригодится. Чтобы сократить объем передаваемых данных добавь строку параметров запроса - так этот бэкенд реализует фильтрацию полей. Ознакомься с документацией синтаксиса фильтров.
// *Тебе нужны только следующие свойства:
// *name.official - полное имя страны
// *capital - столица
// *population - население
// *flags.svg - ссылка на изображение флага
// *languages - массив языков

// Поле поиска
// *Название страны для поиска пользователь вводит в текстовое поле input#search-box. HTTP-запросы выполняются при наборе имени страны, то есть по событию input. Но, делать запрос при каждом нажатии клавиши нельзя, так как одновременно получится много запросов и они будут выполняться в непредсказуемом порядке.

// Необходимо применить приём Debounce на обработчике события и делать HTTP-запрос спустя 300мс после того, как пользователь перестал вводить текст.
// *Используй пакет lodash.debounce.

// *Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает.

// *Выполни санитизацию введенной строки методом trim(), это решит проблему когда в поле ввода только пробелы или они есть в начале и в конце строки.

// *Если бэкенд вернул от 2 - х до 10 - х стран, под тестовым полем отображается список найденных стран.Каждый элемент списка состоит из флага и имени страны.

// *Если результат запроса это массив с одной страной, в интерфейсе отображается разметка карточки с данными о стране: флаг, название, столица, население и языки.

// *Обработка ошибки
// *Если пользователь ввёл имя страны которой не существует, бэкенд вернёт не пустой массив, а ошибку со статус кодом 404 - не найдено.Если это не обработать, то пользователь никогда не узнает о том, что поиск не дал результатов.Добавь уведомление "Oops, there is no country with that name" в случае ошибки используя библиотеку notiflix.

import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import fetchCountries from './fetchCountries';

// import { fetchCountries } from './fetchCountries';

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onHandleInput, DEBOUNCE_DELAY));

function onHandleInput(e) {
  const inputValue = e.target.value;
  console.log('~ inputValue', inputValue);


  if (inputValue.trim().toLowerCase().length > 0) {

      
    fetchCountries(inputValue)
      .then(data => {
        console.log('начальная дата', data);

         if (data.length === 1) {
          renderFullInfo(data);
          console.log('один елемент')
        } else if (data.length > 1 && data.length <= 10) {
          renderList(data);
          console.log('больше одного елемента')
        } else {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } 
      })
      .catch(err => {
        console.log('~ err', err);
        renderError();
      });
    } else if(inputValue.length === 0) {
      console.log('нет елементов')
      renderEmpty();
    }
  }

function renderList(data) {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
  console.log('список стран', data);

  data.forEach(item => {
    const { name, flags } = item;

    const countryItem = document.createElement('li');
    countryItem.classList.add('country-item');
    countryItem.innerHTML = `
    <div class="flag">
      <img src="${flags.png}" alt="${name.official}">
    </div>
    <div class="country-name">${name.official}</div>
    `;
    refs.countryList.appendChild(countryItem);
  
  });
}

function renderFullInfo(data) {
  console.log('одна страна', data);
  refs.countryList.innerHTML = '';
  const { name, flags, capital, population, languages } = data[0];
  const { official } = name;
  const { png } = flags;
  refs.countryInfo.innerHTML = `
  <div class="country-item">
    <div class="flag">
      <img src="${png}" alt="${official}">
    </div>
    <div class="country-name">${official}</div>
  </div>
  <div class="country-capital"><span class="country-element">Capital:</span> ${capital}</div>
  <div class="country-population"><span class="country-element">Population:</span> ${population}</div>
  <div class="country-languages"><span class="country-element">Languages:</span> ${Object.values(languages).map(item => item).join(', ')}</div>
  `;
}


// ${languages.map(item => item.name).join(', ')


  // refs.countryInfo.insertAdjacentHTML(
  //   'beforeend',`
  //       <div class="flag">
  //           <img src="${data.flags.png}" alt="${data.name.official}">
  //       </div>
  //       <div class="country-info">
  //           <h3 class="country-name">${data.name.official}</h3>
  //           <p class="capital">Capital: ${data.capital}</p>
  //           <p class="population">Population: ${data.population}</p>
  //           <p class="languages">Languages: ${Object.values(data.languages)}</p>
  //       </div>
  //   `);
// }

function renderError() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function renderEmpty() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}





// function debounce(func, delay) {
//   let timeoutId;

//   return function (...args) {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// }
