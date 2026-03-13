// import mongoose from "mongoose";
// import Customer from "../../models/customerRegisterModel/customerDetails.model.js";

// // ─────────────────────────────────────────────────────────────────────────────
// //  FILE: services/customerRegistrationService.js
// //
// //  PURPOSE:
// //  Handles ONLY the customer registration logic — both single and bulk.
// //  Resolves each ticketNumber → fetches real Product from DB →
// //  saves configSnapshot → creates Customer document.
// //
// //  USED BY: controllers/customerRegistrationController.js
// // ─────────────────────────────────────────────────────────────────────────────

// const Product = mongoose.model("Product");

// // ── Internal helper: fetch one product by ticketNumber ────────────────────────
// const findProductByTicket = async (ticketNumber) => {
//   const product = await Product
//     .findOne({ ticketNumber: ticketNumber.trim() })
//     .populate("category", "name")
//     .lean();

//   if (!product) {
//     throw new Error(`No product found with ticket number: ${ticketNumber}`);
//   }

//   return product;
// };

// // ── Validate purchase type vs product count ───────────────────────────────────
// const validatePurchaseType = (purchaseType, products) => {
//   if (!products || products.length === 0) {
//     throw new Error("At least one product is required");
//   }
//   if (purchaseType === "single" && products.length !== 1) {
//     throw new Error("Single purchase must have exactly 1 product");
//   }
//   if (purchaseType === "bulk" && products.length < 2) {
//     throw new Error("Bulk purchase must have at least 2 products");
//   }
// };

// // ── Check for duplicate ticket numbers in same registration ───────────────────
// const checkDuplicateTickets = (products) => {
//   const tickets = products.map(p => p.ticketNumber?.trim()).filter(Boolean);
//   const unique  = new Set(tickets);
//   if (unique.size !== tickets.length) {
//     throw new Error("Duplicate ticket numbers found — each unit must have a unique ticket");
//   }
// };

// // ── Resolve ticketNumber → full product entry for saving ─────────────────────
// const resolveProduct = async ({ ticketNumber, warrStartDate, warrEndDate }) => {
//   if (!ticketNumber?.trim()) {
//     throw new Error("Each product entry must have a ticketNumber");
//   }
//   if (!warrStartDate) {
//     throw new Error(`warrStartDate missing for ticket: ${ticketNumber}`);
//   }
//   if (!warrEndDate) {
//     throw new Error(`warrEndDate missing for ticket: ${ticketNumber}`);
//   }

//   const dbProduct = await findProductByTicket(ticketNumber);

//   // configSnapshot — saved permanently so record stays accurate even if
//   // the original Product document is edited later
//   const configSnapshot = new Map(
//     dbProduct.configurations instanceof Map
//       ? dbProduct.configurations
//       : Object.entries(dbProduct.configurations || {})
//   );

//   return {
//     ticketNumber:  dbProduct.ticketNumber,
//     productRef:    dbProduct._id,
//     categoryRef:   dbProduct.category?._id || dbProduct.category,
//     configSnapshot,
//     warrStartDate: new Date(warrStartDate),
//     warrEndDate:   new Date(warrEndDate),
//   };
// };

// // ── Main exported service ─────────────────────────────────────────────────────
// export const registerCustomerService = async (payload) => {
//   const { customerName, email, mobileNum, purchaseType, products } = payload;

//   // Run validations
//   validatePurchaseType(purchaseType, products);
//   checkDuplicateTickets(products);

//   // Resolve all ticketNumbers in parallel (fast for bulk with many products)
//   const resolvedProducts = await Promise.all(products.map(resolveProduct));

//   // Create and save customer registration
//   const registration = new Customer({
//     customerName: customerName.trim(),
//     email:        email.trim().toLowerCase(),
//     mobileNum:    String(mobileNum).trim(),
//     purchaseType,
//     products:     resolvedProducts,
//     status:       "active",
//   });

//   const saved = await registration.save();

//   // Return with populated refs for immediate display on frontend
//   return await Customer
//     .findById(saved._id)
//     .populate("products.productRef",  "ticketNumber configurations")
//     .populate("products.categoryRef", "name")
//     .lean();
// };

import Product from "../../models/productsRegisterModel/productRegister.model.js";

// ─────────────────────────────────────────────────────────────────────────────
//  FILE: services/catogoryServices/registerProductBatch.service.js
//
//  PURPOSE:
//  Creates one Product document per unit in MongoDB.
//  Each unit has its own unique configurations (serialnumber, modelnumber etc.)
//
//  CALLED BY: registerProductBatchController
//
//  WHAT CHANGED FROM OLD VERSION:
//  OLD → received { category, configurations, quantity }
//        created `quantity` copies all with the SAME configurations → BUG
//
//  NEW → receives { category, units }
//        units = [
//          { configurations: { serialnumber: "A1", modelnumber: "M1", ram: "8GB" } },
//          { configurations: { serialnumber: "A2", modelnumber: "M2", ram: "8GB" } },
//        ]
//        creates one Product per unit with UNIQUE configurations → FIXED
// ─────────────────────────────────────────────────────────────────────────────

// services/catogoryServices/registerProductBatch.service.js

// import Product from "../../models/productsRegisterModel/productRegister.model.js";

// export const registerCustomerService = async ({ category, units }) => {
//   if (!category) throw new Error("Category is required");
//   if (!units || !Array.isArray(units) || units.length === 0) {
//     throw new Error("Units array is required and must not be empty");
//   }

//   const savedProducts = [];

//   for (const unit of units) {
//     const product = new Product({
//       category,
//       configurations: unit.configurations || {},
//       isActive: true,
//     });

//     const saved = await product.save();
//     savedProducts.push(saved);
//   }

//   return savedProducts;
// };

export const registerCustomerService = async ({ category, units }) => {
  if (!category) throw new Error("Category is required");
  if (!units || !Array.isArray(units) || units.length === 0) {
    throw new Error("Units array is required and must not be empty");
  }

  const savedProducts = [];

  for (const unit of units) {
    // ── LOG EXACTLY WHAT EACH UNIT LOOKS LIKE BEFORE SAVING ──
    console.log("UNIT RECEIVED:", JSON.stringify(unit, null, 2));
    console.log("CONFIGURATIONS:", JSON.stringify(unit.configurations, null, 2));

    const product = new Product({
      category,
      configurations: unit.configurations || {},
      isActive: true,
    });

    // ── LOG THE PRODUCT OBJECT BEFORE SAVE ──
    console.log("PRODUCT TO SAVE:", JSON.stringify(product.toObject(), null, 2));

    const saved = await product.save();
    savedProducts.push(saved);
  }

  return savedProducts;
};