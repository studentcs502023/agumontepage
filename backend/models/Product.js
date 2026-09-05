import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
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
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;