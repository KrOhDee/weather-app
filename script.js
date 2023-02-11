function randomWeather() {
  let states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  const state = pickRandomValue(states);
  getWeather(state);
}
async function getWeather(where) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${where}&units=imperial&APPID=cc5e5d08aa223b2a2eb9a7369797c25a`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();

    const temp = Math.round(weatherData.main.temp);
    const location = weatherData.name;
    const weatherArray = weatherData.weather;
    const weatherDesc = findWeatherKey(weatherArray);
    const feelsLike = Math.round(weatherData.main.feels_like);

    displayWeather(location, temp, feelsLike, weatherDesc);
  } catch (error) {
    const pElements = document.querySelectorAll('p');
    if (pElements.length > 0) {
      for (let i = 0; i < pElements.length; i++) {
        pElements[i].remove();
      }
    }
    let display = document.querySelector('.display');
    let errorHolder = document.createElement('p');
    errorHolder.innerText = 'Unable to find location';
    display.appendChild(errorHolder);
  }
}

function displayWeather(location, temp, feelsLike, weatherDesc) {
  const pElements = document.querySelectorAll('p');

  if (pElements.length > 0) {
    for (let i = 0; i < pElements.length; i++) {
      pElements[i].remove();
    }
  }

  const display = document.querySelector('.display');
  let rowOne = document.createElement('p');
  let rowTwo = document.createElement('p');
  let rowThree = document.createElement('p');
  let rowFour = document.createElement('p');

  rowOne.innerText = location;
  rowOne.classList.add('location');
  rowTwo.innerText = temp + '° F';
  rowThree.innerText = 'Feels like ' + feelsLike + '° F';
  rowFour.innerText = weatherDesc;

  display.appendChild(rowOne);
  display.appendChild(rowTwo);
  display.appendChild(rowThree);
  display.appendChild(rowFour);
}

function findWeatherKey(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].hasOwnProperty('main')) {
      return arr[i].main;
    }
  }
  return null;
}

function pickRandomValue(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function searchForWeather() {
  let where = document.querySelector('.search').value;
  document.querySelector('.search').value = '';
  getWeather(where);
}

document
  .querySelector('.search-btn')
  .addEventListener('click', searchForWeather);

randomWeather();
