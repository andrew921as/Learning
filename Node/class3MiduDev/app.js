const express = require('express'); // importamos express -> CommonJS (un framework para crear servidores)
const crypto = require('node:crypto'); // importamos crypto -> CommonJS (una libreria para generar ids random)
const movies = require('./movies.json'); // importamos el archivo movies.json
const { validateMovie } = require('./schemas/movies');


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
	
	const result = validateMovie(req.body) // validamos el body de la request
	
	if (result.error) {
		res.status(400).json({error: JSON.parse(result.error.message)})
	}

		const newMovie ={
			id: crypto.randomUUID(), // generamos un id random
			...result.data
		}

	movies.push(newMovie)// agregamos la nueva movie

	res.status(201).json(newMovie) // retornamos la nueva movie para actualizar el front
})

app.patch('/movies/:id', (req, res) => { // Ruta /movies/:id
	const { id } = req.params // obtenemos la id de la movie a buscar
	const movieIndex = movies.findIndex(movie => movie.id === id)

	if (movieIndex < 0){
		return res.status(404).json({message:'Movie not found'})
	} 

	const movie = movies[movieIndex]
})

const PORT = process.env.PORT ?? 1234; // Puerto

app.listen(PORT, () => { // Escucha en el puerto 1234	
		console.log(`Server listening on port ${PORT}`);
});