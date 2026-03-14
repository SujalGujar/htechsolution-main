import OurAchievement from "../../models/uploadedcontent/OurAchievement.model.js";

export const getAll = async () => {
  return await OurAchievement.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  const achievement = new OurAchievement(data);
  return await achievement.save();
};

export const update = async (id, data) => {
  return await OurAchievement.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await OurAchievement.findByIdAndDelete(id);
};