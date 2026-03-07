import { lookupProductService } from "../../services/productLookupService.js";

// ─────────────────────────────────────────────────────────────────────────────
//  FILE: controllers/productLookupController.js
//
//  PURPOSE:
//  Handles ONLY the product auto-fetch endpoint.
//  Called when customer care copies a ticket from ProductHistory component
//  and types/pastes it into the form — returns config to auto-fill the form.
//
//  ROUTE:  GET /api/customer/product/lookup?identifier=PRD-20250101-12345
//  SERVICE: productLookupService.js
// ─────────────────────────────────────────────────────────────────────────────

export const lookupProduct = async (req, res) => {
  try {
    const { identifier } = req.query;

    if (!identifier || !identifier.trim()) {
      return res.status(400).json({
        success: false,
        message: "Ticket number (identifier) is required",
      });
    }

    const product = await lookupProductService(identifier.trim());

    return res.status(200).json({
      success: true,
      message: "Product found",
      product,
    });

  } catch (err) {
    const is404 = err.message.toLowerCase().includes("no product found");
    return res.status(is404 ? 404 : 500).json({
      success: false,
      message: err.message,
    });
  }
};