document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('books-container');
  const query = 'book'; // Cambia la consulta a algo más genérico como 'book'

  fetch(`/api/libros?q=${query}`)
      .then(res => res.json())
      .then(data => {
          console.log(data);  // Imprimir la respuesta completa para ver qué estamos recibiendo

          // Verificar si la respuesta contiene libros
          if (!data || data.length === 0) {
              container.innerHTML = `<p>No se encontraron libros para la búsqueda.</p>`;
              return;
          }

          // Si hay libros, mostrarlos
          data.forEach(libro => {
              const bookCard = document.createElement('div');
              bookCard.className = 'book';
              bookCard.innerHTML = `
                  <h3>${libro.title}</h3>
                  <p>Autor: ${libro.author}</p>
                  <a href="${libro.link}" target="_blank">Ver más</a>
              `;
              container.appendChild(bookCard);
          });
      })
      .catch(err => {
          console.error('Error al obtener los libros:', err);
          container.innerHTML = `<p>Hubo un error al cargar los libros. Por favor, intenta de nuevo.</p>`;
      });
});
