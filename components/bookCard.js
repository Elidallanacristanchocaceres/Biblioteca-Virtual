export const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  bookCard.className = "book";

  const language = book.languages.includes("es") ? "Español" : "Inglés";

  // Filtrar URL solo si está disponible en HTTPS
  let bookUrl =
    book.formats["text/html"] || book.formats["text/html; charset=utf-8"] || "";

  // Forzar HTTPS
  if (bookUrl.startsWith("http://")) {
    bookUrl = bookUrl.replace("http://", "https://");
  }

  // Verificar si la URL es segura
  if (!bookUrl.startsWith("https://")) {
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Autor: ${book.authors.map((author) => author.name).join(", ") || "Desconocido"}</p>
      <p>Idioma: ${language}</p>
      <p style="color: red;">El contenido del libro no está disponible en una conexión segura.</p>
    `;
    return bookCard; // Detener la creación de la tarjeta
  }

  bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p>Autor: ${book.authors.map((author) => author.name).join(", ") || "Desconocido"}</p>
    <p>Idioma: ${language}</p>
    <img src="${book.formats["image/jpeg"]?.replace("http://", "https://") || ""}" 
         alt="Portada del libro" style="width: 100px; height: auto;"/>
    <a href="${bookUrl}" class="view-book-btn" data-url="${bookUrl}">Ver contenido</a>
  `;

  return bookCard;
};
