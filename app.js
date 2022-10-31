
const Container = require('./contenedor')

const container = new Container();
const file = './products.txt';
const productsArray = [
  {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
  },
  {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
  },
  {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
  }
]

function onInit() {
  console.log('Inicio...');
  const fileCreated = container.createFile(file);
  fileCreated ? saveAllProducts() : console.log('No se pudo guardar productos');
  fileCreated ? getAllProducts() : console.log('No se pudo leer productos');
  const productFound = fileCreated ? findOneById(1) : null;
  productFound ? deleteProduct(1) : null;
  finishApp();
}

function saveAllProducts() {
  productsArray.map(product => {
    container.save(product, file);
  });
}

function getAllProducts() {
  const allProductsArray = container.read(file);
  console.log('Productos: ', allProductsArray);
}

function findOneById(id) {
  const product = container.getById(id, file);
  product ? console.log('Producto encontrado: ', product) : console.log('Producto no encontrado');
  return product ? true : false;
}

function deleteProduct(id) {
  const productDeleted = container.deleteById(id, file);
  console.log('Producto eliminado ID: ', productDeleted);
}

function finishApp() {
  container.deleteAll(file);
  console.log('Fin');
}

onInit();
