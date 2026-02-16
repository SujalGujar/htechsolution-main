// // src/userPanel/UserPanelHome.jsx
// import React, { useState } from "react";
// import axiosInstance from "../../Utils/axiosIntance"; // ✅ your existing axios

// // ─────────────────────────────────────────────
// //  HOW THE API FLOW WORKS (read this first!)
// //
// //  1. User types ticket number → clicks Search
// //  2. We call GET /api/customer/search/:ticketNumber
// //  3. If found  → show product details
// //  4. If warranty valid → show complaint form
// //  5. User fills form → POST /api/customer/complaint
// // ─────────────────────────────────────────────

// const UserPanelHome = () => {

//   // ── STEP 1: Ticket search state ──
//   const [ticketInput, setTicketInput]   = useState("");   // what user types
//   const [product, setProduct]           = useState(null); // found product
//   const [searchError, setSearchError]   = useState("");   // error message
//   const [searching, setSearching]       = useState(false);// loading spinner

//   // ── STEP 2: Complaint form state ──
//   const [showForm, setShowForm]         = useState(false);
//   const [submitting, setSubmitting]     = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError]   = useState("");

//   const [complaintForm, setComplaintForm] = useState({
//     customerName:        "",
//     mobileNumber:        "",
//     productName:         "",   // auto-filled from product
//     serialNumber:        "",   // auto-filled from product
//     complaintTitle:      "",
//     complaintDescription:"",
//     ticketNumber:        "",   // auto-filled from search
//     status:              "Pending",
//     createdAt:           Date.now(),
//   });

//   // ─────────────────────────────────────────
//   //  SEARCH HANDLER
//   //  Called when user clicks "Search" button
//   // ─────────────────────────────────────────
//   const handleSearch = async () => {
//      console.log("Sending ticketNumber:", ticketInput.trim());
//     // Basic validation
//     if (!ticketInput.trim()) {
//       setSearchError("Please enter a ticket number");
//       return;
//     }

//     setSearching(true);    // show spinner
//     setSearchError("");    // clear old errors
//     setProduct(null);      // clear old product
//     setShowForm(false);    // hide form
//     setSubmitSuccess(false);

//     try {
//       // ✅ API CALL — GET /api/customer/search/:ticketNumber
//       // axiosInstance already has baseURL="/api" so we just write:
//       const res = await axiosInstance.post("/customer/search", {
//   ticketNumber: ticketInput.trim()
// });

//       // res.data = { message: "Product found", product: { ...productData } }
//       const foundProduct = res.data.product;

//       setProduct(foundProduct); // save product in state → triggers display

//       // ✅ Auto-fill complaint form with product data
//       // ✅ Fixed — matches your schema field names
// setComplaintForm(prev => ({
//   ...prev,
//   productName:  foundProduct.proName      || "",
//   serialNumber: foundProduct.proSrNo      || "",
//   ticketNumber: foundProduct.TicketNumber || ticketInput,
//   createdAt:    Date.now(),
// }));

//     } catch (error) {
//       // error.response.data.message comes from your backend
//       const msg = error.response?.data?.message || "Something went wrong";
//       setSearchError(msg); // show "Wrong Ticket Number" etc.
//     } finally {
//       setSearching(false); // hide spinner always
//     }
//   };

//   // ─────────────────────────────────────────
//   //  CHECK WARRANTY
//   //  warrantyExpiry is a date string from DB
//   //  e.g. "2026-12-31"
//   // ─────────────────────────────────────────
//   const isWarrantyValid = (product) => {
//     if (!product?.warrantyExpiry) return false;
//     const expiry = new Date(product.warrantyExpiry);
//     const today  = new Date();
//     return expiry > today; // true = still in warranty
//   };

//   // ─────────────────────────────────────────
//   //  COMPLAINT FORM CHANGE HANDLER
//   // ─────────────────────────────────────────
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setComplaintForm(prev => ({ ...prev, [name]: value }));
//   };

//   // ─────────────────────────────────────────
//   //  SUBMIT COMPLAINT
//   //  Called when user submits the complaint form
//   // ─────────────────────────────────────────
//   const handleComplaintSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!complaintForm.customerName.trim())         { setSubmitError("Customer name is required"); return; }
//     if (!complaintForm.mobileNumber.trim())         { setSubmitError("Mobile number is required"); return; }
//     if (!complaintForm.complaintTitle.trim())       { setSubmitError("Complaint title is required"); return; }
//     if (!complaintForm.complaintDescription.trim()) { setSubmitError("Please describe your complaint"); return; }

//     setSubmitting(true);
//     setSubmitError("");

//     const payload = {
//       ...complaintForm,
//       createdAt: Date.now(), // fresh timestamp at submit
//     };

//     try {
//       // ✅ API CALL — POST /api/customer/complaint
//       await axiosInstance.post("/customer/complaint", payload);

//       setSubmitSuccess(true); // show success message
//       setShowForm(false);     // hide form

//     } catch (error) {
//       const msg = error.response?.data?.message || "Failed to submit complaint";
//       setSubmitError(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   //  RENDER
//   // ─────────────────────────────────────────
//   const warrantyOk = product ? isWarrantyValid(product) : false;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
//         @keyframes fadeUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
//         @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:.4; } }
//         @keyframes slideDown{ from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
//         .search-btn:hover   { background:#0f172a !important; transform:translateY(-1px); }
//         .field-input:focus  { border-color:#6366f1 !important; background:#fff !important; }
//         .submit-btn:hover   { background:#4f46e5 !important; transform:translateY(-1px); }
//         .card-hover:hover   { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.1) !important; }
//       `}</style>

//       <div style={{ fontFamily:"'DM Sans',sans-serif", animation:"fadeUp 0.4s ease both" }}>

//         {/* ══════════════════════════════════════
//             SECTION 1 — PAGE HEADER
//         ══════════════════════════════════════ */}
//         <div style={{ marginBottom:28 }}>
//           <h1 style={{ fontSize:26, fontWeight:800, color:"#0f172a", fontFamily:"'Sora',sans-serif", margin:"0 0 6px" }}>
//             Product Search
//           </h1>
//           <p style={{ fontSize:14, color:"#94a3b8", margin:0 }}>
//             Enter your ticket number to find your product and raise a complaint
//           </p>
//         </div>

//         {/* ══════════════════════════════════════
//             SECTION 2 — SEARCH BOX
//             User types ticket number here
//         ══════════════════════════════════════ */}
//         <div style={{
//           background:"#fff", borderRadius:20, padding:"28px 28px",
//           boxShadow:"0 1px 4px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9",
//           marginBottom:24, animation:"fadeUp 0.4s ease 0.05s both",
//         }}>
//           <p style={{ fontSize:13, fontWeight:700, color:"#374151", marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>
//             🎫 Enter Ticket Number
//           </p>

//           {/* Search row */}
//           <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
//             <input
//               type="text"
//               placeholder="e.g. TKT-1042"
//               value={ticketInput}
//               onChange={e => { setTicketInput(e.target.value); setSearchError(""); }}
//               // ✅ Allow pressing Enter to search
//               onKeyDown={e => e.key === "Enter" && handleSearch()}
//               style={{
//                 flex:1, minWidth:200,
//                 padding:"13px 18px", borderRadius:12,
//                 border:"1.5px solid #e2e8f0", outline:"none",
//                 fontSize:15, fontFamily:"'DM Sans',sans-serif",
//                 background:"#f8fafc", color:"#0f172a",
//                 transition:"border-color 0.15s",
//               }}
//               className="field-input"
//             />
//             <button
//               onClick={handleSearch}
//               disabled={searching}
//               className="search-btn"
//               style={{
//                 padding:"13px 28px", borderRadius:12,
//                 background:"#1e293b", color:"#fff",
//                 border:"none", fontSize:14, fontWeight:700,
//                 cursor: searching ? "not-allowed" : "pointer",
//                 fontFamily:"'DM Sans',sans-serif",
//                 display:"flex", alignItems:"center", gap:8,
//                 transition:"all 0.2s", opacity: searching ? 0.7 : 1,
//               }}
//             >
//               {/* spinner when loading */}
//               {searching ? (
//                 <>
//                   <span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.8s linear infinite" }} />
//                   Searching...
//                 </>
//               ) : "🔍 Search"}
//             </button>
//           </div>

//           {/* Error message from API */}
//           {searchError && (
//             <div style={{
//               marginTop:14, padding:"11px 16px", borderRadius:10,
//               background:"#fef2f2", border:"1px solid #fecaca",
//               color:"#b91c1c", fontSize:13, fontWeight:600,
//               animation:"fadeIn 0.2s ease",
//             }}>
//               ❌ {searchError}
//             </div>
//           )}
//         </div>

//         {/* ══════════════════════════════════════
//             SECTION 3 — PRODUCT DETAILS
//             Only shows after successful search
//             product state is set from API response
//         ══════════════════════════════════════ */}
//         {product && (
//           <div style={{ animation:"fadeUp 0.4s ease both" }}>

//             {/* Product card */}
//             <div style={{
//               background:"#fff", borderRadius:20, overflow:"hidden",
//               boxShadow:"0 1px 4px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9",
//               marginBottom:20,
//             }}>
//               {/* Card header */}
//               <div style={{
//                 background:"linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
//                 padding:"20px 28px",
//                 display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10,
//               }}>
//                 <div>
//                   <p style={{ color:"#94a3b8", fontSize:12, margin:"0 0 4px", fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>Product Found</p>
//                   <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:0, fontFamily:"'Sora',sans-serif" }}>
//                     {product.productName || "N/A"}
//                   </h2>
//                 </div>
//                 {/* Warranty badge */}
//                 <div style={{
//                   padding:"8px 18px", borderRadius:20,
//                   background: warrantyOk ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
//                   border: `1px solid ${warrantyOk ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
//                   color: warrantyOk ? "#4ade80" : "#f87171",
//                   fontSize:13, fontWeight:700,
//                 }}>
//                   {warrantyOk ? "✅ Warranty Active" : "❌ Warranty Expired"}
//                 </div>
//               </div>

//               {/* Product details grid */}
//               <div style={{ padding:"24px 28px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:20 }}>
//                 {[
//                   { label:"Ticket Number",   value: product.ticketNumber   },
//                   { label:"Serial Number",   value: product.serialNumber   },
//                   { label:"Category",        value: product.category       },
//                   { label:"Purchase Date",   value: product.purchaseDate   },
//                   { label:"Warranty Expiry", value: product.warrantyExpiry },
//                   { label:"Customer Name",   value: product.customerName   },
//                 ].map(({ label, value }) => (
//                   <div key={label} className="card-hover" style={{
//                     background:"#f8fafc", borderRadius:12, padding:"14px 16px",
//                     border:"1px solid #f1f5f9", transition:"all 0.2s",
//                   }}>
//                     <p style={{ fontSize:11, color:"#94a3b8", fontWeight:700, margin:"0 0 6px", textTransform:"uppercase", letterSpacing:0.8 }}>{label}</p>
//                     <p style={{ fontSize:15, color:"#0f172a", fontWeight:700, margin:0, fontFamily:"'Sora',sans-serif" }}>
//                       {value || "—"}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Warranty message + button */}
//               <div style={{ padding:"0 28px 24px" }}>
//                 {warrantyOk ? (
//                   // ✅ Warranty valid → show "Raise Complaint" button
//                   <button
//                     onClick={() => { setShowForm(true); setSubmitSuccess(false); setSubmitError(""); }}
//                     style={{
//                       padding:"13px 28px", borderRadius:12,
//                       background:"#6366f1", color:"#fff",
//                       border:"none", fontSize:14, fontWeight:700,
//                       cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
//                       boxShadow:"0 4px 14px rgba(99,102,241,0.35)",
//                       transition:"all 0.2s",
//                     }}
//                     className="submit-btn"
//                   >
//                     📝 Raise a Complaint
//                   </button>
//                 ) : (
//                   // ❌ Warranty expired → show message instead
//                   <div style={{
//                     padding:"14px 18px", borderRadius:12,
//                     background:"#fef2f2", border:"1px solid #fecaca",
//                     color:"#b91c1c", fontSize:14, fontWeight:600,
//                   }}>
//                     ⚠️ Warranty has expired. Complaints can only be raised for products under warranty.
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ══════════════════════════════════════
//                 SECTION 4 — COMPLAINT FORM
//                 Only shows if:
//                   1. Warranty is valid
//                   2. User clicked "Raise Complaint"
//             ══════════════════════════════════════ */}
//             {showForm && warrantyOk && (
//               <div style={{
//                 background:"#fff", borderRadius:20, padding:"28px 28px",
//                 boxShadow:"0 4px 20px rgba(99,102,241,0.1)",
//                 border:"1.5px solid #e0e7ff",
//                 animation:"slideDown 0.3s ease both",
//               }}>
//                 <div style={{ marginBottom:22 }}>
//                   <h3 style={{ fontSize:19, fontWeight:800, color:"#0f172a", fontFamily:"'Sora',sans-serif", margin:"0 0 5px" }}>
//                     Raise a Complaint
//                   </h3>
//                   <p style={{ fontSize:13, color:"#94a3b8", margin:0 }}>
//                     Fill in the details below. Product info is auto-filled.
//                   </p>
//                 </div>

//                 {/* Submit error */}
//                 {submitError && (
//                   <div style={{ padding:"11px 16px", borderRadius:10, background:"#fef2f2", border:"1px solid #fecaca", color:"#b91c1c", fontSize:13, fontWeight:600, marginBottom:18 }}>
//                     ❌ {submitError}
//                   </div>
//                 )}

//                 <form onSubmit={handleComplaintSubmit}>
//                   <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16, marginBottom:16 }}>

//                     {/* ── customerName ── */}
//                     <Field
//                       label="Customer Name *"
//                       name="customerName"
//                       placeholder="Your full name"
//                       value={complaintForm.customerName}
//                       onChange={handleFormChange}
//                     />

//                     {/* ── mobileNumber ── */}
//                     <Field
//                       label="Mobile Number *"
//                       name="mobileNumber"
//                       placeholder="e.g. 9876543210"
//                       value={complaintForm.mobileNumber}
//                       onChange={handleFormChange}
//                     />

//                     {/* ── productName (auto-filled, readonly) ── */}
//                     <Field
//                       label="Product Name"
//                       name="productName"
//                       value={complaintForm.productName}
//                       onChange={handleFormChange}
//                       readOnly
//                       hint="Auto-filled from product"
//                     />

//                     {/* ── serialNumber (auto-filled, readonly) ── */}
//                     <Field
//                       label="Serial Number"
//                       name="serialNumber"
//                       value={complaintForm.serialNumber}
//                       onChange={handleFormChange}
//                       readOnly
//                       hint="Auto-filled from product"
//                     />

//                     {/* ── ticketNumber (auto-filled, readonly) ── */}
//                     <Field
//                       label="Ticket Number"
//                       name="ticketNumber"
//                       value={complaintForm.ticketNumber}
//                       onChange={handleFormChange}
//                       readOnly
//                       hint="Auto-filled from search"
//                     />

//                     {/* ── status (readonly) ── */}
//                     <Field
//                       label="Status"
//                       name="status"
//                       value={complaintForm.status}
//                       onChange={handleFormChange}
//                       readOnly
//                       hint="Default: Pending"
//                     />

//                     {/* ── complaintTitle (full width) ── */}
//                     <div style={{ gridColumn:"1 / -1" }}>
//                       <Field
//                         label="Complaint Title *"
//                         name="complaintTitle"
//                         placeholder="e.g. Device not powering on"
//                         value={complaintForm.complaintTitle}
//                         onChange={handleFormChange}
//                       />
//                     </div>

//                     {/* ── complaintDescription (textarea, full width) ── */}
//                     <div style={{ gridColumn:"1 / -1" }}>
//                       <label style={lbl}>Complaint Description *</label>
//                       <textarea
//                         name="complaintDescription"
//                         placeholder="Describe your issue in detail..."
//                         value={complaintForm.complaintDescription}
//                         onChange={handleFormChange}
//                         rows={4}
//                         className="field-input"
//                         style={{ ...inp, resize:"vertical" }}
//                       />
//                     </div>

//                     {/* ── createdAt (display only) ── */}
//                     <div style={{ gridColumn:"1 / -1" }}>
//                       <label style={lbl}>Submitted At</label>
//                       <div style={{ ...inp, background:"#f1f5f9", color:"#64748b", display:"flex", alignItems:"center" }}>
//                         🕐 {new Date(complaintForm.createdAt).toLocaleString()}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Submit button */}
//                   <div style={{ display:"flex", gap:12, justifyContent:"flex-end" }}>
//                     <button type="button" onClick={() => setShowForm(false)}
//                       style={{ padding:"12px 24px", borderRadius:12, border:"1.5px solid #e2e8f0", background:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", color:"#64748b", fontFamily:"'DM Sans',sans-serif" }}>
//                       Cancel
//                     </button>
//                     <button type="submit" disabled={submitting}
//                       className="submit-btn"
//                       style={{
//                         padding:"12px 28px", borderRadius:12,
//                         background:"#6366f1", color:"#fff",
//                         border:"none", fontSize:14, fontWeight:700,
//                         cursor: submitting ? "not-allowed" : "pointer",
//                         fontFamily:"'DM Sans',sans-serif",
//                         boxShadow:"0 4px 14px rgba(99,102,241,0.3)",
//                         transition:"all 0.2s", opacity: submitting ? 0.7 : 1,
//                         display:"flex", alignItems:"center", gap:8,
//                       }}>
//                       {submitting ? "Submitting..." : "✅ Submit Complaint"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {/* ══════════════════════════════════════
//                 SECTION 5 — SUCCESS MESSAGE
//                 Shows after complaint submitted
//             ══════════════════════════════════════ */}
//             {submitSuccess && (
//               <div style={{
//                 background:"#f0fdf4", border:"1.5px solid #86efac",
//                 borderRadius:20, padding:"28px 28px",
//                 textAlign:"center", animation:"fadeUp 0.4s ease both",
//               }}>
//                 <p style={{ fontSize:48, marginBottom:12 }}>🎉</p>
//                 <h3 style={{ fontSize:20, fontWeight:800, color:"#166534", fontFamily:"'Sora',sans-serif", margin:"0 0 8px" }}>
//                   Complaint Submitted!
//                 </h3>
//                 <p style={{ fontSize:14, color:"#15803d", margin:"0 0 20px" }}>
//                   Your complaint has been received. Our team will contact you shortly.
//                 </p>
//                 <button
//                   onClick={() => { setProduct(null); setTicketInput(""); setSubmitSuccess(false); }}
//                   style={{ padding:"11px 24px", borderRadius:12, background:"#166534", color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}
//                 >
//                   Search Another Product
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* ── spin keyframe for search button ── */}
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//     </>
//   );
// };

// // ─────────────────────────────────────────
// //  REUSABLE FIELD COMPONENT
// //  Makes the form DRY (Don't Repeat Yourself)
// // ─────────────────────────────────────────
// const Field = ({ label, name, placeholder, value, onChange, readOnly, hint }) => (
//   <div>
//     <label style={lbl}>{label}</label>
//     <input
//       type="text"
//       name={name}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       readOnly={readOnly}
//       className="field-input"
//       style={{
//         ...inp,
//         background: readOnly ? "#f1f5f9" : "#f8fafc",
//         color:      readOnly ? "#64748b"  : "#0f172a",
//         cursor:     readOnly ? "default"  : "text",
//       }}
//     />
//     {hint && <p style={{ fontSize:11, color:"#94a3b8", margin:"5px 0 0" }}>ℹ️ {hint}</p>}
//   </div>
// );

// // ─────────────────────────────────────────
// //  SHARED STYLES (defined outside component
// //  so they don't re-create on every render)
// // ─────────────────────────────────────────
// const lbl = {
//   display:"block", fontSize:13, fontWeight:700,
//   color:"#374151", marginBottom:7,
//   fontFamily:"'DM Sans',sans-serif",
// };

// const inp = {
//   width:"100%", padding:"12px 16px",
//   borderRadius:10, border:"1.5px solid #e2e8f0",
//   outline:"none", fontSize:14,
//   fontFamily:"'DM Sans',sans-serif",
//   transition:"border-color 0.15s, background 0.15s",
//   boxSizing:"border-box",
// };

// export default UserPanelHome;

// src/userPanel/UserPanelHome.jsx
// import React, { useState } from "react";
// import axiosInstance from "../../Utils/axiosIntance";

// const UserPanelHome = () => {

//   const [ticketInput, setTicketInput]     = useState("");
//   const [product, setProduct]             = useState(null);
//   const [searchError, setSearchError]     = useState("");
//   const [searching, setSearching]         = useState(false);
//   const [showForm, setShowForm]           = useState(false);
//   const [submitting, setSubmitting]       = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError]     = useState("");

//   const [complaintForm, setComplaintForm] = useState({
//     customerName:         "",
//     mobileNumber:         "",
//     productName:          "",
//     serialNumber:         "",
//     complaintTitle:       "",
//     complaintDescription: "",
//     ticketNumber:         "",
//     status:               "Pending",
//     createdAt:            Date.now(),
//   });

//   // ─────────────────────────────────────────
//   // SEARCH HANDLER
//   // ─────────────────────────────────────────
//   const handleSearch = async () => {
//     console.log("Sending ticketNumber:", ticketInput.trim());

//     if (!ticketInput.trim()) {
//       setSearchError("Please enter a ticket number");
//       return;
//     }

//     setSearching(true);
//     setSearchError("");
//     setProduct(null);
//     setShowForm(false);
//     setSubmitSuccess(false);

//     try {
//       // ✅ NO CHANGE HERE — POST is correct
//       // sending ticketNumber inside body { ticketNumber: "TKT-..." }
//       const res = await axiosInstance.post("/customer/search", {
//         ticketNumber: ticketInput.trim(),
//       });

//       const foundProduct = res.data.product;
//       setProduct(foundProduct);

//       // ✅ CHANGE 1 — Auto-fill uses correct schema field names
//       // WHY: Your MongoDB schema uses proName, proSrNo, TicketNumber
//       //      not productName, serialNumber, ticketNumber
//       setComplaintForm(prev => ({
//         ...prev,
//         productName:  foundProduct.proName      || "", // was foundProduct.productName
//         serialNumber: foundProduct.proSrNo      || "", // was foundProduct.serialNumber
//         ticketNumber: foundProduct.TicketNumber || ticketInput, // was foundProduct.ticketNumber
//         createdAt:    Date.now(),
//       }));

//     } catch (error) {
//       const msg = error.response?.data?.message || "Something went wrong";
//       setSearchError(msg);
//     } finally {
//       setSearching(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   // WARRANTY CHECK
//   // ─────────────────────────────────────────
//   // ✅ CHANGE 2 — checks warrEndDate instead of warrantyExpiry
//   // WHY: Your schema has warrEndDate (commented out but use this when you add it)
//   // For now warranty is always false since warrEndDate is not in schema yet
//   const isWarrantyValid = (product) => {
//     if (!product?.warrEndDate) return false; // was product?.warrantyExpiry
//     return new Date(product.warrEndDate) > new Date();
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setComplaintForm(prev => ({ ...prev, [name]: value }));
//   };

//   // ─────────────────────────────────────────
//   // SUBMIT COMPLAINT
//   // ─────────────────────────────────────────
//   const handleComplaintSubmit = async (e) => {
//     e.preventDefault();

//     if (!complaintForm.customerName.trim())         { setSubmitError("Customer name is required"); return; }
//     if (!complaintForm.mobileNumber.trim())         { setSubmitError("Mobile number is required"); return; }
//     if (!complaintForm.complaintTitle.trim())       { setSubmitError("Complaint title is required"); return; }
//     if (!complaintForm.complaintDescription.trim()) { setSubmitError("Please describe your complaint"); return; }

//     setSubmitting(true);
//     setSubmitError("");

//     const payload = {
//       ...complaintForm,
//       createdAt: Date.now(),
//     };

//     try {
//       // ✅ NO CHANGE — route is correct
//       await axiosInstance.post("/customer/complains", payload);
//       setSubmitSuccess(true);
//       setShowForm(false);
//     } catch (error) {
//       const msg = error.response?.data?.message || "Failed to submit complaint";
//       setSubmitError(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const warrantyOk = product ? isWarrantyValid(product) : false;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
//         @keyframes fadeUp    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
//         @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes spin      { to { transform: rotate(360deg); } }
//         .search-btn:hover  { background:#0f172a !important; transform:translateY(-1px); }
//         .field-input:focus { border-color:#6366f1 !important; background:#fff !important; }
//         .submit-btn:hover  { background:#4f46e5 !important; transform:translateY(-1px); }
//         .card-hover:hover  { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.1) !important; }
//       `}</style>

//       <div style={{ fontFamily:"'DM Sans',sans-serif", animation:"fadeUp 0.4s ease both" }}>

//         {/* ── PAGE HEADER ── */}
//         <div style={{ marginBottom:28 }}>
//           <h1 style={{ fontSize:26, fontWeight:800, color:"#0f172a", fontFamily:"'Sora',sans-serif", margin:"0 0 6px" }}>
//             Product Search
//           </h1>
//           <p style={{ fontSize:14, color:"#94a3b8", margin:0 }}>
//             Enter your ticket number to find your product and raise a complaint
//           </p>
//         </div>

//         {/* ── SEARCH BOX ── */}
//         <div style={{
//           background:"#fff", borderRadius:20, padding:"28px",
//           boxShadow:"0 1px 4px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9",
//           marginBottom:24,
//         }}>
//           <p style={{ fontSize:13, fontWeight:700, color:"#374151", marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>
//             🎫 Enter Ticket Number
//           </p>

//           <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
//             <input
//               type="text"
//               placeholder="e.g. TKT-20260214-25671"
//               value={ticketInput}
//               onChange={e => { setTicketInput(e.target.value); setSearchError(""); }}
//               onKeyDown={e => e.key === "Enter" && handleSearch()}
//               style={{
//                 flex:1, minWidth:200, padding:"13px 18px", borderRadius:12,
//                 border:"1.5px solid #e2e8f0", outline:"none",
//                 fontSize:15, fontFamily:"'DM Sans',sans-serif",
//                 background:"#f8fafc", color:"#0f172a",
//               }}
//               className="field-input"
//             />
//             <button
//               onClick={handleSearch}
//               disabled={searching}
//               className="search-btn"
//               style={{
//                 padding:"13px 28px", borderRadius:12,
//                 background:"#1e293b", color:"#fff",
//                 border:"none", fontSize:14, fontWeight:700,
//                 cursor: searching ? "not-allowed" : "pointer",
//                 fontFamily:"'DM Sans',sans-serif",
//                 display:"flex", alignItems:"center", gap:8,
//                 transition:"all 0.2s", opacity: searching ? 0.7 : 1,
//               }}
//             >
//               {searching ? (
//                 <>
//                   <span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.8s linear infinite" }} />
//                   Searching...
//                 </>
//               ) : "🔍 Search"}
//             </button>
//           </div>

//           {searchError && (
//             <div style={{
//               marginTop:14, padding:"11px 16px", borderRadius:10,
//               background:"#fef2f2", border:"1px solid #fecaca",
//               color:"#b91c1c", fontSize:13, fontWeight:600,
//               animation:"fadeIn 0.2s ease",
//             }}>
//               ❌ {searchError}
//             </div>
//           )}
//         </div>

//         {/* ── PRODUCT DETAILS ── */}
//         {product && (
//           <div style={{ animation:"fadeUp 0.4s ease both" }}>
//             <div style={{
//               background:"#fff", borderRadius:20, overflow:"hidden",
//               boxShadow:"0 1px 4px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9",
//               marginBottom:20,
//             }}>

//               {/* Card header */}
//               <div style={{
//                 background:"linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
//                 padding:"20px 28px",
//                 display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10,
//               }}>
//                 <div>
//                   <p style={{ color:"#94a3b8", fontSize:12, margin:"0 0 4px", fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>
//                     Product Found ✅
//                   </p>
//                   {/* ✅ CHANGE 3 — was product.productName, now product.proName */}
//                   {/* WHY: schema field is proName not productName */}
//                   <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:0, fontFamily:"'Sora',sans-serif" }}>
//                     {product.proName || "N/A"}
//                   </h2>
//                 </div>
//                 <div style={{
//                   padding:"8px 18px", borderRadius:20,
//                   background: warrantyOk ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
//                   border: `1px solid ${warrantyOk ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
//                   color: warrantyOk ? "#4ade80" : "#f87171",
//                   fontSize:13, fontWeight:700,
//                 }}>
//                   {warrantyOk ? "✅ Warranty Active" : "❌ Warranty Expired"}
//                 </div>
//               </div>

//               {/* ✅ CHANGE 4 — ALL field names updated to match schema */}
//               {/* WHY EACH CHANGED:
//                   product.ticketNumber   → product.TicketNumber   (capital T N in schema)
//                   product.productName    → product.proName        (schema uses proName)
//                   product.serialNumber   → product.proSrNo        (schema uses proSrNo)
//                   product.category       → product.proCatogory    (schema uses proCatogory)
//                   product.warrantyExpiry → removed (not in schema)
//                   product.customerName   → removed (commented out in schema)
//                   Added: brandName, proModNum, invoiceNum, purDate (these ARE in schema)
//               */}
//               <div style={{ padding:"24px 28px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:20 }}>
//                 {[
//                   { label:"Ticket Number",  value: product.TicketNumber },
//                   { label:"Product Name",   value: product.proName },
//                   { label:"Serial Number",  value: product.proSrNo },
//                   { label:"Category",       value: product.proCatogory },
//                   { label:"Brand",          value: product.brandName },
//                   { label:"Model Number",   value: product.proModNum },
//                   { label:"Invoice Number", value: product.invoiceNum },
//                   { label:"Purchase Date",  value: product.purDate ? new Date(product.purDate).toLocaleDateString() : "—" },
//                   { label:"last Date", value: product.warrEndDate },
//                 ].map(({ label, value }) => (
//                   <div key={label} className="card-hover" style={{
//                     background:"#f8fafc", borderRadius:12, padding:"14px 16px",
//                     border:"1px solid #f1f5f9", transition:"all 0.2s",
//                   }}>
//                     <p style={{ fontSize:11, color:"#94a3b8", fontWeight:700, margin:"0 0 6px", textTransform:"uppercase", letterSpacing:0.8 }}>
//                       {label}
//                     </p>
//                     <p style={{ fontSize:15, color:"#0f172a", fontWeight:700, margin:0, fontFamily:"'Sora',sans-serif" }}>
//                       {value || "—"}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Warranty button or expired message */}
//               <div style={{ padding:"0 28px 24px" }}>
//                 {warrantyOk ? (
//                   <button
//                     onClick={() => { setShowForm(true); setSubmitSuccess(false); setSubmitError(""); }}
//                     className="submit-btn"
//                     style={{
//                       padding:"13px 28px", borderRadius:12,
//                       background:"#6366f1", color:"#fff",
//                       border:"none", fontSize:14, fontWeight:700,
//                       cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
//                       boxShadow:"0 4px 14px rgba(99,102,241,0.35)",
//                       transition:"all 0.2s",
//                     }}
//                   >
//                     📝 Raise a Complaint
//                   </button>
//                 ) : (
//                   <div style={{
//                     padding:"14px 18px", borderRadius:12,
//                     background:"#fef2f2", border:"1px solid #fecaca",
//                     color:"#b91c1c", fontSize:14, fontWeight:600,
//                   }}>
//                     ⚠️ Warranty has expired. Complaints can only be raised for products under warranty.
//                     {/* 
//                       ✅ TO ENABLE WARRANTY:
//                       Uncomment warrEndDate in your productDetails.model.js schema:
//                       warrEndDate: { type: Date, required: true }
//                       Then add warrEndDate when creating products in admin panel
//                     */}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ── COMPLAINT FORM ── */}
//             {showForm && warrantyOk && (
//               <div style={{
//                 background:"#fff", borderRadius:20, padding:"28px",
//                 boxShadow:"0 4px 20px rgba(99,102,241,0.1)",
//                 border:"1.5px solid #e0e7ff",
//                 animation:"slideDown 0.3s ease both",
//               }}>
//                 <div style={{ marginBottom:22 }}>
//                   <h3 style={{ fontSize:19, fontWeight:800, color:"#0f172a", fontFamily:"'Sora',sans-serif", margin:"0 0 5px" }}>
//                     Raise a Complaint
//                   </h3>
//                   <p style={{ fontSize:13, color:"#94a3b8", margin:0 }}>
//                     Fill in the details below. Product info is auto-filled.
//                   </p>
//                 </div>

//                 {submitError && (
//                   <div style={{ padding:"11px 16px", borderRadius:10, background:"#fef2f2", border:"1px solid #fecaca", color:"#b91c1c", fontSize:13, fontWeight:600, marginBottom:18 }}>
//                     ❌ {submitError}
//                   </div>
//                 )}

//                 <form onSubmit={handleComplaintSubmit}>
//                   <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16, marginBottom:16 }}>

//                     <Field label="Customer Name *"  name="customerName"  placeholder="Your full name"        value={complaintForm.customerName}  onChange={handleFormChange} />
//                     <Field label="Mobile Number *"  name="mobileNumber"  placeholder="e.g. 9876543210"       value={complaintForm.mobileNumber}  onChange={handleFormChange} />
//                     <Field label="Product Name"     name="productName"   value={complaintForm.productName}   onChange={handleFormChange} readOnly hint="Auto-filled from product" />
//                     <Field label="Serial Number"    name="serialNumber"  value={complaintForm.serialNumber}  onChange={handleFormChange} readOnly hint="Auto-filled from product" />
//                     <Field label="Ticket Number"    name="ticketNumber"  value={complaintForm.ticketNumber}  onChange={handleFormChange} readOnly hint="Auto-filled from search" />
//                     <Field label="Status"           name="status"        value={complaintForm.status}        onChange={handleFormChange} readOnly hint="Default: Pending" />

//                     <div style={{ gridColumn:"1 / -1" }}>
//                       <Field label="Complaint Title *" name="complaintTitle" placeholder="e.g. Device not powering on" value={complaintForm.complaintTitle} onChange={handleFormChange} />
//                     </div>

//                     <div style={{ gridColumn:"1 / -1" }}>
//                       <label style={lbl}>Complaint Description *</label>
//                       <textarea
//                         name="complaintDescription"
//                         placeholder="Describe your issue in detail..."
//                         value={complaintForm.complaintDescription}
//                         onChange={handleFormChange}
//                         rows={4}
//                         className="field-input"
//                         style={{ ...inp, resize:"vertical" }}
//                       />
//                     </div>

//                     <div style={{ gridColumn:"1 / -1" }}>
//                       <label style={lbl}>Submitted At</label>
//                       <div style={{ ...inp, background:"#f1f5f9", color:"#64748b", display:"flex", alignItems:"center" }}>
//                         🕐 {new Date(complaintForm.createdAt).toLocaleString()}
//                       </div>
//                     </div>
//                   </div>

//                   <div style={{ display:"flex", gap:12, justifyContent:"flex-end" }}>
//                     <button type="button" onClick={() => setShowForm(false)}
//                       style={{ padding:"12px 24px", borderRadius:12, border:"1.5px solid #e2e8f0", background:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", color:"#64748b", fontFamily:"'DM Sans',sans-serif" }}>
//                       Cancel
//                     </button>
//                     <button type="submit" disabled={submitting}
//                       className="submit-btn"
//                       style={{
//                         padding:"12px 28px", borderRadius:12,
//                         background:"#6366f1", color:"#fff",
//                         border:"none", fontSize:14, fontWeight:700,
//                         cursor: submitting ? "not-allowed" : "pointer",
//                         fontFamily:"'DM Sans',sans-serif",
//                         boxShadow:"0 4px 14px rgba(99,102,241,0.3)",
//                         transition:"all 0.2s", opacity: submitting ? 0.7 : 1,
//                         display:"flex", alignItems:"center", gap:8,
//                       }}>
//                       {submitting ? "Submitting..." : "✅ Submit Complaint"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {/* ── SUCCESS MESSAGE ── */}
//             {submitSuccess && (
//               <div style={{
//                 background:"#f0fdf4", border:"1.5px solid #86efac",
//                 borderRadius:20, padding:"28px",
//                 textAlign:"center", animation:"fadeUp 0.4s ease both",
//               }}>
//                 <p style={{ fontSize:48, marginBottom:12 }}>🎉</p>
//                 <h3 style={{ fontSize:20, fontWeight:800, color:"#166534", fontFamily:"'Sora',sans-serif", margin:"0 0 8px" }}>
//                   Complaint Submitted!
//                 </h3>
//                 <p style={{ fontSize:14, color:"#15803d", margin:"0 0 20px" }}>
//                   Your complaint has been received. Our team will contact you shortly.
//                 </p>
//                 <button
//                   onClick={() => { setProduct(null); setTicketInput(""); setSubmitSuccess(false); }}
//                   style={{ padding:"11px 24px", borderRadius:12, background:"#166534", color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}
//                 >
//                   Search Another Product
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// // ── REUSABLE FIELD COMPONENT ──
// const Field = ({ label, name, placeholder, value, onChange, readOnly, hint }) => (
//   <div>
//     <label style={lbl}>{label}</label>
//     <input
//       type="text"
//       name={name}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       readOnly={readOnly}
//       className="field-input"
//       style={{
//         ...inp,
//         background: readOnly ? "#f1f5f9" : "#f8fafc",
//         color:      readOnly ? "#64748b" : "#0f172a",
//         cursor:     readOnly ? "default" : "text",
//       }}
//     />
//     {hint && <p style={{ fontSize:11, color:"#94a3b8", margin:"5px 0 0" }}>ℹ️ {hint}</p>}
//   </div>
// );

// const lbl = {
//   display:"block", fontSize:13, fontWeight:700,
//   color:"#374151", marginBottom:7,
//   fontFamily:"'DM Sans',sans-serif",
// };

// const inp = {
//   width:"100%", padding:"12px 16px",
//   borderRadius:10, border:"1.5px solid #e2e8f0",
//   outline:"none", fontSize:14,
//   fontFamily:"'DM Sans',sans-serif",
//   transition:"border-color 0.15s, background 0.15s",
//   boxSizing:"border-box",
// };

// export default UserPanelHome;

// src/userPanel/UserPanelHome.jsx
import React, { useState } from "react";
import axiosInstance from "../../Utils/axiosIntance";

const UserPanelHome = () => {

  const [ticketInput, setTicketInput]     = useState("");
  const [product, setProduct]             = useState(null);
  const [searchError, setSearchError]     = useState("");
  const [searching, setSearching]         = useState(false);
  const [showForm, setShowForm]           = useState(false);
  const [submitting, setSubmitting]       = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError]     = useState("");

  const [complaintForm, setComplaintForm] = useState({
    customerName:         "",
    mobileNumber:         "",
    productName:          "",
    serialNumber:         "",
    complaintTitle:       "",
    complaintDescription: "",
    ticketNumber:         "",
    status:               "Pending",
    createdAt:            Date.now(),
  });

  // SEARCH HANDLER
  const handleSearch = async () => {
    if (!ticketInput.trim()) {
      setSearchError("Please enter a ticket number");
      return;
    }
    setSearching(true);
    setSearchError("");
    setProduct(null);
    setShowForm(false);
    setSubmitSuccess(false);

    try {
      const res = await axiosInstance.post("/customer/search", {
        ticketNumber: ticketInput.trim(),
      });

      const foundProduct = res.data.product;
      console.log("Found Product:", foundProduct);
      setProduct(foundProduct);

      setComplaintForm(prev => ({
        ...prev,
        productName:  foundProduct.proName      || "",
        serialNumber: foundProduct.proSrNo      || "",
        ticketNumber: foundProduct.TicketNumber || ticketInput,
        createdAt:    Date.now(),
      }));

    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      setSearchError(msg);
    } finally {
      setSearching(false);
    }
  };

  // WARRANTY CHECK
  // warrEndDate(future) > today = true  = VALID   = show complaint form
  // warrEndDate(past)   > today = false = EXPIRED = show expired message
  // warrEndDate missing         = false = EXPIRED = show expired message
  const isWarrantyValid = (product) => {
    if (!product?.warrEndDate) {
      console.log("No warrEndDate found");
      return false;
    }
    const warrantyEndDate = new Date(product.warrEndDate);
    const today           = new Date();
    console.log("Warranty End:", warrantyEndDate);
    console.log("Today:", today);
    console.log("Warranty Valid:", warrantyEndDate > today);
    return warrantyEndDate > today;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setComplaintForm(prev => ({ ...prev, [name]: value }));
  };

  // SUBMIT COMPLAINT → POST /api/customer/complains
  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    if (!complaintForm.customerName.trim())         { setSubmitError("Customer name is required"); return; }
    if (!complaintForm.mobileNumber.trim())         { setSubmitError("Mobile number is required"); return; }
    if (!complaintForm.complaintTitle.trim())       { setSubmitError("Complaint title is required"); return; }
    if (!complaintForm.complaintDescription.trim()) { setSubmitError("Please describe your complaint"); return; }

    setSubmitting(true);
    setSubmitError("");

    const payload = {
      customerName:         complaintForm.customerName,
      mobileNumber:         complaintForm.mobileNumber,
      productName:          complaintForm.productName,
      serialNumber:         complaintForm.serialNumber,
      complaintTitle:       complaintForm.complaintTitle,
      complaintDescription: complaintForm.complaintDescription,
      ticketNumber:         complaintForm.ticketNumber,
      status:               "Pending",
      createdAt:            Date.now(),
    };

    console.log("Complaint payload:", payload);

    try {
      const res = await axiosInstance.post("/customer/complains", payload);
      console.log("Success:", res.data);
      setSubmitSuccess(true);
      setShowForm(false);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to submit complaint";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const warrantyOk = product ? isWarrantyValid(product) : false;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeUp    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin      { to { transform: rotate(360deg); } }
        .search-btn:hover  { background:#0f172a !important; transform:translateY(-1px); }
        .field-input:focus { border-color:#6366f1 !important; background:#fff !important; }
        .submit-btn:hover  { background:#4f46e5 !important; transform:translateY(-1px); }
        .card-hover:hover  { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.1) !important; }
      `}</style>

      <div style={{ fontFamily:"'DM Sans',sans-serif", animation:"fadeUp 0.4s ease both" }}>

        {/* PAGE HEADER */}
        <div style={{ marginBottom:28 }}>
          <h1 style={{ fontSize:26, fontWeight:800, color:"#0f172a", fontFamily:"'Sora',sans-serif", margin:"0 0 6px" }}>Product Search</h1>
          <p style={{ fontSize:14, color:"#94a3b8", margin:0 }}>Enter your ticket number to find your product and raise a complaint</p>
        </div>

        {/* SEARCH BOX */}
        <div style={{ background:"#fff", borderRadius:20, padding:"28px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9", marginBottom:24 }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#374151", marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>🎫 Enter Ticket Number</p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <input
              type="text" placeholder="e.g. TKT-20260214-25671"
              value={ticketInput}
              onChange={e => { setTicketInput(e.target.value); setSearchError(""); }}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              className="field-input"
              style={{ flex:1, minWidth:200, padding:"13px 18px", borderRadius:12, border:"1.5px solid #e2e8f0", outline:"none", fontSize:15, fontFamily:"'DM Sans',sans-serif", background:"#f8fafc", color:"#0f172a" }}
            />
            <button onClick={handleSearch} disabled={searching} className="search-btn"
              style={{ padding:"13px 28px", borderRadius:12, background:"#1e293b", color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor: searching ? "not-allowed" : "pointer", fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s", opacity: searching ? 0.7 : 1 }}>
              {searching ? (<><span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.8s linear infinite" }} />Searching...</>) : "🔍 Search"}
            </button>
          </div>
          {searchError && (
            <div style={{ marginTop:14, padding:"11px 16px", borderRadius:10, background:"#fef2f2", border:"1px solid #fecaca", color:"#b91c1c", fontSize:13, fontWeight:600, animation:"fadeIn 0.2s ease" }}>
              ❌ {searchError}
            </div>
          )}
        </div>

        {/* PRODUCT DETAILS */}
        {product && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            <div style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9", marginBottom:20 }}>

              {/* Card Header with Warranty Badge */}
              <div style={{ background:"linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding:"20px 28px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
                <div>
                  <p style={{ color:"#94a3b8", fontSize:12, margin:"0 0 4px", fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>Product Found ✅</p>
                  <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:0, fontFamily:"'Sora',sans-serif" }}>{product.proName || "N/A"}</h2>
                </div>
                {/* GREEN = warranty valid, RED = expired */}
                <div style={{ padding:"8px 18px", borderRadius:20, background: warrantyOk ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", border: `1px solid ${warrantyOk ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`, color: warrantyOk ? "#4ade80" : "#f87171", fontSize:13, fontWeight:700 }}>
                  {warrantyOk ? "✅ Warranty Active" : "❌ Warranty Expired"}
                </div>
              </div>

              {/* Product Info Grid */}
              <div style={{ padding:"24px 28px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:20 }}>
                {[
                  { label:"Ticket Number",  value: product.TicketNumber },
                  { label:"Product Name",   value: product.proName },
                  { label:"Serial Number",  value: product.proSrNo },
                  { label:"Category",       value: product.proCatogory },
                  { label:"Brand",          value: product.brandName },
                  { label:"Model Number",   value: product.proModNum },
                  { label:"Invoice Number", value: product.invoiceNum },
                  { label:"Purchase Date",  value: product.purDate ? new Date(product.purDate).toLocaleDateString() : "—" },
                  { label:"Warranty Ends",  value: product.warrEndDate ? new Date(product.warrEndDate).toLocaleDateString() : "Not Set" },
                ].map(({ label, value }) => (
                  <div key={label} className="card-hover" style={{ background:"#f8fafc", borderRadius:12, padding:"14px 16px", border:"1px solid #f1f5f9", transition:"all 0.2s" }}>
                    <p style={{ fontSize:11, color:"#94a3b8", fontWeight:700, margin:"0 0 6px", textTransform:"uppercase", letterSpacing:0.8 }}>{label}</p>
                    <p style={{ fontSize:15, color:"#0f172a", fontWeight:700, margin:0, fontFamily:"'Sora',sans-serif" }}>{value || "—"}</p>
                  </div>
                ))}
              </div>

              {/* WARRANTY BUTTON OR EXPIRED MESSAGE */}
              <div style={{ padding:"0 28px 24px" }}>
                {warrantyOk ? (
                  // warrEndDate > today → show this button
                  <button onClick={() => { setShowForm(true); setSubmitSuccess(false); setSubmitError(""); }} className="submit-btn"
                    style={{ padding:"13px 28px", borderRadius:12, background:"#6366f1", color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 14px rgba(99,102,241,0.35)", transition:"all 0.2s" }}>
                    📝 Raise a Complaint
                  </button>
                ) : (
                  // warrEndDate < today OR missing → show this message
                  <div style={{ padding:"14px 18px", borderRadius:12, background:"#fef2f2", border:"1px solid #fecaca", color:"#b91c1c", fontSize:14, fontWeight:600 }}>
                    ⚠️ Warranty has expired. Complaints can only be raised for products under active warranty.
                  </div>
                )}
              </div>
            </div>

            {/* COMPLAINT FORM — only shows when warrantyOk=true AND showForm=true */}
            {showForm && warrantyOk && (
              <div style={{ background:"#fff", borderRadius:20, padding:"28px", boxShadow:"0 4px 20px rgba(99,102,241,0.1)", border:"1.5px solid #e0e7ff", animation:"slideDown 0.3s ease both" }}>
                <div style={{ marginBottom:22 }}>
                  <h3 style={{ fontSize:19, fontWeight:800, color:"#0f172a", fontFamily:"'Sora',sans-serif", margin:"0 0 5px" }}>Raise a Complaint</h3>
                  <p style={{ fontSize:13, color:"#94a3b8", margin:0 }}>Fill in the details below. Product info is auto-filled.</p>
                </div>

                {submitError && (
                  <div style={{ padding:"11px 16px", borderRadius:10, background:"#fef2f2", border:"1px solid #fecaca", color:"#b91c1c", fontSize:13, fontWeight:600, marginBottom:18 }}>❌ {submitError}</div>
                )}

                <form onSubmit={handleComplaintSubmit}>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16, marginBottom:16 }}>
                    <Field label="Customer Name *" name="customerName" placeholder="Your full name"   value={complaintForm.customerName} onChange={handleFormChange} />
                    <Field label="Mobile Number *" name="mobileNumber" placeholder="e.g. 9876543210" value={complaintForm.mobileNumber} onChange={handleFormChange} />
                    <Field label="Product Name"    name="productName"  value={complaintForm.productName}  onChange={handleFormChange} readOnly hint="Auto-filled from product" />
                    <Field label="Serial Number"   name="serialNumber" value={complaintForm.serialNumber} onChange={handleFormChange} readOnly hint="Auto-filled from product" />
                    <Field label="Ticket Number"   name="ticketNumber" value={complaintForm.ticketNumber} onChange={handleFormChange} readOnly hint="Auto-filled from search" />
                    <Field label="Status"          name="status"       value={complaintForm.status}       onChange={handleFormChange} readOnly hint="Default: Pending" />
                    <div style={{ gridColumn:"1 / -1" }}>
                      <Field label="Complaint Title *" name="complaintTitle" placeholder="e.g. Device not powering on" value={complaintForm.complaintTitle} onChange={handleFormChange} />
                    </div>
                    <div style={{ gridColumn:"1 / -1" }}>
                      <label style={lbl}>Complaint Description *</label>
                      <textarea name="complaintDescription" placeholder="Describe your issue in detail..." value={complaintForm.complaintDescription} onChange={handleFormChange} rows={4} className="field-input" style={{ ...inp, resize:"vertical" }} />
                    </div>
                    <div style={{ gridColumn:"1 / -1" }}>
                      <label style={lbl}>Submitted At</label>
                      <div style={{ ...inp, background:"#f1f5f9", color:"#64748b", display:"flex", alignItems:"center" }}>
                        🕐 {new Date(complaintForm.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:12, justifyContent:"flex-end" }}>
                    <button type="button" onClick={() => setShowForm(false)}
                      style={{ padding:"12px 24px", borderRadius:12, border:"1.5px solid #e2e8f0", background:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", color:"#64748b", fontFamily:"'DM Sans',sans-serif" }}>
                      Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="submit-btn"
                      style={{ padding:"12px 28px", borderRadius:12, background:"#6366f1", color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor: submitting ? "not-allowed" : "pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 14px rgba(99,102,241,0.3)", transition:"all 0.2s", opacity: submitting ? 0.7 : 1, display:"flex", alignItems:"center", gap:8 }}>
                      {submitting ? "Submitting..." : "✅ Submit Complaint"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {submitSuccess && (
              <div style={{ background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:20, padding:"28px", textAlign:"center", animation:"fadeUp 0.4s ease both" }}>
                <p style={{ fontSize:48, marginBottom:12 }}>🎉</p>
                <h3 style={{ fontSize:20, fontWeight:800, color:"#166534", fontFamily:"'Sora',sans-serif", margin:"0 0 8px" }}>Complaint Submitted!</h3>
                <p style={{ fontSize:14, color:"#15803d", margin:"0 0 20px" }}>Your complaint has been received. Our team will contact you shortly.</p>
                <button onClick={() => { setProduct(null); setTicketInput(""); setSubmitSuccess(false); }}
                  style={{ padding:"11px 24px", borderRadius:12, background:"#166534", color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                  Search Another Product
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const Field = ({ label, name, placeholder, value, onChange, readOnly, hint }) => (
  <div>
    <label style={lbl}>{label}</label>
    <input type="text" name={name} placeholder={placeholder} value={value} onChange={onChange} readOnly={readOnly} className="field-input"
      style={{ ...inp, background: readOnly ? "#f1f5f9" : "#f8fafc", color: readOnly ? "#64748b" : "#0f172a", cursor: readOnly ? "default" : "text" }} />
    {hint && <p style={{ fontSize:11, color:"#94a3b8", margin:"5px 0 0" }}>ℹ️ {hint}</p>}
  </div>
);

const lbl = { display:"block", fontSize:13, fontWeight:700, color:"#374151", marginBottom:7, fontFamily:"'DM Sans',sans-serif" };
const inp = { width:"100%", padding:"12px 16px", borderRadius:10, border:"1.5px solid #e2e8f0", outline:"none", fontSize:14, fontFamily:"'DM Sans',sans-serif", transition:"border-color 0.15s, background 0.15s", boxSizing:"border-box" };

export default UserPanelHome;

// c9b94bf96919


