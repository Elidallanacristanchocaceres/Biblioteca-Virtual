import { fetchFeaturedBooks, displayFeaturedBooks } from "../components/featuredBooks.js";
import { searchBooks } from "../components/searchBooks.js";
import { createBookCard } from "../components/bookCard.js";

const searchBtn = document.getElementById("search-btn");
const searchQueryInput = document.getElementById("search-query");
const iframeContainer = document.getElementById("iframe-container");

const addViewBookListeners = () => {
  document.querySelectorAll(".view-book-btn").forEach((button) => {
    button.removeEventListener("click", handleViewBookClick);
    button.addEventListener("click", handleViewBookClick);
  });
};

const handleViewBookClick = (e) => {
  const url = e.target.dataset.url;
  if (!url) {
    alert("El contenido del libro no está disponible.");
    return;
  }

  document.getElementById("books-container").style.display = "none";
  iframeContainer.style.display = "flex";
  iframeContainer.classList.add("active");

  iframeContainer.innerHTML = `
    <button id="back-btn">Atrás</button>
    <div style="width: 100%; height: 90vh; padding: 20px;">
      <iframe src="${url}" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    iframeContainer.style.display = "none";
    iframeContainer.classList.remove("active");
    document.getElementById("books-container").style.display = "grid";
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const featuredBooksList = await fetchFeaturedBooks();
  displayFeaturedBooks(featuredBooksList, createBookCard, addViewBookListeners);
});

searchBtn.addEventListener("click", () => {
  searchBooks(searchQueryInput.value.trim(), addViewBookListeners, fetchFeaturedBooks, displayFeaturedBooks);
});

searchQueryInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBooks(searchQueryInput.value.trim(), addViewBookListeners, fetchFeaturedBooks, displayFeaturedBooks);
  }
});
