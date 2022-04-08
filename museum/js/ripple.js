const buttons = document.querySelectorAll(".ripple");
buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
        const xInside = e.offsetX;
        const yInside = e.offsetY;

        const circle = document.createElement("span");
        circle.classList.add("circle");
        circle.style.top = yInside + "px";
        circle.style.left = xInside + "px";

        this.appendChild(circle);
        setTimeout(() => circle.remove(), 500);

        e.stopPropagation();
        e.preventDefault();

        return false;
    });
});