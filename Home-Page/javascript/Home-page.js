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

//* Image Slider
const slides = document.querySelectorAll(".img-slider__slide");
const btns = document.querySelectorAll(".btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const numberOfSlides = slides.length;
let currentSlide = 0;

//* function for manual navigation using buttons
const manualNav = function (element) {
  slides.forEach((slide) => {
    slide.classList.remove("active");

    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
  });

  slides[element].classList.add("active");
  btns[element].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});

//* function for manual navigation using arrows
//* Next button
nextBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  currentSlide++;

  if (currentSlide > numberOfSlides - 1) {
    currentSlide = 0;
  }

  slides[currentSlide].classList.add("active");
  btns[currentSlide].classList.add("active");
});

//* Prev button
prevBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });

  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = numberOfSlides - 1;
  }

  slides[currentSlide].classList.add("active");
  btns[currentSlide].classList.add("active");
});

//* function for autoplay navigation
let playSlider;

const autoplayNav = () => {
  if (playSlider) {
    clearInterval(playSlider); //* Clear the existing interval if it exists
  }

  playSlider = setInterval(function () {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });

    currentSlide++;

    if (currentSlide > numberOfSlides - 1) {
      currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
    btns[currentSlide].classList.add("active");
  }, 5000);
};
autoplayNav();

//* Fetch data to the Books section

const bookCardTemplate = document.querySelector("[data-book-template]");
const bookCardContainer = document.querySelector(".books__grid");

fetch("http://localhost:3000/books?_start=0&_limit=10")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((book) => {
      const card = bookCardTemplate.content.cloneNode(true).children[0];
      const bookAuthor = card.querySelector(".book__author");
      const bookTitle = card.querySelector(".book__title");
      const bookImage = card.querySelector(".book__img");
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.append("type", book["type"]);
      const bookLink = card.querySelector(".book__link");
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("id", book["id"]);
      const href =
        "http://127.0.0.1:5501/Book-Details/Book-Details.html?" +
        urlSearchParams.toString() +
        "&" +
        urlParams;
      bookLink.href = href;
      bookImage.src = book.image;
      bookAuthor.textContent = book.author;
      bookTitle.textContent = book.title;
      bookCardContainer.appendChild(card);
    });
  });

// **********************************************************************************

//* Get the new books from the JSON server
fetch("http://localhost:3000/books")
  .then((res) => res.json())
  .then((books) => {
    if (books.length > 0) {
      var booksArr = books;
      var newBooks = document.getElementById("newBooks");
      var currentStart = 0;
      var currentEnd = 5;
      var maxDisplayedBooks = 20;

      function renderNewBooks() {
        newBooks.innerHTML = "";

        //* Calculate the maximum number of books to display (up to 20)
        var maxBooks = Math.min(currentEnd, maxDisplayedBooks);

        var visibleBooksArr = booksArr.slice(currentStart, maxBooks);

        visibleBooksArr.forEach((book, index) => {
          if (index < maxDisplayedBooks) {
            var newBooks_card = document.createElement("div");
            newBooks_card.classList.add("newBooks_card");
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.append("type", book["type"]);
            const urlSearchParams = new URLSearchParams();
            urlSearchParams.append("id", book["id"]);
            const href =
              "http://127.0.0.1:5501/Book-Details/Book-Details.html?" +
              urlSearchParams.toString() +
              "&" +
              urlParams;
            newBooks_card.innerHTML = `
                    <a href="${href}" class="book__link">
                    <img src="${book.image}" alt="cover" class="book__img/>
                    <div class="book__overlay">
                      <p>Read More</p>
                    </div>
                  </a>                    
                      <p class="newBooks-card_text">${book.author}</p>
                        <h1 class="newBooks-card_title">${book.title}</h1> 
                        <a href="./user-profile/favourite.html"><i class="fa-regular fa-heart" style="font-size:2.5rem; "></i></a>
                        <a href="./user-profile/favourite.html"><i class="fa-solid fa-heart" style="font-size:2.5rem; display:none;"></i></a>`;
            newBooks.appendChild(newBooks_card);
          }
        });

        //* Disable the right button when reaching the end
        if (currentEnd >= booksArr.length) {
          document.getElementById("right").style.display = "none";
        } else {
          document.getElementById("right").style.display = "inline-block";
        }
      }

      renderNewBooks();

      //* Handle the slider in NewBooks-cards section
      var arrowBtns = document.querySelectorAll(".newBooks-scroll i");
      arrowBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.id === "left" && currentStart > 0) {
            currentStart -= 1;
            currentEnd -= 1;
          } else if (btn.id === "right" && currentEnd < booksArr.length) {
            currentStart += 1;
            currentEnd += 1;
          }
          renderNewBooks();
        });
      });
    }
  });
//* End Handel the slider in NewBooks-cards section
//* Fetch the books from the JSON server
fetch("http://localhost:3000/books")
  .then((res) => res.json())
  .then((books) => {
    if (books.length > 0) {
      var booksArr = books;
      var topBooks = document.getElementById("topBooks");

      function renderTopBooks() {
        topBooks.innerHTML = "";

        //* Sort the books by rating in descending order
        booksArr.sort((a, b) => b.rate - a.rate);

        //* Get the top 3 rated books
        var topRatedBooks = booksArr.slice(0, 3);

        topRatedBooks.forEach((book) => {
          var topBooks_card = document.createElement("div");
          topBooks_card.classList.add("topBooks_card");
          const urlParams = new URLSearchParams(window.location.search);
          urlParams.append("type", book["type"]);
          const urlSearchParams = new URLSearchParams();
          urlSearchParams.append("id", book["id"]);
          const href =
            "http://127.0.0.1:5501/Book-Details/Book-Details.html?" +
            urlSearchParams.toString() +
            "&" +
            urlParams;
          topBooks_card.innerHTML = `
          <a href="${href}" class="book__link">
          <img src="${book.image}" alt="cover" />
          <div class="book__overlay">
            <p>Read More</p>
          </div>
        </a>
            <p class="topBooks-card_text">${book.author}</p>
            <h1 class="topBooks-card_title">${book.title}</h1>
            <p class="topBooks-card_rating" style="font-size:2rem;">Rating: ${book.rate}</p>
            <a href="./user-profile/favourite.html"><i class="fa-regular fa-heart" style="font-size:2.5rem;"></i></a>
            <a href="./user-profile/favourite.html"><i class="fa-solid fa-heart" style="font-size:2.5rem; display:none;"></i></a>`;
          topBooks.appendChild(topBooks_card);
        });
      }

      renderTopBooks();
    }
  });
