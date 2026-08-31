import bcrypt from "bcryptjs";
import { Usuario } from "./model.js";

/**
 * Crea un nuevo usuario (POST /usuarios).
 * - Valida que nombre y contraseña vengan completos.
 * - Verifica que el nombre no esté ya registrado.
 * - Encripta la contraseña antes de guardarla.
 * - Devuelve el usuario SIN la contraseña.
 */
export const crearUsuario = async (nombre, password) => {
  const nombreLimpio = (nombre ?? "").trim();

  if (!nombreLimpio) {
    throw new Error("El nombre es obligatorio");
  }

  if (!password || password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  }

  const existente = await Usuario.findOne({ nombre: nombreLimpio });
  if (existente) {
    throw new Error("Ese nombre de usuario ya está registrado");
  }

  const hash = await bcrypt.hash(password, 10);

  const nuevo = await Usuario.create({
    nombre: nombreLimpio,
    password: hash,
  });

  // Se retorna sin la contraseña
  return {
    _id: nuevo._id,
    nombre: nuevo.nombre,
    rol: nuevo.rol,
    activo: nuevo.activo,
    createdAt: nuevo.createdAt,
    updatedAt: nuevo.updatedAt,
  };
};

import { Router } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";

const router = Router();

router.post("/api/usuarios", async (req, res) => {
  try {
    const { nombre, password, rol } = req.body;

    if (!nombre || !password) {
      return res
        .status(400)
        .json({ error: "Nombre y contraseña son obligatorios." });
    }

    // Evitar nombres duplicados (opcional pero recomendado)
    const existe = await Usuario.findOne({ nombre });
    if (existe) {
      return res.status(409).json({ error: "Ese nombre ya está en uso." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      password: passwordHash,
      rol, // opcional, si no se envía usa el default "usuario"
    });

    // No devolver la contraseña aunque el schema ya la excluye con select:false
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