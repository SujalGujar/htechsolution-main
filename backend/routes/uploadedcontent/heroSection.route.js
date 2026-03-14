import express from "express";
import multer from "multer";
import path from "path";
import {
  getAll,
  create,
  update,
  remove,
} from "../../controllers/uploadedcontent/heroSection.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith("image/")
    ? cb(null, true)
    : cb(new Error("Only images allowed"), false);
};

const upload = multer({ storage, fileFilter });

// ✅ Routes match API = "http://localhost:5000/hero-section"
router.get("/",       getAll);
router.post("/",      upload.single("image"), create);
router.put("/:id",    upload.single("image"), update);
router.delete("/:id", remove);

export default router;