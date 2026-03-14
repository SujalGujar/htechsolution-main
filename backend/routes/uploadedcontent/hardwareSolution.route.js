import express from "express";
import multer from "multer";
import path from "path";

import {
  getAllSolutions,
  createSolution,
  updateSolution,
  deleteSolution,
} from "../../controllers/uploadedcontent/hardwareSolution.controller.js";

const router = express.Router();

// STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// IMAGE FILTER
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// ROUTES
router.get("/", getAllSolutions);
router.post("/", upload.single("image"), createSolution);
router.put("/:id", upload.single("image"), updateSolution);
router.delete("/:id", deleteSolution);

export default router;