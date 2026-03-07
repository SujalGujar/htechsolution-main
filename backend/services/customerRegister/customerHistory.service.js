import Customer from "../../models/customerRegisterModel/customerDetails.model.js";

// ─────────────────────────────────────────────────────────────────────────────
//  FILE: services/customerHistoryService.js
//
//  PURPOSE:
//  Handles ONLY reading/querying existing customer registrations.
//  Fetching all registrations, filtering by various fields,
//  and fetching a single registration by ID.
//
//  USED BY: controllers/customerHistoryController.js
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared populate helper (keeps both services consistent) ───────────────────
const withPopulate = (query) =>
  query
    .populate("products.productRef",  "ticketNumber configurations createdAt")
    .populate("products.categoryRef", "name")
    .lean();

// ── Build a MongoDB filter object from query params ───────────────────────────
const buildFilter = ({ purchaseType, email, ticketNumber, status }) => {
  const filter = {};

  if (purchaseType) {
    filter.purchaseType = purchaseType;
  }
  if (email) {
    filter.email = email.trim().toLowerCase();
  }
  if (status) {
    filter.status = status;
  }
  if (ticketNumber) {
    // Search inside the products array for a matching ticket
    filter["products.ticketNumber"] = ticketNumber.trim();
  }

  return filter;
};

// ── SERVICE: Get all registrations (with optional filters) ────────────────────
export const getAllRegistrationsService = async (filters = {}) => {
  const filter = buildFilter(filters);

  return await withPopulate(
    Customer.find(filter).sort({ createdAt: -1 })
  );
};

// ── SERVICE: Get one registration by MongoDB _id ──────────────────────────────
export const getRegistrationByIdService = async (id) => {
  const reg = await withPopulate(Customer.findById(id));

  if (!reg) {
    throw new Error("Registration not found");
  }

  return reg;
};