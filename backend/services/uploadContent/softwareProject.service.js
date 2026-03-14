// Services layer — handles all database operations
// Controller calls service, service talks to MongoDB
// This keeps code clean and separated

import SoftwareProject from "../../models/uploadedcontent/SoftwareProject.model.js";

export const getAllProjects = async () => {
  return await SoftwareProject.find().sort({ createdAt: -1 });
};

export const createProject = async (data) => {
  const project = new SoftwareProject(data);
  return await project.save();
};

export const updateProjectById = async (id, data) => {
  return await SoftwareProject.findByIdAndUpdate(id, data, {
    new: true,           // return updated document
    runValidators: true, // validate before saving
  });
};

export const deleteProjectById = async (id) => {
  return await SoftwareProject.findByIdAndDelete(id);
};