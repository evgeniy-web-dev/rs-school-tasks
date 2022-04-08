// create an array of indexes and shuffle it
const imagesNumber = 15;
const imageIndexes = Array(imagesNumber).fill(0).map((el, index) => index + 1).sort(() => Math.random() - 0.5);
const galleryContainer = document.querySelector('.gallery .picture-inner-container');

let imagesHTML = '';
imageIndexes.forEach(function (item) {
    imagesHTML = imagesHTML + `<img class="gallery-img" src="assets/img/galery/galery${item}.webp" width="464" height="464" alt="galery${item}">`;
});

const pictureInnerContainer = document.querySelector('.picture-inner-container');
pictureInnerContainer.innerHTML = imagesHTML;

window.addEventListener('scroll', debounce(checkGallery));

function checkGallery() {
    galleryContainer.querySelectorAll('img').forEach(el => {
        if (checkVisibility(el)) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    })
}

function checkVisibility(el) {
    let rect = el.getBoundingClientRect();
    let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function debounce(func, timeout = 0) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

checkGallery();