# Clase 4: Introducción a Node.js

## Objetivos
Al finalizar esta clase, los estudiantes serán capaces de:
- Entender qué es Node.js y su arquitectura fundamental.
- Explicar el rol del Event Loop en la asincronía de Node.js.
- Utilizar el sistema de módulos de Node.js para organizar su código.
- Interactuar con el sistema de archivos utilizando el módulo `fs`.
- Manejar paquetes externos con NPM/Yarn.

---

## 1. ¿Qué es Node.js?

Node.js es un **entorno de ejecución** de JavaScript del lado del servidor. En términos simples, nos permite usar JavaScript para escribir programas que se ejecutan directamente en una computadora o servidor, fuera del navegador.

Esto lo hace ideal para construir:
- APIs RESTful rápidas y escalables.
- Servidores web.
- Herramientas de línea de comandos (CLI).
- Aplicaciones en tiempo real (como chats o juegos).

Su principal característica es su modelo de **E/S (Entrada/Salida) asíncrona y sin bloqueo**, lo cual lo hace extremadamente eficiente para manejar múltiples conexiones simultáneamente.

---

## 2. La Arquitectura de Node.js y el Event Loop

Esta es la pregunta fundamental: ¿cómo logra Node.js ser tan eficiente? La respuesta está en su arquitectura y, especialmente, en el Event Loop.

### La Arquitectura
Node.js no es solo el motor V8 de Google (el mismo que usa Chrome). Es una combinación de:
- **Motor V8:** Compila y ejecuta el código JavaScript.
- **Libuv:** Una librería escrita en C++ que maneja las operaciones asíncronas (como trabajar con archivos o redes). Es el verdadero caballo de batalla de Node.js.
- **APIs de Node.js:** Módulos como `fs`, `http`, `path` que nos dan acceso a las funcionalidades del sistema.

### El Event Loop: El Corazón de Node.js

El Event Loop no es parte del lenguaje JavaScript, sino del **entorno de ejecución** (tanto Node.js como los navegadores tienen uno).

1.  **JavaScript es Single-Threaded:** El motor V8 solo puede hacer una cosa a la vez en un único hilo de ejecución (el *main thread*).

2.  **Las Tareas Lentas se Delegan:** Cuando nuestro código necesita hacer una tarea lenta (una operación de I/O como leer un archivo o una petición de red), Node.js no espera. Se la entrega a **Libuv**, que utiliza los hilos del sistema operativo para manejarla en segundo plano.

3.  **El Event Loop Orquesta:** El Event Loop es un bucle que constantemente revisa dos cosas:
    - **La Pila de Llamadas (Call Stack):** ¿Hay código JavaScript para ejecutar?
    - **La Cola de Callbacks (Callback Queue):** ¿Hay alguna tarea en segundo plano que ya haya terminado?

El proceso es el siguiente:
- Mientras la Pila de Llamadas esté vacía, el Event Loop pregunta: "¿Hay algo en la cola?".
- Si una tarea en segundo plano (ej: la lectura de un archivo) termina, su función de *callback* se coloca en la cola.
- El Event Loop toma el primer callback de la cola y lo empuja a la Pila de Llamadas para que V8 lo ejecute.

Esto permite que Node.js maneje miles de operaciones simultáneas sin bloquear el hilo principal, usando muy pocos recursos en comparación con modelos tradicionales basados en hilos por cada conexión.

---

## 3. Módulos en Node.js: Organizando el Código

Para mantener nuestros proyectos organizados, dividimos el código en archivos llamados **módulos**.

- **`module.exports`**: Un objeto especial que usamos para exportar (hacer públicos) funciones, objetos o variables desde un módulo para que otros puedan usarlos.
- **`require()`**: La función que usamos para importar lo que otro módulo ha exportado.

**Ejemplo:**

```javascript
// en el archivo: matematicas.js
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;

module.exports = {
  sumar, // Exportamos la función sumar
  restar // Exportamos la función restar
};

// en el archivo: app.js
const misMatematicas = require('./matematicas.js'); // Importamos el módulo

const resultadoSuma = misMatematicas.sumar(5, 3);
console.log("Suma:", resultadoSuma); // Muestra 8
```

**Nota sobre ES Modules (`import`/`export`):** JavaScript moderno tiene su propio sistema de módulos (`import`/`export`). Node.js lo soporta, pero requiere una configuración específica. Por ahora, nos centraremos en el sistema clásico de Node.js (`require`/`module.exports`).

---

## 4. Módulos Nativos Esenciales

Node.js viene con módulos incorporados para tareas comunes.

- **`fs` (File System):** Para interactuar con el sistema de archivos.
  ```javascript
  const fs = require('fs');

  // Leer un archivo de forma asíncrona
  fs.readFile('unArchivo.txt', 'utf8', (error, data) => {
    if (error) {
      console.error("Hubo un error al leer el archivo:", error);
      return;
    }
    console.log("Contenido del archivo:", data);
  });
  ```

- **`path`:** Para trabajar con rutas de archivos y directorios de forma segura en cualquier sistema operativo.
  ```javascript
  const path = require('path');

  const rutaCompleta = path.join(__dirname, 'archivos', 'documento.txt');
  console.log(rutaCompleta);
  ```

---

## 5. Gestión de Paquetes con NPM

**NPM (Node Package Manager)** es el gestor de paquetes más grande del mundo. Nos permite instalar y gestionar librerías de terceros (paquetes) en nuestros proyectos.

- **`package.json`**: El archivo de manifiesto de nuestro proyecto. Contiene metadatos y, lo más importante, la lista de dependencias.
- **`npm init -y`**: Comando para crear un `package.json` por defecto.
- **`npm install <nombre-del-paquete>`**: Instala un paquete y lo añade a las dependencias en `package.json`.
- **`node_modules/`**: La carpeta donde se descargan e instalan todos los paquetes.

---

## 6. Ejercicios Prácticos

1.  **Inicializar Proyecto:**
    - Crea una nueva carpeta `mi-primer-app-node`.
    - Dentro de ella, ejecuta `npm init -y` para crear el `package.json`.

2.  **Módulo Personalizado:**
    - Crea un archivo `saludos.js` que exporte una función `obtenerSaludo(nombre)`.
    - Crea un archivo principal `app.js` que importe el módulo `saludos.js` y use la función para imprimir un saludo en la consola.

3.  **Lector de Archivos:**
    - En `app.js`, usa el módulo `fs asincrónico` para leer el contenido del `package.json` de tu proyecto.
    - Imprime el contenido del archivo en la consola.

4.  **Instalar un Paquete Externo:**
    - Instala el paquete `cowsay` ejecutando `npm install cowsay`.
    - Lee la documentación de `cowsay` en la página de npmjs.com.
    - Modifica tu `app.js` para que, en lugar de un `console.log` normal, el saludo sea "dicho" por una vaca usando el paquete `cowsay`.
