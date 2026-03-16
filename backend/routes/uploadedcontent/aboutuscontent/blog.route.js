import express from "express";
import multer from "multer";
import path from "path";
import {
  getAll,
  create,
  update,
  remove,
} from "../../../controllers/uploadedcontent/Blogs/blog.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

// ✅ Allow both image and video files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/webm",
    "video/ogg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max for videos
});

// ✅ fields() allows both image AND video in same request
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

router.get("/",       getAll);
router.post("/",      uploadFields, create);
router.put("/:id",    uploadFields, update);
router.delete("/:id", remove);

export default router;