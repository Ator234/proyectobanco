//----------------------------------------------------------------------------------------------------------------------
//
// R E D I R E C C I O N E S
//
//----------------------------------------------------------------------------------------------------------------------
function redireccionUsuario(boton){
    //recupero la clave primaria que voy a buscar
    const dni = boton.getAttribute('data-info');

    //Preparo el fetch
    fetch(`/ampliacionUsuarios`, {
        //Lo envío por POST
        method: 'POST',

        //Le indico que lo enviaré en json
        headers: {
            'content-type': 'application/json'
        },

        //Preparo el json
        body: JSON.stringify({
            dni: dni
        })

    })
    .then(res => res.json())
    .then(data => {})
}
//----------------------------------------------------------------------------------------------------------------------
function redireccionCuenta(boton){
    const iban = boton.getAttribute('data-info');

    //Preparo el fetch
    fetch(`/ampliacionCuentas`, {
        //Lo envío por POST
        method: 'POST',

        //Le indico que lo enviaré en json
        headers: {
            'content-type': 'application/json'
        },

        //Preparo el json
        body: JSON.stringify({
            iban: iban
        })

    })
        .then(res => res.json())
        .then(data => {})
}
//----------------------------------------------------------------------------------------------------------------------
function redireccionVinculo(boton){
    const dni = boton.getAttribute('data-info');
    const iban = boton.getAttribute('data-info');

    //Preparo el fetch
    fetch(`/ampliacionVinculos`, {
        //Lo envío por POST
        method: 'POST',

        //Le indico que lo enviaré en json
        headers: {
            'content-type': 'application/json'
        },

        //Preparo el json
        body: JSON.stringify({
            dni: dni,
            iban: iban
        })

    })
        .then(res => res.json())
        .then(data => {})
}
//----------------------------------------------------------------------------------------------------------------------
function redireccionTransaccion(boton){
    const id = boton.getAttribute('data-info');

    //Preparo el fetch
    fetch(`/ampliacionTransacciones`, {
        //Lo envío por POST
        method: 'POST',

        //Le indico que lo enviaré en json
        headers: {
            'content-type': 'application/json'
        },

        //Preparo el json
        body: JSON.stringify({
            id: id
        })

    })
        .then(res => res.json())
        .then(data => {})
}
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//
// M O S T R A R     B O T O N E S
//
//----------------------------------------------------------------------------------------------------------------------
function mostrarConfirmar(tipo){
    let actualizar = document.getElementById('btnActualizar');
    let confirmar = document.getElementById('btnConfirmar');
    let cancelar = document.getElementById('btnCancelar');
    let borrar = document.getElementById('btnBorrrar');

    actualizar.classList.add('d-none');
    confirmar.classList.remove('d-none');
    borrar.classList.add('d-none');
    cancelar.classList.remove('d-none');

    switch (tipo){
        case 'cuentas':
            document.getElementById('tipo').disabled = false;
            document.getElementById('creacion').disabled = false;
            document.getElementById('monto').readOnly = false;
            break;
        case 'usuarios':
            document.getElementById('imagen').disabled = false;
            document.getElementById('edad').readOnly = false;
            document.getElementById('nombre').readOnly = false;
            document.getElementById('apellidos').readOnly = false;
            document.getElementById('direccion').readOnly = false;
            break;
        case 'vinculos':
            document.getElementById('participacion').readOnly = false;
    }
}
//----------------------------------------------------------------------------------------------------------------------
//
// M O S T R A R     P A R T I C I P A N T E S
//
//----------------------------------------------------------------------------------------------------------------------
function cargarParticipantes(){
    const iban = document.getElementById('iban').value;

    fetch(`/participantes`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            iban: iban
        })
    })
    .then(res => res.json())
    .then(data => {
        const select = document.getElementById('participantes');
        //Ahora por cada elemento del json creo una opción
        data.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.dni;
            option.textContent = usuario.dni;
            select.appendChild(option);
        });
    })
}
//----------------------------------------------------------------------------------------------------------------------
//
// H A B I L I T A R       R E E M B O L S O
//
//----------------------------------------------------------------------------------------------------------------------
function calcularTiempo(){
    const fechaAntigua = document.getElementById('creacion').value;
    const ahora = new Date();
    const fechaRegistro = new Date(fechaAntigua);

    // La resta devuelve la diferencia en MILISEGUNDOS
    const diferenciaMilisegundos = ahora - fechaRegistro;

    // Convertimos milisegundos a días
    // (1000 ms * 60 s * 60 m * 24 h)
    const milisegundosPorDia = 1000 * 60 * 60 * 24;

    const diasPasados = Math.floor(diferenciaMilisegundos / milisegundosPorDia);

    if(diasPasados < 2){
        document.getElementById('btnTransaccion').disabled = false;
    }
}