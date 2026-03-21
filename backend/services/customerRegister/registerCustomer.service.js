import mongoose from "mongoose";
import Customer from "../../models/customerRegisterModel/customerDetails.model.js";

// ─────────────────────────────────────────────────────────────────────────────
//  FILE: services/customerRegistration.service.js
//
//  PURPOSE:
//  Handles ONLY the customer registration logic — both single and bulk.
//  Each product entry uses ticketNumber + warrStartDate + warrEndDate
//  sent directly from the frontend (no DB product lookup needed).
//
//  USED BY: controllers/customerDetails.controller.js
// ─────────────────────────────────────────────────────────────────────────────

// ── Validate purchase type vs product count ───────────────────────────────────
const validatePurchaseType = (purchaseType, products) => {
  if (!products || products.length === 0) {
    throw new Error("At least one product is required");
  }
  if (purchaseType === "single" && products.length !== 1) {
    throw new Error("Single purchase must have exactly 1 product");
  }
  if (purchaseType === "bulk" && products.length < 2) {
    throw new Error("Bulk purchase must have at least 2 products");
  }
};

// ── Check for duplicate ticket numbers in same registration ───────────────────
const checkDuplicateTickets = (products) => {
  const tickets = products.map((p) => p.ticketNumber?.trim()).filter(Boolean);
  const unique = new Set(tickets);
  if (unique.size !== tickets.length) {
    throw new Error(
      "Duplicate ticket numbers found — each unit must have a unique ticket"
    );
  }
};

// ── Resolve each product entry for saving ────────────────────────────────────
// No DB lookup needed — frontend sends ticketNumber + dates directly.
// configSnapshot is built from whatever extra fields the frontend passes.
const resolveProduct = ({ ticketNumber, warrStartDate, warrEndDate, configSnapshot }) => {
  if (!ticketNumber?.trim()) {
    throw new Error("Each product entry must have a ticketNumber");
  }
  if (!warrStartDate) {
    throw new Error(`warrStartDate missing for ticket: ${ticketNumber}`);
  }
  if (!warrEndDate) {
    throw new Error(`warrEndDate missing for ticket: ${ticketNumber}`);
  }

  return {
    ticketNumber:   ticketNumber.trim(),
    productRef:     null,
    categoryRef:    null,
    configSnapshot: configSnapshot || {},
    warrStartDate:  new Date(warrStartDate),
    warrEndDate:    new Date(warrEndDate),
  };
};

// ── Main exported service ─────────────────────────────────────────────────────
export const registerCustomerService = async (payload) => {
  const { customerName, email, mobileNum, purchaseType, products } = payload;

  // Validations
  validatePurchaseType(purchaseType, products);
  checkDuplicateTickets(products);

  // Resolve all products
  const resolvedProducts = products.map(resolveProduct);

  // Create and save customer registration
  const registration = new Customer({
    customerName: customerName.trim(),
    email:        email.trim().toLowerCase(),
    mobileNum:    String(mobileNum).trim(),
    purchaseType,
    products:     resolvedProducts,
    status:       "active",
  });

  const saved = await registration.save();

  // Return the saved document
  return await Customer.findById(saved._id).lean();
};