import Category from "../../models/productsRegisterModel/catogory.js";

// CREATE
export const createCategory = async (data) => {
  // Check if category already exists
  const existing = await Category.findOne({ 
    name: { $regex: new RegExp(`^${data.name}$`, "i") } 
    // $regex with 'i' flag = case insensitive
    // So "Laptop" and "laptop" are treated as same
  });

  if (existing) {
    
    throw new Error("Category already exists");
  }

  const category = new Category(data);
  await category.save();
  return category;
};