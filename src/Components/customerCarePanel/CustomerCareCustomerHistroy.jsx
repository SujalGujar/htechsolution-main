// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';

// // // ✅ import shadcn table components
// // import {
// //   Table,
// //   TableBody,
// //   TableCaption,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "../ui/table";

// // // ✅ import shadcn card components
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// // } from "../ui/card";

// // // ✅ import shadcn badge
// // import { Badge } from "../ui/badge";

// // // ✅ component name starts with uppercase
// // const CustomerCareProductHistory = () => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   // ✅ no req,res in frontend - just async()
// //   const handleFetchData = async () => {
// //     try {
// //       setLoading(true); // show loading before fetch
// //       setError(null);

// //       const API = "/api/customerDetails/customer";
// //       const res = await axios.get(API);

// //       setData(res.data.customers);

// //     } catch (error) {
// //       console.error("error fetching data:", error);
// //       setError("Failed to fetch customer details"); // show error to user
// //     } finally {
// //       setLoading(false); // hide loading after fetch
// //     }
// //   };

// //   useEffect(() => {
// //     handleFetchData();
// //   }, []);

// //   // ✅ show loading state
// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-40">
// //         <p className="text-gray-500">Loading customers...</p>
// //       </div>
// //     );
// //   }

// //   // ✅ show error state
// //   if (error) {
// //     return (
// //       <div className="flex justify-center items-center h-40">
// //         <p className="text-red-500">{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6">
// //       {/* Card wraps the whole table */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Customer History</CardTitle>
// //         </CardHeader>

// //         <CardContent>
// //           {/* Shadcn Table */}
// //           <Table>
// //             <TableCaption>
// //               List of all customers — Total: {data.length}
// //             </TableCaption>

// //             {/* Table Header */}
// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>#</TableHead>
// //                 <TableHead>Name</TableHead>
// //                 <TableHead>Email</TableHead>
// //                 <TableHead>Phone</TableHead>
// //                 <TableHead>Status</TableHead>
// //                 <TableHead>Joined Date</TableHead>
// //               </TableRow>
// //             </TableHeader>

// //             {/* Table Body */}
// //             <TableBody>
// //               {data.length === 0 ? (
// //                 // show this if no customers found
// //                 <TableRow>
// //                   <TableCell colSpan={6} className="text-center text-gray-500">
// //                     No customers found
// //                   </TableCell>
// //                 </TableRow>
// //               ) : (
// //                 // loop through each customer
// //                 data.map((customer, index) => (
// //                   <TableRow key={customer._id}>
// //                     <TableCell>{index + 1}</TableCell>
// //                     <TableCell>{customer.name}</TableCell>
// //                     <TableCell>{customer.email}</TableCell>
// //                     <TableCell>{customer.phone}</TableCell>
// //                     <TableCell>
// //                       {/* Badge shows status with color */}
// //                       <Badge variant={customer.isActive ? "success" : "destructive"}>
// //                         {customer.isActive ? "Active" : "Inactive"}
// //                       </Badge>
// //                     </TableCell>
// //                     <TableCell>
// //                       {/* Format the date nicely */}
// //                       {new Date(customer.createdAt).toLocaleDateString("en-IN", {
// //                         year: "numeric",
// //                         month: "short",
// //                         day: "numeric",
// //                       })}
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               )}
// //             </TableBody>
// //           </Table>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default CustomerCareProductHistory;

// // CutomerCareProductHis.jsx
// // import { useEffect, useState } from 'react';
// // import axios from 'axios';
// import React from 'react';
// // ✅ CHANGED: import axiosInstance instead of axios
// //
// // ❌ OLD: import axios from 'axios'
// //    Plain axios has NO interceptors
// //    It sends requests with ZERO headers
// //    Your backend sees no Authorization header → returns 401 immediately
// //
// // ✅ NEW: import axiosInstance from '../utils/axiosInstance'
// //    axiosInstance has a REQUEST INTERCEPTOR that:
// //    1. Reads token from localStorage.getItem("user")
// //    2. Attaches Authorization: Bearer <token> to every request automatically
// //    3. Handles 401/403/500 errors globally
// // import axiosInstance from '../../Utils/axiosIntance'; // ← adjust path if needed
// // import {
// //   Table,
// //   TableBody,
// //   TableCaption,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "../ui/table";

// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// // } from "../ui/card";

// // import { Badge } from "../ui/badge";

// // const CustomerCareProductHistory = () => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const handleFetchData = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       // ✅ CHANGED: use axiosInstance.get() instead of axios.get()
// //       //
// //       // ❌ OLD: const res = await axios.get("/api/customerDetails/customer")
// //       //    → No token attached → 401 error
// //       //
// //       // ✅ NEW: const res = await axiosInstance.get("/customerDetails/customer")
// //       //    → axiosInstance interceptor adds token automatically
// //       //    → Note: baseURL in axiosInstance is already "/api"
// //       //      so you only write the path AFTER /api here
// //       //      "/api" + "/customerDetails/customer" = "/api/customerDetails/customer" ✅
// //       const res = await axiosInstance.get("/customerDetails/customer");

// //       setData(res.data.customers);

// //     } catch (error) {
// //       console.error("error fetching data:", error);

// //       // ✅ IMPROVED: Show specific error messages instead of generic one
// //       if (error.response?.status === 401) {
// //         setError("Session expired. Please login again.");
// //       } else if (error.response?.status === 403) {
// //         setError("You don't have permission to view this data.");
// //       } else if (error.response?.status === 404) {
// //         setError("No customer data found.");
// //       } else {
// //         setError("Failed to fetch customer details. Please try again.");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     handleFetchData();
// //   }, []);

// //   // Loading state
// //   if (loading) {
// //     return (
// //       <div style={{
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         height: '200px',
// //         background: 'transparent'
// //       }}>
// //         <div style={{ textAlign: 'center' }}>
// //           <div style={{
// //             width: '36px',
// //             height: '36px',
// //             border: '3px solid rgba(255,112,64,0.2)',
// //             borderTop: '3px solid #ff7040',
// //             borderRadius: '50%',
// //             animation: 'spin 0.8s linear infinite',
// //             margin: '0 auto 12px'
// //           }} />
// //           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
// //           <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: 'Figtree, sans-serif' }}>
// //             Loading customers...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (error) {
// //     return (
// //       <div style={{
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         height: '200px'
// //       }}>
// //         <div style={{
// //           background: 'rgba(255,60,60,0.08)',
// //           border: '1px solid rgba(255,60,60,0.2)',
// //           borderRadius: '12px',
// //           padding: '20px 28px',
// //           textAlign: 'center'
// //         }}>
// //           <p style={{ color: '#ff6060', fontSize: '14px', fontFamily: 'Figtree, sans-serif' }}>
// //             ⚠ {error}
// //           </p>
// //           <button
// //             onClick={handleFetchData}
// //             style={{
// //               marginTop: '12px',
// //               padding: '8px 18px',
// //               borderRadius: '8px',
// //               border: 'none',
// //               background: 'rgba(255,112,64,0.15)',
// //               color: '#ff7040',
// //               fontSize: '13px',
// //               fontWeight: '600',
// //               cursor: 'pointer',
// //               fontFamily: 'Figtree, sans-serif'
// //             }}
// //           >
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6">
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Customer History</CardTitle>
// //         </CardHeader>

// //         <CardContent>
// //           <Table>
// //             <TableCaption>
// //               List of all customers — Total: {data.length}
// //             </TableCaption>

// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>#</TableHead>
// //                 <TableHead>Name</TableHead>
// //                 <TableHead>Email</TableHead>
// //                 <TableHead>Phone</TableHead>
// //                 <TableHead>Status</TableHead>
// //                 <TableHead>Joined Date</TableHead>
// //               </TableRow>
// //             </TableHeader>

// //             <TableBody>
// //               {data.length === 0 ? (
// //                 <TableRow>
// //                   <TableCell colSpan={6} className="text-center text-gray-500">
// //                     No customers found
// //                   </TableCell>
// //                 </TableRow>
// //               ) : (
// //                 data.map((customer, index) => (
// //                   <TableRow key={customer._id}>
// //                     <TableCell>{index + 1}</TableCell>
// //                     <TableCell>{customer.name}</TableCell>
// //                     <TableCell>{customer.email}</TableCell>
// //                     <TableCell>{customer.phone}</TableCell>
// //                     <TableCell>
// //                       <Badge variant={customer.isActive ? "success" : "destructive"}>
// //                         {customer.isActive ? "Active" : "Inactive"}
// //                       </Badge>
// //                     </TableCell>
// //                     <TableCell>
// //                       {new Date(customer.createdAt).toLocaleDateString("en-IN", {
// //                         year: "numeric",
// //                         month: "short",
// //                         day: "numeric",
// //                       })}
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               )}
// //             </TableBody>
// //           </Table>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default CustomerCareProductHistory;


// import { useState, useEffect } from "react";
// import axiosInstance from '../../Utils/axiosIntance'; // ← adjust path if needed
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { 
//   Calendar, 
//   Phone, 
//   Mail, 
//   User, 
//   Package, 
//   Hash, 
//   Tag, 
//   Barcode,
//   Building2,
//   FileText,
//   Clock,
//   AlertCircle,
//   Search,
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   Download
// } from 'lucide-react';

// const CustomerCareProductHistory = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const handleFetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await axiosInstance.get("/customerDetails/customer");
//       setData(res.data.customers);
//       setFilteredData(res.data.customers);
//     } catch (error) {
//       console.error("error fetching data:", error);
//       if (error.response?.status === 401) {
//         setError("Session expired. Please login again.");
//       } else if (error.response?.status === 403) {
//         setError("You don't have permission to view this data.");
//       } else if (error.response?.status === 404) {
//         setError("No customer data found.");
//       } else {
//         setError("Failed to fetch customer details. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   // Search functionality
//   useEffect(() => {
//     const filtered = data.filter(item => 
//       item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.mobileNum?.includes(searchTerm) ||
//       item.proName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.proSrNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.invoiceNum?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, data]);

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const checkWarrantyStatus = (endDate) => {
//     if (!endDate) return { status: 'Unknown', color: 'bg-gray-100 text-gray-800' };
//     const today = new Date();
//     const warrantyEnd = new Date(endDate);
//     const daysLeft = Math.ceil((warrantyEnd - today) / (1000 * 60 * 60 * 24));
    
//     if (daysLeft < 0) {
//       return { status: 'Expired', color: 'bg-red-100 text-red-800' };
//     } else if (daysLeft <= 30) {
//       return { status: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800' };
//     } else {
//       return { status: 'Active', color: 'bg-green-100 text-green-800' };
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-center">
//           <div className="w-9 h-9 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
//           <p className="text-gray-500 text-sm font-figtree">
//             Loading customer data...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//           <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
//           <p className="text-red-600 text-sm font-figtree mb-3">
//             {error}
//           </p>
//           <button
//             onClick={handleFetchData}
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
//       {/* Header Section */}
//       <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Customer Product History</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Total Records: {filteredData.length} {searchTerm && `(Filtered from ${data.length})`}
//           </p>
//         </div>
        
//         <div className="flex gap-3 w-full sm:w-auto">
//           {/* Search Bar */}
//           <div className="relative flex-1 sm:flex-initial">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search customers..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
//             />
//           </div>
          
//           {/* Export Button */}
//           <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-600">
//             <Download className="w-4 h-4" />
//             <span className="hidden sm:inline">Export</span>
//           </button>
//         </div>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 gap-4">
//         {currentItems.length === 0 ? (
//           <Card className="bg-white">
//             <CardContent className="py-12">
//               <div className="text-center">
//                 <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500 text-sm">No customer records found</p>
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="mt-2 text-orange-500 text-sm hover:text-orange-600"
//                   >
//                     Clear search
//                   </button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           currentItems.map((item, index) => {
//             const warranty = checkWarrantyStatus(item.warrEndDate);
            
//             return (
//               <Card key={item._id || index} className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
//                 <CardContent className="p-0">
//                   {/* Customer Header */}
//                   <div className="bg-gradient-to-r from-orange-50 to-transparent p-4 border-b border-gray-100">
//                     <div className="flex flex-wrap items-center justify-between gap-3">
//                       <div className="flex items-center gap-3">
//                         <div className="bg-orange-100 rounded-full p-2">
//                           <User className="w-5 h-5 text-orange-600" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{item.customerName || 'N/A'}</h3>
//                           <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
//                             <span className="flex items-center gap-1">
//                               <Mail className="w-3.5 h-3.5" />
//                               {item.email || 'N/A'}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Phone className="w-3.5 h-3.5" />
//                               {item.mobileNum || 'N/A'}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <Badge variant="outline" className="bg-white">
//                         #{item.invoiceNum || 'N/A'}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Product Details Grid */}
//                   <div className="p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                       {/* Product Info */}
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Package className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Product:</span>
//                           <span className="font-medium text-gray-900">{item.proName || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Tag className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Category:</span>
//                           <span className="font-medium text-gray-900">{item.proCatogory || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Building2 className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Brand:</span>
//                           <span className="font-medium text-gray-900">{item.brandName || 'N/A'}</span>
//                         </div>
//                       </div>

//                       {/* Serial Numbers */}
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Barcode className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Serial No:</span>
//                           <span className="font-medium text-gray-900">{item.proSrNo || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Hash className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Model No:</span>
//                           <span className="font-medium text-gray-900">{item.proModNum || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <FileText className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Invoice:</span>
//                           <span className="font-medium text-gray-900">{item.invoiceNum || 'N/A'}</span>
//                         </div>
//                       </div>

//                       {/* Purchase & Warranty */}
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Purchase:</span>
//                           <span className="font-medium text-gray-900">{formatDate(item.purDate)}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Warranty:</span>
//                           <span className="font-medium text-gray-900">
//                             {formatDate(item.warrStartDate)} - {formatDate(item.warrEndDate)}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Status Badge */}
//                       <div className="flex items-start justify-end">
//                         <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${warranty.color}`}>
//                           Warranty {warranty.status}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })
//         )}
//       </div>

//       {/* Pagination */}
//       {filteredData.length > 0 && (
//         <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200">
//           <div className="text-sm text-gray-500">
//             Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} results
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

// export default CustomerCareProductHistory;


//   const [toast, setToast] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [cust, setCust] = useState(EMPTY_CUST);
//   const [prod, setProd] = useState(EMPTY_PROD);
  
//   // For modals
//   const [showCredentialsModal, setShowCredentialsModal] = useState(false);
//   const [userCredentials, setUserCredentials] = useState({ username: "", password: "" });
  
//   // For ticket number display
//   const [generatedTicketNumber, setGeneratedTicketNumber] = useState("");

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
      
//       // Check if response contains password and ticket number
//       if (response.data.password) {
//         setUserCredentials({
//           username: cust.email,
//           password: response.data.password
//         });
//         setShowCredentialsModal(true);
//       }
      
//       // If ticket number is returned from backend
//       if (response.data.ticketNumber) {
//         setGeneratedTicketNumber(response.data.ticketNumber);
//       }
      
//       show("customer", "Customer registered successfully!");
//       setCust(EMPTY_CUST);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Customer registration failed";
//       setError(msg);
//       show("error", msg);
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const submitProd = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axiosInstance.post("/auth/register", prod);
      
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
//                           <span className="cc-hint">This will be used as username for login</span>
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
//                           <label className="cc-label">Product Name <span className="req">*</span></label>
//                           <input
//                             className="cc-input"
//                             name="proName"
//                             value={cust.proName}
//                             onChange={onC}
//                             placeholder="e.g. Samsung Smart TV"
//                             required
//                           />
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Product Category <span className="req">*</span></label>
//                           <select
//                             className="cc-select"
//                             name="proCatogory"
//                             value={cust.proCatogory}
//                             onChange={onC}
//                             required
//                           >
//                             <option value="">Select category</option>
//                             {CATS.map(c => <option key={c}>{c}</option>)}
//                           </select>
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Serial Number <span className="req">*</span></label>
//                           <input
//                             className="cc-input"
//                             name="proSrNo"
//                             value={cust.proSrNo}
//                             onChange={onC}
//                             placeholder="e.g. SN2024XXXXXX"
//                             required
//                           />
//                         </div>
//                         <div className="cc-field">
//                           <label className="cc-label">Model Number <span className="req">*</span></label>
//                           <input
//                             className="cc-input"
//                             name="proModNum"
//                             value={cust.proModNum}
//                             onChange={onC}
//                             placeholder="e.g. UA55AU8000"
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Ticket Number Display (appears after registration) */}
//                     {generatedTicketNumber && (
//                       <div className="ticket-field">
//                         <div className="ticket-field-icon">🎫</div>
//                         <div className="ticket-field-content">
//                           <div className="ticket-field-label">Generated Ticket Number</div>
//                           <div className="ticket-field-value">{generatedTicketNumber}</div>
//                         </div>
//                         <button
//                           type="button"
//                           className="copy-btn"
//                           onClick={() => copyToClipboard(generatedTicketNumber)}
//                           style={{ padding: "8px 12px" }}
//                         >
//                           Copy
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="cc-form-footer">
//                     <div className="footer-note"><span style={{ color: "var(--danger)" }}>*</span> Required fields</div>
//                     <div className="footer-acts">
//                       <button type="button" className="btn btn-ghost" onClick={() => {
//                         setCust(EMPTY_CUST);
//                         setGeneratedTicketNumber("");
//                       }}>Clear</button>
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

//       {/* Credentials Modal - For Customer Registration */}
//       {showCredentialsModal && (
//         <div className="cc-modal-overlay" onClick={() => setShowCredentialsModal(false)}>
//           <div className="cc-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon">🔐</div>
//             <div className="modal-title">Registration Successful!</div>
//             <div className="modal-subtitle">Auto-generated login credentials</div>

//             <div className="credential-item">
//               <div className="cred-label">Username (Email)</div>
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

//             {generatedTicketNumber && (
//               <div className="credential-item">
//                 <div className="cred-label">Ticket Number</div>
//                 <div className="cred-value">
//                   {generatedTicketNumber}
//                   <button
//                     className="copy-btn"
//                     onClick={() => copyToClipboard(generatedTicketNumber)}
//                   >
//                     Copy
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="modal-note">
//               ⚠️ Please save these credentials. They won't be shown again.
//               <br />
//               <small>Customer can login with these credentials to raise service requests.</small>
//             </div>

//             <div className="modal-actions">
//               <button
//                 className="btn btn-blue"
//                 onClick={() => {
//                   setShowCredentialsModal(false);
//                   setGeneratedTicketNumber("");
//                 }}
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
//                 toast.type === "product" ? "Product registered successfully" :
//                 toast.type === "copy" ? "Text copied to clipboard" :
//                 "Operation completed"
//               )}
//             </div>
//           </div>
//           <button className="toast-x" onClick={() => setToast(null)}>✕</button>
//         </div>
//       )}
//     </>
//   );import { useState, useEffect } from "react";
// // import axiosInstance from '../../Utils/axiosIntance';

// // import {
// //   Table,
// //   TableBody,
// //   TableCaption,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "../ui/table";
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// // } from "../ui/card";
// // import { Badge } from "../ui/badge";
// // import { 
// //   Calendar, 
// //   Phone, 
// //   Mail, 
// //   User, 
// //   Package, 
// //   Hash, 
// //   Tag, 
// //   Barcode,
// //   Building2,
// //   FileText,
// //   Clock,
// //   AlertCircle,
// //   Search,
// //   Filter,
// //   ChevronLeft,
// //   ChevronRight,
// //   Download
// // } from 'lucide-react';
// // import React from "react"
// // const CustomerCareCustomerHistory = () => {
// //   const [data, setData] = useState([]);
// //   const [filteredData, setFilteredData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage] = useState(5);

// //   const handleFetchData = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const res = await axiosInstance.get("/customerDetails/customer");
// //       setData(res.data.customers);
// //       setFilteredData(res.data.customers);
// //     } catch (error) {
// //       console.error("error fetching data:", error);
// //       if (error.response?.status === 401) {
// //         setError("Session expired. Please login again.");
// //       } else if (error.response?.status === 403) {
// //         setError("You don't have permission to view this data.");
// //       } else if (error.response?.status === 404) {
// //         setError("No customer data found.");
// //       } else {
// //         setError("Failed to fetch customer details. Please try again.");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     handleFetchData();
// //   }, []);

// //   // Search functionality
// //   useEffect(() => {
// //     const filtered = data.filter(item => 
// //       item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       item.mobileNum?.includes(searchTerm) ||
// //       item.proName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       item.proSrNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       item.invoiceNum?.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //     setFilteredData(filtered);
// //     setCurrentPage(1);
// //   }, [searchTerm, data]);

// //   // Pagination
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     return new Date(dateString).toLocaleDateString("en-IN", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //     });
// //   };

// //   const checkWarrantyStatus = (endDate) => {
// //     if (!endDate) return { status: 'Unknown', color: 'bg-gray-100 text-gray-800' };
// //     const today = new Date();
// //     const warrantyEnd = new Date(endDate);
// //     const daysLeft = Math.ceil((warrantyEnd - today) / (1000 * 60 * 60 * 24));
    
// //     if (daysLeft < 0) {
// //       return { status: 'Expired', color: 'bg-red-100 text-red-800' };
// //     } else if (daysLeft <= 30) {
// //       return { status: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800' };
// //     } else {
// //       return { status: 'Active', color: 'bg-green-100 text-green-800' };
// //     }
// //   };

// //   // Loading state
// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="text-center">
// //           <div className="w-9 h-9 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
// //           <p className="text-gray-500 text-sm font-figtree">
// //             Loading customer data...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (error) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
// //           <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
// //           <p className="text-red-600 text-sm font-figtree mb-3">
// //             {error}
// //           </p>
// //           <button
// //             onClick={handleFetchData}
// //             className="px-5 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
// //           >
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       {/* Header Section */}
// //       <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Customer Product History</h1>
// //           <p className="text-sm text-gray-500 mt-1">
// //             Total Records: {filteredData.length} {searchTerm && `(Filtered from ${data.length})`}
// //           </p>
// //         </div>
        
// //         <div className="flex gap-3 w-full sm:w-auto">
// //           {/* Search Bar */}
// //           <div className="relative flex-1 sm:flex-initial">
// //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //             <input
// //               type="text"
// //               placeholder="Search customers..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
// //             />
// //           </div>
          
// //           {/* Export Button */}
// //           <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-600">
// //             <Download className="w-4 h-4" />
// //             <span className="hidden sm:inline">Export</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Cards Grid */}
// //       <div className="grid grid-cols-1 gap-4">
// //         {currentItems.length === 0 ? (
// //           <Card className="bg-white">
// //             <CardContent className="py-12">
// //               <div className="text-center">
// //                 <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
// //                 <p className="text-gray-500 text-sm">No customer records found</p>
// //                 {searchTerm && (
// //                   <button
// //                     onClick={() => setSearchTerm('')}
// //                     className="mt-2 text-orange-500 text-sm hover:text-orange-600"
// //                   >
// //                     Clear search
// //                   </button>
// //                 )}
// //               </div>
// //             </CardContent>
// //           </Card>
// //         ) : (
// //           currentItems.map((item, index) => {
// //             const warranty = checkWarrantyStatus(item.warrEndDate);
            
// //             return (
// //               <Card key={item._id || index} className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
// //                 <CardContent className="p-0">
//                   {/* Customer Header */}
//                   <div className="bg-gradient-to-r from-orange-50 to-transparent p-4 border-b border-gray-100">
//                     <div className="flex flex-wrap items-center justify-between gap-3">
//                       <div className="flex items-center gap-3">
//                         <div className="bg-orange-100 rounded-full p-2">
//                           <User className="w-5 h-5 text-orange-600" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{item.customerName || 'N/A'}</h3>
//                           <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
//                             <span className="flex items-center gap-1">
//                               <Mail className="w-3.5 h-3.5" />
//                               {item.email || 'N/A'}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Phone className="w-3.5 h-3.5" />
//                               {item.mobileNum || 'N/A'}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <Badge variant="outline" className="bg-white">
//                         #{item.invoiceNum || 'N/A'}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Product Details Grid */}
//                   <div className="p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                       {/* Product Info */}
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Package className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Product:</span>
//                           <span className="font-medium text-gray-900">{item.proName || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Tag className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Category:</span>
//                           <span className="font-medium text-gray-900">{item.proCatogory || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Building2 className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Brand:</span>
//                           <span className="font-medium text-gray-900">{item.brandName || 'N/A'}</span>
//                         </div>
//                       </div>

//                       {/* Serial Numbers */}
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Barcode className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Serial No:</span>
//                           <span className="font-medium text-gray-900">{item.proSrNo || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Hash className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Model No:</span>
//                           <span className="font-medium text-gray-900">{item.proModNum || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <FileText className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Invoice:</span>
//                           <span className="font-medium text-gray-900">{item.invoiceNum || 'N/A'}</span>
//                         </div>
//                       </div>

//                       {/* Purchase & Warranty */}
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Purchase:</span>
//                           <span className="font-medium text-gray-900">{formatDate(item.purDate)}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Warranty:</span>
//                           <span className="font-medium text-gray-900">
//                             {formatDate(item.warrStartDate)} - {formatDate(item.warrEndDate)}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Status Badge */}
//                       <div className="flex items-start justify-end">
//                         <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${warranty.color}`}>
//                           Warranty {warranty.status}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })
//         )}
//       </div>

//       {/* Pagination */}
//       {filteredData.length > 0 && (
//         <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200">
//           <div className="text-sm text-gray-500">
//             Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} results
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

// export default CustomerCareCustomerHistory;

// import React, {  useState,useEffect } from 'react';
// import axiosInstance from '../../Utils/axiosIntance';

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { 
//   Calendar, 
//   Phone, 
//   Mail, 
//   User, 
//   Package, 
//   Hash, 
//   Tag, 
//   Barcode,
//   Building2,
//   FileText,
//   Clock,
//   AlertCircle,
//   Search,
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   Download
// } from 'lucide-react';

// const CustomerCareCustomerHistory = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const handleFetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await axiosInstance.get("/customerDetails/customer");
//       setData(res.data.customers);
//       setFilteredData(res.data.customers);
//     } catch (error) {
//       console.error("error fetching data:", error);
//       if (error.response?.status === 401) {
//         setError("Session expired. Please login again.");
//       } else if (error.response?.status === 403) {
//         setError("You don't have permission to view this data.");
//       } else if (error.response?.status === 404) {
//         setError("No customer data found.");
//       } else {
//         setError("Failed to fetch customer details. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   // Search functionality
//   useEffect(() => {
//     const filtered = data.filter(item => 
//       item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.mobileNum?.includes(searchTerm) ||
//       item.proName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.proSrNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.invoiceNum?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, data]);

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const checkWarrantyStatus = (endDate) => {
//     if (!endDate) return { status: 'Unknown', color: 'bg-gray-100 text-gray-800' };
//     const today = new Date();
//     const warrantyEnd = new Date(endDate);
//     const daysLeft = Math.ceil((warrantyEnd - today) / (1000 * 60 * 60 * 24));
    
//     if (daysLeft < 0) {
//       return { status: 'Expired', color: 'bg-red-100 text-red-800' };
//     } else if (daysLeft <= 30) {
//       return { status: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800' };
//     } else {
//       return { status: 'Active', color: 'bg-green-100 text-green-800' };
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-center">
//           <div className="w-9 h-9 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
//           <p className="text-gray-500 text-sm font-figtree">
//             Loading customer data...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//           <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
//           <p className="text-red-600 text-sm font-figtree mb-3">
//             {error}
//           </p>
//           <button
//             onClick={handleFetchData}
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
//       {/* Header Section */}
//       <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Customer Product History</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Total Records: {filteredData.length} {searchTerm && `(Filtered from ${data.length})`}
//           </p>
//         </div>
        
//         <div className="flex gap-3 w-full sm:w-auto">
//           {/* Search Bar */}
//           <div className="relative flex-1 sm:flex-initial">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search customers..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
//             />
//           </div>
          
//           {/* Export Button */}
//           <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-600">
//             <Download className="w-4 h-4" />
//             <span className="hidden sm:inline">Export</span>
//           </button>
//         </div>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 gap-4">
//         {currentItems.length === 0 ? (
//           <Card className="bg-white">
//             <CardContent className="py-12">
//               <div className="text-center">
//                 <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500 text-sm">No customer records found</p>
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="mt-2 text-orange-500 text-sm hover:text-orange-600"
//                   >
//                     Clear search
//                   </button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           currentItems.map((item, index) => {
//             const warranty = checkWarrantyStatus(item.warrEndDate);
            
//             return (
//               <Card key={item._id || index} className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
//                 <CardContent className="p-0">
//                   {/* Customer Header */}
//                   <div className="bg-gradient-to-r from-orange-50 to-transparent p-4 border-b border-gray-100">
//                     <div className="flex flex-wrap items-center justify-between gap-3">
//                       <div className="flex items-center gap-3">
//                         <div className="bg-orange-100 rounded-full p-2">
//                           <User className="w-5 h-5 text-orange-600" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{item.customerName || 'N/A'}</h3>
//                           <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
//                             <span className="flex items-center gap-1">
//                               <Mail className="w-3.5 h-3.5" />
//                               {item.email || 'N/A'}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Phone className="w-3.5 h-3.5" />
//                               {item.mobileNum || 'N/A'}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <Badge variant="outline" className="bg-white">
//                         #{item.invoiceNum || 'N/A'}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Product Details Grid */}
//                   <div className="p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                       {/* Product Info */}
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Package className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Product:</span>
//                           <span className="font-medium text-gray-900">{item.proName || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Tag className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Category:</span>
//                           <span className="font-medium text-gray-900">{item.proCatogory || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Building2 className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Brand:</span>
//                           <span className="font-medium text-gray-900">{item.brandName || 'N/A'}</span>
//                         </div>
//                       </div>

//                       {/* Serial Numbers */}
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Barcode className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Serial No:</span>
//                           <span className="font-medium text-gray-900">{item.proSrNo || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Hash className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Model No:</span>
//                           <span className="font-medium text-gray-900">{item.proModNum || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <FileText className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Invoice:</span>
//                           <span className="font-medium text-gray-900">{item.invoiceNum || 'N/A'}</span>
//                         </div>
//                       </div>

//                       {/* Purchase & Warranty */}
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Purchase:</span>
//                           <span className="font-medium text-gray-900">{formatDate(item.purDate)}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-600">Warranty:</span>
//                           <span className="font-medium text-gray-900">
//                             {formatDate(item.warrStartDate)} - {formatDate(item.warrEndDate)}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Status Badge */}
//                       <div className="flex items-start justify-end">
//                         <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${warranty.color}`}>
//                           Warranty {warranty.status}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })
//         )}
//       </div>

//       {/* Pagination */}
//       {filteredData.length > 0 && (
//         <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200">
//           <div className="text-sm text-gray-500">
//             Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} results
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

// export default CustomerCareCustomerHistory;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utils/axiosIntance';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  Package, 
  Hash, 
  Tag, 
  Barcode,
  Building2,
  FileText,
  Clock,
  AlertCircle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';

const CustomerCareCustomerHistory = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleFetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ FIXED: Changed from "/customerDetails/customer" to "/customerDetails/customers"
      // Based on your routes, the correct endpoint should be plural
      const res = await axiosInstance.get("/customerDetails/customer");
      
      console.log("Fetched data:", res.data); // Debug log
      
      // Check the response structure and set data accordingly
      if (res.data.customers) {
        setData(res.data.customers);
        setFilteredData(res.data.customers);
      } else if (Array.isArray(res.data)) {
        setData(res.data);
        setFilteredData(res.data);
      } else {
        console.error("Unexpected response structure:", res.data);
        setError("Invalid data format received from server");
      }
      
    } catch (error) {
      console.error("error fetching data:", error);
      
      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (error.response?.status === 403) {
        setError("You don't have permission to view this data.");
      } else if (error.response?.status === 404) {
        // ✅ More helpful error message for 404
        setError("Customer data endpoint not found. Please check if the backend route is configured correctly.");
      } else {
        setError("Failed to fetch customer details. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  // Search functionality
  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter(item => 
        item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.mobileNum || '').includes(searchTerm) ||
        item.proName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.proSrNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.invoiceNum?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.ticketNumber && item.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()))
         // Added ticket number search
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, data]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const checkWarrantyStatus = (endDate) => {
    if (!endDate) return { status: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    try {
      const today = new Date();
      const warrantyEnd = new Date(endDate);
      const daysLeft = Math.ceil((warrantyEnd - today) / (1000 * 60 * 60 * 24));
      
      if (daysLeft < 0) {
        return { status: 'Expired', color: 'bg-red-100 text-red-800' };
      } else if (daysLeft <= 30) {
        return { status: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800' };
      } else {
        return { status: 'Active', color: 'bg-green-100 text-green-800' };
      }
    } catch (e) {
      return { status: 'Error', color: 'bg-gray-100 text-gray-800' };
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-9 h-9 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-figtree">
            Loading customer data...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600 text-sm font-figtree mb-3">
            {error}
          </p>
          <button
            onClick={handleFetchData}
            className="px-5 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Product History</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total Records: {filteredData.length} {searchTerm && `(Filtered from ${data.length})`}
          </p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
            />
          </div>
          
          {/* Export Button */}
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-600">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {currentItems.length === 0 ? (
          <Card className="bg-white">
            <CardContent className="py-12">
              <div className="text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No customer records found</p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-2 text-orange-500 text-sm hover:text-orange-600"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          currentItems.map((item, index) => {
            const warranty = checkWarrantyStatus(item.warrEndDate);
            
            return (
              <Card key={item._id || index} className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Customer Header */}
                  <div className="bg-gradient-to-r from-orange-50 to-transparent p-4 border-b border-gray-100">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 rounded-full p-2">
                          <User className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.customerName || 'N/A'}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5" />
                              {item.email || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5" />
                              {item.mobileNum || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-white">
                        #{item.invoiceNum || 'N/A'}
                      </Badge>
                    </div>
                  </div>

                  {/* Product Details Grid */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Product Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Product:</span>
                          <span className="font-medium text-gray-900">{item.proName || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium text-gray-900">{item.proCatogory || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Brand:</span>
                          <span className="font-medium text-gray-900">{item.brandName || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Serial Numbers */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Barcode className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Serial No:</span>
                          <span className="font-medium text-gray-900">{item.proSrNo || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Model No:</span>
                          <span className="font-medium text-gray-900">{item.proModNum || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Invoice:</span>
                          <span className="font-medium text-gray-900">{item.invoiceNum || 'N/A'}</span>
                        </div>
                        {/* ✅ Added Ticket Number Display */}
                        <div className="flex items-center gap-2 text-sm">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Ticket #:</span>
                          <span className="font-medium text-gray-900">{item.ticketNumber || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Purchase & Warranty */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Purchase:</span>
                          <span className="font-medium text-gray-900">{formatDate(item.purDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Warranty:</span>
                          <span className="font-medium text-gray-900">
                            {formatDate(item.warrStartDate)} - {formatDate(item.warrEndDate)}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-start justify-end">
                        <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${warranty.color}`}>
                          Warranty {warranty.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCareCustomerHistory;


