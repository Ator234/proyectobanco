//Importar el módulo express para crear apliaciones web
import express from 'express';
import {paginaInicio, paginaAmpliacionTransaccion, paginaAmpliacionVinculo, paginaFormularioTransaccion, paginaFormularioCuenta, paginaFormularioVinculo,
paginaAmpliacionCuenta, paginaListadoCuenta, paginaListadoTransaccion, paginaAmpliacionUsuario, paginaFormularioUsuario, paginaListadoVinculo, paginaListadoUsuario,
altaCuenta, altaTransaccion, altaVinculo, altaUsuario, validoInput, cargoCuentas, bajaCuenta, bajaVinculo, bajaUsuario,
actualizoCuenta, actualizoVinculo , actualizoUsuario, obtenerUsuarios, vinculoDesdeUsuario, vinculoDesdeCuenta, transaccionDesdeUsuario,
reembolsaTransaccion} from "../controllers/paginaController.js";

const router = express.Router();

//Creo un endpoint de get en la web
router.get('/', paginaInicio );

//Routers de listados
router.get('/listadoCuentas', paginaListadoCuenta );
router.get('/listadoUsuarios', paginaListadoUsuario );
router.get('/listadoVinculos', paginaListadoVinculo );
router.get('/listadoTransacciones', paginaListadoTransaccion );

//Routers de formularios (Para ver las paginas y hacer las altas)
router.get('/formularioCuentas', paginaFormularioCuenta );
router.post("/cuenta/crear", altaCuenta);
router.get('/formularioUsuarios', paginaFormularioUsuario );
router.post("/usuario/crear", altaUsuario);
router.get('/formularioVinculos', paginaFormularioVinculo );
router.post("/vinculo/crear", altaVinculo);
router.get('/formularioTransacciones', paginaFormularioTransaccion );
router.post("/transaccion/crear", altaTransaccion);

//Router para páginas de ampliación
router.get('/ampliacionCuentas/:iban', paginaAmpliacionCuenta );
router.get('/ampliacionUsuarios/:dni', paginaAmpliacionUsuario );
router.get('/ampliacionVinculos/:dni/:iban', paginaAmpliacionVinculo );
router.get('/ampliacionTransacciones/:id', paginaAmpliacionTransaccion );

//Routers para carga asincrona de datos en los formularios
router.post('/comprobacion/input', validoInput);
router.post('/cargar/cuentas', cargoCuentas);

//Routers para bajas
router.get('/baja/usuario/:dni', bajaUsuario);
router.get('/baja/cuenta/:iban', bajaCuenta);
router.get('/baja/vinculo/:dni/:iban', bajaVinculo);

//Routers para actualizaciones
router.post('/actualizar/cuenta', actualizoCuenta);
router.post('/actualizar/usuario', actualizoUsuario);
router.post('/actualizar/vinculo', actualizoVinculo);

//Router de información adicional en ampliacion de cuentas
router.post('/participantes', obtenerUsuarios);

//Routers para cargar formularios facilitados
router.get('/cargarTransaccionUsuario/:dni', transaccionDesdeUsuario);
router.get('/cargarVinculoUsuario/:dni', vinculoDesdeUsuario);
router.get('/cargarVinculoCuenta/:iban', vinculoDesdeCuenta);

//Router de reembolsado
router.post('/reembolsar',reembolsaTransaccion)


export default router;