// routes/complain.routes.js
import express from "express";
import {
  createComplaint,

//   updateComplaintByTicket,
} from "../controllers/complains-users/createComplain.controller.js";
import {getComplaintByTicket} from "../controllers/complains-users/getComplaintByTicketController.cotroller.js"

const router = express.Router();

// WHY these three routes:
// POST   /raise-complaint          → customer submits a complaint
// GET    /by-ticket/:ticketNumber  → customer care looks up a complaint
// PATCH  /by-ticket/:ticketNumber  → customer care updates issue details/status

router.post("/raise-complaint", createComplaint);
router.get("/by-ticket/:ticketNumber", getComplaintByTicket);

// WHY PATCH not PUT:
// PUT replaces the whole document. PATCH updates only the fields you send.
// We don't want to accidentally wipe fields customer care didn't touch.
// router.patch("/by-ticket/:ticketNumber", updateComplaintByTicket);

export default router;