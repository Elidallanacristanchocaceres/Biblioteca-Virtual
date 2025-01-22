export const createBookCard = (book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book";
  
    const language = book.languages.includes("es") ? "Español" : "Inglés";
  
    // Filtrar URL solo si está disponible en HTTPS
    const bookUrl =
      book.formats["text/html"]?.startsWith("https://") ||
      book.formats["text/html; charset=utf-8"]?.startsWith("https://")
        ? book.formats["text/html"] || book.formats["text/html; charset=utf-8"]
        : "";
  
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Autor: ${
        book.authors.map((author) => author.name).join(", ") || "Desconocido"
      }</p>
      <p>Idioma: ${language}</p>
      <img src="${
        book.formats["image/jpeg"] || ""
      }" alt="Portada del libro" style="width: 100px; height: auto;"/>
      ${
        bookUrl
          ? `<button class="view-book-btn" data-url="${bookUrl}">Ver contenido</button>`
          : `<p style="color: red;">Contenido no disponible en una conexión segura.</p>`
      }
    `;
  
    return bookCard;
  };
  