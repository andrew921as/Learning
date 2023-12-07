import z from 'zod'// importamos zod -> CommonJS (una libreria para validar el body de la request)

const movieSchema = z.object({
		title:z.string({
			invalid_type_error:'Title must be a string',
			required_error:'Title is required'
		}),
		year:z.number().int().min(1888).max(2077),
		director:z.string(),
		duration:z.number().int().positive(),
		rate:z.number().min(0).max(10).default(0),
		poster:z.string().url({
			message:'Poster must be a valid url'
		}),
		genre:z.array(
			z.enum(['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy','Film Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Short Film', 'Sport', 'Superhero', 'Thriller', 'War', 'Western']),
			{
				required_error:'Genre is required',
				invalid_type_error:'Movie genre must be an array of enum genres',
			}
		).min(1).max(5)
});

export function validateMovie(input){
	return movieSchema.safeParse(input)
}

export function validatePartialMovie(input){
	return movieSchema.partial().safeParse(input)
}

