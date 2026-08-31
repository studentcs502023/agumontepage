// frontend/src/utils/productos.js
// Solo funciones que consumen el backend (API). Sin datos hardcoded.
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../api/servicios.js";

// Carga todos los productos desde la base de datos.
// Acepta que el backend responda un array [...] o un objeto { productos: [...] }.
export async function cargarProductos() {
  const data = await obtenerProductos();
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.productos)) return data.productos;
  return [];
}

// Crea o actualiza un producto. Retorna la lista actualizada desde la API.
export async function guardarProducto(producto, esNuevo) {
  if (esNuevo) {
    await crearProducto(producto);
  } else {
    await actualizarProducto(producto.id, producto);
  }
  return obtenerProductos();
}

// Elimina un producto. Retorna la lista actualizada desde la API.
export async function borrarProducto(id) {
  await eliminarProducto(id);
  return obtenerProductos();
}