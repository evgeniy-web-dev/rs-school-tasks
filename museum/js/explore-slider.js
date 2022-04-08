const explore = document.getElementById('explore-slider')
const slider = explore.querySelector('.slider')
const img = explore.querySelector('.before');

let active;
let imgBeforeWidth = img.offsetWidth;
let imgBeforeHeight = img.offsetHeight;

img.querySelector('img').style.maxWidth = img.offsetWidth + "px";
img.style.width = (imgBeforeWidth / 2) + "px";
slider.style.left = (imgBeforeWidth / 2) - (slider.offsetWidth / 2) + "px";
slider.style.opacity = 1;

slider.addEventListener("mousedown", slideReady);
slider.addEventListener("mouseup", slideFinish);
slider.addEventListener("touchstart", slideReady);
slider.addEventListener("touchstop", slideFinish);

function slideReady(e) {
    e.preventDefault();
    active = true;
    window.addEventListener("mousemove", slideMove);
    window.addEventListener("touchmove", slideMove);
}
function slideFinish() {
    active = false;
    window.removeEventListener("mousemove", slideMove);
    window.removeEventListener("touchmove", slideMove);
}
function slideMove(e) {
    if (!active) {
        return false;
    }
    let position = getCursorPos(e)
    position = position < 0 ? 0 : position > imgBeforeWidth ? imgBeforeWidth : position;
    slide(position);
}
function getCursorPos(e) {
    let a, x = 0;
    e = e || window.event;
    let pageX = e.pageX ?? e.touches[0].pageX ?? 0;
    a = img.getBoundingClientRect();
    x = pageX - a.left;
    return x - window.pageXOffset;
}
function slide(value) {
    img.style.width = value + "px";
    slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
}

