import { Router } from "express";
import Usuario from "../models/Usuario.js";

const router = Router();

// POST /api/usuarios -> crear/registrar usuario
router.post("/usuarios", async (req, res) => {
  try {
    const { nombre, password, rol } = req.body;

    if (!nombre || !password) {
      return res
        .status(400)
        .json({ error: "Nombre y contraseña son obligatorios." });
    }

    const existe = await Usuario.findOne({ nombre });
    if (existe) {
      return res.status(409).json({ error: "Ese nombre ya está en uso." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevo = await Usuario.create({
      nombre,
      password: passwordHash,
      rol,
    });

    const { password: _omit, ...sinPassword } = nuevo.toObject();
    res.status(201).json(sinPassword);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "No se pudo crear el usuario." });
  }
});

export default router;
