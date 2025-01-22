import { createBookCard } from "./bookCard.js";

const container = document.getElementById("books-container");
const loadingSpinner = document.getElementById("loading-spinner");
const noResults = document.getElementById("no-results");

export const searchBooks = async (query, addViewBookListeners, fetchFeaturedBooks, displayFeaturedBooks) => {
  if (!query) {
    container.innerHTML = "<p>Por favor ingresa un término de búsqueda.</p>";
    return;
  }

  loadingSpinner.classList.remove("hidden");
  container.innerHTML = "";
  noResults.classList.add("hidden");

  try {
    const [responseEn, responseEs] = await Promise.all([
      fetch(`https://gutendex.com/books/?search=${encodeURIComponent(query)}&languages=en`),
      fetch(`https://gutendex.com/books/?search=${encodeURIComponent(query)}&languages=es`),
    ]);

    const dataEn = await responseEn.json();
    const dataEs = await responseEs.json();

    const combinedResults = [...dataEn.results, ...dataEs.results];

    loadingSpinner.classList.add("hidden");

    if (combinedResults.length === 0) {
      noResults.classList.remove("hidden");
      const featuredBooksList = await fetchFeaturedBooks();
      displayFeaturedBooks(featuredBooksList, createBookCard, addViewBookListeners);
      return;
    }

    combinedResults.forEach((book) => {
      const bookCard = createBookCard(book);
      container.appendChild(bookCard);
    });

    addViewBookListeners();
  } catch (err) {
    console.error("Error al obtener los libros:", err);
    container.innerHTML = "<p>Hubo un error al cargar los libros. Intenta nuevamente.</p>";
    loadingSpinner.classList.add("hidden");
  }
};
