const API_URL = "https://booksky-backend.onrender.com/api/books";

const popupoverlay = document.querySelector(".popup-overlay");
const popupbox = document.querySelector(".popup-box");
const addpopupbutton = document.getElementById("add-popup-button");
const cancelpopup = document.getElementById("Cancel-popup");

const addbook = document.getElementById("add-book");
const booktittleinput = document.getElementById("book-tittle-input");
const bookauthorinput = document.getElementById("book-author-input");
const bookdescriptioninput = document.getElementById("book-description-input");
const container = document.querySelector(".container");

// Show popup
addpopupbutton.addEventListener("click", function () {
  popupoverlay.style.display = "block";
  popupbox.style.display = "block";
});

// Hide popup
cancelpopup.addEventListener("click", function (event) {
  event.preventDefault();
  popupbox.style.display = "none";
  popupoverlay.style.display = "none";
});

// Add book to backend + frontend
addbook.addEventListener("click", async function (event) {
  event.preventDefault();

  const newBook = {
    title: booktittleinput.value,
    author: bookauthorinput.value,
    description: bookdescriptioninput.value,
  };

  // Save to backend
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });

  const savedBook = await response.json();

  // Render the saved book on frontend
  renderBook(savedBook);

  // Hide popup
  popupoverlay.style.display = "none";
  popupbox.style.display = "none";

  // Clear input fields
  booktittleinput.value = "";
  bookauthorinput.value = "";
  bookdescriptioninput.value = "";
});

// Show book on screen
function renderBook(book) {
  const div = document.createElement("div");
  div.setAttribute("class", "book-container");
  div.innerHTML = `
    <h2>${book.title}</h2>
    <h5>${book.author}</h5>
    <p>${book.description}</p>
    <button onclick="delfun(event)">Delete</button>
  `;
  container.append(div);
}

// Fetch and display books from MongoDB when page loads
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(API_URL);
  const books = await response.json();
  books.forEach((book) => renderBook(book));
});

// Remove book from UI only
function delfun(event) {
  event.target.parentElement.remove();
}
