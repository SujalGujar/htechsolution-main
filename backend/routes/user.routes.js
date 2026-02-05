// import express from "express"

// const router = express.Router()

// //Only admin can access this routes
// router.get("/admin",(req,res) =>{
//     res.json({message:"Welcome Admin"})
// })
// //only Admin and Manager can access this routes
// router.get("/manager",(req,res) =>{
//     res.json({message:"Welcome Manager"})
// })
// //only user can this routes
// router.get("/user",(req,res) =>{
//     res.json({message:"Welcome User"})
// })

// export default router


import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/admin",verifyToken,authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/manager",authorizeRoles("admin","manager"), (req, res) => {
  res.json({ message: "Welcome Manager" });
});
//all can access this routes
router.get("/user",authorizeRoles("admin","manager","user"), (req, res) => {
  res.json({ message: "Welcome User" });
});

export default router;
