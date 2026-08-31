import axios from "axios";

// Cliente axios apuntando a la API del backend.
// La URL se lee desde el archivo .env (VITE_API_URL).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adjunta el token JWT (si existe) a cada petición.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ── Productos ── */
export const obtenerProductos = async () => {
  const { data } = await api.get("/api/productos");
  return data;
};

export const crearProducto = async (producto) => {
  const { data } = await api.post("/api/productos", producto);
  return data;
};

export const actualizarProducto = async (id, producto) => {
  const { data } = await api.put(`/api/productos/${id}`, producto);
  return data;
};

export const eliminarProducto = async (id) => {
  const { data } = await api.delete(`/api/productos/${id}`);
  return data;
};

/* ── Usuario (registro) ── */
export const crearUsuario = async (nombre, password) => {
  const { data } = await api.post("/api/usuarios", { nombre, password });
  return data;
};

/* ── Auth (login) ── */
export const login = async (nombre, password) => {
  const { data } = await api.post("/api/auth/login", { nombre, password });
  return data;
};

/* ── Subir imagen (multipart/form-data) ── */
export const subirImagen = async (file) => {
  const formData = new FormData();
  formData.append("imagen", file);
  const { data } = await api.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url; // ej. /uploads/img-123.jpg
};

export default api;
