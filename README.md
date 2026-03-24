# Clase 2: JavaScript Mastery: Historia, Fundamentos y Lógica Pro 🎓

## 🎯 Objetivos de la Clase
Al finalizar esta sesión, serás capaz de:
- Comprender el origen de JavaScript y su rol en el ecosistema actual.
- Dominar el uso de variables, constantes y el ciclo de vida de los datos (Scope y Hoisting).
- Manejar con profundidad los 7 tipos de datos primitivos y los tipos complejos.
- Aplicar lógica avanzada con estructuras de control y operadores de cortocircuito.
- Construir arquitecturas lógicas mediante Funciones de Orden Superior (HOF) y Closures.
- Entender el comportamiento de `this` en cualquier contexto.

---

## 1. El Lenguaje de la Web y el Backend: Un poco de Historia 📜

JavaScript no es "Java". Nació en **1995** de la mano de **Brendan Eich** en Netscape. 
- **El reto**: Se creó en solo **10 días**. Su propósito inicial fue dar interactividad mínima a la web.
- **La evolución**: Pasó de ser un lenguaje "de juguete" a ser estandarizado por ECMAScript. En **2015 (ES6)**, el lenguaje mutó para permitir aplicaciones de gran escala.
- **Node.js**: En 2009, Ryan Dahl sacó a JS del navegador, permitiéndonos usarlo en servidores, lo que cambió la industria para siempre.

---

## 2. Variables y Gestión de Memoria: El Almacén de Datos 📦

Una variable es un nombre que le damos a un espacio de memoria para guardar un valor.

### 2.1. Declaración: let y const (El fin de var)
- **`const`**: Para constantes. El valor no cambiará una vez asignado. Úsala por defecto. Previene errores de reasignación accidental.
- **`let`**: Para variables que cambiarán (contadores, acumuladores).
- **`var`**: **PROHIBIDO**. Es la forma antigua. No respeta el alcance de bloque y tiene un comportamiento confuso llamado *Hoisting* (elevación).

### 2.2. Concepto de Scope (Alcance) 🎯
Es el "muro" que protege a tus variables. Determina quién puede ver qué.
- **Scope Global**: Accesible desde cualquier parte.
- **Scope de Función**: Accesible solo dentro de la función.
- **Scope de Bloque (`{ }`)**: `let` y `const` solo existen dentro de las llaves (if, for, etc.).
- **Hoisting y TDZ**: Mientras `var` se eleva como `undefined`, `let` y `const` entran en la **Temporal Dead Zone**, dándote un error si intentas usarlas antes de declararlas. ¡Es mucho más seguro!

---

## 3. Tipos de Datos: El ADN del Lenguaje 🧬

JavaScript divide sus datos en dos grandes categorías según cómo se gestionan en memoria.

### 3.1. Tipos Primitivos (Inmutables - Pasaje por Valor)
Se guardan directamente en el "Stack" de memoria. Cuando los copias, creas una copia exacta e independiente.
1. **`string`**: Cadenas de texto (`"Hola"`, `'Mundo'`).
2. **`number`**: Números enteros y decimales (`42`, `3.14`).
3. **`boolean`**: Lógica (`true`, `false`).
4. **`null`**: Ausencia intencional de valor. (Tip: `typeof null` es "object" por un bug histórico).
5. **`undefined`**: Variable declarada pero sin valor.
6. **`bigint`**: Enteros de tamaño arbitrario (muy grandes).
7. **`symbol`**: Identificadores únicos e inmutables.

### 3.2. Tipos Complejos (Mutables - Pasaje por Referencia) 🚀
No guardan el valor, guardan la **dirección** de memoria donde están los datos.
- **`object`**: Colecciones de pares `clave: valor`.
- **`array`**: Listas ordenadas por índice.
- **`function`**: En JS, las funciones son "objetos de primera clase".

> **Dato Pro: La Analogía de la Llave** 🔑
> Si haces `let b = a` con un objeto, no estás creando un objeto nuevo. Estás copiando la **llave** de la misma casa. Si "B" entra y pinta la pared de rojo, cuando "A" entre, verá la pared roja.
>
> ```javascript
> let personaA = { nombre: "Beto" };
> let personaB = personaA; // ¡Copiamos la llave!
>
> personaB.nombre = "Osvaldo";
>
> console.log(personaA.nombre); // "Osvaldo" (¡Cambió el original!)
> ```
> Para copiar de verdad (crear una casa nueva igual), debemos usar el **Spread Operator** `...`:
> `let copiaReal = { ...personaA };`

---

## 4. Operadores y Lógica de Verdad 🚦

### 4.1. Operadores de Comparación
- `===` (Igualdad estricta): Compara Valor **y** Tipo. **Úsalo siempre**.
- `!==` (Desigualdad estricta).
- Evita `==` y `!=`, ya que intentan convertir tipos y causan errores silenciosos.

### 4.2. Operadores Lógicos y Cortocircuitos
- **`&&` (AND)**: `true` si AMBOS son verdaderos. En el backend se usa para ejecutar algo solo si el anterior existe: `usuario && usuario.save()`.
- **`||` (OR)**: `true` si AL MENOS UNO es verdadero. Usado para valores por defecto.
- **`??` (Nullish Coalescing)**: Solo actúa si el valor es `null` o `undefined`. Es el estándar actual para configuraciones.

---

## 5. Estructuras de Control: Dirigiendo el Flujo 🛤️

### 5.1. Sentencia `if...else`
```javascript
if (condicion) {
    // Código si es true
} else {
    // Código si es false
}
```

### 5.2. Operador Ternario (El if cortito)
`condición ? expresionSiVerdadero : expresionSiFalso;`
Ideal para asignaciones rápidas.

### 5.3. Sentencia `switch` 🚦
Se utiliza cuando tenemos una única variable que queremos comparar contra muchos valores posibles. Es mucho más limpio y legible que encadenar diez `if...else`.

**Anatomía del Switch:**
- **`case`**: Cada uno de los valores que queremos comparar.
- **`break`**: **FUNDAMENTAL**. Detiene la ejecución. Si lo olvidas, JS seguirá ejecutando los siguientes casos aunque no coincidan (comportamiento llamado *fall-through*).
- **`default`**: El "plan B". Se ejecuta si ninguno de los casos anteriores coincidió.

```javascript
let codigoError = 404;
let mensaje;

switch (codigoError) {
    case 200:
        mensaje = "Todo OK (Success)";
        break;
    case 404:
        mensaje = "No encontrado (Not Found)";
        break;
    case 500:
        mensaje = "Error de servidor (Server Error)";
        break;
    default:
        mensaje = "Código de error desconocido";
}
console.log(mensaje); // "No encontrado (Not Found)"
```

---

## 6. Funciones: Los Motores de la Aplicación ⚙️

### 6.1. Anatomía y Parámetros
Las funciones son bloques reutilizables.
- **Parámetros**: Las variables que la función espera recibir (los inputs).
- **Argumentos**: Los valores reales que le pasamos al llamarla.
- **Parámetros por defecto**: `function saludar(nombre = "Invitado") { ... }`.
- **Rest Parameters (`...args`)**: Permite recibir infinitos argumentos en un solo array.

### 6.2. El Valor de Retorno (`return`)
El `return` es la "puerta de salida". 
1. Envía un valor de vuelta.
2. Finaliza la ejecución de la función inmediatamente. Si no hay `return`, la función devuelve `undefined`.

### 6.3. Tipos de Funciones: ¿Cuál usar y cuándo? ⚔️

#### A. Declaración (Function Declaration)
Es la forma clásica. La gran ventaja (o peligro) es el **Hoisting**: JavaScript la "sube" al principio del archivo, por lo que puedes llamarla incluso antes de definirla.
```javascript
saludar(); // ¡Funciona!
function saludar() { console.log("Hola!"); }
```

#### B. Expresión (Function Expression)
Se guarda la función dentro de una constante o variable. Suele ser anónima. **No tiene Hoisting**: no puedes usarla antes de que el código llegue a esa línea. Es más moderna y recomendada para mantener el flujo de lectura natural.
```javascript
const despedir = function() { console.log("Adiós"); };
despedir();
```

#### C. Arrow Functions (Flecha) 🏹
Introducidas en ES6 para ser concisas. Ideales para callbacks.
- **Sintaxis ultra corta**: Si es una sola línea, el `return` es implícito.
- **No tienen su propio `this`**: Heredan el del contexto padre (Léxico).
- **No tienen objeto `arguments`**.
```javascript
const duplicar = n => n * 2; // Return implícito
```

#### D. IIFE (Immediately Invoked Function Expression)
Se definen y se ejecutan en el mismo instante. Encerradas en paréntesis `()`. 
- **Propósito**: Crear un **Scope Privado** instantáneo. Lo que pase adentro, se queda adentro, sin contaminar el resto del archivo.
```javascript
(function() {
    let secreto = "shhh";
    console.log("Me ejecuto sola!");
})();
```

#### E. Funciones Lambda ƛ
El término viene del **Cálculo Lambda** (matemáticas) y en programación se refiere a **funciones anónimas** que se tratan como datos.
- En JS moderno, nuestras "Lambdas" son las **Arrow Functions** cuando las usamos "al aire" (como en un `.map` o `.filter`).
- Su gran valor es que son efímeras y ligeras: nacen, hacen su trabajo y mueren ahí mismo.

### 6.4. Funciones de Orden Superior (HOF) y Callbacks 📞

En JavaScript, las funciones son **ciudadanos de primera clase**. Esto significa que puedes tratarlas como cualquier otra variable: puedes pasarlas como argumentos a otras funciones o devolverlas como resultado.

#### A. ¿Qué es un Callback?
Un **Callback** es simplemente una función que se pasa como "mandado" a otra función para que sea ejecutada en un momento determinado.
- **Analogía**: Es como contratar a un pintor (HOF) y darle tus instrucciones (callback). El pintor decide cuándo y cómo aplicar esas instrucciones.

```javascript
const operar = (a, b, callback) => {
    return callback(a, b);
}

const sumar = (x, y) => x + y;
const multiplicar = (x, y) => x * y;

console.log(operar(5, 10, sumar)); // 15
console.log(operar(5, 10, multiplicar)); // 50
```

#### B. Higher-Order Functions (HOF) en Arreglos
Son los métodos que más usaremos en el Backend para manipular listas de datos (usuarios, productos, logs).

1. **`.map()` (El Transformador)**:
   Crea un **nuevo arreglo** con el mismo tamaño, pero con cada elemento transformado.
   ```javascript
   const numeros = [1, 2, 3];
   const duplicados = numeros.map(n => n * 2); // [2, 4, 6]
   ```

2. **`.filter()` (El Filtro)**:
   Crea un **nuevo arreglo** que contiene solo los elementos que cumplen una condición verdadera.
   ```javascript
   const edades = [15, 20, 18, 25];
   const adultos = edades.filter(e => e >= 18); // [20, 18, 25]
   ```

3. **`.forEach()` (El Visitante)**:
   Simplemente recorre la lista y ejecuta código para cada elemento. **No devuelve nada**. Útil para imprimir en consola o guardar en una DB.
   ```javascript
   const nombres = ["Beto", "Ana"];
   nombres.forEach(n => console.log(`Hola ${n}`));
   ```

### 6.5. Closures (Clausuras): La Memoria de las Funciones 🔒

Un **Closure** es uno de los conceptos más potentes de JavaScript. Ocurre cuando una función "recuerda" el ambiente (las variables) donde fue creada, incluso si ese ambiente ya no existe.

**¿Cómo funciona? (La Teoría Profunda)** 🧠
Cuando JavaScript crea una función, le asigna una propiedad interna secreta llamada **`[[Environment]]`**. 
1. Esta propiedad guarda una referencia al lugar de la memoria (Scope) donde nació la función.
2. Gracias a este enlace, aunque la función madre ya haya terminado de ejecutarse, las variables que estaban a su alrededor **no son borradas** por el recolector de basura (Garbage Collector).
3. La función interna viaja con esa "mochila" de variables por el resto de su vida.

**Caso de Uso: Privacidad de Datos**
En el Backend, usamos esto para proteger variables sensibles que no queremos que nadie toque desde afuera.

```javascript
function crearBanco(montoInicial) {
    let saldo = montoInicial; // Variable "privada"

    return {
        depositar: (cantidad) => {
            saldo += cantidad;
            return `Saldo actual: ${saldo}`;
        },
        retirar: (cantidad) => {
            if (cantidad > saldo) return "Fondos insuficientes";
            saldo -= cantidad;
            return `Retiraste ${cantidad}. Te quedan ${saldo}`;
        }
    };
}

const miCuenta = crearBanco(100);
console.log(miCuenta.depositar(50)); // "Saldo actual: 150"
console.log(miCuenta.retirar(200));  // "Fondos insuficientes"
// console.log(miCuenta.saldo);      // undefined (¡Nadie puede robarte!)
```

---

## 7. Objetos y el Comportamiento de `this` 🏗️

Los objetos agrupan datos y métodos (funciones dentro del objeto).

### 7.1. Dinámico vs Léxico
- En **Funciones Tradicionales**, `this` es el objeto que **ejecuta** el método (quién hizo click o quién llamó).
- En **Arrow Functions**, `this` se hereda de afuera (contexto léxico). Por eso NO sirven para definir métodos de objetos si necesitas acceder a otras propiedades del mismo objeto.

### 7.2. Iteración sobre Objetos: ¿Cómo recorrerlos? 🔁

A diferencia de los arreglos, los objetos no tienen un orden numérico. Tenemos varias formas de "mirar adentro":

1. **`Object.keys(obj)`**: Devuelve un array con los nombres de las propiedades (llaves).
   ```javascript
   const user = { id: 1, name: "Beto" };
   console.log(Object.keys(user)); // ["id", "name"]
   ```

2. **`Object.values(obj)`**: Devuelve un array con los valores.
   ```javascript
   console.log(Object.values(user)); // [1, "Beto"]
   ```

3. **`Object.entries(obj)`**: Devuelve un array de arrays (pares [llave, valor]). Ideal para usar con `.map` o `.forEach`.
   ```javascript
   console.log(Object.entries(user)); // [["id", 1], ["name", "Beto"]]
   ```

4. **`for...in`**: Un bucle específico para objetos que recorre las llaves.
   ```javascript
   for (let clave in user) {
       console.log(`${clave} tiene el valor ${user[clave]}`);
   }
   ```

---

## 8. Laboratorio Práctico Maestría (60 min) 🧪

1. **Calculadora Master**: Crea una función que reciba dos números y una operación (callback) y use un `switch` para el resultado.
2. **El Contador de Privacidad**: Implementa un Closure para un contador que no pueda ser modificado manualmente desde la consola.
3. **Mapeo de Datos**: Toma un array de usuarios y usa `.map` para crear una lista de solo sus correos electrónicos en mayúsculas.
4. **La Trampa de This**: Crea un objeto con un método tradicional y uno arrow. Comprueba por qué uno puede acceder a las propiedades del objeto y el otro no.

---

