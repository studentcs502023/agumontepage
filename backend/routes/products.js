import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

// GET /api/productos -> listar todos
router.get("/productos", async (req, res) => {
  try {
    const productos = await Product.find().sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los productos." });
  }
});

// GET /api/productos/:id -> un producto
router.get("/productos/:id", async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el producto." });
  }
});

// POST /api/productos -> crear
router.post("/productos", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "El nombre es obligatorio." });
    }
    const producto = await Product.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/productos/:id -> editar
router.put("/productos/:id", async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/productos/:id -> eliminar
router.delete("/productos/:id", async (req, res) => {
  try {
    const producto = await Product.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    res.json({ mensaje: "Producto eliminado.", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el producto." });
  }
});

export default router;