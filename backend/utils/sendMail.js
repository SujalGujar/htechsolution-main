import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILBLUSTER_SMTP_USER,
    pass: process.env.MAILBLUSTER_SMTP_PASS,  // 16-char App Password — NOT your Gmail password
  },
});

export const sendComplaintMail = async (customerEmail, complaint) => {
  const mailOptions = {
    from: `"Support Team" <htechsolution98@gmail.com>`,
    to: customerEmail,
    subject: `Complaint Registered - ${complaint.complaintId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333;">Your Complaint Has Been Registered</h2>
        <p>Dear <strong>${complaint.customerName}</strong>,</p>
        <p>We have received your complaint. Here are the details:</p>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr style="background:#f5f5f5;">
            <td style="padding:10px; font-weight:bold;">Complaint ID</td>
            <td style="padding:10px;">${complaint.complaintId}</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:bold;">Ticket Number</td>
            <td style="padding:10px;">${complaint.ticketNumber}</td>
          </tr>
          <tr style="background:#f5f5f5;">
            <td style="padding:10px; font-weight:bold;">Product</td>
            <td style="padding:10px;">${complaint.productName || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:bold;">Issue</td>
            <td style="padding:10px;">${complaint.issueTitle}</td>
          </tr>
          <tr style="background:#f5f5f5;">
            <td style="padding:10px; font-weight:bold;">Status</td>
            <td style="padding:10px;">${complaint.status}</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:bold;">Date</td>
            <td style="padding:10px;">${new Date(complaint.createdAt).toLocaleString()}</td>
          </tr>
        </table>
        <p style="margin-top:20px;">Our team will get back to you shortly.</p>
        <p style="color:#888; font-size:12px;">This is an automated email. Please do not reply.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent to:", customerEmail);
};