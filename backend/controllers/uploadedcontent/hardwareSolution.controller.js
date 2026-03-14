import * as service from "../../services/uploadContent/hardwareSolution.service.js";
import fs from "fs";
import path from "path";

// GET ALL
export const getAllSolutions = async (req, res) => {
  try {
    const data = await service.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// CREATE
export const createSolution = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    // ✅ Image comes from Multer req.file
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const saved = await service.create({
      title,
      description,
      image: imagePath,
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE
export const updateSolution = async (req, res) => {
  try {
    const { id }              = req.params;
    const { title, description } = req.body;

    const existing = await service.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Solution not found" });
    }

    const updateData = { title, description };

    // ✅ New image uploaded — delete old one and use new path
    if (req.file) {
      if (existing.image) {
        const oldPath = path.join(process.cwd(), existing.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await service.update(id, updateData);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE
export const deleteSolution = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await service.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Solution not found" });
    }

    // ✅ Delete image file from server
    if (existing.image) {
      const imgPath = path.join(process.cwd(), existing.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await service.remove(id);
    res.status(200).json({ message: "Deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};