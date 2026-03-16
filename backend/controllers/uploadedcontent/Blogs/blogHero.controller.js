import * as service from "../../../services/uploadContent/Blogs/blogHero.service.js";

// GET all
export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST create
export const create = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const saved = await service.create({
      title,
      content,
      image: imagePath,
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE
export const remove = async (req, res) => {
  try {
    const { id }  = req.params;
    const deleted = await service.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Deleted successfully", id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};