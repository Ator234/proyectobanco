//FUNCION QUE CREA LAS TABLAS DE CUENTAS
function crearTablaCuentas(losdatos) {
    document.getElementById("contenedorTabla").innerHTML="";
    let grid = new gridjs.Grid({
        columns: [
            "IBAN",
            "TIPO",
            {
                name: "Información",
                // El formatter recibe el texto del botón y lo convierte en HTML real
                formatter: (cell) => gridjs.html(cell),
                style: {
                    'text-align': 'center'
                }
            }
        ],

        data: losdatos,

        pagination: {
            limit: 5,
            summary: true,
        },
        className: {
            container: 'mt-5',
            table: 'table table-hover tabla-personalizada',
            thead: 'text-center'
        },
        search: true,
    });

    grid.render(document.getElementById("contenedorTabla"));
}

//FUNCION QUE CREA LAS TABLAS DE VINCULOS
function crearTablaVinculos(losdatos) {
    document.getElementById("contenedorTabla").innerHTML="";

    let grid = new gridjs.Grid({
        columns: [
            "DNI",
            "IBAN",
            {
                name: "Información",
                // El formatter recibe el texto del botón y lo convierte en HTML real
                formatter: (cell) => gridjs.html(cell),
                style: {
                    'text-align': 'center'
                }
            }
        ],

        data: losdatos,

        pagination: {
            limit: 5,
            summary: true,
        },
        className: {
            container: 'mt-5',
            table: 'table table-hover tabla-personalizada',
            thead: 'text-center'
        },
        search: true,
    });

    grid.render(document.getElementById("contenedorTabla"));
}

//FUNCION QUE CREA LAS TABLAS DE TRANSACCIONES
function crearTablaTransacciones(losdatos) {
    document.getElementById("contenedorTabla").innerHTML="";

    let grid = new gridjs.Grid({
        columns: [
            "ID",
            "Origen",
            "Destino",
            "Emisor",
            {
                name: "Información",
                // El formatter recibe el texto del botón y lo convierte en HTML real
                formatter: (cell) => gridjs.html(cell),
                style: {
                    'text-align': 'center'
                }
            }
        ],

        data: losdatos,

        pagination: {
            limit: 5,
            summary: true,
        },
        className: {
            container: 'mt-5',
            table: 'table table-hover tabla-personalizada',
            thead: 'text-center'
        },
        search: true,
    });

    grid.render(document.getElementById("contenedorTabla"));
}

//FUNCION QUE CREA LAS TABLAS DE USUARIOS
function crearTablaUsuarios(losdatos) {
    document.getElementById("contenedorTabla").innerHTML="";

    let grid = new gridjs.Grid({
        columns: [
            "DNI",
            "Nombre",
            "Apellidos",
            "Edad",
            {
                name: "Información",
                // El formatter recibe el texto del botón y lo convierte en HTML real
                formatter: (cell) => gridjs.html(cell),
                style: {
                    'text-align': 'center'
                }
            }
        ],

        data: losdatos,

        pagination: {
            limit: 5,
            summary: true,
        },
        className: {
            container: 'mt-5',
            table: 'table table-hover tabla-personalizada',
            thead: 'text-center'
        },
        search: true,
    });

    grid.render(document.getElementById("contenedorTabla"));
}

