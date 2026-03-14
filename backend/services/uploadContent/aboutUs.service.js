import AboutUs from "../../models/uploadedcontent/AboutUs.model.js";

export const getAll = async () => {
  return await AboutUs.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  const aboutUs = new AboutUs(data);
  return await aboutUs.save();
};

export const update = async (id, data) => {
  return await AboutUs.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await AboutUs.findByIdAndDelete(id);
};