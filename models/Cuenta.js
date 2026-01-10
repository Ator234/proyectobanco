import Sequelize from "sequelize";
import db from "../config/db.js";

export const Cuenta = db.define("cuentas",{
    iban: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.ENUM('AHORRO', 'CORRIENTE', 'NOMINA'),
        defaultValue: 'CORRIENTE'
    },
    fecha: {
        type: Sequelize.DATE,
    },
    dineroTotal: {
        type: Sequelize.INTEGER,
    }
});