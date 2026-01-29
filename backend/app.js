import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import sectionRoutes from "./routes/section.routes.js";
import deliverableRoutes from "./routes/deliverable.routes.js";

// import authRoutes from "./routes/auth.routes.js";
// import itemRoutes from "./routes/item.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/sections", sectionRoutes);
app.use("/project-deliverables", deliverableRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/items", itemRoutes);

// Test route
app.get("/", (_, res) => {
  res.send("🚀 Backend is running");
});

export default app;
