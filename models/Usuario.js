import Sequelize from "sequelize";
import db from "../config/db.js";

export const Usuario = db.define("usuarios",{
    dni: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING,
    },
    apellidos: {
        type: Sequelize.STRING,
    },
    edad: {
        type: Sequelize.INTEGER,
    },
    direccion: {
        type: Sequelize.STRING,
    },
    contra: {
        type: Sequelize.STRING,
    }
})