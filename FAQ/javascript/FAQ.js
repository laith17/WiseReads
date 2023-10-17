//* Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".main-nav__list");
const register_btns = document.querySelector(".register-btns");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  register_btns.classList.toggle("active");
});

// Add event listeners to list items
document.querySelectorAll(".list-item").forEach((element) => {
  element.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    register_btns.remove("active");
  });
});

const feqs = document.querySelectorAll(".feq");
feqs.forEach((feq) => {
  feq.addEventListener("click", () => {
    feq.classList.toggle("active");
  });
});
