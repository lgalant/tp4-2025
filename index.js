import express from "express";
import AuthRouter from "./routes/auth.js";
import CancionRouter from "./routes/cancion.js";
import cors from "cors";
import "dotenv/config";
import { Cancion } from './models/cancion.js';
 import { Usuario } from './models/usuario.js';
 import { Escucha } from './models/escucha.js';
 import { sequelize } from "./dbconfig.js";

const defineModels = async () => {
  Usuario.belongsToMany(Cancion, {through: Escucha});
  Cancion.belongsToMany(Usuario, {through: Escucha});
  await sequelize.sync({ force: false, alter: false });
}

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => res.send("SpoTICfy API is running..."));
app.use("/auth", AuthRouter);
app.use("/cancion", CancionRouter);
defineModels()


app.listen(process.env.PORT || 8000, () =>
   console.log(`Server is running on port ${process.env.PORT || 8000}`)
);
