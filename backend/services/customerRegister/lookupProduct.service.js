import mongoose from "mongoose";

// ─────────────────────────────────────────────────────────────────────────────
//  FILE: services/productLookupService.js
//
//  PURPOSE:
//  Handles ONLY the product lookup by ticket number.
//  Called when customer care copies a ticket from ProductHistory component
//  and pastes it into the registration form — auto-fetches all product config.
//
//  USED BY: controllers/productLookupController.js
// ─────────────────────────────────────────────────────────────────────────────
import Product from "../../models/productsRegisterModel/productRegister.model.js"
const Product = mongoose.model("Product");

// ── Find product by ticketNumber in DB ────────────────────────────────────────
const findProductByTicket = async (ticketNumber) => {
  const product = await Product
    .findOne({ ticketNumber: ticketNumber.trim() })
    .populate("category", "name")   // populate category name for display
    .lean();

  if (!product) {
    throw new Error(`No product found with ticket number: ${ticketNumber}`);
  }

  return product;
};

// ── Main exported service ─────────────────────────────────────────────────────
export const lookupProductService = async (ticketNumber) => {
  if (!ticketNumber || !ticketNumber.trim()) {
    throw new Error("Ticket number is required");
  }

  const product = await findProductByTicket(ticketNumber);

  // Convert configurations Map → plain object for JSON response
  // Your Product schema: configurations: Map<String, Mixed>
  // Example output: { "Brand": "Dell", "RAM": "16GB", "Storage": "512GB" }
  const configurationsObj =
    product.configurations instanceof Map
      ? Object.fromEntries(product.configurations)
      : product.configurations || {};

  return {
    ticketNumber:   product.ticketNumber,          // "PRD-20250101-12345"
    productId:      product._id,                   // ObjectId
    categoryId:     product.category?._id || product.category,
    categoryName:   product.category?.name || "—",
    configurations: configurationsObj,             // all product fields
    createdAt:      product.createdAt,
  };
};