import { Router } from "express";
import multer from "multer";

// Usar memoria RAM (no crea carpetas ni archivos en disco)
const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5 MB por imagen
});

const router = Router();

// POST /upload (recuerda que en index.js está bajo /api)
router.post("/upload", upload.single("imagen"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se recibió ninguna imagen." });
    }

    // Convertir el buffer de la imagen a un string Base64
    const base64Image = req.file.buffer.toString("base64");
    const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`;

    // Devolvemos la imagen como un Data URL para ser guardado en la BD
    res.status(201).json({ url: imageUrl, filename: req.file.originalname });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la imagen." });
  }
});

export default router;