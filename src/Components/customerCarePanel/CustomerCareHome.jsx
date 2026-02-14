// // import { useState } from "react";
// // import React from 'react'
// // const STYLES = `
// //   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

// //   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// //   :root {
// //     --bg:        #f0f2f5;
// //     --surface:   #ffffff;
// //     --surface2:  #f7f8fa;
// //     --border:    #e4e7ec;
// //     --border2:   #d0d5dd;
// //     --text:      #101828;
// //     --muted:     #667085;
// //     --subtle:    #98a2b3;
// //     --accent:    #1a56db;
// //     --accent-lt: #ebf0ff;
// //     --accent2:   #0ea47a;
// //     --accent2-lt:#e6f7f2;
// //     --danger:    #d92d20;
// //     --shadow-sm: 0 1px 2px rgba(16,24,40,.05);
// //     --shadow-md: 0 4px 16px rgba(16,24,40,.08);
// //     --shadow-lg: 0 12px 40px rgba(16,24,40,.12);
// //     --r-sm: 8px;
// //     --r-md: 12px;
// //     --r-lg: 18px;
// //     --r-xl: 24px;
// //     --font: 'Plus Jakarta Sans', sans-serif;
// //     --serif: 'Instrument Serif', serif;
// //   }

// //   .cc-wrap {
// //     min-height: 100vh;
// //     background: var(--bg);
// //     font-family: var(--font);
// //     color: var(--text);
// //     display: flex;
// //     flex-direction: column;
// //   }

// //   /* ── NAV ── */
// //   .cc-nav {
// //     background: var(--surface);
// //     border-bottom: 1px solid var(--border);
// //     padding: 0 32px;
// //     height: 60px;
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     position: sticky;
// //     top: 0;
// //     z-index: 50;
// //     box-shadow: var(--shadow-sm);
// //   }
// //   .cc-nav-brand { display: flex; align-items: center; gap: 10px; }
// //   .cc-nav-logo {
// //     width: 34px; height: 34px;
// //     background: linear-gradient(135deg, #1a56db 0%, #0ea47a 100%);
// //     border-radius: 9px;
// //     display: flex; align-items: center; justify-content: center;
// //     color: white; font-size: 15px; font-weight: 800;
// //     letter-spacing: -1px; flex-shrink: 0;
// //   }
// //   .cc-nav-name  { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.2px; }
// //   .cc-nav-sub   { font-size: 11px; color: var(--muted); font-weight: 500; margin-top: 1px; }
// //   .cc-nav-pill  {
// //     background: var(--accent-lt); color: var(--accent);
// //     font-size: 11.5px; font-weight: 600; padding: 4px 12px;
// //     border-radius: 100px; letter-spacing: 0.1px;
// //   }

// //   /* ── LAYOUT ── */
// //   .cc-main { display: flex; flex: 1; }

// //   /* ── SIDEBAR ── */
// //   .cc-sidebar {
// //     width: 230px;
// //     background: var(--surface);
// //     border-right: 1px solid var(--border);
// //     padding: 24px 14px;
// //     display: flex; flex-direction: column; gap: 3px;
// //     flex-shrink: 0;
// //   }
// //   .cc-sb-label {
// //     font-size: 10.5px; font-weight: 700;
// //     text-transform: uppercase; letter-spacing: 0.08em;
// //     color: var(--subtle); padding: 0 10px;
// //     margin-bottom: 4px; margin-top: 10px;
// //   }
// //   .cc-sb-label:first-child { margin-top: 0; }
// //   .cc-nav-item {
// //     display: flex; align-items: center; gap: 10px;
// //     padding: 8px 10px; border-radius: var(--r-sm);
// //     font-size: 13.5px; font-weight: 500; color: var(--muted);
// //     cursor: pointer; transition: all .15s ease;
// //     border: none; background: transparent; width: 100%; text-align: left;
// //   }
// //   .nav-ico {
// //     width: 28px; height: 28px; border-radius: 7px;
// //     display: flex; align-items: center; justify-content: center;
// //     font-size: 13px; background: var(--surface2); flex-shrink: 0;
// //     transition: all .15s ease;
// //   }
// //   .cc-nav-item:hover { background: var(--surface2); color: var(--text); }
// //   .cc-nav-item.is-blue  { background: var(--accent-lt); color: var(--accent); font-weight: 600; }
// //   .cc-nav-item.is-blue .nav-ico  { background: var(--accent); color: white; }
// //   .cc-nav-item.is-green { background: var(--accent2-lt); color: var(--accent2); font-weight: 600; }
// //   .cc-nav-item.is-green .nav-ico { background: var(--accent2); color: white; }

// //   /* ── CONTENT ── */
// //   .cc-content { flex: 1; padding: 36px 40px; overflow-y: auto; }

// //   /* ── PAGE HEADER ── */
// //   .cc-breadcrumb {
// //     display: flex; align-items: center; gap: 6px;
// //     font-size: 12.5px; color: var(--muted); margin-bottom: 10px;
// //   }
// //   .cc-breadcrumb span { color: var(--subtle); }
// //   .cc-page-title {
// //     font-family: var(--serif); font-size: 30px; font-style: italic;
// //     color: var(--text); letter-spacing: -0.5px; line-height: 1.1; margin-bottom: 4px;
// //   }
// //   .cc-page-desc { font-size: 13.5px; color: var(--muted); margin-bottom: 28px; }

// //   /* ── STEP BAR ── */
// //   .cc-steps {
// //     display: flex; align-items: center;
// //     background: var(--surface);
// //     border: 1px solid var(--border);
// //     border-radius: var(--r-lg);
// //     padding: 16px 20px;
// //     box-shadow: var(--shadow-sm);
// //     margin-bottom: 28px;
// //     gap: 0;
// //   }
// //   .cc-step {
// //     display: flex; align-items: center; gap: 10px;
// //     flex: 1; cursor: pointer; padding: 4px 8px;
// //     border-radius: var(--r-sm); transition: opacity .2s;
// //   }
// //   .cc-step:hover { opacity: 0.75; }
// //   .step-num {
// //     width: 32px; height: 32px; border-radius: 50%;
// //     display: flex; align-items: center; justify-content: center;
// //     font-size: 13px; font-weight: 700; flex-shrink: 0;
// //     border: 2px solid var(--border2); color: var(--subtle);
// //     background: var(--surface2); transition: all .2s;
// //   }
// //   .cc-step.s-active .step-num {
// //     background: var(--accent); border-color: var(--accent); color: white;
// //     box-shadow: 0 0 0 4px var(--accent-lt);
// //   }
// //   .cc-step.s-done .step-num {
// //     background: var(--accent2); border-color: var(--accent2); color: white;
// //   }
// //   .step-lbl { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--subtle); }
// //   .step-ttl { font-size: 13.5px; font-weight: 600; color: var(--muted); margin-top: 1px; }
// //   .cc-step.s-active .step-lbl { color: var(--accent); }
// //   .cc-step.s-active .step-ttl { color: var(--text); }
// //   .cc-step.s-done .step-lbl   { color: var(--accent2); }
// //   .step-div { width: 40px; height: 1px; background: var(--border); flex-shrink: 0; margin: 0 4px; }

// //   /* ── CARD ── */
// //   .cc-card {
// //     background: var(--surface); border: 1px solid var(--border);
// //     border-radius: var(--r-xl); overflow: hidden;
// //     box-shadow: var(--shadow-md);
// //     animation: fadeUp .3s cubic-bezier(.22,1,.36,1) both;
// //   }
// //   @keyframes fadeUp {
// //     from { opacity:0; transform: translateY(14px); }
// //     to   { opacity:1; transform: translateY(0); }
// //   }
// //   .cc-card-top {
// //     padding: 22px 28px 18px; border-bottom: 1px solid var(--border);
// //     display: flex; align-items: flex-start; gap: 14px;
// //     background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%);
// //   }
// //   .cti { width: 46px; height: 46px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
// //   .cti.blue  { background: var(--accent-lt); }
// //   .cti.green { background: var(--accent2-lt); }
// //   .cth { font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.2px; }
// //   .ctp { font-size: 13px; color: var(--muted); margin-top: 3px; line-height: 1.5; }

// //   /* ── FORM ── */
// //   .cc-form-body { padding: 26px 28px; display: flex; flex-direction: column; gap: 22px; }
// //   .cc-sec-head {
// //     display: flex; align-items: center; gap: 11px;
// //     padding-bottom: 13px; border-bottom: 1px solid var(--border);
// //   }
// //   .sec-ico { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
// //   .sec-ico.blue  { background: var(--accent-lt); }
// //   .sec-ico.green { background: var(--accent2-lt); }
// //   .sec-ttl { font-size: 13px; font-weight: 700; color: var(--text); }
// //   .sec-sub { font-size: 12px; color: var(--muted); margin-top: 1px; }

// //   .cc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px; }
// //   .cc-grid.g3 { grid-template-columns: 1fr 1fr 1fr; }
// //   .full { grid-column: 1 / -1; }

// //   .cc-field { display: flex; flex-direction: column; gap: 5px; }
// //   .cc-label { font-size: 12.5px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 3px; }
// //   .req { color: var(--danger); font-size: 13px; }
// //   .cc-hint { font-size: 11.5px; color: var(--subtle); margin-top: 2px; }

// //   .cc-input, .cc-select {
// //     width: 100%; height: 40px; padding: 0 13px;
// //     border: 1.5px solid var(--border2); border-radius: var(--r-sm);
// //     background: var(--surface);
// //     font-family: var(--font); font-size: 13.5px; font-weight: 500; color: var(--text);
// //     transition: border-color .15s, box-shadow .15s, background .15s;
// //     outline: none; -webkit-appearance: none; appearance: none;
// //   }
// //   .cc-input::placeholder { color: var(--subtle); font-weight: 400; }
// //   .cc-input:hover, .cc-select:hover { border-color: #b0bac7; }
// //   .cc-input:focus, .cc-select:focus {
// //     border-color: var(--accent);
// //     box-shadow: 0 0 0 3px rgba(26,86,219,.12);
// //     background: #fafcff;
// //   }
// //   .cc-select {
// //     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2398a2b3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
// //     background-repeat: no-repeat; background-position: right 12px center;
// //     padding-right: 36px; cursor: pointer;
// //   }
// //   .cc-select option { background: white; color: var(--text); }

// //   .cc-divider { height: 1px; background: var(--border); }

// //   /* ── FOOTER ── */
// //   .cc-form-footer {
// //     padding: 18px 28px;
// //     background: var(--surface2); border-top: 1px solid var(--border);
// //     display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
// //   }
// //   .footer-note { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 4px; }
// //   .footer-acts { display: flex; gap: 9px; align-items: center; }

// //   .btn {
// //     display: inline-flex; align-items: center; gap: 6px;
// //     height: 38px; padding: 0 18px; border-radius: var(--r-sm);
// //     font-family: var(--font); font-size: 13.5px; font-weight: 600;
// //     cursor: pointer; border: none; transition: all .18s ease; letter-spacing: -0.1px;
// //   }
// //   .btn-ghost {
// //     background: transparent; color: var(--muted);
// //     border: 1.5px solid var(--border2);
// //   }
// //   .btn-ghost:hover { background: var(--surface2); color: var(--text); border-color: #b0bac7; }
// //   .btn-blue {
// //     background: var(--accent); color: white;
// //     box-shadow: 0 1px 3px rgba(26,86,219,.3), 0 4px 12px rgba(26,86,219,.18);
// //   }
// //   .btn-blue:hover { background: #1447c0; box-shadow: 0 2px 6px rgba(26,86,219,.35), 0 8px 20px rgba(26,86,219,.22); transform: translateY(-1px); }
// //   .btn-blue:active { transform: translateY(0); }
// //   .btn-green {
// //     background: var(--accent2); color: white;
// //     box-shadow: 0 1px 3px rgba(14,164,122,.3), 0 4px 12px rgba(14,164,122,.18);
// //   }
// //   .btn-green:hover { background: #0b8c67; transform: translateY(-1px); box-shadow: 0 2px 6px rgba(14,164,122,.35), 0 8px 20px rgba(14,164,122,.22); }
// //   .btn-green:active { transform: translateY(0); }
// //   .btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none !important; }

// //   /* ── TOAST ── */
// //   .cc-toast {
// //     position: fixed; bottom: 24px; right: 24px;
// //     background: white; border: 1px solid var(--border);
// //     border-radius: var(--r-lg); padding: 14px 16px;
// //     box-shadow: var(--shadow-lg);
// //     display: flex; align-items: center; gap: 12px;
// //     animation: toastIn .35s cubic-bezier(.22,1,.36,1) both;
// //     z-index: 200; min-width: 270px;
// //   }
// //   @keyframes toastIn {
// //     from { opacity:0; transform: translateY(16px) scale(.96); }
// //     to   { opacity:1; transform: translateY(0) scale(1); }
// //   }
// //   .toast-dot {
// //     width: 36px; height: 36px; border-radius: 50%;
// //     display: flex; align-items: center; justify-content: center;
// //     font-size: 16px; flex-shrink: 0;
// //   }
// //   .toast-dot.blue  { background: var(--accent-lt); color: var(--accent); }
// //   .toast-dot.green { background: var(--accent2-lt); color: var(--accent2); }
// //   .toast-ttl { font-size: 14px; font-weight: 700; color: var(--text); }
// //   .toast-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
// //   .toast-x {
// //     margin-left: auto; background: none; border: none; cursor: pointer;
// //     color: var(--subtle); font-size: 15px; padding: 4px; border-radius: 5px;
// //     transition: background .15s; line-height: 1;
// //   }
// //   .toast-x:hover { background: var(--surface2); color: var(--text); }

// //   @media (max-width: 700px) {
// //     .cc-sidebar { display: none; }
// //     .cc-content { padding: 20px 16px; }
// //     .cc-grid, .cc-grid.g3 { grid-template-columns: 1fr; }
// //   }
// // `;

// // const CATS     = ["Television","Refrigerator","Washing Machine","Air Conditioner","Microwave","Laptop","Mobile Phone","Camera","Printer","Other Electronics"];
// // const WARRANTY = ["3 Months","6 Months","1 Year","2 Years","3 Years","5 Years"];

// // const EMPTY_CUST = { customerName:"", email:"", mobileNum:"" };
// // const EMPTY_PROD = { productName:"", productCategory:"", brandName:"", modelNumber:"", serialNumber:"", purchaseDate:"", invoiceNumber:"", warrantyPeriod:"" };

// // export default function CustomerCareHome() {
// //   const [view, setView]     = useState("customer");
// //   const [toast, setToast]   = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [cust, setCust]     = useState(EMPTY_CUST);
// //   const [prod, setProd]     = useState(EMPTY_PROD);

// //   const show = (type) => { setToast(type); setTimeout(() => setToast(null), 3500); };

// //   const onC = (e) => setCust({ ...cust, [e.target.name]: e.target.value });
// //   const onP = (e) => setProd({ ...prod, [e.target.name]: e.target.value });

// //   const submitCust = async (e) => {
// //     e.preventDefault(); setLoading(true);
// //     try {
// //       // await axios.post("/api/auth/register/customer", cust);
// //       await new Promise(r => setTimeout(r, 700));
// //       show("customer"); setCust(EMPTY_CUST);
// //     } catch(err) { console.error(err); }
// //     setLoading(false);
// //   };

// //   const submitProd = async (e) => {
// //     e.preventDefault(); setLoading(true);
// //     try {
// //       // await axios.post("/api/auth/register/product", prod);
// //       await new Promise(r => setTimeout(r, 700));
// //       show("product"); setProd(EMPTY_PROD);
// //     } catch(err) { console.error(err); }
// //     setLoading(false);
// //   };

// //   const SIDEBAR_ITEMS = [
// //     { id:"customer", icon:"👤", label:"Customer",   cls:"is-blue"  },
// //     { id:"product",  icon:"📦", label:"Product",    cls:"is-green" },
// //   ];

// //   return (
// //     <>
// //       <style>{STYLES}</style>
// //       <div className="cc-wrap">

// //         {/* NAV */}
// //         <nav className="cc-nav">
// //           <div className="cc-nav-brand">
// //             <div className="cc-nav-logo">CC</div>
// //             <div>
// //               <div className="cc-nav-name">ServiceDesk Pro</div>
// //               <div className="cc-nav-sub">Customer Care Management</div>
// //             </div>
// //           </div>
// //           <div className="cc-nav-pill">● Live</div>
// //         </nav>

// //         <div className="cc-main">

// //           {/* SIDEBAR */}
// //           <aside className="cc-sidebar">
// //             <div className="cc-sb-label">Registrations</div>
// //             {SIDEBAR_ITEMS.map(it => (
// //               <button
// //                 key={it.id}
// //                 className={`cc-nav-item ${view === it.id ? it.cls : ""}`}
// //                 onClick={() => setView(it.id)}
// //               >
// //                 <div className="nav-ico">{it.icon}</div>
// //                 {it.label}
// //               </button>
// //             ))}

// //             <div className="cc-sb-label">Management</div>
// //             {[["🔍","Search"],["📋","All Customers"],["🛠","Tickets"],["📊","Reports"]].map(([ico, lbl]) => (
// //               <button key={lbl} className="cc-nav-item">
// //                 <div className="nav-ico">{ico}</div>{lbl}
// //               </button>
// //             ))}
// //           </aside>

// //           {/* CONTENT */}
// //           <main className="cc-content">
// //             {/* Page header */}
// //             <div className="cc-breadcrumb">
// //               Home <span>›</span> Registrations <span>›</span>
// //               <strong style={{color:"var(--text)"}}>
// //                 {view === "customer" ? "Customer" : "Product"}
// //               </strong>
// //             </div>
// //             <div className="cc-page-title">
// //               {view === "customer" ? "Customer Registration" : "Product Registration"}
// //             </div>
// //             <div className="cc-page-desc">
// //               {view === "customer"
// //                 ? "Add a new customer to the support system for warranty and service access."
// //                 : "Register a purchased product to activate warranty coverage and service tracking."}
// //             </div>

// //             {/* Step bar */}
// //             <div className="cc-steps">
// //               <div className={`cc-step ${view === "customer" ? "s-active" : "s-done"}`} onClick={() => setView("customer")}>
// //                 <div className="step-num">{view === "product" ? "✓" : "1"}</div>
// //                 <div><div className="step-lbl">Step 1</div><div className="step-ttl">Customer Info</div></div>
// //               </div>
// //               <div className="step-div" />
// //               <div className={`cc-step ${view === "product" ? "s-active" : ""}`} onClick={() => setView("product")}>
// //                 <div className="step-num">2</div>
// //                 <div><div className="step-lbl">Step 2</div><div className="step-ttl">Product Details</div></div>
// //               </div>
// //             </div>

// //             {/* ── CUSTOMER FORM ── */}
// //             {view === "customer" && (
// //               <div className="cc-card" key="cust">
// //                 <div className="cc-card-top">
// //                   <div className="cti blue">👤</div>
// //                   <div>
// //                     <div className="cth">New Customer</div>
// //                     <div className="ctp">Register a customer to grant access to warranty claims and support history.</div>
// //                   </div>
// //                 </div>
// //                 <form onSubmit={submitCust}>
// //                   <div className="cc-form-body">
// //                     <div>
// //                       <div className="cc-sec-head">
// //                         <div className="sec-ico blue">🪪</div>
// //                         <div>
// //                           <div className="sec-ttl">Personal Information</div>
// //                           <div className="sec-sub">Basic contact details of the customer</div>
// //                         </div>
// //                       </div>
// //                       <div className="cc-grid">
// //                         <div className="cc-field full">
// //                           <label className="cc-label">Full Name <span className="req">*</span></label>
// //                           <input className="cc-input" name="customerName" value={cust.customerName}
// //                             onChange={onC} placeholder="e.g. Rahul Sharma" required />
// //                         </div>
// //                         <div className="cc-field">
// //                           <label className="cc-label">Email Address <span className="req">*</span></label>
// //                           <input className="cc-input" type="email" name="email" value={cust.email}
// //                             onChange={onC} placeholder="rahul@example.com" required />
// //                         </div>
// //                         <div className="cc-field">
// //                           <label className="cc-label">Mobile Number <span className="req">*</span></label>
// //                           <input className="cc-input" type="tel" name="mobileNum" value={cust.mobileNum}
// //                             onChange={onC} placeholder="+91 98765 43210" required />
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="cc-form-footer">
// //                     <div className="footer-note"><span style={{color:"var(--danger)"}}>*</span> Required fields</div>
// //                     <div className="footer-acts">
// //                       <button type="button" className="btn btn-ghost" onClick={() => setCust(EMPTY_CUST)}>Clear</button>
// //                       <button type="submit" className="btn btn-blue" disabled={loading}>
// //                         {loading ? "Saving…" : <>Register Customer <span>→</span></>}
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </form>
// //               </div>
// //             )}

// //             {/* ── PRODUCT FORM ── */}
// //             {view === "product" && (
// //               <div className="cc-card" key="prod">
// //                 <div className="cc-card-top">
// //                   <div className="cti green">📦</div>
// //                   <div>
// //                     <div className="cth">Product Registration</div>
// //                     <div className="ctp">Register a purchased product to activate warranty and service request tracking.</div>
// //                   </div>
// //                 </div>
// //                 <form onSubmit={submitProd}>
// //                   <div className="cc-form-body">
// //                     {/* Product details */}
// //                     <div>
// //                       <div className="cc-sec-head">
// //                         <div className="sec-ico green">🔧</div>
// //                         <div>
// //                           <div className="sec-ttl">Product Details</div>
// //                           <div className="sec-sub">Identify the product being registered</div>
// //                         </div>
// //                       </div>
// //                       <div className="cc-grid">
// //                         <div className="cc-field">
// //                           <label className="cc-label">Product Name <span className="req">*</span></label>
// //                           <input className="cc-input" name="productName" value={prod.productName}
// //                             onChange={onP} placeholder='e.g. 55" Smart TV' required />
// //                         </div>
// //                         <div className="cc-field">
// //                           <label className="cc-label">Product Category <span className="req">*</span></label>
// //                           <select className="cc-select" name="productCategory" value={prod.productCategory} onChange={onP} required>
// //                             <option value="">Select category</option>
// //                             {CATS.map(c => <option key={c}>{c}</option>)}
// //                           </select>
// //                         </div>
// //                         <div className="cc-field">
// //                           <label className="cc-label">Brand Name <span className="req">*</span></label>
// //                           <input className="cc-input" name="brandName" value={prod.brandName}
// //                             onChange={onP} placeholder="e.g. Samsung" required />
// //                         </div>
// //                         <div className="cc-field">
// //                           <label className="cc-label">Model Number <span className="req">*</span></label>
// //                           <input className="cc-input" name="modelNumber" value={prod.modelNumber}
// //                             onChange={onP} placeholder="e.g. UA55AU8000" required />
// //                         </div>
// //                         <div className="cc-field full">
// //                           <label className="cc-label">Serial Number <span className="req">*</span></label>
// //                           <input className="cc-input" name="serialNumber" value={prod.serialNumber}
// //                             onChange={onP} placeholder="e.g. SN2024XXXXXXXX" required />
// //                           <span className="cc-hint">Found on the back of the product or inside the packaging</span>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="cc-divider" />

// //                     {/* Purchase & Warranty */}
// //                     <div>
// //                       <div className="cc-sec-head">
// //                         <div className="sec-ico green">🧾</div>
// //                         <div>
// //                           <div className="sec-ttl">Purchase &amp; Warranty</div>
// //                           <div className="sec-sub">Invoice and warranty coverage information</div>
// //                         </div>
// //                       </div>
// //                       <div className="cc-grid g3">
// //                         <div className="cc-field">
// //                           <label className="cc-label">Purchase Date <span className="req">*</span></label>
// //                           <input className="cc-input" type="date" name="purchaseDate" value={prod.purchaseDate}
// //                             onChange={onP} required />
// //                         </div>
// //                         <div className="cc-field">
// //                           <label className="cc-label">Invoice Number <span className="req">*</span></label>
// //                           <input className="cc-input" name="invoiceNumber" value={prod.invoiceNumber}
// //                             onChange={onP} placeholder="INV-2024-001" required />
// //                         </div>
// //                         <div className="cc-field">
// //                           <label className="cc-label">Warranty Period <span className="req">*</span></label>
// //                           <select className="cc-select" name="warrantyPeriod" value={prod.warrantyPeriod} onChange={onP} required>
// //                             <option value="">Select period</option>
// //                             {WARRANTY.map(w => <option key={w}>{w}</option>)}
// //                           </select>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="cc-form-footer">
// //                     <div className="footer-note"><span style={{color:"var(--danger)"}}>*</span> All 8 fields required</div>
// //                     <div className="footer-acts">
// //                       <button type="button" className="btn btn-ghost" onClick={() => setProd(EMPTY_PROD)}>Clear</button>
// //                       <button type="submit" className="btn btn-green" disabled={loading}>
// //                         {loading ? "Saving…" : <>Register Product <span>→</span></>}
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </form>
// //               </div>
// //             )}
// //           </main>
// //         </div>
// //       </div>

// //       {/* TOAST */}
// //       {toast && (
// //         <div className="cc-toast">
// //           <div className={`toast-dot ${toast === "customer" ? "blue" : "green"}`}>✓</div>
// //           <div>
// //             <div className="toast-ttl">{toast === "customer" ? "Customer Registered!" : "Product Registered!"}</div>
// //             <div className="toast-sub">Record saved successfully to the system</div>
// //           </div>
// //           <button className="toast-x" onClick={() => setToast(null)}>✕</button>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // // import { useState } from "react";
// // // import axios from "axios";
// // // import React from "react";

// // // const API = "http://localhost:5000/api/auth";

// // // const EMPTY_CUST = {
// // //   name: "",
// // //   email: "",
// // //   phone: "",
// // //   address: "",
// // //   productName: "",
// // //   productCategory: "",
// // //   modelNumber: "",
// // //   serialNumber: "",

// // // };

// // // const EMPTY_PROD = {
// // //   productName: "",
// // //   productCategory: "",
// // //   brandName: "",
// // //   modelNumber: "",
// // //   serialNumber: "",
// // //   purchaseDate: "",
// // //   invoiceNumber: "",
// // //   warrantyPeriod: "",
// // // };

// // // export default function CustomerCareHome() {
// // //   const [cust, setCust] = useState(EMPTY_CUST);
// // //   const [prod, setProd] = useState(EMPTY_PROD);
// // //   const [loading, setLoading] = useState(false);
// // //   const [toast, setToast] = useState(null);
// // //   const [error, setError] = useState(null);

// // //   const showToast = (message, type = "success") => {
// // //     setToast({ message, type });
// // //     setTimeout(() => setToast(null), 3000);
// // //   };

// // //   const onCustChange = (e) =>
// // //     setCust({ ...cust, [e.target.name]: e.target.value });

// // //   const onProdChange = (e) =>
// // //     setProd({ ...prod, [e.target.name]: e.target.value });

// // //   // ================= CUSTOMER SUBMIT =================
// // //   const submitCust = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError(null);

// // //     try {
// // //       const res = await axios.post(`/api/customerDetails/newcustomer`, cust);
// // //       showToast(res.data.message || "Customer Registered");
// // //       setCust(EMPTY_CUST);
// // //     } catch (err) {
// // //       const msg = err.response?.data?.message || "Customer registration failed";
// // //       setError(msg);
// // //       showToast(msg, "error");
// // //     }
// // //     setLoading(false);
// // //   };

// // //   // ================= PRODUCT SUBMIT =================
// // //   const submitProd = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError(null);

// // //     try {
// // //       const res = await axios.post(`${API}/register`, prod);
// // //       showToast(res.data.message || "Product Registered");
// // //       setProd(EMPTY_PROD);
// // //     } catch (err) {
// // //       const msg = err.response?.data?.message || "Product registration failed";
// // //       setError(msg);
// // //       showToast(msg, "error");
// // //     }
// // //     setLoading(false);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-7xl mx-auto">
// // //         {/* Header */}
// // //         <div className="text-center mb-8">
// // //           <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
// // //             Customer Care Portal
// // //           </h2>
// // //           <p className="mt-2 text-sm text-gray-600">
// // //             Register new customers and their products
// // //           </p>
// // //         </div>

// // //         {/* Forms Grid */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // //           {/* ================= CUSTOMER FORM ================= */}
// // //            <div className="max-w-2xl mx-auto p-4">
// // //       <h2 className="text-2xl font-bold mb-6">Customer Registration</h2>
      
// // //       <form onSubmit={submitCust} className="p-6 space-y-4 bg-white rounded-lg shadow">
// // //         {/* Customer Information Section */}
// // //         <div className="border-b pb-4 mb-4">
// // //           <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
          
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Full Name <span className="text-red-500">*</span>
// // //             </label>
// // //             <input
// // //               type="text"
// // //               name="name"
// // //               placeholder="Enter full name"
// // //               value={cust.name}
// // //               onChange={onCustChange}
// // //               required
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //             />
// // //           </div>

// // //           <div className="mt-4">
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Email Address <span className="text-red-500">*</span>
// // //             </label>
// // //             <input
// // //               type="email"
// // //               name="email"
// // //               placeholder="Enter email address"
// // //               value={cust.email}
// // //               onChange={onCustChange}
// // //               required
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //             />
// // //           </div>

// // //           <div className="mt-4">
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Phone Number <span className="text-red-500">*</span>
// // //             </label>
// // //             <input
// // //               type="tel"
// // //               name="phone"
// // //               placeholder="Enter phone number"
// // //               value={cust.phone}
// // //               onChange={onCustChange}
// // //               required
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //             />
// // //           </div>

// // //           <div className="mt-4">
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Address <span className="text-red-500">*</span>
// // //             </label>
// // //             <textarea
// // //               name="address"
// // //               placeholder="Enter complete address"
// // //               value={cust.address}
// // //               onChange={onCustChange}
// // //               required
// // //               rows="3"
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Product Information Section */}
// // //         <div className="border-b pb-4 mb-4">
// // //           <h3 className="text-lg font-semibold mb-4">Product Information</h3>
          
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Product Name
// // //             </label>
// // //             <input
// // //               type="text"
// // //               name="proName"
// // //               placeholder="Enter product name"
// // //               value={cust.proName}
// // //               onChange={onCustChange}
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //             />
// // //           </div>

// // //           <div className="mt-4">
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Product Category
// // //             </label>
// // //             <input
// // //               type="text"
// // //               name="proCatogory"
// // //               placeholder="Enter product category"
// // //               value={cust.proCatogory}
// // //               onChange={onCustChange}
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //             />
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Product Serial Number
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 name="proSrNo"
// // //                 placeholder="Enter serial number"
// // //                 value={cust.proSrNo}
// // //                 onChange={onCustChange}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Product Model Number
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 name="proModNum"
// // //                 placeholder="Enter model number"
// // //                 value={cust.proModNum}
// // //                 onChange={onCustChange}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <button
// // //           type="submit"
// // //           disabled={loading}
// // //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// // //         >
// // //           {loading ? (
// // //             <>
// // //               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
// // //                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //               </svg>
// // //               Processing...
// // //             </>
// // //           ) : (
// // //             "Register Customer"
// // //           )}
// // //         </button>
// // //       </form>
// // //     </div>

// // //           {/* ================= PRODUCT FORM ================= */}
// // //          <form onSubmit={submitProd} className="p-6 space-y-4">
// // //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
// // //     {/* Product Name */}
// // //     <div>
// // //       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //         Product Name <span className="text-red-500">*</span>
// // //       </label>
// // //       <input
// // //         type="text"
// // //         name="proName"
// // //         value={prod.proName}
// // //         onChange={onProdChange}
// // //         required
// // //         className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// // //       />
// // //     </div>

// // //     {/* Category */}
// // //     <div>
// // //       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //         Category <span className="text-red-500">*</span>
// // //       </label>
// // //       <input
// // //         type="text"
// // //         name="proCatogory"
// // //         value={prod.proCatogory}
// // //         onChange={onProdChange}
// // //         required
// // //         className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// // //       />
// // //     </div>

// // //     {/* Brand */}
// // //     <div>
// // //       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //         Brand <span className="text-red-500">*</span>
// // //       </label>
// // //       <input
// // //         type="text"
// // //         name="brandName"
// // //         value={prod.brandName}
// // //         onChange={onProdChange}
// // //         required
// // //         className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// // //       />
// // //     </div>

// // //     {/* Model Number */}
// // //     <div>
// // //       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //         Model Number <span className="text-red-500">*</span>
// // //       </label>
// // //       <input
// // //         type="text"
// // //         name="proModNum"
// // //         value={prod.proModNum}
// // //         onChange={onProdChange}
// // //         required
// // //         className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// // //       />
// // //     </div>
// // //   </div>

// // //   {/* Serial Number */}
// // //   <div>
// // //     <label className="block text-sm font-medium text-gray-700 mb-1">
// // //       Serial Number <span className="text-red-500">*</span>
// // //     </label>
// // //     <input
// // //       type="text"
// // //       name="proSrNo"
// // //       value={prod.proSrNo}
// // //       onChange={onProdChange}
// // //       required
// // //       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// // //     />
// // //   </div>

// // //   {/* Purchase + Invoice */}
// // //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
// // //     <div>
// // //       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //         Purchase Date <span className="text-red-500">*</span>
// // //       </label>
// // //       <input
// // //         type="date"
// // //         name="purDate"
// // //         value={prod.purDate}
// // //         onChange={onProdChange}
// // //         required
// // //         className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// // //       />
// // //     </div>

// // //     <div>
// // //       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //         Invoice Number <span className="text-red-500">*</span>
// // //       </label>
// // //       <input
// // //         type="text"
// // //         name="invoiceNum"
// // //         value={prod.invoiceNum}
// // //         onChange={onProdChange}
// // //         required
// // //         className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// // //       />
// // //     </div>
// // //   </div>

// // //   {/* Warranty Dates */}
// // //   {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //     <div>
// // //       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //         Warranty Start Date <span className="text-red-500">*</span>
// // //       </label>
// // //       <input
// // //         type="date"
// // //         name="warrStartDate"
// // //         value={prod.warrStartDate}
// // //         onChange={onProdChange}
// // //         required
// // //         className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// // //       />
// // //     </div>

// // //     <div>
// // //       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //         Warranty End Date <span className="text-red-500">*</span>
// // //       </label>
// // //       <input
// // //         type="date"
// // //         name="warrEndDate"
// // //         value={prod.warrEndDate}
// // //         onChange={onProdChange}
// // //         required
// // //         className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// // //       />
// // //     </div>
// // //   </div> */}

// // //   <button
// // //     type="submit"
// // //     disabled={loading}
// // //     className="w-full bg-green-600 text-white py-2 rounded-lg"
// // //   >
// // //     {loading ? "Processing..." : "Register Product"}
// // //   </button>
// // // </form>

// // //         </div>

// // //         {/* Error Message */}
// // //         {error && (
// // //           <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
// // //             <p className="text-sm text-red-600">{error}</p>
// // //           </div>
// // //         )}

// // //         {/* Toast Notification */}
// // //         {toast && (
// // //           <div className="fixed bottom-4 right-4 animate-slide-up">
// // //             <div
// // //               className={`px-6 py-3 rounded-lg shadow-lg border ${
// // //                 toast.type === "error"
// // //                   ? "bg-red-50 border-red-200 text-red-700"
// // //                   : "bg-green-50 border-green-200 text-green-700"
// // //               }`}
// // //             >
// // //               <div className="flex items-center gap-2">
// // //                 {toast.type === "error" ? (
// // //                   <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                   </svg>
// // //                 ) : (
// // //                   <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                   </svg>
// // //                 )}
// // //                 <span className="text-sm font-medium">{toast.message}</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Add animation keyframes */}
// // //       <style>{`
// // //         @keyframes slide-up {
// // //           from {
// // //             opacity: 0;
// // //             transform: translateY(20px);
// // //           }
// // //           to {
// // //             opacity: 1;
// // //             transform: translateY(0);
// // //           }
// // //         }
// // //         .animate-slide-up {
// // //           animation: slide-up 0.3s ease-out;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // } 


// import { useState } from "react";
// import React from 'react';
// import axiosInstance from "../../Utils/axiosIntance"; // Import your axios instance

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
//     flex-direction: column;
//   }

//   /* ── NAV ── */
//   .cc-nav {
//     background: var(--surface);
//     border-bottom: 1px solid var(--border);
//     padding: 0 32px;
//     height: 60px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     position: sticky;
//     top: 0;
//     z-index: 50;
//     box-shadow: var(--shadow-sm);
//   }
//   .cc-nav-brand { display: flex; align-items: center; gap: 10px; }
//   .cc-nav-logo {
//     width: 34px; height: 34px;
//     background: linear-gradient(135deg, #1a56db 0%, #0ea47a 100%);
//     border-radius: 9px;
//     display: flex; align-items: center; justify-content: center;
//     color: white; font-size: 15px; font-weight: 800;
//     letter-spacing: -1px; flex-shrink: 0;
//   }
//   .cc-nav-name  { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.2px; }
//   .cc-nav-sub   { font-size: 11px; color: var(--muted); font-weight: 500; margin-top: 1px; }
//   .cc-nav-pill  {
//     background: var(--accent-lt); color: var(--accent);
//     font-size: 11.5px; font-weight: 600; padding: 4px 12px;
//     border-radius: 100px; letter-spacing: 0.1px;
//   }

//   /* ── LAYOUT ── */
//   .cc-main { display: flex; flex: 1; }

//   /* ── SIDEBAR ── */
//   .cc-sidebar {
//     width: 230px;
//     background: var(--surface);
//     border-right: 1px solid var(--border);
//     padding: 24px 14px;
//     display: flex; flex-direction: column; gap: 3px;
//     flex-shrink: 0;
//   }
//   .cc-sb-label {
//     font-size: 10.5px; font-weight: 700;
//     text-transform: uppercase; letter-spacing: 0.08em;
//     color: var(--subtle); padding: 0 10px;
//     margin-bottom: 4px; margin-top: 10px;
//   }
//   .cc-sb-label:first-child { margin-top: 0; }
//   .cc-nav-item {
//     display: flex; align-items: center; gap: 10px;
//     padding: 8px 10px; border-radius: var(--r-sm);
//     font-size: 13.5px; font-weight: 500; color: var(--muted);
//     cursor: pointer; transition: all .15s ease;
//     border: none; background: transparent; width: 100%; text-align: left;
//   }
//   .nav-ico {
//     width: 28px; height: 28px; border-radius: 7px;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 13px; background: var(--surface2); flex-shrink: 0;
//     transition: all .15s ease;
//   }
//   .cc-nav-item:hover { background: var(--surface2); color: var(--text); }
//   .cc-nav-item.is-blue  { background: var(--accent-lt); color: var(--accent); font-weight: 600; }
//   .cc-nav-item.is-blue .nav-ico  { background: var(--accent); color: white; }
//   .cc-nav-item.is-green { background: var(--accent2-lt); color: var(--accent2); font-weight: 600; }
//   .cc-nav-item.is-green .nav-ico { background: var(--accent2); color: white; }

//   /* ── CONTENT ── */
//   .cc-content { flex: 1; padding: 36px 40px; overflow-y: auto; }

//   /* ── PAGE HEADER ── */
//   .cc-breadcrumb {
//     display: flex; align-items: center; gap: 6px;
//     font-size: 12.5px; color: var(--muted); margin-bottom: 10px;
//   }
//   .cc-breadcrumb span { color: var(--subtle); }
//   .cc-page-title {
//     font-family: var(--serif); font-size: 30px; font-style: italic;
//     color: var(--text); letter-spacing: -0.5px; line-height: 1.1; margin-bottom: 4px;
//   }
//   .cc-page-desc { font-size: 13.5px; color: var(--muted); margin-bottom: 28px; }

//   /* ── STEP BAR ── */
//   .cc-steps {
//     display: flex; align-items: center;
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: var(--r-lg);
//     padding: 16px 20px;
//     box-shadow: var(--shadow-sm);
//     margin-bottom: 28px;
//     gap: 0;
//   }
//   .cc-step {
//     display: flex; align-items: center; gap: 10px;
//     flex: 1; cursor: pointer; padding: 4px 8px;
//     border-radius: var(--r-sm); transition: opacity .2s;
//   }
//   .cc-step:hover { opacity: 0.75; }
//   .step-num {
//     width: 32px; height: 32px; border-radius: 50%;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 13px; font-weight: 700; flex-shrink: 0;
//     border: 2px solid var(--border2); color: var(--subtle);
//     background: var(--surface2); transition: all .2s;
//   }
//   .cc-step.s-active .step-num {
//     background: var(--accent); border-color: var(--accent); color: white;
//     box-shadow: 0 0 0 4px var(--accent-lt);
//   }
//   .cc-step.s-done .step-num {
//     background: var(--accent2); border-color: var(--accent2); color: white;
//   }
//   .step-lbl { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--subtle); }
//   .step-ttl { font-size: 13.5px; font-weight: 600; color: var(--muted); margin-top: 1px; }
//   .cc-step.s-active .step-lbl { color: var(--accent); }
//   .cc-step.s-active .step-ttl { color: var(--text); }
//   .cc-step.s-done .step-lbl   { color: var(--accent2); }
//   .step-div { width: 40px; height: 1px; background: var(--border); flex-shrink: 0; margin: 0 4px; }

//   /* ── CARD ── */
//   .cc-card {
//     background: var(--surface); border: 1px solid var(--border);
//     border-radius: var(--r-xl); overflow: hidden;
//     box-shadow: var(--shadow-md);
//     animation: fadeUp .3s cubic-bezier(.22,1,.36,1) both;
//   }
//   @keyframes fadeUp {
//     from { opacity:0; transform: translateY(14px); }
//     to   { opacity:1; transform: translateY(0); }
//   }
//   .cc-card-top {
//     padding: 22px 28px 18px; border-bottom: 1px solid var(--border);
//     display: flex; align-items: flex-start; gap: 14px;
//     background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%);
//   }
//   .cti { width: 46px; height: 46px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
//   .cti.blue  { background: var(--accent-lt); }
//   .cti.green { background: var(--accent2-lt); }
//   .cth { font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.2px; }
//   .ctp { font-size: 13px; color: var(--muted); margin-top: 3px; line-height: 1.5; }

//   /* ── FORM ── */
//   .cc-form-body { padding: 26px 28px; display: flex; flex-direction: column; gap: 22px; }
//   .cc-sec-head {
//     display: flex; align-items: center; gap: 11px;
//     padding-bottom: 13px; border-bottom: 1px solid var(--border);
//   }
//   .sec-ico { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
//   .sec-ico.blue  { background: var(--accent-lt); }
//   .sec-ico.green { background: var(--accent2-lt); }
//   .sec-ttl { font-size: 13px; font-weight: 700; color: var(--text); }
//   .sec-sub { font-size: 12px; color: var(--muted); margin-top: 1px; }

//   .cc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px; }
//   .cc-grid.g3 { grid-template-columns: 1fr 1fr 1fr; }
//   .full { grid-column: 1 / -1; }

//   .cc-field { display: flex; flex-direction: column; gap: 5px; }
//   .cc-label { font-size: 12.5px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 3px; }
//   .req { color: var(--danger); font-size: 13px; }
//   .cc-hint { font-size: 11.5px; color: var(--subtle); margin-top: 2px; }

//   .cc-input, .cc-select {
//     width: 100%; height: 40px; padding: 0 13px;
//     border: 1.5px solid var(--border2); border-radius: var(--r-sm);
//     background: var(--surface);
//     font-family: var(--font); font-size: 13.5px; font-weight: 500; color: var(--text);
//     transition: border-color .15s, box-shadow .15s, background .15s;
//     outline: none; -webkit-appearance: none; appearance: none;
//   }
//   .cc-input::placeholder { color: var(--subtle); font-weight: 400; }
//   .cc-input:hover, .cc-select:hover { border-color: #b0bac7; }
//   .cc-input:focus, .cc-select:focus {
//     border-color: var(--accent);
//     box-shadow: 0 0 0 3px rgba(26,86,219,.12);
//     background: #fafcff;
//   }
//   .cc-select {
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2398a2b3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
//     background-repeat: no-repeat; background-position: right 12px center;
//     padding-right: 36px; cursor: pointer;
//   }
//   .cc-select option { background: white; color: var(--text); }

//   .cc-divider { height: 1px; background: var(--border); }

//   /* ── CREDENTIALS MODAL ── */
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
//     padding: 32px;
//     max-width: 400px;
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
//     width: 64px;
//     height: 64px;
//     background: var(--accent-lt);
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto 20px;
//     font-size: 32px;
//     color: var(--accent);
//   }
//   .modal-title {
//     font-size: 20px;
//     font-weight: 700;
//     color: var(--text);
//     text-align: center;
//     margin-bottom: 8px;
//   }
//   .modal-subtitle {
//     font-size: 14px;
//     color: var(--muted);
//     text-align: center;
//     margin-bottom: 24px;
//   }
//   .credential-item {
//     background: var(--surface2);
//     border: 1px solid var(--border);
//     border-radius: var(--r-md);
//     padding: 12px 16px;
//     margin-bottom: 12px;
//   }
//   .cred-label {
//     font-size: 11px;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     color: var(--subtle);
//     margin-bottom: 4px;
//   }
//   .cred-value {
//     font-size: 16px;
//     font-weight: 600;
//     color: var(--text);
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }
//   .copy-btn {
//     background: none;
//     border: none;
//     color: var(--accent);
//     cursor: pointer;
//     padding: 4px 8px;
//     border-radius: var(--r-sm);
//     font-size: 12px;
//     transition: all 0.15s;
//   }
//   .copy-btn:hover {
//     background: var(--accent-lt);
//   }
//   .modal-note {
//     font-size: 12px;
//     color: var(--danger);
//     text-align: center;
//     margin: 16px 0;
//     padding: 8px;
//     background: #fef3f2;
//     border-radius: var(--r-sm);
//   }
//   .modal-actions {
//     display: flex;
//     gap: 12px;
//     margin-top: 20px;
//   }
//   .modal-actions button {
//     flex: 1;
//   }

//   /* ── FOOTER ── */
//   .cc-form-footer {
//     padding: 18px 28px;
//     background: var(--surface2); border-top: 1px solid var(--border);
//     display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
//   }
//   .footer-note { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 4px; }
//   .footer-acts { display: flex; gap: 9px; align-items: center; }

//   .btn {
//     display: inline-flex; align-items: center; gap: 6px;
//     height: 38px; padding: 0 18px; border-radius: var(--r-sm);
//     font-family: var(--font); font-size: 13.5px; font-weight: 600;
//     cursor: pointer; border: none; transition: all .18s ease; letter-spacing: -0.1px;
//   }
//   .btn-ghost {
//     background: transparent; color: var(--muted);
//     border: 1.5px solid var(--border2);
//   }
//   .btn-ghost:hover { background: var(--surface2); color: var(--text); border-color: #b0bac7; }
//   .btn-blue {
//     background: var(--accent); color: white;
//     box-shadow: 0 1px 3px rgba(26,86,219,.3), 0 4px 12px rgba(26,86,219,.18);
//   }
//   .btn-blue:hover { background: #1447c0; box-shadow: 0 2px 6px rgba(26,86,219,.35), 0 8px 20px rgba(26,86,219,.22); transform: translateY(-1px); }
//   .btn-blue:active { transform: translateY(0); }
//   .btn-green {
//     background: var(--accent2); color: white;
//     box-shadow: 0 1px 3px rgba(14,164,122,.3), 0 4px 12px rgba(14,164,122,.18);
//   }
//   .btn-green:hover { background: #0b8c67; transform: translateY(-1px); box-shadow: 0 2px 6px rgba(14,164,122,.35), 0 8px 20px rgba(14,164,122,.22); }
//   .btn-green:active { transform: translateY(0); }
//   .btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none !important; }

//   /* ── TOAST ── */
//   .cc-toast {
//     position: fixed; bottom: 24px; right: 24px;
//     background: white; border: 1px solid var(--border);
//     border-radius: var(--r-lg); padding: 14px 16px;
//     box-shadow: var(--shadow-lg);
//     display: flex; align-items: center; gap: 12px;
//     animation: toastIn .35s cubic-bezier(.22,1,.36,1) both;
//     z-index: 200; min-width: 270px;
//   }
//   @keyframes toastIn {
//     from { opacity:0; transform: translateY(16px) scale(.96); }
//     to   { opacity:1; transform: translateY(0) scale(1); }
//   }
//   .toast-dot {
//     width: 36px; height: 36px; border-radius: 50%;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 16px; flex-shrink: 0;
//   }
//   .toast-dot.blue  { background: var(--accent-lt); color: var(--accent); }
//   .toast-dot.green { background: var(--accent2-lt); color: var(--accent2); }
//   .toast-ttl { font-size: 14px; font-weight: 700; color: var(--text); }
//   .toast-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
//   .toast-x {
//     margin-left: auto; background: none; border: none; cursor: pointer;
//     color: var(--subtle); font-size: 15px; padding: 4px; border-radius: 5px;
//     transition: background .15s; line-height: 1;
//   }
//   .toast-x:hover { background: var(--surface2); color: var(--text); }

//   @media (max-width: 700px) {
//     .cc-sidebar { display: none; }
//     .cc-content { padding: 20px 16px; }
//     .cc-grid, .cc-grid.g3 { grid-template-columns: 1fr; }
//   }
// `;

// const CATS     = ["Television","Refrigerator","Washing Machine","Air Conditioner","Microwave","Laptop","Mobile Phone","Camera","Printer","Other Electronics"];
// const WARRANTY = ["3 Months","6 Months","1 Year","2 Years","3 Years","5 Years"];

// const EMPTY_CUST = { 
//   customerName: "", 
//   email: "", 
//   mobileNum: "",
//   proName: "",
//   proCatogory: "",
//   proSrNo: "",
//   proModNum: ""
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
//   const [view, setView] = useState("customer");
//   const [toast, setToast] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [cust, setCust] = useState(EMPTY_CUST);
//   const [prod, setProd] = useState(EMPTY_PROD);
//   const [showCredentials, setShowCredentials] = useState(false);
//   const [userCredentials, setUserCredentials] = useState({ username: "", password: "" });

//   const show = (type) => { 
//     setToast(type); 
//     setTimeout(() => setToast(null), 3500); 
//   };

//   const onC = (e) => setCust({ ...cust, [e.target.name]: e.target.value });
//   const onP = (e) => setProd({ ...prod, [e.target.name]: e.target.value });

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     show("copy");
//   };

//   const submitCust = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await axiosInstance.post("/customerDetails/newcustomer", cust);
      
//       // Check if response contains username and password
//       if (response.data.username && response.data.password) {
//         setUserCredentials({
//           username: response.data.username,
//           password: response.data.password
//         });
//         setShowCredentials(true);
//       }
      
//       show("customer");
//       setCust(EMPTY_CUST);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Customer registration failed";
//       setError(msg);
//       show("error");
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const submitProd = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     try {
//       await axiosInstance.post("/auth/register", prod);
//       show("product");
//       setProd(EMPTY_PROD);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Product registration failed";
//       setError(msg);
//       show("error");
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const SIDEBAR_ITEMS = [
//     { id: "customer", icon: "👤", label: "Customer", cls: "is-blue" },
//     { id: "product", icon: "📦", label: "Product", cls: "is-green" },
//   ];

//   return (
//     <>
//       <style>{STYLES}</style>
//       <div className="cc-wrap">

//         {/* NAV */}
//         <nav className="cc-nav">
//           <div className="cc-nav-brand">
//             <div className="cc-nav-logo">CC</div>
//             <div>
//               <div className="cc-nav-name">ServiceDesk Pro</div>
//               <div className="cc-nav-sub">Customer Care Management</div>
//             </div>
//           </div>
//           <div className="cc-nav-pill">● Live</div>
//         </nav>

//         <div className="cc-main">

//           {/* SIDEBAR */}
//           <aside className="cc-sidebar">
//             <div className="cc-sb-label">Registrations</div>
//             {SIDEBAR_ITEMS.map(it => (
//               <button
//                 key={it.id}
//                 className={`cc-nav-item ${view === it.id ? it.cls : ""}`}
//                 onClick={() => setView(it.id)}
//               >
//                 <div className="nav-ico">{it.icon}</div>
//                 {it.label}
//               </button>
//             ))}

//             <div className="cc-sb-label">Management</div>
//             {[["🔍", "Search"], ["📋", "All Customers"], ["🛠", "Tickets"], ["📊", "Reports"]].map(([ico, lbl]) => (
//               <button key={lbl} className="cc-nav-item">
//                 <div className="nav-ico">{ico}</div>{lbl}
//               </button>
//             ))}
//           </aside>

//           {/* CONTENT */}
//           <main className="cc-content">
//             {/* Page header */}
//             <div className="cc-breadcrumb">
//               Home <span>›</span> Registrations <span>›</span>
//               <strong style={{ color: "var(--text)" }}>
//                 {view === "customer" ? "Customer" : "Product"}
//               </strong>
//             </div>
//             <div className="cc-page-title">
//               {view === "customer" ? "Customer Registration" : "Product Registration"}
//             </div>
//             <div className="cc-page-desc">
//               {view === "customer"
//                 ? "Add a new customer to the support system for warranty and service access."
//                 : "Register a purchased product to activate warranty coverage and service tracking."}
//             </div>

//             {/* Step bar */}
//             <div className="cc-steps">
//               <div className={`cc-step ${view === "customer" ? "s-active" : "s-done"}`} onClick={() => setView("customer")}>
//                 <div className="step-num">{view === "product" ? "✓" : "1"}</div>
//                 <div><div className="step-lbl">Step 1</div><div className="step-ttl">Customer Info</div></div>
//               </div>
//               <div className="step-div" />
//               <div className={`cc-step ${view === "product" ? "s-active" : ""}`} onClick={() => setView("product")}>
//                 <div className="step-num">2</div>
//                 <div><div className="step-lbl">Step 2</div><div className="step-ttl">Product Details</div></div>
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div style={{
//                 background: "#fef3f2",
//                 border: "1px solid #fecdca",
//                 borderRadius: "var(--r-md)",
//                 padding: "12px 16px",
//                 marginBottom: "20px",
//                 color: "var(--danger)",
//                 fontSize: "13px"
//               }}>
//                 {error}
//               </div>
//             )}

//             {/* ── CUSTOMER FORM ── */}
//             {view === "customer" && (
//               <div className="cc-card" key="cust">
//                 <div className="cc-card-top">
//                   <div className="cti blue">👤</div>
//                   <div>
//                     <div className="cth">New Customer</div>
//                     <div className="ctp">Register a customer to grant access to warranty claims and support history.</div>
//                   </div>
//                 </div>
//                 <form onSubmit={submitCust}>
//                   <div className="cc-form-body">
//                     {/* Customer Information */}
//                     <div>
//                       <div className="cc-sec-head">
//                         <div className="sec-ico blue">🪪</div>
//                         <div>
//                           <div className="sec-ttl">Personal Information</div>
//                           <div className="sec-sub">Basic contact details of the customer</div>
//                         </div>
//                       </div>
//                       <div className="cc-grid">
//                         <div className="cc-field full">
//                           <label className="cc-label">Full Name <span className="req">*</span></label>
//                           <input 
//                             className="cc-input" 
//                             name="customerName" 
//                             value={cust.customerName}
//                             onChange={onC} 
//                             placeholder="e.g. Rahul Sharma" 
//                             required 
//                           />
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Email Address <span className="req">*</span></label>
//                           <input 
//                             className="cc-input" 
//                             type="email" 
//                             name="email" 
//                             value={cust.email}
//                             onChange={onC} 
//                             placeholder="rahul@example.com" 
//                             required 
//                           />
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Mobile Number <span className="req">*</span></label>
//                           <input 
//                             className="cc-input" 
//                             type="tel" 
//                             name="mobileNum" 
//                             value={cust.mobileNum}
//                             onChange={onC} 
//                             placeholder="+91 98765 43210" 
//                             required 
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Product Information */}
//                     <div>
//                       <div className="cc-sec-head">
//                         <div className="sec-ico blue">📦</div>
//                         <div>
//                           <div className="sec-ttl">Product Information</div>
//                           <div className="sec-sub">Product details to link with customer</div>
//                         </div>
//                       </div>
//                       <div className="cc-grid">
//                         <div className="cc-field">
//                           <label className="cc-label">Product Name</label>
//                           <input 
//                             className="cc-input" 
//                             name="proName" 
//                             value={cust.proName}
//                             onChange={onC} 
//                             placeholder="e.g. Samsung Smart TV" 
//                           />
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Product Category</label>
//                           <select 
//                             className="cc-select" 
//                             name="proCatogory" 
//                             value={cust.proCatogory} 
//                             onChange={onC}
//                           >
//                             <option value="">Select category</option>
//                             {CATS.map(c => <option key={c}>{c}</option>)}
//                           </select>
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Serial Number</label>
//                           <input 
//                             className="cc-input" 
//                             name="proSrNo" 
//                             value={cust.proSrNo}
//                             onChange={onC} 
//                             placeholder="e.g. SN2024XXXXXX" 
//                           />
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Model Number</label>
//                           <input 
//                             className="cc-input" 
//                             name="proModNum" 
//                             value={cust.proModNum}
//                             onChange={onC} 
//                             placeholder="e.g. UA55AU8000" 
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="cc-form-footer">
//                     <div className="footer-note"><span style={{ color: "var(--danger)" }}>*</span> Required fields</div>
//                     <div className="footer-acts">
//                       <button type="button" className="btn btn-ghost" onClick={() => setCust(EMPTY_CUST)}>Clear</button>
//                       <button type="submit" className="btn btn-blue" disabled={loading}>
//                         {loading ? "Saving…" : <>Register Customer <span>→</span></>}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {/* ── PRODUCT FORM ── */}
//             {view === "product" && (
//               <div className="cc-card" key="prod">
//                 <div className="cc-card-top">
//                   <div className="cti green">📦</div>
//                   <div>
//                     <div className="cth">Product Registration</div>
//                     <div className="ctp">Register a purchased product to activate warranty and service request tracking.</div>
//                   </div>
//                 </div>
//                 <form onSubmit={submitProd}>
//                   <div className="cc-form-body">
//                     {/* Product details */}
//                     <div>
//                       <div className="cc-sec-head">
//                         <div className="sec-ico green">🔧</div>
//                         <div>
//                           <div className="sec-ttl">Product Details</div>
//                           <div className="sec-sub">Identify the product being registered</div>
//                         </div>
//                       </div>
//                       <div className="cc-grid">
//                         <div className="cc-field">
//                           <label className="cc-label">Product Name <span className="req">*</span></label>
//                           <input 
//                             className="cc-input" 
//                             name="proName" 
//                             value={prod.proName}
//                             onChange={onP} 
//                             placeholder='e.g. 55" Smart TV' 
//                             required 
//                           />
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Product Category <span className="req">*</span></label>
//                           <select 
//                             className="cc-select" 
//                             name="proCatogory" 
//                             value={prod.proCatogory} 
//                             onChange={onP} 
//                             required
//                           >
//                             <option value="">Select category</option>
//                             {CATS.map(c => <option key={c}>{c}</option>)}
//                           </select>
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Brand Name <span className="req">*</span></label>
//                           <input 
//                             className="cc-input" 
//                             name="brandName" 
//                             value={prod.brandName}
//                             onChange={onP} 
//                             placeholder="e.g. Samsung" 
//                             required 
//                           />
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Model Number <span className="req">*</span></label>
//                           <input 
//                             className="cc-input" 
//                             name="proModNum" 
//                             value={prod.proModNum}
//                             onChange={onP} 
//                             placeholder="e.g. UA55AU8000" 
//                             required 
//                           />
//                         </div>
//                         <div className="cc-field full">
//                           <label className="cc-label">Serial Number <span className="req">*</span></label>
//                           <input 
//                             className="cc-input" 
//                             name="proSrNo" 
//                             value={prod.proSrNo}
//                             onChange={onP} 
//                             placeholder="e.g. SN2024XXXXXXXX" 
//                             required 
//                           />
//                           <span className="cc-hint">Found on the back of the product or inside the packaging</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="cc-divider" />

//                     {/* Purchase Information */}
//                     <div>
//                       <div className="cc-sec-head">
//                         <div className="sec-ico green">🧾</div>
//                         <div>
//                           <div className="sec-ttl">Purchase Information</div>
//                           <div className="sec-sub">Invoice and purchase details</div>
//                         </div>
//                       </div>
//                       <div className="cc-grid g3">
//                         <div className="cc-field">
//                           <label className="cc-label">Purchase Date <span className="req">*</span></label>
//                           <input 
//                             className="cc-input" 
//                             type="date" 
//                             name="purDate" 
//                             value={prod.purDate}
//                             onChange={onP} 
//                             required 
//                           />
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Invoice Number <span className="req">*</span></label>
//                           <input 
//                             className="cc-input" 
//                             name="invoiceNum" 
//                             value={prod.invoiceNum}
//                             onChange={onP} 
//                             placeholder="INV-2024-001" 
//                             required 
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cc-form-footer">
//                     <div className="footer-note"><span style={{ color: "var(--danger)" }}>*</span> All fields required</div>
//                     <div className="footer-acts">
//                       <button type="button" className="btn btn-ghost" onClick={() => setProd(EMPTY_PROD)}>Clear</button>
//                       <button type="submit" className="btn btn-green" disabled={loading}>
//                         {loading ? "Saving…" : <>Register Product <span>→</span></>}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>

//       {/* Credentials Modal */}
//       {showCredentials && (
//         <div className="cc-modal-overlay" onClick={() => setShowCredentials(false)}>
//           <div className="cc-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon">🔐</div>
//             <div className="modal-title">Registration Successful!</div>
//             <div className="modal-subtitle">Auto-generated login credentials</div>
            
//             <div className="credential-item">
//               <div className="cred-label">Username</div>
//               <div className="cred-value">
//                 {userCredentials.username}
//                 <button 
//                   className="copy-btn"
//                   onClick={() => copyToClipboard(userCredentials.username)}
//                 >
//                   Copy
//                 </button>
//               </div>
//             </div>
            
//             <div className="credential-item">
//               <div className="cred-label">Password</div>
//               <div className="cred-value">
//                 {userCredentials.password}
//                 <button 
//                   className="copy-btn"
//                   onClick={() => copyToClipboard(userCredentials.password)}
//                 >
//                   Copy
//                 </button>
//               </div>
//             </div>
            
//             <div className="modal-note">
//               ⚠️ Please save these credentials. They won't be shown again.
//             </div>
            
//             <div className="modal-actions">
//               <button 
//                 className="btn btn-blue"
//                 onClick={() => setShowCredentials(false)}
//                 style={{ width: "100%" }}
//               >
//                 I've Saved Them
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* TOAST */}
//       {toast && (
//         <div className="cc-toast">
//           <div className={`toast-dot ${
//             toast === "customer" ? "blue" : 
//             toast === "product" ? "green" : 
//             toast === "copy" ? "blue" : 
//             toast === "error" ? "red" : "blue"
//           }`}>
//             {toast === "error" ? "✕" : "✓"}
//           </div>
//           <div>
//             <div className="toast-ttl">
//               {toast === "customer" && "Customer Registered!"}
//               {toast === "product" && "Product Registered!"}
//               {toast === "copy" && "Copied to Clipboard!"}
//               {toast === "error" && "Registration Failed"}
//             </div>
//             <div className="toast-sub">
//               {toast === "customer" && "Record saved successfully"}
//               {toast === "product" && "Product added successfully"}
//               {toast === "copy" && "Credentials copied"}
//               {toast === "error" && "Please try again"}
//             </div>
//           </div>
//           <button className="toast-x" onClick={() => setToast(null)}>✕</button>
//         </div>
//       )}
//     </>
//   );
// }

import { useState } from "react";
import React from 'react';
import axiosInstance from "../../Utils/axiosIntance";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #f0f2f5;
    --surface:   #ffffff;
    --surface2:  #f7f8fa;
    --border:    #e4e7ec;
    --border2:   #d0d5dd;
    --text:      #101828;
    --muted:     #667085;
    --subtle:    #98a2b3;
    --accent:    #1a56db;
    --accent-lt: #ebf0ff;
    --accent2:   #0ea47a;
    --accent2-lt:#e6f7f2;
    --danger:    #d92d20;
    --warning:   #f79009;
    --shadow-sm: 0 1px 2px rgba(16,24,40,.05);
    --shadow-md: 0 4px 16px rgba(16,24,40,.08);
    --shadow-lg: 0 12px 40px rgba(16,24,40,.12);
    --r-sm: 8px;
    --r-md: 12px;
    --r-lg: 18px;
    --r-xl: 24px;
    --font: 'Plus Jakarta Sans', sans-serif;
    --serif: 'Instrument Serif', serif;
  }

  .cc-wrap {
    min-height: 100vh;
    background: var(--bg);
    font-family: var(--font);
    color: var(--text);
    display: flex;
    flex-direction: column;
  }

  /* ── NAV ── */
  .cc-nav {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: var(--shadow-sm);
  }
  .cc-nav-brand { display: flex; align-items: center; gap: 10px; }
  .cc-nav-logo {
    width: 34px; height: 34px;
    background: linear-gradient(135deg, #1a56db 0%, #0ea47a 100%);
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    color: white; font-size: 15px; font-weight: 800;
    letter-spacing: -1px; flex-shrink: 0;
  }
  .cc-nav-name  { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.2px; }
  .cc-nav-sub   { font-size: 11px; color: var(--muted); font-weight: 500; margin-top: 1px; }
  .cc-nav-pill  {
    background: var(--accent-lt); color: var(--accent);
    font-size: 11.5px; font-weight: 600; padding: 4px 12px;
    border-radius: 100px; letter-spacing: 0.1px;
  }

  /* ── LAYOUT ── */
  .cc-main { display: flex; flex: 1; }

  /* ── SIDEBAR ── */
  .cc-sidebar {
    width: 230px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 24px 14px;
    display: flex; flex-direction: column; gap: 3px;
    flex-shrink: 0;
  }
  .cc-sb-label {
    font-size: 10.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--subtle); padding: 0 10px;
    margin-bottom: 4px; margin-top: 10px;
  }
  .cc-sb-label:first-child { margin-top: 0; }
  .cc-nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: var(--r-sm);
    font-size: 13.5px; font-weight: 500; color: var(--muted);
    cursor: pointer; transition: all .15s ease;
    border: none; background: transparent; width: 100%; text-align: left;
  }
  .nav-ico {
    width: 28px; height: 28px; border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; background: var(--surface2); flex-shrink: 0;
    transition: all .15s ease;
  }
  .cc-nav-item:hover { background: var(--surface2); color: var(--text); }
  .cc-nav-item.is-blue  { background: var(--accent-lt); color: var(--accent); font-weight: 600; }
  .cc-nav-item.is-blue .nav-ico  { background: var(--accent); color: white; }
  .cc-nav-item.is-green { background: var(--accent2-lt); color: var(--accent2); font-weight: 600; }
  .cc-nav-item.is-green .nav-ico { background: var(--accent2); color: white; }

  /* ── CONTENT ── */
  .cc-content { flex: 1; padding: 36px 40px; overflow-y: auto; }

  /* ── PAGE HEADER ── */
  .cc-breadcrumb {
    display: flex; align-items: center; gap: 6px;
    font-size: 12.5px; color: var(--muted); margin-bottom: 10px;
  }
  .cc-breadcrumb span { color: var(--subtle); }
  .cc-page-title {
    font-family: var(--serif); font-size: 30px; font-style: italic;
    color: var(--text); letter-spacing: -0.5px; line-height: 1.1; margin-bottom: 4px;
  }
  .cc-page-desc { font-size: 13.5px; color: var(--muted); margin-bottom: 28px; }

  /* ── STEP BAR ── */
  .cc-steps {
    display: flex; align-items: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    padding: 16px 20px;
    box-shadow: var(--shadow-sm);
    margin-bottom: 28px;
    gap: 0;
  }
  .cc-step {
    display: flex; align-items: center; gap: 10px;
    flex: 1; cursor: pointer; padding: 4px 8px;
    border-radius: var(--r-sm); transition: opacity .2s;
  }
  .cc-step:hover { opacity: 0.75; }
  .step-num {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; flex-shrink: 0;
    border: 2px solid var(--border2); color: var(--subtle);
    background: var(--surface2); transition: all .2s;
  }
  .cc-step.s-active .step-num {
    background: var(--accent); border-color: var(--accent); color: white;
    box-shadow: 0 0 0 4px var(--accent-lt);
  }
  .cc-step.s-done .step-num {
    background: var(--accent2); border-color: var(--accent2); color: white;
  }
  .step-lbl { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--subtle); }
  .step-ttl { font-size: 13.5px; font-weight: 600; color: var(--muted); margin-top: 1px; }
  .cc-step.s-active .step-lbl { color: var(--accent); }
  .cc-step.s-active .step-ttl { color: var(--text); }
  .cc-step.s-done .step-lbl   { color: var(--accent2); }
  .step-div { width: 40px; height: 1px; background: var(--border); flex-shrink: 0; margin: 0 4px; }

  /* ── CARD ── */
  .cc-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-xl); overflow: hidden;
    box-shadow: var(--shadow-md);
    animation: fadeUp .3s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes fadeUp {
    from { opacity:0; transform: translateY(14px); }
    to   { opacity:1; transform: translateY(0); }
  }
  .cc-card-top {
    padding: 22px 28px 18px; border-bottom: 1px solid var(--border);
    display: flex; align-items: flex-start; gap: 14px;
    background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%);
  }
  .cti { width: 46px; height: 46px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .cti.blue  { background: var(--accent-lt); }
  .cti.green { background: var(--accent2-lt); }
  .cth { font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.2px; }
  .ctp { font-size: 13px; color: var(--muted); margin-top: 3px; line-height: 1.5; }

  /* ── FORM ── */
  .cc-form-body { padding: 26px 28px; display: flex; flex-direction: column; gap: 22px; }
  .cc-sec-head {
    display: flex; align-items: center; gap: 11px;
    padding-bottom: 13px; border-bottom: 1px solid var(--border);
  }
  .sec-ico { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
  .sec-ico.blue  { background: var(--accent-lt); }
  .sec-ico.green { background: var(--accent2-lt); }
  .sec-ttl { font-size: 13px; font-weight: 700; color: var(--text); }
  .sec-sub { font-size: 12px; color: var(--muted); margin-top: 1px; }

  .cc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px; }
  .cc-grid.g3 { grid-template-columns: 1fr 1fr 1fr; }
  .full { grid-column: 1 / -1; }

  .cc-field { display: flex; flex-direction: column; gap: 5px; }
  .cc-label { font-size: 12.5px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 3px; }
  .req { color: var(--danger); font-size: 13px; }
  .cc-hint { font-size: 11.5px; color: var(--subtle); margin-top: 2px; }

  .cc-input, .cc-select {
    width: 100%; height: 40px; padding: 0 13px;
    border: 1.5px solid var(--border2); border-radius: var(--r-sm);
    background: var(--surface);
    font-family: var(--font); font-size: 13.5px; font-weight: 500; color: var(--text);
    transition: border-color .15s, box-shadow .15s, background .15s;
    outline: none; -webkit-appearance: none; appearance: none;
  }
  .cc-input::placeholder { color: var(--subtle); font-weight: 400; }
  .cc-input:hover, .cc-select:hover { border-color: #b0bac7; }
  .cc-input:focus, .cc-select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(26,86,219,.12);
    background: #fafcff;
  }
  .cc-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2398a2b3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
    padding-right: 36px; cursor: pointer;
  }
  .cc-select option { background: white; color: var(--text); }

  .cc-divider { height: 1px; background: var(--border); }

  /* ── CREDENTIALS MODAL ── */
  .cc-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .cc-modal {
    background: var(--surface);
    border-radius: var(--r-xl);
    padding: 32px;
    max-width: 450px;
    width: 90%;
    box-shadow: var(--shadow-lg);
    animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .modal-icon {
    width: 64px;
    height: 64px;
    background: var(--accent-lt);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 32px;
    color: var(--accent);
  }
  .modal-icon.green {
    background: var(--accent2-lt);
    color: var(--accent2);
  }
  .modal-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
    text-align: center;
    margin-bottom: 8px;
  }
  .modal-subtitle {
    font-size: 14px;
    color: var(--muted);
    text-align: center;
    margin-bottom: 24px;
  }
  .credential-item {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 12px 16px;
    margin-bottom: 12px;
  }
  .cred-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--subtle);
    margin-bottom: 4px;
  }
  .cred-value {
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cred-value.small {
    font-size: 14px;
  }
  .copy-btn {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: var(--r-sm);
    font-size: 12px;
    transition: all 0.15s;
  }
  .copy-btn:hover {
    background: var(--accent-lt);
  }
  .modal-note {
    font-size: 12px;
    color: var(--warning);
    text-align: center;
    margin: 16px 0;
    padding: 8px;
    background: #fffaeb;
    border-radius: var(--r-sm);
    border: 1px solid #fedf89;
  }
  .modal-note.danger {
    color: var(--danger);
    background: #fef3f2;
    border-color: #fecdca;
  }
  .modal-actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;
  }
  .modal-actions button {
    flex: 1;
  }

  /* ── TICKET NUMBER DISPLAY ── */
  .ticket-display {
    background: linear-gradient(135deg, var(--accent-lt) 0%, #f0f5ff 100%);
    border: 1px solid var(--accent);
    border-radius: var(--r-lg);
    padding: 16px 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .ticket-icon {
    width: 48px;
    height: 48px;
    background: var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    flex-shrink: 0;
  }
  .ticket-content {
    flex: 1;
  }
  .ticket-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent);
    margin-bottom: 4px;
  }
  .ticket-number {
    font-size: 24px;
    font-weight: 700;
    color: var(--text);
    font-family: monospace;
    letter-spacing: 1px;
  }
  .ticket-note {
    font-size: 12px;
    color: var(--muted);
    margin-top: 4px;
  }

  /* ── FOOTER ── */
  .cc-form-footer {
    padding: 18px 28px;
    background: var(--surface2); border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  }
  .footer-note { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 4px; }
  .footer-acts { display: flex; gap: 9px; align-items: center; }

  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    height: 38px; padding: 0 18px; border-radius: var(--r-sm);
    font-family: var(--font); font-size: 13.5px; font-weight: 600;
    cursor: pointer; border: none; transition: all .18s ease; letter-spacing: -0.1px;
  }
  .btn-ghost {
    background: transparent; color: var(--muted);
    border: 1.5px solid var(--border2);
  }
  .btn-ghost:hover { background: var(--surface2); color: var(--text); border-color: #b0bac7; }
  .btn-blue {
    background: var(--accent); color: white;
    box-shadow: 0 1px 3px rgba(26,86,219,.3), 0 4px 12px rgba(26,86,219,.18);
  }
  .btn-blue:hover { background: #1447c0; box-shadow: 0 2px 6px rgba(26,86,219,.35), 0 8px 20px rgba(26,86,219,.22); transform: translateY(-1px); }
  .btn-blue:active { transform: translateY(0); }
  .btn-green {
    background: var(--accent2); color: white;
    box-shadow: 0 1px 3px rgba(14,164,122,.3), 0 4px 12px rgba(14,164,122,.18);
  }
  .btn-green:hover { background: #0b8c67; transform: translateY(-1px); box-shadow: 0 2px 6px rgba(14,164,122,.35), 0 8px 20px rgba(14,164,122,.22); }
  .btn-green:active { transform: translateY(0); }
  .btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none !important; }

  /* ── TOAST ── */
  .cc-toast {
    position: fixed; bottom: 24px; right: 24px;
    background: white; border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 14px 16px;
    box-shadow: var(--shadow-lg);
    display: flex; align-items: center; gap: 12px;
    animation: toastIn .35s cubic-bezier(.22,1,.36,1) both;
    z-index: 200; min-width: 270px;
  }
  @keyframes toastIn {
    from { opacity:0; transform: translateY(16px) scale(.96); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }
  .toast-dot {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .toast-dot.blue  { background: var(--accent-lt); color: var(--accent); }
  .toast-dot.green { background: var(--accent2-lt); color: var(--accent2); }
  .toast-dot.red { background: #fef3f2; color: var(--danger); }
  .toast-ttl { font-size: 14px; font-weight: 700; color: var(--text); }
  .toast-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .toast-x {
    margin-left: auto; background: none; border: none; cursor: pointer;
    color: var(--subtle); font-size: 15px; padding: 4px; border-radius: 5px;
    transition: background .15s; line-height: 1;
  }
  .toast-x:hover { background: var(--surface2); color: var(--text); }

  @media (max-width: 700px) {
    .cc-sidebar { display: none; }
    .cc-content { padding: 20px 16px; }
    .cc-grid, .cc-grid.g3 { grid-template-columns: 1fr; }
  }
`;

const CATS = ["Television", "Refrigerator", "Washing Machine", "Air Conditioner", "Microwave", "Laptop", "Mobile Phone", "Camera", "Printer", "Other Electronics"];

const EMPTY_CUST = {
  customerName: "",
  email: "",
  mobileNum: "",
  proName: "",
  proCatogory: "",
  proSrNo: "",
  proModNum: ""
};

const EMPTY_PROD = {
  proName: "",
  proCatogory: "",
  proSrNo: "",
  proModNum: "",
  brandName: "",
  purDate: "",
  invoiceNum: ""
};

export default function CustomerCareHome() {
  const [view, setView] = useState("customer");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cust, setCust] = useState(EMPTY_CUST);
  const [prod, setProd] = useState(EMPTY_PROD);
  
  // For modals
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ username: "", password: "" });
  
  // For product registration
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({ ticketNumber: "", message: "" });

  const show = (type, customMessage = null) => {
    setToast({ type, message: customMessage });
    setTimeout(() => setToast(null), 3500);
  };

  const onC = (e) => setCust({ ...cust, [e.target.name]: e.target.value });
  const onP = (e) => setProd({ ...prod, [e.target.name]: e.target.value });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    show("copy", "Copied to clipboard!");
  };

  const submitCust = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/customerDetails/newcustomer", cust);
      
      // Check if response contains password
      if (response.data.password) {
        setUserCredentials({
          username: cust.email, // Email is the username
          password: response.data.password
        });
        setShowCredentialsModal(true);
      }
      
      show("customer", "Customer registered successfully!");
      setCust(EMPTY_CUST);
    } catch (err) {
      const msg = err.response?.data?.message || "Customer registration failed";
      setError(msg);
      show("error", msg);
      console.error(err);
    }
    setLoading(false);
  };

  const submitProd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/register", prod);
      
      // Check if response contains ticket number
      if (response.data.ticketNumber) {
        setTicketInfo({
          ticketNumber: response.data.ticketNumber,
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
      console.error(err);
    }
    setLoading(false);
  };

  const SIDEBAR_ITEMS = [
    { id: "customer", icon: "👤", label: "Customer", cls: "is-blue" },
    { id: "product", icon: "📦", label: "Product", cls: "is-green" },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="cc-wrap">

        {/* NAV */}
        <nav className="cc-nav">
          <div className="cc-nav-brand">
            <div className="cc-nav-logo">CC</div>
            <div>
              <div className="cc-nav-name">ServiceDesk Pro</div>
              <div className="cc-nav-sub">Customer Care Management</div>
            </div>
          </div>
          <div className="cc-nav-pill">● Live</div>
        </nav>

        <div className="cc-main">

          {/* SIDEBAR */}
          <aside className="cc-sidebar">
            <div className="cc-sb-label">Registrations</div>
            {SIDEBAR_ITEMS.map(it => (
              <button
                key={it.id}
                className={`cc-nav-item ${view === it.id ? it.cls : ""}`}
                onClick={() => setView(it.id)}
              >
                <div className="nav-ico">{it.icon}</div>
                {it.label}
              </button>
            ))}

            <div className="cc-sb-label">Management</div>
            {[["🔍", "Search"], ["📋", "All Customers"], ["🛠", "Tickets"], ["📊", "Reports"]].map(([ico, lbl]) => (
              <button key={lbl} className="cc-nav-item">
                <div className="nav-ico">{ico}</div>{lbl}
              </button>
            ))}
          </aside>

          {/* CONTENT */}
          <main className="cc-content">
            {/* Page header */}
            <div className="cc-breadcrumb">
              Home <span>›</span> Registrations <span>›</span>
              <strong style={{ color: "var(--text)" }}>
                {view === "customer" ? "Customer" : "Product"}
              </strong>
            </div>
            <div className="cc-page-title">
              {view === "customer" ? "Customer Registration" : "Product Registration"}
            </div>
            <div className="cc-page-desc">
              {view === "customer"
                ? "Add a new customer to the support system for warranty and service access."
                : "Register a purchased product to activate warranty coverage and service tracking."}
            </div>

            {/* Step bar */}
            <div className="cc-steps">
              <div className={`cc-step ${view === "customer" ? "s-active" : "s-done"}`} onClick={() => setView("customer")}>
                <div className="step-num">{view === "product" ? "✓" : "1"}</div>
                <div><div className="step-lbl">Step 1</div><div className="step-ttl">Customer Info</div></div>
              </div>
              <div className="step-div" />
              <div className={`cc-step ${view === "product" ? "s-active" : ""}`} onClick={() => setView("product")}>
                <div className="step-num">2</div>
                <div><div className="step-lbl">Step 2</div><div className="step-ttl">Product Details</div></div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: "#fef3f2",
                border: "1px solid #fecdca",
                borderRadius: "var(--r-md)",
                padding: "12px 16px",
                marginBottom: "20px",
                color: "var(--danger)",
                fontSize: "13px"
              }}>
                {error}
              </div>
            )}

            {/* ── CUSTOMER FORM ── */}
            {view === "customer" && (
              <div className="cc-card" key="cust">
                <div className="cc-card-top">
                  <div className="cti blue">👤</div>
                  <div>
                    <div className="cth">New Customer</div>
                    <div className="ctp">Register a customer to grant access to warranty claims and support history.</div>
                  </div>
                </div>
                <form onSubmit={submitCust}>
                  <div className="cc-form-body">
                    {/* Customer Information */}
                    <div>
                      <div className="cc-sec-head">
                        <div className="sec-ico blue">🪪</div>
                        <div>
                          <div className="sec-ttl">Personal Information</div>
                          <div className="sec-sub">Basic contact details of the customer</div>
                        </div>
                      </div>
                      <div className="cc-grid">
                        <div className="cc-field full">
                          <label className="cc-label">Full Name <span className="req">*</span></label>
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
                          <label className="cc-label">Email Address <span className="req">*</span></label>
                          <input
                            className="cc-input"
                            type="email"
                            name="email"
                            value={cust.email}
                            onChange={onC}
                            placeholder="rahul@example.com"
                            required
                          />
                          <span className="cc-hint">This will be used as username for login</span>
                        </div>
                        <div className="cc-field">
                          <label className="cc-label">Mobile Number <span className="req">*</span></label>
                          <input
                            className="cc-input"
                            type="tel"
                            name="mobileNum"
                            value={cust.mobileNum}
                            onChange={onC}
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Product Information */}
                    <div>
                      <div className="cc-sec-head">
                        <div className="sec-ico blue">📦</div>
                        <div>
                          <div className="sec-ttl">Product Information</div>
                          <div className="sec-sub">Product details to link with customer</div>
                        </div>
                      </div>
                      <div className="cc-grid">
                        <div className="cc-field">
                          <label className="cc-label">Product Name <span className="req">*</span></label>
                          <input
                            className="cc-input"
                            name="proName"
                            value={cust.proName}
                            onChange={onC}
                            placeholder="e.g. Samsung Smart TV"
                            required
                          />
                        </div>
                        <div className="cc-field">
                          <label className="cc-label">Product Category <span className="req">*</span></label>
                          <select
                            className="cc-select"
                            name="proCatogory"
                            value={cust.proCatogory}
                            onChange={onC}
                            required
                          >
                            <option value="">Select category</option>
                            {CATS.map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="cc-field">
                          <label className="cc-label">Serial Number <span className="req">*</span></label>
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
                          <label className="cc-label">Model Number <span className="req">*</span></label>
                          <input
                            className="cc-input"
                            name="proModNum"
                            value={cust.proModNum}
                            onChange={onC}
                            placeholder="e.g. UA55AU8000"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cc-form-footer">
                    <div className="footer-note"><span style={{ color: "var(--danger)" }}>*</span> Required fields</div>
                    <div className="footer-acts">
                      <button type="button" className="btn btn-ghost" onClick={() => setCust(EMPTY_CUST)}>Clear</button>
                      <button type="submit" className="btn btn-blue" disabled={loading}>
                        {loading ? "Saving…" : <>Register Customer <span>→</span></>}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* ── PRODUCT FORM ── */}
            {view === "product" && (
              <div className="cc-card" key="prod">
                <div className="cc-card-top">
                  <div className="cti green">📦</div>
                  <div>
                    <div className="cth">Product Registration</div>
                    <div className="ctp">Register a purchased product to activate warranty and service request tracking.</div>
                  </div>
                </div>
                <form onSubmit={submitProd}>
                  <div className="cc-form-body">
                    {/* Product details */}
                    <div>
                      <div className="cc-sec-head">
                        <div className="sec-ico green">🔧</div>
                        <div>
                          <div className="sec-ttl">Product Details</div>
                          <div className="sec-sub">Identify the product being registered</div>
                        </div>
                      </div>
                      <div className="cc-grid">
                        <div className="cc-field">
                          <label className="cc-label">Product Name <span className="req">*</span></label>
                          <input
                            className="cc-input"
                            name="proName"
                            value={prod.proName}
                            onChange={onP}
                            placeholder='e.g. 55" Smart TV'
                            required
                          />
                        </div>
                        <div className="cc-field">
                          <label className="cc-label">Product Category <span className="req">*</span></label>
                          <select
                            className="cc-select"
                            name="proCatogory"
                            value={prod.proCatogory}
                            onChange={onP}
                            required
                          >
                            <option value="">Select category</option>
                            {CATS.map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="cc-field">
                          <label className="cc-label">Brand Name <span className="req">*</span></label>
                          <input
                            className="cc-input"
                            name="brandName"
                            value={prod.brandName}
                            onChange={onP}
                            placeholder="e.g. Samsung"
                            required
                          />
                        </div>
                        <div className="cc-field">
                          <label className="cc-label">Model Number <span className="req">*</span></label>
                          <input
                            className="cc-input"
                            name="proModNum"
                            value={prod.proModNum}
                            onChange={onP}
                            placeholder="e.g. UA55AU8000"
                            required
                          />
                        </div>
                        <div className="cc-field full">
                          <label className="cc-label">Serial Number <span className="req">*</span></label>
                          <input
                            className="cc-input"
                            name="proSrNo"
                            value={prod.proSrNo}
                            onChange={onP}
                            placeholder="e.g. SN2024XXXXXXXX"
                            required
                          />
                          <span className="cc-hint">Found on the back of the product or inside the packaging</span>
                        </div>
                      </div>
                    </div>

                    <div className="cc-divider" />

                    {/* Purchase Information */}
                    <div>
                      <div className="cc-sec-head">
                        <div className="sec-ico green">🧾</div>
                        <div>
                          <div className="sec-ttl">Purchase Information</div>
                          <div className="sec-sub">Invoice and purchase details</div>
                        </div>
                      </div>
                      <div className="cc-grid g3">
                        <div className="cc-field">
                          <label className="cc-label">Purchase Date <span className="req">*</span></label>
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
                          <label className="cc-label">Invoice Number <span className="req">*</span></label>
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
                  </div>

                  <div className="cc-form-footer">
                    <div className="footer-note"><span style={{ color: "var(--danger)" }}>*</span> All fields required</div>
                    <div className="footer-acts">
                      <button type="button" className="btn btn-ghost" onClick={() => setProd(EMPTY_PROD)}>Clear</button>
                      <button type="submit" className="btn btn-green" disabled={loading}>
                        {loading ? "Saving…" : <>Register Product <span>→</span></>}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Credentials Modal - For Customer Registration */}
      {showCredentialsModal && (
        <div className="cc-modal-overlay" onClick={() => setShowCredentialsModal(false)}>
          <div className="cc-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">🔐</div>
            <div className="modal-title">Registration Successful!</div>
            <div className="modal-subtitle">Auto-generated login credentials</div>

            <div className="credential-item">
              <div className="cred-label">Username (Email)</div>
              <div className="cred-value">
                {userCredentials.username}
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(userCredentials.username)}
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="credential-item">
              <div className="cred-label">Password</div>
              <div className="cred-value">
                {userCredentials.password}
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(userCredentials.password)}
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="modal-note">
              ⚠️ Please save these credentials. They won't be shown again.
              <br />
              <small>Customer can login with these credentials to raise service requests.</small>
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-blue"
                onClick={() => setShowCredentialsModal(false)}
                style={{ width: "100%" }}
              >
                I've Saved Them
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal - For Product Registration */}
      {showTicketModal && (
        <div className="cc-modal-overlay" onClick={() => setShowTicketModal(false)}>
          <div className="cc-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon green">🎫</div>
            <div className="modal-title">Product Registered!</div>
            <div className="modal-subtitle">{ticketInfo.message}</div>

            <div className="ticket-display" style={{ marginBottom: 0 }}>
              <div className="ticket-icon">#</div>
              <div className="ticket-content">
                <div className="ticket-label">Ticket Number</div>
                <div className="ticket-number">{ticketInfo.ticketNumber}</div>
                <div className="ticket-note">Use this ticket number for tracking service requests</div>
              </div>
            </div>

            <div className="credential-item" style={{ marginTop: "16px" }}>
              <div className="cred-label">Ticket Number</div>
              <div className="cred-value">
                {ticketInfo.ticketNumber}
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(ticketInfo.ticketNumber)}
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="modal-note">
              ℹ️ This ticket number will be used for all future service requests
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-green"
                onClick={() => setShowTicketModal(false)}
                style={{ width: "100%" }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="cc-toast">
          <div className={`toast-dot ${
            toast.type === "customer" ? "blue" :
            toast.type === "product" ? "green" :
            toast.type === "copy" ? "blue" :
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
            <div className="toast-sub">
              {toast.message || (
                toast.type === "customer" ? "Credentials sent to customer" :
                toast.type === "product" ? "Ticket number generated" :
                toast.type === "copy" ? "Text copied to clipboard" :
                "Operation completed"
              )}
            </div>
          </div>
          <button className="toast-x" onClick={() => setToast(null)}>✕</button>
        </div>
      )}
    </>
  );
}