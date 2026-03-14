import * as service from "../../services/uploadContent/projectDeliverable.service.js";

// GET all - /api/project-deliverables
export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST create - /api/project-deliverables
export const create = async (req, res) => {
  try {
    const { title, review, methodology } = req.body;

    if (!title || !review || !methodology) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const saved = await service.create({
      title,
      review,
      methodology,
      image: imagePath,
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT update - /api/project-deliverables/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, review, methodology } = req.body;

    const updateData = { title, review, methodology };

    // Only update image if new file uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await service.update(id, updateData);

    if (!updated) {
      return res.status(404).json({ message: "Deliverable not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE - /api/project-deliverables/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: "Deliverable not found" });
    }

    res.status(200).json({ message: "Deleted successfully", id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};