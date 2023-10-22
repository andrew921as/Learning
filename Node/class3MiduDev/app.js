const express = require('express'); // importamos express -> CommonJS
const crypto = require('node:crypto'); // importamos crypto -> CommonJS
const movies = require('./movies.json') // importamos el archivo movies.json

const app = express();
app.disable('x-powered-by'); // Deshabilita el header X-Powered-By: Express
app.use(express.json()); // Middleware para parsear el body de la request a JSON
app.get('/movies', (req, res) => { // Ruta /movies
	const {genre} = req.query // obtenemos el query param genre
	if (genre) { // si existe el query param genre	
		const filteredMovies = movies.filter(
			movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase())
		) 
		return res.json(filteredMovies) // retornamos las movies filtradas
	}
	res.json(movies)
})

app.get('/movies/:id', (req, res) => { // Ruta /movies/:id
	const { id } = req.params // obtenemos la id de la movie a buscar
	const movie = movies.find(movie => movie.id === id) // buscamos la movie por id
	if (movie) return res.json(movie) // si existe la movie, la retornamos

	res.status(404).json({ message : 'Movie not found'})
})

app.post('/movies', (req,res)=>{ // Ruta /movies
	const {
		title, 
		genre, 
		year,
		director,
		duration,
		rate,
		poster} = req.body // obtenemos el body de la request

		const newMovie ={
			id: crypto.randomUUID(), // generamos un id random
			title,
			genre,
			director,
			year,
			duration,
			rate: rate ?? 0,
			poster
		}

	movies.push(newMovie)// agregamos la nueva movie

	res.status(201).json(newMovie) // retornamos la nueva movie para actualizar el front
})

const PORT = process.env.PORT ?? 1234; // Puerto

app.listen(PORT, () => { // Escucha en el puerto 1234	
		console.log(`Server listening on port ${PORT}`);
});