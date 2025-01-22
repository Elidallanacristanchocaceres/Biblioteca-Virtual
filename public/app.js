import { fetchFeaturedBooks, displayFeaturedBooks } from "../components/featuredBooks.js";
import { searchBooks } from "../components/searchBooks.js";
import { createBookCard } from "../components/bookCard.js";

const searchBtn = document.getElementById("search-btn");
const searchQueryInput = document.getElementById("search-query");

const addViewBookListeners = () => {
  document.querySelectorAll(".view-book-btn").forEach((button) => {
    button.removeEventListener("click", handleViewBookClick);
    button.addEventListener("click", handleViewBookClick);
  });
};

const handleViewBookClick = async (e) => {
  let url = e.target.dataset.url;

  // Forzar HTTPS
  if (url.startsWith("http://")) {
    url = url.replace("http://", "https://");
  }

  if (!url || !url.startsWith("https://")) {
    alert(
      "El contenido del libro no está disponible o no está en una conexión segura."
    );
    return;
  }

  // Redirigir a la URL en la misma pestaña
  window.location.href = url;
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