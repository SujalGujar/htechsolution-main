import Blog from "../../../models/uploadedcontent/Blogs/Blog.model.js";

export const getAll = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

export const create = async (data) => {
  const blog = new Blog(data);
  return await blog.save();
};

export const update = async (id, data) => {
  return await Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await Blog.findByIdAndDelete(id);
};