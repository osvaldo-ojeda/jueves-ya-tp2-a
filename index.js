import express from "express";
import router from "./routes/router.js";
import morgan from "morgan";
import { notFound } from "./midlewares/notFound.js";
import sequelize from "./connection/sequelize.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(router);

await sequelize.sync({ force: false })

app.use(notFound)

app.listen(8000, () => {
  console.log(`🚀 ~ server ok on port http://localhost:8000`);
});