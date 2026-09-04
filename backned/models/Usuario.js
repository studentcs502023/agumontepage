import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      // No se devuelve por defecto en las consultas (útil para no exponerlo en network)
      select: false,
    },
    rol: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario",
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    // Agrega createdAt y updatedAt automáticamente
    timestamps: true,
    // Quita el campo __v de los documentos
    versionKey: false,
  }
);

export const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;

