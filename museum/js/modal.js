const openModalLinks = document.querySelectorAll('.open-modal');
openModalLinks.forEach(el => el.addEventListener("click", modalShow));

const overlayElement = document.getElementById("overlay");
const modalElement = document.getElementById("modal");

overlayElement.querySelector('.close-modal').onclick = function (event) {
    event.preventDefault();
    modalHide();
};

document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        modalHide();
    }
};

function modalShow(event) {
    document.body.classList.add("modal-opened");
    overlayElement.classList.add("active");
    if (event) {
        event.preventDefault();
    }
}

function modalHide() {
    document.body.classList.remove("modal-opened");
    overlayElement.classList.add("closing");
    setTimeout(() => overlayElement.classList.remove("active", "closing"), 500);
}

overlayElement.addEventListener('click', modalHide);
modalElement.addEventListener('click', (event) => {
    event.stopPropagation();
    return false;
});

//modalShow();