import axios from "axios";

// Si la variable viene con /api al final se limpia; luego se asegura incluir /api una sola vez
const rawBaseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const cleanHost = rawBaseURL.replace(/\/api\/?$/, "").replace(/\/$/, "");
const API_BASE_URL = `${cleanHost}/api`;

const api = axios.create({
  baseURL: API_BASE_URL, // Siempre quedará como "http://localhost:3000/api"
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adjunta el token JWT (si existe) a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ── Productos ── */
export const obtenerProductos = async () => {
  try {
    const { data } = await api.get("/productos");
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "No se pudieron obtener los productos.");
  }
};

export const crearProducto = async (producto) => {
  try {
    const { data } = await api.post("/productos", producto);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || "No se pudo crear el producto.");
  }
};

export const actualizarProducto = async (id, producto) => {
  try {
    const { data } = await api.put(`/productos/${id}`, producto);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "No se pudo actualizar el producto.");
  }
};

export const eliminarProducto = async (id) => {
  try {
    const { data } = await api.delete(`/productos/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "No se pudo eliminar el producto.");
  }
};

/* ── Autenticación y Usuarios ── */
export const login = async (nombre, password) => {
  try {
    const { data } = await api.post("/auth/login", { nombre, password });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Credenciales inválidas.");
  }
};

export const crearUsuario = async (nombre, password) => {
  try {
    const { data } = await api.post("/usuarios", { nombre, password });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "No se pudo crear el usuario.");
  }
};

/* ── Subir imagen (multipart/form-data) ── */
export const subirImagen = async (file) => {
  try {
    const formData = new FormData();
    formData.append("imagen", file);

    const { data } = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.url;
  } catch (error) {
    throw new Error(error.response?.data?.error || "No se pudo subir la imagen.");
  }
};

export default api;