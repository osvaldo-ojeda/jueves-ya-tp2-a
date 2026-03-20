// console.log(`🚀 ~ nombre:`, nombre)
// var nombre= "Juan"
// nombre="chayane"
// console.log(`🚀 ~ nombre:`, nombre)

// var nombre= "pepe"

let nombre = "osva";
nombre = "chayane";
// console.log(`🚀 ~ nombre:`, nombre)

const fecha_nac = "26-11-1986";
// console.log(`🚀 ~ fecha_nac:  ${fecha_nac}` )

// primitivos

// String, Number, Boolean, bigint, Undefined, null, symbol

let apellido = `ojeda`;
let apellido2 = `ojeda`;
// console.log(`🚀 ~ apellidos:`, apellido === apellido2)
// console.log(`🚀 ~ apellido:`, typeof apellido)
// let edad=26
// console.log(`🚀 ~ edad:`, typeof edad)
let boo = true;
// console.log(`🚀 ~ boo:`, typeof boo)
let big = 987598758n;
// console.log(`🚀 ~ big:`,typeof big)
let undef = undefined;
// console.log(`🚀 ~ undef:`,typeof undef)
let nul = null;
// console.log(`🚀 ~ nul:`, typeof nul)
// let sym=Symbol("osvaldo")
// let sym2=Symbol("osvaldo")
// console.log(`🚀 ~ sym:`,typeof sym)
// console.log(`🚀 ~ sym:`, sym === sym2)

// complejos

// Array, objetos
const array = [1, 2, 3, 4, {}, [], "hola"];
array[1] = "pepe";
array.push("osvaldo");
array.pop();
// console.log(`🚀 ~ array:`, array.length)
// console.log(`🚀 ~ array:`, typeof array[7])
array.length = 0;
// console.log(`🚀 ~ array:`,  array)

const obj = {
  nombre: "osvaldo",
  apellido: "ojeda",
  edad: 26,
  saludar: function saludar(params) {
    console.log(`🚀 ~ saludar ~ params:`, this.nombre);
  },
};
// let data="edad"
// console.log(`🚀 ~ obj:`, obj.nombre)
// console.log(`🚀 ~ obj:`, obj["nombre"])
// console.log(`🚀 ~ obj:`, obj[data])
// obj.saludar()
// console.log(this)

// function quienesthis() {
//      console.log(this)
// }
// quienesthis()
// saludar("carlos")

function saludar(nombre) {
  // console.log(`hola ${nombre}`)
  return `hola ${nombre}`;
}
// saludar("lolo")
// console.log(saludar("pepe"))

const saludo = saludar("pedlo");
// console.log(`🚀 ~ saludo:`, saludo);

// const sumar=(n1,n2)=>n1+n2
const sumar = (n1, n2) => {
  return n1 + n2;
};

// console.log(`🚀 ~ sumar:`, sumar(3, 7));

function calcular(n1, n2, fn) {
  return fn(n1, n2);
}

// const calculo = calcular(3, 4, sumar);
// console.log(`🚀 ~ calculo:`, calculo);
// closure
function contador() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

// const cuenta = contador();
// console.log(`🚀 ~ cuenta:`, cuenta);
// console.log(`🚀 ~ cuenta:`, cuenta());
// console.log(`🚀 ~ cuenta:`, cuenta());
// console.log(`🚀 ~ cuenta:`, cuenta());
// console.log(`🚀 ~ cuenta:`, cuenta());
// console.log(`🚀 ~ cuenta:`, cuenta());

const alumnos = ["pepe", "lolo", "carlos"];
function recorrerarray(arr) {
  //   for (let i = 0; i < arr.length; i++) {
  //     const element = arr[i];
  //     console.log(`🚀 ~ recorrerarray ~ element:`, element.toUpperCase())
  //   }

  arr.forEach((element) => {
    console.log(`🚀 ~ recorrerarray ~ element:`, element.toUpperCase());
  });
}

recorrerarray(alumnos);
