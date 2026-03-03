// import PurchaseBatch from "../../models/PurchaseBatch.js";
// import ProductBatch from "../../models/ProductBatch.js";
// import ProductItem from "../../models/ProductItem.js";
// import CategoryConfig from "../../models/CategoryConfig.js";

// export const registerProductBatchService = async (data) => {
//   const { category, configurations, quantity } = data;

//   // 1️⃣ Validate category config
//   const categoryConfig = await CategoryConfig.findOne({ category });

//   if (!categoryConfig) {
//     throw new Error("Category configuration not found");
//   }

//   categoryConfig.fields.forEach((field) => {
//     if (field.isRequired && !configurations[field.fieldKey]) {
//       throw new Error(`${field.fieldName} is required`);
//     }
//   });

//   // 2️⃣ Create Purchase Ticket
//   const purchaseTicket = await PurchaseBatch.create({});

//   // 3️⃣ Create Batch
//   const batch = await ProductBatch.create({
//     batchTicket: purchaseTicket._id,
//     category,
//     configurations,
//     quantity
//   });

//   // 4️⃣ Generate Individual Items
//   const items = [];

//   for (let i = 0; i < quantity; i++) {
//     items.push({
//       batch: batch._id
//     });
//   }

//   await ProductItem.insertMany(items);

//   return {
//     ticketNumber: purchaseTicket.ticketNumber,
//     batch
//   };
// };

import Product from "../../models/Product.js";
import CategoryConfig from "../../models/CategoryConfig.js";

export const registerProductsService = async (data) => {
  const {
    category,
    productName,
    configurations,
    quantity
  } = data;

  if (!quantity || quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  // Validate Category Configuration
  const categoryConfig = await CategoryConfig.findOne({ category });

  if (!categoryConfig) {
    throw new Error("Category configuration not found");
  }

  // Validate Required Fields
  categoryConfig.fields.forEach((field) => {
    if (field.isRequired && !configurations[field.fieldKey]) {
      throw new Error(`${field.fieldName} is required`);
    }
  });

  const createdProducts = [];

  // 🔥 IMPORTANT: Use create() not insertMany()
  for (let i = 0; i < quantity; i++) {
    const product = await Product.create({
      category,
      productName,
      configurations
    });

    createdProducts.push(product);
  }

  return createdProducts;
};