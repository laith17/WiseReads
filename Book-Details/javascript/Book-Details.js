//* Adding Buttons
// function addComment() {
//   var comment = document.getElementById("comment").value;

//   if (comment) {
//     var commentsList = document.getElementById("comments-list");
//     var li = document.createElement("li");
//     li.innerHTML = ":</strong> " + comment;
//     commentsList.appendChild(li);

//     document.getElementById("comment").value = "";
//   }
// }

function changeUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));

  if (!isNaN(id)) {
    bookDetails(id);
    bookDescription(id);
  } else {
    console.error("Invalid book ID");
  }
}
changeUrl();

//* Fetch data to the related books section
const bookCardTemplate = document.querySelector("[data-book-template]");
const bookCardContainer = document.querySelector(".books__grid");

fetch("http://localhost:3000/books?_limit=5")
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

//* Fetch data to the book details section
const bookDetailsTemplate = document.querySelector("[data-details-template]");
const bookDetailsContainer = document.querySelector(".book-details");

async function bookDetails(id) {
  const res = await fetch(`http://localhost:3000/books`);
  const book = await res.json();
  const card = bookDetailsTemplate.content.cloneNode(true);
  const bookImage = card.querySelector(".book-details__img img");
  const bookAuthor = card.querySelector(".book-details__author");
  const bookTitle = card.querySelector(".book-details__title");
  const bookDescriptionSub = card.querySelector(".book-details__paragraph");
  const downloadBook = card.querySelector(".btn-Download");

  // Check if the book exists for the given ID

  const bookData = book[0];
  bookImage.src = book[id - 1].image;
  bookAuthor.textContent = book[id - 1].author;
  bookTitle.textContent = book[id - 1].title;
  bookDescriptionSub.textContent = book[id - 1].book_description;

  // Make sure to set a valid download link for this specific book
  const downloadLink = book[id - 1].download;

  downloadBook.textContent = "Download"; // Set button text

  // Create and configure a hidden download link
  const downloadLinkElement = document.createElement("a");
  downloadLinkElement.href = downloadLink;
  downloadLinkElement.style.display = "none";
  downloadLinkElement.download = bookData.title + ".pdf"; // Set the desired filename

  downloadBook.addEventListener("click", () => {
    // Programmatically trigger a click event on the download link
    // downloadLinkElement.click();
    window.open(downloadLink, "_blank");
  });

  bookDetailsContainer.innerHTML = "";
  bookDetailsContainer.appendChild(card);
}

//* Fetch data to the book details section
const bookDescriptionTemplate = document.querySelector(
  "[data-description-template]"
);
const bookDescriptionContainer = document.querySelector(".book-description");

async function bookDescription(id) {
  const res = await fetch(`http://localhost:3000/books`);
  const book = await res.json();
  const card = bookDescriptionTemplate.content.cloneNode(true);
  const bookDescription = card.querySelector(".book-description__paragraph");
  const authorName = card.querySelector(".author__name");
  const authorDescription = card.querySelector(".author__description");
  const languageParagraph = card.querySelector(".language-paragraph");
  const genreParagraph = card.querySelector(".genre-paragraph");
  const publicationParagraph = card.querySelector(".publication-paragraph");

  bookDescription.textContent = book[id - 1].main_description;
  authorName.textContent = book[id - 1].author;
  authorDescription.textContent = book[id - 1].author_description;
  languageParagraph.textContent = book[id - 1].language;
  genreParagraph.textContent = book[id - 1].type;
  publicationParagraph.textContent = book[id - 1].publication_date;

  bookDescriptionContainer.appendChild(card);
}

////////////////////////////////////*


