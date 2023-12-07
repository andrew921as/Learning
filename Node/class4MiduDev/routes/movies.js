import randomUUID	from 'node:crypto'
import { Router } from 'express';

import { validateMovie, validatePartialMovie } from "../schemas/movies.js";
import { readJson } from "../utils.js";

export const moviesRouter = Router()
movies = readJson('./movies.json'); // importamos las movies con la funcion require que cree

moviesRouter.get('/', (req, res) => { 
	// Ruta /movies
	const {genre} = req.query // obtenemos el query param genre
	if (genre) { // si existe el query param genre	
		const filteredMovies = movies.filter(
			movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase())
		) 
		return res.json(filteredMovies) // retornamos las movies filtradas
	}
	res.json(movies)// Ruta /movies
})


moviesRouter.get('/:id', (req, res) => { // Ruta /movies/:id
	const { id } = req.params // obtenemos la id de la movie a buscar
	const movie = movies.find(movie => movie.id === id) // buscamos la movie por id
	if (movie) return res.json(movie) // si existe la movie, la retornamos

	res.status(404).json({ message : 'Movie not found'})
})

moviesRouter.post('/', (req,res)=>{ // Ruta /movies
	
	const result = validateMovie(req.body) // validamos el body de la request
	
	if (result.error) {
		res.status(400).json({error: JSON.parse(result.error.message)})
	}

		const newMovie ={
			id: randomUUID(), // generamos un id random
			...result.data
		}

	movies.push(newMovie)// agregamos la nueva movie

	res.status(201).json(newMovie) // retornamos la nueva movie para actualizar el front
})

moviesRouter.patch('/:id', (req, res) => { // Ruta /movies/:id
	const result = validatePartialMovie(req.body) // validamos el body de la request

	if (result.error) {
		return res.status(400).json({error: JSON.parse(result.error.message)})
	}
	
	const { id } = req.params // obtenemos la id de la movie a buscar
	const movieIndex = movies.findIndex(movie => movie.id === id)

	if (movieIndex < 0){
		return res.status(404).json({message:'Movie not found'})
	} 

	const updateMovie ={
		...movies[movieIndex],
		...result.data
	}

	console.log(updateMovie)
	movies[movieIndex] = updateMovie
	return res.status(200).json(updateMovie)
})