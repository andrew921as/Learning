const http = require('node:http'); // Importa el módulo http
const { url } = require('node:inspector');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 3001;

const processRequest = (req, res) =>{
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Hola mundo Pagina principal');
    }else if (req.url === '/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({users: [{name: 'John Doe', age: 30}]}));
    }else if (req-url === '/imagenBonita') { 
        fs.readFile('./landscape.jpg', (err, data) => {
            if (err){
                res.statusCode = 500;
                res.end('Error interno');
            }else{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'image/jpeg');
                res.end(data);
            } 
        })
    }else{
        res.statusCode = 404;
        res.end('404');
    }

}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`Server listening on port ${desiredPort}`)
})