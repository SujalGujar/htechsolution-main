

// import { useState } from "react";
// import React from 'react';
// import axiosInstance from "../../Utils/axiosIntance";

// const STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   :root {
//     --bg:        #f0f2f5;
//     --surface:   #ffffff;
//     --surface2:  #f7f8fa;
//     --border:    #e4e7ec;
//     --border2:   #d0d5dd;
//     --text:      #101828;
//     --muted:     #667085;
//     --subtle:    #98a2b3;
//     --accent:    #1a56db;
//     --accent-lt: #ebf0ff;
//     --accent2:   #0ea47a;
//     --accent2-lt:#e6f7f2;
//     --danger:    #d92d20;
//     --warning:   #f79009;
//     --shadow-sm: 0 1px 2px rgba(16,24,40,.05);
//     --shadow-md: 0 4px 16px rgba(16,24,40,.08);
//     --shadow-lg: 0 12px 40px rgba(16,24,40,.12);
//     --r-sm: 8px;
//     --r-md: 12px;
//     --r-lg: 18px;
//     --r-xl: 24px;
//     --font: 'Plus Jakarta Sans', sans-serif;
//     --serif: 'Instrument Serif', serif;
//   }

//   .cc-wrap {
//     min-height: 100vh;
//     background: var(--bg);
//     font-family: var(--font);
//     color: var(--text);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 40px 20px;
//   }

//   .cc-container {
//     width: 100%;
//     max-width: 800px;
//   }

//   /* ── TAB NAVIGATION ── */
//   .cc-tabs {
//     display: flex;
//     gap: 8px;
//     margin-bottom: 24px;
//     background: var(--surface);
//     padding: 6px;
//     border-radius: var(--r-lg);
//     border: 1px solid var(--border);
//     box-shadow: var(--shadow-sm);
//   }
//   .cc-tab {
//     flex: 1;
//     padding: 12px 20px;
//     border: none;
//     background: transparent;
//     border-radius: var(--r-md);
//     font-family: var(--font);
//     font-size: 14px;
//     font-weight: 600;
//     color: var(--muted);
//     cursor: pointer;
//     transition: all .2s ease;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//   }
//   .cc-tab:hover {
//     background: var(--surface2);
//     color: var(--text);
//   }
//   .cc-tab.active {
//     background: var(--accent);
//     color: white;
//     box-shadow: 0 2px 8px rgba(26,86,219,.2);
//   }
//   .cc-tab.active.green {
//     background: var(--accent2);
//     box-shadow: 0 2px 8px rgba(14,164,122,.2);
//   }

//   /* ── PAGE HEADER ── */
//   .cc-page-title {
//     font-family: var(--serif); 
//     font-size: 36px; 
//     font-style: italic;
//     color: var(--text); 
//     letter-spacing: -0.5px; 
//     line-height: 1.1; 
//     margin-bottom: 8px;
//     text-align: center;
//   }
//   .cc-page-desc { 
//     font-size: 14px; 
//     color: var(--muted); 
//     margin-bottom: 32px;
//     text-align: center;
//     max-width: 600px;
//     margin-left: auto;
//     margin-right: auto;
//   }

//   /* ── CARD ── */
//   .cc-card {
//     background: var(--surface); 
//     border: 1px solid var(--border);
//     border-radius: var(--r-xl); 
//     overflow: hidden;
//     box-shadow: var(--shadow-md);
//     animation: fadeUp .3s cubic-bezier(.22,1,.36,1) both;
//   }
//   @keyframes fadeUp {
//     from { opacity:0; transform: translateY(14px); }
//     to   { opacity:1; transform: translateY(0); }
//   }
//   .cc-card-top {
//     padding: 24px 28px 20px; 
//     border-bottom: 1px solid var(--border);
//     display: flex; 
//     align-items: flex-start; 
//     gap: 14px;
//     background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%);
//   }
//   .cti { 
//     width: 48px; 
//     height: 48px; 
//     border-radius: var(--r-md); 
//     display: flex; 
//     align-items: center; 
//     justify-content: center; 
//     font-size: 24px; 
//     flex-shrink: 0;
//   }
//   .cti.blue { background: var(--accent-lt); }
//   .cti.green { background: var(--accent2-lt); }
//   .cth { 
//     font-size: 18px; 
//     font-weight: 700; 
//     color: var(--text); 
//     letter-spacing: -0.2px; 
//   }
//   .ctp { 
//     font-size: 13px; 
//     color: var(--muted); 
//     margin-top: 4px; 
//     line-height: 1.5; 
//   }

//   /* ── FORM ── */
//   .cc-form-body { 
//     padding: 28px 28px; 
//     display: flex; 
//     flex-direction: column; 
//     gap: 24px; 
//   }
//   .cc-sec-head {
//     display: flex; 
//     align-items: center; 
//     gap: 12px;
//     padding-bottom: 14px; 
//     border-bottom: 1px solid var(--border);
//   }
//   .sec-ico { 
//     width: 32px; 
//     height: 32px; 
//     border-radius: 8px; 
//     display: flex; 
//     align-items: center; 
//     justify-content: center; 
//     font-size: 14px; 
//     flex-shrink: 0;
//   }
//   .sec-ico.blue { background: var(--accent-lt); }
//   .sec-ico.green { background: var(--accent2-lt); }
//   .sec-ttl { 
//     font-size: 14px; 
//     font-weight: 700; 
//     color: var(--text); 
//   }
//   .sec-sub { 
//     font-size: 12px; 
//     color: var(--muted); 
//     margin-top: 2px; 
//   }

//   .cc-grid { 
//     display: grid; 
//     grid-template-columns: 1fr 1fr; 
//     gap: 16px; 
//     margin-top: 16px; 
//   }
//   .cc-grid.g3 { grid-template-columns: 1fr 1fr 1fr; }
//   .full { grid-column: 1 / -1; }

//   .cc-field { 
//     display: flex; 
//     flex-direction: column; 
//     gap: 6px; 
//   }
//   .cc-label { 
//     font-size: 13px; 
//     font-weight: 600; 
//     color: var(--text); 
//     display: flex; 
//     align-items: center; 
//     gap: 4px; 
//   }
//   .req { 
//     color: var(--danger); 
//     font-size: 14px; 
//   }
//   .cc-hint { 
//     font-size: 11.5px; 
//     color: var(--subtle); 
//     margin-top: 2px; 
//   }

//   .cc-input, .cc-select {
//     width: 100%; 
//     height: 42px; 
//     padding: 0 14px;
//     border: 1.5px solid var(--border2); 
//     border-radius: var(--r-sm);
//     background: var(--surface);
//     font-family: var(--font); 
//     font-size: 14px; 
//     font-weight: 500; 
//     color: var(--text);
//     transition: border-color .15s, box-shadow .15s, background .15s;
//     outline: none; 
//     -webkit-appearance: none; 
//     appearance: none;
//   }
//   .cc-input::placeholder { 
//     color: var(--subtle); 
//     font-weight: 400; 
//   }
//   .cc-input:hover, .cc-select:hover { 
//     border-color: #b0bac7; 
//   }
//   .cc-input:focus, .cc-select:focus {
//     border-color: var(--accent);
//     box-shadow: 0 0 0 3px rgba(26,86,219,.12);
//     background: #fafcff;
//   }
//   .cc-select {
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2398a2b3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
//     background-repeat: no-repeat; 
//     background-position: right 12px center;
//     padding-right: 36px; 
//     cursor: pointer;
//   }
//   .cc-select option { 
//     background: white; 
//     color: var(--text); 
//   }

//   .cc-divider { 
//     height: 1px; 
//     background: var(--border); 
//   }

//   /* ── MODALS ── */
//   .cc-modal-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: rgba(0, 0, 0, 0.5);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     z-index: 1000;
//     animation: fadeIn 0.2s ease;
//   }
//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }
//   .cc-modal {
//     background: var(--surface);
//     border-radius: var(--r-xl);
//     padding: 36px;
//     max-width: 480px;
//     width: 90%;
//     box-shadow: var(--shadow-lg);
//     animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
//   }
//   @keyframes slideUp {
//     from {
//       opacity: 0;
//       transform: translateY(20px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
//   .modal-icon {
//     width: 72px;
//     height: 72px;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto 24px;
//     font-size: 36px;
//   }
//   .modal-icon.blue {
//     background: var(--accent-lt);
//     color: var(--accent);
//   }
//   .modal-icon.green {
//     background: var(--accent2-lt);
//     color: var(--accent2);
//   }
//   .modal-title {
//     font-size: 22px;
//     font-weight: 700;
//     color: var(--text);
//     text-align: center;
//     margin-bottom: 8px;
//   }
//   .modal-subtitle {
//     font-size: 14px;
//     color: var(--muted);
//     text-align: center;
//     margin-bottom: 28px;
//   }
//   .credential-item {
//     background: var(--surface2);
//     border: 1px solid var(--border);
//     border-radius: var(--r-md);
//     padding: 14px 18px;
//     margin-bottom: 14px;
//   }
//   .cred-label {
//     font-size: 11px;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     color: var(--subtle);
//     margin-bottom: 6px;
//   }
//   .cred-value {
//     font-size: 16px;
//     font-weight: 600;
//     color: var(--text);
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     word-break: break-all;
//   }
//   .copy-btn {
//     background: none;
//     border: none;
//     color: var(--accent);
//     cursor: pointer;
//     padding: 6px 10px;
//     border-radius: var(--r-sm);
//     font-size: 12px;
//     font-weight: 600;
//     transition: all 0.15s;
//     flex-shrink: 0;
//     margin-left: 8px;
//   }
//   .copy-btn:hover {
//     background: var(--accent-lt);
//   }
//   .modal-note {
//     font-size: 13px;
//     color: var(--warning);
//     text-align: center;
//     margin: 20px 0;
//     padding: 12px;
//     background: #fffaeb;
//     border-radius: var(--r-md);
//     border: 1px solid #fedf89;
//     line-height: 1.5;
//   }
//   .modal-note.info {
//     color: var(--accent);
//     background: var(--accent-lt);
//     border-color: #b3d0ff;
//   }

//   /* ── TICKET DISPLAY ── */
//   .ticket-display {
//     background: linear-gradient(135deg, var(--accent2-lt) 0%, #f0faf7 100%);
//     border: 1px solid var(--accent2);
//     border-radius: var(--r-lg);
//     padding: 16px 20px;
//     margin-bottom: 20px;
//     display: flex;
//     align-items: center;
//     gap: 16px;
//   }
//   .ticket-icon {
//     width: 48px;
//     height: 48px;
//     background: var(--accent2);
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: white;
//     font-size: 20px;
//     flex-shrink: 0;
//   }
//   .ticket-content {
//     flex: 1;
//   }
//   .ticket-label {
//     font-size: 11px;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     color: var(--accent2);
//     margin-bottom: 4px;
//   }
//   .ticket-number {
//     font-size: 24px;
//     font-weight: 700;
//     color: var(--text);
//     font-family: monospace;
//     letter-spacing: 1px;
//   }
//   .ticket-note {
//     font-size: 12px;
//     color: var(--muted);
//     margin-top: 4px;
//   }

//   /* ── FOOTER ── */
//   .cc-form-footer {
//     padding: 20px 28px;
//     background: var(--surface2); 
//     border-top: 1px solid var(--border);
//     display: flex; 
//     align-items: center; 
//     justify-content: space-between; 
//     gap: 12px; 
//     flex-wrap: wrap;
//   }
//   .footer-note { 
//     font-size: 12px; 
//     color: var(--muted); 
//     display: flex; 
//     align-items: center; 
//     gap: 4px; 
//   }
//   .footer-acts { 
//     display: flex; 
//     gap: 10px; 
//     align-items: center; 
//   }

//   .btn {
//     display: inline-flex; 
//     align-items: center; 
//     gap: 7px;
//     height: 40px; 
//     padding: 0 20px; 
//     border-radius: var(--r-sm);
//     font-family: var(--font); 
//     font-size: 14px; 
//     font-weight: 600;
//     cursor: pointer; 
//     border: none; 
//     transition: all .18s ease; 
//     letter-spacing: -0.1px;
//   }
//   .btn-ghost {
//     background: transparent; 
//     color: var(--muted);
//     border: 1.5px solid var(--border2);
//   }
//   .btn-ghost:hover { 
//     background: var(--surface2); 
//     color: var(--text); 
//     border-color: #b0bac7; 
//   }
//   .btn-blue {
//     background: var(--accent); 
//     color: white;
//     box-shadow: 0 1px 3px rgba(26,86,219,.3), 0 4px 12px rgba(26,86,219,.18);
//   }
//   .btn-blue:hover { 
//     background: #1447c0; 
//     box-shadow: 0 2px 6px rgba(26,86,219,.35), 0 8px 20px rgba(26,86,219,.22); 
//     transform: translateY(-1px); 
//   }
//   .btn-blue:active { 
//     transform: translateY(0); 
//   }
//   .btn-green {
//     background: var(--accent2); 
//     color: white;
//     box-shadow: 0 1px 3px rgba(14,164,122,.3), 0 4px 12px rgba(14,164,122,.18);
//   }
//   .btn-green:hover { 
//     background: #0b8c67; 
//     transform: translateY(-1px); 
//     box-shadow: 0 2px 6px rgba(14,164,122,.35), 0 8px 20px rgba(14,164,122,.22); 
//   }
//   .btn-green:active { 
//     transform: translateY(0); 
//   }
//   .btn:disabled { 
//     opacity: 0.65; 
//     cursor: not-allowed; 
//     transform: none !important; 
//   }

//   /* ── TOAST ── */
//   .cc-toast {
//     position: fixed; 
//     bottom: 24px; 
//     right: 24px;
//     background: white; 
//     border: 1px solid var(--border);
//     border-radius: var(--r-lg); 
//     padding: 16px 18px;
//     box-shadow: var(--shadow-lg);
//     display: flex; 
//     align-items: center; 
//     gap: 14px;
//     animation: toastIn .35s cubic-bezier(.22,1,.36,1) both;
//     z-index: 200; 
//     min-width: 300px;
//   }
//   @keyframes toastIn {
//     from { opacity:0; transform: translateY(16px) scale(.96); }
//     to   { opacity:1; transform: translateY(0) scale(1); }
//   }
//   .toast-dot {
//     width: 40px; 
//     height: 40px; 
//     border-radius: 50%;
//     display: flex; 
//     align-items: center; 
//     justify-content: center;
//     font-size: 18px; 
//     flex-shrink: 0;
//   }
//   .toast-dot.blue  { 
//     background: var(--accent-lt); 
//     color: var(--accent); 
//   }
//   .toast-dot.green { 
//     background: var(--accent2-lt); 
//     color: var(--accent2); 
//   }
//   .toast-dot.red { 
//     background: #fef3f2; 
//     color: var(--danger); 
//   }
//   .toast-ttl { 
//     font-size: 15px; 
//     font-weight: 700; 
//     color: var(--text); 
//   }
//   .toast-sub { 
//     font-size: 13px; 
//     color: var(--muted); 
//     margin-top: 3px; 
//   }
//   .toast-x {
//     margin-left: auto; 
//     background: none; 
//     border: none; 
//     cursor: pointer;
//     color: var(--subtle); 
//     font-size: 16px; 
//     padding: 4px; 
//     border-radius: 5px;
//     transition: background .15s; 
//     line-height: 1;
//   }
//   .toast-x:hover { 
//     background: var(--surface2); 
//     color: var(--text); 
//   }

//   @media (max-width: 768px) {
//     .cc-wrap { 
//       padding: 20px 12px; 
//     }
//     .cc-grid, .cc-grid.g3 { 
//       grid-template-columns: 1fr; 
//     }
//     .cc-page-title {
//       font-size: 28px;
//     }
//     .cc-form-footer {
//       flex-direction: column;
//       align-items: stretch;
//     }
//     .footer-acts {
//       width: 100%;
//     }
//     .footer-acts .btn {
//       flex: 1;
//     }
//   }
// `;

// const CATS = [
//   "Television", 
//   "Refrigerator", 
//   "Washing Machine", 
//   "Air Conditioner", 
//   "Microwave", 
//   "Laptop", 
//   "Mobile Phone", 
//   "Camera", 
//   "Printer", 
//   "Other Electronics"
// ];

// const EMPTY_CUST = {
//   customerName: "",
//   email: "",
//   mobileNum: "",
//   proName: "",
//   proCatogory: "",
//   proSrNo: "",
//   proModNum: "",
//   warrStartDate: "",
//   warrEndDate: "",
//   ticketNumber: ""
// };

// const EMPTY_PROD = {
//   proName: "",
//   proCatogory: "",
//   proSrNo: "",
//   proModNum: "",
//   brandName: "",
//   purDate: "",
//   invoiceNum: ""
// };

// export default function CustomerCareHome() {
//   const [cus,setCus] = useState(EMPTY_CUST)
//   const [view, setView] = useState("customer");
//   const [toast, setToast] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [cust, setCust] = useState(EMPTY_CUST);
//   const [prod, setProd] = useState(EMPTY_PROD);
  
//   // For customer credentials modal
//   const [showCredentialsModal, setShowCredentialsModal] = useState(false);
//   const [userCredentials, setUserCredentials] = useState({ 
//     username: "", 
//     password: "",
//     warrantyStatus: "",
//     warrantyInfo: null
//   });
  
//   // For product ticket modal
//   const [showTicketModal, setShowTicketModal] = useState(false);
//   const [ticketInfo, setTicketInfo] = useState({ ticketNumber: "", message: "" });

//   const show = (type, customMessage = null) => {
//     setToast({ type, message: customMessage });
//     setTimeout(() => setToast(null), 3500);
//   };

//   const onC = (e) => setCust({ ...cust, [e.target.name]: e.target.value });
//   const onP = (e) => setProd({ ...prod, [e.target.name]: e.target.value });

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     show("copy", "Copied to clipboard!");
//   };

//   const submitCust = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axiosInstance.post("/customerDetails/newcustomer", cust);
      
//       // Check if response contains password and username
//       if (response.data.success && response.data.password) {
//         setUserCredentials({
//           username: response.data.username || cust.email,
//           password: response.data.password,
//           warrantyStatus: response.data.warrantyStatus || "active",
//           warrantyInfo: response.data.warrantyInfo || null
//         });
//         setShowCredentialsModal(true);
        
//         // Clear form only after successful registration
//         setCust(EMPTY_CUST);
//         show("customer", response.data.message || "Customer registered successfully!");
//       } else {
//         // Handle unexpected response format
//         setError("Registration completed but credentials not received. Please contact support.");
//         show("error", "Registration completed but credentials not received");
//       }
      
//     } catch (err) {
//       const msg = err.response?.data?.message || "Customer registration failed";
//       setError(msg);
//       show("error", msg);
//       console.error("Registration error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitProd = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axiosInstance.post("/auth/register", prod);
      
//       // Check if response contains ticket number
//       if (response.data.ticketNumber) {
//         setTicketInfo({
//           ticketNumber: response.data.ticketNumber,
//           message: response.data.message || "Product registered successfully!"
//         });
//         setShowTicketModal(true);
//       }
      
//       show("product", "Product registered successfully!");
//       setProd(EMPTY_PROD);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Product registration failed";
//       setError(msg);
//       show("error", msg);
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <style>{STYLES}</style>
//       <div className="cc-wrap">
//         <div className="cc-container">
//           {/* Page Header */}
//           <div className="cc-page-title">
//             {view === "customer" ? "Customer Registration" : "Product Registration"}
//           </div>
//           <div className="cc-page-desc">
//             {view === "customer"
//               ? "Add a new customer to the support system for warranty and service access."
//               : "Register a purchased product to activate warranty coverage and service tracking."}
//           </div>

//           {/* Tab Navigation */}
//           <div className="cc-tabs">
//             <button
//               className={`cc-tab ${view === "customer" ? "active" : ""}`}
//               onClick={() => {
//                 setView("customer");
//                 setError(null);
//               }}
//             >
//               <span>👤</span>
//               Customer Registration
//             </button>
//             <button
//               className={`cc-tab ${view === "product" ? "active green" : ""}`}
//               onClick={() => {
//                 setView("product");
//                 setError(null);
//               }}
//             >
//               <span>📦</span>
//               Product Registration
//             </button>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div style={{
//               background: "#fef3f2",
//               border: "1px solid #fecdca",
//               borderRadius: "var(--r-md)",
//               padding: "14px 18px",
//               marginBottom: "24px",
//               color: "var(--danger)",
//               fontSize: "13px",
//               textAlign: "center"
//             }}>
//               {error}
//             </div>
//           )}

//           {/* ── CUSTOMER FORM ── */}
//           {view === "customer" && (
//             <div className="cc-card" key="cust">
//               <div className="cc-card-top">
//                 <div className="cti blue">👤</div>
//                 <div>
//                   <div className="cth">New Customer Registration</div>
//                   <div className="ctp">Register a customer to grant access to warranty claims and support history.</div>
//                 </div>
//               </div>
//               <form onSubmit={submitCust}>
//                 <div className="cc-form-body">
//                   {/* Customer Information */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">🪪</div>
//                       <div>
//                         <div className="sec-ttl">Personal Information</div>
//                         <div className="sec-sub">Basic contact details of the customer</div>
//                       </div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field full">
//                         <label className="cc-label">Full Name <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           name="customerName"
//                           value={cust.customerName}
//                           onChange={onC}
//                           placeholder="e.g. Rahul Sharma"
//                           required
//                         />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Email Address <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           type="email"
//                           name="email"
//                           value={cust.email}
//                           onChange={onC}
//                           placeholder="rahul@example.com"
//                           required
//                         />
//                         <span className="cc-hint">This will be used as username for login</span>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Mobile Number <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           type="tel"
//                           name="mobileNum"
//                           value={cust.mobileNum}
//                           onChange={onC}
//                           placeholder="+91 98765 43210"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Product Information */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">📦</div>
//                       <div>
//                         <div className="sec-ttl">Product Information</div>
//                         <div className="sec-sub">Product details to link with customer</div>
//                       </div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Product Name <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           name="proName"
//                           value={cust.proName}
//                           onChange={onC}
//                           placeholder="e.g. Samsung Smart TV"
//                           required
//                         />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Product Category <span className="req">*</span></label>
//                         <select
//                           className="cc-select"
//                           name="proCatogory"
//                           value={cust.proCatogory}
//                           onChange={onC}
//                           required
//                         >
//                           <option value="">Select category</option>
//                           {CATS.map(c => <option key={c} value={c}>{c}</option>)}
//                         </select>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Serial Number <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           name="proSrNo"
//                           value={cust.proSrNo}
//                           onChange={onC}
//                           placeholder="e.g. SN2024XXXXXX"
//                           required
//                         />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Model Number <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           name="proModNum"
//                           value={cust.proModNum}
//                           onChange={onC}
//                           placeholder="e.g. UA55AU8000"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Ticket Number Verification */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">🎫</div>
//                       <div>
//                         <div className="sec-ttl">Product Verification</div>
//                         <div className="sec-sub">Enter the ticket number from product registration</div>
//                       </div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field full">
//                         <label className="cc-label">Ticket Number <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           name="ticketNumber"
//                           value={cust.ticketNumber}
//                           onChange={onC}
//                           placeholder="e.g. TKT-2024-XXXXX"
//                           required
//                           style={{ fontFamily: 'monospace', fontSize: '15px' }}
//                         />
//                         <span className="cc-hint">
//                           ℹ️ This ticket number was generated when the product was registered. 
//                           It links the customer to their warranty coverage.
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Warranty Information */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">🛡️</div>
//                       <div>
//                         <div className="sec-ttl">Warranty Information</div>
//                         <div className="sec-sub">Warranty coverage period</div>
//                       </div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty Start Date <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           type="date"
//                           name="warrStartDate"
//                           value={cust.warrStartDate}
//                           onChange={onC}
//                           required
//                         />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty End Date <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           type="date"
//                           name="warrEndDate"
//                           value={cust.warrEndDate}
//                           onChange={onC}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="cc-form-footer">
//                   <div className="footer-note">
//                     <span style={{ color: "var(--danger)" }}>*</span> All fields are required
//                   </div>
//                   <div className="footer-acts">
//                     <button 
//                       type="button" 
//                       className="btn btn-ghost" 
//                       onClick={() => setCust(EMPTY_CUST)}
//                       disabled={loading}
//                     >
//                       Clear Form
//                     </button>
//                     <button type="submit" className="btn btn-blue" disabled={loading}>
//                       {loading ? "Registering…" : <>Register Customer <span>→</span></>}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* ── PRODUCT FORM ── */}
//           {view === "product" && (
//             <div className="cc-card" key="prod">
//               <div className="cc-card-top">
//                 <div className="cti green">📦</div>
//                 <div>
//                   <div className="cth">Product Registration</div>
//                   <div className="ctp">Register a purchased product to activate warranty and service request tracking.</div>
//                 </div>
//               </div>
//               <form onSubmit={submitProd}>
//                 <div className="cc-form-body">
//                   {/* Product details */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico green">🔧</div>
//                       <div>
//                         <div className="sec-ttl">Product Details</div>
//                         <div className="sec-sub">Identify the product being registered</div>
//                       </div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Product Name <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           name="proName"
//                           value={prod.proName}
//                           onChange={onP}
//                           placeholder='e.g. 55" Smart TV'
//                           required
//                         />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Product Category <span className="req">*</span></label>
//                         <select
//                           className="cc-select"
//                           name="proCatogory"
//                           value={prod.proCatogory}
//                           onChange={onP}
//                           required
//                         >
//                           <option value="">Select category</option>
//                           {CATS.map(c => <option key={c} value={c}>{c}</option>)}
//                         </select>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Brand Name <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           name="brandName"
//                           value={prod.brandName}
//                           onChange={onP}
//                           placeholder="e.g. Samsung"
//                           required
//                         />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Model Number <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           name="proModNum"
//                           value={prod.proModNum}
//                           onChange={onP}
//                           placeholder="e.g. UA55AU8000"
//                           required
//                         />
//                       </div>
//                       <div className="cc-field full">
//                         <label className="cc-label">Serial Number <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           name="proSrNo"
//                           value={prod.proSrNo}
//                           onChange={onP}
//                           placeholder="e.g. SN2024XXXXXXXX"
//                           required
//                         />
//                         <span className="cc-hint">Found on the back of the product or inside the packaging</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Purchase Information */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico green">🧾</div>
//                       <div>
//                         <div className="sec-ttl">Purchase Information</div>
//                         <div className="sec-sub">Invoice and purchase details</div>
//                       </div>
//                     </div>
//                     <div className="cc-grid g3">
//                       <div className="cc-field">
//                         <label className="cc-label">Purchase Date <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           type="date"
//                           name="purDate"
//                           value={prod.purDate}
//                           onChange={onP}
//                           required
//                         />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Invoice Number <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           name="invoiceNum"
//                           value={prod.invoiceNum}
//                           onChange={onP}
//                           placeholder="INV-2024-001"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="cc-form-footer">
//                   <div className="footer-note">
//                     <span style={{ color: "var(--danger)" }}>*</span> All fields are required
//                   </div>
//                   <div className="footer-acts">
//                     <button 
//                       type="button" 
//                       className="btn btn-ghost" 
//                       onClick={() => setProd(EMPTY_PROD)}
//                       disabled={loading}
//                     >
//                       Clear Form
//                     </button>
//                     <button type="submit" className="btn btn-green" disabled={loading}>
//                       {loading ? "Registering…" : <>Register Product <span>→</span></>}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Credentials Modal - For Customer Registration */}
//       {showCredentialsModal && (
//         <div className="cc-modal-overlay" onClick={() => setShowCredentialsModal(false)}>
//           <div className="cc-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon blue">🔐</div>
//             <div className="modal-title">Registration Successful!</div>
//             <div className="modal-subtitle">Auto-generated login credentials</div>

//             <div className="credential-item">
//               <div className="cred-label">Username (Email)</div>
//               <div className="cred-value">
//                 <span>{userCredentials.username}</span>
//                 <button
//                   className="copy-btn"
//                   onClick={() => copyToClipboard(userCredentials.username)}
//                 >
//                   Copy
//                 </button>
//               </div>
//             </div>

//             <div className="credential-item">
//               <div className="cred-label">Auto-Generated Password</div>
//               <div className="cred-value">
//                 <span style={{ fontFamily: 'monospace' }}>{userCredentials.password}</span>
//                 <button
//                   className="copy-btn"
//                   onClick={() => copyToClipboard(userCredentials.password)}
//                 >
//                   Copy
//                 </button>
//               </div>
//             </div>

//             {/* Warranty Status Display */}
//             {userCredentials.warrantyStatus && (
//               <div style={{
//                 background: userCredentials.warrantyStatus === 'active' 
//                   ? 'var(--accent2-lt)' 
//                   : userCredentials.warrantyStatus === 'expired' 
//                     ? '#fef3f2' 
//                     : 'var(--accent-lt)',
//                 border: `1px solid ${
//                   userCredentials.warrantyStatus === 'active' 
//                     ? 'var(--accent2)' 
//                     : userCredentials.warrantyStatus === 'expired' 
//                       ? 'var(--danger)' 
//                       : 'var(--accent)'
//                 }`,
//                 borderRadius: 'var(--r-md)',
//                 padding: '14px 18px',
//                 marginBottom: '14px',
//                 textAlign: 'center'
//               }}>
//                 <div style={{ 
//                   fontSize: '11px', 
//                   fontWeight: 600, 
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.05em',
//                   color: userCredentials.warrantyStatus === 'active' 
//                     ? 'var(--accent2)' 
//                     : userCredentials.warrantyStatus === 'expired' 
//                       ? 'var(--danger)' 
//                       : 'var(--accent)',
//                   marginBottom: '4px'
//                 }}>
//                   Warranty Status
//                 </div>
//                 <div style={{ 
//                   fontSize: '16px', 
//                   fontWeight: 700,
//                   color: 'var(--text)',
//                   textTransform: 'capitalize'
//                 }}>
//                   {userCredentials.warrantyStatus === 'active' && '✓ Active'}
//                   {userCredentials.warrantyStatus === 'expired' && '✕ Expired'}
//                   {userCredentials.warrantyStatus === 'not_started' && '⏱ Not Started Yet'}
//                 </div>
//                 {userCredentials.warrantyInfo && userCredentials.warrantyStatus === 'active' && (
//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'var(--muted)',
//                     marginTop: '4px'
//                   }}>
//                     {userCredentials.warrantyInfo.daysRemaining} days remaining
//                   </div>
//                 )}
//               </div>
//             )}

//             <div className="modal-note">
//               ⚠️ <strong>Important:</strong> Please save these credentials now. They won't be shown again.
//               <br />
//               <small style={{ display: 'block', marginTop: '8px' }}>
//                 The customer can use these credentials to login and raise service requests.
//               </small>
//             </div>

//             <button
//               className="btn btn-blue"
//               onClick={() => setShowCredentialsModal(false)}
//               style={{ width: "100%" }}
//             >
//               I've Saved the Credentials
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Ticket Modal - For Product Registration */}
//       {showTicketModal && (
//         <div className="cc-modal-overlay" onClick={() => setShowTicketModal(false)}>
//           <div className="cc-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon green">🎫</div>
//             <div className="modal-title">Product Registered!</div>
//             <div className="modal-subtitle">{ticketInfo.message}</div>

//             <div className="ticket-display" style={{ marginBottom: 0 }}>
//               <div className="ticket-icon">#</div>
//               <div className="ticket-content">
//                 <div className="ticket-label">Ticket Number</div>
//                 <div className="ticket-number">{ticketInfo.ticketNumber}</div>
//                 <div className="ticket-note">Use this ticket number for tracking service requests</div>
//               </div>
//             </div>

//             <div className="credential-item" style={{ marginTop: "16px" }}>
//               <div className="cred-label">Ticket Number</div>
//               <div className="cred-value">
//                 <span style={{ fontFamily: 'monospace' }}>{ticketInfo.ticketNumber}</span>
//                 <button
//                   className="copy-btn"
//                   onClick={() => copyToClipboard(ticketInfo.ticketNumber)}
//                 >
//                   Copy
//                 </button>
//               </div>
//             </div>

//             <div className="modal-note info">
//               ℹ️ This ticket number will be used for all future service requests
//             </div>

//             <button
//               className="btn btn-green"
//               onClick={() => setShowTicketModal(false)}
//               style={{ width: "100%" }}
//             >
//               Got It
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Toast Notifications */}
//       {toast && (
//         <div className="cc-toast">
//           <div className={`toast-dot ${
//             toast.type === "customer" ? "blue" :
//             toast.type === "product" ? "green" :
//             toast.type === "copy" ? "blue" :
//             toast.type === "error" ? "red" : "blue"
//           }`}>
//             {toast.type === "error" ? "✕" : "✓"}
//           </div>
//           <div>
//             <div className="toast-ttl">
//               {toast.type === "customer" && "Customer Registered!"}
//               {toast.type === "product" && "Product Registered!"}
//               {toast.type === "copy" && "Copied!"}
//               {toast.type === "error" && "Error"}
//             </div>
//             <div className="toast-sub">
//               {toast.message || (
//                 toast.type === "customer" ? "Credentials sent to customer" :
//                 toast.type === "product" ? "Ticket number generated" :
//                 toast.type === "copy" ? "Text copied to clipboard" :
//                 "Operation failed"
//               )}
//             </div>
//           </div>
//           <button className="toast-x" onClick={() => setToast(null)}>✕</button>
//         </div>
//       )}
//     </>
//   );
// }

// import { useState } from "react";
// import React from 'react';
// import axiosInstance from "../../Utils/axiosIntance";

// ─────────────────────────────────────────────────────────
// HARDWARE CATEGORIES — updated for hardware company
// ─────────────────────────────────────────────────────────
// const HARDWARE_CATS = [
//   // Networking
//   "Router",
//   "Network Switch",
//   "Firewall / UTM Device",
//   "Modem",
//   "Access Point / WiFi",
//   "Network Cable / Patch Panel",
//   // Servers & Storage
//   "Server",
//   "NAS / Storage Device",
//   "UPS / Power Supply",
//   "Rack / Cabinet",
//   // Computers
//   "Desktop Computer",
//   "Laptop",
//   "Workstation",
//   "Mini PC",
//   // Peripherals
//   "Monitor / Display",
//   "Keyboard / Mouse",
//   "Printer",
//   "Scanner",
//   "Projector",
//   "Barcode Scanner",
//   // Components
//   "Hard Disk / SSD",
//   "RAM / Memory",
//   "Graphics Card / GPU",
//   "Motherboard",
//   "Processor / CPU",
//   "Power Supply Unit (PSU)",
//   "Cooling Fan / Heatsink",
//   // Security
//   "CCTV Camera",
//   "DVR / NVR",
//   "Biometric Device",
//   "Access Control System",
//   // Communication
//   "IP Phone",
//   "EPABX / PBX System",
//   "Video Conferencing System",
//   // Other
//   "Other Hardware",
// ];

// ─────────────────────────────────────────────────────────
// FIX: State defined OUTSIDE and ABOVE forms
// WHY: When user switches tabs, only view changes.
//      cust and prod state stay alive in memory.
//      This is why form data does NOT disappear!
// ─────────────────────────────────────────────────────────
// const EMPTY_CUST = {
//   customerName: "",
//   email: "",
//   mobileNum: "",
//   proName: "",
//   proCatogory: "",
//   proSrNo: "",
//   proModNum: "",
//   ticketNumber: "",
//   warrStartDate: "",
//   warrEndDate: "",
// };

// const EMPTY_PROD = {
//   proName: "",
//   proCatogory: "",
//   proSrNo: "",
//   proModNum: "",
//   brandName: "",
//   purDate: "",
//   invoiceNum: "",
//   warrStartDate: "", // ✅ ADDED — matches schema after uncomment
//   warrEndDate: "",   // ✅ ADDED — matches schema after uncomment
// };

// const STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   :root {
//     --bg: #f0f2f5; --surface: #fff; --surface2: #f7f8fa;
//     --border: #e4e7ec; --border2: #d0d5dd;
//     --text: #101828; --muted: #667085; --subtle: #98a2b3;
//     --accent: #1a56db; --accent-lt: #ebf0ff;
//     --accent2: #0ea47a; --accent2-lt: #e6f7f2;
//     --danger: #d92d20; --warning: #f79009;
//     --shadow-sm: 0 1px 2px rgba(16,24,40,.05);
//     --shadow-md: 0 4px 16px rgba(16,24,40,.08);
//     --shadow-lg: 0 12px 40px rgba(16,24,40,.12);
//     --r-sm: 8px; --r-md: 12px; --r-lg: 18px; --r-xl: 24px;
//     --font: 'Plus Jakarta Sans', sans-serif;
//   }
//   .cc-wrap { min-height:100vh; background:var(--bg); font-family:var(--font); color:var(--text); display:flex; align-items:flex-start; justify-content:center; padding:40px 20px; }
//   .cc-container { width:100%; max-width:820px; }
//   .cc-page-title { font-size:32px; font-weight:800; color:var(--text); letter-spacing:-0.5px; margin-bottom:6px; text-align:center; }
//   .cc-page-desc { font-size:14px; color:var(--muted); margin-bottom:28px; text-align:center; }
//   .cc-tabs { display:flex; gap:8px; margin-bottom:24px; background:var(--surface); padding:6px; border-radius:var(--r-lg); border:1px solid var(--border); box-shadow:var(--shadow-sm); }
//   .cc-tab { flex:1; padding:12px 20px; border:none; background:transparent; border-radius:var(--r-md); font-family:var(--font); font-size:14px; font-weight:600; color:var(--muted); cursor:pointer; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
//   .cc-tab:hover { background:var(--surface2); color:var(--text); }
//   .cc-tab.active { background:var(--accent); color:white; box-shadow:0 2px 8px rgba(26,86,219,.2); }
//   .cc-tab.active.green { background:var(--accent2); box-shadow:0 2px 8px rgba(14,164,122,.2); }
//   .cc-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--shadow-md); animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both; }
//   @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
//   .cc-card-top { padding:24px 28px 20px; border-bottom:1px solid var(--border); display:flex; align-items:flex-start; gap:14px; background:linear-gradient(135deg,var(--surface) 0%,var(--surface2) 100%); }
//   .cti { width:48px; height:48px; border-radius:var(--r-md); display:flex; align-items:center; justify-content:center; font-size:24px; flex-shrink:0; }
//   .cti.blue { background:var(--accent-lt); } .cti.green { background:var(--accent2-lt); }
//   .cth { font-size:18px; font-weight:700; color:var(--text); } .ctp { font-size:13px; color:var(--muted); margin-top:4px; line-height:1.5; }
//   .cc-form-body { padding:28px; display:flex; flex-direction:column; gap:24px; }
//   .cc-sec-head { display:flex; align-items:center; gap:12px; padding-bottom:14px; border-bottom:1px solid var(--border); }
//   .sec-ico { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; }
//   .sec-ico.blue { background:var(--accent-lt); } .sec-ico.green { background:var(--accent2-lt); }
//   .sec-ttl { font-size:14px; font-weight:700; color:var(--text); } .sec-sub { font-size:12px; color:var(--muted); margin-top:2px; }
//   .cc-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:16px; }
//   .cc-grid.g3 { grid-template-columns:1fr 1fr 1fr; }
//   .full { grid-column:1/-1; }
//   .cc-field { display:flex; flex-direction:column; gap:6px; }
//   .cc-label { font-size:13px; font-weight:600; color:var(--text); display:flex; align-items:center; gap:4px; }
//   .req { color:var(--danger); font-size:14px; } .cc-hint { font-size:11.5px; color:var(--subtle); margin-top:2px; }
//   .cc-input, .cc-select { width:100%; height:42px; padding:0 14px; border:1.5px solid var(--border2); border-radius:var(--r-sm); background:var(--surface); font-family:var(--font); font-size:14px; font-weight:500; color:var(--text); transition:border-color .15s,box-shadow .15s,background .15s; outline:none; -webkit-appearance:none; appearance:none; }
//   .cc-input::placeholder { color:var(--subtle); font-weight:400; }
//   .cc-input:hover, .cc-select:hover { border-color:#b0bac7; }
//   .cc-input:focus, .cc-select:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(26,86,219,.12); background:#fafcff; }
//   .cc-select { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2398a2b3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; padding-right:36px; cursor:pointer; }
//   .cc-divider { height:1px; background:var(--border); }
//   .cc-form-footer { padding:20px 28px; background:var(--surface2); border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
//   .footer-note { font-size:12px; color:var(--muted); } .footer-acts { display:flex; gap:10px; }
//   .btn { display:inline-flex; align-items:center; gap:7px; height:40px; padding:0 20px; border-radius:var(--r-sm); font-family:var(--font); font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all .18s ease; }
//   .btn-ghost { background:transparent; color:var(--muted); border:1.5px solid var(--border2); }
//   .btn-ghost:hover { background:var(--surface2); color:var(--text); border-color:#b0bac7; }
//   .btn-blue { background:var(--accent); color:white; box-shadow:0 1px 3px rgba(26,86,219,.3),0 4px 12px rgba(26,86,219,.18); }
//   .btn-blue:hover { background:#1447c0; transform:translateY(-1px); }
//   .btn-green { background:var(--accent2); color:white; box-shadow:0 1px 3px rgba(14,164,122,.3),0 4px 12px rgba(14,164,122,.18); }
//   .btn-green:hover { background:#0b8c67; transform:translateY(-1px); }
//   .btn:disabled { opacity:0.65; cursor:not-allowed; transform:none !important; }
//   .cc-modal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
//   .cc-modal { background:var(--surface); border-radius:var(--r-xl); padding:36px; max-width:480px; width:90%; box-shadow:var(--shadow-lg); animation:fadeUp .3s ease both; }
//   .modal-icon { width:72px; height:72px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 24px; font-size:36px; }
//   .modal-icon.blue { background:var(--accent-lt); } .modal-icon.green { background:var(--accent2-lt); }
//   .modal-title { font-size:22px; font-weight:700; color:var(--text); text-align:center; margin-bottom:8px; }
//   .modal-subtitle { font-size:14px; color:var(--muted); text-align:center; margin-bottom:28px; }
//   .credential-item { background:var(--surface2); border:1px solid var(--border); border-radius:var(--r-md); padding:14px 18px; margin-bottom:14px; }
//   .cred-label { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; color:var(--subtle); margin-bottom:6px; }
//   .cred-value { font-size:15px; font-weight:600; color:var(--text); display:flex; align-items:center; justify-content:space-between; word-break:break-all; }
//   .copy-btn { background:none; border:none; color:var(--accent); cursor:pointer; padding:6px 10px; border-radius:var(--r-sm); font-size:12px; font-weight:600; transition:all .15s; flex-shrink:0; margin-left:8px; }
//   .copy-btn:hover { background:var(--accent-lt); }
//   .modal-note { font-size:13px; text-align:center; margin:20px 0; padding:12px; border-radius:var(--r-md); border:1px solid #fedf89; background:#fffaeb; color:var(--warning); line-height:1.5; }
//   .modal-note.info { color:var(--accent); background:var(--accent-lt); border-color:#b3d0ff; }
//   .ticket-display { background:linear-gradient(135deg,var(--accent2-lt),#f0faf7); border:1px solid var(--accent2); border-radius:var(--r-lg); padding:16px 20px; margin-bottom:20px; display:flex; align-items:center; gap:16px; }
//   .ticket-icon { width:48px; height:48px; background:var(--accent2); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:20px; flex-shrink:0; }
//   .ticket-label { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; color:var(--accent2); margin-bottom:4px; }
//   .ticket-number { font-size:24px; font-weight:700; color:var(--text); font-family:monospace; letter-spacing:1px; }
//   .ticket-note { font-size:12px; color:var(--muted); margin-top:4px; }
//   .cc-toast { position:fixed; bottom:24px; right:24px; background:white; border:1px solid var(--border); border-radius:var(--r-lg); padding:16px 18px; box-shadow:var(--shadow-lg); display:flex; align-items:center; gap:14px; z-index:200; min-width:300px; animation:fadeUp .35s ease both; }
//   .toast-dot { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
//   .toast-dot.blue { background:var(--accent-lt); color:var(--accent); }
//   .toast-dot.green { background:var(--accent2-lt); color:var(--accent2); }
//   .toast-dot.red { background:#fef3f2; color:var(--danger); }
//   .toast-ttl { font-size:15px; font-weight:700; color:var(--text); } .toast-sub { font-size:13px; color:var(--muted); margin-top:3px; }
//   .toast-x { margin-left:auto; background:none; border:none; cursor:pointer; color:var(--subtle); font-size:16px; padding:4px; border-radius:5px; transition:background .15s; }
//   .toast-x:hover { background:var(--surface2); color:var(--text); }
//   @media(max-width:768px) { .cc-wrap{padding:20px 12px;} .cc-grid,.cc-grid.g3{grid-template-columns:1fr;} .cc-page-title{font-size:26px;} }
// `;

// export default function CustomerCareHome() {
//   const [view, setView] = useState("customer");
//   const [toast, setToast] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ─────────────────────────────────────────────────────
//   // KEY CONCEPT: State lives HERE in parent, NOT in forms
//   // When view switches: customer ↔ product
//   //   - Only the VIEW changes (what's visible)
//   //   - cust and prod state STAY in memory untouched
//   //   - So form data is preserved when switching tabs!
//   // ─────────────────────────────────────────────────────
//   const [cust, setCust] = useState(EMPTY_CUST);
//   const [prod, setProd] = useState(EMPTY_PROD);

//   // Modal state
//   const [showCredentialsModal, setShowCredentialsModal] = useState(false);
//   const [userCredentials, setUserCredentials] = useState({ username: "", password: "" });
//   const [showTicketModal, setShowTicketModal] = useState(false);
//   const [ticketInfo, setTicketInfo] = useState({ ticketNumber: "", message: "" });

//   const show = (type, msg = null) => {
//     setToast({ type, message: msg });
//     setTimeout(() => setToast(null), 3500);
//   };

//   // ✅ onC updates ONLY the field that changed, preserving all others
//   // Spread operator ...cust copies all existing fields first
//   // Then [e.target.name]: e.target.value overwrites only the changed one
//   const onC = (e) => setCust({ ...cust, [e.target.name]: e.target.value });
//   const onP = (e) => setProd({ ...prod, [e.target.name]: e.target.value });

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     show("copy", "Copied to clipboard!");
//   };

//   // ── SUBMIT CUSTOMER ──
//   const submitCust = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post("/customerDetails/newcustomer", cust);
//       if (response.data.password) {
//         setUserCredentials({
//           username: response.data.username || cust.email,
//           password: response.data.password,
//         });
//         setShowCredentialsModal(true);
//       }
//       show("customer", "Customer registered successfully!");
//       setCust(EMPTY_CUST);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Customer registration failed";
//       setError(msg);
//       show("error", msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── SUBMIT PRODUCT ──
//   // Sends to POST /api/customerDetails/newproduct (or your actual route)
//   const submitProd = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post("/auth/register", prod);
//       if (response.data.TicketNumber || response.data.ticketNumber) {
//         setTicketInfo({
//           ticketNumber: response.data.TicketNumber || response.data.ticketNumber,
//           message: response.data.message || "Product registered successfully!"
//         });
//         setShowTicketModal(true);
//       }
//       show("product", "Product registered successfully!");
//       setProd(EMPTY_PROD);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Product registration failed";
//       setError(msg);
//       show("error", msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //60196e070926

//   return (
//     <>
//       <style>{STYLES}</style>
//       <div className="cc-wrap">
//         <div className="cc-container">

//           <div className="cc-page-title">
//             {view === "customer" ? "Customer Registration" : "Product Registration"}
//           </div>
//           <div className="cc-page-desc">
//             {view === "customer"
//               ? "Add a new customer to the support system for warranty and service access."
//               : "Register a hardware product to activate warranty coverage and service tracking."}
//           </div>

//           {/* ── TAB NAVIGATION ──
//               Switching tabs only changes `view` state
//               cust and prod state are UNTOUCHED = data preserved!
//           */}
//           <div className="cc-tabs">
//             <button
//               className={`cc-tab ${view === "customer" ? "active" : ""}`}
//               onClick={() => { setView("customer"); setError(null); }}
//             >
//               <span>👤</span> Customer Registration
//             </button>
//             <button
//               className={`cc-tab ${view === "product" ? "active green" : ""}`}
//               onClick={() => { setView("product"); setError(null); }}
//             >
//               <span>🖥️</span> Product Registration
//             </button>
//           </div>

//           {error && (
//             <div style={{ background:"#fef3f2", border:"1px solid #fecdca", borderRadius:"var(--r-md)", padding:"14px 18px", marginBottom:"24px", color:"var(--danger)", fontSize:"13px", textAlign:"center" }}>
//               {error}
//             </div>
//           )}

//           {/* ══════════════════════════════════════
//               CUSTOMER FORM
//               Hidden when view="product" but STATE STAYS ALIVE
//               That's why data doesn't disappear!
//           ══════════════════════════════════════ */}
//           {view === "customer" && (
//             <div className="cc-card">
//               <div className="cc-card-top">
//                 <div className="cti blue">👤</div>
//                 <div>
//                   <div className="cth">New Customer Registration</div>
//                   <div className="ctp">Register a customer to grant access to warranty claims and support history.</div>
//                 </div>
//               </div>
//               <form onSubmit={submitCust}>
//                 <div className="cc-form-body">

//                   {/* Personal Info */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">🪪</div>
//                       <div><div className="sec-ttl">Personal Information</div><div className="sec-sub">Basic contact details</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field full">
//                         <label className="cc-label">Full Name <span className="req">*</span></label>
//                         <input className="cc-input" name="customerName" value={cust.customerName} onChange={onC} placeholder="e.g. Rahul Sharma" required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Email Address <span className="req">*</span></label>
//                         <input className="cc-input" type="email" name="email" value={cust.email} onChange={onC} placeholder="rahul@example.com" required />
//                         <span className="cc-hint">Used as login username</span>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Mobile Number <span className="req">*</span></label>
//                         <input className="cc-input" type="tel" name="mobileNum" value={cust.mobileNum} onChange={onC} placeholder="+91 98765 43210" required />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Product Info */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">📦</div>
//                       <div><div className="sec-ttl">Product Information</div><div className="sec-sub">Hardware product linked to this customer</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Product Name <span className="req">*</span></label>
//                         <input className="cc-input" name="proName" value={cust.proName} onChange={onC} placeholder="e.g. Cisco 24-Port Switch" required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Product Category <span className="req">*</span></label>
//                         <select className="cc-select" name="proCatogory" value={cust.proCatogory} onChange={onC} required>
//                           <option value="">Select hardware category</option>
//                           {HARDWARE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
//                         </select>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Serial Number <span className="req">*</span></label>
//                         <input className="cc-input" name="proSrNo" value={cust.proSrNo} onChange={onC} placeholder="e.g. SN2024XXXXXX" required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Model Number <span className="req">*</span></label>
//                         <input className="cc-input" name="proModNum" value={cust.proModNum} onChange={onC} placeholder="e.g. WS-C2960X-24TS" required />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Ticket Number */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">🎫</div>
//                       <div><div className="sec-ttl">Product Verification</div><div className="sec-sub">Enter the ticket number from product registration</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field full">
//                         <label className="cc-label">Ticket Number <span className="req">*</span></label>
//                         <input className="cc-input" name="ticketNumber" value={cust.ticketNumber} onChange={onC} placeholder="e.g. TKT-20260214-25671" required style={{fontFamily:"monospace", fontSize:"15px"}} />
//                         <span className="cc-hint">ℹ️ Generated when product was registered — links customer to their warranty</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Warranty Info */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">🛡️</div>
//                       <div><div className="sec-ttl">Warranty Information</div><div className="sec-sub">Warranty coverage period for the linked product</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty Start Date <span className="req">*</span></label>
//                         <input className="cc-input" type="date" name="warrStartDate" value={cust.warrStartDate} onChange={onC} required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty End Date <span className="req">*</span></label>
//                         <input className="cc-input" type="date" name="warrEndDate" value={cust.warrEndDate} onChange={onC} required />
//                         <span className="cc-hint">
//                           {cust.warrEndDate && cust.warrStartDate
//                             ? `${Math.round((new Date(cust.warrEndDate) - new Date(cust.warrStartDate)) / (1000*60*60*24*30))} months warranty`
//                             : "e.g. 1 year after purchase"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//                 <div className="cc-form-footer">
//                   <div className="footer-note"><span style={{color:"var(--danger)"}}>*</span> Required fields</div>
//                   <div className="footer-acts">
//                     <button type="button" className="btn btn-ghost" onClick={() => setCust(EMPTY_CUST)} disabled={loading}>Clear</button>
//                     <button type="submit" className="btn btn-blue" disabled={loading}>
//                       {loading ? "Registering…" : <>Register Customer →</>}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* ══════════════════════════════════════
//               PRODUCT FORM
//               Has warranty dates + hardware categories
//           ══════════════════════════════════════ */}
//           {view === "product" && (
//             <div className="cc-card">
//               <div className="cc-card-top">
//                 <div className="cti green">🖥️</div>
//                 <div>
//                   <div className="cth">Hardware Product Registration</div>
//                   <div className="ctp">Register hardware to activate warranty and service request tracking.</div>
//                 </div>
//               </div>
//               <form onSubmit={submitProd}>
//                 <div className="cc-form-body">

//                   {/* Product Details */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico green">🔧</div>
//                       <div><div className="sec-ttl">Hardware Details</div><div className="sec-sub">Identify the hardware being registered</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Product Name <span className="req">*</span></label>
//                         <input className="cc-input" name="proName" value={prod.proName} onChange={onP} placeholder="e.g. Cisco 24-Port Switch" required />
//                       </div>

//                       {/* ✅ HARDWARE CATEGORIES DROPDOWN */}
//                       <div className="cc-field">
//                         <label className="cc-label">Hardware Category <span className="req">*</span></label>
//                         <select className="cc-select" name="proCatogory" value={prod.proCatogory} onChange={onP} required>
//                           <option value="">Select hardware category</option>
//                           {HARDWARE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
//                         </select>
//                       </div>

//                       <div className="cc-field">
//                         <label className="cc-label">Brand Name <span className="req">*</span></label>
//                         <input className="cc-input" name="brandName" value={prod.brandName} onChange={onP} placeholder="e.g. Cisco, HP, Dell" required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Model Number <span className="req">*</span></label>
//                         <input className="cc-input" name="proModNum" value={prod.proModNum} onChange={onP} placeholder="e.g. WS-C2960X-24TS" required />
//                       </div>
//                       <div className="cc-field full">
//                         <label className="cc-label">Serial Number <span className="req">*</span></label>
//                         <input className="cc-input" name="proSrNo" value={prod.proSrNo} onChange={onP} placeholder="e.g. FTX2024XXXXXXXX" required />
//                         <span className="cc-hint">Found on the device label or packaging</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Purchase Info */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico green">🧾</div>
//                       <div><div className="sec-ttl">Purchase Information</div><div className="sec-sub">Invoice and purchase details</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Purchase Date <span className="req">*</span></label>
//                         <input className="cc-input" type="date" name="purDate" value={prod.purDate} onChange={onP} required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Invoice Number <span className="req">*</span></label>
//                         <input className="cc-input" name="invoiceNum" value={prod.invoiceNum} onChange={onP} placeholder="INV-2024-001" required />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* ✅ WARRANTY DATES — NEW SECTION
//                       Matches your schema after uncommenting:
//                       warrStartDate: { type: Date, required: true }
//                       warrEndDate:   { type: Date, required: true }
//                   */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico green">🛡️</div>
//                       <div>
//                         <div className="sec-ttl">Warranty Period</div>
//                         <div className="sec-sub">Start and end date of warranty coverage</div>
//                       </div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty Start Date <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           type="date"
//                           name="warrStartDate"
//                           value={prod.warrStartDate}
//                           onChange={onP}
//                           required
//                         />
//                         <span className="cc-hint">Usually same as purchase date</span>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty End Date <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           type="date"
//                           name="warrEndDate"
//                           value={prod.warrEndDate}
//                           onChange={onP}
//                           required
//                         />
//                         <span className="cc-hint">
//                           {/* Auto-calculate hint */}
//                           {prod.warrEndDate && prod.warrStartDate
//                             ? `${Math.round((new Date(prod.warrEndDate) - new Date(prod.warrStartDate)) / (1000 * 60 * 60 * 24 * 30))} months warranty`
//                             : "e.g. 1 year after purchase"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//                 <div className="cc-form-footer">
//                   <div className="footer-note"><span style={{color:"var(--danger)"}}>*</span> All fields required</div>
//                   <div className="footer-acts">
//                     <button type="button" className="btn btn-ghost" onClick={() => setProd(EMPTY_PROD)} disabled={loading}>Clear</button>
//                     <button type="submit" className="btn btn-green" disabled={loading}>
//                       {loading ? "Registering…" : <>Register Product →</>}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* CREDENTIALS MODAL */}
//       {showCredentialsModal && (
//         <div className="cc-modal-overlay" onClick={() => setShowCredentialsModal(false)}>
//           <div className="cc-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon blue">🔐</div>
//             <div className="modal-title">Registration Successful!</div>
//             <div className="modal-subtitle">Auto-generated login credentials</div>
//             <div className="credential-item">
//               <div className="cred-label">Username (Email)</div>
//               <div className="cred-value">
//                 <span>{userCredentials.username}</span>
//                 <button className="copy-btn" onClick={() => copyToClipboard(userCredentials.username)}>Copy</button>
//               </div>
//             </div>
//             <div className="credential-item">
//               <div className="cred-label">Auto-Generated Password</div>
//               <div className="cred-value">
//                 <span style={{fontFamily:"monospace"}}>{userCredentials.password}</span>
//                 <button className="copy-btn" onClick={() => copyToClipboard(userCredentials.password)}>Copy</button>
//               </div>
//             </div>
//             <div className="modal-note">⚠️ Save these credentials now — they won't be shown again.</div>
//             <button className="btn btn-blue" onClick={() => setShowCredentialsModal(false)} style={{width:"100%"}}>
//               I've Saved the Credentials
//             </button>
//           </div>
//         </div>
//       )}

//       {/* TICKET MODAL */}
//       {showTicketModal && (
//         <div className="cc-modal-overlay" onClick={() => setShowTicketModal(false)}>
//           <div className="cc-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon green">🎫</div>
//             <div className="modal-title">Product Registered!</div>
//             <div className="modal-subtitle">{ticketInfo.message}</div>
//             <div className="ticket-display">
//               <div className="ticket-icon">#</div>
//               <div>
//                 <div className="ticket-label">Ticket Number</div>
//                 <div className="ticket-number">{ticketInfo.ticketNumber}</div>
//                 <div className="ticket-note">Share this with the customer for service requests</div>
//               </div>
//             </div>
//             <div className="credential-item">
//               <div className="cred-label">Ticket Number</div>
//               <div className="cred-value">
//                 <span style={{fontFamily:"monospace"}}>{ticketInfo.ticketNumber}</span>
//                 <button className="copy-btn" onClick={() => copyToClipboard(ticketInfo.ticketNumber)}>Copy</button>
//               </div>
//             </div>
//             <div className="modal-note info">ℹ️ Customer needs this ticket number to search their product and raise complaints.</div>
//             <button className="btn btn-green" onClick={() => setShowTicketModal(false)} style={{width:"100%"}}>Got It</button>
//           </div>
//         </div>
//       )}

//       {/* TOAST */}
//       {toast && (
//         <div className="cc-toast">
//           <div className={`toast-dot ${toast.type === "customer" ? "blue" : toast.type === "product" ? "green" : toast.type === "error" ? "red" : "blue"}`}>
//             {toast.type === "error" ? "✕" : "✓"}
//           </div>
//           <div>
//             <div className="toast-ttl">
//               {toast.type === "customer" && "Customer Registered!"}
//               {toast.type === "product" && "Product Registered!"}
//               {toast.type === "copy" && "Copied!"}
//               {toast.type === "error" && "Error"}
//             </div>
//             <div className="toast-sub">{toast.message}</div>
//           </div>
//           <button className="toast-x" onClick={() => setToast(null)}>✕</button>
//         </div>
//       )}
//     </>
//   );
// }

// import { useState } from "react";
// import React from 'react';
// import axiosInstance from "../../Utils/axiosIntance";

// // ─────────────────────────────────────────────────────────
// // HARDWARE CATEGORIES — updated for hardware company
// // ─────────────────────────────────────────────────────────
// const HARDWARE_CATS = [
//   // Networking
//   "Router",
//   "Network Switch",
//   "Firewall / UTM Device",
//   "Modem",
//   "Access Point / WiFi",
//   "Network Cable / Patch Panel",
//   // Servers & Storage
//   "Server",
//   "NAS / Storage Device",
//   "UPS / Power Supply",
//   "Rack / Cabinet",
//   // Computers
//   "Desktop Computer",
//   "Laptop",
//   "Workstation",
//   "Mini PC",
//   // Peripherals
//   "Monitor / Display",
//   "Keyboard / Mouse",
//   "Printer",
//   "Scanner",
//   "Projector",
//   "Barcode Scanner",
//   // Components
//   "Hard Disk / SSD",
//   "RAM / Memory",
//   "Graphics Card / GPU",
//   "Motherboard",
//   "Processor / CPU",
//   "Power Supply Unit (PSU)",
//   "Cooling Fan / Heatsink",
//   // Security
//   "CCTV Camera",
//   "DVR / NVR",
//   "Biometric Device",
//   "Access Control System",
//   // Communication
//   "IP Phone",
//   "EPABX / PBX System",
//   "Video Conferencing System",
//   // Other
//   "Other Hardware",
// ];

// // ─────────────────────────────────────────────────────────
// // FIX: State defined OUTSIDE and ABOVE forms
// // WHY: When user switches tabs, only view changes.
// //      cust and prod state stay alive in memory.
// //      This is why form data does NOT disappear!
// // ─────────────────────────────────────────────────────────
// const EMPTY_CUST = {
//   customerName: "",
//   email: "",
//   mobileNum: "",
//   proName: "",
//   proCatogory: "",
//   proSrNo: "",
//   proModNum: "",
//   ticketNumber: "",
//   warrStartDate: "",
//   warrEndDate: "",
// };

// const EMPTY_PROD = {
//   proName: "",
//   proCatogory: "",
//   proSrNo: "",
//   proModNum: "",
//   brandName: "",
//   purDate: "",
//   invoiceNum: "",
//   warrStartDate: "", // ✅ ADDED — matches schema after uncomment
//   warrEndDate: "",   // ✅ ADDED — matches schema after uncomment
// };

// const STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   :root {
//     --bg: #f0f2f5; --surface: #fff; --surface2: #f7f8fa;
//     --border: #e4e7ec; --border2: #d0d5dd;
//     --text: #101828; --muted: #667085; --subtle: #98a2b3;
//     --accent: #1a56db; --accent-lt: #ebf0ff;
//     --accent2: #0ea47a; --accent2-lt: #e6f7f2;
//     --danger: #d92d20; --warning: #f79009;
//     --shadow-sm: 0 1px 2px rgba(16,24,40,.05);
//     --shadow-md: 0 4px 16px rgba(16,24,40,.08);
//     --shadow-lg: 0 12px 40px rgba(16,24,40,.12);
//     --r-sm: 8px; --r-md: 12px; --r-lg: 18px; --r-xl: 24px;
//     --font: 'Plus Jakarta Sans', sans-serif;
//   }
//   .cc-wrap { min-height:100vh; background:var(--bg); font-family:var(--font); color:var(--text); display:flex; align-items:flex-start; justify-content:center; padding:40px 20px; }
//   .cc-container { width:100%; max-width:820px; }
//   .cc-page-title { font-size:32px; font-weight:800; color:var(--text); letter-spacing:-0.5px; margin-bottom:6px; text-align:center; }
//   .cc-page-desc { font-size:14px; color:var(--muted); margin-bottom:28px; text-align:center; }
//   .cc-tabs { display:flex; gap:8px; margin-bottom:24px; background:var(--surface); padding:6px; border-radius:var(--r-lg); border:1px solid var(--border); box-shadow:var(--shadow-sm); }
//   .cc-tab { flex:1; padding:12px 20px; border:none; background:transparent; border-radius:var(--r-md); font-family:var(--font); font-size:14px; font-weight:600; color:var(--muted); cursor:pointer; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
//   .cc-tab:hover { background:var(--surface2); color:var(--text); }
//   .cc-tab.active { background:var(--accent); color:white; box-shadow:0 2px 8px rgba(26,86,219,.2); }
//   .cc-tab.active.green { background:var(--accent2); box-shadow:0 2px 8px rgba(14,164,122,.2); }
//   .cc-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--shadow-md); animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both; }
//   @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
//   .cc-card-top { padding:24px 28px 20px; border-bottom:1px solid var(--border); display:flex; align-items:flex-start; gap:14px; background:linear-gradient(135deg,var(--surface) 0%,var(--surface2) 100%); }
//   .cti { width:48px; height:48px; border-radius:var(--r-md); display:flex; align-items:center; justify-content:center; font-size:24px; flex-shrink:0; }
//   .cti.blue { background:var(--accent-lt); } .cti.green { background:var(--accent2-lt); }
//   .cth { font-size:18px; font-weight:700; color:var(--text); } .ctp { font-size:13px; color:var(--muted); margin-top:4px; line-height:1.5; }
//   .cc-form-body { padding:28px; display:flex; flex-direction:column; gap:24px; }
//   .cc-sec-head { display:flex; align-items:center; gap:12px; padding-bottom:14px; border-bottom:1px solid var(--border); }
//   .sec-ico { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; }
//   .sec-ico.blue { background:var(--accent-lt); } .sec-ico.green { background:var(--accent2-lt); }
//   .sec-ttl { font-size:14px; font-weight:700; color:var(--text); } .sec-sub { font-size:12px; color:var(--muted); margin-top:2px; }
//   .cc-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:16px; }
//   .cc-grid.g3 { grid-template-columns:1fr 1fr 1fr; }
//   .full { grid-column:1/-1; }
//   .cc-field { display:flex; flex-direction:column; gap:6px; }
//   .cc-label { font-size:13px; font-weight:600; color:var(--text); display:flex; align-items:center; gap:4px; }
//   .req { color:var(--danger); font-size:14px; } .cc-hint { font-size:11.5px; color:var(--subtle); margin-top:2px; }
//   .cc-input, .cc-select { width:100%; height:42px; padding:0 14px; border:1.5px solid var(--border2); border-radius:var(--r-sm); background:var(--surface); font-family:var(--font); font-size:14px; font-weight:500; color:var(--text); transition:border-color .15s,box-shadow .15s,background .15s; outline:none; -webkit-appearance:none; appearance:none; }
//   .cc-input::placeholder { color:var(--subtle); font-weight:400; }
//   .cc-input:hover, .cc-select:hover { border-color:#b0bac7; }
//   .cc-input:focus, .cc-select:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(26,86,219,.12); background:#fafcff; }
//   .cc-select { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2398a2b3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; padding-right:36px; cursor:pointer; }
//   .cc-divider { height:1px; background:var(--border); }
//   .cc-form-footer { padding:20px 28px; background:var(--surface2); border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
//   .footer-note { font-size:12px; color:var(--muted); } .footer-acts { display:flex; gap:10px; }
//   .btn { display:inline-flex; align-items:center; gap:7px; height:40px; padding:0 20px; border-radius:var(--r-sm); font-family:var(--font); font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all .18s ease; }
//   .btn-ghost { background:transparent; color:var(--muted); border:1.5px solid var(--border2); }
//   .btn-ghost:hover { background:var(--surface2); color:var(--text); border-color:#b0bac7; }
//   .btn-blue { background:var(--accent); color:white; box-shadow:0 1px 3px rgba(26,86,219,.3),0 4px 12px rgba(26,86,219,.18); }
//   .btn-blue:hover { background:#1447c0; transform:translateY(-1px); }
//   .btn-green { background:var(--accent2); color:white; box-shadow:0 1px 3px rgba(14,164,122,.3),0 4px 12px rgba(14,164,122,.18); }
//   .btn-green:hover { background:#0b8c67; transform:translateY(-1px); }
//   .btn:disabled { opacity:0.65; cursor:not-allowed; transform:none !important; }
//   .cc-modal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
//   .cc-modal { background:var(--surface); border-radius:var(--r-xl); padding:36px; max-width:480px; width:90%; box-shadow:var(--shadow-lg); animation:fadeUp .3s ease both; }
//   .modal-icon { width:72px; height:72px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 24px; font-size:36px; }
//   .modal-icon.blue { background:var(--accent-lt); } .modal-icon.green { background:var(--accent2-lt); }
//   .modal-title { font-size:22px; font-weight:700; color:var(--text); text-align:center; margin-bottom:8px; }
//   .modal-subtitle { font-size:14px; color:var(--muted); text-align:center; margin-bottom:28px; }
//   .credential-item { background:var(--surface2); border:1px solid var(--border); border-radius:var(--r-md); padding:14px 18px; margin-bottom:14px; }
//   .cred-label { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; color:var(--subtle); margin-bottom:6px; }
//   .cred-value { font-size:15px; font-weight:600; color:var(--text); display:flex; align-items:center; justify-content:space-between; word-break:break-all; }
//   .copy-btn { background:none; border:none; color:var(--accent); cursor:pointer; padding:6px 10px; border-radius:var(--r-sm); font-size:12px; font-weight:600; transition:all .15s; flex-shrink:0; margin-left:8px; }
//   .copy-btn:hover { background:var(--accent-lt); }
//   .modal-note { font-size:13px; text-align:center; margin:20px 0; padding:12px; border-radius:var(--r-md); border:1px solid #fedf89; background:#fffaeb; color:var(--warning); line-height:1.5; }
//   .modal-note.info { color:var(--accent); background:var(--accent-lt); border-color:#b3d0ff; }
//   .ticket-display { background:linear-gradient(135deg,var(--accent2-lt),#f0faf7); border:1px solid var(--accent2); border-radius:var(--r-lg); padding:16px 20px; margin-bottom:20px; display:flex; align-items:center; gap:16px; }
//   .ticket-icon { width:48px; height:48px; background:var(--accent2); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:20px; flex-shrink:0; }
//   .ticket-label { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; color:var(--accent2); margin-bottom:4px; }
//   .ticket-number { font-size:24px; font-weight:700; color:var(--text); font-family:monospace; letter-spacing:1px; }
//   .ticket-note { font-size:12px; color:var(--muted); margin-top:4px; }
//   .cc-toast { position:fixed; bottom:24px; right:24px; background:white; border:1px solid var(--border); border-radius:var(--r-lg); padding:16px 18px; box-shadow:var(--shadow-lg); display:flex; align-items:center; gap:14px; z-index:200; min-width:300px; animation:fadeUp .35s ease both; }
//   .toast-dot { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
//   .toast-dot.blue { background:var(--accent-lt); color:var(--accent); }
//   .toast-dot.green { background:var(--accent2-lt); color:var(--accent2); }
//   .toast-dot.red { background:#fef3f2; color:var(--danger); }
//   .toast-ttl { font-size:15px; font-weight:700; color:var(--text); } .toast-sub { font-size:13px; color:var(--muted); margin-top:3px; }
//   .toast-x { margin-left:auto; background:none; border:none; cursor:pointer; color:var(--subtle); font-size:16px; padding:4px; border-radius:5px; transition:background .15s; }
//   .toast-x:hover { background:var(--surface2); color:var(--text); }
//   @media(max-width:768px) { .cc-wrap{padding:20px 12px;} .cc-grid,.cc-grid.g3{grid-template-columns:1fr;} .cc-page-title{font-size:26px;} }
// `;

// export default function CustomerCareHome() {
//   const [view, setView] = useState("customer");
//   const [toast, setToast] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ─────────────────────────────────────────────────────
//   // KEY CONCEPT: State lives HERE in parent, NOT in forms
//   // When view switches: customer ↔ product
//   //   - Only the VIEW changes (what's visible)
//   //   - cust and prod state STAY in memory untouched
//   //   - So form data is preserved when switching tabs!
//   // ─────────────────────────────────────────────────────
//   const [cust, setCust] = useState(EMPTY_CUST);
//   const [prod, setProd] = useState(EMPTY_PROD);

//   // Modal state
//   const [showCredentialsModal, setShowCredentialsModal] = useState(false);
//   const [userCredentials, setUserCredentials] = useState({ username: "", password: "" });
//   const [showTicketModal, setShowTicketModal] = useState(false);
//   const [ticketInfo, setTicketInfo] = useState({ ticketNumber: "", message: "" });

//   const show = (type, msg = null) => {
//     setToast({ type, message: msg });
//     setTimeout(() => setToast(null), 3500);
//   };

//   // ✅ onC updates ONLY the field that changed, preserving all others
//   // Spread operator ...cust copies all existing fields first
//   // Then [e.target.name]: e.target.value overwrites only the changed one
//   const onC = (e) => setCust({ ...cust, [e.target.name]: e.target.value });
//   const onP = (e) => setProd({ ...prod, [e.target.name]: e.target.value });

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     show("copy", "Copied to clipboard!");
//   };

//   // ── SUBMIT CUSTOMER ──
//   const submitCust = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       // ✅ Send all fields explicitly to backend
//       // Backend (newCustomer.controller.js) reads these from req.body
//       // ticketNumber → stored as TicketNumber in CustomerDetail model
//       // warrStartDate/warrEndDate → converted to Date in controller
//       const payload = {
//         customerName:  cust.customerName,
//         email:         cust.email,
//         mobileNum:     cust.mobileNum,
//         proName:       cust.proName,
//         proCatogory:   cust.proCatogory,
//         proSrNo:       cust.proSrNo,
//         proModNum:     cust.proModNum,
//         ticketNumber:  cust.ticketNumber,    // ← links customer to product
//         warrStartDate: cust.warrStartDate,   // ← used for warranty duration display
//         warrEndDate:   cust.warrEndDate,     // ← used to check valid/expired in UserPanel
//       };

//       console.log("📤 Sending to backend:", payload); // remove in production

//       const response = await axiosInstance.post("/customerDetails/newcustomer", payload);

//       if (response.data.password) {
//         setUserCredentials({
//           username: response.data.username || cust.email,
//           password: response.data.password,
//         });
//         setShowCredentialsModal(true);
//       }
//       show("customer", "Customer registered successfully!");
//       setCust(EMPTY_CUST);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Customer registration failed";
//       setError(msg);
//       show("error", msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── SUBMIT PRODUCT ──
//   // Sends to POST /api/customerDetails/newproduct (or your actual route)
//   const submitProd = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post("/customerDetails/newproduct", prod);
//       if (response.data.TicketNumber || response.data.ticketNumber) {
//         setTicketInfo({
//           ticketNumber: response.data.TicketNumber || response.data.ticketNumber,
//           message: response.data.message || "Product registered successfully!"
//         });
//         setShowTicketModal(true);
//       }
//       show("product", "Product registered successfully!");
//       setProd(EMPTY_PROD);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Product registration failed";
//       setError(msg);
//       show("error", msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{STYLES}</style>
//       <div className="cc-wrap">
//         <div className="cc-container">

//           <div className="cc-page-title">
//             {view === "customer" ? "Customer Registration" : "Product Registration"}
//           </div>
//           <div className="cc-page-desc">
//             {view === "customer"
//               ? "Add a new customer to the support system for warranty and service access."
//               : "Register a hardware product to activate warranty coverage and service tracking."}
//           </div>

//           {/* ── TAB NAVIGATION ──
//               Switching tabs only changes `view` state
//               cust and prod state are UNTOUCHED = data preserved!
//           */}
//           <div className="cc-tabs">
//             <button
//               className={`cc-tab ${view === "customer" ? "active" : ""}`}
//               onClick={() => { setView("customer"); setError(null); }}
//             >
//               <span>👤</span> Customer Registration
//             </button>
//             <button
//               className={`cc-tab ${view === "product" ? "active green" : ""}`}
//               onClick={() => { setView("product"); setError(null); }}
//             >
//               <span>🖥️</span> Product Registration
//             </button>
//           </div>

//           {error && (
//             <div style={{ background:"#fef3f2", border:"1px solid #fecdca", borderRadius:"var(--r-md)", padding:"14px 18px", marginBottom:"24px", color:"var(--danger)", fontSize:"13px", textAlign:"center" }}>
//               {error}
//             </div>
//           )}

//           {/* ══════════════════════════════════════
//               CUSTOMER FORM
//               Hidden when view="product" but STATE STAYS ALIVE
//               That's why data doesn't disappear!
//           ══════════════════════════════════════ */}
//           {view === "customer" && (
//             <div className="cc-card">
//               <div className="cc-card-top">
//                 <div className="cti blue">👤</div>
//                 <div>
//                   <div className="cth">New Customer Registration</div>
//                   <div className="ctp">Register a customer to grant access to warranty claims and support history.</div>
//                 </div>
//               </div>
//               <form onSubmit={submitCust}>
//                 <div className="cc-form-body">

//                   {/* Personal Info */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">🪪</div>
//                       <div><div className="sec-ttl">Personal Information</div><div className="sec-sub">Basic contact details</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field full">
//                         <label className="cc-label">Full Name <span className="req">*</span></label>
//                         <input className="cc-input" name="customerName" value={cust.customerName} onChange={onC} placeholder="e.g. Rahul Sharma" required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Email Address <span className="req">*</span></label>
//                         <input className="cc-input" type="email" name="email" value={cust.email} onChange={onC} placeholder="rahul@example.com" required />
//                         <span className="cc-hint">Used as login username</span>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Mobile Number <span className="req">*</span></label>
//                         <input className="cc-input" type="tel" name="mobileNum" value={cust.mobileNum} onChange={onC} placeholder="+91 98765 43210" required />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Product Info */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">📦</div>
//                       <div><div className="sec-ttl">Product Information</div><div className="sec-sub">Hardware product linked to this customer</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Product Name <span className="req">*</span></label>
//                         <input className="cc-input" name="proName" value={cust.proName} onChange={onC} placeholder="e.g. Cisco 24-Port Switch" required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Product Category <span className="req">*</span></label>
//                         <select className="cc-select" name="proCatogory" value={cust.proCatogory} onChange={onC} required>
//                           <option value="">Select hardware category</option>
//                           {HARDWARE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
//                         </select>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Serial Number <span className="req">*</span></label>
//                         <input className="cc-input" name="proSrNo" value={cust.proSrNo} onChange={onC} placeholder="e.g. SN2024XXXXXX" required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Model Number <span className="req">*</span></label>
//                         <input className="cc-input" name="proModNum" value={cust.proModNum} onChange={onC} placeholder="e.g. WS-C2960X-24TS" required />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Ticket Number */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">🎫</div>
//                       <div><div className="sec-ttl">Product Verification</div><div className="sec-sub">Enter the ticket number from product registration</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field full">
//                         <label className="cc-label">Ticket Number <span className="req">*</span></label>
//                         <input className="cc-input" name="ticketNumber" value={cust.ticketNumber} onChange={onC} placeholder="e.g. TKT-20260214-25671" required style={{fontFamily:"monospace", fontSize:"15px"}} />
//                         <span className="cc-hint">ℹ️ Generated when product was registered — links customer to their warranty</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Warranty Info */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">🛡️</div>
//                       <div><div className="sec-ttl">Warranty Information</div><div className="sec-sub">Warranty coverage period for the linked product</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty Start Date <span className="req">*</span></label>
//                         <input className="cc-input" type="date" name="warrStartDate" value={cust.warrStartDate} onChange={onC} required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty End Date <span className="req">*</span></label>
//                         <input className="cc-input" type="date" name="warrEndDate" value={cust.warrEndDate} onChange={onC} required />
//                         <span className="cc-hint">
//                           {cust.warrEndDate && cust.warrStartDate
//                             ? `${Math.round((new Date(cust.warrEndDate) - new Date(cust.warrStartDate)) / (1000*60*60*24*30))} months warranty`
//                             : "e.g. 1 year after purchase"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//                 <div className="cc-form-footer">
//                   <div className="footer-note"><span style={{color:"var(--danger)"}}>*</span> Required fields</div>
//                   <div className="footer-acts">
//                     <button type="button" className="btn btn-ghost" onClick={() => setCust(EMPTY_CUST)} disabled={loading}>Clear</button>
//                     <button type="submit" className="btn btn-blue" disabled={loading}>
//                       {loading ? "Registering…" : <>Register Customer →</>}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* ══════════════════════════════════════
//               PRODUCT FORM
//               Has warranty dates + hardware categories
//           ══════════════════════════════════════ */}
//           {view === "product" && (
//             <div className="cc-card">
//               <div className="cc-card-top">
//                 <div className="cti green">🖥️</div>
//                 <div>
//                   <div className="cth">Hardware Product Registration</div>
//                   <div className="ctp">Register hardware to activate warranty and service request tracking.</div>
//                 </div>
//               </div>
//               <form onSubmit={submitProd}>
//                 <div className="cc-form-body">

//                   {/* Product Details */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico green">🔧</div>
//                       <div><div className="sec-ttl">Hardware Details</div><div className="sec-sub">Identify the hardware being registered</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Product Name <span className="req">*</span></label>
//                         <input className="cc-input" name="proName" value={prod.proName} onChange={onP} placeholder="e.g. Cisco 24-Port Switch" required />
//                       </div>

//                       {/* ✅ HARDWARE CATEGORIES DROPDOWN */}
//                       <div className="cc-field">
//                         <label className="cc-label">Hardware Category <span className="req">*</span></label>
//                         <select className="cc-select" name="proCatogory" value={prod.proCatogory} onChange={onP} required>
//                           <option value="">Select hardware category</option>
//                           {HARDWARE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
//                         </select>
//                       </div>

//                       <div className="cc-field">
//                         <label className="cc-label">Brand Name <span className="req">*</span></label>
//                         <input className="cc-input" name="brandName" value={prod.brandName} onChange={onP} placeholder="e.g. Cisco, HP, Dell" required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Model Number <span className="req">*</span></label>
//                         <input className="cc-input" name="proModNum" value={prod.proModNum} onChange={onP} placeholder="e.g. WS-C2960X-24TS" required />
//                       </div>
//                       <div className="cc-field full">
//                         <label className="cc-label">Serial Number <span className="req">*</span></label>
//                         <input className="cc-input" name="proSrNo" value={prod.proSrNo} onChange={onP} placeholder="e.g. FTX2024XXXXXXXX" required />
//                         <span className="cc-hint">Found on the device label or packaging</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Purchase Info */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico green">🧾</div>
//                       <div><div className="sec-ttl">Purchase Information</div><div className="sec-sub">Invoice and purchase details</div></div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Purchase Date <span className="req">*</span></label>
//                         <input className="cc-input" type="date" name="purDate" value={prod.purDate} onChange={onP} required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Invoice Number <span className="req">*</span></label>
//                         <input className="cc-input" name="invoiceNum" value={prod.invoiceNum} onChange={onP} placeholder="INV-2024-001" required />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* ✅ WARRANTY DATES — NEW SECTION
//                       Matches your schema after uncommenting:
//                       warrStartDate: { type: Date, required: true }
//                       warrEndDate:   { type: Date, required: true }
//                   */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico green">🛡️</div>
//                       <div>
//                         <div className="sec-ttl">Warranty Period</div>
//                         <div className="sec-sub">Start and end date of warranty coverage</div>
//                       </div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty Start Date <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           type="date"
//                           name="warrStartDate"
//                           value={prod.warrStartDate}
//                           onChange={onP}
//                           required
//                         />
//                         <span className="cc-hint">Usually same as purchase date</span>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty End Date <span className="req">*</span></label>
//                         <input
//                           className="cc-input"
//                           type="date"
//                           name="warrEndDate"
//                           value={prod.warrEndDate}
//                           onChange={onP}
//                           required
//                         />
//                         <span className="cc-hint">
//                           {/* Auto-calculate hint */}
//                           {prod.warrEndDate && prod.warrStartDate
//                             ? `${Math.round((new Date(prod.warrEndDate) - new Date(prod.warrStartDate)) / (1000 * 60 * 60 * 24 * 30))} months warranty`
//                             : "e.g. 1 year after purchase"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//                 <div className="cc-form-footer">
//                   <div className="footer-note"><span style={{color:"var(--danger)"}}>*</span> All fields required</div>
//                   <div className="footer-acts">
//                     <button type="button" className="btn btn-ghost" onClick={() => setProd(EMPTY_PROD)} disabled={loading}>Clear</button>
//                     <button type="submit" className="btn btn-green" disabled={loading}>
//                       {loading ? "Registering…" : <>Register Product →</>}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* CREDENTIALS MODAL */}
//       {showCredentialsModal && (
//         <div className="cc-modal-overlay" onClick={() => setShowCredentialsModal(false)}>
//           <div className="cc-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon blue">🔐</div>
//             <div className="modal-title">Registration Successful!</div>
//             <div className="modal-subtitle">Auto-generated login credentials</div>
//             <div className="credential-item">
//               <div className="cred-label">Username (Email)</div>
//               <div className="cred-value">
//                 <span>{userCredentials.username}</span>
//                 <button className="copy-btn" onClick={() => copyToClipboard(userCredentials.username)}>Copy</button>
//               </div>
//             </div>
//             <div className="credential-item">
//               <div className="cred-label">Auto-Generated Password</div>
//               <div className="cred-value">
//                 <span style={{fontFamily:"monospace"}}>{userCredentials.password}</span>
//                 <button className="copy-btn" onClick={() => copyToClipboard(userCredentials.password)}>Copy</button>
//               </div>
//             </div>
//             <div className="modal-note">⚠️ Save these credentials now — they won't be shown again.</div>
//             <button className="btn btn-blue" onClick={() => setShowCredentialsModal(false)} style={{width:"100%"}}>
//               I've Saved the Credentials
//             </button>
//           </div>
//         </div>
//       )}

//       {/* TICKET MODAL */}
//       {showTicketModal && (
//         <div className="cc-modal-overlay" onClick={() => setShowTicketModal(false)}>
//           <div className="cc-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon green">🎫</div>
//             <div className="modal-title">Product Registered!</div>
//             <div className="modal-subtitle">{ticketInfo.message}</div>
//             <div className="ticket-display">
//               <div className="ticket-icon">#</div>
//               <div>
//                 <div className="ticket-label">Ticket Number</div>
//                 <div className="ticket-number">{ticketInfo.ticketNumber}</div>
//                 <div className="ticket-note">Share this with the customer for service requests</div>
//               </div>
//             </div>
//             <div className="credential-item">
//               <div className="cred-label">Ticket Number</div>
//               <div className="cred-value">
//                 <span style={{fontFamily:"monospace"}}>{ticketInfo.ticketNumber}</span>
//                 <button className="copy-btn" onClick={() => copyToClipboard(ticketInfo.ticketNumber)}>Copy</button>
//               </div>
//             </div>
//             <div className="modal-note info">ℹ️ Customer needs this ticket number to search their product and raise complaints.</div>
//             <button className="btn btn-green" onClick={() => setShowTicketModal(false)} style={{width:"100%"}}>Got It</button>
//           </div>
//         </div>
//       )}

//       {/* TOAST */}
//       {toast && (
//         <div className="cc-toast">
//           <div className={`toast-dot ${toast.type === "customer" ? "blue" : toast.type === "product" ? "green" : toast.type === "error" ? "red" : "blue"}`}>
//             {toast.type === "error" ? "✕" : "✓"}
//           </div>
//           <div>
//             <div className="toast-ttl">
//               {toast.type === "customer" && "Customer Registered!"}
//               {toast.type === "product" && "Product Registered!"}
//               {toast.type === "copy" && "Copied!"}
//               {toast.type === "error" && "Error"}
//             </div>
//             <div className="toast-sub">{toast.message}</div>
//           </div>
//           <button className="toast-x" onClick={() => setToast(null)}>✕</button>
//         </div>
//       )}
//     </>
//   );
// }

import React, { useState } from "react";
import axiosInstance from "../../Utils/axiosIntance"; // Make sure this import path is correct

// Hardware categories constant
const HARDWARE_CATS = [
  "Networking Equipment",
  "Server Hardware", 
  "Storage Devices",
  "Peripherals",
  "Cabling",
  "Racks & Enclosures",
  "Other"
];

const EMPTY_CUST = {
  customerName: "",
  email: "",
  mobileNum: "",
  proName: "",
  proCatogory: "",
  proSrNo: "",
  proModNum: "",
  ticketNumber: "", // ✅ Ticket number field
  warrStartDate: "",
  warrEndDate: "",
};

const EMPTY_PROD = {
  proName: "",
  proCatogory: "",
  proSrNo: "",
  proModNum: "",
  brandName: "",
  purDate: "",
  invoiceNum: "",
  warrStartDate: "",
  warrEndDate: "",
};

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f0f2f5; --surface: #fff; --surface2: #f7f8fa;
    --border: #e4e7ec; --border2: #d0d5dd;
    --text: #101828; --muted: #667085; --subtle: #98a2b3;
    --accent: #1a56db; --accent-lt: #ebf0ff;
    --accent2: #0ea47a; --accent2-lt: #e6f7f2;
    --danger: #d92d20; --warning: #f79009;
    --shadow-sm: 0 1px 2px rgba(16,24,40,.05);
    --shadow-md: 0 4px 16px rgba(16,24,40,.08);
    --shadow-lg: 0 12px 40px rgba(16,24,40,.12);
    --r-sm: 8px; --r-md: 12px; --r-lg: 18px; --r-xl: 24px;
    --font: 'Plus Jakarta Sans', sans-serif;
  }
  .cc-wrap { min-height:100vh; background:var(--bg); font-family:var(--font); color:var(--text); display:flex; align-items:flex-start; justify-content:center; padding:40px 20px; }
  .cc-container { width:100%; max-width:820px; }
  .cc-page-title { font-size:32px; font-weight:800; color:var(--text); letter-spacing:-0.5px; margin-bottom:6px; text-align:center; }
  .cc-page-desc { font-size:14px; color:var(--muted); margin-bottom:28px; text-align:center; }
  .cc-tabs { display:flex; gap:8px; margin-bottom:24px; background:var(--surface); padding:6px; border-radius:var(--r-lg); border:1px solid var(--border); box-shadow:var(--shadow-sm); }
  .cc-tab { flex:1; padding:12px 20px; border:none; background:transparent; border-radius:var(--r-md); font-family:var(--font); font-size:14px; font-weight:600; color:var(--muted); cursor:pointer; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
  .cc-tab:hover { background:var(--surface2); color:var(--text); }
  .cc-tab.active { background:var(--accent); color:white; box-shadow:0 2px 8px rgba(26,86,219,.2); }
  .cc-tab.active.green { background:var(--accent2); box-shadow:0 2px 8px rgba(14,164,122,.2); }
  .cc-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--shadow-md); animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  .cc-card-top { padding:24px 28px 20px; border-bottom:1px solid var(--border); display:flex; align-items:flex-start; gap:14px; background:linear-gradient(135deg,var(--surface) 0%,var(--surface2) 100%); }
  .cti { width:48px; height:48px; border-radius:var(--r-md); display:flex; align-items:center; justify-content:center; font-size:24px; flex-shrink:0; }
  .cti.blue { background:var(--accent-lt); } .cti.green { background:var(--accent2-lt); }
  .cth { font-size:18px; font-weight:700; color:var(--text); } .ctp { font-size:13px; color:var(--muted); margin-top:4px; line-height:1.5; }
  .cc-form-body { padding:28px; display:flex; flex-direction:column; gap:24px; }
  .cc-sec-head { display:flex; align-items:center; gap:12px; padding-bottom:14px; border-bottom:1px solid var(--border); }
  .sec-ico { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; }
  .sec-ico.blue { background:var(--accent-lt); } .sec-ico.green { background:var(--accent2-lt); }
  .sec-ttl { font-size:14px; font-weight:700; color:var(--text); } .sec-sub { font-size:12px; color:var(--muted); margin-top:2px; }
  .cc-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:16px; }
  .cc-grid.g3 { grid-template-columns:1fr 1fr 1fr; }
  .full { grid-column:1/-1; }
  .cc-field { display:flex; flex-direction:column; gap:6px; }
  .cc-label { font-size:13px; font-weight:600; color:var(--text); display:flex; align-items:center; gap:4px; }
  .req { color:var(--danger); font-size:14px; } .cc-hint { font-size:11.5px; color:var(--subtle); margin-top:2px; }
  .cc-input, .cc-select { width:100%; height:42px; padding:0 14px; border:1.5px solid var(--border2); border-radius:var(--r-sm); background:var(--surface); font-family:var(--font); font-size:14px; font-weight:500; color:var(--text); transition:border-color .15s,box-shadow .15s,background .15s; outline:none; -webkit-appearance:none; appearance:none; }
  .cc-input::placeholder { color:var(--subtle); font-weight:400; }
  .cc-input:hover, .cc-select:hover { border-color:#b0bac7; }
  .cc-input:focus, .cc-select:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(26,86,219,.12); background:#fafcff; }
  .cc-select { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2398a2b3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; padding-right:36px; cursor:pointer; }
  .cc-divider { height:1px; background:var(--border); }
  .cc-form-footer { padding:20px 28px; background:var(--surface2); border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
  .footer-note { font-size:12px; color:var(--muted); } .footer-acts { display:flex; gap:10px; }
  .btn { display:inline-flex; align-items:center; gap:7px; height:40px; padding:0 20px; border-radius:var(--r-sm); font-family:var(--font); font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all .18s ease; }
  .btn-ghost { background:transparent; color:var(--muted); border:1.5px solid var(--border2); }
  .btn-ghost:hover { background:var(--surface2); color:var(--text); border-color:#b0bac7; }
  .btn-blue { background:var(--accent); color:white; box-shadow:0 1px 3px rgba(26,86,219,.3),0 4px 12px rgba(26,86,219,.18); }
  .btn-blue:hover { background:#1447c0; transform:translateY(-1px); }
  .btn-green { background:var(--accent2); color:white; box-shadow:0 1px 3px rgba(14,164,122,.3),0 4px 12px rgba(14,164,122,.18); }
  .btn-green:hover { background:#0b8c67; transform:translateY(-1px); }
  .btn:disabled { opacity:0.65; cursor:not-allowed; transform:none !important; }
  .cc-modal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; backdrop-filter:blur(4px); }
  .cc-modal { background:var(--surface); border-radius:var(--r-xl); padding:36px; max-width:480px; width:90%; box-shadow:var(--shadow-lg); animation:fadeUp .3s ease both; }
  .modal-icon { width:72px; height:72px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 24px; font-size:36px; }
  .modal-icon.blue { background:var(--accent-lt); color:var(--accent); } .modal-icon.green { background:var(--accent2-lt); color:var(--accent2); }
  .modal-title { font-size:22px; font-weight:700; color:var(--text); text-align:center; margin-bottom:8px; }
  .modal-subtitle { font-size:14px; color:var(--muted); text-align:center; margin-bottom:28px; }
  .credential-item { background:var(--surface2); border:1px solid var(--border); border-radius:var(--r-md); padding:14px 18px; margin-bottom:14px; }
  .cred-label { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; color:var(--subtle); margin-bottom:6px; }
  .cred-value { font-size:15px; font-weight:600; color:var(--text); display:flex; align-items:center; justify-content:space-between; word-break:break-all; }
  .copy-btn { background:none; border:none; color:var(--accent); cursor:pointer; padding:6px 10px; border-radius:var(--r-sm); font-size:12px; font-weight:600; transition:all .15s; flex-shrink:0; margin-left:8px; }
  .copy-btn:hover { background:var(--accent-lt); }
  .modal-note { font-size:13px; text-align:center; margin:20px 0; padding:12px; border-radius:var(--r-md); border:1px solid #fedf89; background:#fffaeb; color:#b54708; line-height:1.5; }
  .modal-note.info { color:var(--accent); background:var(--accent-lt); border-color:#b3d0ff; }
  .ticket-display { background:linear-gradient(135deg,var(--accent2-lt),#f0faf7); border:1px solid var(--accent2); border-radius:var(--r-lg); padding:16px 20px; margin-bottom:20px; display:flex; align-items:center; gap:16px; }
  .ticket-icon { width:48px; height:48px; background:var(--accent2); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:20px; flex-shrink:0; }
  .ticket-label { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; color:var(--accent2); margin-bottom:4px; }
  .ticket-number { font-size:24px; font-weight:700; color:var(--text); font-family:monospace; letter-spacing:1px; }
  .ticket-note { font-size:12px; color:var(--muted); margin-top:4px; }
  .cc-toast { position:fixed; bottom:24px; right:24px; background:white; border:1px solid var(--border); border-radius:var(--r-lg); padding:16px 18px; box-shadow:var(--shadow-lg); display:flex; align-items:center; gap:14px; z-index:200; min-width:300px; animation:fadeUp .35s ease both; }
  .toast-dot { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
  .toast-dot.blue { background:var(--accent-lt); color:var(--accent); }
  .toast-dot.green { background:var(--accent2-lt); color:var(--accent2); }
  .toast-dot.red { background:#fef3f2; color:var(--danger); }
  .toast-ttl { font-size:15px; font-weight:700; color:var(--text); } .toast-sub { font-size:13px; color:var(--muted); margin-top:3px; }
  .toast-x { margin-left:auto; background:none; border:none; cursor:pointer; color:var(--subtle); font-size:16px; padding:4px; border-radius:5px; transition:background .15s; }
  .toast-x:hover { background:var(--surface2); color:var(--text); }
  @media(max-width:768px) { .cc-wrap{padding:20px 12px;} .cc-grid,.cc-grid.g3{grid-template-columns:1fr;} .cc-page-title{font-size:26px;} }
`;

export default function CustomerCareHome() {
  const [view, setView] = useState("customer");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for forms - preserved when switching tabs
  const [cust, setCust] = useState(EMPTY_CUST);
  const [prod, setProd] = useState(EMPTY_PROD);

  // Modal state
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ username: "", password: "" });
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({ ticketNumber: "", message: "" });

  const show = (type, msg = null) => {
    setToast({ type, message: msg });
    setTimeout(() => setToast(null), 3500);
  };

  // Update handlers
  const onC = (e) => setCust({ ...cust, [e.target.name]: e.target.value });
  const onP = (e) => setProd({ ...prod, [e.target.name]: e.target.value });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    show("copy", "Copied to clipboard!");
  };

  // ── SUBMIT CUSTOMER ──
  const submitCust = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Log the data being sent (for debugging)
      console.log("Submitting customer data:", cust);
      
      const response = await axiosInstance.post("/customerDetails/newcustomer", cust);
      
      if (response.data.password) {
        setUserCredentials({
          username: response.data.username || cust.customerName, // Using customerName as username
          password: response.data.password,
        });
        setShowCredentialsModal(true);
      }
      
      show("customer", "Customer registered successfully!");
      setCust(EMPTY_CUST); // Reset form after success
    } catch (err) {
      const msg = err.response?.data?.message || "Customer registration failed";
      setError(msg);
      show("error", msg);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── SUBMIT PRODUCT ──
  const submitProd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log("Submitting product data:", prod);
      
      const response = await axiosInstance.post("/auth/register", prod);
      
      if (response.data.TicketNumber || response.data.ticketNumber) {
        setTicketInfo({
          ticketNumber: response.data.TicketNumber || response.data.ticketNumber,
          message: response.data.message || "Product registered successfully!"
        });
        setShowTicketModal(true);
      }
      
      show("product", "Product registered successfully!");
      setProd(EMPTY_PROD);
    } catch (err) {
      const msg = err.response?.data?.message || "Product registration failed";
      setError(msg);
      show("error", msg);
      console.error("Product registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="cc-wrap">
        <div className="cc-container">

          <div className="cc-page-title">
            {view === "customer" ? "Customer Registration" : "Product Registration"}
          </div>
          <div className="cc-page-desc">
            {view === "customer"
              ? "Add a new customer to the support system for warranty and service access."
              : "Register a hardware product to activate warranty coverage and service tracking."}
          </div>

          {/* Tab Navigation */}
          <div className="cc-tabs">
            <button
              className={`cc-tab ${view === "customer" ? "active" : ""}`}
              onClick={() => { setView("customer"); setError(null); }}
            >
              <span>👤</span> Customer Registration
            </button>
            <button
              className={`cc-tab ${view === "product" ? "active green" : ""}`}
              onClick={() => { setView("product"); setError(null); }}
            >
              <span>🖥️</span> Product Registration
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div style={{ 
              background:"#fef3f2", 
              border:"1px solid #fecdca", 
              borderRadius:"var(--r-md)", 
              padding:"14px 18px", 
              marginBottom:"24px", 
              color:"var(--danger)", 
              fontSize:"13px", 
              textAlign:"center" 
            }}>
              {error}
            </div>
          )}

          {/* Customer Registration Form */}
          {view === "customer" && (
            <div className="cc-card">
              <div className="cc-card-top">
                <div className="cti blue">👤</div>
                <div>
                  <div className="cth">New Customer Registration</div>
                  <div className="ctp">Register a customer to grant access to warranty claims and support history.</div>
                </div>
              </div>
              
              <form onSubmit={submitCust}>
                <div className="cc-form-body">

                  {/* Personal Info */}
                  <div>
                    <div className="cc-sec-head">
                      <div className="sec-ico blue">🪪</div>
                      <div>
                        <div className="sec-ttl">Personal Information</div>
                        <div className="sec-sub">Basic contact details</div>
                      </div>
                    </div>
                    <div className="cc-grid">
                      <div className="cc-field full">
                        <label className="cc-label">
                          Full Name <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          name="customerName" 
                          value={cust.customerName} 
                          onChange={onC} 
                          placeholder="e.g. Rahul Sharma" 
                          required 
                        />
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Email Address <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          type="email" 
                          name="email" 
                          value={cust.email} 
                          onChange={onC} 
                          placeholder="rahul@example.com" 
                          required 
                        />
                        <span className="cc-hint">Used for communication</span>
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Mobile Number <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          type="tel" 
                          name="mobileNum" 
                          value={cust.mobileNum} 
                          onChange={onC} 
                          placeholder="9876543210" 
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cc-divider" />

                  {/* Product Info */}
                  <div>
                    <div className="cc-sec-head">
                      <div className="sec-ico blue">📦</div>
                      <div>
                        <div className="sec-ttl">Product Information</div>
                        <div className="sec-sub">Hardware product linked to this customer</div>
                      </div>
                    </div>
                    <div className="cc-grid">
                      <div className="cc-field">
                        <label className="cc-label">
                          Product Name <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          name="proName" 
                          value={cust.proName} 
                          onChange={onC} 
                          placeholder="e.g. Cisco 24-Port Switch" 
                          required 
                        />
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Product Category <span className="req">*</span>
                        </label>
                        <select 
                          className="cc-select" 
                          name="proCatogory" 
                          value={cust.proCatogory} 
                          onChange={onC} 
                          required
                        >
                          <option value="">Select hardware category</option>
                          {HARDWARE_CATS.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Serial Number <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          name="proSrNo" 
                          value={cust.proSrNo} 
                          onChange={onC} 
                          placeholder="e.g. SN2024XXXXXX" 
                          required 
                        />
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Model Number <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          name="proModNum" 
                          value={cust.proModNum} 
                          onChange={onC} 
                          placeholder="e.g. WS-C2960X-24TS" 
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cc-divider" />

                  {/* Ticket Number - THIS IS THE KEY FIELD */}
                  <div>
                    <div className="cc-sec-head">
                      <div className="sec-ico blue">🎫</div>
                      <div>
                        <div className="sec-ttl">Product Verification</div>
                        <div className="sec-sub">Enter the ticket number from product registration</div>
                      </div>
                    </div>
                    <div className="cc-grid">
                      <div className="cc-field full">
                        <label className="cc-label">
                          Ticket Number <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          name="ticketNumber" 
                          value={cust.ticketNumber} 
                          onChange={onC} 
                          placeholder="e.g. TKT-20260214-25671" 
                          required 
                          style={{fontFamily:"monospace", fontSize:"15px"}} 
                        />
                        <span className="cc-hint">
                          ℹ️ This ticket number will be saved to database and used to link customer to their warranty
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="cc-divider" />

                  {/* Warranty Info */}
                  <div>
                    <div className="cc-sec-head">
                      <div className="sec-ico blue">🛡️</div>
                      <div>
                        <div className="sec-ttl">Warranty Information</div>
                        <div className="sec-sub">Warranty coverage period for the linked product</div>
                      </div>
                    </div>
                    <div className="cc-grid">
                      <div className="cc-field">
                        <label className="cc-label">
                          Warranty Start Date <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          type="date" 
                          name="warrStartDate" 
                          value={cust.warrStartDate} 
                          onChange={onC} 
                          required 
                        />
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Warranty End Date <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          type="date" 
                          name="warrEndDate" 
                          value={cust.warrEndDate} 
                          onChange={onC} 
                          required 
                        />
                        <span className="cc-hint">
                          {cust.warrEndDate && cust.warrStartDate
                            ? `${Math.round((new Date(cust.warrEndDate) - new Date(cust.warrStartDate)) / (1000*60*60*24*30))} months warranty`
                            : "e.g. 1 year after purchase"}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
                
                <div className="cc-form-footer">
                  <div className="footer-note">
                    <span style={{color:"var(--danger)"}}>*</span> Required fields
                  </div>
                  <div className="footer-acts">
                    <button 
                      type="button" 
                      className="btn btn-ghost" 
                      onClick={() => setCust(EMPTY_CUST)} 
                      disabled={loading}
                    >
                      Clear
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-blue" 
                      disabled={loading}
                    >
                      {loading ? "Registering…" : "Register Customer →"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Product Registration Form */}
          {view === "product" && (
            <div className="cc-card">
              <div className="cc-card-top">
                <div className="cti green">🖥️</div>
                <div>
                  <div className="cth">Hardware Product Registration</div>
                  <div className="ctp">Register hardware to activate warranty and service request tracking.</div>
                </div>
              </div>
              
              <form onSubmit={submitProd}>
                <div className="cc-form-body">

                  {/* Product Details */}
                  <div>
                    <div className="cc-sec-head">
                      <div className="sec-ico green">🔧</div>
                      <div>
                        <div className="sec-ttl">Hardware Details</div>
                        <div className="sec-sub">Identify the hardware being registered</div>
                      </div>
                    </div>
                    <div className="cc-grid">
                      <div className="cc-field">
                        <label className="cc-label">
                          Product Name <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          name="proName" 
                          value={prod.proName} 
                          onChange={onP} 
                          placeholder="e.g. Cisco 24-Port Switch" 
                          required 
                        />
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Hardware Category <span className="req">*</span>
                        </label>
                        <select 
                          className="cc-select" 
                          name="proCatogory" 
                          value={prod.proCatogory} 
                          onChange={onP} 
                          required
                        >
                          <option value="">Select hardware category</option>
                          {HARDWARE_CATS.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Brand Name <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          name="brandName" 
                          value={prod.brandName} 
                          onChange={onP} 
                          placeholder="e.g. Cisco, HP, Dell" 
                          required 
                        />
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Model Number <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          name="proModNum" 
                          value={prod.proModNum} 
                          onChange={onP} 
                          placeholder="e.g. WS-C2960X-24TS" 
                          required 
                        />
                      </div>
                      <div className="cc-field full">
                        <label className="cc-label">
                          Serial Number <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          name="proSrNo" 
                          value={prod.proSrNo} 
                          onChange={onP} 
                          placeholder="e.g. FTX2024XXXXXXXX" 
                          required 
                        />
                        <span className="cc-hint">Found on the device label or packaging</span>
                      </div>
                    </div>
                  </div>

                  <div className="cc-divider" />

                  {/* Purchase Info */}
                  <div>
                    <div className="cc-sec-head">
                      <div className="sec-ico green">🧾</div>
                      <div>
                        <div className="sec-ttl">Purchase Information</div>
                        <div className="sec-sub">Invoice and purchase details</div>
                      </div>
                    </div>
                    <div className="cc-grid">
                      <div className="cc-field">
                        <label className="cc-label">
                          Purchase Date <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          type="date" 
                          name="purDate" 
                          value={prod.purDate} 
                          onChange={onP} 
                          required 
                        />
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Invoice Number <span className="req">*</span>
                        </label>
                        <input 
                          className="cc-input" 
                          name="invoiceNum" 
                          value={prod.invoiceNum} 
                          onChange={onP} 
                          placeholder="INV-2024-001" 
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cc-divider" />

                  {/* Warranty Period */}
                  <div>
                    <div className="cc-sec-head">
                      <div className="sec-ico green">🛡️</div>
                      <div>
                        <div className="sec-ttl">Warranty Period</div>
                        <div className="sec-sub">Start and end date of warranty coverage</div>
                      </div>
                    </div>
                    <div className="cc-grid">
                      <div className="cc-field">
                        <label className="cc-label">
                          Warranty Start Date <span className="req">*</span>
                        </label>
                        <input
                          className="cc-input"
                          type="date"
                          name="warrStartDate"
                          value={prod.warrStartDate}
                          onChange={onP}
                          required
                        />
                        <span className="cc-hint">Usually same as purchase date</span>
                      </div>
                      <div className="cc-field">
                        <label className="cc-label">
                          Warranty End Date <span className="req">*</span>
                        </label>
                        <input
                          className="cc-input"
                          type="date"
                          name="warrEndDate"
                          value={prod.warrEndDate}
                          onChange={onP}
                          required
                        />
                        <span className="cc-hint">
                          {prod.warrEndDate && prod.warrStartDate
                            ? `${Math.round((new Date(prod.warrEndDate) - new Date(prod.warrStartDate)) / (1000 * 60 * 60 * 24 * 30))} months warranty`
                            : "e.g. 1 year after purchase"}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
                
                <div className="cc-form-footer">
                  <div className="footer-note">
                    <span style={{color:"var(--danger)"}}>*</span> All fields required
                  </div>
                  <div className="footer-acts">
                    <button 
                      type="button" 
                      className="btn btn-ghost" 
                      onClick={() => setProd(EMPTY_PROD)} 
                      disabled={loading}
                    >
                      Clear
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-green" 
                      disabled={loading}
                    >
                      {loading ? "Registering…" : "Register Product →"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

      {/* Credentials Modal - Shows username as customerName */}
      {showCredentialsModal && (
        <div className="cc-modal-overlay" onClick={() => setShowCredentialsModal(false)}>
          <div className="cc-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon blue">🔐</div>
            <div className="modal-title">Registration Successful!</div>
            <div className="modal-subtitle">Login credentials generated</div>
            
            <div className="credential-item">
              <div className="cred-label">Username (Your Name)</div>
              <div className="cred-value">
                <span>{userCredentials.username}</span>
                <button 
                  className="copy-btn" 
                  onClick={() => copyToClipboard(userCredentials.username)}
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="credential-item">
              <div className="cred-label">Auto-Generated Password</div>
              <div className="cred-value">
                <span style={{fontFamily:"monospace", fontSize:"14px"}}>
                  {userCredentials.password}
                </span>
                <button 
                  className="copy-btn" 
                  onClick={() => copyToClipboard(userCredentials.password)}
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="modal-note">
              ⚠️ Save these credentials now - they won't be shown again!
            </div>
            
            <button 
              className="btn btn-blue" 
              onClick={() => setShowCredentialsModal(false)} 
              style={{width:"100%"}}
            >
              I've Saved the Credentials
            </button>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {showTicketModal && (
        <div className="cc-modal-overlay" onClick={() => setShowTicketModal(false)}>
          <div className="cc-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon green">🎫</div>
            <div className="modal-title">Product Registered!</div>
            <div className="modal-subtitle">{ticketInfo.message}</div>
            
            <div className="ticket-display">
              <div className="ticket-icon">#</div>
              <div>
                <div className="ticket-label">Ticket Number</div>
                <div className="ticket-number">{ticketInfo.ticketNumber}</div>
                <div className="ticket-note">Share this with the customer</div>
              </div>
            </div>
            
            <div className="credential-item">
              <div className="cred-label">Ticket Number</div>
              <div className="cred-value">
                <span style={{fontFamily:"monospace", fontSize:"14px"}}>
                  {ticketInfo.ticketNumber}
                </span>
                <button 
                  className="copy-btn" 
                  onClick={() => copyToClipboard(ticketInfo.ticketNumber)}
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="modal-note info">
              ℹ️ Customer needs this ticket number to search their product and raise complaints.
            </div>
            
            <button 
              className="btn btn-green" 
              onClick={() => setShowTicketModal(false)} 
              style={{width:"100%"}}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="cc-toast">
          <div className={`toast-dot ${
            toast.type === "customer" ? "blue" : 
            toast.type === "product" ? "green" : 
            toast.type === "error" ? "red" : "blue"
          }`}>
            {toast.type === "error" ? "✕" : "✓"}
          </div>
          <div>
            <div className="toast-ttl">
              {toast.type === "customer" && "Customer Registered!"}
              {toast.type === "product" && "Product Registered!"}
              {toast.type === "copy" && "Copied!"}
              {toast.type === "error" && "Error"}
            </div>
            <div className="toast-sub">{toast.message}</div>
          </div>
          <button className="toast-x" onClick={() => setToast(null)}>✕</button>
        </div>
      )}
    </>
  );
}