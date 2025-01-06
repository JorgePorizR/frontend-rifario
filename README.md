# Frontend - Practicotres

Este es el frontend de la API **Practicotres**, desarrollado utilizando **Vite** con **React.js** y **Bootstrap**. La interfaz proporciona una forma fácil e interactiva para que los usuarios se registren, inicien sesión, gestionen rifas y participen en ellas. Este frontend interactúa con la API en Node.js de PracticotresAPI.

## Tecnologías Utilizadas

- **Vite**: Herramienta de construcción rápida para aplicaciones de React.
- **React.js**: Biblioteca de JavaScript para la creación de interfaces de usuario.
- **Bootstrap**: Framework CSS para crear interfaces con un diseño receptivo y moderno.
- **Axios**: Cliente HTTP para realizar solicitudes a la API.
- **React Router**: Librería para manejar las rutas en el frontend de React.

## Requerimientos para la Instalación

Antes de instalar y ejecutar este proyecto, asegúrate de tener instalados los siguientes componentes:

- **Node.js**: Versión 14 o superior. [Descargar Node.js](https://nodejs.org/)
- **npm**: Versión 6 o superior (viene con Node.js).

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1. Clona el repositorio desde GitHub:

   ```bash
   git clone <URL_DEL_REPOSITORIO>

2. Navega al directorio del proyecto:

   ```bash
   cd practicotres-frontend

3. Instala las dependencias del proyecto:

   ```bash
   npm install

4. Ejecuta el proyecto localmente:

   ```bash
   npm run dev

La aplicación se ejecutará en el puerto 5173 por defecto. Abre tu navegador y navega a http://localhost:5173 para acceder al frontend.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

   ```bash
   practicotres-frontend/
   ├── public/                  # Archivos estáticos
   ├── src/                     # Código fuente
   │   ├── assets/              # Archivos de recursos (imágenes, fuentes, etc.)
   │   ├── components/          # Componentes de React
   │   ├── pages/               # Páginas de la aplicación
   │   ├── services/            # Funciones para interactuar con la API
   │   ├── utils/               # Funciones aparte para usar
   │   ├── index.css            # Diseño base del proyecto
   │   └── main.jsx             # Punto de entrada
   ├── .env                     # Variables de entorno
   ├── package.json             # Dependencias y scripts
   └── vite.config.js           # Configuración de Vite
   ```
## Funcionalidades

El frontend ofrece las siguientes funcionalidades:

### Autenticación

- **Registro**: Permite registrar un nuevo usuario.
- **Inicio de sesión**: Permite que los usuarios registrados inicien sesión.
- **Ver perfil**: Muestra los detalles del usuario autenticado.

### Rifas

- **Ver todas las rifas**: Muestra una lista de rifas activas.
- **Crear rifa**: Permite a los usuarios crear nuevas rifas.
- **Ver rifa**: Muestra los detalles de una rifa específica.
- **Buscar rifas**: Permite buscar rifas por nombre.
- **Actualizar rifa**: Permite editar los detalles de una rifa.
- **Eliminar rifa**: Permite eliminar una rifa.

### Participaciones

- **Ver participantes**: Muestra la lista de participantes en cada rifa.
- **Agregar participación**: Permite que un usuario se inscriba en una rifa.

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en el archivo `.env`:

   ```bash
   VITE_BASE_URL=http://localhost:3000/api
   ```

La variable `VITE_BASE_URL` se usa para definir la URL base de la API.



