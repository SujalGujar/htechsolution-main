import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../controllers/uploadedcontent/softwareProject.controller.js";

const router = express.Router();

// Multer config — saves image to /uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // unique filename using timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.get("/",       getAllProjects);                          // GET    /api/software-projects
router.post("/",      upload.single("image"), createProject);  // POST   /api/software-projects
router.put("/:id",    upload.single("image"), updateProject);  // PUT    /api/software-projects/:id
router.delete("/:id", deleteProject);                          // DELETE /api/software-projects/:id

export default router;