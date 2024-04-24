import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import swaggerUI from "swagger-ui-express";
import { specs } from "./Utils/Swagger.js";
import qrRouter from "./Router/QrRouter.js";
// import {
//   creatDatabase,
//   createTable,
//   useDatabase,
// } from "./Database/Controller.js";

const app = express();
const dotenv = config();
app.use(express.json());
app.use(cors());
app.use(
  "/api/swagger",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);

app.use("/api/getQr", qrRouter);

// (async () => {
  // await creatDatabase();
  // await useDatabase();
  // await createTable();
// })();
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
