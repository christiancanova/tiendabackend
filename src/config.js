export default {
    PORT: process.env.PORT || 8080,
   
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://ccanova:Ca1992db85@cluster0.tgef3ye.mongodb.net/?retryWrites=true&w=majority'
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'coderhouse',
            password: 'coderhouse',
            database: 'coderhouse'
        }
    },
    fileSystem: {
        path: './DB'
    }
}
