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
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('#country-list'),
  countryInfo: document.querySelector('#country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e) {
  const inputValue = e.target.value;
  console.log('~ inputValue', inputValue);

  if (inputValue.trim().length > 0) {
    fetchCountries(inputValue)
      .then(data => {
        console.log('~ data', data);

        if (data.length > 0) {
          renderList(data);
        } else {
          renderError();
        }
      })
      .catch(err => {
        console.log('~ err', err);
        renderError();
      });
  } else {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }
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

function renderError() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
  Notiflix.Notify.Failure('Oops, there is no country with that name');
}

function renderList(data) {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
  data.forEach(item => {
    const countryItem = document.createElement('li');
    countryItem.classList.add('country-item');
    countryItem.innerHTML = `
                <div class="flag">
                    <img src="${item.flag}" alt="${item.name}">
                </div>
                <div class="country-info">
                    <h3 class="country-name">${item.name}</h3>
                    <p class="capital">Capital: ${item.capital}</p>
                    <p class="population">Population: ${item.population}</p>
                    <p class="languages">Languages: ${item.languages}</p>
                </div>
            `;
    refs.countryList.appendChild(countryItem);
  });
}

function renderInfo(data) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = `
        <div class="flag">
            <img src="${data.flag}" alt="${data.name}">
        </div>
        <div class="country-info">
            <h3 class="country-name">${data.name}</h3>
            <p class="capital">Capital: ${data.capital}</p>
            <p class="population">Population: ${data.population}</p>
            <p class="languages">Languages: ${data.languages}</p>
        </div>
    `;
}

// Notiflix.Notify.success('Sol lucet omnibus');