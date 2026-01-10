//P A G I N A S      D E      I N I C I O S
import {Cuenta} from "../models/index.js";
import {Transaccion} from "../models/index.js";
import {Usuario} from "../models/index.js";
import {Vinculo} from "../models/index.js";
import bcrypt from 'bcryptjs';

const paginaInicio = (req, res) => {
    res.render('inicio', {
        pagina: 'Inicio'
    });
}



//P A G I N A S     D E     L I S T A D O S
//----------------------------------------------------------------------------------------------------------------------
const paginaListadoUsuario = async (req, res) => {
    //Recupero en formato JSON todos los usuarios
    const UsuariosDirectos = await Usuario.findAll({raw: true});

    //Los mapeo a un array bidimensional por mayor comodidad con gridjs
    const usuarios = UsuariosDirectos.map(usuario => [
        usuario.dni,
        usuario.nombre,
        usuario.apellidos,
        usuario.edad,
        `<div class='d-flex justify-content-center'>
            <a href='/ampliacionUsuarios/${usuario.dni}' class='btn btn-warning btn-sm'>
                Más Información
            </a>
        </div>`
    ]);

    //Renderizo la web y le paso la información y las variables necesarias
    res.render('listados/usuarios', {
        pagina: 'Listados',
        usuarios: usuarios
    });
}
//----------------------------------------------------------------------------------------------------------------------
const paginaListadoCuenta = async (req, res) => {
    //Recupero en formato JSON todos los usuarios
    const cuentasDirectas = await Cuenta.findAll({raw: true});

    //Los mapeo a un array bidimensional por mayor comodidad con gridjs
    const cuentas = cuentasDirectas.map(cuenta => [
        cuenta.iban,
        cuenta.tipo,
        `<div class='d-flex justify-content-center'>
            <a href='/ampliacionCuentas/${cuenta.iban}' class='btn btn-warning btn-sm'>
                Más Información
            </a>
        </div>`
    ]);

    //Renderizo la web y sus variables
    res.render('listados/cuentas', {
        pagina: 'Listados',
        cuentas: cuentas
    });
}
//----------------------------------------------------------------------------------------------------------------------
const paginaListadoVinculo = async (req, res) => {
    //Recupero en formato JSON todos los usuarios
    const VinculosDirectos = await Vinculo.findAll({raw: true});

    //Los mapeo a un array bidimensional por mayor comodidad con gridjs
    const vinculos = VinculosDirectos.map(vinculo => [
        vinculo.dni,
        vinculo.iban,
        `<div class='d-flex justify-content-center'>
            <a href='/ampliacionVinculos/${vinculo.dni}/${vinculo.iban}' class='btn btn-warning btn-sm'>
                Más Información
            </a>
        </div>`
    ]);

    //Renderizo la web y sus variables
    res.render('listados/vinculos', {
        pagina: 'Listados',
        vinculos: vinculos
    });
}
//----------------------------------------------------------------------------------------------------------------------
const paginaListadoTransaccion = async (req, res) => {
    //Recupero en formato JSON todos los usuarios
    const TransaccionesDirectas = await Transaccion.findAll({raw: true});

    //Los mapeo a un array bidimensional por mayor comodidad con gridjs
    const transacciones = TransaccionesDirectas.map(transaccion => [
        transaccion.id,
        transaccion.ibanOrigen,
        transaccion.ibanDestino,
        transaccion.dni,
        `<div class='d-flex justify-content-center'>
            <a href='/ampliacionTransacciones/${transaccion.id}' class='btn btn-warning btn-sm'>
                Más Información
            </a>
        </div>`
    ]);

    //Renderizo la web y sus variables
    res.render('listados/transacciones', {
        pagina: 'Listados',
        transacciones: transacciones
    });
}



//P A G I N A S     D E     F O R M U L A R I O S
const paginaFormularioUsuario = (req, res) => {
    res.render('formularios/usuarios', {
        pagina: 'Formularios'
    });
}
const paginaFormularioCuenta = (req, res) => {
    res.render('formularios/cuentas', {
        pagina: 'Formularios'
    });
}
const paginaFormularioVinculo = (req, res) => {
    res.render('formularios/vinculos', {
        pagina: 'Formularios'
    });
}
const paginaFormularioTransaccion = (req, res) => {
    res.render('formularios/transacciones', {
        pagina: 'Formularios'
    });
}



//P A G I N A S     D E     A M P L I A C I O N E S
//----------------------------------------------------------------------------------------------------------------------
const paginaAmpliacionUsuario = async (req, res) => {
    //Obtengo un dni
    const {dni} = req.params;

    //Busco el usuario del que voy a sacar toda la información
    const usuario = await Usuario.findByPk(dni);

    //Estas variables son las estadísticas que voy a sacar
    let dineroTotal = 0;
    let cuentasTotales = 0;

    try{
        //Primero saco todos los vínculos que tiene este usuario en concreto
        const vinculos = await Vinculo.findAll({
            where: {
                dni: dni
            }
        });

        //Por cada vinculo que tiene
        for(const vinculo of vinculos){
            //Saco todas las personas que participan en ese vinculo
            const participantes = await Vinculo.findAll({
                where: {
                    iban: vinculo.iban
                }
            })

            //Esto es lo que participa el usuario que estamos viendo
            let participacionUsuario = vinculo.participacion;

            //Aqui vamos a sacar la participacion de todos
            let participacionResto = 0;

            //Sumamos la participacion de todos, incluido el usuario que estamos viendo
            participantes.forEach(participante => {
                participacionResto += participante.participacion;
            })

            //Buscamos la cuenta en la bdd para así saber cuanto dinero tiene
            const cuenta = await Cuenta.findByPk(vinculo.iban);

            //Ejecutamos la formula para saber cuanto dinero le corresponde al usuario por este vinculo en concreto
            dineroTotal += cuenta.dineroTotal * (participacionUsuario / participacionResto);

            //Sumamos el número de cuentas
            cuentasTotales++;
        }

    } catch (error){
        return res.render('listados/transacciones', {
            pagina: 'Listados',
            error: 'Error al cargar más informacion sobre: '+dni
        });
    }


    res.render('ampliaciones/usuarios', {
        pagina: 'Ampliaciones',
        dni: dni,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        edad: usuario.edad,
        direccion: usuario.direccion,
        dineroTotal: dineroTotal,
        cuentasTotales: cuentasTotales
    });
}
//----------------------------------------------------------------------------------------------------------------------
const paginaAmpliacionCuenta = async (req, res) => {
    //Recupero el iban por get
    const {iban} = req.params;

    //Busco la cuenta de ese iban
    const cuenta = await Cuenta.findByPk(iban);

    //Formateo la fecha para que me la cargue bien
    const fechaFormateada = cuenta.fecha.toISOString().split('T')[0];

    //Busco el número total de participantes de una cuenta
    const totalParticipantes = await Vinculo.count({
        where: {
            iban: iban
        }
    })

    res.render('ampliaciones/cuentas', {
        pagina: 'Ampliaciones',
        iban: iban,
        tipo: cuenta.tipo,
        fecha: fechaFormateada,
        dineroTotal: cuenta.dineroTotal,
        participantes: totalParticipantes
    });
}
//----------------------------------------------------------------------------------------------------------------------
const paginaAmpliacionVinculo = async (req, res) => {
    //Recupero por get el dni y el iban
    const {iban, dni} = req.params;

    //Busco el vinculo
    const vinculo = await Vinculo.findOne({ where: { dni, iban } });

    //Busco la cuenta
    const cuenta = await Cuenta.findByPk(iban);

    //Saco todas las personas que participan en ese vinculo
    const participantes = await Vinculo.findAll({
        where: {
            iban: iban
        }
    })

    //Esto es lo que participa el usuario que estamos viendo
    let participacionUsuario = vinculo.participacion;

    //Aqui vamos a sacar la participacion de todos
    let participacionResto = 0;

    //Sumamos la participacion de todos, incluido el usuario que estamos viendo
    participantes.forEach(participante => {
        participacionResto += participante.participacion;
    })

    //Ejecutamos la formula para saber cuanto dinero le corresponde al usuario por este vinculo en concreto
    let dinero = cuenta.dineroTotal * (participacionUsuario / participacionResto);
    dinero = dinero.toFixed(2);

    res.render('ampliaciones/vinculos', {
        pagina: 'Ampliaciones',
        dni: dni,
        iban: iban,
        participacion: vinculo.participacion,
        dineroTotal: cuenta.dineroTotal,
        dinero: dinero
    });
}
//----------------------------------------------------------------------------------------------------------------------
const paginaAmpliacionTransaccion = async (req, res) => {
    //Obtengo el id de transaccion
    const { id } = req.params;

    //Busco la transaccion
    const transaccion = await Transaccion.findByPk(id);

    //Formateo la fecha
    const fechaFormateada = transaccion.fecha.toISOString().split('T')[0];

    //Envio la nueva información de la transaccion
    if(transaccion){
        res.render('ampliaciones/transacciones', {
            pagina: 'Ampliaciones',
            id: id,
            ibanOrigen: transaccion.ibanOrigen,
            ibanDestino: transaccion.ibanDestino,
            monto: transaccion.monto,
            fecha: fechaFormateada,
            dni: transaccion.dni,
            descripcion: transaccion.descripcion
        });
    }

}

//I N F O R M A C I Ó N     D E     F O R M U L A R I O S
//----------------------------------------------------------------------------------------------------------------------
const altaTransaccion = async (req, res) => {
    const { dni, cantidad, ibanEmisor, ibanDestino, fecha, descripcion, contra } = req.body;
    const cantidadNumero = Number(cantidad);

    try {
        //Confirmo el usuario y la contraseña
        const usuario = await Usuario.findByPk(dni);

        //Si no hay coincidencia recargo la página
        if (!usuario) {
            return res.render('formularios/transacciones', {
                pagina: 'Formularios',
                error: 'Usuario inexistente'
            });
        }

        //Compruebo la contraseña
        const aceptado = await bcrypt.compare(contra, usuario.contra);

        //Si no hay coincidencia recargo la página
        if (!aceptado) {
            return res.render('formularios/transacciones', {
                pagina: 'Formularios',
                error: 'Contraseña incorrecta'
            });
        }

        //Busco las cuentas para comprobar
        const cuentaOrigen = await Cuenta.findByPk(ibanEmisor);
        const cuentaDestino = await Cuenta.findByPk(ibanDestino);

        //Si no encuentra la cuenta de origen o no tiene el saldo suficiente
        if (!cuentaOrigen || cuentaOrigen.dineroTotal < cantidadNumero) {
            return res.render('formularios/transacciones', {
                pagina: 'Formularios',
                error: 'Saldo insuficiente o cuenta no encontrada'
            });
        }

        //Creo la transaccion en la bdd
        await Transaccion.create({
            ibanOrigen: ibanEmisor,
            ibanDestino,
            monto: cantidadNumero,
            fecha,
            dni,
            descripcion
        });

        //Le resto a la cuenta origen el dinero de la transacción
        await cuentaOrigen.decrement('dineroTotal', { by: cantidadNumero });

        //Le aumento el dinero a la cuenta de destino
        if (cuentaDestino) {
            await cuentaDestino.increment('dineroTotal', { by: cantidadNumero });
        }

        //Vuelvo al listado
        res.redirect('/listadoTransacciones');

    } catch (error) {
        return res.render('formularios/transacciones', {
            pagina: 'Formularios',
            error: 'Error técnico al procesar la operación'
        });
    }
}
//----------------------------------------------------------------------------------------------------------------------
const altaCuenta = async (req, res) => {
    //Leo los datos del formulario
    const { iban, tipo, fecha, monto } = req.body;

    try {
        //Creo en la bdd la transacción
        await Cuenta.create({
            iban,
            tipo,
            fecha,
            dineroTotal: monto
        });

        //Redirijo al listado
        res.redirect('/listadoCuentas');

    } catch (error) {
        return res.render('formularios/cuentas', {
            pagina: 'Formularios',
            error: 'Hubo un error al guardar'
        });
    }
}
//----------------------------------------------------------------------------------------------------------------------
const altaUsuario = async (req, res) => {
    //Leo los datos del formulario
    const { dni, edad, nombre, apellidos, direccion, contra } = req.body;

    try {
        //Creo un salt para hacer un hasheado único de mi contraseña
        const salt = await bcrypt.genSalt(10)

        //Ahora hasheo la contraseña
        const contraHasheada = await bcrypt.hash(contra, salt);

        //Creo en la bdd la transacción
        await Usuario.create({
            dni,
            nombre,
            apellidos,
            edad,
            direccion,
            contra: contraHasheada
        });

        //Redirijo al listado
        res.redirect('/listadoUsuarios');

    } catch (error) {
        return res.render('formularios/usuarios', {
            pagina: 'Formularios',
            error: 'Hubo un error al guardar'
        });
    }
}
//----------------------------------------------------------------------------------------------------------------------
const altaVinculo = async (req, res) => {
    //Leo los datos del formulario
    const { dni, participacion, iban } = req.body;

    try {
        //Creo en la bdd la transacción
        await Vinculo.create({
            dni,
            iban,
            participacion
        });

        //Redirijo al listado
        res.redirect('/listadoVinculos');

    } catch (error) {
        return res.render('formularios/vinculos', {
            pagina: 'Formularios',
            error: 'Ya existe un vinculo de esta cuenta y este usuario'
        });
    }
}
//----------------------------------------------------------------------------------------------------------------------

//  V A L I D A C I O N     D E     I N P U T S
//----------------------------------------------------------------------------------------------------------------------
const validoInput = async (req, res) => {
    //Con req.body recupero el valor que me envian por POST
    const { buscar, tipo } = req.body;
    //Si el tipo es dni busco en usuario por Primary Key
    if (tipo === 'dni') {
        //Hago la busqueda
        const existe = await Usuario.findByPk(buscar);

        //Si existe envio true si no false
        if (existe) {
            res.json({valido: true})
        }else{
            res.json({valido: false})
        }
    }
    //Si no estoy buscando un IBAN
    else{
        //Busco por clave primaria en cuentas
        const existe = await Cuenta.findByPk(buscar);

        //Si existe envio true si no false
        if (existe) {
            res.json({valido: true})
        }else{
            res.json({valido: false})
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------
const cargoCuentas = async (req, res) => {
    //Recupero los valores del post
    const { buscar } = req.body;

    //Hago la consulta con el sequelize
    const vinculos = await Vinculo.findAll({
        where: {
            dni: buscar
        },
        attributes: ['iban'] // Solo nos interesa el IBAN
    });

    res.json(vinculos);
}

// B A J A S
//----------------------------------------------------------------------------------------------------------------------
const bajaCuenta = async (req, res) => {
    const {iban} = req.params;
    try{
        await Cuenta.destroy({
            where: {
                iban: iban
            }
        })

        res.redirect('/listadoCuentas');
    }catch(err){
        return res.render('ampliaciones/cuentas', {
            pagina: 'Ampliaciones',
            error: 'Error borrando cuenta'
        })
    }


}
//----------------------------------------------------------------------------------------------------------------------
const bajaUsuario = async (req, res) => {
    const {dni} = req.params;
    try{
        await Usuario.destroy({
            where: {
                dni: dni
            }
        })

        res.redirect('/listadoUsuarios');
    }catch(err){
        return res.render('ampliaciones/usuarios', {
            pagina: 'Ampliaciones',
            error: 'Error borrando usuario'
        })
    }
}
//----------------------------------------------------------------------------------------------------------------------
const bajaVinculo = async (req, res) => {
    const {dni,iban} = req.params;
    try{
        await Vinculo.destroy({
            where: {
                dni: dni,
                iban: iban
            }
        })
        res.redirect('/listadoVinculos');
    }catch(err){
        return res.render('ampliaciones/vinculos', {
            pagina: 'Ampliaciones',
            error: 'Error borrando vinculo'
        })
    }


}
//----------------------------------------------------------------------------------------------------------------------

//  A C T U A L I Z A C I O N     D E      R E G I S T R O S
//----------------------------------------------------------------------------------------------------------------------
const actualizoCuenta = async (req, res) => {
    const {iban, tipo, creacion, monto} = req.body;

    try {
        await Cuenta.update({
            tipo: tipo,
            fecha: creacion,
            dineroTotal: monto
            }, {
                where: {
                    iban: iban
                }
            }
        );
        res.redirect(`/ampliacionCuentas/${iban}`);
    } catch (error) {
        return res.render('ampliaciones/cuentas', {
            pagina: 'Ampliaciones',
            error: 'Error actualizando la cuenta'
        })
    }
}
//----------------------------------------------------------------------------------------------------------------------
const actualizoUsuario = async (req, res) => {
    const {dni, edad, nombre, apellidos, direccion} = req.body;

    try {
        await Usuario.update({
                nombre: nombre,
                apellidos: apellidos,
                edad: edad,
                direccion: direccion
            }, {
                where: {
                    dni: dni
                }
            }
        );
        res.redirect(`/ampliacionUsuarios/${dni}`);
    } catch (error) {
        return res.render('ampliaciones/usuarios', {
            pagina: 'Ampliaciones',
            error: 'Error actualizando el usuario'
        })
    }
}
//----------------------------------------------------------------------------------------------------------------------
const actualizoVinculo = async (req, res) => {
    const {dni, participacion, iban} = req.body;

    try {
        await Vinculo.update({
                participacion: participacion
            }, {
                where: {
                    dni: dni,
                    iban: iban
                }
            }
        );
        res.redirect(`/ampliacionVinculos/${dni}/${iban}`);
    } catch (error) {
        return res.render('ampliaciones/vinculos', {
            pagina: 'Ampliaciones',
            error: 'Error actualizando el vinculo'
        })
    }
}
//----------------------------------------------------------------------------------------------------------------------

//  I N F O R M A C I O N        A D I C I O N A L
//----------------------------------------------------------------------------------------------------------------------
/*
Esta función la llamo desde js para cargar dinámicamente todos los vinculos de una cuenta y mostrarlos en un más información
 */
const obtenerUsuarios = async (req, res) => {
    const {iban} = req.body;

    //Hago la consulta con el sequelize
    const vinculos = await Vinculo.findAll({
        where: {
            iban: iban
        },
        attributes: ['dni'] // Solo nos interesa el IBAN
    });

    //Devuelvo los vinculos que tiene el usuario
    res.json(vinculos);
}

//  F O R M U L A R I O S      F A C I L I T A D O S
//----------------------------------------------------------------------------------------------------------------------
const transaccionDesdeUsuario = async (req, res) => {
    const {dni} = req.params;

    res.render('formularios/transaccionesUsuario', {
        dni: dni
    })
}
//----------------------------------------------------------------------------------------------------------------------
const vinculoDesdeUsuario = async (req, res) => {
    const {dni} = req.params;

    res.render('formularios/vinculoDesdeUsuario', {
        dni: dni
    })
}
//----------------------------------------------------------------------------------------------------------------------
const vinculoDesdeCuenta = async (req, res) => {
    const {iban} = req.params;

    res.render('formularios/vinculoDesdeCuenta', {
        iban: iban
    })
}
//----------------------------------------------------------------------------------------------------------------------

//  R E E M B O L S O    D E     T R A N S A C C I O N E S
//----------------------------------------------------------------------------------------------------------------------
const reembolsaTransaccion = async (req, res) => {
    //Solo recupero los iban, el dinero y el id porque es lo único que me interesa.
    const {ibanOrigen, ibanDestino, monto, id} = req.body;
    const cantidadNumero = Number(monto);

    try{
        //Puntero cuenta de origen
        const cuentaOrigen = await Cuenta.findOne({
            where: {
                iban: ibanOrigen
            }
        })

        //Puntero cuenta destino
        const cuentaDestino = await Cuenta.findOne({
            where: {
                iban: ibanDestino
            }
        })

        //Reembolsado
        await cuentaDestino.decrement('dineroTotal', { by: cantidadNumero });
        await cuentaOrigen.increment('dineroTotal', { by: cantidadNumero });



        try{
            //Elimino la transaccion de la bdd
            await Transaccion.destroy({
                where: {
                    id: id
                }
            })
        }catch(err){
            console.log('Error borrando la transaccion');
            console.log(err);
        }


        //Vuelvo al listado
        res.redirect('/listadoTransacciones');
    }catch(error){
        return res.render('ampliaciones/transacciones', {
            pagina: 'Ampliaciones',
            error: 'Error reembolsando la transaccion'
        })
    }
}

export{
    paginaInicio,

    paginaListadoUsuario,
    paginaListadoVinculo,
    paginaListadoTransaccion,
    paginaListadoCuenta,

    paginaFormularioUsuario,
    paginaFormularioCuenta,
    paginaFormularioVinculo,
    paginaFormularioTransaccion,

    paginaAmpliacionUsuario,
    paginaAmpliacionVinculo,
    paginaAmpliacionTransaccion,
    paginaAmpliacionCuenta,

    altaUsuario,
    altaVinculo,
    altaCuenta,
    altaTransaccion,

    validoInput,
    cargoCuentas,

    bajaCuenta,
    bajaVinculo,
    bajaUsuario,

    actualizoCuenta,
    actualizoVinculo,
    actualizoUsuario,

    obtenerUsuarios,

    transaccionDesdeUsuario,
    vinculoDesdeUsuario,
    vinculoDesdeCuenta,

    reembolsaTransaccion
}