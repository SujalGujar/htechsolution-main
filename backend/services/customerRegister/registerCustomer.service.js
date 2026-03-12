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

export const registerCustomerService = async ({ category, units }) => {

  // ── Validate inputs ───────────────────────────────────────────────────────
  if (!category) {
    throw new Error("Category is required");
  }
  if (!units || !Array.isArray(units) || units.length === 0) {
    throw new Error("Units array is required and must not be empty");
  }

  // ── Build one document per unit ───────────────────────────────────────────
  //
  // HOW THIS WORKS:
  // units.map() loops over each unit object
  // For each unit, we create a product document shape:
  //   {
  //     category: "64abc...",       ← same for all (ObjectId reference)
  //     configurations: {           ← UNIQUE per unit
  //       serialnumber: "SN-001",
  //       modelnumber:  "MN-001",
  //       ram:          "8GB",      ← shared field merged in on frontend
  //     },
  //     isActive: true,
  //   }
  //
  // We do NOT set ticketNumber here.
  // The Product model's pre-save hook generates it automatically:
  //   productSchema.pre("save", ...) → creates "PRD-YYYYMMDD-XXXXX"
  // BUT insertMany does NOT trigger pre-save hooks by default!
  // So we use { new: true } option or call save() individually.
  //
  // SOLUTION: use insertMany with { rawResult: false } which returns
  // the saved docs. Ticket numbers are generated via the pre-save hook
  // only when using .save() — so for insertMany we handle it differently.
  //
  // TWO OPTIONS:
  // Option A (simple): insertMany — fast, one DB call, but pre-save hook won't run
  //                    ticketNumber must be generated manually here
  // Option B (safe):   loop + save — slower, but pre-save hook runs for each
  //
  // We use Option B to ensure the ticketNumber pre-save hook runs correctly
  // and each product gets a proper unique PRD-YYYYMMDD-XXXXX ticket number.
  //

  const savedProducts = [];

  for (const unit of units) {
    // Create a new Product instance (does NOT save to DB yet)
    const product = new Product({
      category,
      configurations: unit.configurations || {},
      isActive: true,
      // ticketNumber is NOT set here — the pre("save") hook will generate it
    });

    // .save() triggers the pre("save") hook → generates ticketNumber
    // Then saves to MongoDB
    const saved = await product.save();
    savedProducts.push(saved);
  }

  // Return all created products
  return savedProducts;

  //
  // WHY NOT insertMany?
  //
  // Product.insertMany(productsToCreate)
  //   ↑ This is faster (one DB call) but does NOT trigger pre-save hooks.
  //   So ticketNumber would be undefined for all products.
  //
  // If you want to use insertMany, you must generate ticketNumbers manually:
  //
  //   const productsToCreate = units.map(unit => {
  //     const date = new Date();
  //     const y = date.getFullYear();
  //     const m = String(date.getMonth() + 1).padStart(2, "0");
  //     const d = String(date.getDate()).padStart(2, "0");
  //     const rand = Math.floor(10000 + Math.random() * 90000);
  //     return {
  //       category,
  //       configurations: unit.configurations || {},
  //       isActive: true,
  //       ticketNumber: `PRD-${y}${m}${d}-${rand}`,
  //     };
  //   });
  //   return await Product.insertMany(productsToCreate);
  //
};