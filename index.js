const express = require('express');
const morgan = require('morgan');
const routeProducts = require('./routes/productRoutes');
const path = require('path');
const {Server: ioServer} = require('socket.io');
const http = require('http');
const app = express();
const PORT = 8000;



const httpServer = http.createServer(app);


const io = new ioServer(httpServer);

//** Middlewares */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('views',path.join(__dirname, '/public/views' ));
app.set('view engine', 'ejs');


/** ROUTER */

app.use('/api/products', routeProducts);

app.get('/', (req, res) => {
    res.redirect('/api/products');
}
);

const messages = [];

// Nuevo servidor para el chat
io.on('connection', (socket) => {
    // el socket trae toda la data del cliente
     console.log('New user connected. Soquet ID : ', socket.id);


    socket.on('set-name', (name) => {
        console.log('set-name', name);
        socket.emit('user-connected', name);
        socket.broadcast.emit('user-connected', name);
    });
  

    socket.on('new-message', (message) => {
        messages.push(message);
        socket.emit('messages', messages);
        socket.broadcast.emit('messages', messages);
    });


    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
   
}
);


function onInit() {
    console.log('Iniciando App...');
}



try {
    httpServer.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}

onInit();