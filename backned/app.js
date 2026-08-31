import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import usuariosRouter from "./routes/usuarios.js";
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";
import uploadRouter from "./routes/upload.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/aguamonte";

/* ── Middlewares base ── */
// Se permite cualquier origen en desarrollo (el JWT viaja por header Authorization,
// no por cookies, por lo que no se necesita credentials).
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Sirve las imágenes subidas desde /uploads/...
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ── Rutas ── */
app.use(uploadRouter);
app.use(usuariosRouter);
app.use(authRouter);
app.use(productsRouter);

/* ── Ruta de prueba ── */
app.get("/", (req, res) => {
  res.json({ mensaje: "API de Aguamonte funcionando 🚀" });
});

/* ── Manejo de rutas no encontradas ── */
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

/* ── Manejo de errores generales ── */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor." });
});

/* ── Conexión a MongoDB y arranque del servidor ── */
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error.message);
  });