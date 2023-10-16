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

// const searchInput = document.getElementById("search");

// searchInput.addEventListener("keyup", (e) => {
//   console.log(e);
// });

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
      const bookLink = card.querySelector(".book__link");
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("id", book["id"]);
      console.log(book["id"]);
      const href =
        "http://127.0.0.1:5500/Book-Details/Book-Details.html?" +
        urlSearchParams.toString();
      bookLink.href = href;
      bookImage.src = book.image;
      bookAuthor.textContent = book.author;
      bookTitle.textContent = book.title;
      bookCardContainer.appendChild(card);
    });
  });

// ******************



// // Get the new books from the JSON server
// fetch("http://localhost:3000/books")
//   .then(res => res.json())
//   .then(books => {
//     if (books.length > 0) {
//       var booksArr = books;
//       var newBooks = document.getElementById("newBooks");
//       // var visibleBooks = 5;
//       var currentStart = 0;
//       var currentEnd = 5;

//       function renderNewBooks() {
//         newBooks.innerHTML = "";
//         var visibleBooksArr = booksArr.slice(currentStart, currentEnd);

//         visibleBooksArr.forEach((book) => {
//           var newBooks_card = document.createElement('div');
//           newBooks_card.classList.add('newBooks_card');
//           newBooks_card.innerHTML = `
          
//             <img class="" src="${book.image}" alt="cover" width="190rem" height="280rem">
//             <p class="newBooks-card_text">${book.author}</p>
//             <h1 class="newBooks-card_title">${book.title}</h1> 

//             <a href="#"><i class="fa-regular fa-heart" style="font-size:2.5rem; "></i></a>
//             <a href="#"><i class="fa-solid fa-heart" style="font-size:2.5rem; display:none;"></i></a>`;
//           newBooks.appendChild(newBooks_card);
//         });
//       }

//       renderNewBooks();
// // End Get the newBooks from the JSON server

   

// // Handel the slider in NewBooks-cards section 
//       var arrowBtns = document.querySelectorAll('.newBooks-scroll i');
//       arrowBtns.forEach(btn => {
//         btn.addEventListener("click", () => {
//           if (btn.id === "left" && currentStart > 0) {
//             currentStart -= 1;
//             currentEnd -= 1;
//           } else if (btn.id === "right" && currentEnd < booksArr.length) {
//             currentStart += 1;
//             currentEnd += 1;
//           }
//           renderNewBooks();

//         });
//       });
//     }
//   });

        // Get the new books from the JSON server
fetch("http://localhost:3000/books")
.then(res => res.json())
.then(books => {
    if (books.length > 0) {
        var booksArr = books;
        var newBooks = document.getElementById("newBooks");
        var currentStart = 0;
        var currentEnd = 5;
        var maxDisplayedBooks = 20;

        function renderNewBooks() {
            newBooks.innerHTML = "";

            // Calculate the maximum number of books to display (up to 20)
            var maxBooks = Math.min(currentEnd, maxDisplayedBooks);

            var visibleBooksArr = booksArr.slice(currentStart, maxBooks);

            visibleBooksArr.forEach((book, index) => {
                if (index < maxDisplayedBooks) {
                    var newBooks_card = document.createElement('div');
                    newBooks_card.classList.add('newBooks_card');
                    //navigate the book to book detail page
                    const urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("id", book["id"]);
                    console.log(book["id"]);
                    const href =
                      "http://127.0.0.1:5500/Book-Details/Book-Details.html?" +
                      urlSearchParams.toString();

                    newBooks_card.innerHTML = `
                       <a href="${href}"> <img class="" src="${book.image}" alt="cover" width="190rem" height="280rem"></a>
                        <p class="newBooks-card_text">${book.author}</p>
                        <h1 class="newBooks-card_title">${book.title}</h1> 
                        <a href="#"><i class="fa-regular fa-heart" style="font-size:2.5rem; "></i></a>
                        <a href="#"><i class="fa-solid fa-heart" style="font-size:2.5rem; display:none;"></i></a>`;
                  
                  
                  
                        newBooks.appendChild(newBooks_card);
                }
            });

            // Disable the right button when reaching the end
            if (currentEnd >= booksArr.length) {
                document.getElementById("right").style.display = "none";
            } else {
                document.getElementById("right").style.display = "inline-block";
            }
        }

        renderNewBooks();

        // Handle the slider in NewBooks-cards section
        var arrowBtns = document.querySelectorAll('.newBooks-scroll i');
        arrowBtns.forEach(btn => {
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
// End Handel the slider in NewBooks-cards section 
// Get the top books from the JSON server
fetch("http://localhost:3000/books")
  .then((res) => res.json())
  .then((books) => {
    if (books.length > 0) {
      var booksArr = books;
      var topBooks = document.getElementById("topBooks");

      function renderTopBooks() {
        topBooks.innerHTML = "";
        var visibleTopBooksArr = booksArr.slice(8,11 );

        visibleTopBooksArr.forEach((book) => {
          var topBooks_card = document.createElement("div");
          topBooks_card.classList.add("topBooks_card");
          const urlSearchParams = new URLSearchParams();
          urlSearchParams.append("id", book["id"]);
          console.log(book["id"]);
          const href =
            "http://127.0.0.1:5500/Book-Details/Book-Details.html?" +
            urlSearchParams.toString();

          topBooks_card.innerHTML = `
            
             <a href="${href}"> <img src="${book.image}" alt="cover" width="350rem" height="350rem"></a>
          
            <p class="topBooks-card_text">${book.author}</p>
            <h1 class="topBooks-card_title">${book.title}</h1>
            <a href="#"><i class="fa-regular fa-heart" style="font-size:2.5rem;"></i></a>
            <a href="#"><i class="fa-solid fa-heart" style="font-size:2.5rem; display:none;"></i></a>`;
          topBooks.appendChild(topBooks_card);
        });
      }

      renderTopBooks();
    }
  });
