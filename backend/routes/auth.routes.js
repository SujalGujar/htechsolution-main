import express from "express";
// Fixed: Added .js extension
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;

// ## How to Test in Thunder Client/Postman:

// ### For **Register**:

// POST http://localhost:5000/api/auth/register
// Content-Type: application/json

// {
  // "username": "admin1",
  // "password": "password123",
  // "role": "admin"
// }


// ### For **Login**:
// ```
// POST http://localhost:5000/api/auth/login
// Content-Type: application/json

// {
//   "username": "admin1",
//   "password": "password123"
// }