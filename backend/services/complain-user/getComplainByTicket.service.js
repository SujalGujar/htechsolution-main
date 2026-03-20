import complainData from "../../models/complainsData.model.js";
export const getComplaintByTicketService = async (ticketNumber) => {
  // findOne searches for first matching document
  const complaint = await complainData.findOne({ ticketNumber });

  if (!complaint) {
    // WHY throw with a message: The controller catches this and sends the right HTTP response.
    throw new Error("Complaint not found for the given ticket number");
  }

  return complaint;
};