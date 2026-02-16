// import jwt from "jsonwebtoken"
// // import express from "express"
// const verifyToken = (req,res,next) =>{
//     let token;
//     // console.log(req)
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     // if(authHeader && authHeader.startsWith("Bearer")){
//     if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {

//         token = authHeader.split(" ")[1];
     

//     if(!token){
//         return res.status(400).json({message:"No token,authorization denied"})
//     }

//     try{ 
//         const decode = jwt.verify(token,process.env.JWT_SECRET)
//         req.user = decode;
//         console.log("the decoded user is:",req.user)
//         next();

//     }catch(error){
//         console.log("JWT Error:", error.message);
//     res.status(400).json({message:"Token is Not valid"})
//         res.status(400).json({message:"Token is Not valid"})
//     }
// }else{
//      return res.status(400).json({message:"No token,authorization denied"})
// }
// }

// export default verifyToken;

// // import jwt from "jsonwebtoken";

// // const verifyToken = (req, res, next) => {
// //     let token;
// //     let authHeader = req.headers.Authorization || req.headers.authorization;
    
// //     if (authHeader && authHeader.startsWith("Bearer")) {
// //         token = authHeader.split(" ")[1];
        
// //         if (!token) {
// //             return res.status(401).json({ message: "No token, authorization denied" });
// //         }
        
// //         try {
// //             const decode = jwt.verify(token, process.env.JWT_SECRET);
// //             req.user = decode;
// //             console.log("The decoded user is:", req.user);
// //             next();
// //         } catch (error) {
// //             return res.status(401).json({ message: "Token is not valid" });
// //         }
// //     } else {
// //         return res.status(401).json({ message: "No token, authorization denied" });
// //     }
// // };

// // export default verifyToken;


// import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
//         return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         console.log("Decoded user:", decoded);
//         next();
//     } catch (error) {
//         console.log("JWT Error:", error.message);
//         return res.status(401).json({ message: "Token is not valid" });
//     }
// };

// export default verifyToken;

// ============================================================
// FILE: src/middleware/verifyToken.js
// ============================================================
// WHAT CHANGED:
//   - Moved out of the same file as login controller
//     (having middleware + controller in one file causes
//      import confusion and makes routes hard to wire up)
//   - This is now a clean standalone middleware file
//   - Logic is identical to your latest working version
// ============================================================

import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // ✅ Read Authorization header (works lowercase and capitalized)
  const authHeader = req.headers.authorization;

  // ✅ Check: header must exist AND start with "bearer "
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // ✅ Extract token after "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify token with your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { adminId, role, iat, exp }
    console.log("✅ Decoded user:", decoded);
    next(); // ✅ Token valid — continue to route handler
  } catch (error) {
    console.log("❌ JWT Error:", error.message);
    // ✅ Always return after sending response
    return res.status(401).json({ message: "Token is not valid" });
  }
  
};

export default verifyToken;