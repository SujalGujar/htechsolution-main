// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../Utils/axiosIntance';

// // Import icons
// import { 
//   AlertCircle, 
//   Search, 
//   Filter, 
//   ChevronLeft, 
//   ChevronRight,
//   Clock,
//   CheckCircle,
//   RefreshCw,
//   User,
//   Phone,
//   Package,
//   Hash,
//   FileText,
//   Calendar,
//   Edit
// } from 'lucide-react';

// const CustomerCareComplains = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [filteredComplaints, setFilteredComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // State for search and filters
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
  
//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
  
//   // State for updating status
//   const [updatingId, setUpdatingId] = useState(null);

//   // Fetch complaints from API
//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log("📡 Fetching complaints from /customerDetails/cusComplains");
//       const response = await axiosInstance.get("/customerDetails/cusComplains");
      
//       console.log("✅ Complaints fetched:", response.data);
      
//       // Handle different response structures
//       let complaintsData = [];
//       if (response.data.complaints) {
//         complaintsData = response.data.complaints;
//       } else if (Array.isArray(response.data)) {
//         complaintsData = response.data;
//       } else if (response.data.data && Array.isArray(response.data.data)) {
//         complaintsData = response.data.data;
//       }
      
//       console.log("Processed complaints data:", complaintsData);
      
//       // If there's no status field in MongoDB, we'll add it locally for UI
//       // Default to 'pending' for all complaints
//       complaintsData = complaintsData.map(complaint => ({
//         ...complaint,
//         // If status doesn't exist in DB, default to 'pending'
//         status: complaint.status || 'pending'
//       }));
      
//       setComplaints(complaintsData);
//       setFilteredComplaints(complaintsData);
      
//     } catch (err) {
//       console.error("❌ Error fetching complaints:", err);
//       setError(err.response?.data?.message || "Failed to fetch complaints");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load complaints on component mount
//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   // Filter complaints based on search and status
//   useEffect(() => {
//     let filtered = complaints;
    
//     // Apply status filter
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(c => c.status === statusFilter);
//     }
    
//     // Apply search filter
//     if (searchTerm.trim()) {
//       filtered = filtered.filter(complaint => 
//         complaint.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         complaint.ticketNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         complaint.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         complaint.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         complaint.mobileNumber?.toString().includes(searchTerm) ||
//         complaint.complaintTitle?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     setFilteredComplaints(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, complaints]);

//   // Update complaint status
//   const updateStatus = async (complaintId, newStatus) => {
//     try {
//       setUpdatingId(complaintId);
      
//       console.log(`📡 Updating complaint ${complaintId} to status: ${newStatus}`);
      
//       // Since your MongoDB doesn't have status field, you'll need to:
//       // OPTION 1: Add status field to MongoDB (recommended)
//       // OPTION 2: Store status in a different collection
//       // OPTION 3: Update locally only (temporary)
      
//       // For now, let's update locally
//       setComplaints(prev => 
//         prev.map(c => 
//           c._id === complaintId ? { ...c, status: newStatus } : c
//         )
//       );
      
//       // Uncomment this when you add status field to backend
//       // const response = await axiosInstance.put(`/customerDetails/complains/${complaintId}`, {
//       //   status: newStatus
//       // });
      
//       // Show success message
//       alert(`Status updated to ${newStatus}`);
      
//     } catch (err) {
//       console.error("❌ Error updating status:", err);
//       alert("Failed to update status. Please try again.");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   // Get status badge styles
//   const getStatusBadge = (status) => {
//     switch(status) {
//       case 'pending':
//         return {
//           bg: 'bg-yellow-100',
//           text: 'text-yellow-800',
//           label: 'Pending',
//           icon: <Clock className="w-3 h-3" />
//         };
//       case 'processing':
//         return {
//           bg: 'bg-blue-100',
//           text: 'text-blue-800',
//           label: 'Processing',
//           icon: <RefreshCw className="w-3 h-3" />
//         };
//       case 'completed':
//         return {
//           bg: 'bg-green-100',
//           text: 'text-green-800',
//           label: 'Completed',
//           icon: <CheckCircle className="w-3 h-3" />
//         };
//       default:
//         return {
//           bg: 'bg-gray-100',
//           text: 'text-gray-800',
//           label: 'Pending',
//           icon: <Clock className="w-3 h-3" />
//         };
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-center">
//           <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
//           <p className="text-gray-500">Loading complaints...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md">
//           <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
//           <p className="text-red-600 text-sm mb-3">{error}</p>
//           <button
//             onClick={fetchComplaints}
//             className="px-5 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Customer Complaints</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage and track all customer complaints
//         </p>
//       </div>

//       {/* Filters Bar */}
//       <div className="mb-6 flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Search by name, ticket, product..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
//           />
//         </div>

//         <div className="relative w-full sm:w-48">
//           <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="processing">Processing</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>

//         <button
//           onClick={fetchComplaints}
//           className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-600"
//         >
//           <RefreshCw className="w-4 h-4" />
//           Refresh
//         </button>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white rounded-lg p-4 border border-gray-200">
//           <p className="text-sm text-gray-500">Total Complaints</p>
//           <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
//         </div>
//         <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
//           <p className="text-sm text-yellow-600">Pending</p>
//           <p className="text-2xl font-bold text-yellow-700">
//             {complaints.filter(c => c.status === 'pending').length}
//           </p>
//         </div>
//         <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//           <p className="text-sm text-blue-600">Processing</p>
//           <p className="text-2xl font-bold text-blue-700">
//             {complaints.filter(c => c.status === 'processing').length}
//           </p>
//         </div>
//         <div className="bg-green-50 rounded-lg p-4 border border-green-200">
//           <p className="text-sm text-green-600">Completed</p>
//           <p className="text-2xl font-bold text-green-700">
//             {complaints.filter(c => c.status === 'completed').length}
//           </p>
//         </div>
//       </div>

//       {/* Debug Info - Remove after fixing */}
//       {complaints.length === 0 && !loading && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//           <p className="text-blue-700 text-sm">
//             No complaints found. Debug info: 
//             Check if API is returning data. Open browser console (F12) to see logs.
//           </p>
//         </div>
//       )}

//       {/* Complaints List */}
//       {currentItems.length === 0 ? (
//         <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
//           <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//           <p className="text-gray-500">No complaints found</p>
//           {searchTerm && (
//             <button
//               onClick={() => setSearchTerm('')}
//               className="mt-2 text-orange-500 text-sm hover:text-orange-600"
//             >
//               Clear search
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {currentItems.map((complaint) => {
//             const statusBadge = getStatusBadge(complaint.status);
            
//             return (
//               <div
//                 key={complaint._id}
//                 className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
//               >
//                 {/* Header with Customer Info */}
//                 <div className="bg-gradient-to-r from-orange-50 to-transparent p-4 border-b border-gray-100">
//                   <div className="flex flex-wrap items-center justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                       <div className="bg-orange-100 rounded-full p-2">
//                         <User className="w-5 h-5 text-orange-600" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-900">
//                           {complaint.customerName || 'N/A'}
//                         </h3>
//                         <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//                           <span className="flex items-center gap-1">
//                             <Phone className="w-3.5 h-3.5" />
//                             {complaint.mobileNumber || 'N/A'}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${statusBadge.bg} ${statusBadge.text}`}>
//                       {statusBadge.icon}
//                       {statusBadge.label}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Complaint Details */}
//                 <div className="p-4">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {/* Product Info */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sm">
//                         <Package className="w-4 h-4 text-gray-400" />
//                         <span className="text-gray-600">Product:</span>
//                         <span className="font-medium text-gray-900">
//                           {complaint.productName || 'N/A'}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm">
//                         <Hash className="w-4 h-4 text-gray-400" />
//                         <span className="text-gray-600">Serial:</span>
//                         <span className="font-medium text-gray-900">
//                           {complaint.serialNumber || 'N/A'}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Ticket Info */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sm">
//                         <Hash className="w-4 h-4 text-gray-400" />
//                         <span className="text-gray-600">Ticket #:</span>
//                         <span className="font-medium text-gray-900 font-mono">
//                           {complaint.ticketNumber || 'N/A'}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm">
//                         <Calendar className="w-4 h-4 text-gray-400" />
//                         <span className="text-gray-600">Created:</span>
//                         <span className="font-medium text-gray-900">
//                           {formatDate(complaint.createdAt)}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Status Update Buttons */}
//                     <div className="space-y-2">
//                       <div className="text-sm text-gray-600">Update Status:</div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => updateStatus(complaint._id, 'pending')}
//                           disabled={updatingId === complaint._id}
//                           className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
//                             complaint.status === 'pending'
//                               ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
//                               : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-800'
//                           }`}
//                         >
//                           Pending
//                         </button>
                        
//                         <button
//                           onClick={() => updateStatus(complaint._id, 'processing')}
//                           disabled={updatingId === complaint._id}
//                           className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
//                             complaint.status === 'processing'
//                               ? 'bg-blue-100 text-blue-800 cursor-not-allowed'
//                               : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-800'
//                           }`}
//                         >
//                           Processing
//                         </button>
                        
//                         <button
//                           onClick={() => updateStatus(complaint._id, 'completed')}
//                           disabled={updatingId === complaint._id}
//                           className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
//                             complaint.status === 'completed'
//                               ? 'bg-green-100 text-green-800 cursor-not-allowed'
//                               : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-800'
//                           }`}
//                         >
//                           Completed
//                         </button>
//                       </div>
//                       {updatingId === complaint._id && (
//                         <div className="flex justify-center">
//                           <RefreshCw className="w-3 h-3 animate-spin text-orange-500" />
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Complaint Title & Description */}
//                   <div className="mt-4 pt-4 border-t border-gray-100">
//                     <h4 className="text-sm font-medium text-gray-900 mb-2">
//                       {complaint.complaintTitle || 'No title'}
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       {complaint.complaintDescription || 'No description'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Pagination */}
//       {filteredComplaints.length > 0 && (
//         <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200">
//           <div className="text-sm text-gray-500">
//             Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredComplaints.length)} of {filteredComplaints.length} results
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//             <span className="px-4 py-2 text-sm">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//             >
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerCareComplains;
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utils/axiosIntance';

import {
  AlertCircle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  RefreshCw,
  User,
  Phone,
  Package,
  Hash,
  Calendar,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  const isSuccess = toast.type === 'success';
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200 ${
      isSuccess
        ? 'bg-green-50 border-green-200 text-green-800'
        : 'bg-red-50 border-red-200 text-red-800'
    }`}>
      {isSuccess
        ? <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
        : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
      {toast.message}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">✕</button>
    </div>
  );
};

const CustomerCareComplains = () => {
  const [complaints, setComplaints]           = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState(null);
  const [searchTerm, setSearchTerm]           = useState('');
  const [statusFilter, setStatusFilter]       = useState('all');
  const [currentPage, setCurrentPage]         = useState(1);
  const [itemsPerPage]                        = useState(5);
  const [updatingId, setUpdatingId]           = useState(null);
  const [toast, setToast]                     = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/customerDetails/cusComplains");

      // ✅ FIX: Check ALL possible response key names
      // Backend returns "complains" (no 't') — this was the missing case
      let complaintsData = [];
      if (response.data.complaints) {
        // "complaints" with t
        complaintsData = response.data.complaints;
      } else if (response.data.complains) {
        // ✅ "complains" without t — THIS was the bug, this key was never checked
        complaintsData = response.data.complains;
      } else if (Array.isArray(response.data)) {
        // plain array
        complaintsData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        complaintsData = response.data.data;
      }

      // Default status to 'pending' if not set in DB
      complaintsData = complaintsData.map(c => ({
        ...c,
        status: c.status || 'pending',
      }));

      setComplaints(complaintsData);
      setFilteredComplaints(complaintsData);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaints(); }, []);

  // ── Search + Filter ────────────────────────────────────────────────────────
  useEffect(() => {
    let filtered = complaints;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.customerName?.toLowerCase().includes(q) ||
        c.ticketNumber?.toLowerCase().includes(q) ||
        c.productName?.toLowerCase().includes(q) ||
        c.serialNumber?.toLowerCase().includes(q) ||
        c.mobileNumber?.toString().includes(searchTerm) ||
        c.complaintTitle?.toLowerCase().includes(q) ||
        c.subject?.toLowerCase().includes(q) ||          // extra field names
        c.description?.toLowerCase().includes(q)
      );
    }

    setFilteredComplaints(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, complaints]);

  // ── Update Status ──────────────────────────────────────────────────────────
  const updateStatus = async (complaintId, newStatus) => {
    // Don't re-update if already that status
    const current = complaints.find(c => c._id === complaintId);
    if (current?.status === newStatus) return;

    try {
      setUpdatingId(complaintId);

      // ✅ Optimistic UI update first
      setComplaints(prev =>
        prev.map(c => c._id === complaintId ? { ...c, status: newStatus } : c)
      );

      // ✅ Persist to backend
      await axiosInstance.put(`/customerDetails/cusComplains/${complaintId}`, {
        status: newStatus,
      });

      showToast('success', `Status updated to "${newStatus}" successfully`);

    } catch (err) {
      // ✅ Rollback on failure
      setComplaints(prev =>
        prev.map(c => c._id === complaintId ? { ...c, status: current?.status } : c)
      );
      showToast('error', err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  // ── Pagination ─────────────────────────────────────────────────────────────
  const indexOfLastItem  = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems     = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages       = Math.ceil(filteredComplaints.length / itemsPerPage);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch { return 'Invalid Date'; }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':    return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending',    icon: <Clock className="w-3 h-3" /> };
      case 'processing': return { bg: 'bg-blue-100',   text: 'text-blue-800',   label: 'Processing', icon: <RefreshCw className="w-3 h-3" /> };
      case 'completed':  return { bg: 'bg-green-100',  text: 'text-green-800',  label: 'Completed',  icon: <CheckCircle className="w-3 h-3" /> };
      default:           return { bg: 'bg-gray-100',   text: 'text-gray-800',   label: 'Pending',    icon: <Clock className="w-3 h-3" /> };
    }
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500">Loading complaints...</p>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600 text-sm mb-3">{error}</p>
          <button onClick={fetchComplaints} className="px-5 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer Complaints</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and track all customer complaints</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{complaints.filter(c => c.status === 'pending').length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-600">Processing</p>
          <p className="text-2xl font-bold text-blue-700">{complaints.filter(c => c.status === 'processing').length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-600">Completed</p>
          <p className="text-2xl font-bold text-green-700">{complaints.filter(c => c.status === 'completed').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, ticket, product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
          />
        </div>

        <div className="relative w-full sm:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          onClick={fetchComplaints}
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-600"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* ✅ Debug helper — only shows when data is truly empty after loading */}
      {complaints.length === 0 && !loading && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-sm text-amber-800">
          <strong>No data received.</strong> Open browser DevTools → Network tab → find the{' '}
          <code className="bg-amber-100 px-1 rounded">cusComplains</code> request and check what key
          the response uses: <code className="bg-amber-100 px-1 rounded">complaints</code>,{' '}
          <code className="bg-amber-100 px-1 rounded">complains</code>, or a plain array.
          All three are now handled automatically.
        </div>
      )}

      {/* Empty */}
      {currentItems.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No complaints found</p>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
              className="mt-2 text-orange-500 text-sm hover:text-orange-600"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {currentItems.map((complaint) => {
            const badge = getStatusBadge(complaint.status);
            const isUpdating = updatingId === complaint._id;

            return (
              <div
                key={complaint._id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-orange-50 to-transparent p-4 border-b border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 rounded-full p-2">
                        <User className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {complaint.customerName || 'N/A'}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <Phone className="w-3.5 h-3.5" />
                          {complaint.mobileNumber || 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${badge.bg} ${badge.text}`}>
                      {badge.icon}
                      {badge.label}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Product */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Product:</span>
                        <span className="font-medium text-gray-900">{complaint.productName || complaint.proName || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Serial:</span>
                        <span className="font-medium text-gray-900">{complaint.serialNumber || complaint.proSrNo || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Ticket */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Ticket #:</span>
                        <span className="font-medium text-gray-900 font-mono">{complaint.ticketNumber || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium text-gray-900">{formatDate(complaint.createdAt)}</span>
                      </div>
                    </div>

                    {/* Status Buttons */}
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600 font-medium">Update Status:</div>
                      <div className="flex gap-2">
                        {['pending', 'processing', 'completed'].map((s) => {
                          const styles = {
                            pending:    { active: 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300', hover: 'hover:bg-yellow-50 hover:text-yellow-700' },
                            processing: { active: 'bg-blue-100 text-blue-800 ring-1 ring-blue-300',       hover: 'hover:bg-blue-50 hover:text-blue-700'   },
                            completed:  { active: 'bg-green-100 text-green-800 ring-1 ring-green-300',    hover: 'hover:bg-green-50 hover:text-green-700' },
                          };
                          const isActive = complaint.status === s;
                          return (
                            <button
                              key={s}
                              onClick={() => updateStatus(complaint._id, s)}
                              disabled={isUpdating || isActive}
                              className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                                isActive
                                  ? styles[s].active + ' cursor-default'
                                  : 'bg-gray-100 text-gray-600 ' + styles[s].hover
                              } disabled:opacity-60`}
                            >
                              {isUpdating && isActive
                                ? <RefreshCw className="w-3 h-3 animate-spin inline" />
                                : s.charAt(0).toUpperCase() + s.slice(1)
                              }
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Complaint Title + Description */}
                  {(complaint.complaintTitle || complaint.subject || complaint.complaintDescription || complaint.description) && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {(complaint.complaintTitle || complaint.subject) && (
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {complaint.complaintTitle || complaint.subject}
                        </h4>
                      )}
                      {(complaint.complaintDescription || complaint.description || complaint.message) && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {complaint.complaintDescription || complaint.description || complaint.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {filteredComplaints.length > 0 && (
        <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, filteredComplaints.length)} of {filteredComplaints.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-sm">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default CustomerCareComplains;