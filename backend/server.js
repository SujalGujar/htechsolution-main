// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import fs from "fs-extra";
// import path from "path";
// import { fileURLToPath } from "url";

// console.log("✅ server.js loaded");

// // Required for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(cors());
// app.use(express.json());

// const UPLOAD_DIR = path.join(__dirname, "uploads");
// const DATA_FILE = path.join(__dirname, "sections.json");

// // Ensure storage exists
// fs.ensureDirSync(UPLOAD_DIR);
// if (!fs.existsSync(DATA_FILE)) {
//   fs.writeJsonSync(DATA_FILE, []);
// }

// // Multer config
// const storage = multer.diskStorage({
//   destination: (_, __, cb) => cb(null, UPLOAD_DIR),
//   filename: (_, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   },
// });
// const upload = multer({ storage });

// // Test route
// app.get("/", (_, res) => {
//   res.send("🚀 Backend is running");
// });

// // Get all sections
// app.get("/sections", async (_, res) => {
//   const sections = await fs.readJson(DATA_FILE);
//   res.json(sections);
// });

// // Add / Update section
// app.post("/sections", upload.single("image"), async (req, res) => {
//   let sections = await fs.readJson(DATA_FILE);
//   const { id, title, content, color } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

//   if (!id) {
//     sections.push({
//       id: Date.now().toString(),
//       title,
//       content,
//       color,
//       image,
//     });
//   } else {
//     sections = sections.map((s) =>
//       s.id === id ? { ...s, title, content, color, image } : s
//     );
//   }

//   await fs.writeJson(DATA_FILE, sections);
//   res.json(sections);
// });

// // Delete section
// app.delete("/sections/:id", async (req, res) => {
//   let sections = await fs.readJson(DATA_FILE);
//   sections = sections.filter((s) => s.id !== req.params.id);
//   await fs.writeJson(DATA_FILE, sections);
//   res.json(sections);
// });

// // Serve images
// app.use("/uploads", express.static(UPLOAD_DIR));

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


// app.get("/sections", async (_, res) => {
//   const sections = await fs.readJson(DATA_FILE);
//   res.json(sections);
// });


// app.get("/sections/type/:type", async (req, res) => {
//   const { type } = req.params;
//   const sections = await fs.readJson(DATA_FILE);

//   const filtered = sections
//     .filter(s => s.type === type)
//     .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

//   res.json(filtered);
// });

// const DELIVERABLE_FILE = path.join(__dirname, "projectDeliverables.json");

// if (!fs.existsSync(DELIVERABLE_FILE)) {
//   fs.writeJsonSync(DELIVERABLE_FILE, []);
// }

// /* ---------- GET ALL ---------- */
// app.get("/project-deliverables", async (_, res) => {
//   const data = await fs.readJson(DELIVERABLE_FILE);
//   res.json(data);
// });

// /* ---------- CREATE / UPDATE ---------- */
// app.post(
//   "/project-deliverables",
//   upload.single("image"),
//   async (req, res) => {
//     let data = await fs.readJson(DELIVERABLE_FILE);

//     const { id, title, review, methodology } = req.body;
//     const image = req.file
//       ? `/uploads/${req.file.filename}`
//       : req.body.image;

//     if (id) {
//       data = data.map((d) =>
//         d.id === id
//           ? { ...d, title, review, methodology, image }
//           : d
//       );
//     } else {
//       data.push({
//         id: Date.now().toString(),
//         title,
//         review,
//         methodology,
//         image,
//       });
//     }

//     await fs.writeJson(DELIVERABLE_FILE, data);
//     res.json({ success: true });
//   }
// );

// /* ---------- DELETE ---------- */
// app.delete("/project-deliverables/:id", async (req, res) => {
//   let data = await fs.readJson(DELIVERABLE_FILE);
//   data = data.filter((d) => d.id !== req.params.id);
//   await fs.writeJson(DELIVERABLE_FILE, data);
//   res.json({ success: true });
// });

// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import fs from "fs-extra";
// import path from "path";
// import { fileURLToPath } from "url";

// console.log("✅ server.js loaded");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // IMPORTANT: Increase payload limit for images
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(cors());

// const UPLOAD_DIR = path.join(__dirname, "uploads");
// const DATA_FILE = path.join(__dirname, "sections.json");

// // Ensure storage exists with full permissions
// fs.ensureDirSync(UPLOAD_DIR);
// console.log("📁 Upload directory path:", UPLOAD_DIR);
// console.log("📁 Upload directory exists:", fs.existsSync(UPLOAD_DIR));

// if (!fs.existsSync(DATA_FILE)) {
//   fs.writeJsonSync(DATA_FILE, []);
// }

// // Multer config - allow common image types
// const storage = multer.diskStorage({
//   destination: (_, __, cb) => {
//     cb(null, UPLOAD_DIR);
//   },
//   filename: (_, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
//     console.log("📸 Saving image as:", uniqueName);
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//   fileFilter: (_, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif|webp/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);
    
//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'));
//     }
//   }
// });

// // Test route
// app.get("/", (_, res) => {
//   res.send("🚀 Backend is running");
// });

// // DEBUG: List uploads
// app.get("/debug-uploads", (_, res) => {
//   try {
//     const files = fs.readdirSync(UPLOAD_DIR);
//     const fileDetails = files.map(file => ({
//       name: file,
//       path: `/uploads/${file}`,
//       fullPath: path.join(UPLOAD_DIR, file),
//       size: fs.statSync(path.join(UPLOAD_DIR, file)).size,
//       url: `http://localhost:5000/uploads/${file}`
//     }));
//     res.json({ 
//       uploadDir: UPLOAD_DIR,
//       files: fileDetails,
//       count: files.length 
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Serve images - MUST be before other routes
// app.use("/uploads", express.static(UPLOAD_DIR));

// // Get all sections
// app.get("/sections", async (_, res) => {
//   const sections = await fs.readJson(DATA_FILE);
//   // Add full URL to images
//   const sectionsWithUrls = sections.map(section => ({
//     ...section,
//     imageUrl: section.image ? `http://localhost:5000${section.image}` : null
//   }));
//   res.json(sectionsWithUrls);
// });

// // Add / Update section
// app.post("/sections", upload.single("image"), async (req, res) => {
//   console.log("📤 POST /sections received");
//   console.log("📤 Body:", req.body);
//   console.log("📤 File:", req.file);
  
//   try {
//     let sections = await fs.readJson(DATA_FILE);
//     const { 
//       id, 
//       title, 
//       content, 
//       color, 
//       type,
//       startTime,
//       endTime
//     } = req.body;
    
//     // Handle image
//     let image = null;
//     if (req.file) {
//       image = `/uploads/${req.file.filename}`;
//       console.log("🖼️ New image saved:", image);
//     } else if (req.body.image) {
//       image = req.body.image;
//       console.log("🖼️ Existing image kept:", image);
//     }
    
//     if (!id) {
//       // Create new
//       const newSection = {
//         id: Date.now().toString(),
//         title: title || "",
//         content: content || "",
//         color: color || "",
//         type: type || "general",
//         startTime: startTime || null,
//         endTime: endTime || null,
//         image: image,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       };
      
//       console.log("📝 Creating section:", newSection);
//       sections.push(newSection);
      
//       await fs.writeJson(DATA_FILE, sections);
//       res.json({ 
//         success: true, 
//         section: newSection,
//         imageUrl: image ? `http://localhost:5000${image}` : null
//       });
      
//     } else {
//       // Update existing
//       const index = sections.findIndex(s => s.id === id);
//       if (index !== -1) {
//         const updatedSection = {
//           ...sections[index],
//           title: title || sections[index].title,
//           content: content || sections[index].content,
//           color: color || sections[index].color,
//           type: type || sections[index].type,
//           startTime: startTime || sections[index].startTime,
//           endTime: endTime || sections[index].endTime,
//           image: image || sections[index].image,
//           updatedAt: new Date().toISOString()
//         };
        
//         console.log("📝 Updating section:", updatedSection);
//         sections[index] = updatedSection;
        
//         await fs.writeJson(DATA_FILE, sections);
//         res.json({ 
//           success: true, 
//           section: updatedSection,
//           imageUrl: image ? `http://localhost:5000${image}` : null
//         });
//       } else {
//         res.status(404).json({ success: false, message: "Section not found" });
//       }
//     }
    
//   } catch (error) {
//     console.error("❌ Error in /sections POST:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Delete section
// app.delete("/sections/:id", async (req, res) => {
//   let sections = await fs.readJson(DATA_FILE);
//   const initialLength = sections.length;
  
//   sections = sections.filter((s) => s.id !== req.params.id);
  
//   if (sections.length < initialLength) {
//     await fs.writeJson(DATA_FILE, sections);
//     res.json({ success: true, message: "Section deleted" });
//   } else {
//     res.status(404).json({ success: false, message: "Section not found" });
//   }
// });

// // Project Deliverables routes (keep as is)
// const DELIVERABLE_FILE = path.join(__dirname, "projectDeliverables.json");
// if (!fs.existsSync(DELIVERABLE_FILE)) {
//   fs.writeJsonSync(DELIVERABLE_FILE, []);
// }

// app.get("/project-deliverables", async (_, res) => {
//   const data = await fs.readJson(DELIVERABLE_FILE);
//   res.json(data);
// });

// app.post("/project-deliverables", upload.single("image"), async (req, res) => {
//   let data = await fs.readJson(DELIVERABLE_FILE);
//   const { id, title, review, methodology } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

//   if (id) {
//     data = data.map((d) =>
//       d.id === id
//         ? { ...d, title, review, methodology, image }
//         : d
//     );
//   } else {
//     data.push({
//       id: Date.now().toString(),
//       title,
//       review,
//       methodology,
//       image,
//     });
//   }

//   await fs.writeJson(DELIVERABLE_FILE, data);
//   res.json({ success: true });
// });

// app.delete("/project-deliverables/:id", async (req, res) => {
//   let data = await fs.readJson(DELIVERABLE_FILE);
//   data = data.filter((d) => d.id !== req.params.id);
//   await fs.writeJson(DELIVERABLE_FILE, data);
//   res.json({ success: true });
// });



// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
//   console.log(`📁 Uploads directory: ${UPLOAD_DIR}`);
//   console.log(`🖼️ Test image URL: http://localhost:${PORT}/uploads/test.jpg`);
// });

import app from "./app.js";
import connectDB from "./config/db.js";
import "dotenv/config";
import dotenv from "dotenv";   
import cors from "cors";

dotenv.config({ path: "./.env" }); 
const PORT = 5000;

// Source - https://stackoverflow.com/q
// Posted by Sudarsan Sarkar, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-28, License - CC BY-SA 4.0

import dns from "node:dns/promises"; 
dns.setServers(["1.1.1.1", "1.0.0.1"]);

app.use(cors({
  origin: ["https://htechsolution.in", // your real domain
  "https://htechsolution-main-d7ku.vercel.app", // your vercel domain
  "http://localhost:3000", // for local development
  "http://localhost:5173", ],// for local development (Vite)
  
  credentials: true
}));
const startServer = async () => {
  try {
    console.log("🔌 Connecting to database...");
    await connectDB();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    console.log("✅ Database connected");                 
              
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
      // app.use(cors({ origin: 'https://htechsolution-main-d7ku.vercel.app' }))
    });               
  } catch (error) {
    console.error(" Failed to start server:", error.message);
    process.exit(1);                          
  }                                 
};                          
                                                                  
startServer();                                                                    
                                          
                         
                                                                                                                                                                                               