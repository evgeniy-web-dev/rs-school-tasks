import {toggleTheme} from './../../assets/scripts/toggleTheme.js';

toggleTheme();

const videos = document.querySelectorAll('.video__item');
const mainVideo = document.querySelector('.video__main');
const videoContainer = document.querySelector('.video__list');
const dots = document.querySelectorAll('.dot');
let lastMainSrc;

videoContainer.addEventListener('click', (e) => {
  lastMainSrc = mainVideo.src;

  videos.forEach(video => {
    if(video === e.target.parentElement) {
      mainVideo.src = e.target.parentElement.children[0].src;
      e.target.parentElement.children[0].src = lastMainSrc;
    }
  })
})

document.querySelector('.video__dots').addEventListener('click', (e) => {
  let width = videoContainer.clientWidth;
  
  if(e.target.classList.contains('dot')) {
    for(let i = 0; i < dots.length; i++) {
      if(dots[i] != e.target) {
        dots[i].classList.remove('dot--active');
      } else {
        dots[i].classList.add('dot--active')
      }
    }
  
    dots.forEach((dot, index) => {    
      if(dot === e.target) {
        for(let i = 0; i < videos.length; i++) {
          videos[i].style.transform = `translateX(${0 - (width * index)}px)`;
        }
      }
    })
  }
})

const slider = document.querySelector('.pet__slider');
const slideList = slider.querySelectorAll('.slider__item');

let current = 0;
let currentSlide = 0;

function changeActiveSlide(active, next) {
  active.classList.remove('bubble--active');
  next.classList.add('bubble--active');
}

function moveActiveSlide(arrow) {
  let active;
  let next;

  for(let i = 0; i < slideList.length; i++) {
    if(slideList[i].classList.contains('bubble--active')) {
      active = slideList[i];

      if(arrow.classList.contains('arrow--right')) {
        
        if(i + 1 < 7) {
          next = slideList[i + 1];
        } else {
          next = slideList[7];
        }

        changeActiveSlide(active, next);
      }

      if(arrow.classList.contains('arrow--left')) {
        
        if(i - 1 > 0) {
          next = slideList[i - 1];
        } else {
          next = slideList[0];
        }

        changeActiveSlide(active, next);
      }

      break;
    }
  }
}

slider.addEventListener('click', (e) => {
  const arrow = e.target.parentElement;
  const arrows = slider.querySelectorAll('.arrow');

  if(arrow.classList.contains('arrow--right')) {
    if(current < 7) {
      current++;
      arrows.forEach(item => item.classList.remove('arrow--disabled'));
    }
    if(current === 7) {
      arrow.classList.add('arrow--disabled');
    }

    if(current < 5) {
      currentSlide++;
    }

    slideList.forEach(slide => {
      slide.style.transform = `translateY(${0 - currentSlide * 105}px)`
    })

    moveActiveSlide(arrow)
  }

  if(arrow.classList.contains('arrow--left')) {
    if(current > 0) {
      current--;
      arrows.forEach(item => item.classList.remove('arrow--disabled'));
    }

    if(current === 0) {
      arrow.classList.add('arrow--disabled');
    }

    if(current < 5) {
      currentSlide--;

      if(current === 0) {
        currentSlide = 0;
      }
    }

    slideList.forEach(slide => {
      slide.style.transform = `translateY(${0 - currentSlide * 105}px)`
    })

    moveActiveSlide(arrow)
  }
})