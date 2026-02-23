import Category from "../../models/productsRegisterModel/catogory.js";
export const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  // findById uses _id field automatically
  
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};