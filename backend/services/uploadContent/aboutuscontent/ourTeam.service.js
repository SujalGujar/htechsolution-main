import OurTeam from "../../../models/uploadedcontent/aboutuscontent/OurTeam.model.js";

export const getAll = async () => {
  return await OurTeam.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  const member = new OurTeam(data);
  return await member.save();
};

export const update = async (id, data) => {
  return await OurTeam.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await OurTeam.findByIdAndDelete(id);
};