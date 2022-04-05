import {toggleTheme} from './../../assets/scripts/toggleTheme.js';

const slider = document.querySelector('.map__slider');
const currentRangeNumber = slider.querySelector('.range__current');
const rangeValue = slider.querySelector('.range__strip');
const bubbleList = slider.querySelectorAll('.bubble');
const bubbleContainer = slider.querySelector('.slider__body--map');
const markContainer = document.querySelector('.map__list');
const markList = markContainer.querySelectorAll('.mark');
const mapBtn = document.querySelector('.map__button');

let currentSlide = 0;
let currentPosition = 0;
let lastCurrent = rangeValue.value;
let lastMark = rangeValue.value;

toggleTheme();

function sliderRange(current, value) {
  current.textContent = `0${value}/`;
  return current.textContent[1] - 1;
}

function changeActiveSlide(active, next) {
  active.classList.remove('bubble--active');
  next.classList.add('bubble--active');
}

function mapSlider(arrow) {
  let active;
  let next;

  for(let i = 0; i < bubbleList.length; i++) {
    if(bubbleList[i].classList.contains('bubble--active')) {
      active = bubbleList[i];

      if(arrow.classList.contains('arrow--right')) {
        
        if(i + 1 < 7) {
          next = bubbleList[i + 1];
        } else {
          next = bubbleList[7];
        }

        changeActiveSlide(active, next);
      }

      if(arrow.classList.contains('arrow--left')) {
        
        if(i - 1 > 0) {
          next = bubbleList[i - 1];
        } else {
          next = bubbleList[0];
        }

        changeActiveSlide(active, next);
      }

      break;
    }
  }
}

function moveActiveSlide() {
  let active;
  let next;

  for(let i = 0; i < bubbleList.length; i++) {
    if(bubbleList[i].classList.contains('bubble--active')) {
      active = bubbleList[i];

      if(rangeValue.value > lastCurrent) {
        
        if(i + 1 < 7) {
          next = bubbleList[i + 1];
        } else {
          next = bubbleList[7];
        }

        changeActiveSlide(active, next);
        lastCurrent = rangeValue.value;
        currentSlide++;
      }

      if(rangeValue.value < lastCurrent) {
        
        if(i - 1 > 0) {
          next = bubbleList[i - 1];
        } else {
          next = bubbleList[0];
        }

        changeActiveSlide(active, next);
        lastCurrent = rangeValue.value;
        currentSlide--;
      }
    }
  }
}

function moveSliderBody() {
  let widthSlide = 140;

  bubbleList.forEach(slide => {
    slide.style.transform = `translateX(${0 - widthSlide * currentPosition}px)`;
  })
}

function changeMark() {
  markList.forEach(mark => {
    mark.classList.remove('mark--active')
  })

  for(let i = 0; i < markList.length; i++) {
    if(rangeValue.value == 1 && markList[i].title == 'burned') {
      markList[i].classList.add('mark--active')
    }
    if(rangeValue.value == 2 && markList[i].title == 'panda') {
      markList[i].classList.add('mark--active')
    }
    if(rangeValue.value == 3 && markList[i].title == 'alligator') {
      markList[i].classList.add('mark--active')
    }
    if(rangeValue.value == 4 && markList[i].title == 'eagle') {
      markList[i].classList.add('mark--active')
    }
  }
}

function moveSliderWithMark(number) {
  let active;
  let next;

  rangeValue.value = number;
  sliderRange(currentRangeNumber, number);
  currentSlide = number + 1;
  
  for(let i = 0; i < bubbleList.length; i++) {
    if(bubbleList[i].classList.contains('bubble--active')) {
      active = bubbleList[i];
      next = bubbleList[number - 1];
    }
  }

  changeActiveSlide(active, next);
}

slider.addEventListener('click', (e) => {
  const arrow = e.target.parentElement;
  const arrows = slider.querySelectorAll('.arrow');

  currentSlide = rangeValue.value - 1;

  if(arrow.classList.contains('arrow--right')) {
    if(currentSlide < 7) {
      currentSlide++;

      if(currentSlide > 4 && currentSlide < 8) {
        currentPosition++;
      }

      arrows.forEach(item => item.classList.remove('arrow--disabled'));

      mapSlider(arrow);

    } else {
      currentSlide = 0;
      currentPosition = 0;
      changeActiveSlide(bubbleList[7], bubbleList[0]);
    }

  }
  if(arrow.classList.contains('arrow--left')) {

    if(currentSlide > 0) {
      currentSlide--;

      if(currentSlide > 3 && currentSlide < 8) {
        currentPosition--;
      }

      arrows.forEach(item => item.classList.remove('arrow--disabled'));

      mapSlider(arrow);

    } else {
      currentSlide = 7;
      currentPosition = 3;
      changeActiveSlide(bubbleList[0], bubbleList[7]);
    }
  }

  rangeValue.value = currentSlide + 1;
  sliderRange(currentRangeNumber, rangeValue.value);
  lastCurrent = rangeValue.value;
  moveSliderBody();
  changeMark();
});

slider.addEventListener('input', (e) => {
  sliderRange(currentRangeNumber, rangeValue.value);
  moveActiveSlide();
  moveSliderBody();
  currentPosition = (currentSlide > 4) ? currentSlide - 4 : 0;
  lastCurrent = rangeValue.value;
  changeMark();
});

markContainer.addEventListener('click', (e) => {
  markList.forEach(mark => mark.classList.remove('mark--active'));
  
  switch(e.target.parentElement.title) {
    case 'burned':
      e.target.parentElement.classList.add('mark--active');
      moveSliderWithMark(1);
      break;
    case 'panda':
      e.target.parentElement.classList.add('mark--active');
      moveSliderWithMark(2);
      break;
    case 'alligator':
      e.target.parentElement.classList.add('mark--active');
      moveSliderWithMark(3);
      break;
    case 'eagle':
      e.target.parentElement.classList.add('mark--active');
      moveSliderWithMark(4);
      break;
    default:
      moveSliderWithMark(rangeValue.value);
  }
})

bubbleContainer.addEventListener('click', (e) => {

  switch(e.target.parentElement.parentElement) {
    case bubbleList[0]:
      moveSliderWithMark(1);
      break;
    case bubbleList[1]:
      moveSliderWithMark(2);
      break;
    case bubbleList[2]:
      moveSliderWithMark(3);
      break;
    case bubbleList[3]:
      moveSliderWithMark(4);
      break;
  }
})

mapBtn.addEventListener('click', (e) => {
  markList.forEach(item => {
    if(item.classList.contains('mark--active')) {
      mapBtn.href = `./../zoos/${item.title}.html`
    }
  })
})