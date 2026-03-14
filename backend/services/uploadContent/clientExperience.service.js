import ClientExperience from "../../models/uploadedcontent/ClientExperience.model.js";

export const getAll = async () => {
  return await ClientExperience.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  const experience = new ClientExperience(data);
  return await experience.save();
};

export const update = async (id, data) => {
  return await ClientExperience.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await ClientExperience.findByIdAndDelete(id);
};