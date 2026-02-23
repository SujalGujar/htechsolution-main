import Category from "../../models/productsRegisterModel/catogory.js";
export const getAllCategories = async () => {
  // find() with no filter = get everything
  // sort by createdAt descending = newest first
  const categories = await Category.find({ isActive: true })
    .sort({ createdAt: -1 });
  return categories;
};
