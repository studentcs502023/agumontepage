import mongoose from "mongoose";

// Modelo de producto para el catálogo.
// La imagen se guarda como texto (URL https://... o base64 ya comprimido),
// para que no ocupe demasiado espacio en la base de datos.
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    description: { type: String, default: "" },
    detail: { type: String, default: "" },
    tag: { type: String, default: "" },
    tagClass: { type: String, default: "text-primary" },
    category: { type: String, default: "" },
    activity: { type: String, default: "" },
    customization: { type: String, default: "" },
    image: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Tercer argumento "productos" fuerza el nombre exacto de la colección
// (Mongoose por defecto pluralizaría a "products" en inglés).
export const Product = mongoose.model("Product", productSchema, "productos");

// Al serializar a JSON, se expone "id" igual a "_id"
// para que el frontend pueda usar product.id directamente.
productSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

export default Product;
