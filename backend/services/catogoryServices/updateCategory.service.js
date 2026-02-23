import Category from "../../models/productsRegisterModel/catogory.js";
export const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(
    id,      // which document to update
    data,    // what to update
    { new: true, runValidators: true }
    // new: true → return updated document (not old one)
    // runValidators: true → run schema validations on update too
  );

  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};