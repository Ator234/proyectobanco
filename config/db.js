import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

//Datos para conectar con la bdd
/*const db = new Sequelize('sergio123_banco','sergio123','1Jp7I8232iXv', {
    host: "mysql-sergio123.alwaysdata.net",
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});*/
const db = new Sequelize(process.env.CONEXION,{
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
export default db;