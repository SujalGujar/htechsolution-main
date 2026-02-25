import CategoryConfig from "../../models/productsRegisterModel/catogoryConfig.js";
import Category from "../../models/productsRegisterModel/catogory.js";
export const createCategoryConfig = async (data) => {
  // First check if category exists
  const category = await Category.findById(data.category);
  if (!category) {
    throw new Error("Category not found");
  }

  
  const existing = await CategoryConfig.findOne({ category: data.category });
  if (existing) {
    throw new Error("Config already exists for this category. Use update instead.");
  }

  const config = new CategoryConfig(data);
  await config.save();
  return config;
};
