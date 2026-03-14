import HeroSection from "../../models/uploadedcontent/heroSection.model.js";

export const getAll = async () => {
  return await HeroSection.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  const hero = new HeroSection(data);
  return await hero.save();
};

export const update = async (id, data) => {
  return await HeroSection.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await HeroSection.findByIdAndDelete(id);
};