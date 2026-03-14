import express from "express";
import multer from "multer";
import path from "path";
import {
  getAll,
  create,
  update,
  remove,
} from "../../controllers/uploadedcontent/projectDeliverable.controller.js";

const router = express.Router();

// Multer config — saves image to /uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
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
router.get("/",       getAll);                           // GET    /api/project-deliverables
router.post("/",      upload.single("image"), create);   // POST   /api/project-deliverables
router.put("/:id",    upload.single("image"), update);   // PUT    /api/project-deliverables/:id
router.delete("/:id", remove);                           // DELETE /api/project-deliverables/:id

export default router;