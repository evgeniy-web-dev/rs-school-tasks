import {toggleTheme} from './assets/scripts/toggleTheme.js';
import {pseudorandom} from './assets/scripts/pseudorandom.js';

toggleTheme();
pseudorandom();

const operationsSlider = document.querySelector('.operations__slider');
const sliders = document.querySelectorAll('.slider');
const currentTopValue = document.querySelector('.range__strip--top').value;
const btnDonateList = document.querySelectorAll('.donate-btn');
const popup = document.querySelector('.popup');
const popupBtn = popup.querySelector('.popup__button');

let currentSlide = 0;
let currentTimerSlide = 0;
let currentTopSlide = 0;
let lastCurrentTop = currentTopValue;

setInterval(() => {
  let currentRangeNumber = operationsSlider.querySelector('.range__current');
  let rangeValue = operationsSlider.querySelector('.range__strip');

  if (currentTimerSlide < 3) {
    currentTimerSlide++;
    rangeValue.value = currentTimerSlide + 1
  }  else {
    currentTimerSlide = 0;
    rangeValue.value = 1;
  }
  
  timerSlider(currentTimerSlide);
  sliderRange(currentRangeNumber, currentTimerSlide + 1);
}, 4000);

function infinitySlider(slider, arrow, currentPage) {
  let width = slider.children[0].clientWidth;
  let slideList = slider.querySelectorAll('.slide');

  if(arrow.classList.contains('arrow--left')) {
    slideList.forEach(slide => {
      slide.style.transform = `translateX(${0 - (width * currentPage)}px)`;
    })
  }

  if(arrow.classList.contains('arrow--right')) {
    slideList.forEach(slide => {
      slide.style.transform = `translateX(${0 - (width * currentPage)}px)`;
    })
  }

  return currentPage;
}

function timerSlider(currentSlide) {
  let sliderList = operationsSlider.querySelectorAll('.slide');
  let width = operationsSlider.clientWidth;

  sliderList.forEach(slide => {
    slide.style.transform = `translateX(${0 - (width * currentSlide)}px)`;
  })
}

function sliderRange(current, value) {
  current.textContent = `0${value}/`;
  return current.textContent[1] - 1;
}

function moveSliderTop(slider, current) {
  let slideList = slider.querySelectorAll('.slide');
  let width = slider.querySelector('.slide').clientWidth + 30;
  
  slideList.forEach(slide => {
    slide.style.transform = `translateX(${width - (width * current)}px)`;
  })
}

function showNextTopSlide(slider, active, target, currentTopSlide) {
  moveSliderTop(slider, currentTopSlide)
  changeActiveTopSlide(active, target)
}

function showPrevTopSlide(slider, active, target, currentTopSlide) {
  moveSliderTop(slider, currentTopSlide)
  changeActiveTopSlide(active, target)
}

function changeActiveTopSlide(active, next) {
  let btnActive = active.querySelectorAll('.btn');
  let btnNextActive = next.querySelectorAll('.btn');
  let contentActive = active.querySelector('.slide__content');
  let contentNext = next.querySelector('.slide__content');

  btnActive.forEach(btn => btn.classList.add('btn--small'));
  btnNextActive.forEach(btn => btn.classList.remove('btn--small'));

  contentActive.classList.add('slide__content--small');
  contentNext.classList.remove('slide__content--small')

  active.classList.remove('slide--active');
  next.classList.add('slide--active');
}

function changePopup(e) {
  btnDonateList.forEach(donate => {
    if(donate === e.target || donate === e.target.parentElement) {
      popup.classList.add('popup--open');
      document.body.style.overflow = 'hidden';
    }
  })

  if(e.target.classList.contains('popup__overflow')) {
    popup.classList.remove('popup--open');
    document.body.style.overflow = 'scroll';
  }

  if(popupBtn === e.target || popupBtn === e.target.parentElement) {
    e.preventDefault();
    popup.classList.remove('popup--open');
    document.body.style.overflow = 'scroll';
  }
}

document.body.addEventListener('click', (e) => {
  const arrow = e.target.parentElement;
  let slider = e.path[3];
  let currentRangeNumber = slider.querySelector('.range__current');
  let rangeValue = slider.querySelector('.range__strip');

  changePopup(e);

  if(arrow.classList.contains('arrow')) {
    currentSlide = rangeValue.value - 1;
    
    if(arrow.classList.contains('arrow--right')) {
      currentSlide < 7 ? currentSlide++ : currentSlide = 0;
    }
    if(arrow.classList.contains('arrow--left')){
      currentSlide > 0 ? currentSlide-- : currentSlide = 7;
    }

    rangeValue.value = currentSlide + 1;
    infinitySlider(slider, arrow, currentSlide);
    sliderRange(currentRangeNumber, currentSlide + 1);
  }

  if(slider.parentElement.classList.contains('top__slider')) {
    const activeSlide = slider.querySelector('.slide--active');
    const onClickSlide = e.target.parentElement.parentElement;
    const currentTopNumber = slider.parentElement.querySelector('.range__current');
    const valueTop = slider.parentElement.querySelector('.range__strip');

    currentTopSlide = valueTop.value - 1;
    
    if(onClickSlide === activeSlide.nextElementSibling) {
      currentTopSlide++;
      showNextTopSlide(slider, activeSlide, onClickSlide, currentTopSlide);
    }
    
    if(onClickSlide === activeSlide.previousElementSibling) {
      currentTopSlide--;
      showPrevTopSlide(slider, activeSlide, onClickSlide, currentTopSlide);
    }

    valueTop.value = currentTopSlide + 1;
    lastCurrentTop = valueTop.value;

    sliderRange(currentTopNumber, currentTopSlide + 1)
  }
});

document.body.addEventListener('input', (e) => {
  let slider = e.path[3];
  let arrow = slider.querySelector('.arrow');
  let currentRangeNumber = slider.querySelector('.range__current');
  let rangeValue = slider.querySelector('.range__strip');

  if(e.target.parentElement.classList.contains('range')) {
    sliderRange(currentRangeNumber, rangeValue.value);
    
    if(slider.classList.contains('pets__slider') || slider.classList.contains('testimonials__slider')) {
      currentSlide = e.target.value - 1;
      infinitySlider(slider, arrow, currentSlide);
    }

    if(slider.classList.contains('operations__slider')) {
      currentTimerSlide = e.target.value - 1;
      timerSlider(currentTimerSlide);
    }

    if(slider.classList.contains('top__slider')) {
      let active;
      let next;
      const slides = slider.querySelectorAll('.slide');
      currentTopSlide = e.target.value - 1;
      
      for(let i = 0; i < slides.length; i++) {
        if(slides[i].classList.contains('slide--active')) {
          if(e.target.value > lastCurrentTop) {
            active = slides[i];
            
            if(i + 1 < 7) {
              next = slides[i + 1];
            } else {
              next = slides[7]
            }

            showNextTopSlide(slider, active, next, currentTopSlide)
            lastCurrentTop = e.target.value;
            currentTopSlide++;
          }
          if(e.target.value < lastCurrentTop) {
            active = slides[i];

            if(i - 1 > 0) {
              next = slides[i - 1];
            } else {
              next = slides[0]
            }

            showPrevTopSlide(slider, active, next, currentTopSlide);
            lastCurrentTop = e.target.value;
            currentTopSlide--;
          }
        }
      }
    }
  }
});