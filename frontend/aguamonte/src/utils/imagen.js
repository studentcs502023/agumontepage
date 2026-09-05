// Comprime y redimensiona una imagen antes de convertirla a base64,
// para que no ocupe demasiado espacio en la base de datos.
export function comprimirImagen(file, maxSize = 800, calidad = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          const ratio = Math.min(maxSize / width, maxSize / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", calidad));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Resuelve la URL completa de una imagen.
// - Si ya es http(s) o data:, la devuelve igual.
// - Si empieza con "/uploads/...", le antepone la URL del backend.
export function urlImagen(path) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  if (path.startsWith("/")) {
    const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
    return base + path;
  }
  return path;
}
