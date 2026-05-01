function autenticar(req, res, next) {
  const apiKey = req.headers["x-api-key"];

//     if (!apiKey) {
//       return res.status(401).send("Unauthorized");
//     }
//     if (apiKey !== "mi-clave-secreta") {
//       return res.status(401).send("Unauthorized");
//     }
//     next();

  if (apiKey === "mi-clave-secreta") {
    next();
  } else {
     res.status(401).json({ error: "No autorizado" });
  }
}

export default autenticar;
