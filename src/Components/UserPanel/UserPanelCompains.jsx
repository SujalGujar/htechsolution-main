// // src/userPanel/UserPanelComplains.jsx
// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../Utils/axiosIntance";
// import {
//   AlertCircle,
//   CheckCircle2,
//   Clock,
//   PackageSearch,
//   Plus,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Search,
//   RefreshCw,
//   FileText,
//   Hash,
//   Calendar,
//   Package,
//   MessageSquare,
//   Loader2,
//   ChevronDown,
//   ChevronUp,
//   TicketCheck,
// } from "lucide-react";

// // ─── Status config ────────────────────────────────────────────────────────────
// const STATUS = {
//   open:       { label: "Open",       icon: AlertCircle,   bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   dot: "bg-blue-500"   },
//   pending:    { label: "Pending",    icon: Clock,         bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
//   inprogress: { label: "In Progress",icon: Loader2,       bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
//   resolved:   { label: "Resolved",   icon: CheckCircle2,  bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500"  },
//   closed:     { label: "Closed",     icon: X,             bg: "bg-gray-50",   text: "text-gray-600",   border: "border-gray-200",   dot: "bg-gray-400"   },
// };

// const getStatus = (raw = "") => {
//   const key = raw?.toLowerCase().replace(/\s/g, "") || "open";
//   return STATUS[key] || STATUS.open;
// };

// // ─── Status Badge ─────────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => {
//   const cfg  = getStatus(status);
//   const Icon = cfg.icon;
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
//       <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
//       {cfg.label}
//     </span>
//   );
// };

// // ─── Complaint Card ───────────────────────────────────────────────────────────
// const ComplaintCard = ({ item }) => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//       {/* Card header */}
//       <div className="p-4 sm:p-5">
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex items-start gap-3 flex-1 min-w-0">
//             <div className="bg-orange-50 rounded-xl p-2.5 flex-shrink-0 mt-0.5">
//               <MessageSquare className="w-4 h-4 text-orange-500" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug truncate">
//                 {item.subject || item.title || item.complaintTitle || "Complaint"}
//               </h3>
//               <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
//                 {(item.ticketNumber || item.ticket) && (
//                   <span className="flex items-center gap-1 text-xs text-gray-500">
//                     <TicketCheck className="w-3.5 h-3.5" />
//                     {item.ticketNumber || item.ticket}
//                   </span>
//                 )}
//                 {(item.createdAt || item.date) && (
//                   <span className="flex items-center gap-1 text-xs text-gray-400">
//                     <Calendar className="w-3.5 h-3.5" />
//                     {new Date(item.createdAt || item.date).toLocaleDateString("en-IN", {
//                       day: "numeric", month: "short", year: "numeric",
//                     })}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//           <StatusBadge status={item.status} />
//         </div>

//         {/* Product info strip */}
//         {(item.proName || item.productName || item.proSrNo || item.serialNumber) && (
//           <div className="mt-3 flex flex-wrap gap-2">
//             {(item.proName || item.productName) && (
//               <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-xs text-gray-600">
//                 <Package className="w-3.5 h-3.5 text-gray-400" />
//                 {item.proName || item.productName}
//               </span>
//             )}
//             {(item.proSrNo || item.serialNumber) && (
//               <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-xs text-gray-600 font-mono">
//                 <Hash className="w-3.5 h-3.5 text-gray-400" />
//                 {item.proSrNo || item.serialNumber}
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Expand toggle */}
//       {(item.description || item.message || item.complaint) && (
//         <>
//           <button
//             onClick={() => setExpanded(v => !v)}
//             className="w-full flex items-center justify-between px-5 py-2.5 bg-gray-50 border-t border-gray-100 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
//           >
//             <span>{expanded ? "Hide details" : "View details"}</span>
//             {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//           </button>

//           {expanded && (
//             <div className="px-5 py-4 border-t border-gray-100 bg-white">
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Description</p>
//               <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
//                 {item.description || item.message || item.complaint}
//               </p>
//               {/* Admin response if present */}
//               {(item.response || item.adminResponse || item.reply) && (
//                 <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-3">
//                   <p className="text-xs font-semibold text-green-700 mb-1">Support Response</p>
//                   <p className="text-sm text-green-800 leading-relaxed">
//                     {item.response || item.adminResponse || item.reply}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// // ─── Raise Complaint Modal ────────────────────────────────────────────────────
// const RaiseModal = ({ onClose, onSuccess }) => {
//   const [form, setForm]     = useState({ subject: "", description: "", ticketNumber: "" });
//   const [saving, setSaving] = useState(false);
//   const [err, setErr]       = useState("");

//   const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.subject.trim() || !form.description.trim()) {
//       setErr("Subject and description are required.");
//       return;
//     }
//     try {
//       setSaving(true);
//       setErr("");
//       await axiosInstance.post("/customerDetails/cusComplains", form);
//       onSuccess();
//     } catch (error) {
//       setErr(error.response?.data?.message || "Failed to submit complaint. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
//         {/* Modal header */}
//         <div className="flex items-center justify-between p-5 border-b border-gray-100">
//           <div>
//             <h2 className="text-base font-bold text-gray-900">Raise a Complaint</h2>
//             <p className="text-xs text-gray-500 mt-0.5">Our team will respond as soon as possible</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Modal body */}
//         <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
//           {err && (
//             <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-3 py-2.5 rounded-xl">
//               <AlertCircle className="w-4 h-4 flex-shrink-0" />
//               {err}
//             </div>
//           )}

//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold text-gray-700">
//               Subject <span className="text-red-500">*</span>
//             </label>
//             <input
//               name="subject"
//               value={form.subject}
//               onChange={onChange}
//               placeholder="e.g. Product not working after warranty claim"
//               className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
//               required
//             />
//           </div>

//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold text-gray-700">
//               Ticket Number <span className="text-gray-400 font-normal">(optional)</span>
//             </label>
//             <input
//               name="ticketNumber"
//               value={form.ticketNumber}
//               onChange={onChange}
//               placeholder="e.g. TKT-20260214-25671"
//               className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
//             />
//           </div>

//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold text-gray-700">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={onChange}
//               placeholder="Describe your issue in detail..."
//               rows={4}
//               className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
//               required
//             />
//           </div>

//           <div className="flex gap-3 pt-1">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={saving}
//               className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {saving ? (
//                 <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
//               ) : (
//                 "Submit Complaint"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // ─── Main Page ────────────────────────────────────────────────────────────────
// const UserPanelComplains = () => {
//   const [complaints, setComplaints]   = useState([]);
//   const [filtered, setFiltered]       = useState([]);
//   const [loading, setLoading]         = useState(false);
//   const [error, setError]             = useState(null);
//   const [searchTerm, setSearchTerm]   = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal]     = useState(false);
//   const [successMsg, setSuccessMsg]   = useState("");
//   const ITEMS_PER_PAGE = 5;

//   // ── Fetch complaints ─────────────────────────────────────────────────────
//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axiosInstance.get("/customerDetails/cusComplains");

//       const data =
//         response.data.complaints ||
//         response.data.complains  ||
//         (Array.isArray(response.data) ? response.data : []);

//       setComplaints(data);
//       setFiltered(data);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.");
//       } else if (err.response?.status === 404) {
//         setError("No complaints endpoint found. Please contact support.");
//       } else {
//         setError("Failed to load complaints. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   const fetchStatus = async(status) =>{
//     try{
//       setLoading(true);
//       setError(null);
//       const response = await axiosInstance.patch('/customerDetails/complainStatus', {status});
//       setSearchTerm(status);
//     } catch(err){
//       setError("Failed to update complaint status.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => { fetchComplaints(); }, []);

//   // ── Filter + Search ──────────────────────────────────────────────────────
//   useEffect(() => {
//     let result = complaints;

//     if (statusFilter !== "all") {
//       result = result.filter(
//         (c) => (c.status || "open").toLowerCase().replace(/\s/g, "") === statusFilter
//       );
//     }

//     if (searchTerm.trim()) {
//       const q = searchTerm.toLowerCase();
//       result = result.filter(
//         (c) =>
//           (c.subject || c.title || c.complaintTitle || "").toLowerCase().includes(q) ||
//           (c.ticketNumber || c.ticket || "").toLowerCase().includes(q) ||
//           (c.proName || c.productName || "").toLowerCase().includes(q) ||
//           (c.description || c.message || c.complaint || "").toLowerCase().includes(q)
//       );
//     }

//     setFiltered(result);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, complaints]);

//   // ── Pagination ────────────────────────────────────────────────────────────
//   const totalPages      = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const indexOfFirst    = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentItems    = filtered.slice(indexOfFirst, indexOfFirst + ITEMS_PER_PAGE);

//   // ── Stats ─────────────────────────────────────────────────────────────────
//   const stats = {
//     total:    complaints.length,
//     open:     complaints.filter(c => ["open","pending"].includes((c.status||"open").toLowerCase())).length,
//     resolved: complaints.filter(c => ["resolved","closed"].includes((c.status||"").toLowerCase())).length,
//   };

//   // ── Handle new complaint success ──────────────────────────────────────────
//   const handleSuccess = () => {
//     setShowModal(false);
//     setSuccessMsg("Complaint submitted successfully! Our team will get back to you shortly.");
//     setTimeout(() => setSuccessMsg(""), 4000);
//     fetchComplaints();
//   };

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <div className="max-w-3xl mx-auto">

//         {/* ── Page Title ── */}
//         <div className="mb-6">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Complaints</h1>
//           <p className="text-sm text-gray-500 mt-1">Track and manage all your support requests</p>
//         </div>

//         {/* ── Stats Strip ── */}
//         <div className="grid grid-cols-3 gap-3 mb-6">
//           {[
//             { label: "Total",    value: stats.total,    color: "text-gray-900",   bg: "bg-white" },
//             { label: "Open",     value: stats.open,     color: "text-blue-600",   bg: "bg-blue-50" },
//             { label: "Resolved", value: stats.resolved, color: "text-green-600",  bg: "bg-green-50" },
//           ].map(s => (
//             <div key={s.label} className={`${s.bg} border border-gray-100 rounded-2xl p-3 sm:p-4 text-center shadow-sm`}>
//               <p className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
//               <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* ── Success banner ── */}
//         {successMsg && (
//           <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4">
//             <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
//             {successMsg}
//           </div>
//         )}

//         {/* ── Toolbar ── */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-4">
//           {/* Search */}
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search complaints, ticket no…"
//               value={searchTerm}
//               // onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition"
//             />
//           </div>

//           {/* Status filter */}
//           <select
//             value={searchTerm}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition cursor-pointer"
//           >
//             <option value="all">All Status</option>
//             <option value="open">Open</option>
//             <option value="pending">Pending</option>
//             <option value="inprogress">In Progress</option>
//             <option value="resolved">Resolved</option>
//             <option value="closed">Closed</option>
//           </select>

//           {/* Refresh */}
//           <button
//             onClick={fetchComplaints}
//             disabled={loading}
//             className="p-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-500 transition-colors disabled:opacity-50"
//             title="Refresh"
//           >
//             <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
//           </button>

//           {/* Raise complaint */}
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-orange-200"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Raise Complaint</span>
//           </button>
//         </div>

//         {/* ── Record count ── */}
//         <p className="text-xs text-gray-400 mb-3">
//           Showing {filtered.length} of {complaints.length} complaint{complaints.length !== 1 ? "s" : ""}
//         </p>

//         {/* ── Loading ── */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-16 gap-3">
//             <div className="w-9 h-9 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
//             <p className="text-sm text-gray-500">Loading complaints…</p>
//           </div>
//         )}

//         {/* ── Error ── */}
//         {!loading && error && (
//           <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
//             <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
//             <p className="text-sm text-red-600 mb-3">{error}</p>
//             <button
//               onClick={fetchComplaints}
//               className="px-5 py-2 bg-red-100 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-200 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* ── Empty state ── */}
//         {!loading && !error && currentItems.length === 0 && (
//           <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center shadow-sm">
//             <PackageSearch className="w-12 h-12 text-gray-200 mx-auto mb-3" />
//             <p className="text-gray-500 font-medium text-sm">No complaints found</p>
//             <p className="text-gray-400 text-xs mt-1 mb-4">
//               {searchTerm || statusFilter !== "all"
//                 ? "Try changing your search or filter"
//                 : "You haven't raised any complaints yet"}
//             </p>
//             {(searchTerm || statusFilter !== "all") ? (
//               <button
//                 onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
//                 className="text-orange-500 text-sm hover:text-orange-600 font-medium"
//               >
//                 Clear filters
//               </button>
//             ) : (
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
//               >
//                 <Plus className="w-4 h-4" /> Raise Your First Complaint
//               </button>
//             )}
//           </div>
//         )}

//         {/* ── Complaints list ── */}
//         {!loading && !error && currentItems.length > 0 && (
//           <div className="flex flex-col gap-3">
//             {currentItems.map((item, i) => (
//               <ComplaintCard key={item._id || i} item={item} />
//             ))}
//           </div>
//         )}

//         {/* ── Pagination ── */}
//         {totalPages > 1 && (
//           <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm">
//             <span className="text-xs text-gray-500">
//               Page {currentPage} of {totalPages}
//             </span>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="p-2 border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="p-2 border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//       </div>

//       {/* ── Raise Complaint Modal ── */}
//       {showModal && (
//         <RaiseModal
//           onClose={() => setShowModal(false)}
//           onSuccess={handleSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default UserPanelComplains;

// src/userPanel/UserPanelComplains.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../Utils/axiosIntance";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  PackageSearch,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  RefreshCw,
  Hash,
  Calendar,
  Package,
  MessageSquare,
  Loader2,
  ChevronDown,
  ChevronUp,
  TicketCheck,
} from "lucide-react";

// ─── Status config ─────────────────────────────────────────────────────────
// These 3 values match exactly what CC panel saves to MongoDB via PATCH
// When user panel calls GET, item.status already has the latest value from DB
const STATUS = {
  pending:    { label: "Pending",    icon: Clock,        bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  processing: { label: "Processing", icon: Loader2,      bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   dot: "bg-blue-500"   },
  completed:  { label: "Completed",  icon: CheckCircle2, bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500"  },
};

const getStatus = (raw = "") => {
  const key = raw?.toLowerCase().trim();
  return STATUS[key] || STATUS.pending;
};

// ─── Status Badge ──────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg  = getStatus(status);
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

// ─── Complaint Card ────────────────────────────────────────────────────────
// const ComplaintCard = ({ item }) => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//       <div className="p-4 sm:p-5">
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex items-start gap-3 flex-1 min-w-0">
//             <div className="bg-orange-50 rounded-xl p-2.5 flex-shrink-0 mt-0.5">
//               <MessageSquare className="w-4 h-4 text-orange-500" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug truncate">
//                 {item.subject || item.title || item.complaintTitle || "Complaint"}
//               </h3>
//               <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
//                 {(item.ticketNumber || item.ticket) && (
//                   <span className="flex items-center gap-1 text-xs text-gray-500">
//                     <TicketCheck className="w-3.5 h-3.5" />
//                     {item.ticketNumber || item.ticket}
//                   </span>
//                 )}
//                 {(item.createdAt || item.date) && (
//                   <span className="flex items-center gap-1 text-xs text-gray-400">
//                     <Calendar className="w-3.5 h-3.5" />
//                     {new Date(item.createdAt || item.date).toLocaleDateString("en-IN", {
//                       day: "numeric", month: "short", year: "numeric",
//                     })}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//           {/* ✅ Reads item.status directly from DB — no extra API call needed */}
//           <StatusBadge status={item.status} />
//         </div>

//         {(item.proName || item.productName || item.proSrNo || item.serialNumber) && (
//           <div className="mt-3 flex flex-wrap gap-2">
//             {(item.proName || item.productName) && (
//               <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-xs text-gray-600">
//                 <Package className="w-3.5 h-3.5 text-gray-400" />
//                 {item.proName || item.productName}
//               </span>
//             )}
//             {(item.proSrNo || item.serialNumber) && (
//               <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-xs text-gray-600 font-mono">
//                 <Hash className="w-3.5 h-3.5 text-gray-400" />
//                 {item.proSrNo || item.serialNumber}
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       {(item.description || item.message || item.complaint) && (
//         <>
//           <button
//             onClick={() => setExpanded(v => !v)}
//             className="w-full flex items-center justify-between px-5 py-2.5 bg-gray-50 border-t border-gray-100 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
//           >
//             <span>{expanded ? "Hide details" : "View details"}</span>
//             {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//           </button>

//           {expanded && (
//             <div className="px-5 py-4 border-t border-gray-100 bg-white">
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Description</p>
//               <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
//                 {item.description || item.message || item.complaint}
//               </p>
//               {(item.response || item.adminResponse || item.reply) && (
//                 <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-3">
//                   <p className="text-xs font-semibold text-green-700 mb-1">Support Response</p>
//                   <p className="text-sm text-green-800 leading-relaxed">
//                     {item.response || item.adminResponse || item.reply}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// ─── Raise Complaint Modal ─────────────────────────────────────────────────
const RaiseModal = ({ onClose, onSuccess }) => {
  const [form, setForm]     = useState({ subject: "", description: "", ticketNumber: "" });
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState("");

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.description.trim()) {
      setErr("Subject and description are required.");
      return;
    }
    try {
      setSaving(true);
      setErr("");
      await axiosInstance.post("/customerDetails/cusComplains", form);
      onSuccess();
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to submit complaint. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Raise a Complaint</h2>
            <p className="text-xs text-gray-500 mt-0.5">Our team will respond as soon as possible</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {err && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-3 py-2.5 rounded-xl">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {err}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">Subject <span className="text-red-500">*</span></label>
            <input name="subject" value={form.subject} onChange={onChange} placeholder="e.g. Product not working after warranty claim"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">Ticket Number <span className="text-gray-400 font-normal">(optional)</span></label>
            <input name="ticketNumber" value={form.ticketNumber} onChange={onChange} placeholder="e.g. TKT-20260214-25671"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">Description <span className="text-red-500">*</span></label>
            <textarea name="description" value={form.description} onChange={onChange} placeholder="Describe your issue in detail..." rows={4}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition" required />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────
const UserPanelComplains = () => {
  const [complaints, setComplaints]     = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState(null);
  const [searchTerm, setSearchTerm]     = useState("");    // ✅ only for text search
  const [statusFilter, setStatusFilter] = useState("all"); // ✅ only for status dropdown
  const [currentPage, setCurrentPage]   = useState(1);
  const [showModal, setShowModal]       = useState(false);
  const [successMsg, setSuccessMsg]     = useState("");
  const ITEMS_PER_PAGE = 5;

  // ── Fetch ──────────────────────────────────────────────────────────────
  // ✅ Only GET is needed here — status field already in DB thanks to CC panel PATCH
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/customerDetails/cusComplains");
      const data =
        response.data.complaints ||
        response.data.complains  ||
        (Array.isArray(response.data) ? response.data : []);
      setComplaints(data);
      setFiltered(data);
    } catch (err) {
      if (err.response?.status === 401)      setError("Session expired. Please login again.");
      else if (err.response?.status === 404) setError("No complaints found. Please contact support.");
      else                                   setError("Failed to load complaints. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ fetchStatus REMOVED — user panel never needs to call PATCH
  // CC panel calls PATCH → saves to DB → user panel GET automatically gets updated status

  useEffect(() => { fetchComplaints(); }, []);

  // ── Filter + Search ────────────────────────────────────────────────────
  useEffect(() => {
    let result = complaints;

    // ✅ statusFilter controls the dropdown — completely separate from searchTerm
    if (statusFilter !== "all") {
      result = result.filter(
        (c) => (c.status || "pending").toLowerCase().trim() === statusFilter
      );
    }

    // ✅ searchTerm controls text search input only
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          (c.subject || c.title || c.complaintTitle || "").toLowerCase().includes(q) ||
          (c.ticketNumber || c.ticket || "").toLowerCase().includes(q) ||
          (c.proName || c.productName || "").toLowerCase().includes(q) ||
          (c.description || c.message || c.complaint || "").toLowerCase().includes(q)
      );
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, complaints]);

  // ── Pagination ─────────────────────────────────────────────────────────
  const totalPages   = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const indexOfFirst = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(indexOfFirst, indexOfFirst + ITEMS_PER_PAGE);

  // ── Stats ──────────────────────────────────────────────────────────────
  const stats = {
    total:      complaints.length,
    pending:    complaints.filter(c => (c.status || "pending") === "pending").length,
    processing: complaints.filter(c => c.status === "processing").length,
    completed:  complaints.filter(c => c.status === "completed").length,
  };

  const handleSuccess = () => {
    setShowModal(false);
    setSuccessMsg("Complaint submitted! Our team will get back to you shortly.");
    setTimeout(() => setSuccessMsg(""), 4000);
    fetchComplaints();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Complaints</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage all your support requests</p>
        </div>

        {/* Stats — now shows Pending / Processing / Completed to match backend values */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total",      value: stats.total,      color: "text-gray-900",   bg: "bg-white"     },
            { label: "Pending",    value: stats.pending,    color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Processing", value: stats.processing, color: "text-blue-600",   bg: "bg-blue-50"   },
            { label: "Completed",  value: stats.completed,  color: "text-green-600",  bg: "bg-green-50"  },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border border-gray-100 rounded-2xl p-3 sm:p-4 text-center shadow-sm`}>
              <p className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            {successMsg}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">

          {/* ✅ Search — onChange restored (was commented out before) */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search complaints, ticket no…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition"
            />
          </div>

          {/* ✅ Status filter — value fixed to statusFilter (was wrongly bound to searchTerm) */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>

          <button onClick={fetchComplaints} disabled={loading}
            className="p-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-500 transition-colors disabled:opacity-50" title="Refresh">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          {/* <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-orange-200">
            <Plus className="w-4 h-4" />
            <span>Raise Complaint</span>
          </button> */}
        </div>

        <p className="text-xs text-gray-400 mb-3">
          Showing {filtered.length} of {complaints.length} complaint{complaints.length !== 1 ? "s" : ""}
        </p>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-9 h-9 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading complaints…</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-sm text-red-600 mb-3">{error}</p>
            <button onClick={fetchComplaints} className="px-5 py-2 bg-red-100 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-200 transition-colors">Retry</button>
          </div>
        )}

        {!loading && !error && currentItems.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center shadow-sm">
            <PackageSearch className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium text-sm">No complaints found</p>
            <p className="text-gray-400 text-xs mt-1 mb-4">
              {searchTerm || statusFilter !== "all" ? "Try changing your search or filter" : "You haven't raised any complaints yet"}
            </p>
            {/* {(searchTerm || statusFilter !== "all") ? (
              <button onClick={() => { setSearchTerm(""); setStatusFilter("all"); }} className="text-orange-500 text-sm hover:text-orange-600 font-medium">Clear filters</button>
            ) : (
              <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">
                <Plus className="w-4 h-4" /> Raise Your First Complaint
              </button>
            )} */}
          </div>
        )}

        {!loading && !error && currentItems.length > 0 && (
          <div className="flex flex-col gap-3">
            {currentItems.map((item, i) => (
              <ComplaintCard key={item._id || i} item={item} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {showModal && <RaiseModal onClose={() => setShowModal(false)} onSuccess={handleSuccess} />}
    </div>
  );
};

export default UserPanelComplains;