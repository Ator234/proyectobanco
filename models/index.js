import { Transaccion } from './Transaccion.js';
import { Cuenta } from './Cuenta.js';
import { Usuario } from './Usuario.js';
import { Vinculo } from './Vinculo.js';

//------------------------------------------------------
//              R E L A C I O N E S
//------------------------------------------------------
//RELACIÓN USUARIO - VINCULO (Uno a Muchos)
Usuario.hasMany(Vinculo, { foreignKey: 'dni', sourceKey: 'dni' });
Vinculo.belongsTo(Usuario, { foreignKey: 'dni', targetKey: 'dni' });

//RELACIÓN CUENTA - VINCULO (Uno a Muchos)
Cuenta.hasMany(Vinculo, {
    foreignKey: 'iban', //Columna en Vinculo
    sourceKey: 'iban'   //Columna en Cuenta
});
Vinculo.belongsTo(Cuenta, {
    foreignKey: 'iban',
    targetKey: 'iban'
});

//RELACIÓN TRANSACCIÓN - CUENTAS
//Una transacción tiene una cuenta de ORIGEN y una de DESTINO
Transaccion.belongsTo(Cuenta, {
    as: 'Origen',
    foreignKey: 'ibanOrigen', // Columna en Transaccion
    targetKey: 'iban'       // Columna en Cuenta
});
Transaccion.belongsTo(Cuenta, {
    as: 'Destino',
    foreignKey: 'ibanDestino',
    targetKey: 'iban'
});

export {
    Transaccion, Cuenta, Usuario, Vinculo,
}