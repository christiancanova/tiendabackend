const { Router } = require("express");
const router = Router();
const file = "./carrito.txt";
const Container = require("../persistence/containerCarrito.js");
const contenedor = new Container();
const myScript = 'public/main.js';

const admin = true;

router.get("/", async (req, res) => {
  try {
    const carritos = await contenedor.getAll();
    carritos
      ? res.status(200).json(carritos)
      : res.status(404).json({ message: "No hay carritos disponibles" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const carrito = await contenedor.getById(req.params.id);
    carrito
      ? res.status(200).json(carrito)
      : res
          .status(404)
          .json({ message: "Carrito no encontrado. id: " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/",  (req, res) => {
  try {
    const nuevoCarrito =  contenedor.create(req.body);
    res.status(201).json({
      message: "Carrito creado con éxito",
      carrito: nuevoCarrito,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// borrar un carrito por id
router.delete("/:id", async (req, res) => {
  try {
    const carrito = await contenedor.getById(req.params.id);
    if (carrito) {
      const carritoDeleted = await contenedor.deleteById(req.params.id);
      res.status(200).json({
        message: "Carrito eliminado con éxito",
        carrito: carritoDeleted,
      });
    } else {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// agregar un producto a un carrito
router.post("/:idCarrito/productos/:idProducto", async (req, res) => {
  try {
    const idCarrito = req.params.idCarrito;
    const idProducto = req.params.idProducto;
    const carrito = await contenedor.getById(idCarrito);
    const producto = await contenedor.getByIdProducto(idProducto);
    if (idCarrito && idProducto) {
      await contenedor.agregarProductoAlCarrito(idCarrito, idProducto);

      res.status(201).json({
        message: "Producto agregados con éxito",
        carrito: idCarrito,
        producto: idProducto,
      });
    }
    if (!carrito) {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
    if (!producto) {
      res.status(404).json({ message: "La lista de productos está vacía" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});

// borrar un producto de un carrito
router.delete("/:idCarrito/productos/:idProducto", async (req, res) => {
  try {
    const idCarrito = req.params.idCarrito;
    const idProducto = req.params.idProducto;
    const carrito = await contenedor.getById(idCarrito);
    const producto = await contenedor.getByIdProducto(idProducto);
    if (idCarrito && idProducto) {
      await contenedor.borrarProductoDelCarrito(idCarrito, idProducto);

      res.status(200).json({
        message: "Producto eliminado con éxito",
        carrito: idCarrito,
        producto: idProducto,
      });
    }
    if (!carrito) {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
    if (!producto) {
      res.status(404).json({ message: "La lista de productos está vacía" });
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});


// TODO: listas productos de un carrito
router.get("/:id/productos", async (req, res) => {
  try {
    const carrito = await contenedor.getById(req.params.id);
    if(carrito){
      const productos = await contenedor.listarProductosDeUnCarrito(req.params.id);
      res.status(200).json(productos);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;