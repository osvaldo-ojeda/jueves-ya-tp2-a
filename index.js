// import http from "node:http"
// // console.log(`🚀 ~ http:`, http)

// const server = http.createServer((request, response)=>{
//      // console.log(`🚀 ~ response:`, response)
//      console.log(`🚀 ~ request:`, request)
//      response.end('Hello World')

// })
// // console.log(`🚀 ~ server:`, server)

// server.listen(8000)
// ------------------------

import express from "express";
// console.log(`🚀 ~ express:`, express)

const app = express();
// console.log(`🚀 ~ app:`, app)

app.get("/", (req, res) => {
  // console.log(`🚀 ~ res:`, res)
  // console.log(`🚀 ~ req:`, req)
  res.status(200).send("Hello get World");
});
app.get("/suma", (req, res) => {
  res.status(200).send("Hello get suma");
});

app.post("/", (req, res) => {
  console.log(`🚀 ~ req:`, req);
  res.status(200).send("Hello post World");
});

app.listen(8000, () => {
  console.log(`🚀 server ok in port 8000`);
});
