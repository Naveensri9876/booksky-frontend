const API_URL = "https://booksky-backend.onrender.com/api/books";


var popupoverlay=document.querySelector(".popup-overlay")
var popupbox=document.querySelector(".popup-box")
var addpopupbutton=document.getElementById("add-popup-button")
addpopupbutton.addEventListener("click",function(){
    popupoverlay.style.display="block"
    popupbox.style.display="block"
})
var cancelpopup=document.getElementById("Cancel-popup")
cancelpopup.addEventListener("click",function(){
    
     event.preventDefault()
  popupbox.style.display="none"
  popupoverlay.style.display="none"
})
var addbook=document.getElementById("add-book")
var booktittleinput=document.getElementById("book-tittle-input")
var bookauthorinput=document.getElementById("book-author-input")
var bookdescriptioninput=document.getElementById("book-description-input")
var container=document.querySelector(".container")
addbook.addEventListener("click", async function(event) {
  event.preventDefault();

  const newBook = {
    title: booktittleinput.value,
    author: bookauthorinput.value,
    description: bookdescriptioninput.value
  };

  // Save to backend
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newBook)
  });

  // Then show in frontend
  renderBook(newBook);

  popupoverlay.style.display = "none";
  popupbox.style.display = "none";
});
function renderBook(book) {
  var div = document.createElement("div");
  div.setAttribute("class", "book-container");
  div.innerHTML = `
    <h2>${book.title}</h2>
    <h5>${book.author}</h5>
    <p>${book.description}</p>
    <button onclick="delfun(event)">Delete</button>
  `;
  container.append(div);
}

function delfun(event){
  event.target.parentElement.remove()
}
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(API_URL);
  const books = await response.json();
  books.forEach(book => renderBook(book));
});
