let arrowRight = document.querySelector(".arrow-right");
let arrowLeft = document.querySelector(".arrow-left"); 
let slides = document.querySelectorAll(".articles__slide");
let i = 0;
arrowRight.addEventListener("click", function () {
  if (i < slides.length - 3) {
    slides[i].classList.remove("visible");
    slides[i + 3].classList.add("visible");
    i++;
  } else {
    slides[i].classList.remove("visible");
    slides[i + 1].classList.remove("visible");
    slides[i + 2].classList.remove("visible");
    slides[1].classList.add("visible");
    slides[2].classList.add("visible");
    slides[3].classList.add("visible");
    i = 1;
  }
})
arrowLeft.addEventListener("click", function () {
  if (i == 0) {
    slides[i].classList.remove("visible");
    slides[i + 1].classList.remove("visible");
    slides[i + 2].classList.remove("visible");
    slides[slides.length - 4].classList.add("visible");
    slides[slides.length - 3].classList.add("visible");
    slides[slides.length - 2].classList.add("visible");
    i = 5;
  } else {
    slides[i - 1].classList.add("visible");
    slides[i + 2].classList.remove("visible");
    i--;
  }
})
