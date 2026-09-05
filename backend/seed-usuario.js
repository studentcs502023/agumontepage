import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Usuario from "./models/Usuario.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/aguamonte";

async function seedUsuario() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    const nombre = "jeef";
    const password = "123";

    // Encriptar contraseña (bcrypt genera un hash de ~60 chars, supera minlength)
    const hash = await bcrypt.hash(password, 10);

    // Evitar duplicados
    const existente = await Usuario.findOne({ nombre });
    if (existente) {
      console.log("⚠️ Ya existe un usuario con ese nombre:", existente.nombre);
      await mongoose.connection.close();
      return;
    }

    const nuevo = await Usuario.create({
      nombre,
      password: hash,
      rol: "admin",
    });

    console.log("✅ Usuario creado:");
    console.log("   nombre:", nuevo.nombre);
    console.log("   rol:", nuevo.rol);
    console.log("   _id:", nuevo._id);
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Conexión cerrada");
  }
}

seedUsuario();
