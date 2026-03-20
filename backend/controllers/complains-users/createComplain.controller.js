import {
    createComplaintService,
    
}from "../../services/complain-user/createComplain.service.js"


export const createComplaint = async (req, res) => {
  try {
    const complaint = await createComplaintService(req.body);

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      data: complaint,
    });
  } catch (error) {
    console.error("createComplaint error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


