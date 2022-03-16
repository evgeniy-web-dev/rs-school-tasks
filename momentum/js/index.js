'use strict'
import { quotesEn } from './quotesEn.js';
import { quotesRu } from './quotesRu.js';
import { lang } from './lang.js';
const images = [];
let currentSlide = addZero(getRandomNum(1, 20));
let currentLanguage = 'en';
let currentQuoteNum = 0;
let currentAudio;
window.addEventListener('load', preloadImages)

function preloadImages() {
  let periods = ['night', 'morning', 'afternoon', 'evening'];
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 21; j++) {
      let image = new Image();
      image.src = `https://raw.githubusercontent.com/evgeniy-web-dev/stage1-tasks/assets/images/${periods[i]}/${addZero(j)}.jpg`;
      images.push(image);
    }
  }
  appInit();
}

function appInit() {
  setInterval(timeManager, 500);
  localManager()
  backgroundManager()
  getWeather()
  quoteManager()
  audioManager()
  settingsManager()
}

function timeManager() {
  const date = new Date();

  (currentLanguage == 'en') ? sayHello(date.getHours()) : sayHelloR(date.getHours())
  showCurrentTime(date.getHours(), date.getMinutes(), date.getSeconds())
  showDate(date.getDate(), date.getDay(), date.getMonth())

  function showCurrentTime(h, m, s) {
    const hour = document.querySelector('.time-h');
    const minute = document.querySelector('.time-m');
    const seconds = document.querySelector('.time-s');
    hour.textContent = addZero(h);
    minute.textContent = addZero(m);
    seconds.textContent = addZero(s);
  }
  function showDate(date, day, month) {
    const dayObj = (currentLanguage == 'en') ? {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    } : {
      0: 'Воскресенье',
      1: 'Понедельник',
      2: 'вторник',
      3: 'Среда',
      4: 'Четверг',
      5: 'Пятница',
      6: 'Суббота',
    };
    const monthObj = (currentLanguage == 'en') ? {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    } : {
      0: 'Январь',
      1: 'Фквраль',
      2: 'Март',
      3: 'апрель',
      4: 'Май',
      5: 'Июнь',
      6: 'Июль',
      7: 'Август',
      8: 'Сентябрь',
      9: 'Октябрь',
      10: 'Ноябрь',
      11: 'Декабрь',
    };

    document.querySelector('.date-day').textContent = `${dayObj[day]}, `;
    document.querySelector('.date-month').textContent = monthObj[month];
    document.querySelector('.date-num').textContent = date;
  }
  function sayHello(time) {
    let dayPeriod = (time < 6 || time == 24) ? 'night' :
      (time < 12) ? 'morning' : (time < 18) ? 'afternoon' : 'evening';
    document.querySelector('.hello__text').textContent = `Good, ${dayPeriod}`;
  }
  function sayHelloR(time) {
    let dayPeriod = (time < 6 || time == 24) ? 'Доброй ночи, ' :
      (time < 12) ? 'Доброе утро, ' : (time < 18) ? 'Добрый день, ' : 'Добрый вечер, ';
    document.querySelector('.hello__text').textContent = dayPeriod;
  }
}
function localManager() {
  const userName = document.querySelector('.user__name');
  const userCity = document.querySelector('.user__city');

  userName.addEventListener('change', saveUserName);
  userCity.addEventListener('change', saveUserCity);
  getLocalProperties();


  function getLocalProperties() {
    if (localStorage.getItem('userName')) userName.value = localStorage.getItem('userName');
    if (localStorage.getItem('userCity')) userCity.value = localStorage.getItem('userCity');
  }

  function saveUserName() {
    localStorage.setItem('userName', this.value);
  }
  function saveUserCity() {
    localStorage.setItem('userCity', this.value);
    getWeather(localStorage.getItem('userCity'))
  }
}
function backgroundManager() {
  changeBackground()
  backgroundSlider()

  function changeBackground() {
    const bgDate = new Date();
    const dayPeriodBg = (bgDate.getHours() < 6 || bgDate.getHours() == 24) ? 'night' :
      (bgDate.getHours() < 12) ? 'morning' : (bgDate.getHours() < 18) ? 'afternoon' : 'evening';
    const imageLink = images.filter(image => image.src == `https://raw.githubusercontent.com/evgeniy-web-dev/stage1-tasks/assets/images/${dayPeriodBg}/${currentSlide}.jpg`)[0];
    document.querySelector('body').style.background = `url(${imageLink.src}) center / cover no-repeat`;
  }
  function backgroundSlider() {
    const arrows = document.querySelectorAll('.button-slider');
    let timer = true;

    arrows.forEach(arrow => arrow.addEventListener('click', changeCurrentSlide))

    function changeCurrentSlide() {
      (this.classList.contains('button-slider-r')) ? nextSlide() : prevSlide();

      function prevSlide() {
        const prewArrow = document.querySelector('.button-slider-l')
        if (timer) {
          prewArrow.classList.add('active-arrow')
          currentSlide = addZero(+currentSlide - 1);
          if (+currentSlide < 1) currentSlide = 20;
          timer = false;
          changeBackground()
          setTimeout(() => {
            timer = true;
            prewArrow.classList.remove('active-arrow')
          }, 700)
        }
      }

      function nextSlide() {
        const nextArrow = document.querySelector('.button-slider-r')
        if (timer) {
          nextArrow.classList.add('active-arrow')
          currentSlide = addZero(+currentSlide + 1);
          if (+currentSlide > 20) currentSlide = '01';
          timer = false;
          changeBackground()

          setTimeout(() => {
            timer = true;
            nextArrow.classList.remove('active-arrow')
          }, 700)
        }
      }
    }
  }
}

async function getWeather(city) {
  if (city == null) city = 'minsk';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${(currentLanguage == 'en') ? 'en' : 'ru'}&appid=052d91374bd32073e60e2c409c2a2625&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  const temp = document.querySelector('.weather__temperature');
  const wind = document.querySelector('.weather__wind');
  const humidity = document.querySelector('.weather__humidity');
  const weatherIcon = document.querySelector('.weather__image');
  const error = document.querySelector('.weather__error');
  const userCity = document.querySelector('.user__city');
  userCity.value = data.name || userCity.value;
  (data.cod == '404') ? showError() : showWeather();


  function showWeather() {
    (currentLanguage == 'en') ? (
      temp.textContent = `${Math.round(data.main.temp)}°C ${data.weather[0].description}`,
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`,
      humidity.textContent = `humidity:  ${data.main.humidity}%`,
      weatherIcon.className = 'weather__image owf',
      weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    ) : (
      temp.textContent = `${Math.round(data.main.temp)}°C ${data.weather[0].description}`,
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`,
      humidity.textContent = `Влажность:  ${data.main.humidity}%`,
      weatherIcon.className = 'weather__image owf',
      weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    );
    hideError()
  }
  function showError() {
    temp.style.display = 'none';
    wind.style.display = 'none';
    humidity.style.display = 'none';
    weatherIcon.style.display = 'none';
    error.style.display = 'block';
    error.textContent = `${(currentLanguage == 'en') ? ('Error! City not found for') : ('Ошибка! Город не найден для ')} ${document.querySelector('.user__city').value}!`
  }
  function hideError() {
    temp.style.display = 'block';
    wind.style.display = 'block';
    humidity.style.display = 'block';
    weatherIcon.style.display = 'block';
    error.style.display = 'none';
  }
}
function quoteManager() {
  showQuote()
  changeQuote()

  function showQuote() {
    const quoteContainer = document.querySelector('.quote-text');
    const quoteAuthorContainer = document.querySelector('.quote-author');
    currentQuoteNum = getRandomNum(0, 17);
    let randomQuote = (currentLanguage == 'en') ? quotesEn[currentQuoteNum] : quotesRu[currentQuoteNum];
    quoteContainer.textContent = randomQuote.text;
    quoteAuthorContainer.textContent = randomQuote.author || 'Anonimus';
  }
  function changeQuote() {
    const quoteButton = document.querySelector('.button-quote');
    quoteButton.addEventListener('click', animateButton)
  }
  function animateButton() {
    const quoteButton = document.querySelector('.button-quote');
    quoteButton.classList.add('button-quote-active')
    quoteButton.removeEventListener('click', animateButton)
    setTimeout(() => {
      quoteButton.classList.remove('button-quote-active')
      showQuote()
      quoteButton.addEventListener('click', animateButton)
    }, 500)
  }
}
function audioManager() {
  const playButton = document.querySelector('.audio__button-play');
  const playNextButton = document.querySelector('.audio__button-next');
  const playPrevButton = document.querySelector('.audio__button-prev');
  const audios = document.querySelectorAll('[data-track]');
  let trackNum = 0;
  currentAudio = audios[trackNum];

  playButton.addEventListener('click', useAudio)
  playNextButton.addEventListener('click', playNextAudio)
  playPrevButton.addEventListener('click', playPrevAudio)

  showAudioNames()
  progressBarManager()
  function showAudioNames() {
    audios.forEach((audio, i) => {
      const audioList = document.querySelector('.audio__list');
      const audioElement = document.createElement('li');
      audioElement.classList.add('audio__track');
      audioElement.dataset.num = `${i}`;
      audioElement.addEventListener('click', playPerClick)
      if (i == 0) audioElement.classList.add('audio__track-active');
      audioElement.textContent = Object.values(audios[i].dataset);
      audioList.append(audioElement)
    })
  }

  function progressBarManager() {
    const progressBar = document.querySelector('.input__bar');
    const progressThumb = document.querySelector('.progress__thumb');
    const currentProgress = document.querySelector('.progress__bar');

    currentAudio.addEventListener('timeupdate', changeProgress)
    progressBar.oninput = changeAudioProgress;
    function changeAudioProgress() {
      changeThumbPosition()
      changeCurrentProgress()
      changeCurrentTime()
    }

    function changeProgress() {
      const audioProgress = Math.round(currentAudio.currentTime / currentAudio.duration * 100);
      progressBar.value = audioProgress;
      changeThumbPosition()
      changeCurrentProgress()
    }
    function changeCurrentTime() {
      currentAudio.currentTime = currentAudio.duration / 100 * progressBar.value;
    }
    function changeThumbPosition() {
      progressThumb.style.left = progressBar.value + '%';
    }
    function changeCurrentProgress() {
      currentProgress.style.width = progressBar.value + '%';
    }
  }
  function playPerClick() {
    let isPlay = !currentAudio.paused;
    pauseAudio(isPlay)
    trackNum = Object.values(this.dataset)[0];
    currentAudio = audios[trackNum]
    useAudio()
  }
  function useAudio() {
    let isPlay = !currentAudio.paused;
    (isPlay) ? pauseAudio(isPlay) : playAudio(isPlay);
  }
  function playAudio(isPlay) {
    currentAudio.play();
    progressBarManager()
    changePlayButton(isPlay)
    markPlayTrack()
    currentAudio.onended = () => playNextAudio()
  }
  function pauseAudio(isPlay = false) {
    currentAudio.pause();
    changePlayButton(isPlay)
  }
  function playNextAudio() {
    pauseAudio()
    trackNum = (trackNum < audios.length - 1) ? +trackNum + 1 : 0;
    currentAudio = audios[trackNum];
    currentAudio.currentTime = 0;
    playAudio()
  }
  function playPrevAudio() {
    pauseAudio()
    trackNum = (trackNum < 1) ? audios.length - 1 : +trackNum - 1;
    currentAudio = audios[trackNum];
    currentAudio.currentTime = 0;
    playAudio()
  }

  function changePlayButton(isPlay) {
    playButton.children[0].src = `assets/svg/${isPlay ? 'play' : 'pause'}.svg`;
  }
  function markPlayTrack() {
    const tracks = document.querySelectorAll('.audio__track')
    tracks.forEach(track => track.classList.remove('audio__track-active'))
    tracks[trackNum].classList.add('audio__track-active')
  }
}

function settingsManager() {
  const settingsButton = document.querySelector('.settings-button');
  const settingsMenu = document.querySelector('.settings');
  const languages = document.querySelectorAll('.lang');
  const hidenBlocks = document.querySelectorAll('.hide-input');

  let isMenuOpen = false;

  hidenBlocks.forEach(block => block.addEventListener('click', toggleBlock))
  settingsButton.addEventListener('click', openSettingsMenu)
  languages.forEach(language => language.addEventListener('click', makeLanguageActive))

  function makeLanguageActive() {
    languages.forEach(language => language.classList.remove('lang-active'))
    this.classList.add('lang-active')
    currentLanguage = (this.textContent == 'ру' || this.textContent == 'ru') ? 'ru' : 'en';
    changeLanguage()
  }
  function changeLanguage() {
    const userName = document.querySelector('.user__name');
    const langElems = document.querySelectorAll('.lng');
    langElems.forEach(langElem => langElem.innerHTML = lang[currentLanguage][Object.values(langElem.dataset)])
    timeManager()
    getWeather(localStorage.getItem('userCity'))
    translateQuote()
    function translateQuote() {
      const quoteContainer = document.querySelector('.quote-text');
      const quoteAuthorContainer = document.querySelector('.quote-author');
      let randomQuote = (currentLanguage == 'en') ? quotesEn[currentQuoteNum] : quotesRu[currentQuoteNum];
      quoteContainer.textContent = randomQuote.text;
      quoteAuthorContainer.textContent = randomQuote.author || 'Anonimus';
    }
    (currentLanguage == 'en') ? userName.placeholder = '[Enter name]' : userName.placeholder = '[Введите имя]';
  }

  function openSettingsMenu() {
    (isMenuOpen) ? (
      settingsMenu.classList.remove('settings-open'),
      settingsMenu.classList.add('settings-closed'),
      isMenuOpen = false
    ) : (
      settingsMenu.classList.remove('settings-closed'),
      settingsMenu.classList.add('settings-open'),
      isMenuOpen = true
    )
  }

  function toggleBlock() {
    const userBlock = document.querySelector(`.${Object.values(this.dataset)}`);
    if (userBlock.classList.contains('audio')) {
      currentAudio.pause();
      document.querySelector('.audio__button-play').children[0].src = `assets/svg/play.svg`;
    };
    (userBlock.classList.contains('object-hide')) ?
        (userBlock.classList.add('object-show'),
        userBlock.classList.remove('object-hide'),
        setTimeout(() =>
          userBlock.classList.remove('object-show')
          , 1000)
      ) : userBlock.classList.add('object-hide');
  }
}
function getRandomNum(minU, maxU) {
  let max = Math.floor(maxU);
  let min = Math.ceil(minU);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addZero(num) {
  return (num.toString().length == 1) ? '0' + num : num;
}
