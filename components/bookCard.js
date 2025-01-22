export const createBookCard = (book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book";

    const language = book.languages.includes("es") ? "Español" : "Inglés";

    // Filtrar URL solo si está disponible en HTTPS
    const bookUrl =
        book.formats["text/html"] || book.formats["text/html; charset=utf-8"] || "";

    const secureBookUrl = bookUrl.replace("http://", "https://"); // Forzar HTTPS

    // Verificar si la URL es segura
    if (!secureBookUrl.startsWith("https://")) {
        alert("El contenido del libro no está disponible en una conexión segura.");
        return null; // Detener la creación de la tarjeta
    }

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Autor: ${book.authors.map((author) => author.name).join(", ") || "Desconocido"}</p>
      <p>Idioma: ${language}</p>
      <img src="${book.formats["image/jpeg"]?.replace("http://", "https://") || ""}" 
           alt="Portada del libro" style="width: 100px; height: auto;"/>
      <button class="view-book-btn" data-url="${secureBookUrl}">Ver contenido</button>
    `;

    return bookCard;
};
