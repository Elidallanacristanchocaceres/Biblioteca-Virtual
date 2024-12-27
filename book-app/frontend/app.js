document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('books-container');
    const searchBtn = document.getElementById('search-btn');
    const searchQueryInput = document.getElementById('search-query');

    // Contenedor para el iframe
    const iframeContainer = document.createElement('div');
    iframeContainer.style.display = 'none';
    document.body.appendChild(iframeContainer);

    // Función para manejar la búsqueda de libros
    const searchBooks = () => {
        const query = searchQueryInput.value.trim(); // Obtener el valor del input

        if (!query) {
            container.innerHTML = '<p>Por favor ingresa un término de búsqueda.</p>';
            return;
        }

        // Realizar la consulta a Gutendex
        fetch(`https://gutendex.com/books/?search=${query}`)
            .then(res => res.json())
            .then(data => {
                // Limpiar el contenedor
                container.innerHTML = '';

                if (!data.results || data.results.length === 0) {
                    container.innerHTML = '<p>No se encontraron libros para la búsqueda.</p>';
                    return;
                }

                // Mostrar resultados
                data.results.forEach(book => {
                    const bookCard = document.createElement('div');
                    bookCard.className = 'book';

                    bookCard.innerHTML = `
                        <h3>${book.title}</h3>
                        <p>Autor: ${book.authors.map(author => author.name).join(', ') || 'Desconocido'}</p>
                        <img src="${book.formats['image/jpeg'] || ''}" alt="Portada del libro" style="width: 100px; height: auto;"/>
                        <button class="view-book-btn" data-url="${book.formats['text/html'] || book.formats['text/html; charset=utf-8'] || ''}">
                            Ver contenido
                        </button>
                    `;

                    container.appendChild(bookCard);
                });

                // Asociar eventos de clic a los botones
                document.querySelectorAll('.view-book-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const url = e.target.dataset.url;
                        if (!url) {
                            alert('El contenido del libro no está disponible.');
                            return;
                        }

                        // Ocultar la lista de libros y mostrar el iframe
                        container.style.display = 'none';
                        iframeContainer.style.display = 'block';

                        iframeContainer.innerHTML = `
                            <button id="back-btn" style="margin-bottom: 10px;">Atrás</button>
                            <div style="position: relative; width: 100%; height: 80vh;">
                                <iframe src="${url}" style="width: 100%; height: 100%; border: none;"></iframe>
                            </div>
                        `;

                        // Asociar el evento del botón "Atrás"
                        document.getElementById('back-btn').addEventListener('click', () => {
                            iframeContainer.style.display = 'none';
                            container.style.display = 'block';
                        });
                    });
                });
            })
            .catch(err => {
                console.error('Error al obtener los libros:', err);
                container.innerHTML = '<p>Hubo un error al cargar los libros. Intenta nuevamente.</p>';
            });
    };

    // Asociar el evento click al botón de búsqueda
    searchBtn.addEventListener('click', searchBooks);

    // También permitir la búsqueda al presionar "Enter"
    searchQueryInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchBooks();
        }
    });
});
