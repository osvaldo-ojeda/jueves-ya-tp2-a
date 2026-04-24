# Ejercicio: API REST de Tareas con Express y Middleware

## Objetivo

Construir una API REST completa para gestionar una lista de tareas utilizando Express. La API deberá incluir rutas públicas para leer datos y rutas privadas para modificarlos, protegidas por un middleware de autenticación.

## Requisitos

1.  **Configuración Inicial:**
    *   Asegúrate de tener `express` instalado (`npm install express`).
    *   Crea un archivo `index.js` y configura un servidor básico de Express que escuche en el puerto `3000`.

2.  **Datos de Ejemplo:**
    *   Dentro de tu `index.js`, crea un array de objetos para simular una base de datos de tareas. Cada tarea debe tener al menos un `id` y un `titulo`.
    ```javascript
    let tareas = [
      { id: 1, titulo: 'Aprender Node.js' },
      { id: 2, titulo: 'Crear una API REST' },
      { id: 3, titulo: 'Implementar middleware' }
    ];
    ```

3.  **Middleware de Autenticación:**
    *   Crea el middleware `autenticar` que verifica la presencia de una API Key en las cabeceras.
    *   La cabecera a verificar es `x-api-key`.
    *   El valor secreto de la API Key es `mi-clave-secreta`.
    *   Si la clave es válida, debe llamar a `next()`.
    *   Si no es válida, debe responder con un `401 Unauthorized` y un mensaje JSON: `{"error": "Acceso no autorizado"}`.

4.  **Middleware para JSON:**
    *   Asegúrate de que tu aplicación pueda recibir y procesar cuerpos de petición en formato JSON. Utiliza el middleware `express.json()`.

5.  **Definición de Rutas (Endpoints):**

    *   **`GET /tareas`**
        *   **Acceso:** Público.
        *   **Descripción:** Devuelve la lista completa de tareas.

    *   **`GET /tareas/:id`**
        *   **Acceso:** Público.
        *   **Descripción:** Devuelve una única tarea según su `id`. Si no se encuentra, debe devolver un `404 Not Found`.

    *   **`POST /tareas`**
        *   **Acceso:** **Privado** (debe usar el middleware `autenticar`).
        *   **Descripción:** Añade una nueva tarea a la lista. El título de la tarea vendrá en el cuerpo (`req.body`). Debe generar un nuevo `id` para la tarea.

    *   **`PUT /tareas/:id`**
        *   **Acceso:** **Privado** (debe usar el middleware `autenticar`).
        *   **Descripción:** Actualiza el título de una tarea existente identificada por su `id`. El nuevo título vendrá en el `req.body`.

    *   **`DELETE /tareas/:id`**
        *   **Acceso:** **Privado** (debe usar el middleware `autenticar`).
        *   **Descripción:** Elimina una tarea de la lista según su `id`.

## Pistas

*   Para aplicar un middleware a una ruta específica, pásalo como argumento antes del manejador de la ruta: `app.post('/ruta', miMiddleware, (req, res) => { ... });`
*   Usa `req.params.id` para obtener el ID de la URL.
*   Usa `req.body` para acceder a los datos enviados en una petición `POST` o `PUT`.
*   Recuerda que los parámetros de la URL vienen como strings, puede que necesites convertirlos a número con `parseInt()`.

¡A programar!

---

## Cómo Probar desde la Terminal (con cURL)

Una vez que tu servidor esté corriendo (`node index.js`), puedes usar estos comandos en tu terminal para probar la API.

**1. Obtener todas las tareas (Público)**
```bash
curl http://localhost:3000/tareas
```

**2. Obtener una tarea por su ID (Público)**
```bash
curl http://localhost:3000/tareas/1
```

**3. Intentar crear una tarea sin API Key (Debe fallar)**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"titulo": "Hacer la compra"}' http://localhost:3000/tareas
# Esperado: {"error":"Acceso no autorizado"}
```

**4. Crear una tarea con la API Key correcta (Privado)**
```bash
curl -X POST -H "Content-Type: application/json" -H "x-api-key: mi-clave-secreta" -d '{"titulo": "Hacer la compra"}' http://localhost:3000/tareas
```

**5. Actualizar una tarea (Privado)**
```bash
curl -X PUT -H "Content-Type: application/json" -H "x-api-key: mi-clave-secreta" -d '{"titulo": "Leer documentación de Express"}' http://localhost:3000/tareas/1
```

**6. Eliminar una tarea (Privado)**
```bash
curl -X DELETE -H "x-api-key: mi-clave-secreta" http://localhost:3000/tareas/2
```