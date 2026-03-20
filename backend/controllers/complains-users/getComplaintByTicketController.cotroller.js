import { getComplaintByTicketService } from "../../services/complain-user/getComplainByTicket.service.js";
export const getComplaintByTicket = async (req, res) => {
  try {
    // WHY req.params.ticketNumber: the ticket comes from the URL, e.g. /by-ticket/TKT12345
    // This is a GET request — we never put search queries in the body for GET.
    const complaint = await getComplaintByTicketService(req.params.ticketNumber);

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    
    console.error("getComplaintByTicket error:", error.message);
    // 404 = not found, not a server error
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};