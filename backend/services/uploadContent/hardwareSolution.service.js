import HardwareSolution from "../../models/uploadedcontent/hardwareSolution.model.js";

export const getAll = async () => {
  return await HardwareSolution.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  const solution = new HardwareSolution(data);
  return await solution.save();
};

export const findById = async (id) => {
  return await HardwareSolution.findById(id);
};

export const update = async (id, data) => {
  return await HardwareSolution.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await HardwareSolution.findByIdAndDelete(id);
};