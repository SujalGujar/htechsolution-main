import * as service from "../../services/uploadContent/aboutUs.service.js";

// GET all
export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST create
export const create = async (req, res) => {
  try {
    const { heading, description, features } = req.body;

    if (!heading || !description) {
      return res.status(400).json({
        message: "Heading and description are required",
      });
    }

    // ✅ Parse features from JSON string (sent via FormData)
    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = Array.isArray(features)
          ? features
          : features.split(",").map((f) => f.trim());
      }
    }

    // ✅ Image path comes from Multer not req.body
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const saved = await service.create({
      heading,
      description,
      features: parsedFeatures,
      image:    imagePath,
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT update
export const update = async (req, res) => {
  try {
    const { id }                          = req.params;
    const { heading, description, features } = req.body;

    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = Array.isArray(features)
          ? features
          : features.split(",").map((f) => f.trim());
      }
    }

    const updateData = { heading, description, features: parsedFeatures };

    // ✅ Only update image if new file uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await service.update(id, updateData);

    if (!updated) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE
export const remove = async (req, res) => {
  try {
    const { id }    = req.params;
    const deleted   = await service.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ message: "Deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};