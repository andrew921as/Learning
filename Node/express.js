const express = require('express');
const app = express();

app.disable('x-powered-by'); // Deshabilita el header X-Powered-By

const PORT = process.env.PORT ?? 1234;

app.use(express.json())
//Toda la logica de abajo se puede resumir con la linea de arriba : app.use(express.json())

// app.use((req,res,next)=>{
//     if (req.methos != 'POST') return next()
//     if (req.headers['content-type'] != 'application/json') return next() 
//     let body =''
//     req.on('data', chunk =>{
//         body += chunk.toString()
//     })
//     req.on('end', ()=>{
//         const data = JSON.parse(body)
//         req.body = data
//         next()
//     })
// })

app.get('/', (req, res) => { // Ruta principal
    res.status(200).send('Hola mundo');
}); 


//Crear un error 404, esto se tiene que hacer siempre al final de las rutas
app.use((req, res) => {
    res.status(404).send(<h1>404</h1>);
});

app.listen(PORT, () => {// Escucha en el puerto 1234
    console.log(`Server listening on port ${PORT}`)
}); 