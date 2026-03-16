import * as service from "../../../services/uploadContent/aboutuscontent/blog.service.js";

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

    // ✅ Check which file was uploaded — image or video
    let imagePath  = "";
    let videoPath  = "";
    let mediaType  = "none";

    if (req.files?.image?.[0]) {
      imagePath = `/uploads/${req.files.image[0].filename}`;
      mediaType = "image";
    }

    if (req.files?.video?.[0]) {
      videoPath = `/uploads/${req.files.video[0].filename}`;
      mediaType = "video";
    }

    const saved = await service.create({
      title,
      content,
      image: imagePath,
      video: videoPath,
      mediaType,
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT update
export const update = async (req, res) => {
  try {
    const { id }             = req.params;
    const { title, content } = req.body;

    const updateData = { title, content };

    if (req.files?.image?.[0]) {
      updateData.image     = `/uploads/${req.files.image[0].filename}`;
      updateData.mediaType = "image";
    }

    if (req.files?.video?.[0]) {
      updateData.video     = `/uploads/${req.files.video[0].filename}`;
      updateData.mediaType = "video";
    }

    const updated = await service.update(id, updateData);

    if (!updated) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updated);
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