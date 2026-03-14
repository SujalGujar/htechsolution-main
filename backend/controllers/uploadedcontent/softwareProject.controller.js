import * as projectService from "../../services/uploadContent/softwareProject.service.js";

// GET all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST create new project
export const createProject = async (req, res) => {
  try {
    const { title, description, features, gradient } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Parse features — comes as JSON string from FormData
    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = Array.isArray(features) ? features : [features];
      }
    }

    // Image path from Multer
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const project = await projectService.createProject({
      title,
      description,
      features: parsedFeatures,
      image: imagePath,
      
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, features, gradient } = req.body;

    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = Array.isArray(features) ? features : [features];
      }
    }

    const updateData = {
      title,
      description,
      features: parsedFeatures,
      
    };

    // Only update image if new file uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await projectService.updateProjectById(id, updateData);

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await projectService.deleteProjectById(id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};