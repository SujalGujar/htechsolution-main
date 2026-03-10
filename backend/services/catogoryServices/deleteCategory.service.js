import Product from "../../models/productsRegisterModel/productRegister.model.js";
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },  
    { new: true }
  );

  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};
