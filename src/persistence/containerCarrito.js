const fs = require("fs");
const file = './carrito.txt';

class Container {
  constructor() {}

  


  read(file) {
    let all = [];
    try {
      all = fs.readFileSync('./carrito.txt', "utf8");
      all.length > 0 ? (all = JSON.parse(all)) : (all = []);
    } catch (err) {
      console.log("Error en la lectura del archivo", err);
    }
    return all;
  }

  
  readProducto(file) {
    let all = [];
    try {
      all = fs.readFileSync('./productos.txt', "utf8");
      all.length > 0 ? (all = JSON.parse(all)) : (all = []);
    } catch (err) {
      console.log("Error en la lectura del archivo", err);
    }
    return all;
  }

  write(allArray, file) {
    // vuelvo a convertir el array en string  para guardarlo en el archivo
    let json = JSON.stringify(allArray);
    try {
      fs.writeFileSync('./carrito.txt', json);
    } catch (err) {
      console.log("Error en la escritura", err);
    }
  }

  /**CRUD */

  save(item, file) {
    // Recibo un objeto del array
    console.log("Guardando...", item);
    // Consulto a la función getNextId para obtener proximo id disponible
    let nextId = this.getNextId(file);
    // Agrego la propiedad id al item
    item.id = nextId;
    // leo todos los archivos del file
    const allArray = this.read('./carrito.txt');
    // le agrego el nuevo item al array
    allArray.push(item);
    // Guardo el archivo
    this.write(allArray, './productos.txt');
    return item;
  }

  update(id, item, file) {
    console.log("Actualizando...", item);
    const allArray = this.read('./carrito.txt');
    let index = allArray.findIndex((item) => item.id == id);
    if (index >= 0) {
      item.id = id;
      allArray[index] = item;
      this.write(allArray, file);
      return item;
    }
  }

  getNextId(file) {
    let lastId = 0;
    let allArray = this.read('./carrito.txt');
    if (allArray.length > 0) {
      lastId = allArray[allArray.length - 1].id;
    }
    return lastId + 1;
  }

  getById(id, file) {
    let allArray = this.read('./carrito.txt');
    let item = allArray.find((item) => item.id == id);
    return item ? item : null;
  }

  getByIdProducto(id, file) {
    let allArray = this.readProducto('./productos.txt');
    let item = allArray.find((item) => item.id == id);
    return item ? item : null;
  }

  getAll(file) {
    let allArray = this.read('./carrito.txt');
    return allArray;
  }

  deleteById(id, file) {
    let allArray = this.read('./carrito.txt');
    let index = allArray.findIndex((item) => item.id == id);
    if (index >= 0) {
      allArray.splice(index, 1);
      let json = JSON.stringify(allArray);
      try {
        fs.writeFileSync('./carrito.txt', json);
        return id;
      } catch (err) {
        console.log("Error en la escritura", err);
      }
    }
  }

  borrarProductoDelCarrito(idCarrito, idProducto, file) {
    let carritos = this.read('./carrito.txt'); // trae todos los carritos
    let index = carritos.findIndex((item) => item.id == idCarrito);
    if (index >= 0) {
      let indexProducto = carritos[index].products.findIndex(
        (item) => item.id == idProducto
      );

      if (indexProducto >= 0) {
        carritos[index].products.splice(indexProducto, 1);
        let carritoActualizado = carritos[index];
         try {
          fs.writeFileSync('./carrito.txt', JSON.stringify(carritos));
          return carritoActualizado;
        } catch (err) {
          console.log("Error en la escritura", err);
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  agregarProductoAlCarrito(idProducto, idCarrito, file) {
    let carritos = this.read('./carrito.txt'); // trae todos los carritos
    let index = carritos.findIndex((item) => item.id == idCarrito);
    const producto = this.getByIdProducto(idProducto, './productos.txt');
    if (index >= 0 && producto) {
      console.log("Producto a agregar", producto, "al carrito id:", carritos[index]);
      carritos[index].products.push(producto); // le pusheo el producto al carrito
      let carritoActualizado = carritos[index];
      try {
        fs.writeFileSync('./carrito.txt', JSON.stringify(carritos));
        return carritoActualizado;
      } catch (err) {
        console.log("Error en la escritura", err);
      }
    } else {
      return null;
    }
  }

  listarProductosDeUnCarrito(idCarrito, file) {
    let carritos = this.read('./carrito.txt'); // trae todos los carritos
    let index = carritos.findIndex((item) => item.id == idCarrito);
    if (index >= 0) {
      return carritos[index].products;
    } else {
      return null;
    }
  }

  

   create(req, res) {
    try {
        let admin = true;
        if (fs.existsSync('./carrito.txt')) {
            let t = new Date();
            const cart = JSON.parse(fs.readFileSync('./carrito.txt', 'utf-8'));
            const products = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'));
            if (cart.length == 0) {
                const newCart = {
                    id: 1,
                    timestamp: `${t.getDate()}/${t.getMonth()+1}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`,
                    products: products,
                };
                cart.push(newCart);
                fs.writeFileSync('./carrito.txt', JSON.stringify(cart, null, 4), 'utf-8')
                res.status(201).send(`✔ New cart created! - ID:${newCart.id}`);
            } else {
                const lastCartId = cart[cart.length - 1].id;
                const newCartId = lastCartId + 1;
                const newCart = {
                    id: newCartId,
                    timestamp: `${t.getDate()}/${t.getMonth()+1}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`,
                    products: products,
                };
                cart.push(newCart);
                fs.writeFileSync('./carrito.txt', JSON.stringify(cart, null, 4), 'utf-8')
                res.status(201).send(`✔ New cart created! - ID:${newCart.id}`);
            }
        } else {
            const cart = [];
            const newProduct = req.body;
            newProduct.id = 1;
            cart.push(newProduct);
            fs.writeFileSync('./carrito.txt', JSON.stringify(cart, null, 4), 'utf-8');
        }
    }

    catch (err) {
        console.log(`METHOD createCart ERR! ${err}`);
    }
}
          
}

module.exports = Container;