import axios from "axios";

async function crearUsuario(nombre, password, rol = "usuario") {
  try {
    const { data } = await axios.post("/api/usuarios", {
      nombre,
      password,
      rol,
    });

    console.log("Usuario creado:", data);
    return data;
  } catch (error) {
    // El backend devuelve { error: "..." } en los casos controlados
    const mensaje =
      error.response?.data?.error || "Error al crear el usuario.";
    console.error(mensaje);
    throw new Error(mensaje);
  }
}


const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;