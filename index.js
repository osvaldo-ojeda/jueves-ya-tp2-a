import express from "express";
import router from "./routes/router.js";
import morgan from "morgan";
// import loger from "./midlewares/loger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.use(loger)

// app.use(loger, router);
app.use( router);

app.listen(8000, () => {
  console.log(`🚀 ~ server ok on port http://localhost:8000`);
});



