const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.get('/api/books', async (req, res) => {
    // const query = req.query.q || 'twain';  // Cambia la consulta a algo común como 'book'
    const url = `https://gutendex.com/books/?search=austen`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Verificar si la propiedad 'docs' existe
        if (!data.docs || data.docs.length === 0) {
            return res.json([]);  // Devolver un arreglo vacío si no se encontraron libros
        }
        

        const libros = data.docs.map(libro => ({
            title: libro.title,
            author: libro.author_name ? libro.author_name.join(', ') : 'Desconocido',
            link: `https://openlibrary.org${libro.key}`,
        }));

        res.json(libros);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los libros');
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});