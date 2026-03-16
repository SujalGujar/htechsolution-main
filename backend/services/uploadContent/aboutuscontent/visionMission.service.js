import VisionMission from "../../../models/uploadedcontent/aboutuscontent/VisionMission.model.js";

export const getAll = async () => {
  return await VisionMission.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  const section = new VisionMission(data);
  return await section.save();
};

export const update = async (id, data) => {
  return await VisionMission.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await VisionMission.findByIdAndDelete(id);
};