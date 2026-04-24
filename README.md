# Clase 6: Arquitectura y Ruteo Avanzado en Express

## Objetivos
- Comprender la importancia de estructurar aplicaciones Express de forma modular.
- Profundizar en el uso y creación de Middlewares personalizados.
- Implementar ruteo modular utilizando `express.Router()`.
- Separar la lógica de la aplicación en capas (Controladores, Servicios).
- Implementar un manejo de errores centralizado en Express.

---

## 1. Introducción a la Arquitectura de Aplicaciones 

### 1.1. ¿Por qué necesitamos Estructura?

A medida que nuestras aplicaciones crecen, un solo archivo `index.js` se vuelve inmanejable. Una buena arquitectura nos permite:
-   **Mantenibilidad:** Facilita encontrar y corregir errores.
-   **Escalabilidad:** Permite que la aplicación crezca sin volverse caótica.
-   **Colaboración:** Múltiples desarrolladores pueden trabajar en diferentes partes sin conflictos.
-   **Reusabilidad:** Componentes bien definidos pueden ser reutilizados.
-   **Testabilidad:** Facilita la escritura de pruebas unitarias e integración.

### 1.2. Concepto de Capas

Dividir la aplicación en capas significa asignar responsabilidades específicas a diferentes partes del código. Esto reduce el acoplamiento y aumenta la cohesión.

-   **Capa de Presentación/API:** Maneja las peticiones HTTP y las respuestas (Express).
-   **Capa de Lógica de Negocio:** Contiene las reglas de negocio y la lógica principal de la aplicación.
-   **Capa de Acceso a Datos:** Interactúa con la base de datos.

*En la sección 4, "Separación de Lógica en Capas", encontrarás un ejemplo práctico y detallado que implementa esta estructura para una API de Tareas.*


---

## 2. Middlewares en Profundidad 

Recordemos que un **Middleware** es una función que tiene acceso a los objetos `request` (req), `response` (res), y a la siguiente función middleware en el ciclo de petición-respuesta de la aplicación. Puede ejecutar código, hacer cambios en los objetos de petición y respuesta, finalizar el ciclo de petición-respuesta, o llamar a la siguiente función middleware.

### 2.1. Tipos de Middlewares

-   **A nivel de aplicación:** Se ejecutan para cada petición que llega al servidor.
    ```javascript
    app.use(express.json()); // Ya lo usamos para parsear JSON
    app.use((req, res, next) => {
      console.log(`Petición recibida: ${req.method} ${req.url}`);
      next(); // Llama al siguiente middleware o ruta
    });
    ```

-   **A nivel de ruta:** Se aplican solo a rutas específicas.
    ```javascript
    const miMiddlewareDeRuta = (req, res, next) => {
      console.log('Este middleware solo se ejecuta para /productos');
      next();
    };

    app.get('/productos', miMiddlewareDeRuta, (req, res) => {
      res.send('Lista de productos');
    });
    ```

-   **Múltiples Middlewares en una Ruta:** Puedes encadenar varios middlewares.
    ```javascript
    app.get('/admin', autenticarUsuario, verificarPermisos, (req, res) => {
      res.send('Panel de administración');
    });
    ```

### 2.2. Creando Middlewares Personalizados

Un middleware personalizado es simplemente una función con la firma `(req, res, next)`.

```javascript
// Middleware para registrar la hora de la petición
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Es CRUCIAL llamar a next() para pasar el control
};

// Middleware de autenticación básico (simulado)
const autenticar = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'mi-clave-secreta') {
    req.usuario = { id: 1, nombre: 'Admin' }; // Podemos añadir propiedades a req
    next();
  } else {
    res.status(401).json({ mensaje: 'Acceso no autorizado' });
  }
};

app.use(logger); // Aplicar el logger a todas las rutas
```

### 2.3. Orden de Ejecución

El orden en que defines tus `app.use()` y tus rutas es **fundamental**. Los middlewares se ejecutan en el orden en que son definidos. Si un middleware no llama a `next()`, el ciclo de petición-respuesta se detiene.

---

## 3. Ruteo Avanzado con `express.Router()` 

Cuando tu aplicación crece, tener todas las rutas en un solo archivo `index.js` se vuelve inmanejable. `express.Router()` nos permite modularizar nuestras rutas.

### 3.1. El Problema del Archivo Único

Imagina un `index.js` con 50 rutas. Es difícil de leer, mantener y colaborar.

### 3.2. La Solución: `express.Router()`

`express.Router()` es una instancia de middleware y sistema de ruteo completo. Puedes crear routers para diferentes recursos (ej. usuarios, productos) y luego "montarlos" en tu aplicación principal.

**Paso 1: Crear un archivo de router (ej. `routes/usuarios.router.js`)**

```javascript
// routes/usuarios.router.js
const express = require('express');
const router = express.Router(); // Crea una instancia de Router

// Definir rutas específicas para usuarios
router.get('/', (req, res) => {
  res.json({ mensaje: 'Obteniendo todos los usuarios' });
});

router.get('/:id', (req, res) => {
  res.json({ mensaje: `Obteniendo usuario con ID: ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(201).json({ mensaje: 'Creando nuevo usuario', data: req.body });
});

module.exports = router; // Exporta el router
```

**Paso 2: Montar el router en tu aplicación principal (`index.js`)**

```javascript
// index.js
const express = require('express');
const app = express();
const usuariosRouter = require('./routes/usuarios.router'); // Importa el router

app.use(express.json());

// Monta el router de usuarios en la ruta /api/usuarios
// Todas las rutas definidas en usuariosRouter ahora serán prefijadas con /api/usuarios
app.use('/api/usuarios', usuariosRouter);

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));
```

Ahora, `GET /api/usuarios` y `GET /api/usuarios/123` funcionarán.

---

## 4. Separación de Lógica en Capas 

Para una aplicación robusta, separamos la lógica en capas con responsabilidades claras.

-   **Controladores (Controllers):** Son la capa de la API. Reciben la petición (`req`), validan los datos, llaman a la capa de servicio y envían la respuesta (`res`). **No contienen lógica de negocio.**
-   **Servicios (Services/Use Cases):** Contienen la lógica de negocio pura. Realizan las operaciones complejas, interactúan con la base de datos (a través de una capa de datos que veremos más adelante). **No dependen de Express (`req`, `res`).**
-   **Modelos (Models):** Representan la estructura de los datos (ej. `Usuario`, `Producto`).

**Ejemplo de Estructura de Carpetas:**

```
src/
├── controllers/
│   └── tareas.controller.js
├── services/
│   └── tareas.service.js
└── routes/
    └── tareas.router.js
```

**Ejemplo de Código (API de Tareas):**

```javascript
// services/tareas.service.js (Lógica de Negocio)
let tareas = [{ id: 1, descripcion: 'Aprender Express', completada: false }];
let nextId = 2;

const obtenerTodasLasTareas = () => {
  return tareas;
};

const obtenerTareaPorId = (id) => {
  return tareas.find(t => t.id === parseInt(id));
};

const crearTarea = (descripcion) => {
  const nuevaTarea = { id: nextId++, descripcion, completada: false };
  tareas.push(nuevaTarea);
  return nuevaTarea;
};

// ... otras funciones de lógica de negocio (actualizar, eliminar)

module.exports = {
  obtenerTodasLasTareas,
  obtenerTareaPorId,
  crearTarea,
  // ...
};

// controllers/tareas.controller.js (Capa API)
const tareaService = require('../services/tareas.service');

const getTodasLasTareas = (req, res) => {
  const todas = tareaService.obtenerTodasLasTareas();
  res.json(todas);
};

const getTareaPorId = (req, res) => {
  const tarea = tareaService.obtenerTareaPorId(req.params.id);
  if (tarea) {
    res.json(tarea);
  } else {
    res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }
};

const postCrearTarea = (req, res) => {
  const { descripcion } = req.body;
  if (!descripcion) {
    return res.status(400).json({ mensaje: 'La descripción es requerida' });
  }
  const nueva = tareaService.crearTarea(descripcion);
  res.status(201).json(nueva);
};

// ... otros controladores

module.exports = {
  getTodasLasTareas,
  getTareaPorId,
  postCrearTarea,
  // ...
};

// routes/tareas.router.js (Rutas)
const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareas.controller');

router.get('/', tareaController.getTodasLasTareas);
router.get('/:id', tareaController.getTareaPorId);
router.post('/', tareaController.postCrearTarea);

module.exports = router;

// index.js (Aplicación Principal)
const express = require('express');
const app = express();
const tareasRouter = require('./src/routes/tareas.router');

app.use(express.json());
app.use('/api/tareas', tareasRouter);

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));
```

---

## 5. Manejo de Errores Centralizado 

En lugar de `try/catch` en cada ruta, Express permite un middleware especial para manejar errores.

```javascript
// index.js (al final de todas tus rutas y middlewares)

// Middleware de manejo de errores (siempre con 4 argumentos: err, req, res, next)
app.use((err, req, res, next) => {
  console.error(err.stack); // Imprime el stack trace del error en consola
  res.status(err.statusCode || 500).json({
    mensaje: err.message || 'Ocurrió un error inesperado en el servidor.',
  });
});

// Ejemplo de cómo lanzar un error desde un servicio o controlador
// throw new Error('Descripción no válida');
// Para errores con código de estado específico:
// const error = new Error('Recurso no encontrado');
// error.statusCode = 404;
// throw error;
```

---

