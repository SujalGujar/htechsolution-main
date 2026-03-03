import productRegister from "../../models/productsRegisterModel/productRegister.model.js";

export const getAllProducts = async () => {
  return await productRegister.find()
    .populate("category")
    .sort({ createdAt: -1 });
};