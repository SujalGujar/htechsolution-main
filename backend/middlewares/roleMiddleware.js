// const authorizeRoles=(...allowedRoles)=>{
  
//   return (req,res,next) =>{
//     if (!req.user) {
//         console.log("📦 req.body in verifyToken:", req.body); // 👈 check body here

//       return res.status(401).json({ 
//         message: "Authentication required. Please login first." 
//       });
//     }
//     if(!allowedRoles.includes(req.user.role)){
//       console.log("❌ Role mismatch | Token role:", `"${req.user.role}"`, "| Allowed:", allowedRoles);
//         return res.status(403).json({message:"access denied"})
//     }
//     next();
//   }
  
// }


const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // 👇 ADD THIS - will show exactly what's in the token
    console.log("🔍 req.user full object:", JSON.stringify(req.user));
    console.log("🔍 req.user.role value:", `"${req.user?.role}"`);
    console.log("🔍 allowedRoles:", allowedRoles);

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "access denied" });
    }
    next();
  };
};
export default authorizeRoles;
  