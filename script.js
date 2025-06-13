// ✅ Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_Nq1c_D2FUN_YhSIs5CZegkhvzV1oxfI",
  authDomain: "booksky-b0c91.firebaseapp.com",
  projectId: "booksky-b0c91",
  storageBucket: "booksky-b0c91.appspot.com",
  messagingSenderId: "50531144727",
  appId: "1:50531144727:web:0a77c901f8d25cc5907852"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🚀 Your book management code starts here
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
  div.setAttribute("data-id", book._id); // Store book ID for deletion
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

// Delete book from backend and UI
async function delfun(event) {
  const bookElement = event.target.parentElement;
  const bookId = bookElement.getAttribute("data-id");

  // Send DELETE request to backend
  const response = await fetch(`${API_URL}/${bookId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    // Remove from UI if backend deletion was successful
    bookElement.remove();
  } else {
    alert("Failed to delete book from backend.");
  }
}

// ✅ Firebase Auth Functions
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// DOM Elements
const loginBtnPopup = document.getElementById("login-button");
const logoutBtn = document.getElementById("logout-button");
const authOverlay = document.querySelector(".popup-overlay-auth");
const authPopup = document.querySelector(".popup-box-auth");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const cancelAuthBtn = document.getElementById("cancel-auth");
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginBtnPopup.style.display = "none";
    logoutBtn.style.display = "inline-block";
    addpopupbutton.style.display = "block";
    container.style.display = "flex";

    // ✅ Fetch and show books only when logged in
    const response = await fetch(API_URL);
    const books = await response.json();
    container.innerHTML = ""; // clear old books if any
    books.forEach((book) => renderBook(book));
  } else {
    loginBtnPopup.style.display = "inline-block";
    logoutBtn.style.display = "none";
    addpopupbutton.style.display = "none";
    container.style.display = "none";
    container.innerHTML = ""; // clear books on logout
  }
});

// Show login/signup popup
loginBtnPopup.addEventListener("click", () => {
  authOverlay.style.display = "block";
  authPopup.style.display = "block";
});

// Close login/signup popup
cancelAuthBtn.addEventListener("click", () => {
  authOverlay.style.display = "none";
  authPopup.style.display = "none";
});

// Firebase Login
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    authOverlay.style.display = "none";
    authPopup.style.display = "none";
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});

// Firebase Signup
signupBtn.addEventListener("click", async () => {
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful!");
    authOverlay.style.display = "none";
    authPopup.style.display = "none";
  } catch (err) {
    alert("Signup failed: " + err.message);
  }
});

// Firebase Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  alert("Logged out!");
});



window.delfun = delfun;

