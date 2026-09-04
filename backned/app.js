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
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/aguamonte";

/* ── Middlewares base ── */
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: "5mb" }));

// Servir la carpeta public (frontend subido)
app.use(express.static(path.join(__dirname, "public")));

// Servir imágenes subidas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ── Rutas de la API ── */
app.use("/api/auth", authRouter);
app.use("/api", uploadRouter);
app.use("/api", usuariosRouter);
app.use("/api", productsRouter);

/* ── Redirección para el Frontend SPA (Vue Router) ── */
// Reemplaza app.get("/", ...) por esto para devolver index.html en cualquier ruta que no sea API
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ── Manejo de errores generales ── */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor." });
});

/* ── Conexión a MongoDB y servidor ── */
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error.message);
  });