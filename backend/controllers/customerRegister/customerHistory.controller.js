// import Product from "../../models/productDetails.model.js"; // ✅ fix your import path

// const customerSearchProducts = async (req, res) => {
//     console.log("REQ BODY:", req.body); // 👈 add this line
//   try {
//     // ✅ Step 1 — get ticket number from the request
// const { ticketNumber } = req.body;    // ← FIX
//     // or if you're sending it in body: const { ticketNumber } = req.body;

//     // ✅ Step 2 — validate it exists
//     if (!ticketNumber) {
//       return res.status(400).json({ message: "Please provide a ticket number" });
//     }

//     // ✅ Step 3 — search in database
//     const findProduct = await Product.findOne({ TicketNumber: ticketNumber });

//     // ✅ Step 4 — if not found
//     if (!findProduct) {
//       return res.status(404).json({ message: "Wrong Ticket Number, product not found" });
//     }

//     // ✅ Step 5 — if found, return it
//     return res.status(200).json({
//       message: "Product found",
//       product: findProduct,   
//     });

//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// import Product from "../../models/productDetails.model.js";

// const customerSearchProducts = async (req, res) => {
//   console.log("REQ BODY:", req.body);

//   try {
//     // ✅ POST method = data comes from req.body NOT req.params
//     const { ticketNumber } = req.body;

//     if (!ticketNumber) {
//       return res.status(400).json({ message: "Please provide a ticket number" });
//     }

//     // ✅ TicketNumber matches your schema exactly
//     const findProduct = await Product.findOne({ TicketNumber: ticketNumber });

//     if (!findProduct) {
//       return res.status(404).json({ message: "Wrong Ticket Number, product not found" });
//     }

//     return res.status(200).json({
//       message: "Product found",
//       product: findProduct,
//     });

//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export default customerSearchProducts;
// // export default customerSearchProducts;

// controllers/customerRegister/customerSearchProduct.controller.js

// import Product from "../../models/productDetails.model.js";
// import Customer from "../../models/customerDetails.model.js";
// const customerSearchProducts = async (req, res) => {
//   console.log("REQ BODY:", req.body);

//   try {

//     // ✅ CHANGE 1 — was req.params, now req.body
//     // WHY: Your route is POST → data comes in body, not URL
//     // router.post("/search") → frontend sends { ticketNumber } in body
//     // req.params is for GET /search/:ticketNumber (in the URL)
//     // req.body   is for POST /search (hidden inside request)
//     const { ticketNumber } = req.body; // ← THIS WAS req.params BEFORE (THE BUG)

//     if (!ticketNumber) {
//       return res.status(400).json({ message: "Please provide a ticket number" });
//     }

//     // ✅ CHANGE 2 — TicketNumber (capital T capital N)
//     // WHY: Your schema defines it as "TicketNumber" not "ticketNumber"
//     // MongoDB is case sensitive — wrong case = never finds anything
//     const findProduct = await Customer.findOne({ ticketNumber: ticketNumber });

//     if (!findProduct) {
      
//       return res.status(404).json({ message: "Wrong Ticket Number, product not found" });
//     }

//     // ✅ Return found product
//     return res.status(200).json({
//       message: "Product found",
//       product: findProduct,
//     });

//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export default customerSearchProducts;

// Fallback default export so routes that import the module succeed
// const customerSearchProducts = async (req, res) => {
// 	res.status(501).json({ success: false, message: "Customer search not implemented" });
// };

// export default customerSearchProducts;

import {
  getAllRegistrationsService,
  getRegistrationByIdService,
} from "../../services/customerRegister/customerHistory.service.js";

// ─────────────────────────────────────────────────────────────────────────────
//  FILE: controllers/customerHistoryController.js
//
//  PURPOSE:
//  Handles ONLY the read/query endpoints for existing registrations.
//  Get all registrations (with filters) and get one by ID.
//
//  ROUTES:
//    GET /api/customer/registrations
//    GET /api/customer/registrations/:id
//  SERVICE: customerHistoryService.js
// ─────────────────────────────────────────────────────────────────────────────

// ── GET all registrations ─────────────────────────────────────────────────────
//  Optional query params:
//  ?purchaseType=bulk
//  ?email=rahul@example.com
//  ?ticketNumber=PRD-20250101-12345
//  ?status=active
export const getAllRegistrations = async (req, res) => {
  try {
    const { purchaseType, email, ticketNumber, status } = req.query;

    const registrations = await getAllRegistrationsService({
      purchaseType,
      email,
      ticketNumber,
      status,
    });

    return res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ── GET one registration by ID ────────────────────────────────────────────────
export const getRegistrationById = async (req, res) => {
  try {
    const registration = await getRegistrationByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: registration,
    });

  } catch (err) {
    const is404 = err.message.toLowerCase().includes("not found");
    return res.status(is404 ? 404 : 500).json({
      success: false,
      message: err.message,
    });
  }
};