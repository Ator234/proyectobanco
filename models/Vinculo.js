import Sequelize from "sequelize";
import db from "../config/db.js";

export const Vinculo = db.define("vinculos",{
    dni: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    iban: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    participacion: {
        type: Sequelize.INTEGER,
    }
})