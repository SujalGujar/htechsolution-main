import * as service from "../../services/uploadContent/heroSection.service.js";

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
    const { heading, description } = req.body;

    if (!heading || !description) {
      return res.status(400).json({
        message: "Heading and description are required",
      });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const saved = await service.create({
      heading,
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
    const { heading, description } = req.body;

    const updateData = { heading, description };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await service.update(id, updateData);

    if (!updated) {
      return res.status(404).json({ message: "Hero section not found" });
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
      return res.status(404).json({ message: "Hero section not found" });
    }

    res.status(200).json({ message: "Deleted successfully", id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};