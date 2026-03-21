import mongoose from "mongoose";

// ─────────────────────────────────────────────────────────────────────────────
//  YOUR PRODUCT SCHEMA (reference — do not change this file):
//
//  Product {
//    ticketNumber:   String (auto-generated: "PRD-20250101-12345"), unique
//    category:       ObjectId → ref "Category"
//    configurations: Map<String, Mixed>   ← ALL product fields live here
//    createdAt, updatedAt
//  }
//
//  IMPORTANT: Product has NO productName, NO serialNumber.
//  Everything about the product is inside configurations (dynamic key-value).
//  Example configurations: { "Brand": "Dell", "RAM": "16GB", "Model": "XPS-9520" }
// ─────────────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
//  SUB-SCHEMA: One registered product per customer
//
//  Single purchase  → products array has 1 item
//  Bulk purchase    → products array has 2+ items
//
//  Each item stores:
//  1. ticketNumber  — copied from ProductHistory component by customer care
//  2. productRef    — ObjectId pointing to your Product document
//  3. categoryRef   — ObjectId pointing to Category (from Product.category)
//  4. configSnapshot — copy of configurations Map saved at registration time
//     (snapshot ensures record stays accurate even if product is edited later)
//  5. warrStartDate / warrEndDate — warranty per unit
// ─────────────────────────────────────────────────────────────────────────────
// registeredProductSchema.js  (or inside Customer.js directly)

// import mongoose from "mongoose";

const registeredProductSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: [true, "Ticket number is required for each product"],
      trim: true,
    },
    productRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: null,
    },
    categoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    configSnapshot: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
    warrStartDate: {
      type: Date,
      required: [true, "Warranty start date is required"],
    },
    warrEndDate: {
      type: Date,
      required: [true, "Warranty end date is required"],
    },
  },
  { _id: true }
);

// ✅ Named export — so Customer.js can import just this schema
export { registeredProductSchema };