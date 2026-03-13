
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

// import { useState, useEffect } from "react";
// import React from "react";
// import axiosInstance from "../../Utils/axiosIntance";


// const Icon = ({ d, size = 18, color = "currentColor" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
//     stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//     <path d={d} />
//   </svg>
// );
// const PlusIcon    = () => <Icon d="M12 5v14M5 12h14" />;
// const TrashIcon   = () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
// const ChevronRight= () => <Icon d="M9 18l6-6-6-6" />;
// const SettingsIcon= () => <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />;
// const TagIcon     = () => <Icon d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01" />;
// const XIcon       = () => <Icon d="M18 6L6 18M6 6l12 12" />;
// const CheckIcon   = () => <Icon d="M20 6L9 17l-5-5" />;
// const EditIcon    = () => <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />;

// // ─── TYPE COLORS (Tailwind can't do dynamic colors, so we keep these minimal inline) ──
// const TYPE_COLORS = {
//   String:  { bg: "#6C63FF22", text: "#6C63FF", border: "#6C63FF44" },
//   Number:  { bg: "#00C89622", text: "#00C896", border: "#00C89644" },
//   Boolean: { bg: "#FF6B6B22", text: "#FF6B6B", border: "#FF6B6B44" },
//   Date:    { bg: "#FFB34722", text: "#FFB347", border: "#FFB34744" },
// };

// // ─── FIELD TYPE BADGE ─────────────────────────────────────────────────────────
// const FieldTypeBadge = ({ type }) => {
//   const c = TYPE_COLORS[type] || TYPE_COLORS.String;
//   return (
//     <span className="rounded px-2 py-0.5 text-xs font-bold tracking-wide"
//       style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
//       {type}
//     </span>
//   );
// };

// // ─── TOAST ───────────────────────────────────────────────────────────────────
// const Toast = ({ toasts, removeToast }) => (
//   <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
//     {toasts.map(t => (
//       <div key={t.id}
//         className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border border-black/10 min-w-64 animate-bounce-in font-semibold text-sm text-gray-900
//           ${t.type === "success" ? "bg-emerald-400" : t.type === "error" ? "bg-red-400" : "bg-white"}`}>
//         {t.type === "success" ? <CheckIcon /> : <XIcon />}
//         <span className="flex-1">{t.message}</span>
//         <button onClick={() => removeToast(t.id)} className="opacity-60 hover:opacity-100 bg-transparent border-none cursor-pointer">
//           <XIcon />
//         </button>
//       </div>
//     ))}
//   </div>
// );

// // ─── MODAL ───────────────────────────────────────────────────────────────────
// const Modal = ({ open, onClose, title, children }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5"
//       onClick={onClose}>
//       <div onClick={e => e.stopPropagation()}
//         className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
//           <h3 className="text-lg font-bold text-gray-900 tracking-tight"
//             style={{ fontFamily: "'Syne', sans-serif" }}>
//             {title}
//           </h3>
//           <button onClick={onClose}
//             className="bg-gray-100 hover:bg-gray-200 border-none rounded-lg p-2 cursor-pointer transition-colors">
//             <XIcon />
//           </button>
//         </div>
//         {/* Modal Body */}
//         <div className="px-7 py-6">{children}</div>
//       </div>
//     </div>
//   );
// };

// // ─── INPUT ───────────────────────────────────────────────────────────────────
// const Input = ({ label, required, className = "", ...props }) => (
//   <div className="flex flex-col gap-1.5">
//     {label && (
//       <label className="text-xs font-bold text-gray-500 tracking-wide uppercase">
//         {label}{required && <span className="text-red-500"> *</span>}
//       </label>
//     )}
//     <input
//       {...props}
//       className={`border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none
//         focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all placeholder:text-gray-400 ${className}`}
//     />
//   </div>
// );

// // ─── SELECT ──────────────────────────────────────────────────────────────────
// const Select = ({ label, required, children, className = "", ...props }) => (
//   <div className="flex flex-col gap-1.5">
//     {label && (
//       <label className="text-xs font-bold text-gray-500 tracking-wide uppercase">
//         {label}{required && <span className="text-red-500"> *</span>}
//       </label>
//     )}
//     <select
//       {...props}
//       className={`border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none
//         focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all cursor-pointer ${className}`}>
//       {children}
//     </select>
//   </div>
// );

// // ─── BUTTON ──────────────────────────────────────────────────────────────────
// const variantClasses = {
//   primary:   "bg-gray-900 text-white border-transparent hover:bg-gray-700",
//   secondary: "bg-gray-100 text-gray-900 border-transparent hover:bg-gray-200",
//   danger:    "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100",
//   ghost:     "bg-transparent text-violet-600 border border-violet-200 hover:bg-violet-50",
// };

// const Btn = ({ variant = "primary", children, loading, className = "", ...props }) => (
//   <button
//     {...props}
//     className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold
//       transition-all whitespace-nowrap border
//       disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
//       ${variantClasses[variant]} ${className}`}>
//     {loading ? "⏳" : children}
//   </button>
// );

// // ─── AVATAR (category color from name) ───────────────────────────────────────
// // Tailwind can't do dynamic hsl, so we keep this one inline
// const CategoryAvatar = ({ name }) => {
//   const hue = (name.charCodeAt(0) * 37) % 360;
//   return (
//     <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-extrabold flex-shrink-0"
//       style={{ background: `hsl(${hue},70%,94%)`, color: `hsl(${hue},60%,40%)` }}>
//       {name[0].toUpperCase()}
//     </div>
//   );
// };

// // ═══════════════════════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // ═══════════════════════════════════════════════════════════════════════════════
// export default function CustomerCareHome() {
//   const [categories, setCategories]           = useState([]);
//   const [configs, setConfigs]                 = useState({});
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [loading, setLoading]                 = useState(false);
//   const [toasts, setToasts]                   = useState([]);

//   // Modals
//   const [showCatModal, setShowCatModal]         = useState(false);
//   const [showConfigModal, setShowConfigModal]   = useState(false);
//   const [showFieldModal, setShowFieldModal]     = useState(false);
//   const [activeCategoryForConfig, setActiveCategoryForConfig] = useState(null);

//   // Forms
//   const [catForm, setCatForm]       = useState({ name: "", description: "" });
//   const [configFields, setConfigFields] = useState([]);
//   const [editCat, setEditCat]       = useState(null);
//   const [newField, setNewField]     = useState({
//     fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: ""
//   });
//   const [addingField, setAddingField] = useState({
//     categoryId: null,
//     field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" }
//   });

//   // ── TOAST HELPERS ──────────────────────────────────────────────────────────
//   const addToast = (message, type = "success") => {
//     const id = Date.now();
//     setToasts(p => [...p, { id, message, type }]);
//     setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
//   };
//   const removeToast = (id) => setToasts(p => p.filter(t => t.id !== id));

//   // ── API ────────────────────────────────────────────────────────────────────
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.get("/category/allproducts");
//       setCategories(data.data || []);
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed to load categories", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchConfig = async (categoryId) => {
//     if (configs[categoryId] !== undefined) return;
//     try {
//       const { data } = await axiosInstance.get(`/product/${categoryId}/configurations`);
//       setConfigs(p => ({ ...p, [categoryId]: data.data }));
//     } catch (e) {
//       setConfigs(p => ({ ...p, [categoryId]: null }));
//       addToast(e.response?.data?.message || "Failed to load configuration", "error");
//     }
//   };

//   useEffect(() => { fetchCategories(); }, []);

  
//   const handleSaveCategory = async () => {
//     if (!catForm.name.trim()) return addToast("Category name is required", "error");
//     try {
//       if (editCat) {
//         await axiosInstance.put(`/category/updateProduct/${editCat._id}`, catForm);
//         addToast("Category updated!");
//       } else {
//         await axiosInstance.post("/category/createCategory", catForm);
//         addToast("Category created!");
//       }
//       setShowCatModal(false);
//       setCatForm({ name: "", description: "" });
//       setEditCat(null);
//       fetchCategories();
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     if (!confirm("Deactivate this category?")) return;
//     try {
//       await axiosInstance.delete(`/category/${id}`);
//       addToast("Category deactivated");
//       fetchCategories();
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   };

//   // ── CONFIG ─────────────────────────────────────────────────────────────────
//   const openCreateConfig = (cat) => {
//     setActiveCategoryForConfig(cat);
//     setConfigFields([]);
//     setShowConfigModal(true);
//   };

//   const toFieldKey = (name) =>
//     name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");

//   const addFieldToForm = () => {
//     if (!newField.fieldName || !newField.fieldKey)
//       return addToast("Field name & key required", "error");
//     const options = newField.options
//       ? newField.options.split(",").map(o => o.trim()).filter(Boolean)
//       : [];
//     setConfigFields(p => [...p, { ...newField, options, _tempId: Date.now() }]);
//     setNewField({ fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" });
//   };

//   const handleCreateConfig = async () => {
//     if (!configFields.length) return addToast("Add at least one field", "error");
//     try {
//       await axiosInstance.post("/product/configuration", {
//         category: activeCategoryForConfig._id,
//         fields: configFields.map(({ _tempId, ...f }) => f),
//       });
//       addToast("Configuration created!");
//       setShowConfigModal(false);
//       setConfigs(p => ({ ...p, [activeCategoryForConfig._id]: undefined }));
//       fetchConfig(activeCategoryForConfig._id);
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   };

//   const handleAddFieldToExisting = async () => {
//     const { categoryId, field } = addingField;
//     if (!field.fieldName || !field.fieldKey)
//       return addToast("Field name & key required", "error");
//     const options = field.options
//       ? field.options.split(",").map(o => o.trim()).filter(Boolean)
//       : [];
//     try {
//       await axiosInstance.post(`/product/addconfigration/${categoryId}/add-field`, { ...field, options });
//       addToast("Field added!");
//       setShowFieldModal(false);
//       setConfigs(p => ({ ...p, [categoryId]: undefined }));
//       fetchConfig(categoryId);
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   };

//   const handleRemoveField = async (categoryId, fieldKey) => {
//     if (!confirm(`Remove field "${fieldKey}"?`)) return;
//     try {
//       await axiosInstance.delete(`/product/removeconfigration/${categoryId}/remove-field/${fieldKey}`);
//       addToast("Field removed");
//       setConfigs(p => ({ ...p, [categoryId]: undefined }));
//       fetchConfig(categoryId);
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   };

//   const toggleExpand = (catId) => {
//     if (expandedCategory === catId) {
//       setExpandedCategory(null);
//     } else {
//       setExpandedCategory(catId);
//       fetchConfig(catId);
//     }
//   };

//   // ══════════════════════════════ RENDER ════════════════════════════════════
//   return (
//     <>
//       {/* Global font injection */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
//         body { font-family: 'DM Sans', sans-serif; background: #f7f7fa; }
//         @keyframes slideInRight { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
//         @keyframes fadeUp { from { transform: translateY(14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//         .animate-slide-in { animation: slideInRight 0.3s ease; }
//         .animate-fade-up   { animation: fadeUp 0.3s ease both; }
//       `}</style>

//       <Toast toasts={toasts} removeToast={removeToast} />

//       <div className="min-h-screen bg-gray-50">

//         {/* ── HEADER ────────────────────────────────────────────────────────── */}
//         <header className="bg-gray-900 text-white h-16 px-10 flex items-center justify-between border-b-2 border-gray-800">
//           <div className="flex items-center gap-3">
//             <div className="bg-violet-600 rounded-xl p-2 flex items-center justify-center">
//               <TagIcon />
//             </div>
//             <div>
//               <div className="font-extrabold text-lg tracking-tight leading-none">
//                 Category Manager
//               </div>
//               <div className="text-xs text-gray-500 mt-0.5">Customer Care Portal</div>
//             </div>
//           </div>
//           <Btn onClick={() => {
//             setEditCat(null);
//             setCatForm({ name: "", description: "" });
//             setShowCatModal(true);
//           }}>
//             <PlusIcon /> New Category
//           </Btn>
//         </header>

//         {/* ── BODY ──────────────────────────────────────────────────────────── */}
//         <main className="max-w-3xl mx-auto px-5 py-9">

//           {/* Stats Row */}
//           <div className="grid grid-cols-3 gap-4 mb-8">
//             {[
//               { label: "Total Categories", value: categories.length,                                        color: "text-violet-600" },
//               { label: "With Config",      value: Object.values(configs).filter(Boolean).length,            color: "text-emerald-500" },
//               { label: "Active",           value: categories.filter(c => c.isActive !== false).length,      color: "text-amber-500"   },
//             ].map(s => (
//               <div key={s.label}
//                 className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
//                 <div className={`text-3xl font-extrabold ${s.color}`}
//                   style={{ fontFamily: "'Syne', sans-serif" }}>
//                   {s.value}
//                 </div>
//                 <div className="text-sm text-gray-400 mt-1">{s.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Section title */}
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-xl font-extrabold text-gray-900 tracking-tight"
//               style={{ fontFamily: "'Syne', sans-serif" }}>
//               All Categories
//             </h2>
//             <span className="text-xs text-gray-400">Click a category to manage its configuration</span>
//           </div>

//           {/* ── CATEGORY LIST ────────────────────────────────────────────────── */}
//           {loading ? (
//             <div className="text-center py-16 text-gray-400">Loading categories...</div>
//           ) : categories.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
//               <div className="text-4xl mb-3">📂</div>
//               <div className="font-bold text-gray-600 text-base">No categories yet</div>
//               <div className="text-sm text-gray-400 mt-1">Create your first category to get started</div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {categories.map((cat, i) => {
//                 const isOpen  = expandedCategory === cat._id;
//                 const config  = configs[cat._id];

//                 return (
//                   <div key={cat._id}
//                     className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-200
//                       hover:shadow-lg hover:-translate-y-0.5 animate-fade-up
//                       ${isOpen ? "border-violet-300" : "border-gray-100"}`}
//                     style={{ animationDelay: `${i * 0.05}s` }}>

//                     {/* ── Category Row ── */}
//                     <div
//                       className="flex items-center gap-4 px-5 py-4 cursor-pointer"
//                       onClick={() => toggleExpand(cat._id)}>

//                       <CategoryAvatar name={cat.name} />

//                       <div className="flex-1 min-w-0">
//                         <div className="font-bold text-base text-gray-900 truncate">{cat.name}</div>
//                         {cat.description && (
//                           <div className="text-sm text-gray-400 mt-0.5 truncate">{cat.description}</div>
//                         )}
//                       </div>

//                       {/* Field count badge */}
//                       {config?.fields?.length > 0 && (
//                         <span className="bg-violet-50 text-violet-600 border border-violet-200 rounded-full px-3 py-0.5 text-xs font-bold whitespace-nowrap">
//                           {config.fields.length} fields
//                         </span>
//                       )}

//                       {/* Edit / Delete buttons */}
//                       <div className="flex gap-2" onClick={e => e.stopPropagation()}>
//                         <button
//                           onClick={() => {
//                             setEditCat(cat);
//                             setCatForm({ name: cat.name, description: cat.description || "" });
//                             setShowCatModal(true);
//                           }}
//                           className="bg-gray-100 hover:bg-gray-200 border-none rounded-lg p-2 cursor-pointer transition-colors">
//                           <EditIcon />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteCategory(cat._id)}
//                           className="bg-red-50 hover:bg-red-100 border-none rounded-lg p-2 cursor-pointer transition-colors text-red-500">
//                           <TrashIcon />
//                         </button>
//                       </div>

//                       {/* Expand chevron */}
//                       <div className={`text-gray-300 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>
//                         <ChevronRight />
//                       </div>
//                     </div>

//                     {/* ── Config Panel ── */}
//                     {isOpen && (
//                       <div className="border-t border-gray-100 bg-slate-50 px-5 py-5">

//                         {/* Config panel header */}
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
//                             <SettingsIcon />
//                             Configuration Fields
//                           </div>
//                           {config === null ? (
//                             <Btn onClick={() => openCreateConfig(cat)}>
//                               <PlusIcon /> Create Config
//                             </Btn>
//                           ) : config ? (
//                             <Btn variant="ghost" onClick={() => {
//                               setAddingField({
//                                 categoryId: cat._id,
//                                 field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" }
//                               });
//                               setShowFieldModal(true);
//                             }}>
//                               <PlusIcon /> Add Field
//                             </Btn>
//                           ) : null}
//                         </div>

//                         {/* States */}
//                         {config === undefined ? (
//                           <div className="text-center py-5 text-sm text-gray-400">Loading config...</div>
//                         ) : config === null ? (
//                           <div className="text-center py-7 border-2 border-dashed border-indigo-100 rounded-xl">
//                             <div className="text-3xl mb-2">⚙️</div>
//                             <div className="font-semibold text-gray-500 text-sm">No configuration yet</div>
//                             <div className="text-xs text-gray-400 mt-1">
//                               Create a config to define fields for <b>{cat.name}</b>
//                             </div>
//                           </div>
//                         ) : config.fields?.length === 0 ? (
//                           <div className="text-center py-4 text-sm text-gray-400">No fields yet. Add one!</div>
//                         ) : (
//                           <div className="flex flex-col gap-2">
//                             {/* Table header */}
//                             <div className="grid grid-cols-12 gap-3 px-3.5 py-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
//                               <span className="col-span-4">Field / Key</span>
//                               <span className="col-span-3">Type</span>
//                               <span className="col-span-2">Unit</span>
//                               <span className="col-span-2">Required</span>
//                               <span className="col-span-1"></span>
//                             </div>

//                             {/* Field rows */}
//                             {config.fields.map((field, fi) => (
//                               <div key={fi}
//                                 className="grid grid-cols-12 gap-3 px-3.5 py-3 bg-white rounded-xl border border-gray-100 items-center hover:bg-violet-50/30 transition-colors">

//                                 {/* Name + key */}
//                                 <div className="col-span-4">
//                                   <div className="font-bold text-sm text-gray-900">{field.fieldName}</div>
//                                   <div className="text-xs text-gray-400 font-mono mt-0.5">{field.fieldKey}</div>
//                                   {field.options?.length > 0 && (
//                                     <div className="flex flex-wrap gap-1 mt-1.5">
//                                       {field.options.map(o => (
//                                         <span key={o} className="bg-gray-100 text-gray-500 rounded px-1.5 py-0.5 text-xs">
//                                           {o}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   )}
//                                 </div>

//                                 {/* Type badge */}
//                                 <div className="col-span-3">
//                                   <FieldTypeBadge type={field.fieldType} />
//                                 </div>

//                                 {/* Unit */}
//                                 <div className="col-span-2 text-sm text-gray-400">{field.unit || "—"}</div>

//                                 {/* Required */}
//                                 <div className="col-span-2">
//                                   {field.isRequired
//                                     ? <span className="text-emerald-500 text-xs font-bold">✓ Yes</span>
//                                     : <span className="text-gray-300 text-xs">No</span>}
//                                 </div>

//                                 {/* Delete field */}
//                                 <div className="col-span-1 flex justify-end">
//                                   <button
//                                     onClick={() => handleRemoveField(cat._id, field.fieldKey)}
//                                     className="bg-red-50 hover:bg-red-100 border-none rounded-lg p-1.5 cursor-pointer text-red-400 transition-colors">
//                                     <TrashIcon />
//                                   </button>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* ══════════ MODAL: CREATE / EDIT CATEGORY ══════════ */}
//       <Modal
//         open={showCatModal}
//         onClose={() => { setShowCatModal(false); setEditCat(null); }}
//         title={editCat ? "Edit Category" : "New Category"}>
//         <div className="flex flex-col gap-4">
//           <Input
//             label="Category Name" required
//             placeholder="e.g. Laptop, Printer, AC"
//             value={catForm.name}
//             onChange={e => setCatForm(p => ({ ...p, name: e.target.value }))}
//           />
//           <Input
//             label="Description"
//             placeholder="Optional description"
//             value={catForm.description}
//             onChange={e => setCatForm(p => ({ ...p, description: e.target.value }))}
//           />
//           <div className="flex gap-3 justify-end mt-2">
//             <Btn variant="secondary" onClick={() => { setShowCatModal(false); setEditCat(null); }}>
//               Cancel
//             </Btn>
//             <Btn onClick={handleSaveCategory}>
//               {editCat ? "Update" : "Create Category"}
//             </Btn>
//           </div>
//         </div>
//       </Modal>

//       {/* ══════════ MODAL: CREATE CONFIG ══════════ */}
//       <Modal
//         open={showConfigModal}
//         onClose={() => setShowConfigModal(false)}
//         title={`Config for "${activeCategoryForConfig?.name}"`}>
//         <div className="flex flex-col gap-4">
//           <p className="text-sm text-gray-400 -mt-2">
//             Define the fields that will appear when registering a{" "}
//             <b className="text-gray-700">{activeCategoryForConfig?.name}</b>.
//           </p>

//           {/* Field builder box */}
//           <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 border border-gray-100">
//             <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Add a field</div>
//             <div className="grid grid-cols-2 gap-3">
//               <Input
//                 label="Field Name" placeholder="e.g. RAM"
//                 value={newField.fieldName}
//                 onChange={e => setNewField(p => ({
//                   ...p, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value)
//                 }))}
//               />
//               <Input
//                 label="Field Key" placeholder="auto-filled"
//                 value={newField.fieldKey}
//                 onChange={e => setNewField(p => ({ ...p, fieldKey: e.target.value }))}
//               />
//               <Select
//                 label="Type" value={newField.fieldType}
//                 onChange={e => setNewField(p => ({ ...p, fieldType: e.target.value }))}>
//                 {["String", "Number", "Boolean", "Date"].map(t => <option key={t}>{t}</option>)}
//               </Select>
//               <Input
//                 label="Unit (optional)" placeholder="GB, inch..."
//                 value={newField.unit}
//                 onChange={e => setNewField(p => ({ ...p, unit: e.target.value }))}
//               />
//             </div>
//             <Input
//               label="Options (comma separated, optional)"
//               placeholder="8GB, 16GB, 32GB"
//               value={newField.options}
//               onChange={e => setNewField(p => ({ ...p, options: e.target.value }))}
//             />
//             <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
//               <input
//                 type="checkbox" checked={newField.isRequired}
//                 onChange={e => setNewField(p => ({ ...p, isRequired: e.target.checked }))}
//                 className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
//               />
//               Required field
//             </label>
//             <Btn variant="ghost" onClick={addFieldToForm}>
//               <PlusIcon /> Add to list
//             </Btn>
//           </div>

//           {/* Queued fields */}
//           {configFields.length > 0 && (
//             <div className="flex flex-col gap-2">
//               <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
//                 Fields to create ({configFields.length})
//               </div>
//               {configFields.map(f => (
//                 <div key={f._tempId}
//                   className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
//                   <div>
//                     <span className="font-bold text-sm text-gray-900">{f.fieldName}</span>
//                     <span className="text-gray-400 text-xs ml-2">({f.fieldKey})</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <FieldTypeBadge type={f.fieldType} />
//                     {f.isRequired && (
//                       <span className="text-emerald-500 text-xs font-bold">REQUIRED</span>
//                     )}
//                     <button
//                       onClick={() => setConfigFields(p => p.filter(x => x._tempId !== f._tempId))}
//                       className="bg-red-50 hover:bg-red-100 border-none rounded-lg p-1 cursor-pointer text-red-400 transition-colors">
//                       <XIcon />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="flex gap-3 justify-end mt-1">
//             <Btn variant="secondary" onClick={() => setShowConfigModal(false)}>Cancel</Btn>
//             <Btn onClick={handleCreateConfig} disabled={configFields.length === 0}>
//               <CheckIcon /> Save Configuration
//             </Btn>
//           </div>
//         </div>
//       </Modal>

//       {/* ══════════ MODAL: ADD FIELD TO EXISTING CONFIG ══════════ */}
//       <Modal
//         open={showFieldModal}
//         onClose={() => setShowFieldModal(false)}
//         title="Add New Field">
//         <div className="flex flex-col gap-4">
//           <div className="grid grid-cols-2 gap-3">
//             <Input
//               label="Field Name" required placeholder="e.g. Screen Size"
//               value={addingField.field.fieldName}
//               onChange={e => setAddingField(p => ({
//                 ...p, field: { ...p.field, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value) }
//               }))}
//             />
//             <Input
//               label="Field Key" placeholder="auto-filled"
//               value={addingField.field.fieldKey}
//               onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldKey: e.target.value } }))}
//             />
//             <Select
//               label="Type" value={addingField.field.fieldType}
//               onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldType: e.target.value } }))}>
//               {["String", "Number", "Boolean", "Date"].map(t => <option key={t}>{t}</option>)}
//             </Select>
//             <Input
//               label="Unit (optional)" placeholder="GB, inch..."
//               value={addingField.field.unit}
//               onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, unit: e.target.value } }))}
//             />
//           </div>
//           <Input
//             label="Options (comma separated)"
//             placeholder="8GB, 16GB, 32GB"
//             value={addingField.field.options}
//             onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, options: e.target.value } }))}
//           />
//           <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
//             <input
//               type="checkbox" checked={addingField.field.isRequired}
//               onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, isRequired: e.target.checked } }))}
//               className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
//             />
//             Required field
//           </label>
//           <div className="flex gap-3 justify-end mt-1">
//             <Btn variant="secondary" onClick={() => setShowFieldModal(false)}>Cancel</Btn>
//             <Btn onClick={handleAddFieldToExisting}><PlusIcon /> Add Field</Btn>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }


// import { useState, useEffect } from "react";
// import React from "react";
// import axiosInstance from "../../Utils/axiosIntance";


// const Icon = ({ d, size = 18, color = "currentColor" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
//     stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//     <path d={d} />
//   </svg>
// );
// const PlusIcon    = () => <Icon d="M12 5v14M5 12h14" />;
// const TrashIcon   = () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
// const ChevronRight= () => <Icon d="M9 18l6-6-6-6" />;
// const SettingsIcon= () => <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />;
// const TagIcon     = () => <Icon d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01" />;
// const XIcon       = () => <Icon d="M18 6L6 18M6 6l12 12" />;
// const CheckIcon   = () => <Icon d="M20 6L9 17l-5-5" />;
// const EditIcon    = () => <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />;

// // ─── TYPE COLORS (Tailwind can't do dynamic colors, so we keep these minimal inline) ──
// const TYPE_COLORS = {
//   String:  { bg: "#6C63FF22", text: "#6C63FF", border: "#6C63FF44" },
//   Number:  { bg: "#00C89622", text: "#00C896", border: "#00C89644" },
//   Boolean: { bg: "#FF6B6B22", text: "#FF6B6B", border: "#FF6B6B44" },
//   Date:    { bg: "#FFB34722", text: "#FFB347", border: "#FFB34744" },
// };

// // ─── FIELD TYPE BADGE ─────────────────────────────────────────────────────────
// const FieldTypeBadge = ({ type }) => {
//   const c = TYPE_COLORS[type] || TYPE_COLORS.String;
//   return (
//     <span className="rounded px-2 py-0.5 text-xs font-bold tracking-wide"
//       style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
//       {type}
//     </span>
//   );
// };

// // ─── TOAST ───────────────────────────────────────────────────────────────────
// const Toast = ({ toasts, removeToast }) => (
//   <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
//     {toasts.map(t => (
//       <div key={t.id}
//         className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border border-black/10 min-w-64 animate-bounce-in font-semibold text-sm text-gray-900
//           ${t.type === "success" ? "bg-emerald-400" : t.type === "error" ? "bg-red-400" : "bg-white"}`}>
//         {t.type === "success" ? <CheckIcon /> : <XIcon />}
//         <span className="flex-1">{t.message}</span>
//         <button onClick={() => removeToast(t.id)} className="opacity-60 hover:opacity-100 bg-transparent border-none cursor-pointer">
//           <XIcon />
//         </button>
//       </div>
//     ))}
//   </div>
// );

// // ─── MODAL ───────────────────────────────────────────────────────────────────
// const Modal = ({ open, onClose, title, children }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5"
//       onClick={onClose}>
//       <div onClick={e => e.stopPropagation()}
//         className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
//           <h3 className="text-lg font-bold text-gray-900 tracking-tight"
//             style={{ fontFamily: "'Syne', sans-serif" }}>
//             {title}
//           </h3>
//           <button onClick={onClose}
//             className="bg-gray-100 hover:bg-gray-200 border-none rounded-lg p-2 cursor-pointer transition-colors">
//             <XIcon />
//           </button>
//         </div>
//         {/* Modal Body */}
//         <div className="px-7 py-6">{children}</div>
//       </div>
//     </div>
//   );
// };

// // ─── INPUT ───────────────────────────────────────────────────────────────────
// const Input = ({ label, required, className = "", ...props }) => (
//   <div className="flex flex-col gap-1.5">
//     {label && (
//       <label className="text-xs font-bold text-gray-500 tracking-wide uppercase">
//         {label}{required && <span className="text-red-500"> *</span>}
//       </label>
//     )}
//     <input
//       {...props}
//       className={`border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none
//         focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all placeholder:text-gray-400 ${className}`}
//     />
//   </div>
// );

// // ─── SELECT ──────────────────────────────────────────────────────────────────
// const Select = ({ label, required, children, className = "", ...props }) => (
//   <div className="flex flex-col gap-1.5">
//     {label && (
//       <label className="text-xs font-bold text-gray-500 tracking-wide uppercase">
//         {label}{required && <span className="text-red-500"> *</span>}
//       </label>
//     )}
//     <select
//       {...props}
//       className={`border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none
//         focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all cursor-pointer ${className}`}>
//       {children}
//     </select>
//   </div>
// );

// // ─── BUTTON ──────────────────────────────────────────────────────────────────
// const variantClasses = {
//   primary:   "bg-gray-900 text-white border-transparent hover:bg-gray-700",
//   secondary: "bg-gray-100 text-gray-900 border-transparent hover:bg-gray-200",
//   danger:    "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100",
//   ghost:     "bg-transparent text-violet-600 border border-violet-200 hover:bg-violet-50",
// };

// const Btn = ({ variant = "primary", children, loading, className = "", ...props }) => (
//   <button
//     {...props}
//     className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold
//       transition-all whitespace-nowrap border
//       disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
//       ${variantClasses[variant]} ${className}`}>
//     {loading ? "⏳" : children}
//   </button>
// );

// // ─── AVATAR (category color from name) ───────────────────────────────────────
// // Tailwind can't do dynamic hsl, so we keep this one inline
// const CategoryAvatar = ({ name }) => {
//   const hue = (name.charCodeAt(0) * 37) % 360;
//   return (
//     <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-extrabold flex-shrink-0"
//       style={{ background: `hsl(${hue},70%,94%)`, color: `hsl(${hue},60%,40%)` }}>
//       {name[0].toUpperCase()}
//     </div>
//   );
// };

// // ═══════════════════════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // ═══════════════════════════════════════════════════════════════════════════════
// export default function CustomerCareHome() {
//   const [categories, setCategories]           = useState([]);
//   const [configs, setConfigs]                 = useState({});
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [loading, setLoading]                 = useState(false);
//   const [toasts, setToasts]                   = useState([]);

//   // Modals
//   const [showCatModal, setShowCatModal]         = useState(false);
//   const [showConfigModal, setShowConfigModal]   = useState(false);
//   const [showFieldModal, setShowFieldModal]     = useState(false);
//   const [activeCategoryForConfig, setActiveCategoryForConfig] = useState(null);
  
//   // ✅ STEP 1 — Add State for Product Registration
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [registerCategory, setRegisterCategory] = useState(null);
//   const [registerForm, setRegisterForm] = useState({});
//   const [quantity, setQuantity] = useState(1);

//   // Forms
//   const [catForm, setCatForm]       = useState({ name: "", description: "" });
//   const [configFields, setConfigFields] = useState([]);
//   const [editCat, setEditCat]       = useState(null);
//   const [newField, setNewField]     = useState({
//     fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: ""
//   });
//   const [addingField, setAddingField] = useState({
//     categoryId: null,
//     field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" }
//   });

//   // ── TOAST HELPERS ──────────────────────────────────────────────────────────
//   const addToast = (message, type = "success") => {
//     const id = Date.now();
//     setToasts(p => [...p, { id, message, type }]);
//     setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
//   };
//   const removeToast = (id) => setToasts(p => p.filter(t => t.id !== id));

//   // ── API ────────────────────────────────────────────────────────────────────
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.get("/category/allproducts");
//       setCategories(data.data || []);
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed to load categories", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchConfig = async (categoryId) => {
//     if (configs[categoryId] !== undefined) return;
//     try {
//       const { data } = await axiosInstance.get(`/product/${categoryId}/configurations`);
//       setConfigs(p => ({ ...p, [categoryId]: data.data }));
//     } catch (e) {
//       setConfigs(p => ({ ...p, [categoryId]: null }));
//       addToast(e.response?.data?.message || "Failed to load configuration", "error");
//     }
//   };

//   useEffect(() => { fetchCategories(); }, []);

  
//   const handleSaveCategory = async () => {
//     if (!catForm.name.trim()) return addToast("Category name is required", "error");
//     try {
//       if (editCat) {
//         await axiosInstance.put(`/category/updateProduct/${editCat._id}`, catForm);
//         addToast("Category updated!");
//       } else {
//         await axiosInstance.post("/category/createCategory", catForm);
//         addToast("Category created!");
//       }
//       setShowCatModal(false);
//       setCatForm({ name: "", description: "" });
//       setEditCat(null);
//       fetchCategories();
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     if (!confirm("Deactivate this category?")) return;
//     try {
//       await axiosInstance.delete(`/category/${id}`);
//       addToast("Category deactivated");
//       fetchCategories();
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   };

//   // ── CONFIG ─────────────────────────────────────────────────────────────────
//   const openCreateConfig = (cat) => {
//     setActiveCategoryForConfig(cat);
//     setConfigFields([]);
//     setShowConfigModal(true);
//   };

//   const toFieldKey = (name) =>
//     name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");

//   const addFieldToForm = () => {
//     if (!newField.fieldName || !newField.fieldKey)
//       return addToast("Field name & key required", "error");
//     const options = newField.options
//       ? newField.options.split(",").map(o => o.trim()).filter(Boolean)
//       : [];
//     setConfigFields(p => [...p, { ...newField, options, _tempId: Date.now() }]);
//     setNewField({ fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" });
//   };

//   const handleCreateConfig = async () => {
//     if (!configFields.length) return addToast("Add at least one field", "error");
//     try {
//       await axiosInstance.post("/product/configuration", {
//         category: activeCategoryForConfig._id,
//         fields: configFields.map(({ _tempId, ...f }) => f),
//       });
//       addToast("Configuration created!");
//       setShowConfigModal(false);
//       setConfigs(p => ({ ...p, [activeCategoryForConfig._id]: undefined }));
//       fetchConfig(activeCategoryForConfig._id);
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   };

//   const handleAddFieldToExisting = async () => {
//     const { categoryId, field } = addingField;
//     if (!field.fieldName || !field.fieldKey)
//       return addToast("Field name & key required", "error");
//     const options = field.options
//       ? field.options.split(",").map(o => o.trim()).filter(Boolean)
//       : [];
//     try {
//       await axiosInstance.post(`/product/addconfigration/${categoryId}/add-field`, { ...field, options });
//       addToast("Field added!");
//       setShowFieldModal(false);
//       setConfigs(p => ({ ...p, [categoryId]: undefined }));
//       fetchConfig(categoryId);
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   };

//   const handleRemoveField = async (categoryId, fieldKey) => {
//     if (!confirm(`Remove field "${fieldKey}"?`)) return;
//     try {
//       await axiosInstance.delete(`/product/removeconfigration/${categoryId}/remove-field/${fieldKey}`);
//       addToast("Field removed");
//       setConfigs(p => ({ ...p, [categoryId]: undefined }));
//       fetchConfig(categoryId);
//     } catch (e) {
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   };

//   const toggleExpand = (catId) => {
//     if (expandedCategory === catId) {
//       setExpandedCategory(null);
//     } else {
//       setExpandedCategory(catId);
//       fetchConfig(catId);
//     }
//   };

  
//   return (
//     <>
//       {/* Global font injection */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
//         body { font-family: 'DM Sans', sans-serif; background: #f7f7fa; }
//         @keyframes slideInRight { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
//         @keyframes fadeUp { from { transform: translateY(14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//         .animate-slide-in { animation: slideInRight 0.3s ease; }
//         .animate-fade-up   { animation: fadeUp 0.3s ease both; }
//       `}</style>

//       <Toast toasts={toasts} removeToast={removeToast} />

//       <div className="min-h-screen bg-gray-50">

//         {/* ── HEADER ────────────────────────────────────────────────────────── */}
//         <header className="bg-gray-900 text-white h-16 px-10 flex items-center justify-between border-b-2 border-gray-800">
//           <div className="flex items-center gap-3">
//             <div className="bg-violet-600 rounded-xl p-2 flex items-center justify-center">
//               <TagIcon />
//             </div>
//             <div>
//               <div className="font-extrabold text-lg tracking-tight leading-none">
//                 Category Manager
//               </div>
//               <div className="text-xs text-gray-500 mt-0.5">Customer Care Portal</div>
//             </div>
//           </div>
//           <Btn onClick={() => {
//             setEditCat(null);
//             setCatForm({ name: "", description: "" });
//             setShowCatModal(true);
//           }}>
//             <PlusIcon /> New Category
//           </Btn>
//         </header>

//         {/* ── BODY ──────────────────────────────────────────────────────────── */}
//         <main className="max-w-3xl mx-auto px-5 py-9">

//           {/* Stats Row */}
//           <div className="grid grid-cols-3 gap-4 mb-8">
//             {[
//               { label: "Total Categories", value: categories.length,                                        color: "text-violet-600" },
//               { label: "With Config",      value: Object.values(configs).filter(Boolean).length,            color: "text-emerald-500" },
//               { label: "Active",           value: categories.filter(c => c.isActive !== false).length,      color: "text-amber-500"   },
//             ].map(s => (
//               <div key={s.label}
//                 className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
//                 <div className={`text-3xl font-extrabold ${s.color}`}
//                   style={{ fontFamily: "'Syne', sans-serif" }}>
//                   {s.value}
//                 </div>
//                 <div className="text-sm text-gray-400 mt-1">{s.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Section title */}
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-xl font-extrabold text-gray-900 tracking-tight"
//               style={{ fontFamily: "'Syne', sans-serif" }}>
//               All Categories
//             </h2>
//             <span className="text-xs text-gray-400">Click a category to manage its configuration</span>
//           </div>

//           {/* ── CATEGORY LIST ────────────────────────────────────────────────── */}
//           {loading ? (
//             <div className="text-center py-16 text-gray-400">Loading categories...</div>
//           ) : categories.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
//               <div className="text-4xl mb-3">📂</div>
//               <div className="font-bold text-gray-600 text-base">No categories yet</div>
//               <div className="text-sm text-gray-400 mt-1">Create your first category to get started</div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {categories.map((cat, i) => {
//                 const isOpen  = expandedCategory === cat._id;
//                 const config  = configs[cat._id];

//                 return (
//                   <div key={cat._id}
//                     className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-200
//                       hover:shadow-lg hover:-translate-y-0.5 animate-fade-up
//                       ${isOpen ? "border-violet-300" : "border-gray-100"}`}
//                     style={{ animationDelay: `${i * 0.05}s` }}>

//                     {/* ── Category Row ── */}
//                     <div
//                       className="flex items-center gap-4 px-5 py-4 cursor-pointer"
//                       onClick={() => toggleExpand(cat._id)}>

//                       <CategoryAvatar name={cat.name} />

//                       <div className="flex-1 min-w-0">
//                         <div className="font-bold text-base text-gray-900 truncate">{cat.name}</div>
//                         {cat.description && (
//                           <div className="text-sm text-gray-400 mt-0.5 truncate">{cat.description}</div>
//                         )}
//                       </div>

//                       {/* Field count badge */}
//                       {config?.fields?.length > 0 && (
//                         <span className="bg-violet-50 text-violet-600 border border-violet-200 rounded-full px-3 py-0.5 text-xs font-bold whitespace-nowrap">
//                           {config.fields.length} fields
//                         </span>
//                       )}

//                       {/* Edit / Delete buttons */}
//                       <div className="flex gap-2" onClick={e => e.stopPropagation()}>
//                         <button
//                           onClick={() => {
//                             setEditCat(cat);
//                             setCatForm({ name: cat.name, description: cat.description || "" });
//                             setShowCatModal(true);
//                           }}
//                           className="bg-gray-100 hover:bg-gray-200 border-none rounded-lg p-2 cursor-pointer transition-colors">
//                           <EditIcon />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteCategory(cat._id)}
//                           className="bg-red-50 hover:bg-red-100 border-none rounded-lg p-2 cursor-pointer transition-colors text-red-500">
//                           <TrashIcon />
//                         </button>
//                       </div>

//                       {/* Expand chevron */}
//                       <div className={`text-gray-300 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>
//                         <ChevronRight />
//                       </div>
//                     </div>

//                     {/* ── Config Panel ── */}
//                     {isOpen && (
//                       <div className="border-t border-gray-100 bg-slate-50 px-5 py-5">

//                         {/* Config panel header */}
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
//                             <SettingsIcon />
//                             Configuration Fields
//                           </div>
//                           <div className="flex gap-2">
//                             {/* ✅ STEP 2 — Add Register Button */}
//                             {config && (
//                               <Btn
//                                 variant="secondary"
//                                 onClick={() => {
//                                   setRegisterCategory(cat);
//                                   setRegisterForm({});
//                                   setQuantity(1);
//                                   setShowRegisterModal(true);
//                                 }}
//                               >
//                                 Register Product
//                               </Btn>
//                             )}
                            
//                             {config === null ? (
//                               <Btn onClick={() => openCreateConfig(cat)}>
//                                 <PlusIcon /> Create Config
//                               </Btn>
//                             ) : config ? (
//                               <Btn variant="ghost" onClick={() => {
//                                 setAddingField({
//                                   categoryId: cat._id,
//                                   field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" }
//                                 });
//                                 setShowFieldModal(true);
//                               }}>
//                                 <PlusIcon /> Add Field
//                               </Btn>
//                             ) : null}
//                           </div>
//                         </div>

//                         {/* States */}
//                         {config === undefined ? (
//                           <div className="text-center py-5 text-sm text-gray-400">Loading config...</div>
//                         ) : config === null ? (
//                           <div className="text-center py-7 border-2 border-dashed border-indigo-100 rounded-xl">
//                             <div className="text-3xl mb-2">⚙️</div>
//                             <div className="font-semibold text-gray-500 text-sm">No configuration yet</div>
//                             <div className="text-xs text-gray-400 mt-1">
//                               Create a config to define fields for <b>{cat.name}</b>
//                             </div>
//                           </div>
//                         ) : config.fields?.length === 0 ? (
//                           <div className="text-center py-4 text-sm text-gray-400">No fields yet. Add one!</div>
//                         ) : (
//                           <div className="flex flex-col gap-2">
//                             {/* Table header */}
//                             <div className="grid grid-cols-12 gap-3 px-3.5 py-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
//                               <span className="col-span-4">Field / Key</span>
//                               <span className="col-span-3">Type</span>
//                               <span className="col-span-2">Unit</span>
//                               <span className="col-span-2">Required</span>
//                               <span className="col-span-1"></span>
//                             </div>

//                             {/* Field rows */}
//                             {config.fields.map((field, fi) => (
//                               <div key={fi}
//                                 className="grid grid-cols-12 gap-3 px-3.5 py-3 bg-white rounded-xl border border-gray-100 items-center hover:bg-violet-50/30 transition-colors">

//                                 {/* Name + key */}
//                                 <div className="col-span-4">
//                                   <div className="font-bold text-sm text-gray-900">{field.fieldName}</div>
//                                   <div className="text-xs text-gray-400 font-mono mt-0.5">{field.fieldKey}</div>
//                                   {field.options?.length > 0 && (
//                                     <div className="flex flex-wrap gap-1 mt-1.5">
//                                       {field.options.map(o => (
//                                         <span key={o} className="bg-gray-100 text-gray-500 rounded px-1.5 py-0.5 text-xs">
//                                           {o}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   )}
//                                 </div>

//                                 {/* Type badge */}
//                                 <div className="col-span-3">
//                                   <FieldTypeBadge type={field.fieldType} />
//                                 </div>

//                                 {/* Unit */}
//                                 <div className="col-span-2 text-sm text-gray-400">{field.unit || "—"}</div>

//                                 {/* Required */}
//                                 <div className="col-span-2">
//                                   {field.isRequired
//                                     ? <span className="text-emerald-500 text-xs font-bold">✓ Yes</span>
//                                     : <span className="text-gray-300 text-xs">No</span>}
//                                 </div>

//                                 {/* Delete field */}
//                                 <div className="col-span-1 flex justify-end">
//                                   <button
//                                     onClick={() => handleRemoveField(cat._id, field.fieldKey)}
//                                     className="bg-red-50 hover:bg-red-100 border-none rounded-lg p-1.5 cursor-pointer text-red-400 transition-colors">
//                                     <TrashIcon />
//                                   </button>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* ══════════ MODAL: CREATE / EDIT CATEGORY ══════════ */}
//       <Modal
//         open={showCatModal}
//         onClose={() => { setShowCatModal(false); setEditCat(null); }}
//         title={editCat ? "Edit Category" : "New Category"}>
//         <div className="flex flex-col gap-4">
//           <Input
//             label="Category Name" required
//             placeholder="e.g. Laptop, Printer, AC"
//             value={catForm.name}
//             onChange={e => setCatForm(p => ({ ...p, name: e.target.value }))}
//           />
//           <Input
//             label="Description"
//             placeholder="Optional description"
//             value={catForm.description}
//             onChange={e => setCatForm(p => ({ ...p, description: e.target.value }))}
//           />
//           <div className="flex gap-3 justify-end mt-2">
//             <Btn variant="secondary" onClick={() => { setShowCatModal(false); setEditCat(null); }}>
//               Cancel
//             </Btn>
//             <Btn onClick={handleSaveCategory}>
//               {editCat ? "Update" : "Create Category"}
//             </Btn>
//           </div>
//         </div>
//       </Modal>

//       {/* ══════════ MODAL: CREATE CONFIG ══════════ */}
//       <Modal
//         open={showConfigModal}
//         onClose={() => setShowConfigModal(false)}
//         title={`Config for "${activeCategoryForConfig?.name}"`}>
//         <div className="flex flex-col gap-4">
//           <p className="text-sm text-gray-400 -mt-2">
//             Define the fields that will appear when registering a{" "}
//             <b className="text-gray-700">{activeCategoryForConfig?.name}</b>.
//           </p>

//           {/* Field builder box */}
//           <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 border border-gray-100">
//             <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Add a field</div>
//             <div className="grid grid-cols-2 gap-3">
//               <Input
//                 label="Field Name" placeholder="e.g. RAM"
//                 value={newField.fieldName}
//                 onChange={e => setNewField(p => ({
//                   ...p, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value)
//                 }))}
//               />
//               <Input
//                 label="Field Key" placeholder="auto-filled"
//                 value={newField.fieldKey}
//                 onChange={e => setNewField(p => ({ ...p, fieldKey: e.target.value }))}
//               />
//               <Select
//                 label="Type" value={newField.fieldType}
//                 onChange={e => setNewField(p => ({ ...p, fieldType: e.target.value }))}>
//                 {["String", "Number", "Boolean", "Date"].map(t => <option key={t}>{t}</option>)}
//               </Select>
//               <Input
//                 label="Unit (optional)" placeholder="GB, inch..."
//                 value={newField.unit}
//                 onChange={e => setNewField(p => ({ ...p, unit: e.target.value }))}
//               />
//             </div>
//             <Input
//               label="Options (comma separated, optional)"
//               placeholder="8GB, 16GB, 32GB"
//               value={newField.options}
//               onChange={e => setNewField(p => ({ ...p, options: e.target.value }))}
//             />
//             <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
//               <input
//                 type="checkbox" checked={newField.isRequired}
//                 onChange={e => setNewField(p => ({ ...p, isRequired: e.target.checked }))}
//                 className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
//               />
//               Required field
//             </label>
//             <Btn variant="ghost" onClick={addFieldToForm}>
//               <PlusIcon /> Add to list
//             </Btn>
//           </div>

//           {/* Queued fields */}
//           {configFields.length > 0 && (
//             <div className="flex flex-col gap-2">
//               <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
//                 Fields to create ({configFields.length})
//               </div>
//               {configFields.map(f => (
//                 <div key={f._tempId}
//                   className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
//                   <div>
//                     <span className="font-bold text-sm text-gray-900">{f.fieldName}</span>
//                     <span className="text-gray-400 text-xs ml-2">({f.fieldKey})</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <FieldTypeBadge type={f.fieldType} />
//                     {f.isRequired && (
//                       <span className="text-emerald-500 text-xs font-bold">REQUIRED</span>
//                     )}
//                     <button
//                       onClick={() => setConfigFields(p => p.filter(x => x._tempId !== f._tempId))}
//                       className="bg-red-50 hover:bg-red-100 border-none rounded-lg p-1 cursor-pointer text-red-400 transition-colors">
//                       <XIcon />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="flex gap-3 justify-end mt-1">
//             <Btn variant="secondary" onClick={() => setShowConfigModal(false)}>Cancel</Btn>
//             <Btn onClick={handleCreateConfig} disabled={configFields.length === 0}>
//               <CheckIcon /> Save Configuration
//             </Btn>
//           </div>
//         </div>
//       </Modal>

//       {/* ══════════ MODAL: ADD FIELD TO EXISTING CONFIG ══════════ */}
//       <Modal
//         open={showFieldModal}
//         onClose={() => setShowFieldModal(false)}
//         title="Add New Field">
//         <div className="flex flex-col gap-4">
//           <div className="grid grid-cols-2 gap-3">
//             <Input
//               label="Field Name" required placeholder="e.g. Screen Size"
//               value={addingField.field.fieldName}
//               onChange={e => setAddingField(p => ({
//                 ...p, field: { ...p.field, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value) }
//               }))}
//             />
//             <Input
//               label="Field Key" placeholder="auto-filled"
//               value={addingField.field.fieldKey}
//               onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldKey: e.target.value } }))}
//             />
//             <Select
//               label="Type" value={addingField.field.fieldType}
//               onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldType: e.target.value } }))}>
//               {["String", "Number", "Boolean", "Date"].map(t => <option key={t}>{t}</option>)}
//             </Select>
//             <Input
//               label="Unit (optional)" placeholder="GB, inch..."
//               value={addingField.field.unit}
//               onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, unit: e.target.value } }))}
//             />
//           </div>
//           <Input
//             label="Options (comma separated)"
//             placeholder="8GB, 16GB, 32GB"
//             value={addingField.field.options}
//             onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, options: e.target.value } }))}
//           />
//           <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
//             <input
//               type="checkbox" checked={addingField.field.isRequired}
//               onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, isRequired: e.target.checked } }))}
//               className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
//             />
//             Required field
//           </label>
//           <div className="flex gap-3 justify-end mt-1">
//             <Btn variant="secondary" onClick={() => setShowFieldModal(false)}>Cancel</Btn>
//             <Btn onClick={handleAddFieldToExisting}><PlusIcon /> Add Field</Btn>
//           </div>
//         </div>
//       </Modal>

//       {/* ══════════ MODAL: REGISTER PRODUCT ══════════ */}
//       <Modal
//         open={showRegisterModal}
//         onClose={() => setShowRegisterModal(false)}
//         title={`Register ${registerCategory?.name}`}
//       >
//         <div className="flex flex-col gap-4">

//           <Input
//             label="Product Name"
//             required
//             placeholder="Enter product name"
//             value={registerForm.productName || ""}
//             onChange={e =>
//               setRegisterForm(p => ({ ...p, productName: e.target.value }))
//             }
//           />

//           {/* Dynamic Configuration Fields */}
//           {configs[registerCategory?._id]?.fields?.map(field => (
//             <div key={field.fieldKey}>
//               {field.fieldType === "Boolean" ? (
//                 <label className="flex items-center gap-2 text-sm cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={registerForm[field.fieldKey] || false}
//                     onChange={e =>
//                       setRegisterForm(p => ({
//                         ...p,
//                         [field.fieldKey]: e.target.checked
//                       }))
//                     }
//                   />
//                   {field.fieldName}
//                 </label>
//               ) : (
//                 <Input
//                   label={field.fieldName}
//                   required={field.isRequired}
//                   type={
//                     field.fieldType === "Number"
//                       ? "number"
//                       : field.fieldType === "Date"
//                       ? "date"
//                       : "text"
//                   }
//                   value={registerForm[field.fieldKey] || ""}
//                   onChange={e =>
//                     setRegisterForm(p => ({
//                       ...p,
//                       [field.fieldKey]: e.target.value
//                     }))
//                   }
//                 />
//               )}
//             </div>
//           ))}

//           <Input
//             label="Quantity"
//             type="number"
//             min="1"
//             value={quantity}
//             onChange={e => setQuantity(Number(e.target.value))}
//           />

//           <div className="flex gap-3 justify-end mt-2">
//             <Btn variant="secondary" onClick={() => setShowRegisterModal(false)}>
//               Cancel
//             </Btn>

//             {/* <Btn
//               onClick={async () => {
//                 try {
//                   await axiosInstance.post("/category/register", {
//                     category: registerCategory._id,
//                     productName: registerForm.productName,
//                     configurations: registerForm,
//                     quantity,
//                     batch: registerForm.batch 
//                   });

//                   addToast("Product registered successfully!");
//                   setShowRegisterModal(false);
//                 } catch (e) {
//                   addToast(e.response?.data?.message || "Failed", "error");
//                 }
//               }}
//             >
//               Register
//             </Btn> */}
//            <Btn
//   onClick={async () => {
//     try {
//       const { productName, ...configFields } = registerForm;
      
//       // 👇 ADD THIS - see exactly what you're sending
//       console.log("📤 Sending to backend:", {
//         category: registerCategory._id,
//         productName,
//         configurations: configFields,
//         quantity
//       });

//       await axiosInstance.post("/category/register", {
//         category: registerCategory._id,
//         productName,
//         configurations: configFields,
//         quantity
//       });

//       addToast("Product registered successfully!");
//       setShowRegisterModal(false);
//     } catch (e) {
//       console.log("❌ Full error:", e.response?.data); // 👈 ADD THIS
//       addToast(e.response?.data?.message || "Failed", "error");
//     }
//   }}
// >
//   Register
// </Btn>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }

// import { useState, useEffect } from "react";
// import React from "react";
// import axiosInstance from "../../Utils/axiosIntance";

// // ─── ICONS ────────────────────────────────────────────────────────────────────
// const Icon = ({ d, size = 16, color = "currentColor", strokeWidth = 2 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
//     stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
//     <path d={d} />
//   </svg>
// );
// const PlusIcon     = () => <Icon d="M12 5v14M5 12h14" />;
// const TrashIcon    = () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
// const ChevronDown  = () => <Icon d="M6 9l6 6 6-6" />;
// const SettingsIcon = () => <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />;
// const XIcon        = () => <Icon d="M18 6L6 18M6 6l12 12" />;
// const CheckIcon    = () => <Icon d="M20 6L9 17l-5-5" />;
// const EditIcon     = () => <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />;
// const BoxIcon      = () => <Icon d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />;
// const CalendarIcon = () => <Icon d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />;

// // ─── COLOR TOKENS ─────────────────────────────────────────────────────────────
// const C = {
//   pageBg:        "#eef2f5",
//   cardBg:        "#ffffff",
//   headerBg:      "linear-gradient(135deg, #1a3a4f 0%, #1F6E8C 100%)",
//   panelBg:       "#e8f4f9",
//   inputBg:       "#f4f9fc",
//   border:        "#d0e8f2",
//   borderMid:     "#b3d4e2",
//   textPrimary:   "#0e2535",
//   textSecondary: "#3d7a90",
//   textMuted:     "#85afc0",
//   teal:          "#1F6E8C",
//   tealLight:     "#2a8faf",
//   tealPale:      "#dbedf5",
//   green:         "#6BA368",
//   greenPale:     "#e6f3e5",
//   amber:         "#D9A441",
//   amberPale:     "#fdf3de",
//   red:           "#d95555",
//   redPale:       "#fce8e8",
// };

// const FIELD_TYPES = ["String", "Number", "Date"];

// const TYPE_META = {
//   String: { color: "#1F6E8C", bg: "#dbedf5", label: "STR"  },
//   Number: { color: "#6BA368", bg: "#e6f3e5", label: "NUM"  },
//   Date:   { color: "#D9A441", bg: "#fdf3de", label: "DATE" },
// };

// const FieldTypeBadge = ({ type }) => {
//   const m = TYPE_META[type] || TYPE_META.String;
//   return (
//     <span style={{
//       background: m.bg, color: m.color,
//       border: `1px solid ${m.color}44`,
//       padding: "2px 8px", borderRadius: 4,
//       fontSize: 10, fontWeight: 700,
//       fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em"
//     }}>{m.label}</span>
//   );
// };

// // ─── TOAST ────────────────────────────────────────────────────────────────────
// const Toast = ({ toasts, removeToast }) => (
//   <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999,
//     display: "flex", flexDirection: "column", gap: 10 }}>
//     {toasts.map(t => (
//       <div key={t.id} style={{
//         display: "flex", alignItems: "center", gap: 12,
//         padding: "12px 16px", background: "#fff",
//         border: `1px solid ${t.type === "success" ? "#6BA36844" : "#d9555544"}`,
//         borderLeft: `3px solid ${t.type === "success" ? "#6BA368" : "#d95555"}`,
//         borderRadius: 10, minWidth: 280,
//         boxShadow: "0 4px 20px rgba(31,110,140,0.13)",
//         animation: "toastIn 0.25s ease",
//       }}>
//         <span style={{ color: t.type === "success" ? "#6BA368" : "#d95555", fontWeight: 700, fontSize: 15 }}>
//           {t.type === "success" ? "✓" : "✕"}
//         </span>
//         <span style={{ flex: 1, color: C.textPrimary, fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
//           {t.message}
//         </span>
//         <button onClick={() => removeToast(t.id)}
//           style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer" }}>
//           <XIcon />
//         </button>
//       </div>
//     ))}
//   </div>
// );

// // ─── MODAL ────────────────────────────────────────────────────────────────────
// const Modal = ({ open, onClose, title, children }) => {
//   if (!open) return null;
//   return (
//     <div onClick={onClose} style={{
//       position: "fixed", inset: 0,
//       background: "rgba(10,28,40,0.55)", backdropFilter: "blur(4px)",
//       zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
//       overflowY: "auto",
//     }}>
//       <div onClick={e => e.stopPropagation()} style={{
//         background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520,
//         boxShadow: "0 24px 64px rgba(31,110,140,0.2)",
//         animation: "modalIn 0.2s ease", overflow: "hidden",
//         border: `1px solid ${C.border}`,
//         maxHeight: "90vh", display: "flex", flexDirection: "column",
//       }}>
//         <div style={{
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           padding: "18px 24px", background: C.headerBg, flexShrink: 0,
//         }}>
//           <h3 style={{ margin: 0, color: "#fff", fontSize: 15, fontWeight: 700,
//             fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}>
//             {title}
//           </h3>
//           <button onClick={onClose} style={{
//             background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8,
//             padding: 7, cursor: "pointer", color: "#fff",
//             display: "flex", alignItems: "center",
//           }}>
//             <XIcon />
//           </button>
//         </div>
//         <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>{children}</div>
//       </div>
//     </div>
//   );
// };

// // ─── INPUT ────────────────────────────────────────────────────────────────────
// const Input = ({ label, required, ...props }) => (
//   <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
//     {label && (
//       <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
//         letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
//         {label}{required && <span style={{ color: C.red }}> *</span>}
//       </label>
//     )}
//     <input {...props} style={{
//       background: C.inputBg, border: `1.5px solid ${C.border}`,
//       borderRadius: 8, padding: "9px 13px",
//       fontSize: 13, color: C.textPrimary, outline: "none",
//       fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.15s",
//       width: "100%",
//       ...(props.style || {})
//     }}
//       onFocus={e => e.target.style.borderColor = C.teal}
//       onBlur={e => e.target.style.borderColor = C.border}
//     />
//   </div>
// );

// const DateInput = ({ label, required, ...props }) => (
//   <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
//     {label && (
//       <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
//         letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
//         display: "flex", alignItems: "center", gap: 5 }}>
//         <CalendarIcon size={11} color={C.textSecondary} />
//         {label}{required && <span style={{ color: C.red }}> *</span>}
//       </label>
//     )}
//     <input
//       type="date"
//       {...props}
//       style={{
//         background: C.inputBg, border: `1.5px solid ${C.border}`,
//         borderRadius: 8, padding: "9px 13px", fontSize: 13,
//         color: props.value ? C.textPrimary : C.textMuted,
//         outline: "none", fontFamily: "'DM Sans', sans-serif",
//         transition: "border-color 0.15s", width: "100%",
//         cursor: "pointer", colorScheme: "light",
//         ...(props.style || {})
//       }}
//       onFocus={e => e.target.style.borderColor = C.teal}
//       onBlur={e => e.target.style.borderColor = C.border}
//     />
//   </div>
// );

// const Select = ({ label, required, children, ...props }) => (
//   <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
//     {label && (
//       <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
//         letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
//         {label}{required && <span style={{ color: C.red }}> *</span>}
//       </label>
//     )}
//     <select {...props} style={{
//       background: C.inputBg, border: `1.5px solid ${C.border}`,
//       borderRadius: 8, padding: "9px 13px",
//       fontSize: 13, color: C.textPrimary, outline: "none",
//       fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
//     }}>{children}</select>
//   </div>
// );

// const BVARS = {
//   primary:   { bg: C.teal,       color: "#fff",          border: C.teal,       hover: "#174f68" },
//   secondary: { bg: C.tealPale,   color: C.textSecondary, border: C.border,     hover: "#cde6f0" },
//   danger:    { bg: C.redPale,    color: C.red,           border: "#f0c8c8",    hover: "#f8d8d8" },
//   ghost:     { bg: "transparent",color: C.teal,          border: C.tealPale,   hover: C.tealPale },
//   success:   { bg: C.greenPale,  color: C.green,         border: "#c0dab8",    hover: "#d2ecce" },
//   white:     { bg: "rgba(255,255,255,0.18)", color: "#fff", border: "rgba(255,255,255,0.3)", hover: "rgba(255,255,255,0.28)" },
// };
// const Btn = ({ variant = "primary", children, loading, style = {}, ...props }) => {
//   const v = BVARS[variant] || BVARS.primary;
//   return (
//     <button {...props} style={{
//       display: "inline-flex", alignItems: "center", gap: 6,
//       padding: "8px 16px", borderRadius: 8,
//       background: v.bg, color: v.color, border: `1px solid ${v.border}`,
//       fontSize: 12, fontWeight: 700, cursor: "pointer",
//       fontFamily: "'DM Sans', sans-serif",
//       whiteSpace: "nowrap", transition: "all 0.15s", ...style
//     }}
//       onMouseOver={e => e.currentTarget.style.background = v.hover}
//       onMouseOut={e => e.currentTarget.style.background = v.bg}>
//       {loading ? "⏳" : children}
//     </button>
//   );
// };

// const CategoryAvatar = ({ name }) => {
//   const hue = (name.charCodeAt(0) * 53 + name.charCodeAt(name.length - 1) * 17) % 360;
//   return (
//     <div style={{
//       width: 42, height: 42, borderRadius: 10, flexShrink: 0,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: 17, fontWeight: 800,
//       background: `hsl(${hue},50%,92%)`,
//       color: `hsl(${hue},50%,32%)`,
//       border: `1.5px solid hsl(${hue},40%,80%)`,
//       fontFamily: "'Syne', sans-serif",
//     }}>
//       {name[0].toUpperCase()}
//     </div>
//   );
// };

// // ═══════════════════════════════════════════════════════════════════════════════
// export default function CustomerCareHome() {
//   const [categories, setCategories]             = useState([]);
//   const [configs, setConfigs]                   = useState({});
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [loading, setLoading]                   = useState(false);
//   const [toasts, setToasts]                     = useState([]);
//   const [showCatModal, setShowCatModal]         = useState(false);
//   const [showConfigModal, setShowConfigModal]   = useState(false);
//   const [showFieldModal, setShowFieldModal]     = useState(false);
//   const [activeCategoryForConfig, setActiveCategoryForConfig] = useState(null);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [registerCategory, setRegisterCategory]   = useState(null);
//   const [registerForm, setRegisterForm]           = useState({});
//   const [quantity, setQuantity]                   = useState(1);
//   const [catForm, setCatForm]     = useState({ name: "", description: "" });
//   const [configFields, setConfigFields] = useState([]);
//   const [editCat, setEditCat]     = useState(null);
//   const [newField, setNewField]   = useState({ fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" });
//   const [addingField, setAddingField] = useState({ categoryId: null, field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" } });

//   const addToast = (message, type = "success") => {
//     const id = Date.now();
//     setToasts(p => [...p, { id, message, type }]);
//     setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
//   };
//   const removeToast = id => setToasts(p => p.filter(t => t.id !== id));

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.get("/category/allproducts");
//       setCategories(data.data || []);
//     } catch (e) { addToast(e.response?.data?.message || "Failed to load categories", "error"); }
//     finally { setLoading(false); }
//   };

//   const fetchConfig = async (categoryId) => {
//     if (configs[categoryId] !== undefined) return;
//     try {
//       const { data } = await axiosInstance.get(`/product/${categoryId}/configurations`);
//       setConfigs(p => ({ ...p, [categoryId]: data.data }));
//     } catch (e) { setConfigs(p => ({ ...p, [categoryId]: null })); }
//   };

//   useEffect(() => { fetchCategories(); }, []);

//   const handleSaveCategory = async () => {
//     if (!catForm.name.trim()) return addToast("Category name is required", "error");
//     try {
//       if (editCat) { await axiosInstance.put(`/category/updateProduct/${editCat._id}`, catForm); addToast("Category updated!"); }
//       else { await axiosInstance.post("/category/createCategory", catForm); addToast("Category created!"); }
//       setShowCatModal(false); setCatForm({ name: "", description: "" }); setEditCat(null); fetchCategories();
//     } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
//   };

//   const handleDeleteCategory = async (id) => {
//     if (!confirm("Deactivate this category?")) return;
//     try { await axiosInstance.delete(`/category/${id}`); addToast("Category deactivated"); fetchCategories(); }
//     catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
//   };

//   const openCreateConfig = (cat) => { setActiveCategoryForConfig(cat); setConfigFields([]); setShowConfigModal(true); };
//   const toFieldKey = (name) => name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");

//   const addFieldToForm = () => {
//     if (!newField.fieldName || !newField.fieldKey) return addToast("Field name & key required", "error");
//     const options = newField.options ? newField.options.split(",").map(o => o.trim()).filter(Boolean) : [];
//     setConfigFields(p => [...p, { ...newField, options, _tempId: Date.now() }]);
//     setNewField({ fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" });
//   };

//   const handleCreateConfig = async () => {
//     if (!configFields.length) return addToast("Add at least one field", "error");
//     try {
//       await axiosInstance.post("/product/configuration", { category: activeCategoryForConfig._id, fields: configFields.map(({ _tempId, ...f }) => f) });
//       addToast("Configuration created!"); setShowConfigModal(false);
//       setConfigs(p => ({ ...p, [activeCategoryForConfig._id]: undefined })); fetchConfig(activeCategoryForConfig._id);
//     } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
//   };

//   const handleAddFieldToExisting = async () => {
//     const { categoryId, field } = addingField;
//     if (!field.fieldName || !field.fieldKey) return addToast("Field name & key required", "error");
//     const options = field.options ? field.options.split(",").map(o => o.trim()).filter(Boolean) : [];
//     try {
//       await axiosInstance.post(`/product/addconfigration/${categoryId}/add-field`, { ...field, options });
//       addToast("Field added!"); setShowFieldModal(false);
//       setConfigs(p => ({ ...p, [categoryId]: undefined })); fetchConfig(categoryId);
//     } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
//   };

//   const handleRemoveField = async (categoryId, fieldKey) => {
//     if (!confirm(`Remove field "${fieldKey}"?`)) return;
//     try {
//       await axiosInstance.delete(`/product/removeconfigration/${categoryId}/remove-field/${fieldKey}`);
//       addToast("Field removed"); setConfigs(p => ({ ...p, [categoryId]: undefined })); fetchConfig(categoryId);
//     } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
//   };

//   const toggleExpand = (catId) => {
//     if (expandedCategory === catId) { setExpandedCategory(null); }
//     else { setExpandedCategory(catId); fetchConfig(catId); }
//   };

//   const activeCount = categories.filter(c => c.isActive !== false).length;
//   const configCount = Object.values(configs).filter(Boolean).length;

//   const renderRegisterField = (field) => {
//     if (field.fieldType === "Date") {
//       return (
//         <DateInput key={field.fieldKey} label={field.fieldName} required={field.isRequired}
//           value={registerForm[field.fieldKey] || ""}
//           onChange={e => setRegisterForm(p => ({ ...p, [field.fieldKey]: e.target.value }))} />
//       );
//     }
//     if (field.options?.length > 0) {
//       return (
//         <Select key={field.fieldKey} label={field.fieldName} required={field.isRequired}
//           value={registerForm[field.fieldKey] || ""}
//           onChange={e => setRegisterForm(p => ({ ...p, [field.fieldKey]: e.target.value }))}>
//           <option value="">— Select —</option>
//           {field.options.map(o => <option key={o} value={o}>{o}</option>)}
//         </Select>
//       );
//     }
//     return (
//       <Input key={field.fieldKey} label={field.fieldName} required={field.isRequired}
//         type={field.fieldType === "Number" ? "number" : "text"}
//         value={registerForm[field.fieldKey] || ""}
//         onChange={e => setRegisterForm(p => ({ ...p, [field.fieldKey]: e.target.value }))} />
//     );
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500;700&family=DM+Sans:wght@400;500;600;700&display=swap');

//         /* ── KEY FIX: reset box model, let the page scroll naturally ── */
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         /*
//          * DO NOT set height/overflow on html or body here.
//          * Your app shell (index.html / root layout) controls that.
//          * We only ensure our own wrapper never clamps the scroll.
//          */
//         .ccm-root {
//           background: #eef2f5;
//           font-family: 'DM Sans', sans-serif;
//           /* No height, no overflow — lets the browser scroll normally */
//         }

//         /* Sticky header sits at the top of the viewport while the page scrolls */
//         .ccm-header {
//           position: sticky;
//           top: 0;
//           z-index: 100;
//           height: 64px;
//           background: linear-gradient(135deg, #1a3a4f 0%, #1F6E8C 100%);
//           padding: 0 40px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           box-shadow: 0 2px 16px rgba(26,58,79,0.25);
//         }

//         /* Main content area — no overflow clipping, just padding */
//         .ccm-main {
//           max-width: 860px;
//           margin: 0 auto;
//           padding: 32px 20px 48px;
//         }

//         @keyframes toastIn { from { transform: translateX(20px); opacity:0 } to { transform:none; opacity:1 } }
//         @keyframes modalIn { from { transform: scale(0.97) translateY(-6px); opacity:0 } to { transform:none; opacity:1 } }
//         @keyframes fadeUp  { from { transform: translateY(10px); opacity:0 } to { transform:none; opacity:1 } }
//         @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

//         .cat-card { animation: fadeUp 0.28s ease both; transition: box-shadow 0.2s, transform 0.2s; }
//         .cat-card:hover { box-shadow: 0 6px 24px rgba(31,110,140,0.12) !important; transform: translateY(-1px); }
//         .cat-row:hover  { background: #f0f9fc !important; }
//         .field-row:hover { background: #f0f9fc !important; }

//         input::placeholder { color: #a8c8d8; }
//         input[type="date"]::-webkit-calendar-picker-indicator {
//           filter: invert(35%) sepia(60%) saturate(400%) hue-rotate(165deg);
//           cursor: pointer; opacity: 0.8;
//         }
//         input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity: 1; }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-thumb { background: #b3d4e2; border-radius: 2px; }
//       `}</style>

//       <Toast toasts={toasts} removeToast={removeToast} />

//       {/* ── ROOT: no height / overflow constraints ── */}
//       <div className="ccm-root">

//         {/* ── STICKY HEADER ── */}
//         <header className="ccm-header">
//           <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//             <div style={{
//               width: 34, height: 34, borderRadius: 9,
//               background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <BoxIcon size={17} color="#fff" />
//             </div>
//             <div>
//               <div style={{ fontSize: 16, fontWeight: 800, color: "#fff",
//                 fontFamily: "'Syne', sans-serif", letterSpacing: "-0.4px", lineHeight: 1 }}>
//                 Category Manager
//               </div>
//               <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
//                 Customer Care Portal
//               </div>
//             </div>
//           </div>
//           <Btn variant="white" onClick={() => { setEditCat(null); setCatForm({ name: "", description: "" }); setShowCatModal(true); }}>
//             <PlusIcon /> New Category
//           </Btn>
//         </header>

//         {/* ── MAIN CONTENT — scrolls with the page ── */}
//         <main className="ccm-main">

//           {/* Stats */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 30 }}>
//             {[
//               { label: "Total Categories", value: categories.length, color: C.teal  },
//               { label: "With Config",       value: configCount,       color: C.green },
//               { label: "Active",            value: activeCount,       color: C.amber },
//             ].map(s => (
//               <div key={s.label} style={{
//                 background: "#fff", border: `1px solid ${C.border}`,
//                 borderRadius: 14, padding: "20px 22px",
//                 boxShadow: "0 2px 8px rgba(31,110,140,0.07)",
//                 position: "relative", overflow: "hidden",
//               }}>
//                 <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: "14px 14px 0 0" }} />
//                 <div style={{ fontSize: 11, color: C.textSecondary, fontWeight: 600, letterSpacing: "0.04em", marginBottom: 10, marginTop: 4 }}>
//                   {s.label}
//                 </div>
//                 <div style={{ fontSize: 34, fontWeight: 800, color: s.color, fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>
//                   {s.value}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Section Header */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <div style={{ width: 3, height: 20, background: C.teal, borderRadius: 2 }} />
//               <h2 style={{ fontSize: 17, fontWeight: 800, color: C.textPrimary, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.4px" }}>
//                 All Categories
//               </h2>
//             </div>
//             <span style={{ fontSize: 11, color: C.textMuted }}>Click a category to manage configuration</span>
//           </div>

//           {/* List */}
//           {loading ? (
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} style={{
//                   height: 66, borderRadius: 14,
//                   background: "linear-gradient(90deg, #e4eff4 25%, #d4e9f0 50%, #e4eff4 75%)",
//                   backgroundSize: "200% 100%",
//                   animation: `shimmer 1.4s infinite`, animationDelay: `${i * 0.1}s`,
//                   border: `1px solid ${C.border}`,
//                 }} />
//               ))}
//             </div>
//           ) : categories.length === 0 ? (
//             <div style={{
//               textAlign: "center", padding: "64px 24px", background: "#fff",
//               borderRadius: 16, border: `2px dashed ${C.border}`,
//               boxShadow: "0 2px 8px rgba(31,110,140,0.05)",
//             }}>
//               <div style={{ fontSize: 40, marginBottom: 14 }}>📦</div>
//               <div style={{ fontWeight: 700, color: C.textSecondary, fontSize: 15 }}>No categories yet</div>
//               <div style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>Create your first category to get started</div>
//             </div>
//           ) : (
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {categories.map((cat, i) => {
//                 const isOpen = expandedCategory === cat._id;
//                 const config = configs[cat._id];
//                 return (
//                   <div key={cat._id} className="cat-card" style={{
//                     background: "#fff",
//                     border: `1px solid ${isOpen ? C.teal + "66" : C.border}`,
//                     borderRadius: 14, overflow: "hidden",
//                     boxShadow: isOpen ? `0 0 0 3px ${C.teal}14, 0 4px 20px rgba(31,110,140,0.1)` : "0 1px 4px rgba(31,110,140,0.06)",
//                     transition: "all 0.2s ease", animationDelay: `${i * 0.05}s`,
//                   }}>
//                     {/* Row */}
//                     <div className="cat-row" onClick={() => toggleExpand(cat._id)} style={{
//                       display: "flex", alignItems: "center", gap: 14,
//                       padding: "13px 18px", cursor: "pointer",
//                       background: isOpen ? "#f0f9fc" : "#fff",
//                       transition: "background 0.15s",
//                       borderBottom: isOpen ? `1px solid ${C.border}` : "none",
//                     }}>
//                       <CategoryAvatar name={cat.name} />
//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <div style={{ fontWeight: 700, fontSize: 14, color: C.textPrimary, fontFamily: "'Syne', sans-serif" }}>
//                           {cat.name}
//                         </div>
//                         {cat.description && (
//                           <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                             {cat.description}
//                           </div>
//                         )}
//                       </div>
//                       {config?.fields?.length > 0 && (
//                         <span style={{
//                           background: C.tealPale, color: C.teal, border: `1px solid ${C.borderMid}`,
//                           borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 700,
//                         }}>{config.fields.length} fields</span>
//                       )}
//                       <div onClick={e => e.stopPropagation()} style={{ display: "flex", gap: 6 }}>
//                         <button onClick={() => { setEditCat(cat); setCatForm({ name: cat.name, description: cat.description || "" }); setShowCatModal(true); }}
//                           style={{ background: C.tealPale, border: "none", borderRadius: 7, padding: 7, cursor: "pointer", color: C.textSecondary, display: "flex", transition: "all 0.15s" }}
//                           onMouseOver={e => { e.currentTarget.style.background = "#cde6f0"; e.currentTarget.style.color = C.teal; }}
//                           onMouseOut={e => { e.currentTarget.style.background = C.tealPale; e.currentTarget.style.color = C.textSecondary; }}>
//                           <EditIcon />
//                         </button>
//                         <button onClick={() => handleDeleteCategory(cat._id)}
//                           style={{ background: C.redPale, border: "none", borderRadius: 7, padding: 7, cursor: "pointer", color: C.red, display: "flex", transition: "all 0.15s" }}
//                           onMouseOver={e => e.currentTarget.style.background = "#f8d8d8"}
//                           onMouseOut={e => e.currentTarget.style.background = C.redPale}>
//                           <TrashIcon />
//                         </button>
//                       </div>
//                       <div style={{ color: isOpen ? C.teal : C.textMuted, transform: isOpen ? "rotate(180deg)" : "none", transition: "all 0.2s ease", display: "flex" }}>
//                         <ChevronDown />
//                       </div>
//                     </div>

//                     {/* Config Panel */}
//                     {isOpen && (
//                       <div style={{ background: C.panelBg, padding: "16px 18px 20px", borderTop: `1px solid ${C.tealPale}` }}>
//                         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: 7, color: C.textSecondary,
//                             fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
//                             <SettingsIcon /> CONFIGURATION FIELDS
//                           </div>
//                           <div style={{ display: "flex", gap: 8 }}>
//                             {config && (
//                               <Btn variant="success" onClick={() => { setRegisterCategory(cat); setRegisterForm({}); setQuantity(1); setShowRegisterModal(true); }}>
//                                 <BoxIcon /> Register Product
//                               </Btn>
//                             )}
//                             {config === null ? (
//                               <Btn onClick={() => openCreateConfig(cat)}><PlusIcon /> Create Config</Btn>
//                             ) : config ? (
//                               <Btn variant="ghost" onClick={() => { setAddingField({ categoryId: cat._id, field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" } }); setShowFieldModal(true); }}>
//                                 <PlusIcon /> Add Field
//                               </Btn>
//                             ) : null}
//                           </div>
//                         </div>

//                         {config === undefined ? (
//                           <div style={{ textAlign: "center", padding: "20px", color: C.textMuted, fontSize: 13 }}>Loading config...</div>
//                         ) : config === null ? (
//                           <div style={{ textAlign: "center", padding: "28px", border: `2px dashed ${C.borderMid}`, borderRadius: 10, background: "#fff" }}>
//                             <div style={{ fontSize: 26, marginBottom: 8 }}>⚙️</div>
//                             <div style={{ fontWeight: 600, color: C.textSecondary, fontSize: 13 }}>No configuration yet</div>
//                             <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>
//                               Create a config for <b style={{ color: C.teal }}>{cat.name}</b>
//                             </div>
//                           </div>
//                         ) : config.fields?.length === 0 ? (
//                           <div style={{ textAlign: "center", padding: "16px", fontSize: 12, color: C.textMuted }}>No fields yet. Add one!</div>
//                         ) : (
//                           <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
//                             <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 32px", gap: 12, padding: "5px 12px",
//                               fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
//                               <span>Field / Key</span><span>Type</span><span>Unit</span><span>Required</span><span></span>
//                             </div>
//                             {config.fields.map((field, fi) => (
//                               <div key={fi} className="field-row" style={{
//                                 display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 32px",
//                                 gap: 12, padding: "10px 12px",
//                                 background: "#fff", border: `1px solid ${C.border}`,
//                                 borderRadius: 9, alignItems: "center", transition: "background 0.15s",
//                               }}>
//                                 <div>
//                                   <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                                     <span style={{ fontWeight: 600, fontSize: 13, color: C.textPrimary }}>{field.fieldName}</span>
//                                     {field.fieldType === "Date" && (
//                                       <span title="Date field"><CalendarIcon size={12} color={C.amber} /></span>
//                                     )}
//                                   </div>
//                                   <div style={{ fontSize: 10, color: C.textMuted, fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{field.fieldKey}</div>
//                                   {field.options?.length > 0 && (
//                                     <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 }}>
//                                       {field.options.map(o => (
//                                         <span key={o} style={{ background: C.tealPale, color: C.textSecondary, borderRadius: 4, padding: "1px 6px", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>{o}</span>
//                                       ))}
//                                     </div>
//                                   )}
//                                 </div>
//                                 <div><FieldTypeBadge type={field.fieldType} /></div>
//                                 <div style={{ fontSize: 12, color: C.textMuted }}>{field.unit || "—"}</div>
//                                 <div>
//                                   {field.isRequired
//                                     ? <span style={{ color: C.green, fontSize: 11, fontWeight: 700 }}>✓ Yes</span>
//                                     : <span style={{ color: C.textMuted, fontSize: 11 }}>No</span>}
//                                 </div>
//                                 <div>
//                                   <button onClick={() => handleRemoveField(cat._id, field.fieldKey)}
//                                     style={{ background: "transparent", border: "none", borderRadius: 6, padding: 5, cursor: "pointer", color: C.textMuted, display: "flex", transition: "all 0.15s" }}
//                                     onMouseOver={e => { e.currentTarget.style.background = C.redPale; e.currentTarget.style.color = C.red; }}
//                                     onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMuted; }}>
//                                     <TrashIcon />
//                                   </button>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* ══ MODAL: CREATE / EDIT CATEGORY ══ */}
//       <Modal open={showCatModal} onClose={() => { setShowCatModal(false); setEditCat(null); }} title={editCat ? "Edit Category" : "New Category"}>
//         <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//           <Input label="Category Name" required placeholder="e.g. Laptop, Printer, AC" value={catForm.name} onChange={e => setCatForm(p => ({ ...p, name: e.target.value }))} />
//           <Input label="Description" placeholder="Optional description" value={catForm.description} onChange={e => setCatForm(p => ({ ...p, description: e.target.value }))} />
//           <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
//             <Btn variant="secondary" onClick={() => { setShowCatModal(false); setEditCat(null); }}>Cancel</Btn>
//             <Btn onClick={handleSaveCategory}>{editCat ? "Update" : "Create Category"}</Btn>
//           </div>
//         </div>
//       </Modal>

//       {/* ══ MODAL: CREATE CONFIG ══ */}
//       <Modal open={showConfigModal} onClose={() => setShowConfigModal(false)} title={`Config — ${activeCategoryForConfig?.name}`}>
//         <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//           <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>
//             Define fields for <b style={{ color: C.teal }}>{activeCategoryForConfig?.name}</b>.
//           </p>
//           <div style={{ background: C.panelBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
//             <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Add a field</div>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//               <Input label="Field Name" placeholder="e.g. Purchase Date" value={newField.fieldName} onChange={e => setNewField(p => ({ ...p, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value) }))} />
//               <Input label="Field Key" placeholder="auto-filled" value={newField.fieldKey} onChange={e => setNewField(p => ({ ...p, fieldKey: e.target.value }))} />
//               <Select label="Type" value={newField.fieldType} onChange={e => setNewField(p => ({ ...p, fieldType: e.target.value }))}>
//                 {FIELD_TYPES.map(t => <option key={t}>{t}</option>)}
//               </Select>
//               <Input label="Unit (optional)" placeholder="GB, inch..." value={newField.unit} onChange={e => setNewField(p => ({ ...p, unit: e.target.value }))} />
//             </div>
//             <Input label="Options (comma separated)" placeholder="8GB, 16GB, 32GB" value={newField.options} onChange={e => setNewField(p => ({ ...p, options: e.target.value }))} />
//             <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textSecondary, cursor: "pointer" }}>
//               <input type="checkbox" checked={newField.isRequired} onChange={e => setNewField(p => ({ ...p, isRequired: e.target.checked }))} style={{ accentColor: C.teal }} />
//               Required field
//             </label>
//             {newField.fieldType === "Date" && (
//               <div style={{ fontSize: 11, color: C.amber, background: C.amberPale, border: `1px solid ${C.amber}44`, borderRadius: 7, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6 }}>
//                 <CalendarIcon size={12} color={C.amber} />
//                 Date fields show a calendar picker when registering a product
//               </div>
//             )}
//             <Btn variant="ghost" onClick={addFieldToForm} style={{ alignSelf: "flex-start" }}><PlusIcon /> Add to list</Btn>
//           </div>
//           {configFields.length > 0 && (
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Fields to create ({configFields.length})</div>
//               {configFields.map(f => (
//                 <div key={f._tempId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.panelBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px" }}>
//                   <div>
//                     <span style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary }}>{f.fieldName}</span>
//                     <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 8, fontFamily: "'DM Mono', monospace" }}>({f.fieldKey})</span>
//                   </div>
//                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                     <FieldTypeBadge type={f.fieldType} />
//                     {f.fieldType === "Date" && <CalendarIcon size={12} color={C.amber} />}
//                     {f.isRequired && <span style={{ color: C.green, fontSize: 10, fontWeight: 700 }}>REQUIRED</span>}
//                     <button onClick={() => setConfigFields(p => p.filter(x => x._tempId !== f._tempId))} style={{ background: "none", border: "none", cursor: "pointer", color: C.red, display: "flex" }}><XIcon /></button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
//             <Btn variant="secondary" onClick={() => setShowConfigModal(false)}>Cancel</Btn>
//             <Btn onClick={handleCreateConfig} disabled={configFields.length === 0}><CheckIcon /> Save Configuration</Btn>
//           </div>
//         </div>
//       </Modal>

//       {/* ══ MODAL: ADD FIELD ══ */}
//       <Modal open={showFieldModal} onClose={() => setShowFieldModal(false)} title="Add New Field">
//         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//             <Input label="Field Name" required placeholder="e.g. Warranty End Date" value={addingField.field.fieldName} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value) } }))} />
//             <Input label="Field Key" placeholder="auto-filled" value={addingField.field.fieldKey} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldKey: e.target.value } }))} />
//             <Select label="Type" value={addingField.field.fieldType} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldType: e.target.value } }))}>
//               {FIELD_TYPES.map(t => <option key={t}>{t}</option>)}
//             </Select>
//             <Input label="Unit (optional)" placeholder="GB, inch..." value={addingField.field.unit} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, unit: e.target.value } }))} />
//           </div>
//           <Input label="Options (comma separated)" placeholder="8GB, 16GB, 32GB" value={addingField.field.options} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, options: e.target.value } }))} />
//           <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textSecondary, cursor: "pointer" }}>
//             <input type="checkbox" checked={addingField.field.isRequired} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, isRequired: e.target.checked } }))} style={{ accentColor: C.teal }} />
//             Required field
//           </label>
//           {addingField.field.fieldType === "Date" && (
//             <div style={{ fontSize: 11, color: C.amber, background: C.amberPale, border: `1px solid ${C.amber}44`, borderRadius: 7, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6 }}>
//               <CalendarIcon size={12} color={C.amber} />
//               Date fields show a calendar picker when registering a product
//             </div>
//           )}
//           <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
//             <Btn variant="secondary" onClick={() => setShowFieldModal(false)}>Cancel</Btn>
//             <Btn onClick={handleAddFieldToExisting}><PlusIcon /> Add Field</Btn>
//           </div>
//         </div>
//       </Modal>

//       {/* ══ MODAL: REGISTER PRODUCT ══ */}
//       <Modal open={showRegisterModal} onClose={() => setShowRegisterModal(false)} title={`Register — ${registerCategory?.name}`}>
//         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

//           {/* Category info banner — auto-filled, read-only */}
//           <div style={{
//             display: "flex", alignItems: "center", gap: 10,
//             background: C.tealPale, border: `1px solid ${C.borderMid}`,
//             borderRadius: 9, padding: "10px 14px",
//           }}>
//             <div style={{
//               width: 30, height: 30, borderRadius: 7, flexShrink: 0,
//               background: C.teal, display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <BoxIcon size={14} color="#fff" />
//             </div>
//             <div>
//               <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Category</div>
//               <div style={{ fontSize: 13, fontWeight: 700, color: C.teal, fontFamily: "'Syne', sans-serif" }}>
//                 {registerCategory?.name}
//               </div>
//             </div>
//             <span style={{
//               marginLeft: "auto", fontSize: 10, fontWeight: 600, color: C.teal,
//               background: "#fff", border: `1px solid ${C.borderMid}`,
//               borderRadius: 5, padding: "2px 8px",
//             }}>Auto</span>
//           </div>

//           {/* Dynamic config fields only */}
//           {configs[registerCategory?._id]?.fields?.map(field => renderRegisterField(field))}

//           <Input label="Quantity" type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />

//           <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
//             <Btn variant="secondary" onClick={() => setShowRegisterModal(false)}>Cancel</Btn>
//             <Btn onClick={async () => {
//               try {
//                 await axiosInstance.post("/category/register", {
//                   category: registerCategory._id,
//                   configurations: registerForm,
//                   quantity,
//                 });
//                 addToast("Product registered successfully!");
//                 setShowRegisterModal(false);
//                 setRegisterForm({});
//               } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
//             }}>
//               <CheckIcon /> Register
//             </Btn>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import React from "react";
import axiosInstance from "../../Utils/axiosIntance";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, color = "currentColor", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const PlusIcon     = () => <Icon d="M12 5v14M5 12h14" />;
const TrashIcon    = () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
const ChevronDown  = () => <Icon d="M6 9l6 6 6-6" />;
const SettingsIcon = () => <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />;
const XIcon        = () => <Icon d="M18 6L6 18M6 6l12 12" />;
const CheckIcon    = () => <Icon d="M20 6L9 17l-5-5" />;
const EditIcon     = () => <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />;
const BoxIcon      = () => <Icon d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />;
const CalendarIcon = () => <Icon d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />;

// ─── COLOR TOKENS ─────────────────────────────────────────────────────────────
const C = {
  pageBg:        "#eef2f5",
  cardBg:        "#ffffff",
  headerBg:      "linear-gradient(135deg, #1a3a4f 0%, #1F6E8C 100%)",
  panelBg:       "#e8f4f9",
  inputBg:       "#f4f9fc",
  border:        "#d0e8f2",
  borderMid:     "#b3d4e2",
  textPrimary:   "#0e2535",
  textSecondary: "#3d7a90",
  textMuted:     "#85afc0",
  teal:          "#1F6E8C",
  tealLight:     "#2a8faf",
  tealPale:      "#dbedf5",
  green:         "#6BA368",
  greenPale:     "#e6f3e5",
  amber:         "#D9A441",
  amberPale:     "#fdf3de",
  red:           "#d95555",
  redPale:       "#fce8e8",
};

const FIELD_TYPES = ["String", "Number", "Date"];

const TYPE_META = {
  String: { color: "#1F6E8C", bg: "#dbedf5", label: "STR"  },
  Number: { color: "#6BA368", bg: "#e6f3e5", label: "NUM"  },
  Date:   { color: "#D9A441", bg: "#fdf3de", label: "DATE" },
};

const FieldTypeBadge = ({ type }) => {
  const m = TYPE_META[type] || TYPE_META.String;
  return (
    <span style={{
      background: m.bg, color: m.color,
      border: `1px solid ${m.color}44`,
      padding: "2px 8px", borderRadius: 4,
      fontSize: 10, fontWeight: 700,
      fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em"
    }}>{m.label}</span>
  );
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
const Toast = ({ toasts, removeToast }) => (
  <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999,
    display: "flex", flexDirection: "column", gap: 10 }}>
    {toasts.map(t => (
      <div key={t.id} style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px", background: "#fff",
        border: `1px solid ${t.type === "success" ? "#6BA36844" : "#d9555544"}`,
        borderLeft: `3px solid ${t.type === "success" ? "#6BA368" : "#d95555"}`,
        borderRadius: 10, minWidth: 280,
        boxShadow: "0 4px 20px rgba(31,110,140,0.13)",
        animation: "toastIn 0.25s ease",
      }}>
        <span style={{ color: t.type === "success" ? "#6BA368" : "#d95555", fontWeight: 700, fontSize: 15 }}>
          {t.type === "success" ? "✓" : "✕"}
        </span>
        <span style={{ flex: 1, color: C.textPrimary, fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
          {t.message}
        </span>
        <button onClick={() => removeToast(t.id)}
          style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer" }}>
          <XIcon />
        </button>
      </div>
    ))}
  </div>
);

// ─── MODAL ────────────────────────────────────────────────────────────────────
const Modal = ({ open, onClose, title, children, wide }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0,
      background: "rgba(10,28,40,0.55)", backdropFilter: "blur(4px)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      overflowY: "auto",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 16, width: "100%", maxWidth: wide ? 680 : 520,
        boxShadow: "0 24px 64px rgba(31,110,140,0.2)",
        animation: "modalIn 0.2s ease", overflow: "hidden",
        border: `1px solid ${C.border}`,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 24px", background: C.headerBg, flexShrink: 0,
        }}>
          <h3 style={{ margin: 0, color: "#fff", fontSize: 15, fontWeight: 700,
            fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}>
            {title}
          </h3>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8,
            padding: 7, cursor: "pointer", color: "#fff",
            display: "flex", alignItems: "center",
          }}>
            <XIcon />
          </button>
        </div>
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

// ─── INPUT ────────────────────────────────────────────────────────────────────
const Input = ({ label, required, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && (
      <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
        letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
        {label}{required && <span style={{ color: C.red }}> *</span>}
      </label>
    )}
    <input {...props} style={{
      background: C.inputBg, border: `1.5px solid ${C.border}`,
      borderRadius: 8, padding: "9px 13px",
      fontSize: 13, color: C.textPrimary, outline: "none",
      fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.15s",
      width: "100%",
      ...(props.style || {})
    }}
      onFocus={e => e.target.style.borderColor = C.teal}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  </div>
);

const DateInput = ({ label, required, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && (
      <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
        letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
        display: "flex", alignItems: "center", gap: 5 }}>
        <CalendarIcon size={11} color={C.textSecondary} />
        {label}{required && <span style={{ color: C.red }}> *</span>}
      </label>
    )}
    <input type="date" {...props} style={{
      background: C.inputBg, border: `1.5px solid ${C.border}`,
      borderRadius: 8, padding: "9px 13px", fontSize: 13,
      color: props.value ? C.textPrimary : C.textMuted,
      outline: "none", fontFamily: "'DM Sans', sans-serif",
      transition: "border-color 0.15s", width: "100%",
      cursor: "pointer", colorScheme: "light",
      ...(props.style || {})
    }}
      onFocus={e => e.target.style.borderColor = C.teal}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  </div>
);

const Select = ({ label, required, children, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && (
      <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
        letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
        {label}{required && <span style={{ color: C.red }}> *</span>}
      </label>
    )}
    <select {...props} style={{
      background: C.inputBg, border: `1.5px solid ${C.border}`,
      borderRadius: 8, padding: "9px 13px",
      fontSize: 13, color: C.textPrimary, outline: "none",
      fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
    }}>{children}</select>
  </div>
);

const BVARS = {
  primary:   { bg: C.teal,       color: "#fff",          border: C.teal,       hover: "#174f68" },
  secondary: { bg: C.tealPale,   color: C.textSecondary, border: C.border,     hover: "#cde6f0" },
  danger:    { bg: C.redPale,    color: C.red,           border: "#f0c8c8",    hover: "#f8d8d8" },
  ghost:     { bg: "transparent",color: C.teal,          border: C.tealPale,   hover: C.tealPale },
  success:   { bg: C.greenPale,  color: C.green,         border: "#c0dab8",    hover: "#d2ecce" },
  white:     { bg: "rgba(255,255,255,0.18)", color: "#fff", border: "rgba(255,255,255,0.3)", hover: "rgba(255,255,255,0.28)" },
};
const Btn = ({ variant = "primary", children, loading, style = {}, ...props }) => {
  const v = BVARS[variant] || BVARS.primary;
  return (
    <button {...props} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "8px 16px", borderRadius: 8,
      background: v.bg, color: v.color, border: `1px solid ${v.border}`,
      fontSize: 12, fontWeight: 700, cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      whiteSpace: "nowrap", transition: "all 0.15s", ...style
    }}
      onMouseOver={e => e.currentTarget.style.background = v.hover}
      onMouseOut={e => e.currentTarget.style.background = v.bg}>
      {loading ? "⏳" : children}
    </button>
  );
};

const CategoryAvatar = ({ name }) => {
  const hue = (name.charCodeAt(0) * 53 + name.charCodeAt(name.length - 1) * 17) % 360;
  return (
    <div style={{
      width: 42, height: 42, borderRadius: 10, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 17, fontWeight: 800,
      background: `hsl(${hue},50%,92%)`,
      color: `hsl(${hue},50%,32%)`,
      border: `1.5px solid hsl(${hue},40%,80%)`,
      fontFamily: "'Syne', sans-serif",
    }}>
      {name[0].toUpperCase()}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// UNIQUE FIELD KEYS — these fields must be different for every unit
// serialnumber, modelnumber, invoicenumber must be entered per unit
// All other fields (RAM, color, company etc.) are shared across all units
// ─────────────────────────────────────────────────────────────────────────────
const UNIQUE_KEYS = [
  "serialnumber", "serial_number", "serial_numebr",
  "SERIALNUMBER", "SERIAL_NUMBER",   // ← add uppercase versions
  "modelnumber",  "model_number",    "MODELNUMBER",
  "invoicenumber", "invoice_number", "INVOICENUMBER",
];

// Returns true if this field must be unique per unit
const isUniqueField = (fieldKey) =>
  UNIQUE_KEYS.includes(fieldKey.toLowerCase().trim());

// ═══════════════════════════════════════════════════════════════════════════════
export default function CustomerCareHome() {
  const [categories, setCategories]             = useState([]);
  const [configs, setConfigs]                   = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading]                   = useState(false);
  const [toasts, setToasts]                     = useState([]);
  const [showCatModal, setShowCatModal]         = useState(false);
  const [showConfigModal, setShowConfigModal]   = useState(false);
  const [showFieldModal, setShowFieldModal]     = useState(false);
  const [activeCategoryForConfig, setActiveCategoryForConfig] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerCategory, setRegisterCategory]   = useState(null);

  // ── REGISTER FORM STATE (UPDATED) ─────────────────────────────────────────
  //
  // OLD approach (the bug):
  //   registerForm = { serialnumber: "SAME", modelnumber: "SAME" }
  //   → ALL units get the same values
  //
  // NEW approach (the fix):
  //   sharedForm = { ram: "8GB", color: "Black" }        ← same for ALL units
  //   unitRows   = [                                      ← unique per unit
  //     { id:1, serialnumber: "A1", modelnumber: "M1" },
  //     { id:2, serialnumber: "A2", modelnumber: "M2" },
  //   ]
  //
  const [sharedForm, setSharedForm] = useState({});  // shared fields — one value for all
  const [unitRows,   setUnitRows]   = useState([{ id: 1 }]); // one object per unit
  const [quantity,   setQuantity]   = useState(1);

  const [catForm, setCatForm]     = useState({ name: "", description: "" });
  const [configFields, setConfigFields] = useState([]);
  const [editCat, setEditCat]     = useState(null);
  const [newField, setNewField]   = useState({ fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" });
  const [addingField, setAddingField] = useState({ categoryId: null, field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" } });

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  const removeToast = id => setToasts(p => p.filter(t => t.id !== id));

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/category/allproducts");
      setCategories(data.data || []);
    } catch (e) { addToast(e.response?.data?.message || "Failed to load categories", "error"); }
    finally { setLoading(false); }
  };

  const fetchConfig = async (categoryId) => {
    if (configs[categoryId] !== undefined) return;
    try {
      const { data } = await axiosInstance.get(`/product/${categoryId}/configurations`);
      setConfigs(p => ({ ...p, [categoryId]: data.data }));
    } catch (e) { setConfigs(p => ({ ...p, [categoryId]: null })); }
  };

  useEffect(() => { fetchCategories(); }, []);

  // ── When quantity changes → regenerate unit rows ──────────────────────────
  //
  // HOW IT WORKS:
  // Agent types "3" in quantity field
  //   → handleQuantityChange(3) runs
  //   → creates Array of 3 objects: [{ id:1 }, { id:2 }, { id:3 }]
  //   → each object will store that unit's unique field values
  //   → unitRows.length === quantity always stays in sync
  //
  // Why Array.from({ length: count }, (_, i) => ...)?
  //   Array.from({ length: 3 }) → creates array with 3 empty slots
  //   (_, i) → _ = unused value, i = index (0,1,2)
  //   We preserve existing values if agent already typed something:
  //     unitRows[i] → if this unit already existed, keep its data
  //     || { id: i+1 } → if new unit, start fresh with just an id
  //
  const handleQuantityChange = (val) => {
    const count = Math.max(1, Number(val) || 1);
    setQuantity(count);
    setUnitRows(prev =>
      Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        ...(prev[i] || {}), // preserve existing typed values if unit already existed
      }))
    );
  };

  // ── Update one field in one specific unit row ─────────────────────────────
  //
  // HOW IT WORKS:
  // Agent types "SN-001" in Unit 1's serialnumber field
  //   → handleUnitFieldChange(1, "serialnumber", "SN-001") runs
  //   → .map() loops over all unitRows
  //   → finds unit with id===1, updates ONLY that unit's serialnumber
  //   → all other units stay unchanged
  //
  // This is the key pattern for editing one item in an array of objects:
  //   prev.map(unit => unit.id === unitId ? { ...unit, [fieldKey]: value } : unit)
  //   ↑ spread keeps all existing fields, [fieldKey] updates only the changed one
  //
  const handleUnitFieldChange = (unitId, fieldKey, value) => {
    setUnitRows(prev =>
      prev.map(unit =>
        unit.id === unitId
          ? { ...unit, [fieldKey]: value }  // update only this unit's field
          : unit                             // all other units unchanged
      )
    );
  };

  const handleSaveCategory = async () => {
    if (!catForm.name.trim()) return addToast("Category name is required", "error");
    try {
      if (editCat) { await axiosInstance.put(`/category/updateProduct/${editCat._id}`, catForm); addToast("Category updated!"); }
      else { await axiosInstance.post("/category/createCategory", catForm); addToast("Category created!"); }
      setShowCatModal(false); setCatForm({ name: "", description: "" }); setEditCat(null); fetchCategories();
    } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("Deactivate this category?")) return;
    try { await axiosInstance.delete(`/category/${id}`); addToast("Category deactivated"); fetchCategories(); }
    catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
  };

  const openCreateConfig = (cat) => { setActiveCategoryForConfig(cat); setConfigFields([]); setShowConfigModal(true); };
  const toFieldKey = (name) => name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");

  const addFieldToForm = () => {
    if (!newField.fieldName || !newField.fieldKey) return addToast("Field name & key required", "error");
    const options = newField.options ? newField.options.split(",").map(o => o.trim()).filter(Boolean) : [];
    setConfigFields(p => [...p, { ...newField, options, _tempId: Date.now() }]);
    setNewField({ fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" });
  };

  const handleCreateConfig = async () => {
    if (!configFields.length) return addToast("Add at least one field", "error");
    try {
      await axiosInstance.post("/product/configuration", { category: activeCategoryForConfig._id, fields: configFields.map(({ _tempId, ...f }) => f) });
      addToast("Configuration created!"); setShowConfigModal(false);
      setConfigs(p => ({ ...p, [activeCategoryForConfig._id]: undefined })); fetchConfig(activeCategoryForConfig._id);
    } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
  };

  const handleAddFieldToExisting = async () => {
    const { categoryId, field } = addingField;
    if (!field.fieldName || !field.fieldKey) return addToast("Field name & key required", "error");
    const options = field.options ? field.options.split(",").map(o => o.trim()).filter(Boolean) : [];
    try {
      await axiosInstance.post(`/product/addconfigration/${categoryId}/add-field`, { ...field, options });
      addToast("Field added!"); setShowFieldModal(false);
      setConfigs(p => ({ ...p, [categoryId]: undefined })); fetchConfig(categoryId);
    } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
  };

  const handleRemoveField = async (categoryId, fieldKey) => {
    if (!confirm(`Remove field "${fieldKey}"?`)) return;
    try {
      await axiosInstance.delete(`/product/removeconfigration/${categoryId}/remove-field/${fieldKey}`);
      addToast("Field removed"); setConfigs(p => ({ ...p, [categoryId]: undefined })); fetchConfig(categoryId);
    } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
  };

  const toggleExpand = (catId) => {
    if (expandedCategory === catId) { setExpandedCategory(null); }
    else { setExpandedCategory(catId); fetchConfig(catId); }
  };

  // ── Reset register modal state when opening ───────────────────────────────
  const openRegisterModal = (cat) => {
    setRegisterCategory(cat);
    setSharedForm({});          // clear shared fields
    setUnitRows([{ id: 1 }]);  // reset to 1 unit row
    setQuantity(1);
    setShowRegisterModal(true);
  };

  // ── Handle Register submit ────────────────────────────────────────────────
  //
  // HOW IT WORKS:
  // 1. Loop over unitRows (one per unit)
  // 2. For each unit, merge sharedForm + that unit's unique fields
  //    Result: { ram: "8GB", serialnumber: "SN-001", modelnumber: "M-001" }
  // 3. Build units array: [{ configurations: {...} }, { configurations: {...} }]
  // 4. Send to backend: { category, units }
  // 5. Backend creates one Product document per unit with unique configs
  //
 const handleRegisterSubmit = async () => {
  const fields = configs[registerCategory?._id]?.fields || [];

  // ── STEP 1: Validate shared fields first ─────────────────────────────────
  const requiredShared = fields.filter(f => f.isRequired && !isUniqueField(f.fieldKey));
  for (const f of requiredShared) {
    if (!sharedForm[f.fieldKey]?.toString().trim()) {
      addToast(`"${f.fieldName}" is required`, "error");
      return;
    }
  }

  // ── STEP 2: Validate unique fields per unit ───────────────────────────────
  const requiredUnique = fields.filter(f => f.isRequired && isUniqueField(f.fieldKey));
  for (let i = 0; i < unitRows.length; i++) {
    for (const f of requiredUnique) {
      const val = unitRows[i][f.fieldKey] || unitRows[i][f.fieldKey.toLowerCase()];
      if (!val?.toString().trim()) {
        addToast(`Unit ${i + 1}: "${f.fieldName}" is required`, "error");
        return;
      }
    }
  }

  // ── STEP 3: Build units array ─────────────────────────────────────────────
  const units = unitRows.map(unit => {
    const configurations = { ...sharedForm };
    fields
      .filter(f => isUniqueField(f.fieldKey))
      .forEach(f => {
        const val = unit[f.fieldKey] || unit[f.fieldKey.toLowerCase()] || "";
        configurations[f.fieldKey] = val;
      });
    return { configurations };
  });

  // ── STEP 4: Send to backend ───────────────────────────────────────────────
  try {
    await axiosInstance.post("/category/register", {
      category: registerCategory._id,
      units,
      quantity: units.length,
    });

    addToast(`${units.length} product${units.length > 1 ? "s" : ""} registered successfully!`);
    setShowRegisterModal(false);
    setSharedForm({});
    setUnitRows([{ id: 1 }]);
    setQuantity(1);
  } catch (e) {
    addToast(e.response?.data?.message || "Registration failed", "error");
  }
};

  const activeCount = categories.filter(c => c.isActive !== false).length;
  const configCount = Object.values(configs).filter(Boolean).length;

  // Get unique and shared fields for the register modal
  const registerFields   = configs[registerCategory?._id]?.fields || [];
  const sharedFields     = registerFields.filter(f => !isUniqueField(f.fieldKey));
  const uniqueFields     = registerFields.filter(f =>  isUniqueField(f.fieldKey));
  const hasUniqueFields  = uniqueFields.length > 0;

  // Render a shared field (reads/writes sharedForm)
  const renderSharedField = (field) => {
    const commonProps = {
      key:      field.fieldKey,
      label:    quantity > 1 ? `${field.fieldName} (same for all ${quantity} units)` : field.fieldName,
      required: field.isRequired,
    };
    if (field.fieldType === "Date") {
      return (
        <DateInput {...commonProps}
          value={sharedForm[field.fieldKey] || ""}
          onChange={e => setSharedForm(p => ({ ...p, [field.fieldKey]: e.target.value }))} />
      );
    }
    if (field.options?.length > 0) {
      return (
        <Select {...commonProps}
          value={sharedForm[field.fieldKey] || ""}
          onChange={e => setSharedForm(p => ({ ...p, [field.fieldKey]: e.target.value }))}>
          <option value="">— Select —</option>
          {field.options.map(o => <option key={o} value={o}>{o}</option>)}
        </Select>
      );
    }
    return (
      <Input {...commonProps}
        type={field.fieldType === "Number" ? "number" : "text"}
        value={sharedForm[field.fieldKey] || ""}
        onChange={e => setSharedForm(p => ({ ...p, [field.fieldKey]: e.target.value }))} />
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ccm-root { background: #eef2f5; font-family: 'DM Sans', sans-serif; }
        .ccm-header {
          position: sticky; top: 0; z-index: 100; height: 64px;
          background: linear-gradient(135deg, #1a3a4f 0%, #1F6E8C 100%);
          padding: 0 40px; display: flex; align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 16px rgba(26,58,79,0.25);
        }
        .ccm-main { max-width: 860px; margin: 0 auto; padding: 32px 20px 48px; }
        @keyframes toastIn { from { transform: translateX(20px); opacity:0 } to { transform:none; opacity:1 } }
        @keyframes modalIn { from { transform: scale(0.97) translateY(-6px); opacity:0 } to { transform:none; opacity:1 } }
        @keyframes fadeUp  { from { transform: translateY(10px); opacity:0 } to { transform:none; opacity:1 } }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .cat-card { animation: fadeUp 0.28s ease both; transition: box-shadow 0.2s, transform 0.2s; }
        .cat-card:hover { box-shadow: 0 6px 24px rgba(31,110,140,0.12) !important; transform: translateY(-1px); }
        .cat-row:hover  { background: #f0f9fc !important; }
        .field-row:hover { background: #f0f9fc !important; }
        .unit-card { border: 1.5px solid #d0e8f2; border-radius: 10px; overflow: hidden; margin-bottom: 0; }
        .unit-card + .unit-card { margin-top: 10px; }
        input::placeholder { color: #a8c8d8; }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(35%) sepia(60%) saturate(400%) hue-rotate(165deg);
          cursor: pointer; opacity: 0.8;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity: 1; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #b3d4e2; border-radius: 2px; }
      `}</style>

      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="ccm-root">

        {/* ── STICKY HEADER ── */}
        <header className="ccm-header">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <BoxIcon size={17} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff",
                fontFamily: "'Syne', sans-serif", letterSpacing: "-0.4px", lineHeight: 1 }}>
                Category Manager
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                Customer Care Portal
              </div>
            </div>
          </div>
          <Btn variant="white" onClick={() => { setEditCat(null); setCatForm({ name: "", description: "" }); setShowCatModal(true); }}>
            <PlusIcon /> New Category
          </Btn>
        </header>

        <main className="ccm-main">

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 30 }}>
            {[
              { label: "Total Categories", value: categories.length, color: C.teal  },
              { label: "With Config",       value: configCount,       color: C.green },
              { label: "Active",            value: activeCount,       color: C.amber },
            ].map(s => (
              <div key={s.label} style={{
                background: "#fff", border: `1px solid ${C.border}`,
                borderRadius: 14, padding: "20px 22px",
                boxShadow: "0 2px 8px rgba(31,110,140,0.07)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: "14px 14px 0 0" }} />
                <div style={{ fontSize: 11, color: C.textSecondary, fontWeight: 600, letterSpacing: "0.04em", marginBottom: 10, marginTop: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 34, fontWeight: 800, color: s.color, fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Section Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 3, height: 20, background: C.teal, borderRadius: 2 }} />
              <h2 style={{ fontSize: 17, fontWeight: 800, color: C.textPrimary, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.4px" }}>
                All Categories
              </h2>
            </div>
            <span style={{ fontSize: 11, color: C.textMuted }}>Click a category to manage configuration</span>
          </div>

          {/* Category List */}
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{
                  height: 66, borderRadius: 14,
                  background: "linear-gradient(90deg, #e4eff4 25%, #d4e9f0 50%, #e4eff4 75%)",
                  backgroundSize: "200% 100%",
                  animation: `shimmer 1.4s infinite`, animationDelay: `${i * 0.1}s`,
                  border: `1px solid ${C.border}`,
                }} />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "64px 24px", background: "#fff",
              borderRadius: 16, border: `2px dashed ${C.border}`,
              boxShadow: "0 2px 8px rgba(31,110,140,0.05)",
            }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>📦</div>
              <div style={{ fontWeight: 700, color: C.textSecondary, fontSize: 15 }}>No categories yet</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>Create your first category to get started</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {categories.map((cat, i) => {
                const isOpen = expandedCategory === cat._id;
                const config = configs[cat._id];
                return (
                  <div key={cat._id} className="cat-card" style={{
                    background: "#fff",
                    border: `1px solid ${isOpen ? C.teal + "66" : C.border}`,
                    borderRadius: 14, overflow: "hidden",
                    boxShadow: isOpen ? `0 0 0 3px ${C.teal}14, 0 4px 20px rgba(31,110,140,0.1)` : "0 1px 4px rgba(31,110,140,0.06)",
                    transition: "all 0.2s ease", animationDelay: `${i * 0.05}s`,
                  }}>
                    {/* Category Row */}
                    <div className="cat-row" onClick={() => toggleExpand(cat._id)} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "13px 18px", cursor: "pointer",
                      background: isOpen ? "#f0f9fc" : "#fff",
                      transition: "background 0.15s",
                      borderBottom: isOpen ? `1px solid ${C.border}` : "none",
                    }}>
                      <CategoryAvatar name={cat.name} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: C.textPrimary, fontFamily: "'Syne', sans-serif" }}>
                          {cat.name}
                        </div>
                        {cat.description && (
                          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {cat.description}
                          </div>
                        )}
                      </div>
                      {config?.fields?.length > 0 && (
                        <span style={{
                          background: C.tealPale, color: C.teal, border: `1px solid ${C.borderMid}`,
                          borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 700,
                        }}>{config.fields.length} fields</span>
                      )}
                      <div onClick={e => e.stopPropagation()} style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => { setEditCat(cat); setCatForm({ name: cat.name, description: cat.description || "" }); setShowCatModal(true); }}
                          style={{ background: C.tealPale, border: "none", borderRadius: 7, padding: 7, cursor: "pointer", color: C.textSecondary, display: "flex", transition: "all 0.15s" }}
                          onMouseOver={e => { e.currentTarget.style.background = "#cde6f0"; e.currentTarget.style.color = C.teal; }}
                          onMouseOut={e => { e.currentTarget.style.background = C.tealPale; e.currentTarget.style.color = C.textSecondary; }}>
                          <EditIcon />
                        </button>
                        <button onClick={() => handleDeleteCategory(cat._id)}
                          style={{ background: C.redPale, border: "none", borderRadius: 7, padding: 7, cursor: "pointer", color: C.red, display: "flex", transition: "all 0.15s" }}
                          onMouseOver={e => e.currentTarget.style.background = "#f8d8d8"}
                          onMouseOut={e => e.currentTarget.style.background = C.redPale}>
                          <TrashIcon />
                        </button>
                      </div>
                      <div style={{ color: isOpen ? C.teal : C.textMuted, transform: isOpen ? "rotate(180deg)" : "none", transition: "all 0.2s ease", display: "flex" }}>
                        <ChevronDown />
                      </div>
                    </div>

                    {/* Config Panel */}
                    {isOpen && (
                      <div style={{ background: C.panelBg, padding: "16px 18px 20px", borderTop: `1px solid ${C.tealPale}` }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, color: C.textSecondary,
                            fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
                            <SettingsIcon /> CONFIGURATION FIELDS
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            {config && (
                              <Btn variant="success" onClick={() => openRegisterModal(cat)}>
                                <BoxIcon /> Register Product
                              </Btn>
                            )}
                            {config === null ? (
                              <Btn onClick={() => openCreateConfig(cat)}><PlusIcon /> Create Config</Btn>
                            ) : config ? (
                              <Btn variant="ghost" onClick={() => { setAddingField({ categoryId: cat._id, field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" } }); setShowFieldModal(true); }}>
                                <PlusIcon /> Add Field
                              </Btn>
                            ) : null}
                          </div>
                        </div>

                        {config === undefined ? (
                          <div style={{ textAlign: "center", padding: "20px", color: C.textMuted, fontSize: 13 }}>Loading config...</div>
                        ) : config === null ? (
                          <div style={{ textAlign: "center", padding: "28px", border: `2px dashed ${C.borderMid}`, borderRadius: 10, background: "#fff" }}>
                            <div style={{ fontSize: 26, marginBottom: 8 }}>⚙️</div>
                            <div style={{ fontWeight: 600, color: C.textSecondary, fontSize: 13 }}>No configuration yet</div>
                            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>
                              Create a config for <b style={{ color: C.teal }}>{cat.name}</b>
                            </div>
                          </div>
                        ) : config.fields?.length === 0 ? (
                          <div style={{ textAlign: "center", padding: "16px", fontSize: 12, color: C.textMuted }}>No fields yet. Add one!</div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 32px", gap: 12, padding: "5px 12px",
                              fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                              <span>Field / Key</span><span>Type</span><span>Unit</span><span>Required</span><span></span>
                            </div>
                            {config.fields.map((field, fi) => (
                              <div key={fi} className="field-row" style={{
                                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 32px",
                                gap: 12, padding: "10px 12px",
                                background: "#fff", border: `1px solid ${C.border}`,
                                borderRadius: 9, alignItems: "center", transition: "background 0.15s",
                              }}>
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ fontWeight: 600, fontSize: 13, color: C.textPrimary }}>{field.fieldName}</span>
                                    {field.fieldType === "Date" && <span title="Date field"><CalendarIcon size={12} color={C.amber} /></span>}
                                    {/* Show badge if this field is unique per unit */}
                                    {isUniqueField(field.fieldKey) && (
                                      <span style={{ fontSize: 9, fontWeight: 700, background: C.amberPale, color: C.amber,
                                        border: `1px solid ${C.amber}44`, borderRadius: 4, padding: "1px 6px" }}>
                                        UNIQUE/UNIT
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ fontSize: 10, color: C.textMuted, fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{field.fieldKey}</div>
                                  {field.options?.length > 0 && (
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 }}>
                                      {field.options.map(o => (
                                        <span key={o} style={{ background: C.tealPale, color: C.textSecondary, borderRadius: 4, padding: "1px 6px", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>{o}</span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div><FieldTypeBadge type={field.fieldType} /></div>
                                <div style={{ fontSize: 12, color: C.textMuted }}>{field.unit || "—"}</div>
                                <div>
                                  {field.isRequired
                                    ? <span style={{ color: C.green, fontSize: 11, fontWeight: 700 }}>✓ Yes</span>
                                    : <span style={{ color: C.textMuted, fontSize: 11 }}>No</span>}
                                </div>
                                <div>
                                  <button onClick={() => handleRemoveField(cat._id, field.fieldKey)}
                                    style={{ background: "transparent", border: "none", borderRadius: 6, padding: 5, cursor: "pointer", color: C.textMuted, display: "flex", transition: "all 0.15s" }}
                                    onMouseOver={e => { e.currentTarget.style.background = C.redPale; e.currentTarget.style.color = C.red; }}
                                    onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMuted; }}>
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

      {/* ══ MODAL: CREATE / EDIT CATEGORY ══ */}
      <Modal open={showCatModal} onClose={() => { setShowCatModal(false); setEditCat(null); }} title={editCat ? "Edit Category" : "New Category"}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Category Name" required placeholder="e.g. Laptop, Printer, AC" value={catForm.name} onChange={e => setCatForm(p => ({ ...p, name: e.target.value }))} />
          <Input label="Description" placeholder="Optional description" value={catForm.description} onChange={e => setCatForm(p => ({ ...p, description: e.target.value }))} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="secondary" onClick={() => { setShowCatModal(false); setEditCat(null); }}>Cancel</Btn>
            <Btn onClick={handleSaveCategory}>{editCat ? "Update" : "Create Category"}</Btn>
          </div>
        </div>
      </Modal>

      {/* ══ MODAL: CREATE CONFIG ══ */}
      <Modal open={showConfigModal} onClose={() => setShowConfigModal(false)} title={`Config — ${activeCategoryForConfig?.name}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>
            Define fields for <b style={{ color: C.teal }}>{activeCategoryForConfig?.name}</b>.
          </p>
          <div style={{ background: C.panelBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Add a field</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Field Name" placeholder="e.g. Purchase Date" value={newField.fieldName} onChange={e => setNewField(p => ({ ...p, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value) }))} />
              <Input label="Field Key" placeholder="auto-filled" value={newField.fieldKey} onChange={e => setNewField(p => ({ ...p, fieldKey: e.target.value }))} />
              <Select label="Type" value={newField.fieldType} onChange={e => setNewField(p => ({ ...p, fieldType: e.target.value }))}>
                {FIELD_TYPES.map(t => <option key={t}>{t}</option>)}
              </Select>
              <Input label="Unit (optional)" placeholder="GB, inch..." value={newField.unit} onChange={e => setNewField(p => ({ ...p, unit: e.target.value }))} />
            </div>
            <Input label="Options (comma separated)" placeholder="8GB, 16GB, 32GB" value={newField.options} onChange={e => setNewField(p => ({ ...p, options: e.target.value }))} />
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textSecondary, cursor: "pointer" }}>
              <input type="checkbox" checked={newField.isRequired} onChange={e => setNewField(p => ({ ...p, isRequired: e.target.checked }))} style={{ accentColor: C.teal }} />
              Required field
            </label>
            {newField.fieldType === "Date" && (
              <div style={{ fontSize: 11, color: C.amber, background: C.amberPale, border: `1px solid ${C.amber}44`, borderRadius: 7, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                <CalendarIcon size={12} color={C.amber} />
                Date fields show a calendar picker when registering a product
              </div>
            )}
            <Btn variant="ghost" onClick={addFieldToForm} style={{ alignSelf: "flex-start" }}><PlusIcon /> Add to list</Btn>
          </div>
          {configFields.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Fields to create ({configFields.length})</div>
              {configFields.map(f => (
                <div key={f._tempId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.panelBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px" }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary }}>{f.fieldName}</span>
                    <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 8, fontFamily: "'DM Mono', monospace" }}>({f.fieldKey})</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <FieldTypeBadge type={f.fieldType} />
                    {f.fieldType === "Date" && <CalendarIcon size={12} color={C.amber} />}
                    {f.isRequired && <span style={{ color: C.green, fontSize: 10, fontWeight: 700 }}>REQUIRED</span>}
                    <button onClick={() => setConfigFields(p => p.filter(x => x._tempId !== f._tempId))} style={{ background: "none", border: "none", cursor: "pointer", color: C.red, display: "flex" }}><XIcon /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setShowConfigModal(false)}>Cancel</Btn>
            <Btn onClick={handleCreateConfig} disabled={configFields.length === 0}><CheckIcon /> Save Configuration</Btn>
          </div>
        </div>
      </Modal>

      {/* ══ MODAL: ADD FIELD ══ */}
      <Modal open={showFieldModal} onClose={() => setShowFieldModal(false)} title="Add New Field">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Field Name" required placeholder="e.g. Warranty End Date" value={addingField.field.fieldName} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value) } }))} />
            <Input label="Field Key" placeholder="auto-filled" value={addingField.field.fieldKey} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldKey: e.target.value } }))} />
            <Select label="Type" value={addingField.field.fieldType} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldType: e.target.value } }))}>
              {FIELD_TYPES.map(t => <option key={t}>{t}</option>)}
            </Select>
            <Input label="Unit (optional)" placeholder="GB, inch..." value={addingField.field.unit} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, unit: e.target.value } }))} />
          </div>
          <Input label="Options (comma separated)" placeholder="8GB, 16GB, 32GB" value={addingField.field.options} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, options: e.target.value } }))} />
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textSecondary, cursor: "pointer" }}>
            <input type="checkbox" checked={addingField.field.isRequired} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, isRequired: e.target.checked } }))} style={{ accentColor: C.teal }} />
            Required field
          </label>
          {addingField.field.fieldType === "Date" && (
            <div style={{ fontSize: 11, color: C.amber, background: C.amberPale, border: `1px solid ${C.amber}44`, borderRadius: 7, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6 }}>
              <CalendarIcon size={12} color={C.amber} />
              Date fields show a calendar picker when registering a product
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setShowFieldModal(false)}>Cancel</Btn>
            <Btn onClick={handleAddFieldToExisting}><PlusIcon /> Add Field</Btn>
          </div>
        </div>
      </Modal>

      {/* ══ MODAL: REGISTER PRODUCT (FIXED) ══════════════════════════════════
        
        THE FIX EXPLAINED:
        
        BEFORE (the bug):
          One single registerForm object shared by all units.
          { serialnumber: "ABC", modelnumber: "XYZ" }
          All 3 units get identical values → BUG
        
        AFTER (the fix):
          TWO separate areas:
          1. SHARED FIELDS — filled once, applies to ALL units
             e.g. RAM=8GB, Color=Black, Company=Dell
          2. UNIT ROWS — one card per unit, each has its own
             serialnumber, modelnumber, invoicenumber
        
        When quantity changes → handleQuantityChange generates
        that many unit row cards automatically.
        
        On submit → merge shared + unique per unit → send units[] array
        Backend creates one Product per unit with unique configs.
      ════════════════════════════════════════════════════════════════════════ */}
      <Modal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        title={`Register — ${registerCategory?.name}`}
        wide={hasUniqueFields && quantity > 1}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Category banner */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.tealPale, border: `1px solid ${C.borderMid}`,
            borderRadius: 9, padding: "10px 14px",
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, flexShrink: 0,
              background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BoxIcon size={14} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted,
                textTransform: "uppercase", letterSpacing: "0.06em" }}>Category</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.teal,
                fontFamily: "'Syne', sans-serif" }}>{registerCategory?.name}</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 600, color: C.teal,
              background: "#fff", border: `1px solid ${C.borderMid}`, borderRadius: 5, padding: "2px 8px" }}>
              Auto
            </span>
          </div>

          {/* Quantity */}
          {/* Quantity */}
<div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
  <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
    letterSpacing: "0.05em", textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif" }}>
    Quantity
  </label>
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <button
      onClick={() => handleQuantityChange(quantity - 1)}
      style={{ width: 32, height: 32, borderRadius: 8,
        border: `1.5px solid ${C.border}`, background: C.inputBg,
        color: C.textPrimary, fontSize: 18, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700 }}>
      −
    </button>
    <input
      type="number" min="1"
      value={quantity}
      onChange={e => handleQuantityChange(e.target.value)}
      style={{ width: 70, textAlign: "center", background: C.inputBg,
        border: `1.5px solid ${C.border}`, borderRadius: 8,
        padding: "8px", fontSize: 15, fontWeight: 700,
        color: C.textPrimary, outline: "none",
        fontFamily: "'DM Sans', sans-serif" }}
    />
    <button
      onClick={() => handleQuantityChange(quantity + 1)}
      style={{ width: 32, height: 32, borderRadius: 8,
        border: `1.5px solid ${C.border}`, background: C.inputBg,
        color: C.textPrimary, fontSize: 18, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700 }}>
      +
    </button>
  </div>
</div>

          {/* ── SHARED FIELDS SECTION ────────────────────────────────────────
            These fields are the same for ALL units.
            Agent fills them once. All products get the same value.
            Examples: RAM, Color, Company Name, Purchase Date
          ─────────────────────────────────────────────────────────────────── */}
          {sharedFields.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {quantity > 1 && (
                <div style={{
                  fontSize: 10, fontWeight: 700, color: C.textSecondary,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  display: "flex", alignItems: "center", gap: 8,
                  borderBottom: `1px solid ${C.border}`, paddingBottom: 8,
                }}>
                  <span style={{ background: C.tealPale, color: C.teal, borderRadius: 4,
                    padding: "2px 8px", fontSize: 9 }}>SHARED</span>
                  Same for all {quantity} units
                </div>
              )}
              {sharedFields.map(field => renderSharedField(field))}
            </div>
          )}

          {/* ── UNIQUE FIELDS SECTION ─────────────────────────────────────────
            These fields must be different for each unit.
            One card rendered per unit. Agent fills each separately.
            Fields: serialnumber, modelnumber, invoicenumber
          ─────────────────────────────────────────────────────────────────── */}
          {hasUniqueFields && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Section header */}
              <div style={{
                fontSize: 10, fontWeight: 700, color: C.textSecondary,
                textTransform: "uppercase", letterSpacing: "0.08em",
                display: "flex", alignItems: "center", gap: 8,
                borderBottom: `1px solid ${C.border}`, paddingBottom: 8,
              }}>
                <span style={{ background: C.amberPale, color: C.amber, borderRadius: 4,
                  padding: "2px 8px", fontSize: 9, border: `1px solid ${C.amber}44` }}>UNIQUE</span>
                Enter different values for each of the {quantity} unit{quantity > 1 ? "s" : ""}
              </div>

              {/* One card per unit */}
              {unitRows.map((unit, idx) => (
                <div key={unit.id} className="unit-card">

                  {/* Unit header */}
                  <div style={{
                    background: `linear-gradient(135deg, #1a3a4f, #1F6E8C)`,
                    padding: "8px 14px",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span style={{
                      background: "rgba(255,255,255,0.2)", color: "#fff",
                      borderRadius: 5, padding: "2px 10px",
                      fontSize: 11, fontWeight: 800,
                      fontFamily: "'DM Mono', monospace",
                    }}>
                      Unit {idx + 1}
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                      of {quantity}
                    </span>
                  </div>

                  {/* Unique fields for this unit */}
                  <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
                    {uniqueFields.map(field => (
                      <Input
                        key={field.fieldKey}
                        label={field.fieldName}
                        required={field.isRequired}
                        placeholder={`Enter ${field.fieldName} for Unit ${idx + 1}`}
                        value={unit[field.fieldKey] || ""}
                        onChange={e => handleUnitFieldChange(unit.id, field.fieldKey, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4,
            borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
            <Btn variant="secondary" onClick={() => setShowRegisterModal(false)}>Cancel</Btn>
            <Btn onClick={handleRegisterSubmit}>
              <CheckIcon /> Register {quantity} Product{quantity > 1 ? "s" : ""}
            </Btn>
          </div>
        </div>
      </Modal>
    </>
  );
}