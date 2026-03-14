import * as service from "../../services/uploadContent/ourAchievement.service.js";

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
    const { title, value, description } = req.body;

    if (!title || !value) {
      return res.status(400).json({ message: "Title and value are required" });
    }

    // Image path from Multer
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const saved = await service.create({
      title,
      value,
      description,
      image: imagePath,
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT update
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, value, description } = req.body;

    const updateData = { title, value, description };

    // Only update image if new file uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await service.update(id, updateData);

    if (!updated) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.status(200).json({ message: "Deleted successfully", id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};