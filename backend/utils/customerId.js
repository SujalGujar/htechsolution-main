import Customer from "../models/customerRegisterModel/customerDetails.model.js";

// 🔥 Generate ID
export const generateCustomerProductId = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `CUS-${date}-${random}`;
};

// 🔥 Check uniqueness
export const isCustomerProductIdExists = async (id) => {
  const exists = await Customer.findOne({
    "products.customerProductId": id,
  });
  return !!exists;
};