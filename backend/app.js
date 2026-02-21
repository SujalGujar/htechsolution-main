import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import sectionRoutes from "./routes/section.routes.js";
import deliverableRoutes from "./routes/deliverable.routes.js";
import authRoutes from "./routes/auth.routes.js";  // or authRoutes.js
import userRoutes from "./routes/user.routes.js";

import categoryRoutes from "./routes/productCatogory.route.js";
import categoryConfigRoutes from "./routes/productConfig.route.js";
// import customerDetailRoutes from "./routes/customerDetails.routes.js"
import customerDetailRoutes from "./routes/customerCare.route.js"
import customerRoutes from "./routes/customer.route.js"
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
app.use("/api/customerDetails",customerDetailRoutes)
app.use("/api/customer",customerRoutes)
app.use("/api/category", categoryRoutes);
app.use("/api/product", categoryConfigRoutes);
  // Dynamic import for productConfig.route.js
// app.use("/api/customerDetails",customerDetailRoutes)
// app.use("/api/product", await import("./routes/productConfig.route.js").then(m => m.default))

// Test route
app.get("/", (_, res) => {
  res.send("🚀 Backend is running");
});

export default app;