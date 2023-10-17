//* Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".main-nav__list");
const register_btns = document.querySelector(".register-btns");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  register_btns.classList.toggle("active");
});

//* Add event listeners to list items
document.querySelectorAll(".list-item").forEach((element) => {
  element.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    register_btns.remove("active");
  });
});

//* Fetch data to the Search section
const bookSearchTemplate = document.querySelector("[data-search-template]");
const bookSearchContainer = document.querySelector(".serach-container");
const searchInput = document.getElementById("search");

//* An event listener to the search input for real-time filtering
searchInput.addEventListener("input", filterBooks);

function filterBooks() {
  const searchText = searchInput.value.trim().toUpperCase();

  if (searchText === "") {
    clearBooks();
    return;
  }

  fetch("http://localhost:3000/books?_start=0&_limit=")
    .then((res) => res.json())
    .then((data) => {
      bookSearchContainer.innerHTML = "";

      data.forEach((book) => {
        if (book.title.toUpperCase().includes(searchText)) {
          const card = bookSearchTemplate.content.cloneNode(true).children[0];
          const bookAuthor = card.querySelector(".book__author");
          const bookTitle = card.querySelector(".book__title");
          const bookDescription = card.querySelector(".book__description");
          const bookImage = card.querySelector(".book__img");
          const urlParams = new URLSearchParams(window.location.search);
          urlParams.append("type", book["type"]);
          const bookLink = card.querySelector(".book__link");
          const urlSearchParams = new URLSearchParams();
          urlSearchParams.append("id", book["id"]);
          const href =
            "http://127.0.0.1:5500/Book-Details/Book-Details.html?" +
            urlSearchParams.toString() +
            "&" +
            urlParams;
          bookLink.href = href;
          bookImage.src = book.image;
          bookAuthor.textContent = book.author;
          bookTitle.textContent = book.title;
          bookDescription.textContent = book.book_description;
          bookSearchContainer.appendChild(card);
        }
      });
    });
}

function clearBooks() {
  bookSearchContainer.innerHTML = "";
}

// const bookSearchTemplate = document.querySelector("[data-search-template]");
// const bookSearchContainer = document.querySelector(".serach-container");
// const bookSearchBar = document.getElementById("search").value.toUpperCase();

// bookSearchBar.addEventListener("keyup", () => {});

// fetch("http://localhost:3000/books?_start=0&_limit=")
//   .then((res) => res.json())
//   .then((data) => {
//     data.forEach((book) => {
//       const card = bookSearchTemplate.content.cloneNode(true).children[0];
//       const bookAuthor = card.querySelector(".book__author");
//       const bookTitle = card.querySelector(".book__title");
//       const bookDescription = card.querySelector(".book__description");
//       const bookImage = card.querySelector(".book__img");
//       bookImage.src = book.image;
//       bookAuthor.textContent = book.author;
//       bookTitle.textContent = book.title;
//       bookDescription.textContent = book.book_description;
//       bookSearchContainer.appendChild(card);
//     });
//   });
