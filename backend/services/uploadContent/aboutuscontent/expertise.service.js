import Expertise from "../../../models/uploadedcontent/aboutuscontent/Expertise.model.js";

export const getAll = async () => {
  return await Expertise.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  const expertise = new Expertise(data);
  return await expertise.save();
};

export const update = async (id, data) => {
  return await Expertise.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await Expertise.findByIdAndDelete(id);
};