class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName() {
        console.log(`Nombre completo:  ${this.nombre} ${this.apellido}`)
    }
    addMascotas = (masc) => {
        this.mascotas.push(masc)
    }
    countMascotas() {
        console.log(this.mascotas.length)
    }
    addBook = (lib) => {
        this.libros.push(lib)
    }
    getBookNames() {

        return this.libros.map((libros) => libros.nombre)
    };



}

const usuario = new Usuario("Christian", "Canova",
    [{
        nombre: "Ficciones",
        autor: "Borges"
    },
    {
        nombre: "Rayuela",
        autor: "Cortazar"
    }],
    ["Aguila", "Pez", "Gato"]
)

usuario.getFullName()

usuario.addMascotas("Perro")
console.log(usuario.mascotas)

usuario.countMascotas()

usuario.addBook({ nombre: "Civilización y Barbarie", autor: "Domingo Faustino Sarmiento" })

console.log(usuario.getBookNames())








