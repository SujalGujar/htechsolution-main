import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import sectionRoutes from "./routes/section.routes.js";
import deliverableRoutes from "./routes/deliverable.routes.js";
import authRoutes from "./routes/auth.routes.js";  // or authRoutes.js
import userRoutes from "./routes/user.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ MIDDLEWARE FIRST - BEFORE ANY ROUTES!
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ ROUTES SECOND - AFTER MIDDLEWARE!
app.use("/sections", sectionRoutes);
app.use("/project-deliverables", deliverableRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes)

// Test route
app.get("/", (_, res) => {
  res.send("🚀 Backend is running");
});

export default app;