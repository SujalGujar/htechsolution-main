
// import React, { useState } from "react";
// import axiosInstance from "../../Utils/axiosIntance";

// const HARDWARE_CATS = [
//   "Networking", "Router", "Network Switch", "Firewall / UTM Device", "Modem",
//   "Access Point / WiFi", "Network Cable / Patch Panel",
//   "Server", "NAS / Storage Device", "UPS / Power Supply", "Rack / Cabinet",
//   "Desktop Computer", "Laptop", "Workstation", "Mini PC",
//   "Monitor / Display", "Keyboard / Mouse", "Printer", "Scanner", "Projector", "Barcode Scanner",
//   "Hard Disk / SSD", "RAM / Memory", "Graphics Card / GPU", "Motherboard",
//   "Processor / CPU", "Power Supply Unit (PSU)", "Cooling Fan / Heatsink",
//   "CCTV Camera", "DVR / NVR", "Biometric Device", "Access Control System",
//   "IP Phone", "EPABX / PBX System", "Video Conferencing System",
//   "Other Hardware",
// ];

// const EMPTY_CUST = {
//   customerName: "",
//   email: "",
//   mobileNum: "",
//   proName: "",
//   proCatogory: "",
//   proSrNo: "",
//   proModNum: "",
//   ticketNumber: "",
//   invoiceNum: "",      // ✅ NEW
//   brandName: "",       // ✅ NEW
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
//   warrStartDate: "",
//   warrEndDate: "",
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
//   .cc-modal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; backdrop-filter:blur(4px); }
//   .cc-modal { background:var(--surface); border-radius:var(--r-xl); padding:36px; max-width:480px; width:90%; box-shadow:var(--shadow-lg); animation:fadeUp .3s ease both; }
//   .modal-icon { width:72px; height:72px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 24px; font-size:36px; }
//   .modal-icon.blue { background:var(--accent-lt); color:var(--accent); } .modal-icon.green { background:var(--accent2-lt); color:var(--accent2); }
//   .modal-title { font-size:22px; font-weight:700; color:var(--text); text-align:center; margin-bottom:8px; }
//   .modal-subtitle { font-size:14px; color:var(--muted); text-align:center; margin-bottom:28px; }
//   .credential-item { background:var(--surface2); border:1px solid var(--border); border-radius:var(--r-md); padding:14px 18px; margin-bottom:14px; }
//   .cred-label { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; color:var(--subtle); margin-bottom:6px; }
//   .cred-value { font-size:15px; font-weight:600; color:var(--text); display:flex; align-items:center; justify-content:space-between; word-break:break-all; }
//   .copy-btn { background:none; border:none; color:var(--accent); cursor:pointer; padding:6px 10px; border-radius:var(--r-sm); font-size:12px; font-weight:600; transition:all .15s; flex-shrink:0; margin-left:8px; }
//   .copy-btn:hover { background:var(--accent-lt); }
//   .modal-note { font-size:13px; text-align:center; margin:20px 0; padding:12px; border-radius:var(--r-md); border:1px solid #fedf89; background:#fffaeb; color:#b54708; line-height:1.5; }
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
//   const [view, setView]     = useState("customer");
//   const [toast, setToast]   = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError]   = useState(null);

//   const [cust, setCust] = useState(EMPTY_CUST);
//   const [prod, setProd] = useState(EMPTY_PROD);

//   const [showCredentialsModal, setShowCredentialsModal] = useState(false);
//   const [userCredentials, setUserCredentials] = useState({ username: "", password: "" });
//   const [showTicketModal, setShowTicketModal] = useState(false);
//   const [ticketInfo, setTicketInfo] = useState({ ticketNumber: "", message: "" });

//   const show = (type, msg = null) => {
//     setToast({ type, message: msg });
//     setTimeout(() => setToast(null), 3500);
//   };

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
//           username: response.data.username || cust.customerName,
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
//   const submitProd = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post("/auth/register", prod);
//       if (response.data.TicketNumber || response.data.ticketNumber) {
//         setTicketInfo({
//           ticketNumber: response.data.TicketNumber || response.data.ticketNumber,
//           message: response.data.message || "Product registered successfully!",
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

//           {/* Tab Navigation */}
//           <div className="cc-tabs">
//             <button className={`cc-tab ${view === "customer" ? "active" : ""}`} onClick={() => { setView("customer"); setError(null); }}>
//               <span>👤</span> Customer Registration
//             </button>
//             <button className={`cc-tab ${view === "product" ? "active green" : ""}`} onClick={() => { setView("product"); setError(null); }}>
//               <span>🖥️</span> Product Registration
//             </button>
//           </div>

//           {/* Error Display */}
//           {error && (
//             <div style={{ background:"#fef3f2", border:"1px solid #fecdca", borderRadius:"var(--r-md)", padding:"14px 18px", marginBottom:"24px", color:"var(--danger)", fontSize:"13px", textAlign:"center" }}>
//               {error}
//             </div>
//           )}

//           {/* ── CUSTOMER REGISTRATION FORM ── */}
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
//                       <div>
//                         <div className="sec-ttl">Personal Information</div>
//                         <div className="sec-sub">Basic contact details</div>
//                       </div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field full">
//                         <label className="cc-label">Full Name <span className="req">*</span></label>
//                         <input className="cc-input" name="customerName" value={cust.customerName} onChange={onC} placeholder="e.g. Rahul Sharma" required />
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Email Address <span className="req">*</span></label>
//                         <input className="cc-input" type="email" name="email" value={cust.email} onChange={onC} placeholder="rahul@example.com" required />
//                         <span className="cc-hint">Used for communication</span>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Mobile Number <span className="req">*</span></label>
//                         <input className="cc-input" type="tel" name="mobileNum" value={cust.mobileNum} onChange={onC} placeholder="9876543210" required />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Product Info */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">📦</div>
//                       <div>
//                         <div className="sec-ttl">Product Information</div>
//                         <div className="sec-sub">Hardware product linked to this customer</div>
//                       </div>
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
//                       {/* ── NEW: Brand Name ── */}
//                       <div className="cc-field">
//                         <label className="cc-label">Brand Name <span className="req">*</span></label>
//                         <input className="cc-input" name="brandName" value={cust.brandName} onChange={onC} placeholder="e.g. Cisco, HP, Dell" required />
//                       </div>
//                       {/* ── NEW: Invoice Number ── */}
//                       <div className="cc-field">
//                         <label className="cc-label">Invoice Number <span className="req">*</span></label>
//                         <input className="cc-input" name="invoiceNum" value={cust.invoiceNum} onChange={onC} placeholder="e.g. INV-2024-001" required />
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
//                           placeholder="e.g. TKT-20260214-25671"
//                           required
//                           style={{ fontFamily: "monospace", fontSize: "15px" }}
//                         />
//                         <span className="cc-hint">ℹ️ This ticket number links the customer to their warranty record</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-divider" />

//                   {/* Warranty Info */}
//                   <div>
//                     <div className="cc-sec-head">
//                       <div className="sec-ico blue">🛡️</div>
//                       <div>
//                         <div className="sec-ttl">Warranty Information</div>
//                         <div className="sec-sub">Warranty coverage period for the linked product</div>
//                       </div>
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
//                       {loading ? "Registering…" : "Register Customer →"}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* ── PRODUCT REGISTRATION FORM ── */}
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
//                       <div>
//                         <div className="sec-ttl">Hardware Details</div>
//                         <div className="sec-sub">Identify the hardware being registered</div>
//                       </div>
//                     </div>
//                     <div className="cc-grid">
//                       <div className="cc-field">
//                         <label className="cc-label">Product Name <span className="req">*</span></label>
//                         <input className="cc-input" name="proName" value={prod.proName} onChange={onP} placeholder="e.g. Cisco 24-Port Switch" required />
//                       </div>
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
//                       <div>
//                         <div className="sec-ttl">Purchase Information</div>
//                         <div className="sec-sub">Invoice and purchase details</div>
//                       </div>
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

//                   {/* Warranty Period */}
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
//                         <input className="cc-input" type="date" name="warrStartDate" value={prod.warrStartDate} onChange={onP} required />
//                         <span className="cc-hint">Usually same as purchase date</span>
//                       </div>
//                       <div className="cc-field">
//                         <label className="cc-label">Warranty End Date <span className="req">*</span></label>
//                         <input className="cc-input" type="date" name="warrEndDate" value={prod.warrEndDate} onChange={onP} required />
//                         <span className="cc-hint">
//                           {prod.warrEndDate && prod.warrStartDate
//                             ? `${Math.round((new Date(prod.warrEndDate) - new Date(prod.warrStartDate)) / (1000*60*60*24*30))} months warranty`
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
//                       {loading ? "Registering…" : "Register Product →"}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* Credentials Modal */}
//       {showCredentialsModal && (
//         <div className="cc-modal-overlay" onClick={() => setShowCredentialsModal(false)}>
//           <div className="cc-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon blue">🔐</div>
//             <div className="modal-title">Registration Successful!</div>
//             <div className="modal-subtitle">Login credentials generated</div>
//             <div className="credential-item">
//               <div className="cred-label">Username (Your Name)</div>
//               <div className="cred-value">
//                 <span>{userCredentials.username}</span>
//                 <button className="copy-btn" onClick={() => copyToClipboard(userCredentials.username)}>Copy</button>
//               </div>
//             </div>
//             <div className="credential-item">
//               <div className="cred-label">Auto-Generated Password</div>
//               <div className="cred-value">
//                 <span style={{ fontFamily:"monospace", fontSize:"14px" }}>{userCredentials.password}</span>
//                 <button className="copy-btn" onClick={() => copyToClipboard(userCredentials.password)}>Copy</button>
//               </div>
//             </div>
//             <div className="modal-note">⚠️ Save these credentials now — they won't be shown again!</div>
//             <button className="btn btn-blue" onClick={() => setShowCredentialsModal(false)} style={{ width:"100%" }}>
//               I've Saved the Credentials
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Ticket Modal */}
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
//                 <div className="ticket-note">Share this with the customer</div>
//               </div>
//             </div>
//             <div className="credential-item">
//               <div className="cred-label">Ticket Number</div>
//               <div className="cred-value">
//                 <span style={{ fontFamily:"monospace", fontSize:"14px" }}>{ticketInfo.ticketNumber}</span>
//                 <button className="copy-btn" onClick={() => copyToClipboard(ticketInfo.ticketNumber)}>Copy</button>
//               </div>
//             </div>
//             <div className="modal-note info">ℹ️ Customer needs this ticket number to search their product and raise complaints.</div>
//             <button className="btn btn-green" onClick={() => setShowTicketModal(false)} style={{ width:"100%" }}>Got It</button>
//           </div>
//         </div>
//       )}

//       {/* Toast */}
//       {toast && (
//         <div className="cc-toast">
//           <div className={`toast-dot ${toast.type === "customer" ? "blue" : toast.type === "product" ? "green" : toast.type === "error" ? "red" : "blue"}`}>
//             {toast.type === "error" ? "✕" : "✓"}
//           </div>
//           <div>
//             <div className="toast-ttl">
//               {toast.type === "customer" && "Customer Registered!"}
//               {toast.type === "product"  && "Product Registered!"}
//               {toast.type === "copy"     && "Copied!"}
//               {toast.type === "error"    && "Error"}
//             </div>
//             <div className="toast-sub">{toast.message}</div>
//           </div>
//           <button className="toast-x" onClick={() => setToast(null)}>✕</button>
//         </div>
//       )}
//     </>
//   );
// }

import { useState, useEffect } from "react";
import React from "react";
import axiosInstance from "../../Utils/axiosIntance";


const Icon = ({ d, size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const PlusIcon    = () => <Icon d="M12 5v14M5 12h14" />;
const TrashIcon   = () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
const ChevronRight= () => <Icon d="M9 18l6-6-6-6" />;
const SettingsIcon= () => <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />;
const TagIcon     = () => <Icon d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01" />;
const XIcon       = () => <Icon d="M18 6L6 18M6 6l12 12" />;
const CheckIcon   = () => <Icon d="M20 6L9 17l-5-5" />;
const EditIcon    = () => <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />;

// ─── TYPE COLORS (Tailwind can't do dynamic colors, so we keep these minimal inline) ──
const TYPE_COLORS = {
  String:  { bg: "#6C63FF22", text: "#6C63FF", border: "#6C63FF44" },
  Number:  { bg: "#00C89622", text: "#00C896", border: "#00C89644" },
  Boolean: { bg: "#FF6B6B22", text: "#FF6B6B", border: "#FF6B6B44" },
  Date:    { bg: "#FFB34722", text: "#FFB347", border: "#FFB34744" },
};

// ─── FIELD TYPE BADGE ─────────────────────────────────────────────────────────
const FieldTypeBadge = ({ type }) => {
  const c = TYPE_COLORS[type] || TYPE_COLORS.String;
  return (
    <span className="rounded px-2 py-0.5 text-xs font-bold tracking-wide"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {type}
    </span>
  );
};

// ─── TOAST ───────────────────────────────────────────────────────────────────
const Toast = ({ toasts, removeToast }) => (
  <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
    {toasts.map(t => (
      <div key={t.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border border-black/10 min-w-64 animate-bounce-in font-semibold text-sm text-gray-900
          ${t.type === "success" ? "bg-emerald-400" : t.type === "error" ? "bg-red-400" : "bg-white"}`}>
        {t.type === "success" ? <CheckIcon /> : <XIcon />}
        <span className="flex-1">{t.message}</span>
        <button onClick={() => removeToast(t.id)} className="opacity-60 hover:opacity-100 bg-transparent border-none cursor-pointer">
          <XIcon />
        </button>
      </div>
    ))}
  </div>
);

// ─── MODAL ───────────────────────────────────────────────────────────────────
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5"
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {title}
          </h3>
          <button onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 border-none rounded-lg p-2 cursor-pointer transition-colors">
            <XIcon />
          </button>
        </div>
        {/* Modal Body */}
        <div className="px-7 py-6">{children}</div>
      </div>
    </div>
  );
};

// ─── INPUT ───────────────────────────────────────────────────────────────────
const Input = ({ label, required, className = "", ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-xs font-bold text-gray-500 tracking-wide uppercase">
        {label}{required && <span className="text-red-500"> *</span>}
      </label>
    )}
    <input
      {...props}
      className={`border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none
        focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all placeholder:text-gray-400 ${className}`}
    />
  </div>
);

// ─── SELECT ──────────────────────────────────────────────────────────────────
const Select = ({ label, required, children, className = "", ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-xs font-bold text-gray-500 tracking-wide uppercase">
        {label}{required && <span className="text-red-500"> *</span>}
      </label>
    )}
    <select
      {...props}
      className={`border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none
        focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all cursor-pointer ${className}`}>
      {children}
    </select>
  </div>
);

// ─── BUTTON ──────────────────────────────────────────────────────────────────
const variantClasses = {
  primary:   "bg-gray-900 text-white border-transparent hover:bg-gray-700",
  secondary: "bg-gray-100 text-gray-900 border-transparent hover:bg-gray-200",
  danger:    "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100",
  ghost:     "bg-transparent text-violet-600 border border-violet-200 hover:bg-violet-50",
};

const Btn = ({ variant = "primary", children, loading, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold
      transition-all whitespace-nowrap border
      disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
      ${variantClasses[variant]} ${className}`}>
    {loading ? "⏳" : children}
  </button>
);

// ─── AVATAR (category color from name) ───────────────────────────────────────
// Tailwind can't do dynamic hsl, so we keep this one inline
const CategoryAvatar = ({ name }) => {
  const hue = (name.charCodeAt(0) * 37) % 360;
  return (
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-extrabold flex-shrink-0"
      style={{ background: `hsl(${hue},70%,94%)`, color: `hsl(${hue},60%,40%)` }}>
      {name[0].toUpperCase()}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function CustomerCareHome() {
  const [categories, setCategories]           = useState([]);
  const [configs, setConfigs]                 = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading]                 = useState(false);
  const [toasts, setToasts]                   = useState([]);

  // Modals
  const [showCatModal, setShowCatModal]         = useState(false);
  const [showConfigModal, setShowConfigModal]   = useState(false);
  const [showFieldModal, setShowFieldModal]     = useState(false);
  const [activeCategoryForConfig, setActiveCategoryForConfig] = useState(null);

  // Forms
  const [catForm, setCatForm]       = useState({ name: "", description: "" });
  const [configFields, setConfigFields] = useState([]);
  const [editCat, setEditCat]       = useState(null);
  const [newField, setNewField]     = useState({
    fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: ""
  });
  const [addingField, setAddingField] = useState({
    categoryId: null,
    field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" }
  });

  // ── TOAST HELPERS ──────────────────────────────────────────────────────────
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  const removeToast = (id) => setToasts(p => p.filter(t => t.id !== id));

  // ── API ────────────────────────────────────────────────────────────────────
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/category/allproducts");
      setCategories(data.data || []);
    } catch (e) {
      addToast(e.response?.data?.message || "Failed to load categories", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchConfig = async (categoryId) => {
    if (configs[categoryId] !== undefined) return;
    try {
      const { data } = await axiosInstance.get(`/product/getconfigrations/${categoryId}`);
      setConfigs(p => ({ ...p, [categoryId]: data.data }));
    } catch {
      setConfigs(p => ({ ...p, [categoryId]: null }));
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  // ── CATEGORY CRUD ──────────────────────────────────────────────────────────
  const handleSaveCategory = async () => {
    if (!catForm.name.trim()) return addToast("Category name is required", "error");
    try {
      if (editCat) {
        await axiosInstance.put(`/category/updateProduct/${editCat._id}`, catForm);
        addToast("Category updated!");
      } else {
        await axiosInstance.post("/category/createCategory", catForm);
        addToast("Category created!");
      }
      setShowCatModal(false);
      setCatForm({ name: "", description: "" });
      setEditCat(null);
      fetchCategories();
    } catch (e) {
      addToast(e.response?.data?.message || "Failed", "error");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("Deactivate this category?")) return;
    try {
      await axiosInstance.delete(`/category/${id}`);
      addToast("Category deactivated");
      fetchCategories();
    } catch (e) {
      addToast(e.response?.data?.message || "Failed", "error");
    }
  };

  // ── CONFIG ─────────────────────────────────────────────────────────────────
  const openCreateConfig = (cat) => {
    setActiveCategoryForConfig(cat);
    setConfigFields([]);
    setShowConfigModal(true);
  };

  const toFieldKey = (name) =>
    name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");

  const addFieldToForm = () => {
    if (!newField.fieldName || !newField.fieldKey)
      return addToast("Field name & key required", "error");
    const options = newField.options
      ? newField.options.split(",").map(o => o.trim()).filter(Boolean)
      : [];
    setConfigFields(p => [...p, { ...newField, options, _tempId: Date.now() }]);
    setNewField({ fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" });
  };

  const handleCreateConfig = async () => {
    if (!configFields.length) return addToast("Add at least one field", "error");
    try {
      await axiosInstance.post("/category/configuration", {
        category: activeCategoryForConfig._id,
        fields: configFields.map(({ _tempId, ...f }) => f),
      });
      addToast("Configuration created!");
      setShowConfigModal(false);
      setConfigs(p => ({ ...p, [activeCategoryForConfig._id]: undefined }));
      fetchConfig(activeCategoryForConfig._id);
    } catch (e) {
      addToast(e.response?.data?.message || "Failed", "error");
    }
  };

  const handleAddFieldToExisting = async () => {
    const { categoryId, field } = addingField;
    if (!field.fieldName || !field.fieldKey)
      return addToast("Field name & key required", "error");
    const options = field.options
      ? field.options.split(",").map(o => o.trim()).filter(Boolean)
      : [];
    try {
      await axiosInstance.post(`/category/addconfigration/${categoryId}/add-field`, { ...field, options });
      addToast("Field added!");
      setShowFieldModal(false);
      setConfigs(p => ({ ...p, [categoryId]: undefined }));
      fetchConfig(categoryId);
    } catch (e) {
      addToast(e.response?.data?.message || "Failed", "error");
    }
  };

  const handleRemoveField = async (categoryId, fieldKey) => {
    if (!confirm(`Remove field "${fieldKey}"?`)) return;
    try {
      await axiosInstance.delete(`/category/removeconfigration/${categoryId}/remove-field/${fieldKey}`);
      addToast("Field removed");
      setConfigs(p => ({ ...p, [categoryId]: undefined }));
      fetchConfig(categoryId);
    } catch (e) {
      addToast(e.response?.data?.message || "Failed", "error");
    }
  };

  const toggleExpand = (catId) => {
    if (expandedCategory === catId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(catId);
      fetchConfig(catId);
    }
  };

  // ══════════════════════════════ RENDER ════════════════════════════════════
  return (
    <>
      {/* Global font injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
        body { font-family: 'DM Sans', sans-serif; background: #f7f7fa; }
        @keyframes slideInRight { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeUp { from { transform: translateY(14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-in { animation: slideInRight 0.3s ease; }
        .animate-fade-up   { animation: fadeUp 0.3s ease both; }
      `}</style>

      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="min-h-screen bg-gray-50">

        {/* ── HEADER ────────────────────────────────────────────────────────── */}
        <header className="bg-gray-900 text-white h-16 px-10 flex items-center justify-between border-b-2 border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-violet-600 rounded-xl p-2 flex items-center justify-center">
              <TagIcon />
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight leading-none">
                Category Manager
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Customer Care Portal</div>
            </div>
          </div>
          <Btn onClick={() => {
            setEditCat(null);
            setCatForm({ name: "", description: "" });
            setShowCatModal(true);
          }}>
            <PlusIcon /> New Category
          </Btn>
        </header>

        {/* ── BODY ──────────────────────────────────────────────────────────── */}
        <main className="max-w-3xl mx-auto px-5 py-9">

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Categories", value: categories.length,                                        color: "text-violet-600" },
              { label: "With Config",      value: Object.values(configs).filter(Boolean).length,            color: "text-emerald-500" },
              { label: "Active",           value: categories.filter(c => c.isActive !== false).length,      color: "text-amber-500"   },
            ].map(s => (
              <div key={s.label}
                className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
                <div className={`text-3xl font-extrabold ${s.color}`}
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {s.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Section title */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              All Categories
            </h2>
            <span className="text-xs text-gray-400">Click a category to manage its configuration</span>
          </div>

          {/* ── CATEGORY LIST ────────────────────────────────────────────────── */}
          {loading ? (
            <div className="text-center py-16 text-gray-400">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <div className="text-4xl mb-3">📂</div>
              <div className="font-bold text-gray-600 text-base">No categories yet</div>
              <div className="text-sm text-gray-400 mt-1">Create your first category to get started</div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {categories.map((cat, i) => {
                const isOpen  = expandedCategory === cat._id;
                const config  = configs[cat._id];

                return (
                  <div key={cat._id}
                    className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-200
                      hover:shadow-lg hover:-translate-y-0.5 animate-fade-up
                      ${isOpen ? "border-violet-300" : "border-gray-100"}`}
                    style={{ animationDelay: `${i * 0.05}s` }}>

                    {/* ── Category Row ── */}
                    <div
                      className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                      onClick={() => toggleExpand(cat._id)}>

                      <CategoryAvatar name={cat.name} />

                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-base text-gray-900 truncate">{cat.name}</div>
                        {cat.description && (
                          <div className="text-sm text-gray-400 mt-0.5 truncate">{cat.description}</div>
                        )}
                      </div>

                      {/* Field count badge */}
                      {config?.fields?.length > 0 && (
                        <span className="bg-violet-50 text-violet-600 border border-violet-200 rounded-full px-3 py-0.5 text-xs font-bold whitespace-nowrap">
                          {config.fields.length} fields
                        </span>
                      )}

                      {/* Edit / Delete buttons */}
                      <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setEditCat(cat);
                            setCatForm({ name: cat.name, description: cat.description || "" });
                            setShowCatModal(true);
                          }}
                          className="bg-gray-100 hover:bg-gray-200 border-none rounded-lg p-2 cursor-pointer transition-colors">
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="bg-red-50 hover:bg-red-100 border-none rounded-lg p-2 cursor-pointer transition-colors text-red-500">
                          <TrashIcon />
                        </button>
                      </div>

                      {/* Expand chevron */}
                      <div className={`text-gray-300 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>
                        <ChevronRight />
                      </div>
                    </div>

                    {/* ── Config Panel ── */}
                    {isOpen && (
                      <div className="border-t border-gray-100 bg-slate-50 px-5 py-5">

                        {/* Config panel header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
                            <SettingsIcon />
                            Configuration Fields
                          </div>
                          {config === null ? (
                            <Btn onClick={() => openCreateConfig(cat)}>
                              <PlusIcon /> Create Config
                            </Btn>
                          ) : config ? (
                            <Btn variant="ghost" onClick={() => {
                              setAddingField({
                                categoryId: cat._id,
                                field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" }
                              });
                              setShowFieldModal(true);
                            }}>
                              <PlusIcon /> Add Field
                            </Btn>
                          ) : null}
                        </div>

                        {/* States */}
                        {config === undefined ? (
                          <div className="text-center py-5 text-sm text-gray-400">Loading config...</div>
                        ) : config === null ? (
                          <div className="text-center py-7 border-2 border-dashed border-indigo-100 rounded-xl">
                            <div className="text-3xl mb-2">⚙️</div>
                            <div className="font-semibold text-gray-500 text-sm">No configuration yet</div>
                            <div className="text-xs text-gray-400 mt-1">
                              Create a config to define fields for <b>{cat.name}</b>
                            </div>
                          </div>
                        ) : config.fields?.length === 0 ? (
                          <div className="text-center py-4 text-sm text-gray-400">No fields yet. Add one!</div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {/* Table header */}
                            <div className="grid grid-cols-12 gap-3 px-3.5 py-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
                              <span className="col-span-4">Field / Key</span>
                              <span className="col-span-3">Type</span>
                              <span className="col-span-2">Unit</span>
                              <span className="col-span-2">Required</span>
                              <span className="col-span-1"></span>
                            </div>

                            {/* Field rows */}
                            {config.fields.map((field, fi) => (
                              <div key={fi}
                                className="grid grid-cols-12 gap-3 px-3.5 py-3 bg-white rounded-xl border border-gray-100 items-center hover:bg-violet-50/30 transition-colors">

                                {/* Name + key */}
                                <div className="col-span-4">
                                  <div className="font-bold text-sm text-gray-900">{field.fieldName}</div>
                                  <div className="text-xs text-gray-400 font-mono mt-0.5">{field.fieldKey}</div>
                                  {field.options?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                      {field.options.map(o => (
                                        <span key={o} className="bg-gray-100 text-gray-500 rounded px-1.5 py-0.5 text-xs">
                                          {o}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Type badge */}
                                <div className="col-span-3">
                                  <FieldTypeBadge type={field.fieldType} />
                                </div>

                                {/* Unit */}
                                <div className="col-span-2 text-sm text-gray-400">{field.unit || "—"}</div>

                                {/* Required */}
                                <div className="col-span-2">
                                  {field.isRequired
                                    ? <span className="text-emerald-500 text-xs font-bold">✓ Yes</span>
                                    : <span className="text-gray-300 text-xs">No</span>}
                                </div>

                                {/* Delete field */}
                                <div className="col-span-1 flex justify-end">
                                  <button
                                    onClick={() => handleRemoveField(cat._id, field.fieldKey)}
                                    className="bg-red-50 hover:bg-red-100 border-none rounded-lg p-1.5 cursor-pointer text-red-400 transition-colors">
                                    <TrashIcon />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* ══════════ MODAL: CREATE / EDIT CATEGORY ══════════ */}
      <Modal
        open={showCatModal}
        onClose={() => { setShowCatModal(false); setEditCat(null); }}
        title={editCat ? "Edit Category" : "New Category"}>
        <div className="flex flex-col gap-4">
          <Input
            label="Category Name" required
            placeholder="e.g. Laptop, Printer, AC"
            value={catForm.name}
            onChange={e => setCatForm(p => ({ ...p, name: e.target.value }))}
          />
          <Input
            label="Description"
            placeholder="Optional description"
            value={catForm.description}
            onChange={e => setCatForm(p => ({ ...p, description: e.target.value }))}
          />
          <div className="flex gap-3 justify-end mt-2">
            <Btn variant="secondary" onClick={() => { setShowCatModal(false); setEditCat(null); }}>
              Cancel
            </Btn>
            <Btn onClick={handleSaveCategory}>
              {editCat ? "Update" : "Create Category"}
            </Btn>
          </div>
        </div>
      </Modal>

      {/* ══════════ MODAL: CREATE CONFIG ══════════ */}
      <Modal
        open={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title={`Config for "${activeCategoryForConfig?.name}"`}>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-400 -mt-2">
            Define the fields that will appear when registering a{" "}
            <b className="text-gray-700">{activeCategoryForConfig?.name}</b>.
          </p>

          {/* Field builder box */}
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 border border-gray-100">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Add a field</div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Field Name" placeholder="e.g. RAM"
                value={newField.fieldName}
                onChange={e => setNewField(p => ({
                  ...p, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value)
                }))}
              />
              <Input
                label="Field Key" placeholder="auto-filled"
                value={newField.fieldKey}
                onChange={e => setNewField(p => ({ ...p, fieldKey: e.target.value }))}
              />
              <Select
                label="Type" value={newField.fieldType}
                onChange={e => setNewField(p => ({ ...p, fieldType: e.target.value }))}>
                {["String", "Number", "Boolean", "Date"].map(t => <option key={t}>{t}</option>)}
              </Select>
              <Input
                label="Unit (optional)" placeholder="GB, inch..."
                value={newField.unit}
                onChange={e => setNewField(p => ({ ...p, unit: e.target.value }))}
              />
            </div>
            <Input
              label="Options (comma separated, optional)"
              placeholder="8GB, 16GB, 32GB"
              value={newField.options}
              onChange={e => setNewField(p => ({ ...p, options: e.target.value }))}
            />
            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="checkbox" checked={newField.isRequired}
                onChange={e => setNewField(p => ({ ...p, isRequired: e.target.checked }))}
                className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
              />
              Required field
            </label>
            <Btn variant="ghost" onClick={addFieldToForm}>
              <PlusIcon /> Add to list
            </Btn>
          </div>

          {/* Queued fields */}
          {configFields.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Fields to create ({configFields.length})
              </div>
              {configFields.map(f => (
                <div key={f._tempId}
                  className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
                  <div>
                    <span className="font-bold text-sm text-gray-900">{f.fieldName}</span>
                    <span className="text-gray-400 text-xs ml-2">({f.fieldKey})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FieldTypeBadge type={f.fieldType} />
                    {f.isRequired && (
                      <span className="text-emerald-500 text-xs font-bold">REQUIRED</span>
                    )}
                    <button
                      onClick={() => setConfigFields(p => p.filter(x => x._tempId !== f._tempId))}
                      className="bg-red-50 hover:bg-red-100 border-none rounded-lg p-1 cursor-pointer text-red-400 transition-colors">
                      <XIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 justify-end mt-1">
            <Btn variant="secondary" onClick={() => setShowConfigModal(false)}>Cancel</Btn>
            <Btn onClick={handleCreateConfig} disabled={configFields.length === 0}>
              <CheckIcon /> Save Configuration
            </Btn>
          </div>
        </div>
      </Modal>

      {/* ══════════ MODAL: ADD FIELD TO EXISTING CONFIG ══════════ */}
      <Modal
        open={showFieldModal}
        onClose={() => setShowFieldModal(false)}
        title="Add New Field">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Field Name" required placeholder="e.g. Screen Size"
              value={addingField.field.fieldName}
              onChange={e => setAddingField(p => ({
                ...p, field: { ...p.field, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value) }
              }))}
            />
            <Input
              label="Field Key" placeholder="auto-filled"
              value={addingField.field.fieldKey}
              onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldKey: e.target.value } }))}
            />
            <Select
              label="Type" value={addingField.field.fieldType}
              onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldType: e.target.value } }))}>
              {["String", "Number", "Boolean", "Date"].map(t => <option key={t}>{t}</option>)}
            </Select>
            <Input
              label="Unit (optional)" placeholder="GB, inch..."
              value={addingField.field.unit}
              onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, unit: e.target.value } }))}
            />
          </div>
          <Input
            label="Options (comma separated)"
            placeholder="8GB, 16GB, 32GB"
            value={addingField.field.options}
            onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, options: e.target.value } }))}
          />
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox" checked={addingField.field.isRequired}
              onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, isRequired: e.target.checked } }))}
              className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
            />
            Required field
          </label>
          <div className="flex gap-3 justify-end mt-1">
            <Btn variant="secondary" onClick={() => setShowFieldModal(false)}>Cancel</Btn>
            <Btn onClick={handleAddFieldToExisting}><PlusIcon /> Add Field</Btn>
          </div>
        </div>
      </Modal>
    </>
  );
}