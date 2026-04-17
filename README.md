# Clase 6: Creación de Servidores con Express.js

## Objetivos
- Comprender el rol de un servidor web y el protocolo HTTP.
- Configurar un proyecto Node.js para usar Express.js.
- Crear un servidor web básico con Express.js.
- Definir y manejar rutas para diferentes métodos HTTP (GET, POST, PUT, DELETE).
- Acceder y utilizar parámetros de ruta, de consulta y el cuerpo de la petición.
- Enviar diferentes tipos de respuestas (texto, JSON, códigos de estado).
- Construir una API RESTful simple utilizando Express.js.

---

## 1. Introducción: Servidores Web y Express.js 

### 1.1. ¿Qué es un Servidor Web?

En el modelo **Cliente-Servidor**, un servidor web es un programa que espera peticiones de los clientes (navegadores, aplicaciones móviles, otras APIs) y les envía respuestas. Es el "cerebro" que procesa la lógica de negocio y gestiona los datos.

El protocolo principal de comunicación en la web es **HTTP (Hypertext Transfer Protocol)**. Recuerda de clases anteriores:
- **Métodos HTTP:** Verbos que indican la acción deseada (GET para obtener, POST para crear, PUT para actualizar, DELETE para eliminar).
- **Códigos de Estado HTTP:** Números que indican el resultado de la petición (200 OK, 404 Not Found, 500 Internal Server Error).

### 1.2. ¿Por qué Express.js?

Node.js nos permite crear servidores HTTP directamente, pero es un proceso de bajo nivel y muy verboso. **Express.js** es un framework minimalista y flexible para Node.js que simplifica enormemente la creación de aplicaciones web y APIs RESTful. Es el estándar de facto en la industria por su simplicidad, rendimiento y la vasta comunidad que lo soporta.



---

## 2. Preparando Nuestro Proyecto Express 

Para empezar, necesitamos un proyecto Node.js y la librería Express.

### 2.1. Inicialización del Proyecto

Crea una nueva carpeta para tu proyecto y, dentro de ella, inicializa un proyecto Node.js:

```bash
mkdir mi-api-express
cd mi-api-express
npm init -y
```

Esto creará un archivo `package.json`, que es el manifiesto de tu proyecto.

### 2.2. Instalando Express.js

Ahora, instala Express como una dependencia de tu proyecto:

```bash
npm install express
```

Esto añadirá `express` a tu `package.json` y creará la carpeta `node_modules/`.

### 2.3. Estructura Básica del Proyecto

Crea un archivo principal, por convención `index.js` o `app.js`, en la raíz de tu proyecto. Este será el punto de entrada de tu servidor.

```
mi-api-express/
├── node_modules/
├── package.json
└── index.js
```

---

## 3. ¡Hola, Mundo! Nuestro Primer Servidor 

Vamos a escribir el código mínimo para levantar un servidor Express.

### 3.1. Creando la Instancia de Express

En `index.js`, importa Express y crea una instancia de la aplicación:

```javascript
// index.js
const express = require('express'); // Importa la librería Express
const app = express(); // Crea una instancia de la aplicación Express
```

### 3.2. Definiendo una Ruta Básica

Una **ruta** define cómo el servidor responderá a una petición a una URL específica y con un método HTTP determinado. La ruta más básica es la raíz (`/`).

```javascript
// index.js (continuación)

// app.get() define una ruta para peticiones GET
// El primer argumento es la URL, el segundo es una función callback (handler)
app.get('/', (req, res) => {
  // req: Objeto Request (contiene información de la petición entrante)
  // res: Objeto Response (contiene métodos para enviar la respuesta)

  res.send('¡Hola, Mundo desde Express!'); // Envía una respuesta de texto plano
});
```

### 3.3. Enviando Diferentes Tipos de Respuestas

El objeto `res` (Response) tiene varios métodos útiles para enviar respuestas:

-   **`res.send(body)`**: Envía una respuesta HTTP. Puede ser una cadena, un objeto, un array, etc. Express intentará inferir el `Content-Type`.
-   **`res.json(body)`**: Envía una respuesta JSON. Es el método más común para construir APIs.
-   **`res.status(code)`**: Establece el código de estado HTTP de la respuesta. Siempre encadenar con otro método de envío (`.send()`, `.json()`).

```javascript
// index.js (continuación)

app.get('/saludo-json', (req, res) => {
  res.status(200).json({ mensaje: '¡Hola, Mundo JSON!', version: '1.0' });
});

app.get('/error-ejemplo', (req, res) => {
  res.status(404).send('Recurso no encontrado.');
});
```

### 3.4. Poniendo el Servidor a Escuchar

Finalmente, necesitamos decirle a Express en qué puerto debe escuchar las peticiones.

```javascript
// index.js (final)

const PORT = process.env.PORT || 3000; // Usa el puerto de entorno o el 3000 por defecto

// app.listen() inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`Accede en: http://localhost:${PORT}`);
});
```

Para ejecutar tu servidor, abre tu terminal en la carpeta del proyecto y escribe:

```bash
node index.js
```

Luego, abre tu navegador y visita `http://localhost:3000/` y `http://localhost:3000/saludo-json`.

---

## 4. Manejo de Rutas y Métodos HTTP 

> **Nota: ¿API REST o API RESTful? - Aclarando "Stateless" (Sin Estado)**
> 
Para entender la diferencia entre "REST" y "RESTful", primero tenemos que entender qué es cada cosa, construyéndolo desde la base.

1. ¿Qué es una API?
Imagina que vas a un restaurante. Tú (el cliente/Frontend) ves el menú y sabes qué quieres, pero no puedes ir a la cocina (el Servidor/Base de datos) a prepararlo. Necesitas un mesero. La API (Application Programming Interface) es ese mesero. Tú le dices al mesero "quiero una hamburguesa" (haces una petición / Request), el mesero va a la cocina, busca tu comida y te la trae a la mesa (te da una respuesta / Response, generalmente en formato JSON).

2. ¿Qué es REST? (El concepto)
REST significa Representational State Transfer (Transferencia de Estado Representacional). No es un lenguaje ni una tecnología, es un "Estilo de Arquitectura".

Imagina que REST es un libro de "Reglas de Etiqueta de la Alta Cocina" de cómo debería comportarse nuestro mesero y el restaurante. Fue definido en el año 2000 por un señor llamado Roy Fielding. Para que un sistema sea considerado REST, debe cumplir con 6 reglas o restricciones (las más importantes son):

Arquitectura Cliente-Servidor: El frontend y el backend están totalmente separados.
Stateless (Sin Estado): El servidor no guarda memoria de peticiones pasadas. Cada vez que tú pides algo, debes enviar toda la información necesaria para que el servidor entienda quién eres (por eso usamos tokens como los JWT de autenticación).
Sistema de Capas: El cliente no necesita saber si está conectado directo al servidor final o pasa por intermediarios (como balanceadores de carga).
Caché: Las respuestas deben indicar si se pueden guardar en memoria temporal para no sobrecargar al servidor.
Interfaz Uniforme: Siempre se usa una estructura lógica para las URLs (las rutas) y se usan los verbos HTTP correctos (GET, POST, PUT, DELETE).
3. ¿Qué es una API REST? (El sustantivo)
Una API REST es simplemente una API (el mesero) que fue diseñada inspirándose en ese libro de reglas (REST).

El detalle es que muchas APIs se llaman a sí mismas "API REST" solo porque usan rutas bonitas como /usuarios/1 o usan formatos JSON y los verbos HTTP. Pero en la realidad, a veces rompen alguna regla de la arquitectura original porque es más fácil para el desarrollador.

4. ¿Qué es RESTful? (El adjetivo)
Aquí viene la diferencia clave. RESTful es un adjetivo.

Se le llama "Sistema RESTful" o "API RESTful" a aquella API que cumple a la perfección, al pie de la letra, con TODAS las reglas y restricciones estrictas de la arquitectura REST.

Es decir:

REST es la teoría, el conjunto de reglas.
RESTful es una palabra para describir algo que aplica esa teoría de forma estricta.
📋 En Resumen: La Diferencia
Característica	API REST	RESTful
¿Qué es la palabra?	Es un sustantivo. "Construí una API basada en REST".	Es un adjetivo. "Mi API es muy RESTful".
Nivel de cumplimiento	A veces es "algo flexible". Puede usar los principios básicos (JSON, GET/POST) pero romper la regla del "Stateless" usando sesiones de servidor.	Cumple de manera estricta y rigurosa con el 100% de los principios diseñados por Roy Fielding.
Uso en la vida real	El término más común. Casi todos los sistemas modernos se denominan a sí mismos APIs REST.	Lo usas para presumir que tu arquitectura es inmaculada y respeta el estándar purista.
El secreto de la industria: Para el 95% de los desarrolladores en una conversación normal de oficina, significan lo mismo. Si en una entrevista de trabajo te dicen "Vamos a consumir una API RESTful", simplemente te están diciendo que vas a conectarte a un backend moderno que probablemente usa endpoints como GET /productos y te devolverá un formato JSON.
> En la práctica, la mayoría de las APIs son "APIs REST" que se esfuerzan por ser lo más "RESTful" posible.

Las APIs RESTful se basan en el uso de diferentes métodos HTTP para realizar operaciones sobre recursos. Pensemos en esto como construir una oración: la **Ruta** (la URL) es el **sustantivo** (el recurso sobre el que queremos actuar, ej: `/productos`), y el **Método HTTP** es el **verbo** (la acción que queremos realizar, ej: `GET` para leer o `POST` para crear). Al combinar un sustantivo con un verbo, creamos una instrucción clara y predecible para el servidor, como "LEER `/productos`" o "CREAR en `/productos`".



### 4.1. Rutas para Diferentes Endpoints

Puedes definir múltiples rutas para diferentes URLs:

```javascript
// index.js (continuación)

app.get('/productos', (req, res) => {
  res.json([{ id: 1, nombre: 'Laptop' }, { id: 2, nombre: 'Mouse' }]);
});

app.get('/usuarios', (req, res) => {
  res.json([{ id: 1, nombre: 'Ana' }, { id: 2, nombre: 'Luis' }]);
});
```

### 4.2. Manejo de Diferentes Métodos HTTP

Express tiene métodos para cada verbo HTTP:

-   **`app.post(path, handler)`**: Para crear nuevos recursos.
-   **`app.put(path, handler)`**: Para actualizar recursos existentes (reemplazo completo).
-   **`app.patch(path, handler)`**: Para actualizar parcialmente un recurso.
-   **`app.delete(path, handler)`**: Para eliminar recursos.

```javascript
// index.js (continuación)

app.post('/productos', (req, res) => {
  // Aquí iría la lógica para crear un nuevo producto
  res.status(201).json({ mensaje: 'Producto creado exitosamente.' }); // 201 Created
});

app.delete('/productos/:id', (req, res) => {
  // Aquí iría la lógica para eliminar el producto con el ID dado
  res.status(204).send(); // 204 No Content (éxito sin contenido de respuesta)
});
```

### 4.3. Parámetros de Ruta (`req.params`)

Se usan para identificar un recurso específico. Se definen con `:` en la ruta.

```javascript
// index.js (continuación)

// Ejemplo: GET /productos/123
app.get('/productos/:id', (req, res) => {
  const productId = req.params.id; // Accede al valor del parámetro 'id'
  res.json({ id: productId, nombre: `Producto ${productId}` });
});
```

### 4.4. Parámetros de Consulta (`req.query`)

Se usan para filtrar, ordenar o paginar recursos. Vienen después de `?` en la URL (ej: `/productos?categoria=electronica&orden=precio`).

```javascript
// index.js (continuación)

// Ejemplo: GET /buscar?q=laptop&categoria=electronica
app.get('/buscar', (req, res) => {
  const query = req.query.q; // Accede al valor del parámetro 'q'
  const categoria = req.query.categoria; // Accede al valor del parámetro 'categoria'
  res.json({ busqueda: query, filtro: categoria });
});
```

### 4.5. Cuerpo de la Petición (`req.body`)

Para peticiones `POST`, `PUT` o `PATCH`, los datos se envían en el cuerpo de la petición. Express necesita un middleware para parsear este cuerpo.

```javascript
// index.js (al inicio, después de 'const app = express();')
app.use(express.json()); // Middleware para parsear cuerpos de petición JSON

// index.js (continuación)

app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body; // Accede al cuerpo de la petición
  console.log('Usuario recibido:', nuevoUsuario);
  res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
});
```

---

## 5. Ejercicio Práctico Guiado 

Vamos a construir una API RESTful simple para gestionar una lista de tareas (To-Do List). Por ahora, los datos se guardarán en memoria (un array).

### Pasos:

1.  **Configuración Inicial:**
    - Asegúrate de tener un proyecto Express (`npm init -y`, `npm install express`).
    - Crea tu archivo `index.js`.
    - Añade `app.use(express.json());` al inicio para poder leer JSON en el cuerpo de las peticiones.
    - Define tu array de tareas en memoria (simulando una base de datos):

    ```javascript
    let tareas = [
      { id: 1, descripcion: 'Aprender Express.js', completada: false },
      { id: 2, descripcion: 'Construir una API', completada: false }
    ];
    let nextId = 3; // Para asignar IDs únicos
    ```

2.  **Endpoint GET /tareas (Obtener todas las tareas):**
    - Implementa una ruta `GET` en `/tareas` que devuelva el array `tareas` como JSON.

3.  **Endpoint GET /tareas/:id (Obtener una tarea por ID):**
    - Implementa una ruta `GET` en `/tareas/:id`.
    - Usa `req.params.id` para encontrar la tarea. Recuerda que `id` será un string, quizás necesites convertirlo a número (`parseInt`).
    - Si la tarea no se encuentra, devuelve un `res.status(404).json({ mensaje: 'Tarea no encontrada' })`.

4.  **Endpoint POST /tareas (Crear una nueva tarea):**
    - Implementa una ruta `POST` en `/tareas`.
    - Espera un objeto JSON en `req.body` con la `descripcion` de la tarea.
    - Crea un nuevo objeto tarea con un `id` único (`nextId++`) y `completada: false`.
    - Añade la nueva tarea al array `tareas`.
    - Devuelve la tarea creada con un `res.status(201).json(nuevaTarea)`.

5.  **Endpoint PUT /tareas/:id (Actualizar una tarea):**
    - Implementa una ruta `PUT` en `/tareas/:id`.
    - Encuentra la tarea por `id`.
    - Si la tarea existe, actualiza su `descripcion` y/o `completada` con los datos de `req.body`.
    - Devuelve la tarea actualizada. Si no se encuentra, devuelve 404.

6.  **Endpoint DELETE /tareas/:id (Eliminar una tarea):**
    - Implementa una ruta `DELETE` en `/tareas/:id`.
    - Elimina la tarea del array `tareas`.
    - Devuelve un `res.status(204).send()` si la eliminación fue exitosa.

7.  **Iniciar el Servidor:**
    - Asegúrate de que tu `app.listen()` esté configurado para iniciar el servidor.

### ¡A Practicar!

Usa herramientas como Postman, Insomnia o la extensión Thunder Client de VS Code para probar tus endpoints. ¡Es fundamental que pruebes cada método y cada ruta!

---


