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

// import Product from "../../models/productsRegisterModel/ProductItem.js";
// import Product from "../../models/productsRegisterModel/productRegister.model.js"
// import CategoryConfig from "../../models/productsRegisterModel/catogoryConfig.js";

// export const registerProductsBatch= async (data) => {
//   const {
//     category,
//     productName,
//     configurations,
//     quantity
//   } = data;

//    console.log("🔍 category:", category);         // 👈 ADD
//   console.log("🔍 productName:", productName);   // 👈 ADD
//   console.log("🔍 configurations:", configurations); // 👈 ADD
//   console.log("🔍 quantity:", quantity)

//   if (!quantity || quantity <= 0) {
//     throw new Error("Quantity must be greater than 0");
//   }

//   // Validate Category Configuration
//   const categoryConfig = await CategoryConfig.findOne({ category });

//   if (!categoryConfig) {
//     throw new Error("Category configuration not found");
//   }

//   // Validate Required Fields
//   categoryConfig.fields.forEach((field) => {
//     if (field.isRequired && !configurations[field.fieldKey]) {
//       throw new Error(`${field.fieldName} is required`);
//     }
//   });

//   const createdProducts = [];

//   // 🔥 IMPORTANT: Use create() not insertMany()
//   for (let i = 0; i < quantity; i++) {
//     const product = await Product.create({
//       category,
//       productName,
//       configurations
//     });

//     createdProducts.push(product);
//   }

//   return createdProducts;
// };

// import Product from "../../models/productsRegisterModel/productRegister.model.js";
// import CategoryConfig from "../../models/productsRegisterModel/catogoryConfig.js";
// import mongoose from "mongoose";
// export const registerProductsBatch = async (data) => {
//   try {
//     const { category,productName, configurations, quantity } = data;

//     console.log("✅ STEP 1 - data received:", JSON.stringify(data));

//     if (!quantity || quantity <= 0) throw new Error("Quantity must be greater than 0");

//     console.log("✅ STEP 2 - quantity ok");

//     const categoryConfig = await CategoryConfig.findOne({  category: new mongoose.Types.ObjectId(category) });
//     console.log("✅ STEP 3 - categoryConfig:", categoryConfig ? "found" : "NOT FOUND");

//     if (!categoryConfig) throw new Error("Category configuration not found");

//     console.log("✅ STEP 4 - validating fields");
//     categoryConfig.fields.forEach((field) => {
//       if (field.isRequired && !configurations[field.fieldKey]) {
//         throw new Error(`${field.fieldName} is required`);
//       }
//     });

//     console.log("✅ STEP 5 - starting product creation loop");
//     const createdProducts = [];

//     for (let i = 0; i < quantity; i++) {
//       console.log(`✅ STEP 6 - creating product ${i + 1}`);
      
//       // ✅ Convert plain object to Map
//       const configMap = new Map(Object.entries(configurations || {}));
      
//       const product = await Product.create({
//         category,
//         productName,
//         // companyName,
//         configurations: configMap
//       });

//       console.log(`✅ STEP 7 - product ${i + 1} created:`, product._id);
//       createdProducts.push(product);
//     }

//     return createdProducts;

//   } catch (err) {
//     // ✅ Log full stack here in service too
//     console.error("💥 SERVICE ERROR:", err.stack);
//     throw err;
//   }
// };


import Product from "../../models/productsRegisterModel/productRegister.model.js";
import CategoryConfig from "../../models/productsRegisterModel/catogoryConfig.js";
import mongoose from "mongoose";

export const registerProductsBatch = async (data) => {
  try {
    // productName and companyName intentionally NOT destructured
    const { category, configurations = {}, quantity } = data;

    if (!category) throw new Error("Category is required");
    if (!quantity || quantity <= 0) throw new Error("Quantity must be greater than 0");

    const categoryConfig = await CategoryConfig.findOne({
      category: new mongoose.Types.ObjectId(category),
    });

    if (!categoryConfig) throw new Error("Category configuration not found");

    // Validate required fields from config
    categoryConfig.fields.forEach((field) => {
      if (field.isRequired && !configurations[field.fieldKey]) {
        throw new Error(`${field.fieldName} is required`);
      }
    });

    const createdProducts = [];

    for (let i = 0; i < quantity; i++) {
      const configMap = new Map(Object.entries(configurations));

      const product = new Product({
        category,
        configurations: configMap,
        // NO productName, NO companyName
      });

      await product.save(); // triggers pre-save ticketNumber generation

      createdProducts.push(product);
    }

    return createdProducts;

  } catch (err) {
    console.error("💥 SERVICE ERROR:", err.stack);
    throw err;
  }
};