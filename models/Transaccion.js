import Sequelize from "sequelize";
import db from "../config/db.js";

export const Transaccion = db.define("transacciones", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ibanOrigen: {
        type: Sequelize.STRING,
    },
    ibanDestino: {
        type: Sequelize.STRING,
    },
    monto: {
        type: Sequelize.INTEGER,
    },
    fecha: {
        type: Sequelize.DATE,
    },
    dni: {
        type: Sequelize.STRING,
    },
    descripcion: {
        type: Sequelize.STRING,
    }
})