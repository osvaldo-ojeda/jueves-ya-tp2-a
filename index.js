// let numero=10
// let numero2= numero
// numero2=20
// console.log(`🚀 ~ numero:`, numero)
// console.log(`🚀 ~ numero2:`, numero2)

// const data1={nombre:"osvaldo"}
// const data2=data1
// // data2=0
// data2.apellido="ojeda"
// console.log(`🚀 ~ data1:`, data1)
// console.log(`🚀 ~ data2:`, data2)

// const data1={nombre:"osvaldo"}
// const data2= {nombre:data1.nombre}
// data2.apellido="ojeda"
// console.log(`🚀 ~ data1:`, data1)
// console.log(`🚀 ~ data2:`, data2)

// copia superficial
// spread operator
// const data1={nombre:"osvaldo", apellido:"perez", cursos:["tp2", "tpi "]}
// const data2= {...data1, cursos: [...data1.cursos]}
// data2.apellido="ojeda"
// data2.cursos.push("tp3")
// console.log(`🚀 ~ data1:`, data1)
// console.log(`🚀 ~ data2:`, data2)

// copia profunda

//  const data1={nombre:"osvaldo", apellido:"perez", cursos:["tp2", "tpi "]}
//  const data2= JSON.parse(JSON.stringify(data1))
//  data2.apellido="ojeda"
//  data2.cursos.push("tp3")

//  console.log(`🚀 ~ data1:`, data1)
//  console.log(`🚀 ~ data2:`, data2)

// const data1 = { nombre: "osvaldo", apellido: "perez", cursos: ["tp2", "tpi "] };
// const data2 = structuredClone(data1);
// console.log(`🚀 ~ data1:`, data1)
// console.log(`🚀 ~ data2:`, data2)

// desestructuracion

// const data= {nombre:"osvaldo", apellido:"perez"}
// // const nombre=data.nombre
// // const apellido=data.apellido
// const {apellido, nombre:name, edad}=data
// console.log(`🚀 ~ edad:`, edad)
// console.log(`🚀 ~ nombre:`, name)
// console.log(`🚀 ~ apellido:`, apellido)

// const arr= [1, "chayane", 40]
// // const id= arr[0]
// const [id, nombre]=arr
// console.log(`🚀 ~ id:`, id)
// console.log(`🚀 ~ nombre:`, nombre)
// console.log(`🚀 ~ edad:`, edad)

// --------------------------------

// console.log(`🚀 ~ inicio`)

// setTimeout(()=>{
//   console.log("hola")
// }, 3000)

// console.log(`🚀 ~ fin`)

// ---------------------------------

// promesas

function heladito(str) {
  return new Promise((resolve, reject) => {
    if (str === "bien") {
      resolve("hay heladito");
    } else {
      reject("no hay heladito");
    }
  });
}

// console.log(heladito("bien"))

// heladito("bien")
//   .then((data) => {
//     console.log(`🚀 ~ data:`, data);
//   })
//   .catch((error) => {
//     console.log(`🚀 ~ error:`, error);
//   }).finally(()=>{
//     console.log("fin")
//   })

// ------------------

// async function name(params) {
//   try {
//   } catch (error) {
//   }
// }

const pedido = async () => {
  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    const data = await respuesta.json();
    // console.log(`🚀 ~ pedido ~ data:`, data.forms[0].name)
    return data;
  } catch (error) {
    return error;
  }
};

// console.log(pedido());

// pedido()
//   .then((data) => {
//     console.log(`🚀 ~ data:`, data.forms[0].name);
//   })
//   .catch((error) => {
//     console.log(`🚀 ~ error:`, error);
//   })

// async function nombre(fn) {
//   try {
//     const data = await fn();
//     console.log(`🚀 ~ data:`, data.forms[0].name);
//   } catch (error) {
//     console.log(error)
//   }
// }

// nombre(pedido)

// const arr=[1,2,3,4,5]
// console.log(`🚀 ~ arr:`, arr)

// const arr2=arr.splice(1,2)
// console.log(`🚀 ~ arr2:`, arr2)
// console.log(`🚀 ~ arr:`, arr)

// const arr3= arr.slice(4)
// console.log(`🚀 ~ arr3:`, arr3)
// console.log(`🚀 ~ arr:`, arr)

const urls = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/users/2",
  "https://jsonplaceholder.typicode.com/users/3",
];

// const nombresApi = async () => {
//   try {
//     const promesa = urls.map((url) => fetch(url).then((res) => res.json()));
//     // console.log(`🚀 ~ nombresApi ~ promesa:`, promesa);
//     const respuesta = await Promise.all(promesa);
//     // console.log(`🚀 ~ nombresApi ~ respuesta:`, respuesta);
//     respuesta.forEach((data) => {
//       console.log(`🚀 ~ nombresApi ~ data:`, data.name);
//     });
//   } catch (error) {
//     console.log(`🚀 ~ nombresApi ~ error:`, error);
//   }
// };

const nombresApi = async () => {
  try {
    const usuarios = async (usersUrl) => {
      const res = await fetch(usersUrl);
      return await res.json();
    };
    const promesas = urls.map((url) => usuarios(url));
    // console.log(`🚀 ~ nombresApi ~ promesas:`, promesas);
     const respuesta = await Promise.all(promesas);
     console.log(`🚀 ~ nombresApi ~ respuesta:`, respuesta)
  } catch (error) {
    console.log(`🚀 ~ nombresApi ~ error:`, error);
  }
};

nombresApi();
