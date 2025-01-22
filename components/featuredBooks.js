const featuredBooksContainer = document.getElementById("featured-books-container");
const featuredBooks = document.getElementById("featured-books");

export const fetchFeaturedBooks = async () => {
  try {
    const response = await fetch("https://gutendex.com/books/?sort=popular");
    const data = await response.json();
    return data.results.slice(0, 8); 
  } catch (err) {
    console.error("Error fetching featured books:", err);
    return [];
  }
};

export const displayFeaturedBooks = (books, createBookCard, addViewBookListeners) => {
  featuredBooksContainer.innerHTML = "";
  books.forEach((book) => {
    const bookCard = createBookCard(book);
    featuredBooksContainer.appendChild(bookCard);
  });
  featuredBooks.classList.remove("hidden");
  addViewBookListeners();
};
