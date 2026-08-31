import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/aguamonte";

const productos = [
  {
    name: "Chaleco Rafting Pro V",
    description: "Tipo V PFD, alta flotabilidad, ajustes técnicos.",
    detail:
      "Chaleco tipo V con espuma de alta densidad, certificado para aguas bravas, correas ajustables y silbato de emergencia.",
    tag: "SEGURIDAD",
    tagClass: "text-primary",
    category: "chalecos",
    activity: "rafting",
    customization: "",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLuHenqJWyjiQDV3Cj1dhGKMFacL1TTnUewQ9UobpcvUapsCWNNdaxCOnRLK4SEMImFIRCV6Ve2rqD7tta9VDTnN2xmnfQJ4yOK1OM86iE4_VTHwaR1GX_7z6H9jX7Wp4Zy4ms-iC-EyFnH1NRoE6N8TJLWN-csQSlPCcAmd2hJsIh1AwyrYcm_Nv2-kqOeYJCKlmMOqTcPMNb4w7CXpJBfjfXFBTSlgBGyEv0LNTUnGhHIrpaZb3M2sf-Y",
  },
  {
    name: "Sub-Camisa Racing",
    description: "Secado rápido, protección UV, full print.",
    detail:
      "Tela sublimada de secado rápido con protección UV 50+, costuras planas y ajuste deportivo.",
    tag: "PERSONALIZADO",
    tagClass: "text-tertiary",
    category: "camisas",
    activity: "rafting",
    customization: "sublimado",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtgqBeb2Wr4vloEQb8dkFh6KIVHF0IhpdXtYegZv1oDTp6S44Zkp2OTwlYMtJfplUPscnCOUbjgfF7rt1S0FhqCvbphVc2T8jAQsGJTHmhPZ5DtfeeDLOBEKPDtXxrteT-CqGZu5X3DeWUn5DAIrCXfV4gDFXQqFvyKD8rAMDt6FWtb5cXeSZYOFNqaB5E5acvVjZvyIL3N8ExixE43GOZj3dEyzTNgHZh-gioudhKttFfUYfgtnCB18iw",
  },
  {
    name: "Bolso Impermeable 30L",
    description: "Sellado ultrasónico, lona de alta tenacidad.",
    detail:
      "Bolso estanco con cierre enrollable, lona de alta tenacidad 500D y costuras selladas.",
    tag: "OUTDOOR",
    tagClass: "text-secondary",
    category: "bolsos",
    activity: "rafting",
    customization: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBU5SF8URdBLFUTzZ4YokP0JAvawPdlqHk9aPK2dNoldqkD0AdaJRBzKbB7nefx444XVNGcGQmQ4Cz3FbqVIusuEHyJkCcdSYgBI7cQlhTF_2UZL_7KIhgGJTR2dRYPnsmNjz0Mnj_HeJf66T9yhZJY60-rS8YMeQJesp7V2D0FhkFBwDS3kQTMzQYd-yQxlTC2uO2sYSJbfikOJo4qdAzsBwU3HydO2nK_cmt4Y9bs-_8Eb59M1iC_",
  },
  {
    name: "Chaqueta Cortaviento",
    description: "Ligera, resistente al agua, logo bordado opcional.",
    detail:
      "Capa exterior repelente al agua, forro transpirable y bolsillos con cierre.",
    tag: "CORPORATIVO",
    tagClass: "text-primary-fixed-dim",
    category: "",
    activity: "corporativo",
    customization: "bordado",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7JL12qqOeeaT1uCFxWaS9Z1NmxQlj0B_JHPil0cHrSxk94IKI_YX6WnVVZvZyAQ1kIWKSYhRF46zOsvVIiO_eqccXM9rUEvY8JXJPBfuiKC1itMxeXMOgujdbNb0O7biEM6WeeAK-AHmUtuDzFgu4VcMongtHqQQDmzuZezvSP39xU5laRBo6_C-0rMZbAu4BtsXRe9lwkS4qMQ37sf2WY1APGyDMsn17y1XSVhQ_ZjPzPR0V0OP7",
  },
  {
    name: "Casco Aguas Blancas",
    description: "Carcasa ABS, espuma EVA, ajuste dial.",
    detail:
      "Carcasa ABS resistente a impactos, acolchado EVA extraíble y sistema de ajuste por dial.",
    tag: "SEGURIDAD",
    tagClass: "text-primary",
    category: "",
    activity: "rafting",
    customization: "",
    image: null,
  },
  {
    name: "Polo Guía Técnica",
    description: "Antimicrobiano, ventilación mesh, logo transfer.",
    detail:
      "Polo técnico antimicrobiano con paneles mesh de ventilación y logo por transfer.",
    tag: "PERSONALIZADO",
    tagClass: "text-tertiary",
    category: "camisas",
    activity: "",
    customization: "sublimado",
    image: null,
  },
  {
    name: "Mochila Cuerda Rescate",
    description: "Malla drenante, alta visibilidad reflectiva.",
    detail:
      "Malla drenante de secado rápido, correas reflectivas y compartimentos para cuerda.",
    tag: "OUTDOOR",
    tagClass: "text-secondary",
    category: "bolsos",
    activity: "rafting",
    customization: "",
    image: null,
  },
  {
    name: "Pantalón Cargo Técnico",
    description: "Ripstop resistente, refuerzos en rodillas.",
    detail:
      "Ripstop de alta resistencia, refuerzos en rodillas y múltiples bolsillos cargo.",
    tag: "CORPORATIVO",
    tagClass: "text-primary-fixed-dim",
    category: "",
    activity: "corporativo",
    customization: "",
    image: null,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    await Product.deleteMany({});
    console.log("🧹 Colección 'productos' limpiada");

    const creados = await Product.insertMany(productos);
    console.log(`✅ Se insertaron ${creados.length} productos en 'productos'`);
  } catch (error) {
    console.error("❌ Error al sembrar:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Conexión cerrada");
  }
}

seed();
