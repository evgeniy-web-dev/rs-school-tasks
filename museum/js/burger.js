const burgerMenuButton = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const burgerActiveClass = "burger-open";

burgerMenuButton.addEventListener("click", (e) => {
    document.body.classList.toggle(burgerActiveClass);
    return false;
});

document.body.addEventListener("click", (e) => {
    if (
        !e.target.classList.contains("burger") &&
        ((document.body.classList.contains(burgerActiveClass) &&
                !e.target.closest(".burger-menu")) ||
            e.target.tagName === "A")
    ) {
        document.body.classList.remove(burgerActiveClass);
    }
});

//burgerMenu.querySelectorAll('a').forEach(el => el.addEventListener("click", () => document.body.classList.remove(burgerActiveClass)));