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

let tabs = document.querySelectorAll(".action-buttons ul li");

tabs.forEach((el) => {
  el.addEventListener("click", (e) => {
    console.log(e.target.parentElement.querySelectorAll("li").length > 0);
    if (e.target.parentElement.querySelectorAll("li").length > 0) {
      e.target.parentElement.querySelectorAll("li").forEach((li) => {
        li.classList.remove("active");
      });
      e.target.classList.add("active");

      document.querySelectorAll(".content > div").forEach((div) => {
        div.classList.remove("active");
      });
      document
        .querySelector(`.${e.target.dataset.name}`)
        .classList.add("active");
    } else {
      e.target.parentElement.parentElement
        .querySelectorAll("li")
        .forEach((li) => {
          li.classList.remove("active");
        });
      e.target.parentElement.classList.add("active");
      document.querySelectorAll(".content > div").forEach((div) => {
        div.classList.remove("active");
      });
      document
        .querySelector(`.${e.target.parentElement.dataset.name}`)
        .classList.add("active");
    }
  });
});
let change = document.querySelectorAll("change");
