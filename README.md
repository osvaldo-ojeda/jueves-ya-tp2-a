# Clase 3: Node.js Internals y JavaScript Moderno 🚀

## 🎯 Objetivos de la Clase
Al finalizar esta clase, serás capaz de:
- Utilizar **Desestructuración** para un código más limpio.
- Realizar **copias superficiales y profundas** de objetos y arrays.
- Dominar los métodos de array más importantes (`slice`, `splice`, `map`, `filter`, `reduce`).
- Entender el origen de Node.js y el problema que vino a resolver.
- Explicar la arquitectura interna (V8 + Libuv + C++).
- Dominar el concepto de **Event Loop** y por qué es tan eficiente.
- Entender cómo se crea una **Promesa** y cómo se consume.
- Escribir código asíncrono legible con `async/await`.
- Gestionar múltiples promesas en paralelo con `Promise.all` y `Promise.allSettled`.

---

## 1. Herramientas de JavaScript Moderno

#### a. Desestructuración (Destructuring)
Una forma rápida de extraer valores de arrays u objetos en variables distintas.

```javascript
const usuario = { id: 1, nombre: 'Leanne Graham', email: 'Sincere@april.biz' };
const { nombre, email } = usuario;
console.log(`${nombre} (${email})`); // "Leanne Graham (Sincere@april.biz)"
```

#### b. Copia Superficial (Shallow Copy)
Una copia superficial (usando `...`) solo copia el primer nivel. Los objetos anidados se comparten por referencia.

```javascript
const original = { a: 1, b: { c: 2 } };
const copiaSuperficial = { ...original };
copiaSuperficial.b.c = 99; // Modifica también el original
console.log(original.b.c); // 99
```

#### c. Copia Profunda (Deep Copy)
**El Método Antiguo (con fallos): `JSON.stringify`**
Convierte el objeto a string y lo vuelve a parsear. Falla con tipos de datos como `Date` (los convierte a string) o `undefined` (los elimina).

**El Método Moderno y Correcto: `structuredClone`**
API nativa diseñada para clonar estructuras de datos complejas, preservando la mayoría de los tipos de datos.

```javascript
const original = { fecha: new Date(), valor: undefined };
const copiaJSON = JSON.parse(JSON.stringify(original)); // `valor` desaparece, `fecha` es un string
const copiaReal = structuredClone(original); // `valor` y `fecha` se mantienen intactos
```

---

## 2. Métodos Clave de Arrays

#### a. `slice` (No destructivo)
Devuelve una copia superficial de una porción de un array en un nuevo array. No modifica el array original.

```javascript
const animales = ['pato', 'gato', 'perro', 'conejo', 'pez'];
const mascotas = animales.slice(1, 4); // Extrae desde el índice 1 hasta el 3
console.log(mascotas); // ['gato', 'perro', 'conejo']
console.log(animales); // El original no cambia
```

#### b. `splice` (Destructivo)
Cambia el contenido de un array eliminando, reemplazando o agregando elementos. **Modifica el array original.**

```javascript
const meses = ['Enero', 'Marzo', 'Abril', 'Junio'];
// Insertar en el índice 1, sin eliminar elementos
meses.splice(1, 0, 'Febrero');
console.log(meses); // ['Enero', 'Febrero', 'Marzo', 'Abril', 'Junio']

// Eliminar 1 elemento en el índice 4
meses.splice(4, 1);
console.log(meses); // ['Enero', 'Febrero', 'Marzo', 'Abril']
```

#### c. `map` (No destructivo)
Crea un **nuevo array** con los resultados de llamar a una función para cada uno de sus elementos. Es la forma estándar de transformar arrays.

```javascript
const numeros = [1, 4, 9, 16];
const raices = numeros.map(num => Math.sqrt(num));
console.log(raices); // [1, 2, 3, 4]
```

#### d. `reduce` (No destructivo)
Aplica una función "reductora" a cada elemento del array para reducirlo a un único valor (de izquierda a derecha).

```javascript
const numeros = [1, 2, 3, 4];
const sumaTotal = numeros.reduce((acumulador, valorActual) => {
  return acumulador + valorActual;
}, 0); // 0 es el valor inicial del acumulador
console.log(sumaTotal); // 10
```

---

## 3. El Nacimiento de un Gigante (Ryan Dahl, 2009) 🏗️

Antes de 2009, JavaScript solo vivía en el navegador. Si querías hacer un servidor, usabas tecnologías como PHP, Java o Ruby.

### El problema: La Concurrencia
Los servidores viejos creaban un "hilo" (un mini-proceso) por cada persona que entraba. Si había 10.000 personas, el servidor se quedaba sin memoria.

### La solución de Ryan Dahl
Ryan pensó: "¿Por qué no usamos el motor de Google (V8) y le agregamos una librería en C++ que maneje todo de forma asincrónica, usando un solo hilo?". Así nació Node.js.

### La Anatomía de Node.js
Node.js es un envoltorio que une tres piezas clave:
1. **V8 Engine**: Escrito en **C++** por Google. Traduce tu JS a código que la máquina entiende. Es el Chef veloz.
2. **Libuv**: Una librería también escrita en **C++**. Es el "músculo" de Node. Se encarga de hablar con el sistema operativo para leer archivos, redes y usar el **Thread Pool**.
3. **Node.js API**: Los módulos que usamos nosotros (`fs`, `path`, `http`).

> [!TIP]
> **Dato Pro:** Node es un matrimonio perfecto entre la facilidad de JavaScript y la potencia de C++.

---

## 4. El Event Loop: El Mozo Legendario 🍝

Volvamos a la analogía del restaurante para entender el "Bucle de Eventos":

- **Single Threaded**: Solo hay un Mozo (Event Loop).
- **Non-blocking**: El mozo no se queda esperando en la cocina. Anota el pedido, se lo pasa a los ayudantes (Libuv) y sigue atendiendo mesas.
- **Callback Queue**: Cuando el ayudante termina, pone el plato en una "cola". Cuando el Mozo ve un hueco, entrega el plato.

### ¿Por qué Node es tan rápido?
Porque nunca espera. Mientras tu base de datos busca un usuario, Node puede atender otros 100 pedidos.

---

## 5. Asincronía y Promesas ⚡

Ahora que sabemos que Node corre en un solo hilo, la asincronía deja de ser opcional y se vuelve una necesidad para no bloquear al "Mozo".

#### a. ¿Qué es una Promesa?
Una **Promesa** es un objeto que representa el resultado de una operación asíncrona. Tiene 3 estados:
- **`pending`**: Estado inicial.
- **`fulfilled`**: Éxito.
- **`rejected`**: Falló.

#### b. Creando una Promesa
```javascript
function verificarDivisibilidad(numero) {
  return new Promise((resolve, reject) => {
    if (numero % 2 === 0) {
      resolve(`El número ${numero} es divisible por 2.`);
    } else {
      reject(`El número ${numero} no es divisible por 2.`);
    }
  });
}

// Consumiendo la promesa
verificarDivisibilidad(10)
  .then(mensaje => console.log('Éxito:', mensaje))
  .catch(error => console.log('Error:', error));
```

#### c. Consumiendo con `fetch` y `async/await`
```javascript
const obtenerUsuario = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.ok) throw new Error('Fallo en la petición');
    const user = await response.json();
    console.log('Usuario obtenido:', user.name);
  } catch (error) {
    console.error(error.message);
  }
};
obtenerUsuario();
```

---

## ⚡ 6. Viendo el Asincronismo en Acción (Macrotareas vs Microtareas)

```javascript
console.log("1. Inicio del script");

setTimeout(() => {
  console.log("2. Timer (Macrotarea - Event Loop)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promesa (Microtarea - Prioritaria)");
});

console.log("4. Fin del script");
```

**Resultado:** `1`, `4`, `3`, `2`.
**Conclusión de Senior:** ¡Las promesas tienen prioridad sobre los `setTimeout`! Entender esto es vital para depurar problemas de concurrencia y tiempos de respuesta.

---

## 7. Ejercicios Prácticos

1.  **Ejercicio de `slice`:** Dado `[10, 20, 30, 40, 50]`, usa `slice` para obtener `[20, 30]`.
2.  **Ejercicio de `splice`:** Dado `['a', 'b', 'c', 'd']`, elimina la 'c' y agrega 'x' y 'y' en su lugar.
3.  **Ejercicio de `map`:** De `[{id: 1, nombre: 'Ana'}, {id: 2, nombre: 'Luis'}]`, extrae solo `['Ana', 'Luis']`.
4.  **Ejercicio de `reduce`:** Calcula el producto de `[5, 10, 15, 20]`.
5.  **Ejercicio de `Promise.all`:** Obtén los datos de 3 usuarios de JSONPlaceholder en paralelo e imprime sus nombres.

---

## 💡 Perla de Senior
Respetar el Event Loop y dominar la asincronía moderna es lo que separa a un Junior que "hace que funcione" de un Senior que construye sistemas de alta disponibilidad. Bajo tu código JS, hay un motor de C++ trabajando; entender cómo alimentarlo es tu mayor ventaja.
