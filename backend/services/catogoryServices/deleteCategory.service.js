import Category from "../../models/productsRegisterModel/catogory.js";
export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { isActive: false },  
    { new: true }
  );

  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};
