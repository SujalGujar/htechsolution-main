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

  /* ── TICKET NUMBER DISPLAY ── */
  .ticket-preview {
    background: linear-gradient(135deg, var(--accent-lt) 0%, #f0f5ff 100%);
    border: 1px solid var(--accent);
    border-radius: var(--r-lg);
    padding: 16px 20px;
    margin-top: 20px;
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
    font-size: 20px;
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

  /* ── TICKET FIELD ── */
  .ticket-field {
    background: var(--surface2);
    border: 1.5px dashed var(--accent);
    border-radius: var(--r-md);
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .ticket-field-icon {
    width: 36px;
    height: 36px;
    background: var(--accent-lt);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    font-size: 16px;
  }
  .ticket-field-content {
    flex: 1;
  }
  .ticket-field-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--subtle);
    letter-spacing: 0.05em;
  }
  .ticket-field-value {
    font-size: 16px;
    font-weight: 600;
    color: var(--accent);
    font-family: monospace;
  }

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
  .modal-note.info {
    color: var(--accent);
    background: var(--accent-lt);
    border-color: var(--accent);
  }
  .modal-actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;
  }
  .modal-actions button {
    flex: 1;
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
  
  // For ticket number display
  const [generatedTicketNumber, setGeneratedTicketNumber] = useState("");

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
      
      // Check if response contains password and ticket number
      if (response.data.password) {
        setUserCredentials({
          username: cust.email,
          password: response.data.password
        });
        setShowCredentialsModal(true);
      }
      
      // If ticket number is returned from backend
      if (response.data.ticketNumber) {
        setGeneratedTicketNumber(response.data.ticketNumber);
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

                    {/* Ticket Number Display (appears after registration) */}
                    {generatedTicketNumber && (
                      <div className="ticket-field">
                        <div className="ticket-field-icon">🎫</div>
                        <div className="ticket-field-content">
                          <div className="ticket-field-label">Generated Ticket Number</div>
                          <div className="ticket-field-value">{generatedTicketNumber}</div>
                        </div>
                        <button
                          type="button"
                          className="copy-btn"
                          onClick={() => copyToClipboard(generatedTicketNumber)}
                          style={{ padding: "8px 12px" }}
                        >
                          Copy
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="cc-form-footer">
                    <div className="footer-note"><span style={{ color: "var(--danger)" }}>*</span> Required fields</div>
                    <div className="footer-acts">
                      <button type="button" className="btn btn-ghost" onClick={() => {
                        setCust(EMPTY_CUST);
                        setGeneratedTicketNumber("");
                      }}>Clear</button>
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

            {generatedTicketNumber && (
              <div className="credential-item">
                <div className="cred-label">Ticket Number</div>
                <div className="cred-value">
                  {generatedTicketNumber}
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard(generatedTicketNumber)}
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            <div className="modal-note">
              ⚠️ Please save these credentials. They won't be shown again.
              <br />
              <small>Customer can login with these credentials to raise service requests.</small>
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-blue"
                onClick={() => {
                  setShowCredentialsModal(false);
                  setGeneratedTicketNumber("");
                }}
                style={{ width: "100%" }}
              >
                I've Saved Them
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
                toast.type === "product" ? "Product registered successfully" :
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