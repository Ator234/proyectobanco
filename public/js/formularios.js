//FUNCION QUE GENERA EL IBAN EN EL PROPIO FORMULARIO
function generarIban() {
    let caracteres = '0123456789';
    let resultado = '';
    for (let i = 0; i < 10; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return `ES210000${resultado}`;
}

//FUNCION QUE COMPRUEBA LA VALIDEZ EN TIEMPO REAL DE LOS INPUTS
function comprobarValidez(id,longitud){
    //Primero obtengo el valor del input
    let input = document.getElementById(id).value;

    //Puntero al boton del formulario
    let boton = document.getElementById('confirmar');

    //Compruebo que tipo de dato quiero buscar
    let tipo = 'iban';
    if(longitud===9){
        tipo = 'dni';
    }

    //Si la longitud es la adecuada para la comprobación
    if(input.length === longitud){

        //Preparo el fetch
        fetch(`/comprobacion/input`, {
            //Lo envío por POST
            method: 'POST',

            //Le indico que lo enviaré en json
            headers: {
                'content-type': 'application/json'
            },

            //Preparo el json
            body: JSON.stringify({
                buscar: input,
                tipo: tipo
            })

        })
        .then(res => res.json())
        .then(data => {
            document.getElementById(id).classList.remove('valido', 'invalido');

            if (data.valido) {
                // Si el servidor dice que está OK
                document.getElementById(id).classList.add('valido');
                boton.disabled = false;
            } else {
                // Si hay error o ya existe
                document.getElementById(id).classList.add('invalido');
                boton.disabled = true;
            }
        })
    }else{
        document.getElementById(id).classList.remove('valido', 'invalido');
        document.getElementById(id).classList.add('invalido');
        boton.disabled = true;
    }
}

//FUNCION QUE COMPRUEBA LA VALIDEZ EN TIEMPO REAL DE LOS INPUTS
function comprobarValidez(id,longitud){
    //Primero obtengo el valor del input
    let input = document.getElementById(id).value;

    //Puntero al boton del formulario
    let boton = document.getElementById('confirmar');

    //Compruebo que tipo de dato quiero buscar
    let tipo = 'iban';
    if(longitud===9){
        tipo = 'dni';
    }

    //Si la longitud es la adecuada para la comprobación
    if(input.length === longitud){

        //Preparo el fetch
        fetch(`/comprobacion/input`, {
            //Lo envío por POST
            method: 'POST',

            //Le indico que lo enviaré en json
            headers: {
                'content-type': 'application/json'
            },

            //Preparo el json
            body: JSON.stringify({
                buscar: input,
                tipo: tipo
            })

        })
            .then(res => res.json())
            .then(data => {
                document.getElementById(id).classList.remove('valido', 'invalido');

                if (data.valido) {
                    // Si el servidor dice que está OK
                    document.getElementById(id).classList.add('valido');
                    boton.disabled = false;
                } else {
                    // Si hay error o ya existe
                    document.getElementById(id).classList.add('invalido');
                    boton.disabled = true;
                }
            })
    }else{
        document.getElementById(id).classList.remove('valido', 'invalido');
        document.getElementById(id).classList.add('invalido');
        boton.disabled = true;
    }
}

//FUNCION QUE COMPRUEBA LA VALIDEZ EN TIEMPO REAL DE LOS INPUTS
function comprobarValidezUsuario(id,longitud){
    //Primero obtengo el valor del input
    let input = document.getElementById(id).value;

    //Puntero al boton del formulario
    let boton = document.getElementById('confirmar');

    //Compruebo que tipo de dato quiero buscar
    let tipo = 'iban';
    if(longitud===9){
        tipo = 'dni';
    }

    //Si la longitud es la adecuada para la comprobación
    if(input.length === longitud){

        //Preparo el fetch
        fetch(`/comprobacion/input`, {
            //Lo envío por POST
            method: 'POST',

            //Le indico que lo enviaré en json
            headers: {
                'content-type': 'application/json'
            },

            //Preparo el json
            body: JSON.stringify({
                buscar: input,
                tipo: tipo
            })

        })
            .then(res => res.json())
            .then(data => {
                document.getElementById(id).classList.remove('valido', 'invalido');

                if (!data.valido) {
                    // Si el servidor dice que está OK
                    document.getElementById(id).classList.add('valido');
                    boton.disabled = false;
                } else {
                    // Si hay error o ya existe
                    document.getElementById(id).classList.add('invalido');
                    boton.disabled = true;
                }
            })
    }else{
        document.getElementById(id).classList.remove('valido', 'invalido');
        document.getElementById(id).classList.add('invalido');
        boton.disabled = true;
    }
}

//FUNCION QUE ME CARGA CUENTAS DE UN DNI DE MANERA ASINCRONA EN EL FORMULARIO
function cargarCuentas(id){
    //Hago un puntero al elemento
    let input = document.getElementById(id);

    //Cuando la longitud es la correcta
    if(input.value.length === 9){

        //Hago fetch para buscar si existe ese dni en concreto
        fetch(`/comprobacion/input`, {
            //Lo envío por POST
            method: 'POST',

            //Le indico que lo enviaré en json
            headers: {
                'content-type': 'application/json'
            },

            //Preparo el json
            body: JSON.stringify({
                buscar: input.value,
                tipo: 'dni'
            })

        })
            .then(res => res.json())
            .then(data => {
                //En la respuesta cambio los estilos
                document.getElementById(id).classList.remove('valido', 'invalido');

                if (data.valido) {
                    // Si el servidor dice que está OK
                    document.getElementById(id).classList.add('valido');

                    //Ahora que se que existe esa persona miro sus cuentas
                    fetch(`/cargar/cuentas`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            buscar: input.value,
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        //Hago puntero al select y lo vacio
                        let select = document.getElementById('ibanEmisor');
                        select.innerHTML = '<option value="" selected disabled>Seleccionar cuenta...</option>';

                        //Ahora por cada elemento del json creo una opción
                        data.forEach(vinculo => {
                            const option = document.createElement('option');
                            option.value = vinculo.iban;
                            option.textContent = vinculo.iban;
                            select.appendChild(option);
                        });
                    })
                } else {
                    // Si hay error o ya existe
                    document.getElementById(id).classList.add('invalido');
                    //Hago puntero al select y lo vacio
                    let select = document.getElementById('ibanEmisor');
                    select.innerHTML = '<option value="" selected disabled>Seleccionar cuenta...</option>';
                }
            })
    }
}

//FUNCION QUE MUESTRA EL CAMPO DE CONTRASEÑA AL HACER UNA TRANSACCION EN  TIEMPO REAL
function mostrarContra() {
    //Puntero al formulario
    let formulario = document.getElementById('formularioTransaccion');

    //Verifico
    if (formulario.checkValidity()) {
        //Oculto el primer botón
        document.getElementById('contenedorContinuar').classList.add('d-none');

        //Muestro el contenedor
        let contenedorContra = document.getElementById('contenedorContra');
        contenedorContra.classList.remove('d-none');

        //Habilito el input de contraseña y le paso foco
        let contra = document.getElementById('contra');
        contra.removeAttribute('disabled');
        contra.focus();
    } else {
        //Indico que falla
        formulario.reportValidity();
    }
}

//FUNCION QUE SI LE DOY A CANCELAR ME QUITA EL AÑADIDO DONDE ESTA EL CAMPO DE CONTRASEÑA
function cancelarContra() {
    document.getElementById('contenedorContinuar').classList.remove('d-none');
    document.getElementById('contenedorContra').classList.add('d-none');
    document.getElementById('contra').value = '';
    document.getElementById('contra').setAttribute('disabled', 'true');
}