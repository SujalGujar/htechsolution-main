// import complainData from "../../models/complainsData.model.js";
// const customerComplains = async(req,res) =>{
//     try{
//         const{customerName,
//   mobileNumber,
//   productName,
//   serialNumber,
//   complaintTitle,
//   complaintDescription,
//   ticketNumber,
// //   status: "Pending",
// } = req.body
  
//    if(!customerName||
//   !mobileNumber||
//   !productName||
//   !serialNumber||
//   !complaintTitle||
//   !complaintDescription||
//   !ticketNumber){
//     return res.status(400).json({message:"ALL fields requires"})
//   }

//   const newComplain = new complainData({
//     customerName,
//   mobileNumber,
//   productName,
//     serialNumber,
//     complaintTitle,
//     complaintDescription,
//     ticketNumber,
//   })

//     await newComplain.save();

//     return res.status(201).json({
//         message:"Complain registered successfully",
//         complain:newComplain
//     })






//     }catch(error){
//          console.error("Complain registration error:", error);
//      return res.status(500).json({ message: error.message });
//     }
// }

// export default customerComplains

// import complainData from "../../models/complainsData.model.js";

// const customerComplains = async (req, res) => {
//     try {
//         // ✅ Debug: Log what we're receiving
//         console.log("📥 Received request body:", req.body);
//         console.log("📥 Content-Type:", req.headers['content-type']);
        
//         // ✅ Check if req.body exists
//         if (!req.body || Object.keys(req.body).length === 0) {
//             return res.status(400).json({ 
//                 message: "Request body is empty. Make sure you're sending data with Content-Type: application/json" 
//             });
//         }

//         const {
//             customerName,
//             mobileNumber,
//             productName,
//             serialNumber,
//             complaintTitle,
//             complaintDescription,
//             ticketNumber,
//         } = req.body;

//         // ✅ Debug: Log extracted values
//         console.log("📝 Extracted values:", {
//             customerName,
//             mobileNumber,
//             productName,
//             serialNumber,
//             complaintTitle,
//             complaintDescription,
//             ticketNumber
//         });

//         // ✅ Validate all fields
//         if (!customerName || !mobileNumber || !productName || !serialNumber || 
//             !complaintTitle || !complaintDescription || !ticketNumber) {
            
//             // Find which fields are missing
//             const missingFields = [];
//             if (!customerName) missingFields.push('customerName');
//             if (!mobileNumber) missingFields.push('mobileNumber');
//             if (!productName) missingFields.push('productName');
//             if (!serialNumber) missingFields.push('serialNumber');
//             if (!complaintTitle) missingFields.push('complaintTitle');
//             if (!complaintDescription) missingFields.push('complaintDescription');
//             if (!ticketNumber) missingFields.push('ticketNumber');
            
//             return res.status(400).json({ 
//                 message: "All fields are required",
//                 missingFields: missingFields
//             });
//         }

//         // ✅ Create new complaint with status field
//         const newComplain = new complainData({
//             customerName,
//             mobileNumber,
//             productName,
//             serialNumber,
//             complaintTitle,
//             complaintDescription,
//             ticketNumber,
//             status: "pending" // ✅ Add default status
//         });

//         await newComplain.save();

//         return res.status(201).json({
//             message: "Complaint registered successfully",
//             complain: newComplain
//         });

//     } catch (error) {
//         console.error("❌ Complaint registration error:", error);
        
//         // Handle duplicate key error
//         if (error.code === 11000) {
//             const field = Object.keys(error.keyPattern)[0];
//             return res.status(400).json({ 
//                 message: `${field} already exists. Please use a different value.` 
//             });
//         }
        
//         return res.status(500).json({ 
//             message: error.message || "Internal server error" 
//         });
//     }
// };

// export default customerComplains;