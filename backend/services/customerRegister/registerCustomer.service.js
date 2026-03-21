import Customer from "../../models/customerRegisterModel/customerDetails.model.js";
import {
  generateCustomerProductId,
  isCustomerProductIdExists,
} from "../../utils/customerId.js";

// Validate purchase type
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

// Check duplicate tickets
const checkDuplicateTickets = (products) => {
  const tickets = products.map((p) => p.ticketNumber);
  const unique = new Set(tickets);
  if (unique.size !== tickets.length) {
    throw new Error("Duplicate ticket numbers found");
  }
};

// 🔥 Resolve Product
const resolveProduct = async (product) => {
  let customerProductId;

  // 🔁 Ensure unique ID
  do {
    customerProductId = generateCustomerProductId();
  } while (await isCustomerProductIdExists(customerProductId));

  return {
    ticketNumber: product.ticketNumber,
    customerProductId,
    configSnapshot: product.configSnapshot || {},
    warrStartDate: new Date(product.warrStartDate),
    warrEndDate: new Date(product.warrEndDate),
  };
};

// 🔥 MAIN SERVICE
export const registerCustomerService = async (payload) => {
  const { customerName, email, mobileNum, purchaseType, products } = payload;

  validatePurchaseType(purchaseType, products);
  checkDuplicateTickets(products);

  const resolvedProducts = [];

  for (const product of products) {
    const resolved = await resolveProduct(product);
    resolvedProducts.push(resolved);
  }

  const customer = new Customer({
    customerName,
    email,
    mobileNum,
    purchaseType,
    products: resolvedProducts,
  });

  const saved = await customer.save();

  return saved;
};