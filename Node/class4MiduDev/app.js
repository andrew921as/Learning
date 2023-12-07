import express, { json } from 'express'; // importamos express -> CommonJS (un framework para crear servidores)
import cors from 'cors'; // importamos cors -> CommonJS (un middleware para habilitar CORS)
import { moviesRouter } from './routes/movies.js';


const app = express();
app.disable('x-powered-by'); // Deshabilita el header X-Powered-By: Express
app.use(json()); // Middleware para parsear el body de la request a JSON
app.use(cors({
	origin: (origin, callback) =>{
		const ACEPPTED_ORIGINS = [
			'http://localhost:3000', 
			'https://movies.com']
		if(ACEPPTED_ORIGINS.includes(origin) || !origin){
			callback(null, true)
		}else{
			callback(new Error('Origin not allowed'))
		}
	}
})); // Middleware para habilitar CORS

app.use('/movies', moviesRouter); // Middleware para usar el router de movies

const PORT = process.env.PORT ?? 1234; // Puerto

app.listen(PORT, () => { // Escucha en el puerto 1234	
		console.log(`Server listening on port ${PORT}`);
});
