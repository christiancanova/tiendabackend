const express = require('express');
const morgan = require('morgan');
const routeProducts = require('./routes/productRoutes');
const path = require('path');
const app = express();
const PORT = 8000;


//** Middlewares */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// express.static hace publicos los archivos estaticos (pej:css-html-jpg) 
// que esten es la ruta que yo le indique.
app.use(express.static(__dirname + '/public'));
app.set('views',path.join(__dirname, 'views' ));
app.set('view engine', 'ejs');


/** ROUTER */
// Nota: recordar que todas las subrutas necesitan esta ruta base.
app.use('/api/products', routeProducts);

app.get('/', (req, res) => {
    res.redirect('/api/products');
}
);

function onInit() {
    console.log('Iniciando App...');
}

/** CONNECTION SERVER */

try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}

onInit();