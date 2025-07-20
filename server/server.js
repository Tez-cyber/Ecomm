import express from "express";
import dotenv from "dotenv";

// Routes import
import authRoutes from './routes/auth.route.js';

dotenv.config()
const app = express();

// ======= routes
app.use("/api/auth", authRoutes)


// ==============
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})