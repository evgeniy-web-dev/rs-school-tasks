const toggle = document.querySelector('.toggle');
const arrows = document.querySelectorAll('.arrow');
const map = document.querySelector('.map__bg');
let colors = {
  'base-color': '#fefefe',
  'header-color': '#ffffff',
  'font-main-color': '#333333',
  'font-secondary-color': '#4f4f4f',
  'bg-main-color': '#fbfbfb',
  'bg-secondary-color': '#f2f2f2',
  'bg-card-color': '#fefefe',
  'range-color': '#333333',
  'toggle-color': '#f2f2f2',
  'bg-page-color': '#fbfbfb',
};

let isToggle =  localStorage.getItem('isToggle') || false;
toggle.children[0].checked = localStorage.getItem('isChecked') || false;
setToggleColors()

export function toggleTheme() {
  toggle.children[0].addEventListener('change', changeTheme);
}

function changeTheme() {
  if(toggle.children[0].checked) {
    isToggle = true;
    localStorage.setItem('isToggle', true);
    localStorage.setItem('isChecked', true);
  } else {
    isToggle = false;
    localStorage.removeItem('isToggle');
    localStorage.removeItem('isChecked');
  }
  
  setToggleColors();
}

function setToggleColors() {
  for (let key in colors) {
    switch(key) {
      case 'base-color':
        colors[key] = isToggle ? '#333333' : '#fefefe';
        break;
      case 'header-color':
        colors[key] = isToggle ? '#333333' : '#ffffff';
        break;
      case 'font-main-color':
        colors[key] = isToggle ? '#fefefe' : '#333333';
        break;
      case 'font-secondary-color':
        colors[key] = isToggle ? '#f2f2f2' : '#4f4f4f';
        break;
      case 'bg-main-color':
        colors[key] = isToggle ? '#333333' : '#fbfbfb';
        break;
      case 'bg-secondary-color':
        colors[key] = isToggle ? '#4f4f4f' : '#f2f2f2';
        break;
      case 'bg-card-color':
        colors[key] = isToggle ? '#3c3c3c' : '#fefefe';
        break;
      case 'range-color':
        colors[key] = isToggle ? '#fefefe' : '#333333';
        break;
      case 'toggle-color':
        colors[key] = isToggle ? '#4f4f4f' : '#f2f2f2';
        break;
      case 'bg-page-color':
        colors[key] = isToggle ? '#4f4f4f' : '#fbfbfb';
        break;
    }
    
    document.documentElement.style.setProperty(`--${key}`, colors[key]);

    arrows.forEach(arrow => {
      if(!arrow.classList.contains('arrow--disabled')) {
        arrow.style.filter = isToggle 
          ? 'invert(100%) sepia(23%) saturate(2%) hue-rotate(166deg) brightness(109%) contrast(99%)'
          : arrow.style.filter = 'invert(15%) sepia(26%) saturate(1%) hue-rotate(314deg) brightness(95%) contrast(86%)'
      }
    });
    if(map != null) {
      map.style.filter = isToggle ? 'invert(1)' : 'invert(0)';
    }
  }
}