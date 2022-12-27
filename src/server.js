import express from 'express';
import productosRouter from './routes/ProductosRoutes.js';
import carritosRouter from './routes/CarritosRoutes.js';
const app = express();


app.use(express.json());

//routes
app.use('/api/productos', productosRouter);
app.use('/api/carritos', carritosRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);