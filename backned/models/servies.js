import { Router } from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";

const router = Router();

// POST /api/usuarios
router.post("/usuarios", async (req, res) => {
  try {
    const { nombre, password, rol } = req.body;

    const nombreLimpio = (nombre ?? "").trim();

    if (!nombreLimpio || !password) {
      return res
        .status(400)
        .json({ error: "Nombre y contraseña son obligatorios." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 caracteres." });
    }

    // Evitar nombres duplicados
    const existe = await Usuario.findOne({ nombre: nombreLimpio });
    if (existe) {
      return res.status(409).json({ error: "Ese nombre ya está en uso." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre: nombreLimpio,
      password: passwordHash,
      rol,
    });

    const { password: _omit, ...usuarioSinPassword } = nuevoUsuario.toObject();

    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "No se pudo crear el usuario." });
  }
});

export default router;