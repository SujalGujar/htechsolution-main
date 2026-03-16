import BlogHero from "../../../models/uploadedcontent/Blogs/BlogHero.model.js";

export const getAll = async () => {
  return await BlogHero.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  const blog = new BlogHero(data);
  return await blog.save();
};

export const remove = async (id) => {
  return await BlogHero.findByIdAndDelete(id);
};