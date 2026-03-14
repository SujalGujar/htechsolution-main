import ProjectDeliverable from "../../models/uploadedcontent/ProjectDeliverable.model.js";

// Get all deliverables - newest first
export const getAll = async () => {
  return await ProjectDeliverable.find().sort({ createdAt: -1 });
};

// Create new deliverable
export const create = async (data) => {
  const deliverable = new ProjectDeliverable(data);
  return await deliverable.save();
};

// Update existing deliverable by id
export const update = async (id, data) => {
  return await ProjectDeliverable.findByIdAndUpdate(id, data, {
    new: true,           // return updated document
    runValidators: true,
  });
};

// Delete deliverable by id
export const remove = async (id) => {
  return await ProjectDeliverable.findByIdAndDelete(id);
};