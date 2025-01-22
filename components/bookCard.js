export const createBookCard = (book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book";
  
    const language = book.languages.includes("es") ? "Español" : "Inglés";
  
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Autor: ${book.authors.map((author) => author.name).join(", ") || "Desconocido"}</p>
      <p>Idioma: ${language}</p>
      <img src="${book.formats["image/jpeg"] || ""}" alt="Portada del libro" style="width: 100px; height: auto;"/>
      <button class="view-book-btn" data-url="${book.formats["text/html"] || book.formats["text/html; charset=utf-8"] || ""}">
        Ver contenido
      </button>
    `;
  
    return bookCard;
  };
  