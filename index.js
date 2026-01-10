//Importar el módulo express para crear apliaciones web
import express from 'express';
import router from "./routers/index.js";
import db from "./config/db.js";
import './models/index.js';
import * as dotenv from "dotenv";
dotenv.config();


//Esta es la instancia de la apliación expres
const app = express();

//Conectar a la bdd
const conectarDB = async () => {
    try {
        //Conexión a la bdd
        await db.authenticate();
        console.log('Conexión a la base de datos establecida.');

        //Sincronizo los modelos que he creado con mi bdd
        await db.sync();
        console.log('Tablas sincronizadas correctamente.');

    } catch (error) {
        console.error('Error al conectar o sincronizar:', error);
    }
};

conectarDB();

//Para poder coger la información de los formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Definimos el puerto por defecto
const port = process.env.PORT || 3000;

//Con esto le decimos que nuestras views vamos a usar pug
app.set('view engine', 'pug');

//Con esto le indico que acceda a public para coger los recursos de las vistas
app.use(express.static('public'));

//Esto devuele una variable a la vista
app.use((req,res,next)=>{
    res.locals.nombreP = 'BANCOS RUIZ';
    next();
})

//Para escuchar del puerto y ver que funcione
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

//Envia la lista
app.use('/',router);