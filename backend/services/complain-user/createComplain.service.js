import complainData from "../../models/complainsData.model.js";
import {sendComplaintMail} from "../../utils/sendMail.js"

// services/complain-user/createComplain.service.js

export const createComplaintService = async (data) => {
  const complaintId = "CMP" + Date.now();

  const newComplaint = await complainData.create({
    ...data,
    complaintId,
  });

  try {
    await sendComplaintMail(data.customerEmail, newComplaint);
    console.log("Email sent to:", data.customerEmail);
  } catch (mailError) {
    // Complaint is saved — only email failed
    console.error("Email failed (complaint still saved):", mailError.message);
  }

  return newComplaint;
};