const petsSlideWrapper = document.querySelector('.slider__body--pets');
const cardsWrapper = document.querySelector('.slider__body--testimonials');
const petsList = document.querySelectorAll('.slide--pets');
const cardsList = document.querySelectorAll('.slide--testimonials');
let pets = [];
let fullPetsList = [];
let cards = [];
let fullCardsList = [];


export function pseudorandom() {
  clearPetsSlideWrapper();
  petsList.forEach(elem => pets.push(elem));

  clearCardsWrapper();
  cardsList.forEach(elem => cards.push(elem));
  
  fullPetsList = (() => {
    let tempArr = [];

    for(let i = 0; i < 4; i++) {
      const newPetsSlide = pets;

      for(let j = pets.length; j > 0; j--) {
        let randomIndex = Math.floor(Math.random() * j);
        const randomElement = newPetsSlide.splice(randomIndex, 1)[0];
        newPetsSlide.push(randomElement)
      }

      tempArr = [...tempArr, ...newPetsSlide]
    }

    return tempArr;
  })();

  fullCardsList = (() => {
    let tempArr = [];

    for(let i = 0; i < 4; i++) {
      const newCardsSlide = cards;

      for(let j = cards.length; j > 0; j--) {
        let randomIndex = Math.floor(Math.random() * j);
        const randomElement = newCardsSlide.splice(randomIndex, 1)[0];
        newCardsSlide.push(randomElement)
      }

      tempArr = [...tempArr, ...newCardsSlide]
    }

    return tempArr;
  })();

  fullPetsList = sortSlide(fullPetsList, 4, 8);
  fullCardsList = sortSlide(fullCardsList, 2, 4);
  
  createPetsSlide(fullPetsList);
  createCardsSlide(fullCardsList);
}

const clearPetsSlideWrapper = () => petsSlideWrapper.innerHTML = '';
const clearCardsWrapper = () => cardsWrapper.innerHTML = '';

const sortSlide = (list, elemOnScreen, elemStack) => {
  list = sortRecursivelySlide(list, elemOnScreen, elemStack);
  return list;
}

const sortRecursivelySlide = (list, elemOnScreen, elemStack) => {
  const length = list.length;
  for(let i = 0; i < (length / elemOnScreen); i++) {
    const stepList = list.slice(i * elemOnScreen, (i * elemOnScreen) + elemOnScreen);
    
    for(let j = 0; j < elemOnScreen; j++) {
      const duplicatedItem = stepList.find((item, index) => {
        return item.id === stepList[j].id && (index !== j)
      })
      if(duplicatedItem !== undefined) {
        const index = (i * elemOnScreen) + j;
        const whichOfList = Math.trunc(index / elemStack)
        
        list.splice(whichOfList * elemStack, 0, list.splice(index, 1)[0])
        sortRecursivelySlide(list)
      }
    }
  }

  return list;
}

const createPetsSlide = (petsSlideList) => {
  petsSlideWrapper.innerHTML += createSlide(petsSlideList)
}

const createSlide = (list) => {
  let slideList = '';
  for(let i = 0; i < list.length; i++) {
    let container = list[i].children[0];
    let content = container.children[2];
    let links = content.children[1];
    let imageItem = `<img 
                      src='${container.children[0].src}' 
                      alt='${container.children[0].alt}' 
                      class='${container.children[0].classList.value}'
                    >`;
    let overlateItem = `<div class='${container.children[1].classList.value}'></div>`;
    let linksItem = `<div class='${links.classList.value}'>
                      <a class='${links.children[0].classList.value}'>
                        <img
                          src='${links.children[0].children[0].src}'
                          alt='${links.children[0].children[0].alt}'
                          class='${links.children[0].children[0].classList.value}'
                        >
                        ${links.children[0].textContent}
                      </a>
                      <button class='${links.children[1].classList.value}'>
                        <img
                          src='${links.children[1].children[0].src}'
                          alt='${links.children[1].children[0].alt}'
                          class='${links.children[1].children[0].classList.value}'
                        >
                        ${links.children[1].textContent}
                      </button>
                    </div>`;
    let contentItem = `<div class='${content.classList.value}'>
                        <p class='${content.children[0].classList.value}'>${content.children[0].textContent}</p>
                        ${linksItem}
                      </div>`;
    let containerItem = `<div class='${container.classList.value}'>
                          ${imageItem}
                          ${overlateItem}
                          ${contentItem}
                        </div>`;
    let li = `<li class='${list[i].classList.value}' id='${list[i].id}'>${containerItem}</li>`;

    slideList += li;
  }

  return slideList;
}

const createCardsSlide = (cardsSlideList) => {
  cardsWrapper.innerHTML += createCard(cardsSlideList)
}

const createCard = (list) => {
  let slideList = '';
  for(let i = 0; i < list.length; i++) {
    let container = list[i].children[0];
    let card = container.children[0];
    let li = `<li class='${list[i].classList.value}' id='${list[i].id}'>
                <div class='${container.classList.value}'>
                  <div class='${card.classList.value}'>
                    <img src='${card.children[0].src}'
                         alt='${card.children[0].alt}'
                         class='${card.children[0].classList.value}'
                    >
                    <h4 class='${card.children[1].classList.value}'>${card.children[1].textContent}</h4>
                    <p class='${card.children[2].classList.value}'>${card.children[2].textContent}</p>
                  </div>
                </div>
              </li>`;

    slideList += li;
  }
  
  return slideList;
}