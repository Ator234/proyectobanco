# Mini Banco Ruiz

Bienvenido al repositorio de **Mini Banco Ruiz**, una aplicación web completa para la gestión de entidades bancarias, usuarios y transacciones financieras. Este proyecto implementa una arquitectura **MVC (Modelo-Vista-Controlador)** utilizando **Node.js** y bases de datos relacionales.

## Tecnologías Utilizadas

El proyecto ha sido construido con un stack tecnológico moderno y robusto:

* **Backend:** Node.js + Express.
* **Base de Datos:** MySQL.
* **ORM:** Sequelize (Gestión de modelos y relaciones).
* **Frontend:** Pug (Motor de plantillas) + Bootstrap 5.
* **Seguridad:** Bcryptjs (Hashing de contraseñas).
* **Estilos:** CSS3 personalizado + Iconos de Bootstrap.

## Funcionalidades Principales

### Gestión de Usuarios
* **Alta y Edición:** Registro completo de clientes con validación de datos.
* **Seguridad:** Las contraseñas se almacenan encriptadas (hasheadas) usando `bcryptjs`.
* **Perfil Financiero:** Visualización automática del patrimonio total calculado en base a su participación en distintas cuentas.

### Gestión de Cuentas y Vínculos
* **Relación N:M:** Un usuario puede tener varias cuentas y una cuenta varios titulares.
* **Participación Ponderada:** El sistema calcula el saldo real de cada usuario basándose en su porcentaje de participación en la cuenta (Regla de tres ponderada).
* **Borrado Lógico (Soft Delete):** Implementación de `paranoid: true` en Sequelize. Al borrar una cuenta, esta desaparece de la vista pero se mantiene en la BDD para preservar la integridad del historial de transacciones.

### Transacciones y Operaciones
* **Transferencias:** Movimiento de saldo entre cuentas con validación de fondos en tiempo real (uso de `increment` y `decrement` atómicos para evitar errores de concurrencia).
* **Reembolsos Inteligentes:** Sistema de anulación de transacciones con lógica de negocio: solo se permiten reembolsos dentro de las **48 horas** posteriores a la operación.
* **Seguridad en Operaciones:** Verificación de contraseña antes de confirmar cualquier movimiento de dinero.

## Instalación y Puesta en Marcha

Sigue estos pasos para probar el proyecto en tu entorno local:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/banco-ruiz.git](https://github.com/tu-usuario/banco-ruiz.git)
    cd banco-ruiz
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configuración de Base de Datos:**
    * Asegúrate de tener MySQL corriendo.
    * Crea una base de datos llamada `banco` (o el nombre que tengas en `config/db.js`).
    * Configura tus credenciales en el archivo `config/db.js`.

4.  **Iniciar el servidor:**
    ```bash
    npm start
    # O si usas nodemon:
    npm run dev
    ```

5.  **Abrir en el navegador:**
    Visita `http://localhost:3000`

## Estructura del Proyecto (MVC)

El código está organizado siguiendo las mejores prácticas:

```text
/
├── config/         # Conexión a Base de Datos
├── controllers/    # Lógica de negocio (Cálculos, consultas, redirecciones)
├── models/         # Definición de tablas (Sequelize) y relaciones
├── public/         # Archivos estáticos (CSS, JS del cliente, Imágenes)
├── routes/         # Definición de rutas (URLs)
├── views/          # Plantillas Pug (Interfaz de usuario)
└── index.js        # Punto de entrada de la aplicación
