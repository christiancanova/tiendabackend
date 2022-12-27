
let productosDao
let carritosDao

import('./productos/MongoDBProductos.js').then(({ MongoDBProductos }) => {
    productosDao = new MongoDBProductos();
})

import('./carritos/MongoDBCarritos.js').then(({ MongoDBCarritos }) => {
    carritosDao = new MongoDBCarritos();
})

import('./productos/FirebaseProductos.js').then(({ FirebaseProductos }) => {
    productosDao = new FirebaseProductos();
})
//import('./carritos/FirebaseCarrito.js').then(({ FirebaseCarrito }) => {
//    carritosDao = new FirebaseCarrito();
//})



export { productosDao, carritosDao };