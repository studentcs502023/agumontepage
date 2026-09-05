import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,

    // Seguridad y JWT
    JWT_SECRET: process.env.JWT_SECRET || "default_super_secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",

 
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5174",
};