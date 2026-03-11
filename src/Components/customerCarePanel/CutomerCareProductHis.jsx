// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// // // ✅ import shadcn table components
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";

// // // ✅ import shadcn card components
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";

// // // ✅ import shadcn badge
// import { Badge } from "../ui/badge";

// // // ✅ component name starts with uppercase
// const CustomerCareProductHistory = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

// //   // ✅ no req,res in frontend - just async()
//   const handleFetchData = async () => {
//     try {
//       setLoading(true); // show loading before fetch
//       setError(null);

//       const API = "/api/customerDetails/customer";
//       const res = await axios.get(API);

//       setData(res.data.customers);

//     } catch (error) {
//       console.error("error fetching data:", error);
//       setError("Failed to fetch customer details"); // show error to user
//     } finally {
//       setLoading(false); // hide loading after fetch
//     }
//   };

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   // ✅ show loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <p className="text-gray-500">Loading customers...</p>
//       </div>
//     );
//   }

//   // ✅ show error state
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {/* Card wraps the whole table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Customer History</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {/* Shadcn Table */}
//           <Table>
//             <TableCaption>
//               List of all customers — Total: {data.length}
//             </TableCaption>

//             {/* Table Header */}
//             <TableHeader>
//               <TableRow>
//                 <TableHead>#</TableHead>
//                  <TableHead>Name</TableHead>
//                  <TableHead>Email</TableHead>
//                  <TableHead>Phone</TableHead>
//                  <TableHead>Status</TableHead>
//                  <TableHead>Joined Date</TableHead>
//                </TableRow>
//              </TableHeader>

//              {/* Table Body */}
//              <TableBody>
//                {data.length === 0 ? (
// //                 // show this if no customers found
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center text-gray-500">
//                     No customers found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 // loop through each customer
//                 data.map((customer, index) => (
//                   <TableRow key={customer._id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{customer.name}</TableCell>
//                     <TableCell>{customer.email}</TableCell>
//                     <TableCell>{customer.phone}</TableCell>
//                     <TableCell>
//                       {/* Badge shows status with color */}
//                       <Badge variant={customer.isActive ? "success" : "destructive"}>
//                         {customer.isActive ? "Active" : "Inactive"}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {/* Format the date nicely */}
//                       {new Date(customer.createdAt).toLocaleDateString("en-IN", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//            </Table>
//          </CardContent>
//       </Card>
//   </div>
//   );
// };

// export default CustomerCareProductHistory;

// CutomerCareProductHis.jsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import React from 'react';
// ✅ CHANGED: import axiosInstance instead of axios
//
// ❌ OLD: import axios from 'axios'
//    Plain axios has NO interceptors
//    It sends requests with ZERO headers
//    Your backend sees no Authorization header → returns 401 immediately
//
// ✅ NEW: import axiosInstance from '../utils/axiosInstance'
//    axiosInstance has a REQUEST INTERCEPTOR that:
//    1. Reads token from localStorage.getItem("user")
//    2. Attaches Authorization: Bearer <token> to every request automatically
//    3. Handles 401/403/500 errors globally
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

// const CustomerCareProductHistory = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // ✅ CHANGED: use axiosInstance.get() instead of axios.get()
//       //
//       // ❌ OLD: const res = await axios.get("/api/customerDetails/customer")
//       //    → No token attached → 401 error
//       //
//       // ✅ NEW: const res = await axiosInstance.get("/customerDetails/customer")
//       //    → axiosInstance interceptor adds token automatically
//       //    → Note: baseURL in axiosInstance is already "/api"
//       //      so you only write the path AFTER /api here
//       //      "/api" + "/customerDetails/customer" = "/api/customerDetails/customer" ✅
//       const res = await axiosInstance.get("/customerDetails/customer");

//       setData(res.data.customers);

//     } catch (error) {
//       console.error("error fetching data:", error);

//       // ✅ IMPROVED: Show specific error messages instead of generic one
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

//   // Loading state
//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '200px',
//         background: 'transparent'
//       }}>
//         <div style={{ textAlign: 'center' }}>
//           <div style={{
//             width: '36px',
//             height: '36px',
//             border: '3px solid rgba(255,112,64,0.2)',
//             borderTop: '3px solid #ff7040',
//             borderRadius: '50%',
//             animation: 'spin 0.8s linear infinite',
//             margin: '0 auto 12px'
//           }} />
//           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//           <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: 'Figtree, sans-serif' }}>
//             Loading customers...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '200px'
//       }}>
//         <div style={{
//           background: 'rgba(255,60,60,0.08)',
//           border: '1px solid rgba(255,60,60,0.2)',
//           borderRadius: '12px',
//           padding: '20px 28px',
//           textAlign: 'center'
//         }}>
//           <p style={{ color: '#ff6060', fontSize: '14px', fontFamily: 'Figtree, sans-serif' }}>
//             ⚠ {error}
//           </p>
//           <button
//             onClick={handleFetchData}
//             style={{
//               marginTop: '12px',
//               padding: '8px 18px',
//               borderRadius: '8px',
//               border: 'none',
//               background: 'rgba(255,112,64,0.15)',
//               color: '#ff7040',
//               fontSize: '13px',
//               fontWeight: '600',
//               cursor: 'pointer',
//               fontFamily: 'Figtree, sans-serif'
//             }}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Customer History</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <Table>
//             <TableCaption>
//               List of all customers — Total: {data.length}
//             </TableCaption>

//             <TableHeader>
//               <TableRow>
//                 <TableHead>#</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Phone</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Joined Date</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {data.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center text-gray-500">
//                     No customers found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 data.map((customer, index) => (
//                   <TableRow key={customer._id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{customer.name}</TableCell>
//                     <TableCell>{customer.email}</TableCell>
//                     <TableCell>{customer.phone}</TableCell>
//                     <TableCell>
//                       <Badge variant={customer.isActive ? "success" : "destructive"}>
//                         {customer.isActive ? "Active" : "Inactive"}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {new Date(customer.createdAt).toLocaleDateString("en-IN", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
            // </TableBody>
          // </Table>
        // </CardContent>
      // </Card>
    //  </div>
  //  );
// };

//  export default CustomerCareProductHistory;


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

//   /* ── TICKET NUMBER DISPLAY ── */
//   .ticket-preview {
//     background: linear-gradient(135deg, var(--accent-lt) 0%, #f0f5ff 100%);
//     border: 1px solid var(--accent);
//     border-radius: var(--r-lg);
//     padding: 16px 20px;
//     margin-top: 20px;
//     display: flex;
//     align-items: center;
//     gap: 16px;
//   }
//   .ticket-icon {
//     width: 48px;
//     height: 48px;
//     background: var(--accent);
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
//     color: var(--accent);
//     margin-bottom: 4px;
//   }
//   .ticket-number {
//     font-size: 20px;
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

//   /* ── TICKET FIELD ── */
//   .ticket-field {
//     background: var(--surface2);
//     border: 1.5px dashed var(--accent);
//     border-radius: var(--r-md);
//     padding: 12px 16px;
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }
//   .ticket-field-icon {
//     width: 36px;
//     height: 36px;
//     background: var(--accent-lt);
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: var(--accent);
//     font-size: 16px;
//   }
//   .ticket-field-content {
//     flex: 1;
//   }
//   .ticket-field-label {
//     font-size: 10px;
//     font-weight: 600;
//     text-transform: uppercase;
//     color: var(--subtle);
//     letter-spacing: 0.05em;
//   }
//   .ticket-field-value {
//     font-size: 16px;
//     font-weight: 600;
//     color: var(--accent);
//     font-family: monospace;
//   }

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
//     max-width: 450px;
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
//   .modal-icon.green {
//     background: var(--accent2-lt);
//     color: var(--accent2);
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
//   .cred-value.small {
//     font-size: 14px;
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
//     color: var(--warning);
//     text-align: center;
//     margin: 16px 0;
//     padding: 8px;
//     background: #fffaeb;
//     border-radius: var(--r-sm);
//     border: 1px solid #fedf89;
//   }
//   .modal-note.danger {
//     color: var(--danger);
//     background: #fef3f2;
//     border-color: #fecdca;
//   }
//   .modal-note.info {
//     color: var(--accent);
//     background: var(--accent-lt);
//     border-color: var(--accent);
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
//   .toast-dot.red { background: #fef3f2; color: var(--danger); }
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

// const CATS = ["Television", "Refrigerator", "Washing Machine", "Air Conditioner", "Microwave", "Laptop", "Mobile Phone", "Camera", "Printer", "Other Electronics"];

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
//   );
// }


// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import {
//   CalendarIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   DownloadIcon,
//   FilterIcon,
//   MoreHorizontal,
//   SearchIcon,
//   CopyIcon,
//   EyeIcon,
//   FileTextIcon,
// } from "lucide-react";
// import axiosInstance from "../../Utils/axiosIntance";
// // import { format } from "date-fns";
// import { Skeleton } from "../ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../ui/tooltip";

// const CustomerCareProductHistory = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [categories, setCategories] = useState([]);

//   // Fetch products from API
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get("/customerDetails/products");
//       console.log("Full response:", response);
//       console.log("Response data:", response.data);
      
//       // Handle different response structures
//       let productsArray = [];
      
//       if (Array.isArray(response.data)) {
//         // Direct array response
//         productsArray = response.data;
//       } else if (response.data?.data && Array.isArray(response.data.data)) {
//         // Response wrapped in { data: [...] }
//         productsArray = response.data.data;
//       } else if (response.data?.products && Array.isArray(response.data.products)) {
//         // Response wrapped in { products: [...] }
//         productsArray = response.data.products;
//       } else if (response.data?.result && Array.isArray(response.data.result)) {
//         // Response wrapped in { result: [...] }
//         productsArray = response.data.result;
//       } else {
//         console.error("Unexpected API response structure:", response.data);
//         productsArray = [];
//       }
      
//       setProducts(productsArray);
      
//       // Extract unique categories for filter
//       if (productsArray.length > 0) {
//         const uniqueCategories = [...new Set(productsArray.map(p => p.proCatogory).filter(Boolean))];
//         setCategories(uniqueCategories);
//       }
      
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError(err.response?.data?.message || "Failed to fetch products");
//       setProducts([]); // Ensure products is an array even on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter products based on search and category
//   const filteredProducts = Array.isArray(products) ? products.filter(product => {
//     const matchesSearch = 
//       product.proName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.proSrNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.proModNum?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.brandName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.TicketNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesCategory = filterCategory === "all" || product.proCatogory === filterCategory;
    
//     return matchesSearch && matchesCategory;
//   }) : [];

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       return format(new Date(dateString), "dd MMM yyyy");
//     } catch {
//       return "Invalid Date";
//     }
//   };

//   // Get initials for avatar
//   const getInitials = (name) => {
//     if (!name) return "PR";
//     return name
//       .split(" ")
//       .map(n => n[0])
//       .join("")
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   // Handle copy to clipboard
//   const handleCopy = (text) => {
//     if (text) {
//       navigator.clipboard.writeText(text);
//       // You can add a toast notification here
//     }
//   };

//   // Handle export to CSV
//   const handleExportCSV = () => {
//     if (filteredProducts.length === 0) return;
    
//     const headers = ["Ticket Number", "Product Name", "Category", "Brand", "Model", "Serial Number", "Purchase Date", "Invoice Number", "Registration Date"];
//     const csvData = filteredProducts.map(p => [
//       p.TicketNumber || "N/A",
//       p.proName || "N/A",
//       p.proCatogory || "N/A",
//       p.brandName || "N/A",
//       p.proModNum || "N/A",
//       p.proSrNo || "N/A",
//       formatDate(p.purDate),
//       p.invoiceNum || "N/A",
//       formatDate(p.createdAt)
//     ]);
    
//     const csvContent = [headers, ...csvData]
//       .map(row => row.map(cell => `"${cell}"`).join(","))
//       .join("\n");
    
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `product-history-${format(new Date(), "yyyy-MM-dd")}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   if (loading) {
//     return (
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Product History</CardTitle>
//           <CardDescription>Loading registered products...</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="flex items-center space-x-4">
//                 <Skeleton className="h-12 w-12 rounded-full" />
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-[250px]" />
//                   <Skeleton className="h-4 w-[200px]" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Product History</CardTitle>
//           <CardDescription>Error loading products</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Alert variant="destructive">
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//           <Button className="mt-4" onClick={fetchProducts}>
//             Retry
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="w-full">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
//         <div>
//           <CardTitle className="text-2xl font-bold">Product History</CardTitle>
//           <CardDescription>
//             View all registered products ({filteredProducts.length} total)
//           </CardDescription>
//         </div>
//         <div className="flex items-center space-x-2">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button 
//                   variant="outline" 
//                   size="icon" 
//                   onClick={handleExportCSV}
//                   disabled={filteredProducts.length === 0}
//                 >
//                   <DownloadIcon className="h-4 w-4" />
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Export to CSV</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
          
//           <Button variant="outline" onClick={fetchProducts}>
//             Refresh
//           </Button>
//         </div>
//       </CardHeader>

//       <CardContent>
//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search by product name, serial number, ticket number..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
          
//           <Select value={filterCategory} onValueChange={setFilterCategory}>
//             <SelectTrigger className="w-full md:w-[200px]">
//               <FilterIcon className="h-4 w-4 mr-2" />
//               <SelectValue placeholder="Filter by category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               {categories.map(category => (
//                 <SelectItem key={category} value={category}>
//                   {category}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Table */}
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[100px]">Ticket #</TableHead>
//                 <TableHead>Product</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Brand/Model</TableHead>
//                 <TableHead>Serial Number</TableHead>
//                 <TableHead>Purchase Date</TableHead>
//                 <TableHead>Invoice</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {currentItems.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="h-24 text-center">
//                     No products found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 currentItems.map((product) => (
//                   <TableRow key={product._id || product.TicketNumber || Math.random()}>
//                     <TableCell className="font-medium">
//                       <Badge variant="outline" className="font-mono">
//                         {product.TicketNumber || "N/A"}
//                       </Badge>
//                     </TableCell>
                    
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           <AvatarFallback className="bg-blue-100 text-blue-600">
//                             {getInitials(product.proName)}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <div className="font-medium">{product.proName || "N/A"}</div>
//                           <div className="text-sm text-gray-500">
//                             Registered: {formatDate(product.createdAt)}
//                           </div>
//                         </div>
//                       </div>
//                     </TableCell>
                    
//                     <TableCell>
//                       <Badge variant="secondary">{product.proCatogory || "N/A"}</Badge>
//                     </TableCell>
                    
//                     <TableCell>
//                       <div>
//                         <div className="font-medium">{product.brandName || "N/A"}</div>
//                         <div className="text-sm text-gray-500">Model: {product.proModNum || "N/A"}</div>
//                       </div>
//                     </TableCell>
                    
//                     <TableCell>
//                       <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
//                         {product.proSrNo || "N/A"}
//                       </code>
//                     </TableCell>
                    
//                     <TableCell>
//                       <div className="flex items-center gap-1">
//                         <CalendarIcon className="h-3 w-3 text-gray-400" />
//                         <span>{formatDate(product.purDate)}</span>
//                       </div>
//                     </TableCell>
                    
//                     <TableCell>
//                       <div className="flex items-center gap-1">
//                         <FileTextIcon className="h-3 w-3 text-gray-400" />
//                         <span className="text-sm">{product.invoiceNum || "N/A"}</span>
//                       </div>
//                     </TableCell>
                    
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuItem
//                             onClick={() => handleCopy(product.TicketNumber)}
//                             disabled={!product.TicketNumber}
//                           >
//                             <CopyIcon className="mr-2 h-4 w-4" />
//                             Copy Ticket #
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleCopy(product.proSrNo)}
//                             disabled={!product.proSrNo}
//                           >
//                             <CopyIcon className="mr-2 h-4 w-4" />
//                             Copy Serial #
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem>
//                             <EyeIcon className="mr-2 h-4 w-4" />
//                             View Details
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         {filteredProducts.length > 0 && (
//           <div className="flex items-center justify-between space-x-2 py-4">
//             <div className="text-sm text-gray-500">
//               Showing {indexOfFirstItem + 1} to{" "}
//               {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
//               {filteredProducts.length} products
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 <ChevronLeftIcon className="h-4 w-4" />
//                 Previous
//               </Button>
//               <div className="text-sm">
//                 Page {currentPage} of {totalPages}
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//                 <ChevronRightIcon className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default CustomerCareProductHistory;

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import {
//   CalendarIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   RefreshCwIcon,
//   FilterIcon,
//   MoreHorizontal,
//   SearchIcon,
//   CopyIcon,
//   FileTextIcon,
// } from "lucide-react";
// import axiosInstance from "../../Utils/axiosIntance";
// import { Skeleton } from "../ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../ui/tooltip";

// const CustomerCareProductHistory = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [categories, setCategories] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch products from API
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get("/customerDetails/products");
//       console.log("Full response:", response);
//       console.log("Response data:", response.data);
      
//       // Handle different response structures
//       let productsArray = [];
      
//       if (Array.isArray(response.data)) {
//         productsArray = response.data;
//       } else if (response.data?.data && Array.isArray(response.data.data)) {
//         productsArray = response.data.data;
//       } else if (response.data?.products && Array.isArray(response.data.products)) {
//         productsArray = response.data.products;
//       } else if (response.data?.result && Array.isArray(response.data.result)) {
//         productsArray = response.data.result;
//       } else {
//         console.error("Unexpected API response structure:", response.data);
//         productsArray = [];
//       }
      
//       setProducts(productsArray);
      
//       // Extract unique categories for filter
//       if (productsArray.length > 0) {
//         const uniqueCategories = [...new Set(productsArray.map(p => p.proCatogory).filter(Boolean))];
//         setCategories(uniqueCategories);
//       }
      
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError(err.response?.data?.message || "Failed to fetch products");
//       setProducts([]);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchProducts();
//   };

//   // Filter products based on search and category
//   const filteredProducts = Array.isArray(products) ? products.filter(product => {
//     const matchesSearch = 
//       product.proName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.proSrNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.proModNum?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.brandName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.TicketNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesCategory = filterCategory === "all" || product.proCatogory === filterCategory;
    
//     return matchesSearch && matchesCategory;
//   }) : [];

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   // Format date with proper validation
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
    
//     try {
//       // Handle different date formats
//       let date;
      
//       // Check if it's a timestamp (number)
//       if (typeof dateString === 'number') {
//         date = new Date(dateString);
//       } 
//       // Check if it's a string that can be parsed
//       else if (typeof dateString === 'string') {
//         // Try to parse the date string
//         date = new Date(dateString);
        
//         // If invalid, try to handle DD/MM/YYYY format
//         if (isNaN(date.getTime())) {
//           const parts = dateString.split(/[/\-]/);
//           if (parts.length === 3) {
//             // Try DD/MM/YYYY
//             date = new Date(parts[2], parts[1] - 1, parts[0]);
//           }
//         }
//       } else {
//         return "N/A";
//       }
      
//       // Check if date is valid
//       if (isNaN(date.getTime())) {
//         return "N/A";
//       }
      
//       // Format the date
//       return date.toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       });
//     } catch (error) {
//       console.error("Date parsing error:", error);
//       return "N/A";
//     }
//   };

//   // Get initials for avatar
//   const getInitials = (name) => {
//     if (!name) return "PR";
//     return name
//       .split(" ")
//       .map(n => n[0])
//       .join("")
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   // Handle copy to clipboard
//   const handleCopy = (text) => {
//     if (text) {
//       navigator.clipboard.writeText(text);
//       // You can add a toast notification here
//     }
//   };

//   if (loading && !refreshing) {
//     return (
//       <Card className="w-full border-0 shadow-lg">
//         <CardHeader className="bg-gradient-to-r from-[#1F6E8C] to-[#2c8ab0] text-white rounded-t-lg">
//           <CardTitle className="text-2xl font-bold">Product History</CardTitle>
//           <CardDescription className="text-[#F7F7F2] opacity-90">
//             Loading registered products...
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-6">
//           <div className="space-y-4">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="flex items-center space-x-4">
//                 <Skeleton className="h-12 w-12 rounded-full" />
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-[250px]" />
//                   <Skeleton className="h-4 w-[200px]" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="w-full border-0 shadow-lg">
//         <CardHeader className="bg-gradient-to-r from-[#1F6E8C] to-[#2c8ab0] text-white rounded-t-lg">
//           <CardTitle className="text-2xl font-bold">Product History</CardTitle>
//           <CardDescription className="text-[#F7F7F2] opacity-90">
//             Error loading products
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-6">
//           <Alert variant="destructive" className="border-red-200 bg-red-50">
//             <AlertTitle className="text-red-800">Error</AlertTitle>
//             <AlertDescription className="text-red-600">{error}</AlertDescription>
//           </Alert>
//           <Button 
//             className="mt-4 bg-[#1F6E8C] hover:bg-[#184f66] text-white"
//             onClick={fetchProducts}
//           >
//             Retry
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="w-full border-0 shadow-lg overflow-hidden">
//       <CardHeader className="bg-gradient-to-r from-[#1F6E8C] to-[#2c8ab0] text-white rounded-t-lg">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <CardTitle className="text-2xl font-bold">Product History</CardTitle>
//             <CardDescription className="text-[#F7F7F2] opacity-90">
//               View all registered products ({filteredProducts.length} total)
//             </CardDescription>
//           </div>
//           <div className="flex items-center gap-2">
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button 
//                     variant="outline" 
//                     size="icon"
//                     onClick={handleRefresh}
//                     disabled={refreshing}
//                     className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
//                   >
//                     <RefreshCwIcon className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Refresh data</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="p-6">
//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative group">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#6BA368] transition-colors" />
//             </div>
//             <Input
//               placeholder="Search by product name, serial number, ticket number..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border-gray-200 focus:border-[#6BA368] focus:ring focus:ring-[#6BA368] focus:ring-opacity-20 rounded-lg transition-all"
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//               >
//                 <span className="text-sm">✕</span>
//               </button>
//             )}
//           </div>
          
//           <Select value={filterCategory} onValueChange={setFilterCategory}>
//             <SelectTrigger className="w-full md:w-[220px] border-gray-200 focus:border-[#6BA368] focus:ring focus:ring-[#6BA368] focus:ring-opacity-20">
//               <FilterIcon className="h-4 w-4 mr-2 text-[#6BA368]" />
//               <SelectValue placeholder="Filter by category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               {categories.map(category => (
//                 <SelectItem key={category} value={category}>
//                   {category}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Table */}
//         <div className="rounded-lg border border-gray-200 overflow-hidden">
//           <Table>
//             <TableHeader className="bg-gray-50">
//               <TableRow>
//                 <TableHead className="font-semibold text-[#1F6E8C] w-[100px]">Ticket #</TableHead>
//                 <TableHead className="font-semibold text-[#1F6E8C]">Product</TableHead>
//                 <TableHead className="font-semibold text-[#1F6E8C]">Category</TableHead>
//                 <TableHead className="font-semibold text-[#1F6E8C]">Brand/Model</TableHead>
//                 <TableHead className="font-semibold text-[#1F6E8C]">Serial Number</TableHead>
//                 <TableHead className="font-semibold text-[#1F6E8C]">Purchase Date</TableHead>
//                 <TableHead className="font-semibold text-[#1F6E8C]">Invoice</TableHead>
//                 <TableHead className="font-semibold text-[#1F6E8C] text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {currentItems.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="h-32 text-center text-gray-500">
//                     <div className="flex flex-col items-center justify-center">
//                       <FileTextIcon className="h-8 w-8 text-gray-400 mb-2" />
//                       <p>No products found.</p>
//                       <p className="text-sm">Try adjusting your search or filter</p>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 currentItems.map((product) => (
//                   <TableRow key={product._id || product.TicketNumber || Math.random()} 
//                     className="hover:bg-gray-50 transition-colors">
//                     <TableCell className="font-medium">
//                       <Badge variant="outline" className="font-mono bg-[#6BA368] bg-opacity-10 text-[#1F6E8C] border-[#6BA368] border-opacity-30">
//                         {product.TicketNumber || "N/A"}
//                       </Badge>
//                     </TableCell>
                    
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8 ring-2 ring-[#6BA368] ring-opacity-20">
//                           <AvatarFallback className="bg-[#6BA368] bg-opacity-10 text-[#6BA368] font-semibold">
//                             {getInitials(product.proName)}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <div className="font-medium text-gray-900">{product.proName || "N/A"}</div>
//                           <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                             <CalendarIcon className="h-3 w-3 text-[#6BA368]" />
//                             Reg: {formatDate(product.createdAt)}
//                           </div>
//                         </div>
//                       </div>
//                     </TableCell>
                    
//                     <TableCell>
//                       <Badge className="bg-[#6BA368] bg-opacity-10 text-[#6BA368] border-0">
//                         {product.proCatogory || "N/A"}
//                       </Badge>
//                     </TableCell>
                    
//                     <TableCell>
//                       <div>
//                         <div className="font-medium text-gray-900">{product.brandName || "N/A"}</div>
//                         <div className="text-xs text-gray-500 mt-1">Model: {product.proModNum || "N/A"}</div>
//                       </div>
//                     </TableCell>
                    
//                     <TableCell>
//                       <code className="relative rounded bg-gray-100 px-2 py-1 font-mono text-xs text-[#1F6E8C]">
//                         {product.proSrNo || "N/A"}
//                       </code>
//                     </TableCell>
                    
//                     <TableCell>
//                       <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
//                         <CalendarIcon className="h-3.5 w-3.5 text-[#D9A441]" />
//                         <span className="text-sm font-medium text-gray-700">
//                           {formatDate(product.purDate)}
//                         </span>
//                       </div>
//                     </TableCell>
                    
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <FileTextIcon className="h-3.5 w-3.5 text-[#6BA368]" />
//                         <span className="text-sm text-gray-600 font-mono">
//                           {product.invoiceNum || "N/A"}
//                         </span>
//                       </div>
//                     </TableCell>
                    
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-[#6BA368] hover:bg-opacity-10 hover:text-[#6BA368]">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-48">
//                           <DropdownMenuLabel className="text-[#1F6E8C]">Actions</DropdownMenuLabel>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem
//                             onClick={() => handleCopy(product.TicketNumber)}
//                             disabled={!product.TicketNumber}
//                             className="cursor-pointer"
//                           >
//                             <CopyIcon className="mr-2 h-4 w-4 text-[#6BA368]" />
//                             Copy Ticket #
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleCopy(product.proSrNo)}
//                             disabled={!product.proSrNo}
//                             className="cursor-pointer"
//                           >
//                             <CopyIcon className="mr-2 h-4 w-4 text-[#6BA368]" />
//                             Copy Serial #
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         {filteredProducts.length > 0 && (
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
//             <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
//               Showing {indexOfFirstItem + 1} to{" "}
//               {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
//               <span className="font-semibold text-[#1F6E8C]">{filteredProducts.length}</span> products
//             </div>
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="border-gray-200 hover:border-[#6BA368] hover:bg-[#6BA368] hover:bg-opacity-10"
//               >
//                 <ChevronLeftIcon className="h-4 w-4 mr-1" />
//                 Previous
//               </Button>
              
//               <div className="flex items-center gap-2">
//                 {[...Array(Math.min(5, totalPages))].map((_, i) => {
//                   let pageNum;
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (currentPage >= totalPages - 2) {
//                     pageNum = totalPages - 4 + i;
//                   } else {
//                     pageNum = currentPage - 2 + i;
//                   }
                  
//                   return (
//                     <Button
//                       key={i}
//                       variant={currentPage === pageNum ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => setCurrentPage(pageNum)}
//                       className={`w-8 h-8 p-0 ${
//                         currentPage === pageNum 
//                           ? 'bg-[#1F6E8C] hover:bg-[#184f66] text-white' 
//                           : 'border-gray-200 hover:border-[#6BA368] hover:text-[#6BA368]'
//                       }`}
//                     >
//                       {pageNum}
//                     </Button>
//                   );
//                 })}
//               </div>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="border-gray-200 hover:border-[#6BA368] hover:bg-[#6BA368] hover:bg-opacity-10"
//               >
//                 Next
//                 <ChevronRightIcon className="h-4 w-4 ml-1" />
//               </Button>
//             </div>
//           </div>
//         )}
//       </CardContent>

//       <style jsx>{`
//         /* Custom scrollbar */
//         .overflow-x-auto::-webkit-scrollbar {
//           height: 6px;
//         }
        
//         .overflow-x-auto::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
        
//         .overflow-x-auto::-webkit-scrollbar-thumb {
//           background: #6BA368;
//           border-radius: 10px;
//         }
        
//         .overflow-x-auto::-webkit-scrollbar-thumb:hover {
//           background: #1F6E8C;
//         }
//       `}</style>
//     </Card>
//   );
// };

// export default CustomerCareProductHistory;

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   RefreshCwIcon,
//   FilterIcon,
//   MoreHorizontal,
//   SearchIcon,
//   CopyIcon,
//   FileTextIcon,
//   Calendar,
//   Package,
//   Tag,
//   Hash,
//   FileText,
// } from "lucide-react";
// import axiosInstance from "../../Utils/axiosIntance";
// import { Skeleton } from "../ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
// import {
//   Tooltip,
//   TooltipContent,
//   // TooltipDescription,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../ui/tooltip";

// const CustomerCareProductHistory = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [categories, setCategories] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get("/customerDetails/products");
      
//       let productsArray = [];
      
//       if (Array.isArray(response.data)) {
//         productsArray = response.data;
//       } else if (response.data?.data && Array.isArray(response.data.data)) {
//         productsArray = response.data.data;
//       } else if (response.data?.products && Array.isArray(response.data.products)) {
//         productsArray = response.data.products;
//       } else if (response.data?.result && Array.isArray(response.data.result)) {
//         productsArray = response.data.result;
//       } else {
//         productsArray = [];
//       }
      
//       // Log the first product to see available fields
//       if (productsArray.length > 0) {
//         console.log("Sample product data:", productsArray[0]);
//       }
      
//       setProducts(productsArray);
      
//       if (productsArray.length > 0) {
//         const uniqueCategories = [...new Set(productsArray.map(p => p.proCatogory || p.category).filter(Boolean))];
//         setCategories(uniqueCategories);
//       }
      
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch products");
//       setProducts([]);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchProducts();
//   };

//   // Helper function to get brand name from various possible field names
//   const getBrandName = (product) => {
//     // Check all possible field names for brand
//     const possibleFields = [
//       'brandName',
//       'brand',
//       'productBrand',
//       'manufacturer',
//       'company',
//       'proBrand',
//       'brand_name',
//       'product_brand'
//     ];
    
//     for (const field of possibleFields) {
//       if (product[field] && product[field] !== "N/A" && product[field] !== "") {
//         return product[field];
//       }
//     }
    
//     return "—";
//   };

//   // Helper function to get model number from various possible field names
//   const getModelNumber = (product) => {
//     const possibleFields = [
//       'proModNum',
//       'modelNumber',
//       'model',
//       'proModel',
//       'productModel',
//       'modNum',
//       'model_no',
//       'product_model'
//     ];
    
//     for (const field of possibleFields) {
//       if (product[field] && product[field] !== "N/A" && product[field] !== "") {
//         return product[field];
//       }
//     }
    
//     return "—";
//   };

//   // Helper function to get product name
//   const getProductName = (product) => {
//     const possibleFields = [
//       'proName',
//       'productName',
//       'name',
//       'product',
//       'itemName',
//       'product_name'
//     ];
    
//     for (const field of possibleFields) {
//       if (product[field] && product[field] !== "N/A" && product[field] !== "") {
//         return product[field];
//       }
//     }
    
//     return "—";
//   };

//   // Helper function to get category
//   const getCategory = (product) => {
//     const possibleFields = [
//       'proCatogory',
//       'category',
//       'productCategory',
//       'catogory',
//       'itemCategory',
//       'product_category'
//     ];
    
//     for (const field of possibleFields) {
//       if (product[field] && product[field] !== "N/A" && product[field] !== "") {
//         return product[field];
//       }
//     }
    
//     return "—";
//   };

//   // Helper function to get serial number
//   const getSerialNumber = (product) => {
//     const possibleFields = [
//       'proSrNo',
//       'serialNumber',
//       'serialNo',
//       'srNo',
//       'serial',
//       'serial_number'
//     ];
    
//     for (const field of possibleFields) {
//       if (product[field] && product[field] !== "N/A" && product[field] !== "") {
//         return product[field];
//       }
//     }
    
//     return "—";
//   };

//   // Helper function to get invoice number
//   const getInvoiceNumber = (product) => {
//     const possibleFields = [
//       'invoiceNum',
//       'invoiceNumber',
//       'invoice',
//       'billNumber',
//       'billNo',
//       'invoice_no'
//     ];
    
//     for (const field of possibleFields) {
//       if (product[field] && product[field] !== "N/A" && product[field] !== "") {
//         return product[field];
//       }
//     }
    
//     return "—";
//   };

//   const filteredProducts = Array.isArray(products) ? products.filter(product => {
//     const searchableText = `
//       ${getProductName(product)} 
//       ${getSerialNumber(product)} 
//       ${getModelNumber(product)} 
//       ${getBrandName(product)} 
//       ${product.TicketNumber || ''}
//     `.toLowerCase();
    
//     const matchesSearch = searchTerm === "" || searchableText.includes(searchTerm.toLowerCase());
    
//     const productCategory = getCategory(product);
//     const matchesCategory = filterCategory === "all" || productCategory === filterCategory;
    
//     return matchesSearch && matchesCategory;
//   }) : [];

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const formatDate = (dateString) => {
//     if (!dateString) return "—";
    
//     try {
//       let date;
      
//       if (typeof dateString === 'number') {
//         date = new Date(dateString);
//       } else if (typeof dateString === 'string') {
//         date = new Date(dateString);
        
//         if (isNaN(date.getTime())) {
//           const parts = dateString.split(/[/\-]/);
//           if (parts.length === 3) {
//             date = new Date(parts[2], parts[1] - 1, parts[0]);
//           }
//         }
//       } else {
//         return "—";
//       }
      
//       if (isNaN(date.getTime())) {
//         return "—";
//       }
      
//       return date.toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       });
//     } catch {
//       return "—";
//     }
//   };

//   const handleCopy = (text) => {
//     if (text && text !== "—") {
//       navigator.clipboard.writeText(text);
//     }
//   };

//   if (loading && !refreshing) {
//     return (
//       <Card className="w-full border-0 shadow-sm">
//         <CardHeader className="bg-[#1F6E8C] text-white px-6 py-5">
//           <CardTitle className="text-xl font-semibold">Product History</CardTitle>
//           <CardDescription className="text-[#F7F7F2] text-sm opacity-90">
//             Loading registered products...
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-6">
//           <div className="space-y-3">
//             {[...Array(5)].map((_, i) => (
//               <Skeleton key={i} className="h-12 w-full rounded" />
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="w-full border-0 shadow-sm">
//         <CardHeader className="bg-[#1F6E8C] text-white px-6 py-5">
//           <CardTitle className="text-xl font-semibold">Product History</CardTitle>
//           <CardDescription className="text-[#F7F7F2] text-sm opacity-90">
//             Error loading products
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-6">
//           <Alert variant="destructive" className="border-red-200 bg-red-50">
//             <AlertTitle className="text-red-800">Error</AlertTitle>
//             <AlertDescription className="text-red-600">{error}</AlertDescription>
//           </Alert>
//           <Button 
//             className="mt-4 bg-[#1F6E8C] hover:bg-[#184f66] text-white"
//             onClick={fetchProducts}
//           >
//             Retry
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="w-full">
//       <Card className="w-full border-0 shadow-sm overflow-hidden">
//         <CardHeader className="bg-[#1F6E8C] text-white px-6 py-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle className="text-xl font-semibold flex items-center gap-2">
//                 <Package className="h-5 w-5" />
//                 Product History
//               </CardTitle>
//               <CardDescription className="text-[#F7F7F2] text-sm opacity-90 mt-1">
//                 View all registered products ({filteredProducts.length} total)
//               </CardDescription>
//             </div>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button 
//                     variant="outline" 
//                     size="icon"
//                     onClick={handleRefresh}
//                     disabled={refreshing}
//                     className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white h-8 w-8"
//                   >
//                     <RefreshCwIcon className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Refresh data</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </div>
//         </CardHeader>

//         <CardContent className="p-0">
//           {/* Filters */}
//           <div className="p-6 pb-4 border-b border-gray-100">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search by product name, serial number, ticket number..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-9 pr-4 py-2 border-gray-200 focus:border-[#6BA368] focus:ring-1 focus:ring-[#6BA368] rounded-md text-sm"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <span className="text-xs">✕</span>
//                   </button>
//                 )}
//               </div>
              
//               <Select value={filterCategory} onValueChange={setFilterCategory}>
//                 <SelectTrigger className="w-full md:w-[200px] border-gray-200 focus:border-[#6BA368] focus:ring-1 focus:ring-[#6BA368]">
//                   <FilterIcon className="h-4 w-4 mr-2 text-[#6BA368]" />
//                   <SelectValue placeholder="Filter by category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Categories</SelectItem>
//                   {categories.map(category => (
//                     <SelectItem key={category} value={category}>
//                       {category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader className="bg-gray-50">
//                 <TableRow className="border-b border-gray-200">
//                   <TableHead className="text-xs font-semibold text-[#1F6E8C] uppercase tracking-wider px-4 py-3 whitespace-nowrap">
//                     <div className="flex items-center gap-1">
//                       <Hash className="h-3 w-3" />
//                       Ticket #
//                     </div>
//                   </TableHead>
//                   <TableHead className="text-xs font-semibold text-[#1F6E8C] uppercase tracking-wider px-4 py-3 whitespace-nowrap">
//                     <div className="flex items-center gap-1">
//                       <Package className="h-3 w-3" />
//                       Product
//                     </div>
//                   </TableHead>
//                   <TableHead className="text-xs font-semibold text-[#1F6E8C] uppercase tracking-wider px-4 py-3 whitespace-nowrap">
//                     <div className="flex items-center gap-1">
//                       <Tag className="h-3 w-3" />
//                       Category
//                     </div>
//                   </TableHead>
//                   <TableHead className="text-xs font-semibold text-[#1F6E8C] uppercase tracking-wider px-4 py-3 whitespace-nowrap">
//                     Brand/Model
//                   </TableHead>
//                   <TableHead className="text-xs font-semibold text-[#1F6E8C] uppercase tracking-wider px-4 py-3 whitespace-nowrap">
//                     Serial Number
//                   </TableHead>
//                   <TableHead className="text-xs font-semibold text-[#1F6E8C] uppercase tracking-wider px-4 py-3 whitespace-nowrap">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="h-3 w-3" />
//                       Purchase Date
//                     </div>
//                   </TableHead>
//                   <TableHead className="text-xs font-semibold text-[#1F6E8C] uppercase tracking-wider px-4 py-3 whitespace-nowrap">
//                     <div className="flex items-center gap-1">
//                       <FileText className="h-3 w-3" />
//                       Invoice
//                     </div>
//                   </TableHead>
//                   <TableHead className="text-xs font-semibold text-[#1F6E8C] uppercase tracking-wider px-4 py-3 text-right whitespace-nowrap">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {currentItems.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={8} className="h-40 text-center text-gray-500">
//                       <div className="flex flex-col items-center justify-center">
//                         <FileTextIcon className="h-8 w-8 text-gray-300 mb-2" />
//                         <p className="text-sm font-medium">No products found</p>
//                         <p className="text-xs">Try adjusting your search or filter</p>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   currentItems.map((product) => {
//                     const brandName = getBrandName(product);
//                     const modelNumber = getModelNumber(product);
//                     const productName = getProductName(product);
//                     const category = getCategory(product);
//                     const serialNumber = getSerialNumber(product);
//                     const invoiceNumber = getInvoiceNumber(product);
                    
//                     return (
//                       <TableRow 
//                         key={product._id || product.TicketNumber || Math.random()} 
//                         className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
//                       >
//                         <TableCell className="px-4 py-3">
//                           <Badge variant="outline" className="font-mono text-xs bg-[#6BA368] bg-opacity-5 text-[#1F6E8C] border-[#6BA368] border-opacity-20 font-medium px-2 py-0.5">
//                             {product.TicketNumber || "—"}
//                           </Badge>
//                         </TableCell>
                        
//                         <TableCell className="px-4 py-3">
//                           <div>
//                             <div className="font-medium text-sm text-gray-900">
//                               {productName}
//                             </div>
//                             <div className="text-xs text-gray-400 mt-0.5">
//                               Reg: {formatDate(product.createdAt)}
//                             </div>
//                           </div>
//                         </TableCell>
                        
//                         <TableCell className="px-4 py-3">
//                           <Badge className="bg-[#6BA368] bg-opacity-10 text-[#6BA368] text-xs font-medium px-2 py-0.5 rounded border-0">
//                             {category}
//                           </Badge>
//                         </TableCell>
                        
//                         <TableCell className="px-4 py-3">
//                           <div>
//                             <div className="font-medium text-sm text-gray-900">
//                               {brandName}
//                             </div>
//                             {modelNumber !== "—" && (
//                               <div className="text-xs text-gray-400 mt-0.5">
//                                 Model: {modelNumber}
//                               </div>
//                             )}
//                           </div>
//                         </TableCell>
                        
//                         <TableCell className="px-4 py-3">
//                           <code className="text-xs bg-gray-100 px-2 py-1 rounded text-[#1F6E8C] font-mono">
//                             {serialNumber}
//                           </code>
//                         </TableCell>
                        
//                         <TableCell className="px-4 py-3">
//                           <div className="flex items-center gap-1.5">
//                             <Calendar className="h-3.5 w-3.5 text-[#D9A441]" />
//                             <span className="text-sm text-gray-700">
//                               {formatDate(product.purDate)}
//                             </span>
//                           </div>
//                         </TableCell>
                        
//                         <TableCell className="px-4 py-3">
//                           <div className="flex items-center gap-1.5">
//                             <FileText className="h-3.5 w-3.5 text-[#6BA368]" />
//                             <span className="text-sm text-gray-600 font-mono">
//                               {invoiceNumber}
//                             </span>
//                           </div>
//                         </TableCell>
                        
//                         <TableCell className="px-4 py-3 text-right">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" className="h-7 w-7 p-0 hover:bg-[#6BA368] hover:bg-opacity-10">
//                                 <MoreHorizontal className="h-4 w-4 text-gray-500" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end" className="w-44">
//                               <DropdownMenuLabel className="text-xs text-[#1F6E8C] py-1.5">Actions</DropdownMenuLabel>
//                               <DropdownMenuSeparator />
//                               <DropdownMenuItem
//                                 onClick={() => handleCopy(product.TicketNumber)}
//                                 disabled={!product.TicketNumber}
//                                 className="text-sm py-1.5 cursor-pointer"
//                               >
//                                 <CopyIcon className="mr-2 h-3.5 w-3.5 text-[#6BA368]" />
//                                 Copy Ticket #
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleCopy(serialNumber)}
//                                 disabled={serialNumber === "—"}
//                                 className="text-sm py-1.5 cursor-pointer"
//                               >
//                                 <CopyIcon className="mr-2 h-3.5 w-3.5 text-[#6BA368]" />
//                                 Copy Serial #
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })
//                 )}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Pagination */}
//           {filteredProducts.length > 0 && (
//             <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
//               <div className="text-xs text-gray-500">
//                 Showing <span className="font-medium text-[#1F6E8C]">{indexOfFirstItem + 1}</span> to{" "}
//                 <span className="font-medium text-[#1F6E8C]">{Math.min(indexOfLastItem, filteredProducts.length)}</span> of{" "}
//                 <span className="font-medium text-[#1F6E8C]">{filteredProducts.length}</span> products
//               </div>
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="h-8 px-3 text-xs border-gray-200 hover:border-[#6BA368] hover:text-[#6BA368]"
//                 >
//                   <ChevronLeftIcon className="h-3.5 w-3.5 mr-1" />
//                   Previous
//                 </Button>
                
//                 <div className="flex items-center gap-1">
//                   {[...Array(Math.min(5, totalPages))].map((_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= totalPages - 2) {
//                       pageNum = totalPages - 4 + i;
//                     } else {
//                       pageNum = currentPage - 2 + i;
//                     }
                    
//                     return (
//                       <Button
//                         key={i}
//                         variant={currentPage === pageNum ? "default" : "outline"}
//                         size="sm"
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`h-8 w-8 p-0 text-xs ${
//                           currentPage === pageNum 
//                             ? 'bg-[#1F6E8C] hover:bg-[#184f66] text-white border-0' 
//                             : 'border-gray-200 hover:border-[#6BA368] hover:text-[#6BA368]'
//                         }`}
//                       >
//                         {pageNum}
//                       </Button>
//                     );
//                   })}
//                 </div>

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="h-8 px-3 text-xs border-gray-200 hover:border-[#6BA368] hover:text-[#6BA368]"
//                 >
//                   Next
//                   <ChevronRightIcon className="h-3.5 w-3.5 ml-1" />
//                 </Button>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CustomerCareProductHistory;

// import React, { useState, useEffect, useCallback } from "react";
// // import axiosInstance from "../../Utils/axiosIntance";

// // ─── MOCK DATA (remove when connecting real API) ───────────────────────────────
// const MOCK_PRODUCTS = [
//   { _id: "1",  ticketNumber: "TK-1001", category: { name: "Laptop" },      createdAt: "2025-01-10", configurations: { RAM: "16GB", Storage: "512GB", Display: "15.6 inch", Processor: "i7-12700H" } },
//   { _id: "2",  ticketNumber: "TK-1002", category: { name: "Laptop" },      createdAt: "2025-01-11", configurations: { RAM: "16GB", Storage: "512GB", Display: "15.6 inch", Processor: "i7-12700H" } },
//   { _id: "3",  ticketNumber: "TK-1003", category: { name: "Laptop" },      createdAt: "2025-01-12", configurations: { RAM: "32GB", Storage: "1TB",   Display: "15.6 inch", Processor: "i9-13900H" } },
//   { _id: "4",  ticketNumber: "TK-2001", category: { name: "Headphones" },  createdAt: "2025-02-01", configurations: { Type: "Over-Ear", Battery: "30H", Bluetooth: "5.2", NC: "Active" } },
//   { _id: "5",  ticketNumber: "TK-2002", category: { name: "Headphones" },  createdAt: "2025-02-02", configurations: { Type: "Over-Ear", Battery: "30H", Bluetooth: "5.2", NC: "Active" } },
//   { _id: "6",  ticketNumber: "TK-2003", category: { name: "Headphones" },  createdAt: "2025-02-03", configurations: { Type: "In-Ear",  Battery: "8H",  Bluetooth: "5.3", NC: "Passive" } },
//   { _id: "7",  ticketNumber: "TK-3001", category: { name: "Smartphone" },  createdAt: "2025-03-01", configurations: { Display: "6.8 inch", RAM: "12GB", Storage: "256GB", Camera: "200MP" } },
//   { _id: "8",  ticketNumber: "TK-3002", category: { name: "Smartphone" },  createdAt: "2025-03-02", configurations: { Display: "6.8 inch", RAM: "12GB", Storage: "256GB", Camera: "200MP" } },
//   { _id: "9",  ticketNumber: "TK-4001", category: { name: "Monitor" },     createdAt: "2025-04-01", configurations: { Size: "27 inch", Resolution: "4K", Panel: "IPS", RefreshRate: "144Hz" } },
//   { _id: "10", ticketNumber: "TK-4002", category: { name: "Monitor" },     createdAt: "2025-04-02", configurations: { Size: "27 inch", Resolution: "4K", Panel: "IPS", RefreshRate: "144Hz" } },
//   { _id: "11", ticketNumber: "TK-4003", category: { name: "Monitor" },     createdAt: "2025-04-03", configurations: { Size: "32 inch", Resolution: "QHD", Panel: "VA", RefreshRate: "165Hz" } },
// ];

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const getCategoryName = (p) => p.category?.name || p.category || "Uncategorized";
// const getConfigs = (c) => {
//   if (!c) return [];
//   if (c instanceof Map) return [...c.entries()];
//   if (typeof c === "object") return Object.entries(c);
//   return [];
// };

// // Group products by category → { "Laptop": [...], "Headphones": [...] }
// const groupByCategory = (products) => {
//   return products.reduce((acc, p) => {
//     const cat = getCategoryName(p);
//     if (!acc[cat]) acc[cat] = [];
//     acc[cat].push(p);
//     return acc;
//   }, {});
// };

// // ─── Category colour palette ──────────────────────────────────────────────────
// const CAT_COLORS = [
//   { bg: "#ede9fe", border: "#c4b5fd", text: "#6d28d9", accent: "#7c3aed" },
//   { bg: "#dbeafe", border: "#93c5fd", text: "#1d4ed8", accent: "#2563eb" },
//   { bg: "#dcfce7", border: "#86efac", text: "#15803d", accent: "#16a34a" },
//   { bg: "#fef3c7", border: "#fcd34d", text: "#b45309", accent: "#d97706" },
//   { bg: "#fce7f3", border: "#f9a8d4", text: "#be185d", accent: "#db2777" },
//   { bg: "#e0f2fe", border: "#7dd3fc", text: "#0369a1", accent: "#0284c7" },
// ];
// const getCatColor = (index) => CAT_COLORS[index % CAT_COLORS.length];

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function CustomerCareProductHistory({ onSelectTickets }) {
//   const [products,     setProducts]     = useState([]);
//   const [loading,      setLoading]      = useState(true);
//   const [error,        setError]        = useState(null);
//   const [searchTerm,   setSearchTerm]   = useState("");
//   const [expandedCats, setExpandedCats] = useState({});       // { "Laptop": true }
//   const [expandedRows, setExpandedRows] = useState({});       // { "TK-1001": true }
//   const [copiedId,     setCopiedId]     = useState(null);
//   const [selectedTickets, setSelectedTickets] = useState([]); // for bulk form
//   const [toast,        setToast]        = useState(null);

//   useEffect(() => { fetchProducts(); }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true); setError(null);
//       // Real API:
//       // const { data } = await axiosInstance.get("/category/history");
//       // const list = data.data || data.products || data || [];
//       await new Promise(r => setTimeout(r, 800)); // simulate
//       const list = MOCK_PRODUCTS;
//       setProducts(Array.isArray(list) ? list : []);
//       // Auto-expand first category
//       const cats = [...new Set(list.map(getCategoryName))];
//       if (cats.length) setExpandedCats({ [cats[0]]: true });
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to fetch products");
//     } finally { setLoading(false); }
//   };

//   // ── Filter ──────────────────────────────────────────────────────────────────
//   const filtered = products.filter(p => {
//     if (!searchTerm) return true;
//     const s = searchTerm.toLowerCase();
//     const ticket  = (p.ticketNumber || "").toLowerCase();
//     const cat     = getCategoryName(p).toLowerCase();
//     const configs = getConfigs(p.configurations).map(([, v]) => String(v).toLowerCase()).join(" ");
//     return ticket.includes(s) || cat.includes(s) || configs.includes(s);
//   });

//   const grouped   = groupByCategory(filtered);
//   const catNames  = Object.keys(grouped).sort();

//   // ── Toggle category expand ──────────────────────────────────────────────────
//   const toggleCat = (cat) => setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
//   const toggleRow = (id)  => setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));

//   // ── Copy single ticket number ───────────────────────────────────────────────
//   const copyTicket = (ticket, e) => {
//     e.stopPropagation();
//     navigator.clipboard.writeText(ticket).catch(() => {});
//     setCopiedId(ticket);
//     showToast(`Copied ${ticket}`);
//     setTimeout(() => setCopiedId(null), 2000);
//   };

//   // ── Select / deselect ticket for bulk registration ──────────────────────────
//   const toggleTicket = (ticket, e) => {
//     e.stopPropagation();
//     setSelectedTickets(prev =>
//       prev.includes(ticket) ? prev.filter(t => t !== ticket) : [...prev, ticket]
//     );
//   };

//   // ── Select ALL tickets in a category ───────────────────────────────────────
//   const selectAllInCategory = (cat, e) => {
//     e.stopPropagation();
//     const catTickets = grouped[cat].map(p => p.ticketNumber).filter(Boolean);
//     const allSelected = catTickets.every(t => selectedTickets.includes(t));
//     if (allSelected) {
//       setSelectedTickets(prev => prev.filter(t => !catTickets.includes(t)));
//     } else {
//       setSelectedTickets(prev => [...new Set([...prev, ...catTickets])]);
//     }
//   };

//   // ── Copy all selected tickets ───────────────────────────────────────────────
//   const copyAllSelected = () => {
//     navigator.clipboard.writeText(selectedTickets.join("\n")).catch(() => {});
//     showToast(`Copied ${selectedTickets.length} ticket numbers`);
//   };

//   // ── Use in form (sends to parent or copies) ─────────────────────────────────
//   const useInForm = () => {
//     if (onSelectTickets) {
//       onSelectTickets(selectedTickets);
//       showToast(`${selectedTickets.length} tickets sent to registration form`);
//     } else {
//       copyAllSelected();
//     }
//   };

//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(null), 2500);
//   };

//   const clearSelection = () => setSelectedTickets([]);

//   // ─────────────────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{CSS}</style>

//       {/* Toast */}
//       {toast && <div className="ph-toast">{toast}</div>}

//       <div className="ph-root">
//         <div className="ph-card">

//           {/* ── Header ── */}
//           <div className="ph-header">
//             <div className="ph-header-row">
//               <div>
//                 <h2 className="ph-title">
//                   <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                     <line x1="16" y1="13" x2="8" y2="13"/>
//                     <line x1="16" y1="17" x2="8" y2="17"/>
//                   </svg>
//                   Product History
//                   <span className="ph-count-badge">{filtered.length} products · {catNames.length} categories</span>
//                 </h2>
//                 <p className="ph-subtitle">Grouped by category — select tickets for bulk registration</p>
//               </div>
//               <button className="ph-refresh" onClick={fetchProducts} disabled={loading}>
//                 <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//                   <polyline points="23 4 23 10 17 10"/>
//                   <polyline points="1 20 1 14 7 14"/>
//                   <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
//                 </svg>
//                 {loading ? "Loading…" : "Refresh"}
//               </button>
//             </div>
//           </div>

//           {/* ── Selected Tickets Bar ── */}
//           {selectedTickets.length > 0 && (
//             <div className="ph-selected-bar">
//               <div className="ph-selected-info">
//                 <div className="ph-selected-dot" />
//                 <strong>{selectedTickets.length}</strong> ticket{selectedTickets.length > 1 ? "s" : ""} selected for bulk registration
//                 <div className="ph-selected-chips">
//                   {selectedTickets.map(t => (
//                     <span key={t} className="ph-sel-chip">
//                       {t}
//                       <button onClick={() => setSelectedTickets(prev => prev.filter(x => x !== t))} className="ph-sel-chip-x">✕</button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="ph-selected-actions">
//                 <button className="ph-btn-outline" onClick={copyAllSelected}>
//                   <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
//                   </svg>
//                   Copy All
//                 </button>
//                 <button className="ph-btn-primary" onClick={useInForm}>
//                   <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
//                     <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
//                   </svg>
//                   Use in Bulk Form →
//                 </button>
//                 <button className="ph-btn-ghost" onClick={clearSelection}>Clear</button>
//               </div>
//             </div>
//           )}

//           {/* ── Toolbar ── */}
//           <div className="ph-toolbar">
//             <div className="ph-search">
//               <span className="ph-search-icon">
//                 <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                   <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//                 </svg>
//               </span>
//               <input
//                 placeholder="Search ticket number, category, config…"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//               {searchTerm && (
//                 <button className="ph-clear-search" onClick={() => setSearchTerm("")}>✕</button>
//               )}
//             </div>
//             <div style={{ fontSize: 12, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
//               {catNames.length} categories
//             </div>
//           </div>

//           {/* ── Error ── */}
//           {error && (
//             <div className="ph-error">
//               ⚠️ {error}&nbsp;
//               <button onClick={fetchProducts} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Retry</button>
//             </div>
//           )}

//           {/* ── Skeleton ── */}
//           {loading && (
//             <div className="ph-loading">
//               {[...Array(4)].map((_, i) => <div key={i} className="ph-skeleton" style={{ height: i === 0 ? 56 : 44 }} />)}
//             </div>
//           )}

//           {/* ── Category Groups ── */}
//           {!loading && !error && (
//             <div className="ph-groups">
//               {catNames.length === 0 ? (
//                 <div className="ph-empty">
//                   <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
//                   <div style={{ fontWeight: 700, color: "var(--text-secondary)", fontSize: 14 }}>No products found</div>
//                   <div style={{ fontSize: 12, marginTop: 4, color: "#9fb3be" }}>Try adjusting your search</div>
//                 </div>
//               ) : (
//                 catNames.map((cat, catIdx) => {
//                   const items      = grouped[cat];
//                   const color      = getCatColor(catIdx);
//                   const isOpen     = !!expandedCats[cat];
//                   const catTickets = items.map(p => p.ticketNumber).filter(Boolean);
//                   const selCount   = catTickets.filter(t => selectedTickets.includes(t)).length;
//                   const allSel     = selCount === catTickets.length && catTickets.length > 0;

//                   return (
//                     <div key={cat} className="ph-cat-group">

//                       {/* ── Category Header Row ── */}
//                       <div
//                         className="ph-cat-header"
//                         style={{ borderLeftColor: color.accent }}
//                         onClick={() => toggleCat(cat)}
//                       >
//                         <div className="ph-cat-left">
//                           {/* Chevron */}
//                           <span className={`ph-chevron${isOpen ? " open" : ""}`}>
//                             <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={color.accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M6 9l6 6 6-6"/>
//                             </svg>
//                           </span>

//                           {/* Category name */}
//                           <span className="ph-cat-name" style={{ color: color.text, background: color.bg, border: `1px solid ${color.border}` }}>
//                             {cat}
//                           </span>

//                           {/* Count */}
//                           <span className="ph-cat-count" style={{ color: color.accent }}>
//                             {items.length} product{items.length > 1 ? "s" : ""}
//                           </span>

//                           {/* Selected indicator */}
//                           {selCount > 0 && (
//                             <span className="ph-cat-sel-badge">
//                               {selCount}/{catTickets.length} selected
//                             </span>
//                           )}
//                         </div>

//                         {/* Category-level actions */}
//                         <div className="ph-cat-actions" onClick={e => e.stopPropagation()}>
//                           <button
//                             className={`ph-cat-selall${allSel ? " active" : ""}`}
//                             onClick={(e) => selectAllInCategory(cat, e)}
//                             title={allSel ? "Deselect all in category" : "Select all in category"}
//                           >
//                             {allSel ? "✓ All Selected" : "☐ Select All"}
//                           </button>
//                         </div>
//                       </div>

//                       {/* ── Ticket Rows ── */}
//                       {isOpen && (
//                         <div className="ph-ticket-rows">
//                           {/* Column headers */}
//                           <div className="ph-ticket-thead">
//                             <span style={{ width: 28 }}></span>
//                             <span>Ticket Number</span>
//                             <span>Registered</span>
//                             <span>Configuration Preview</span>
//                             <span style={{ width: 120, textAlign: "right" }}>Actions</span>
//                           </div>

//                           {items.map((product) => {
//                             const configs    = getConfigs(product.configurations);
//                             const ticket     = product.ticketNumber;
//                             const isRowOpen  = !!expandedRows[product._id];
//                             const isSel      = selectedTickets.includes(ticket);
//                             const isCopied   = copiedId === ticket;

//                             return (
//                               <React.Fragment key={product._id}>
//                                 <div
//                                   className={`ph-ticket-row${isSel ? " selected" : ""}${isRowOpen ? " row-open" : ""}`}
//                                   onClick={() => toggleRow(product._id)}
//                                 >
//                                   {/* Checkbox */}
//                                   <div
//                                     className={`ph-checkbox${isSel ? " checked" : ""}`}
//                                     style={isSel ? { background: color.accent, borderColor: color.accent } : {}}
//                                     onClick={(e) => toggleTicket(ticket, e)}
//                                   >
//                                     {isSel && <span>✓</span>}
//                                   </div>

//                                   {/* Ticket Number — the MAIN field */}
//                                   <div className="ph-ticket-num">
//                                     <span className="ph-ticket-badge" style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text }}>
//                                       {ticket || "—"}
//                                     </span>
//                                   </div>

//                                   {/* Date */}
//                                   <div className="ph-ticket-date">
//                                     {product.createdAt
//                                       ? new Date(product.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
//                                       : "—"}
//                                   </div>

//                                   {/* Config preview chips */}
//                                   <div className="ph-ticket-configs">
//                                     {configs.slice(0, 3).map(([k, v]) => (
//                                       <span key={k} className="ph-chip">
//                                         <span className="ph-chip-key">{k}:</span>
//                                         <span className="ph-chip-val">{String(v)}</span>
//                                       </span>
//                                     ))}
//                                     {configs.length > 3 && (
//                                       <span className="ph-chip-more">+{configs.length - 3}</span>
//                                     )}
//                                   </div>

//                                   {/* Action buttons */}
//                                   <div className="ph-ticket-actions" onClick={e => e.stopPropagation()}>
//                                     {/* Copy */}
//                                     <button
//                                       className={`ph-act-btn copy${isCopied ? " copied" : ""}`}
//                                       onClick={(e) => copyTicket(ticket, e)}
//                                       title="Copy ticket number"
//                                     >
//                                       {isCopied ? (
//                                         <>✓ Copied</>
//                                       ) : (
//                                         <>
//                                           <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//                                             <rect x="9" y="9" width="13" height="13" rx="2"/>
//                                             <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
//                                           </svg>
//                                           Copy
//                                         </>
//                                       )}
//                                     </button>
//                                     {/* Add to selection */}
//                                     <button
//                                       className={`ph-act-btn select${isSel ? " selected" : ""}`}
//                                       onClick={(e) => toggleTicket(ticket, e)}
//                                       title={isSel ? "Remove from selection" : "Add to bulk form"}
//                                     >
//                                       {isSel ? "− Remove" : "+ Add"}
//                                     </button>
//                                     {/* Expand */}
//                                     <span className={`ph-chevron${isRowOpen ? " open" : ""}`} style={{ marginLeft: 4 }}>
//                                       <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#9fb3be" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//                                         <path d="M6 9l6 6 6-6"/>
//                                       </svg>
//                                     </span>
//                                   </div>
//                                 </div>

//                                 {/* ── Expanded config detail ── */}
//                                 {isRowOpen && (
//                                   <div className="ph-row-detail" style={{ borderLeftColor: color.accent }}>
//                                     <div className="ph-detail-label" style={{ color: color.accent }}>
//                                       Full Configuration — {ticket}
//                                     </div>
//                                     <div className="ph-detail-chips">
//                                       {configs.map(([k, v]) => (
//                                         <span key={k} className="ph-chip large">
//                                           <span className="ph-chip-key">{k}:</span>
//                                           <span className="ph-chip-val">{String(v)}</span>
//                                         </span>
//                                       ))}
//                                     </div>
//                                     {/* One-click copy for this ticket right from detail */}
//                                     <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
//                                       <button className="ph-act-btn copy" style={{ fontSize: 12, padding: "6px 14px" }}
//                                         onClick={(e) => copyTicket(ticket, e)}>
//                                         Copy Ticket Number
//                                       </button>
//                                       <button className={`ph-act-btn select${isSel ? " selected" : ""}`} style={{ fontSize: 12, padding: "6px 14px" }}
//                                         onClick={(e) => toggleTicket(ticket, e)}>
//                                         {isSel ? "− Remove from bulk" : "+ Add to bulk form"}
//                                       </button>
//                                     </div>
//                                   </div>
//                                 )}
//                               </React.Fragment>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           )}

//           {/* ── Bottom summary ── */}
//           {!loading && selectedTickets.length > 0 && (
//             <div className="ph-bottom-bar">
//               <span>{selectedTickets.length} ticket{selectedTickets.length > 1 ? "s" : ""} ready for bulk registration</span>
//               <button className="ph-btn-primary" onClick={useInForm}>
//                 Use in Bulk Form ({selectedTickets.length}) →
//               </button>
//             </div>
//           )}

//         </div>
//       </div>
//     </>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');

//   .ph-root {
//     --primary:        #2B6F84;
//     --primary-dark:   #1F5668;
//     --background:     #F2F6F9;
//     --card-bg:        #FFFFFF;
//     --border:         #D9E6ED;
//     --text-primary:   #1E2A32;
//     --text-secondary: #6B7C86;
//   }
//   .ph-root *, .ph-root *::before, .ph-root *::after { box-sizing: border-box; }
//   .ph-root {
//     font-family: 'DM Sans', sans-serif;
//     background: var(--background);
//     min-height: 100vh;
//     padding: 24px 20px 60px;
//   }

//   .ph-card {
//     background: var(--card-bg);
//     border-radius: 16px;
//     border: 1px solid var(--border);
//     box-shadow: 0 4px 24px rgba(43,111,132,0.08);
//     overflow: hidden;
//   }

//   /* Header */
//   .ph-header {
//     background: linear-gradient(135deg, var(--primary-dark), var(--primary));
//     padding: 22px 26px 18px;
//   }
//   .ph-header-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
//   .ph-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 19px; font-weight: 800; color: #fff;
//     margin: 0 0 4px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
//   }
//   .ph-subtitle { font-size: 12px; color: rgba(255,255,255,0.55); margin: 0; }
//   .ph-count-badge {
//     font-family: 'DM Sans', sans-serif;
//     font-size: 11px; font-weight: 600;
//     background: rgba(255,255,255,0.18);
//     border: 1px solid rgba(255,255,255,0.22);
//     border-radius: 20px; padding: 3px 10px; color: #fff;
//   }
//   .ph-refresh {
//     display: flex; align-items: center; gap: 6px;
//     padding: 8px 14px; background: rgba(255,255,255,0.15);
//     border: 1px solid rgba(255,255,255,0.3);
//     border-radius: 8px; font-size: 12px; font-weight: 700;
//     color: #fff; cursor: pointer; transition: all .18s; white-space: nowrap;
//     font-family: 'DM Sans', sans-serif;
//   }
//   .ph-refresh:hover:not(:disabled) { background: rgba(255,255,255,0.28); }
//   .ph-refresh:disabled { opacity: .5; cursor: not-allowed; }

//   /* Selected bar */
//   .ph-selected-bar {
//     background: linear-gradient(135deg, #1a3a45, #1d4a5a);
//     border-bottom: 1px solid #2a5a6e;
//     padding: 12px 24px;
//     display: flex; align-items: flex-start; justify-content: space-between;
//     gap: 12px; flex-wrap: wrap;
//   }
//   .ph-selected-info {
//     display: flex; align-items: flex-start; gap: 10px;
//     font-size: 13px; color: #90cfe0; font-weight: 600; flex-wrap: wrap; flex: 1;
//   }
//   .ph-selected-dot {
//     width: 8px; height: 8px; border-radius: 50%;
//     background: #4ade80; margin-top: 3px; flex-shrink: 0;
//     box-shadow: 0 0 6px #4ade80;
//   }
//   .ph-selected-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 6px; width: 100%; }
//   .ph-sel-chip {
//     display: inline-flex; align-items: center; gap: 5px;
//     background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
//     border-radius: 6px; padding: 3px 8px;
//     font-size: 11px; color: #e0f2fe; font-family: 'DM Mono', monospace;
//   }
//   .ph-sel-chip-x {
//     background: none; border: none; color: #90cfe0;
//     cursor: pointer; font-size: 10px; padding: 0 2px; line-height: 1;
//   }
//   .ph-selected-actions { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }

//   /* Toolbar */
//   .ph-toolbar {
//     padding: 14px 22px; border-bottom: 1px solid var(--border);
//     background: #fafcfd; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
//   }
//   .ph-search { position: relative; flex: 1; min-width: 220px; max-width: 460px; }
//   .ph-search input {
//     width: 100%; padding: 9px 36px 9px 38px;
//     border: 1.5px solid var(--border); border-radius: 9px;
//     font-size: 13px; outline: none; background: #fff;
//     color: var(--text-primary); font-family: 'DM Sans', sans-serif;
//     transition: border-color .2s, box-shadow .2s;
//   }
//   .ph-search input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(43,111,132,.1); }
//   .ph-search input::placeholder { color: #c0d4dc; }
//   .ph-search-icon {
//     position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
//     color: var(--text-secondary); display: flex; align-items: center; pointer-events: none;
//   }
//   .ph-clear-search {
//     position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
//     background: none; border: none; color: var(--text-secondary);
//     cursor: pointer; font-size: 13px; padding: 2px;
//   }

//   /* Groups */
//   .ph-groups { padding: 16px 20px 20px; display: flex; flex-direction: column; gap: 14px; }

//   /* Category group card */
//   .ph-cat-group {
//     border: 1.5px solid var(--border);
//     border-radius: 12px; overflow: hidden;
//   }

//   /* Category header */
//   .ph-cat-header {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 13px 18px; background: #f8fbfc;
//     border-left: 4px solid; cursor: pointer;
//     transition: background .15s; gap: 12px; flex-wrap: wrap;
//   }
//   .ph-cat-header:hover { background: #eef5f8; }
//   .ph-cat-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
//   .ph-cat-name {
//     font-size: 13px; font-weight: 700;
//     padding: 4px 12px; border-radius: 7px;
//     letter-spacing: .2px;
//   }
//   .ph-cat-count { font-size: 12px; font-weight: 600; }
//   .ph-cat-sel-badge {
//     background: #d1fae5; color: #065f46; border: 1px solid #6ee7b7;
//     border-radius: 10px; font-size: 11px; font-weight: 700;
//     padding: 2px 8px;
//   }
//   .ph-cat-actions { display: flex; align-items: center; gap: 8px; }
//   .ph-cat-selall {
//     font-size: 11px; font-weight: 700; padding: 5px 12px;
//     border: 1.5px solid var(--border); border-radius: 7px;
//     background: #fff; color: var(--text-secondary);
//     cursor: pointer; transition: all .15s;
//     font-family: 'DM Sans', sans-serif; white-space: nowrap;
//   }
//   .ph-cat-selall:hover { border-color: var(--primary); color: var(--primary); }
//   .ph-cat-selall.active { background: var(--primary); color: #fff; border-color: var(--primary); }

//   /* Ticket rows container */
//   .ph-ticket-rows { border-top: 1px solid var(--border); }
//   .ph-ticket-thead {
//     display: grid; grid-template-columns: 28px 150px 110px 1fr 140px;
//     padding: 8px 18px; background: #f4f8fa;
//     border-bottom: 1px solid var(--border);
//     font-size: 10px; font-weight: 700; text-transform: uppercase;
//     letter-spacing: .07em; color: var(--text-secondary); gap: 12px; align-items: center;
//   }

//   /* Individual ticket row */
//   .ph-ticket-row {
//     display: grid; grid-template-columns: 28px 150px 110px 1fr 140px;
//     padding: 11px 18px; gap: 12px; align-items: center;
//     border-bottom: 1px solid #f0f5f7;
//     cursor: pointer; transition: background .13s;
//   }
//   .ph-ticket-row:hover { background: #f4fbfd; }
//   .ph-ticket-row.selected { background: #e8f8f0; }
//   .ph-ticket-row.row-open { background: #eef5f8; }
//   .ph-ticket-row:last-child { border-bottom: none; }

//   /* Checkbox */
//   .ph-checkbox {
//     width: 18px; height: 18px; border-radius: 5px;
//     border: 2px solid var(--border); background: #fff;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; transition: all .15s; flex-shrink: 0;
//     font-size: 11px; color: #fff; font-weight: 700;
//   }
//   .ph-checkbox:hover { border-color: var(--primary); }

//   /* Ticket badge */
//   .ph-ticket-badge {
//     font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500;
//     padding: 4px 10px; border-radius: 6px; white-space: nowrap;
//     display: inline-block;
//   }
//   .ph-ticket-date { font-size: 12px; color: var(--text-secondary); white-space: nowrap; }
//   .ph-ticket-configs { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
//   .ph-ticket-actions { display: flex; align-items: center; gap: 5px; justify-content: flex-end; }

//   /* Config chips */
//   .ph-chip {
//     display: inline-flex; gap: 3px; align-items: center;
//     background: #f0f7fa; border: 1px solid var(--border);
//     border-radius: 5px; padding: 2px 7px; font-size: 11px; white-space: nowrap;
//   }
//   .ph-chip.large { padding: 4px 10px; font-size: 12px; }
//   .ph-chip-key { color: var(--text-secondary); }
//   .ph-chip-val { color: var(--primary); font-weight: 700; }
//   .ph-chip-more {
//     font-size: 11px; color: var(--text-secondary);
//     background: #eef5f8; border: 1px solid var(--border);
//     border-radius: 5px; padding: 2px 7px; font-weight: 600;
//   }

//   /* Action buttons */
//   .ph-act-btn {
//     display: inline-flex; align-items: center; gap: 4px;
//     padding: 5px 10px; border-radius: 6px;
//     font-size: 11px; font-weight: 700; cursor: pointer;
//     transition: all .15s; border: 1.5px solid; white-space: nowrap;
//     font-family: 'DM Sans', sans-serif;
//   }
//   .ph-act-btn.copy { background: #fff; border-color: var(--border); color: var(--text-secondary); }
//   .ph-act-btn.copy:hover { border-color: var(--primary); color: var(--primary); background: #eef6f9; }
//   .ph-act-btn.copy.copied { background: #dcfce7; border-color: #6ee7b7; color: #15803d; }
//   .ph-act-btn.select { background: #fff; border-color: var(--border); color: var(--text-secondary); }
//   .ph-act-btn.select:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
//   .ph-act-btn.select.selected { background: #dcfce7; border-color: #6ee7b7; color: #15803d; }

//   /* Expanded row detail */
//   .ph-row-detail {
//     padding: 14px 18px 16px 52px;
//     background: #f0f8fb;
//     border-top: 1px solid var(--border);
//     border-left: 4px solid;
//   }
//   .ph-detail-label {
//     font-size: 10px; font-weight: 800; text-transform: uppercase;
//     letter-spacing: .08em; margin-bottom: 10px;
//     display: flex; align-items: center; gap: 6px;
//   }
//   .ph-detail-chips { display: flex; flex-wrap: wrap; gap: 7px; }

//   /* Buttons */
//   .ph-btn-primary {
//     display: inline-flex; align-items: center; gap: 6px;
//     padding: 8px 16px; background: #2ecc71; color: #fff;
//     border: none; border-radius: 8px; font-size: 12px; font-weight: 700;
//     cursor: pointer; transition: background .15s; white-space: nowrap;
//     font-family: 'DM Sans', sans-serif;
//   }
//   .ph-btn-primary:hover { background: #27ae60; }
//   .ph-btn-outline {
//     display: inline-flex; align-items: center; gap: 6px;
//     padding: 7px 13px; background: rgba(255,255,255,.12);
//     border: 1px solid rgba(255,255,255,.3); border-radius: 8px;
//     font-size: 12px; font-weight: 700; color: #fff; cursor: pointer;
//     transition: all .15s; font-family: 'DM Sans', sans-serif;
//   }
//   .ph-btn-outline:hover { background: rgba(255,255,255,.22); }
//   .ph-btn-ghost {
//     padding: 7px 12px; background: none;
//     border: 1px solid rgba(255,255,255,.2); border-radius: 8px;
//     font-size: 12px; color: rgba(255,255,255,.6); cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//   }
//   .ph-btn-ghost:hover { color: #fff; border-color: rgba(255,255,255,.5); }

//   /* Bottom bar */
//   .ph-bottom-bar {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 14px 24px; border-top: 1px solid var(--border);
//     background: #f0fdf4; gap: 12px; flex-wrap: wrap;
//     font-size: 13px; font-weight: 600; color: #15803d;
//   }

//   /* Toast */
//   .ph-toast {
//     position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
//     background: #1a3a45; color: #e0f2fe;
//     padding: 10px 20px; border-radius: 10px;
//     font-size: 13px; font-weight: 600;
//     box-shadow: 0 8px 32px rgba(0,0,0,.25);
//     z-index: 9999; white-space: nowrap;
//     animation: toastIn .25s ease;
//     font-family: 'DM Sans', sans-serif;
//   }
//   @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(10px) } to { opacity:1; transform: translateX(-50%) translateY(0) } }

//   /* Skeleton */
//   .ph-loading { padding: 20px; display: flex; flex-direction: column; gap: 10px; }
//   .ph-skeleton {
//     border-radius: 8px;
//     background: linear-gradient(90deg,#e8f0f4 25%,#d4e4ec 50%,#e8f0f4 75%);
//     background-size: 200% 100%; animation: shimmer 1.4s infinite;
//   }
//   @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

//   .ph-error {
//     margin: 16px 22px; padding: 12px 16px;
//     background: #fff5f5; border: 1px solid #fca5a5;
//     border-left: 3px solid #e57373;
//     border-radius: 10px; color: #b91c1c; font-size: 13px;
//   }
//   .ph-empty { text-align: center; padding: 48px 24px; }

//   /* Chevron */
//   .ph-chevron { display: inline-flex; transition: transform .2s; }
//   .ph-chevron.open { transform: rotate(180deg); }
// `;


import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../Utils/axiosIntance";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getCategoryName = (p) => p.category?.name || p.category || "Uncategorized";

const getConfigs = (c) => {
  if (!c) return [];
  if (c instanceof Map) return [...c.entries()];
  if (typeof c === "object") return Object.entries(c);
  return [];
};

const groupByCategory = (products) =>
  products.reduce((acc, p) => {
    const cat = getCategoryName(p);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

const CAT_COLORS = [
  { bg: "#ede9fe", border: "#c4b5fd", text: "#6d28d9", accent: "#7c3aed" },
  { bg: "#dbeafe", border: "#93c5fd", text: "#1d4ed8", accent: "#2563eb" },
  { bg: "#dcfce7", border: "#86efac", text: "#15803d", accent: "#16a34a" },
  { bg: "#fef3c7", border: "#fcd34d", text: "#b45309", accent: "#d97706" },
  { bg: "#fce7f3", border: "#f9a8d4", text: "#be185d", accent: "#db2777" },
  { bg: "#e0f2fe", border: "#7dd3fc", text: "#0369a1", accent: "#0284c7" },
];
const getCatColor = (i) => CAT_COLORS[i % CAT_COLORS.length];

// ─── Spinner ──────────────────────────────────────────────────────────────────
const Spin = ({ size = 14 }) => (
  <span style={{
    display: "inline-block", width: size, height: size, flexShrink: 0,
    border: "2px solid #d9e6ed", borderTop: "2px solid #2B6F84",
    borderRadius: "50%", animation: "cc-spin .7s linear infinite",
  }} />
);

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function CustomerCareRegistration() {
  const [view, setView] = useState("history");

  // ── Product History state ─────────────────────────────────────────────────
  const [products,        setProducts]        = useState([]);
  const [histLoading,     setHistLoading]      = useState(true);
  const [histError,       setHistError]        = useState(null);
  const [searchTerm,      setSearchTerm]       = useState("");
  const [expandedCats,    setExpandedCats]     = useState({});
  const [expandedRows,    setExpandedRows]     = useState({});
  const [copiedId,        setCopiedId]         = useState(null);
  const [selectedTickets, setSelectedTickets]  = useState([]);
  const [toast,           setToast]            = useState(null);

  // ── NEW: deletingProductId ────────────────────────────────────────────────
  // Tracks which product is currently being soft-deleted.
  // When DELETE is clicked → set to that product._id → button shows spinner.
  // After API responds → cleared back to null.
  // Only one product can be deleted at a time (prevents double-clicks).
  const [deletingProductId, setDeletingProductId] = useState(null);

  // ── Registration Form state ───────────────────────────────────────────────
  const [purchaseType,  setPurchaseType]  = useState("single");
  const [customer,      setCustomer]      = useState({ customerName: "", email: "", mobileNum: "" });
  const [warrDates,     setWarrDates]     = useState({ warrStartDate: "", warrEndDate: "" });
  const [singleTicket,  setSingleTicket]  = useState("");
  const [singleProduct, setSingleProduct] = useState(null);
  const [singleState,   setSingleState]   = useState("idle");
  const [singleErr,     setSingleErr]     = useState("");
  const [bulkList,      setBulkList]      = useState([]);
  const [bulkInput,     setBulkInput]     = useState("");
  const [bulkInputState,setBulkInputState]= useState("idle");
  const [bulkInputErr,  setBulkInputErr]  = useState("");
  const [bulkFetched,   setBulkFetched]   = useState(null);
  const [submitState,   setSubmitState]   = useState("idle");
  const [submitError,   setSubmitError]   = useState("");
  const [submitted,     setSubmitted]     = useState(false);
  const [savedReg,      setSavedReg]      = useState(null);

  const singleDebounce = useRef(null);
  const bulkDebounce   = useRef(null);

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    if (selectedTickets.length > 0 && view === "form") {
      prefillBulkFromHistory(selectedTickets);
    }
  }, [view]);

  useEffect(() => {
    if (purchaseType !== "single") return;
    if (!singleTicket || singleTicket.length < 4) {
      setSingleProduct(null); setSingleState("idle"); return;
    }
    clearTimeout(singleDebounce.current);
    singleDebounce.current = setTimeout(() => fetchSingleProduct(singleTicket), 600);
  }, [singleTicket, purchaseType]);

  useEffect(() => {
    if (purchaseType !== "bulk") return;
    if (!bulkInput || bulkInput.length < 4) {
      setBulkInputState("idle"); setBulkInputErr(""); setBulkFetched(null); return;
    }
    if (bulkList.some(i => i.ticketNumber.toUpperCase() === bulkInput.toUpperCase().trim())) {
      setBulkInputState("duplicate"); setBulkInputErr("Already added"); return;
    }
    clearTimeout(bulkDebounce.current);
    bulkDebounce.current = setTimeout(() => fetchBulkInputProduct(bulkInput), 600);
  }, [bulkInput, purchaseType]);

  // ── Fetch product history ─────────────────────────────────────────────────
  const fetchProducts = async () => {
    try {
      setHistLoading(true); setHistError(null);
      const { data } = await axiosInstance.get("/category/history");
      const list = data.data || data.products || data || [];
      setProducts(Array.isArray(list) ? list : []);
      const cats = [...new Set((Array.isArray(list) ? list : []).map(getCategoryName))];
      if (cats.length) setExpandedCats({ [cats[0]]: true });
    } catch (err) {
      setHistError(err?.response?.data?.message || "Failed to fetch products");
    } finally {
      setHistLoading(false);
    }
  };

  // ── NEW: handleDeleteProduct ──────────────────────────────────────────────
  //
  // HOW IT WORKS — step by step:
  //
  // 1. e.stopPropagation()
  //    The delete button sits inside a row that has onClick={() => toggleRow()}.
  //    Without this, clicking delete would ALSO expand/collapse the row.
  //    stopPropagation stops the click from "bubbling up" to the parent div.
  //
  // 2. window.confirm()
  //    Shows a browser confirm dialog before doing anything destructive.
  //    If the user clicks Cancel → function returns early, nothing happens.
  //
  // 3. setDeletingProductId(productId)
  //    Stores which product is being deleted.
  //    The JSX checks: isDeleting = deletingProductId === product._id
  //    When true → button renders a spinner instead of the trash icon.
  //    Only that one button shows loading; everything else stays normal.
  //
  // 4. axiosInstance.delete(`/category/${productId}`)
  //    Calls:  DELETE http://localhost:5000/api/category/:id
  //    Route:  router.delete("/:id", verifyToken, authorizeRoles(...), deleteCategoryProduct)
  //    Service: Category.findByIdAndUpdate(id, { isActive: false }, { new: true })
  //    Result: isActive becomes false in MongoDB (soft delete — data stays)
  //
  // 5. setProducts(prev => prev.filter(p => p._id !== productId))
  //    Removes the deleted product from local state INSTANTLY.
  //    No need to re-fetch the whole list — just filter it out.
  //    prev = current products array
  //    .filter() returns a NEW array keeping everything EXCEPT the deleted _id
  //
  // 6. Also remove from selectedTickets if the deleted product was selected
  //    setSelectedTickets(prev => prev.filter(t => t !== ticketNumber))
  //
  // 7. showToast() — success message at bottom of screen
  //
  // 8. catch block — if API fails, show error toast
  //
  // 9. finally block — ALWAYS runs, clears deletingProductId so spinner stops
  //    This runs whether the API succeeded or failed

  const handleDeleteProduct = async (productId, ticketNumber, e) => {
    e.stopPropagation(); // prevent row expand/collapse from triggering
    console.log("Deleting product ID:", productId);           // ← what ID is being sent?
  console.log("Full URL:", `/customerDetails/products/${productId}`);
    if (!window.confirm(`Deactivate product "${ticketNumber}"?\nIt will be hidden from this list.`)) return;

    setDeletingProductId(productId);
    try {
      // DELETE /api/category/:id → sets isActive: false in DB
      
      await axiosInstance.delete(`/customerDetails/products/${productId}`);

      // Remove from local state instantly — no full re-fetch needed
      setProducts(prev => prev.filter(p => p._id !== productId));

      // Also deselect it if it was selected
      setSelectedTickets(prev => prev.filter(t => t !== ticketNumber));

      showToast(`✓ Product ${ticketNumber} deactivated`);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to deactivate product";
      showToast(`⚠ ${msg}`);
    } finally {
      setDeletingProductId(null); // always clear spinner
    }
  };

  // ── Lookup functions ──────────────────────────────────────────────────────
  const fetchSingleProduct = async (ticket) => {
    try {
      setSingleState("loading"); setSingleProduct(null); setSingleErr("");
      const { data } = await axiosInstance.get(
        `/customerDetails/product/lookup?identifier=${encodeURIComponent(ticket.trim())}`
      );
      setSingleProduct(data.product);
      setSingleState("ok");
    } catch (err) {
      setSingleErr(err?.response?.data?.message || "Product not found");
      setSingleState("err");
    }
  };

  const fetchBulkInputProduct = async (ticket) => {
    try {
      setBulkInputState("loading"); setBulkInputErr(""); setBulkFetched(null);
      const { data } = await axiosInstance.get(
        `/customerDetails/product/lookup?identifier=${encodeURIComponent(ticket.trim())}`
      );
      setBulkFetched(data.product);
      setBulkInputState("ok");
    } catch (err) {
      setBulkInputErr(err?.response?.data?.message || "Product not found");
      setBulkInputState("err");
    }
  };

  const addToBulkList = () => {
    if (bulkInputState !== "ok" || !bulkFetched) return;
    const id = bulkInput.toUpperCase().trim();
    if (bulkList.some(i => i.ticketNumber === id)) return;
    setBulkList(prev => [...prev, {
      ticketNumber:  bulkFetched.ticketNumber,
      product:       bulkFetched,
      warrStartDate: warrDates.warrStartDate,
      warrEndDate:   warrDates.warrEndDate,
    }]);
    setBulkInput(""); setBulkInputState("idle"); setBulkFetched(null);
  };

  const prefillBulkFromHistory = async (tickets) => {
    if (!tickets.length) return;
    setPurchaseType(tickets.length === 1 ? "single" : "bulk");
    if (tickets.length === 1) { setSingleTicket(tickets[0]); return; }
    const results = await Promise.allSettled(
      tickets.map(t =>
        axiosInstance.get(`/customerDetails/product/lookup?identifier=${encodeURIComponent(t)}`)
          .then(r => ({ ticketNumber: t, product: r.data.product, warrStartDate: "", warrEndDate: "" }))
      )
    );
    setBulkList(results.filter(r => r.status === "fulfilled").map(r => r.value));
  };

  const handleSubmit = async () => {
    try {
      setSubmitState("loading"); setSubmitError("");
      const products = purchaseType === "single"
        ? [{ ticketNumber: singleTicket.trim(), warrStartDate: warrDates.warrStartDate, warrEndDate: warrDates.warrEndDate }]
        : bulkList.map(item => ({
            ticketNumber:  item.ticketNumber,
            warrStartDate: item.warrStartDate || warrDates.warrStartDate,
            warrEndDate:   item.warrEndDate   || warrDates.warrEndDate,
          }));
      const { data } = await axiosInstance.post("/customerDetails/register", {
        customerName: customer.customerName.trim(),
        email:        customer.email.trim(),
        mobileNum:    customer.mobileNum.trim(),
        purchaseType, products,
      });
      setSavedReg(data.data); setSubmitState("done"); setSubmitted(true);
    } catch (err) {
      setSubmitError(err?.response?.data?.message || "Registration failed. Please try again.");
      setSubmitState("err");
    }
  };

  const handleUseInForm = () => { setView("form"); showToast(`${selectedTickets.length} ticket(s) sent to registration form`); };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const resetForm = () => {
    setCustomer({ customerName: "", email: "", mobileNum: "" });
    setWarrDates({ warrStartDate: "", warrEndDate: "" });
    setSingleTicket(""); setSingleProduct(null); setSingleState("idle");
    setBulkList([]); setBulkInput(""); setBulkInputState("idle");
    setSubmitState("idle"); setSubmitError(""); setSubmitted(false); setSavedReg(null);
    setPurchaseType("single"); setSelectedTickets([]);
  };

  const custOk      = customer.customerName && customer.email && customer.mobileNum;
  const datesOk     = warrDates.warrStartDate && warrDates.warrEndDate;
  const singleValid = purchaseType === "single" && singleState === "ok" && custOk && datesOk;
  const bulkValid   = purchaseType === "bulk"   && bulkList.length >= 2 && custOk;
  const canSubmit   = (singleValid || bulkValid) && submitState !== "loading";

  const filtered  = products.filter(p => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (p.ticketNumber || "").toLowerCase().includes(s)
      || getCategoryName(p).toLowerCase().includes(s)
      || getConfigs(p.configurations).map(([, v]) => String(v).toLowerCase()).join(" ").includes(s);
  });
  const grouped  = groupByCategory(filtered);
  const catNames = Object.keys(grouped).sort();

  const toggleCat    = (cat) => setExpandedCats(p => ({ ...p, [cat]: !p[cat] }));
  const toggleRow    = (id)  => setExpandedRows(p => ({ ...p, [id]:  !p[id] }));
  const toggleTicket = (ticket, e) => {
    e.stopPropagation();
    setSelectedTickets(p => p.includes(ticket) ? p.filter(t => t !== ticket) : [...p, ticket]);
  };
  const selectAllInCat = (cat, e) => {
    e.stopPropagation();
    const ts = grouped[cat].map(p => p.ticketNumber).filter(Boolean);
    const allSel = ts.every(t => selectedTickets.includes(t));
    setSelectedTickets(p => allSel ? p.filter(t => !ts.includes(t)) : [...new Set([...p, ...ts])]);
  };
  const copyTicket = (ticket, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ticket).catch(() => {});
    setCopiedId(ticket);
    showToast(`Copied ${ticket}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted && savedReg) {
    return (
      <div className="cc-root">
        <style>{CSS}</style>
        <div className="cc-success-wrap">
          <div className="cc-success-icon">✓</div>
          <h2 className="cc-success-title">Registration Complete</h2>
          <p className="cc-success-sub">
            Ref: <strong style={{ color: "#2B6F84", fontFamily: "DM Mono, monospace" }}>
              {savedReg._id?.slice(-8).toUpperCase() || "—"}
            </strong>
          </p>
          <div className="cc-detail-box">
            <DetailRow label="Customer"  value={savedReg.customerName} />
            <DetailRow label="Email"     value={savedReg.email} />
            <DetailRow label="Mobile"    value={savedReg.mobileNum} />
            <DetailRow label="Type"      value={savedReg.purchaseType === "bulk" ? "Bulk Purchase" : "Single Purchase"}
              accent={savedReg.purchaseType === "bulk" ? "#d97706" : "#15803d"} />
            <DetailRow label="Products"  value={`${savedReg.products?.length} unit(s) registered`} />
          </div>
          {savedReg.products?.length > 0 && (
            <div className="cc-saved-tickets">
              {savedReg.products.map(p => (
                <div key={p._id || p.ticketNumber} className="cc-saved-ticket-row">
                  <span className="cc-mono">{p.ticketNumber}</span>
                  <span style={{ color: "#6B7C86", fontSize: 12 }}>{p.categoryRef?.name || "—"}</span>
                  <span style={{ color: "#6B7C86", fontSize: 11 }}>
                    Warranty: {p.warrStartDate?.slice(0,10)} → {p.warrEndDate?.slice(0,10)}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button className="cc-btn-primary" onClick={() => { resetForm(); setView("history"); }}>← Back to Products</button>
            <button className="cc-btn-outline-dark" onClick={resetForm}>+ New Registration</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="cc-root">
      <style>{CSS}</style>
      {toast && <div className="cc-toast">{toast}</div>}

      {/* Tabs */}
      <div className="cc-tabs">
        <button className={`cc-tab${view === "history" ? " active" : ""}`} onClick={() => setView("history")}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          Product History
          {selectedTickets.length > 0 && <span className="cc-tab-badge">{selectedTickets.length}</span>}
        </button>
        <button className={`cc-tab${view === "form" ? " active" : ""}`} onClick={() => setView("form")}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
          Registration Form
          {(singleState === "ok" || bulkList.length > 0) && (
            <span className="cc-tab-badge" style={{ background: "#15803d" }}>●</span>
          )}
        </button>
      </div>

      {/* ═══════════════ HISTORY VIEW ═══════════════ */}
      {view === "history" && (
        <div className="cc-card">
          <div className="cc-header">
            <div className="cc-header-row">
              <div>
                <h2 className="cc-title">
                  Product History
                  <span className="cc-count-badge">{filtered.length} products · {catNames.length} categories</span>
                </h2>
                <p className="cc-subtitle">Select tickets below → click "Use in Form" to register</p>
              </div>
              <button className="cc-refresh" onClick={fetchProducts} disabled={histLoading}>
                {histLoading ? <Spin size={12} /> : "↺"} {histLoading ? "Loading…" : "Refresh"}
              </button>
            </div>
          </div>

          {selectedTickets.length > 0 && (
            <div className="cc-sel-bar">
              <div className="cc-sel-info">
                <span className="cc-sel-dot" />
                <strong>{selectedTickets.length}</strong> ticket{selectedTickets.length > 1 ? "s" : ""} selected
                <div className="cc-sel-chips">
                  {selectedTickets.map(t => (
                    <span key={t} className="cc-sel-chip">
                      {t}
                      <button onClick={() => setSelectedTickets(p => p.filter(x => x !== t))} className="cc-sel-x">✕</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="cc-sel-actions">
                <button className="cc-btn-ghost-light" onClick={() => { navigator.clipboard.writeText(selectedTickets.join("\n")); showToast("Copied all"); }}>Copy All</button>
                <button className="cc-btn-green" onClick={handleUseInForm}>Use in Form ({selectedTickets.length}) →</button>
                <button className="cc-btn-ghost-light" onClick={() => setSelectedTickets([])}>Clear</button>
              </div>
            </div>
          )}

          <div className="cc-toolbar">
            <div className="cc-search">
              <span className="cc-search-icon">⌕</span>
              <input placeholder="Search ticket, category, config…" value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)} />
              {searchTerm && <button className="cc-clear-srch" onClick={() => setSearchTerm("")}>✕</button>}
            </div>
          </div>

          {histError && (
            <div className="cc-error-bar">⚠ {histError} <button onClick={fetchProducts} className="cc-retry-btn">Retry</button></div>
          )}

          {histLoading && (
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {[56, 44, 44, 44].map((h, i) => <div key={i} className="cc-skeleton" style={{ height: h }} />)}
            </div>
          )}

          {!histLoading && !histError && (
            <div className="cc-groups">
              {catNames.length === 0 ? (
                <div className="cc-empty">🔍 No products found</div>
              ) : catNames.map((cat, catIdx) => {
                const items    = grouped[cat];
                const color    = getCatColor(catIdx);
                const isOpen   = !!expandedCats[cat];
                const catTix   = items.map(p => p.ticketNumber).filter(Boolean);
                const selCount = catTix.filter(t => selectedTickets.includes(t)).length;
                const allSel   = selCount === catTix.length && catTix.length > 0;

                return (
                  <div key={cat} className="cc-cat-group">
                    <div className="cc-cat-hdr" style={{ borderLeftColor: color.accent }} onClick={() => toggleCat(cat)}>
                      <div className="cc-cat-left">
                        <span className={`cc-chevron${isOpen ? " open" : ""}`}>▸</span>
                        <span className="cc-cat-name" style={{ color: color.text, background: color.bg, border: `1px solid ${color.border}` }}>{cat}</span>
                        <span className="cc-cat-count" style={{ color: color.accent }}>{items.length} product{items.length > 1 ? "s" : ""}</span>
                        {selCount > 0 && <span className="cc-cat-sel-badge">{selCount}/{catTix.length} selected</span>}
                      </div>
                      <div onClick={e => e.stopPropagation()}>
                        <button className={`cc-selall-btn${allSel ? " active" : ""}`} onClick={(e) => selectAllInCat(cat, e)}>
                          {allSel ? "✓ All Selected" : "☐ Select All"}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="cc-ticket-rows">
                        {/* Column headers */}
                        <div className="cc-ticket-thead">
                          <span></span><span>Ticket #</span><span>Date</span>
                          <span>Config Preview</span><span style={{ textAlign: "right" }}>Actions</span>
                        </div>

                        {items.map(product => {
                          const configs    = getConfigs(product.configurations);
                          const ticket     = product.ticketNumber;
                          const isRowOpen  = !!expandedRows[product._id];
                          const isSel      = selectedTickets.includes(ticket);
                          const isCopied   = copiedId === ticket;
                          // true while THIS specific product is being deleted
                          const isDeleting = deletingProductId === product._id;

                          return (
                            <React.Fragment key={product._id}>
                              <div
                                className={`cc-ticket-row${isSel ? " selected" : ""}${isRowOpen ? " row-open" : ""}`}
                                onClick={() => toggleRow(product._id)}
                              >
                                {/* Checkbox */}
                                <div
                                  className={`cc-checkbox${isSel ? " checked" : ""}`}
                                  style={isSel ? { background: color.accent, borderColor: color.accent } : {}}
                                  onClick={e => toggleTicket(ticket, e)}
                                >
                                  {isSel && "✓"}
                                </div>

                                {/* Ticket badge */}
                                <span className="cc-ticket-badge" style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text }}>
                                  {ticket || "—"}
                                </span>

                                {/* Date */}
                                <span className="cc-ticket-date">
                                  {product.createdAt
                                    ? new Date(product.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                    : "—"}
                                </span>

                                {/* Config chips */}
                                <div className="cc-ticket-configs">
                                  {configs.slice(0, 3).map(([k, v]) => (
                                    <span key={k} className="cc-chip">
                                      <span className="cc-chip-k">{k}:</span>
                                      <span className="cc-chip-v">{String(v)}</span>
                                    </span>
                                  ))}
                                  {configs.length > 3 && <span className="cc-chip-more">+{configs.length - 3}</span>}
                                </div>

                                {/* ── Actions: Copy | +Add | Delete ── */}
                                <div className="cc-ticket-actions" onClick={e => e.stopPropagation()}>
                                  <button
                                    className={`cc-act-btn copy${isCopied ? " copied" : ""}`}
                                    onClick={e => copyTicket(ticket, e)}
                                  >
                                    {isCopied ? "✓ Copied" : "Copy"}
                                  </button>
                                  <button
                                    className={`cc-act-btn select${isSel ? " selected" : ""}`}
                                    onClick={e => toggleTicket(ticket, e)}
                                  >
                                    {isSel ? "− Remove" : "+ Add"}
                                  </button>

                                  {/* ── NEW DELETE BUTTON ──────────────────────────────
                                    isDeleting → shows spinner (this row is being processed)
                                    disabled={isDeleting} → blocks double-click during API call
                                    e.stopPropagation() is inside handleDeleteProduct
                                    so clicking delete never toggles the row expand/collapse
                                  */}
                                  <button
                                    className="cc-act-btn cc-del-btn"
                                    onClick={e => handleDeleteProduct(product._id, ticket, e)}
                                    disabled={isDeleting}
                                    title="Deactivate this product"
                                  >
                                    {isDeleting ? <Spin size={10} /> : "🗑"}
                                  </button>

                                  <span className={`cc-chevron${isRowOpen ? " open" : ""}`} style={{ marginLeft: 2, color: "#9fb3be" }}>▸</span>
                                </div>
                              </div>

                              {/* Expanded detail row */}
                              {isRowOpen && (
                                <div className="cc-row-detail" style={{ borderLeftColor: color.accent }}>
                                  <div className="cc-detail-label" style={{ color: color.accent }}>
                                    Full Configuration — {ticket}
                                  </div>
                                  <div className="cc-detail-chips">
                                    {configs.map(([k, v]) => (
                                      <span key={k} className="cc-chip large">
                                        <span className="cc-chip-k">{k}:</span>
                                        <span className="cc-chip-v">{String(v)}</span>
                                      </span>
                                    ))}
                                  </div>
                                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                                    <button className="cc-act-btn copy" onClick={e => copyTicket(ticket, e)}>Copy Ticket</button>
                                    <button
                                      className={`cc-act-btn select${isSel ? " selected" : ""}`}
                                      onClick={e => toggleTicket(ticket, e)}
                                    >
                                      {isSel ? "− Remove from bulk" : "+ Add to form"}
                                    </button>
                                    {/* Delete button in expanded view too — with full label */}
                                    <button
                                      className="cc-act-btn cc-del-btn cc-del-full"
                                      onClick={e => handleDeleteProduct(product._id, ticket, e)}
                                      disabled={isDeleting}
                                    >
                                      {isDeleting
                                        ? <><Spin size={11} /> Deactivating…</>
                                        : "🗑 Deactivate Product"}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {!histLoading && selectedTickets.length > 0 && (
            <div className="cc-bottom-bar">
              <span>{selectedTickets.length} ticket{selectedTickets.length > 1 ? "s" : ""} ready</span>
              <button className="cc-btn-green" onClick={handleUseInForm}>
                Use in Registration Form ({selectedTickets.length}) →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════ FORM VIEW ═══════════════ */}
      {view === "form" && (
        <div className="cc-card">
          <div className="cc-header">
            <div className="cc-header-row">
              <div>
                <h2 className="cc-title">Customer Registration</h2>
                <p className="cc-subtitle">
                  {selectedTickets.length > 0
                    ? `${selectedTickets.length} ticket(s) pre-filled from Product History`
                    : "Fill customer details and enter ticket numbers"}
                </p>
              </div>
              <button className="cc-refresh" onClick={() => setView("history")}>← Back to History</button>
            </div>
          </div>

          <div className="cc-form-body">
            <FormSection step="01" title="Purchase Type">
              <div className="cc-type-row">
                <TypeCard active={purchaseType === "single"} color="#2B6F84"
                  title="Single Product" desc="One unit — one ticket number"
                  onClick={() => { setPurchaseType("single"); setBulkList([]); }} />
                <TypeCard active={purchaseType === "bulk"} color="#d97706"
                  title="Bulk Purchase" desc="Multiple units — add each ticket separately"
                  onClick={() => { setPurchaseType("bulk"); setSingleProduct(null); setSingleTicket(""); }} />
              </div>
            </FormSection>

            <FormSection step="02" title="Customer Information">
              <div className="cc-grid3">
                <FormField label="Full Name">
                  <input className="cc-input" value={customer.customerName}
                    onChange={e => setCustomer(p => ({ ...p, customerName: e.target.value }))}
                    placeholder="Customer full name" />
                </FormField>
                <FormField label="Email Address">
                  <input className="cc-input" type="email" value={customer.email}
                    onChange={e => setCustomer(p => ({ ...p, email: e.target.value }))}
                    placeholder="customer@email.com" />
                </FormField>
                <FormField label="Mobile Number">
                  <input className="cc-input" value={customer.mobileNum}
                    onChange={e => setCustomer(p => ({ ...p, mobileNum: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX" />
                </FormField>
              </div>
            </FormSection>

            <FormSection step="03" title="Warranty Period">
              <div className="cc-grid2">
                <FormField label="Warranty Start Date">
                  <input className="cc-input" type="date" value={warrDates.warrStartDate}
                    onChange={e => setWarrDates(p => ({ ...p, warrStartDate: e.target.value }))} />
                </FormField>
                <FormField label="Warranty End Date">
                  <input className="cc-input" type="date" value={warrDates.warrEndDate}
                    onChange={e => setWarrDates(p => ({ ...p, warrEndDate: e.target.value }))} />
                </FormField>
              </div>
            </FormSection>

            <FormSection step="04" title={purchaseType === "bulk" ? `Product Ticket Numbers — ${bulkList.length} added` : "Product Ticket Number"}>
              {purchaseType === "single" && (
                <>
                  <TicketInput value={singleTicket} onChange={setSingleTicket} state={singleState}
                    error={singleErr} placeholder="Paste or type ticket number (e.g. PRD-20250101-12345)" />
                  {singleState === "ok" && singleProduct && <ProductFetchedCard product={singleProduct} />}
                </>
              )}

              {purchaseType === "bulk" && (
                <>
                  <div className="cc-bulk-hint">
                    Each unit has its own ticket number. Add them one by one or use
                    <strong> Product History</strong> to select and send multiple tickets at once.
                  </div>
                  <div className="cc-bulk-input-row">
                    <div style={{ flex: 1 }}>
                      <TicketInput value={bulkInput} onChange={setBulkInput}
                        onKeyDown={e => e.key === "Enter" && addToBulkList()}
                        state={bulkInputState === "duplicate" ? "err" : bulkInputState}
                        error={bulkInputState === "duplicate" ? "Already added" : bulkInputErr}
                        placeholder="Type ticket number and press Enter…" noMargin />
                    </div>
                    <button className={`cc-add-btn${bulkInputState !== "ok" ? " disabled" : ""}`}
                      onClick={addToBulkList} disabled={bulkInputState !== "ok"}>+ Add</button>
                  </div>
                  {bulkInputState === "ok" && bulkFetched && <ProductFetchedCard product={bulkFetched} compact />}
                  {bulkList.length > 0 && (
                    <div className="cc-bulk-table">
                      <div className="cc-bulk-thead">
                        <span>#</span><span>Ticket Number</span><span>Category</span><span>Config</span><span></span>
                      </div>
                      {bulkList.map(({ ticketNumber, product }, idx) => (
                        <div key={ticketNumber} className="cc-bulk-row">
                          <span className="cc-bulk-idx">{idx + 1}</span>
                          <span className="cc-mono">{ticketNumber}</span>
                          <span className="cc-bulk-cat">{product?.categoryName || "—"}</span>
                          <span className="cc-bulk-configs">
                            {getConfigs(product?.configurations).slice(0, 2).map(([k, v]) => (
                              <span key={k} className="cc-chip">
                                <span className="cc-chip-k">{k}:</span>
                                <span className="cc-chip-v">{String(v)}</span>
                              </span>
                            ))}
                          </span>
                          <button className="cc-remove-btn"
                            onClick={() => setBulkList(p => p.filter(i => i.ticketNumber !== ticketNumber))}>✕</button>
                        </div>
                      ))}
                      <div className="cc-bulk-total">
                        <span /><span style={{ color: "#6B7C86", fontSize: 12 }}>
                          {bulkList.length} unit{bulkList.length > 1 ? "s" : ""} total
                        </span><span /><span /><span />
                      </div>
                    </div>
                  )}
                </>
              )}
            </FormSection>

            {submitError && <div className="cc-submit-error">⚠ {submitError}</div>}
            <div className="cc-submit-row">
              <button className={`cc-submit-btn${!canSubmit ? " disabled" : ""}`}
                onClick={handleSubmit} disabled={!canSubmit}>
                {submitState === "loading" ? <><Spin size={14} /> Processing…</> : "Complete Registration →"}
              </button>
              {!canSubmit && (
                <p className="cc-submit-hint">
                  {!custOk ? "Fill in customer name, email and mobile"
                    : !datesOk && purchaseType === "single" ? "Select warranty dates"
                    : purchaseType === "single" && singleState !== "ok" ? "Enter a valid ticket number"
                    : purchaseType === "bulk" && bulkList.length < 2 ? "Add at least 2 products for bulk purchase"
                    : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function FormSection({ step, title, children }) {
  return (
    <div className="cc-form-section">
      <div className="cc-step-label"><span className="cc-step-num">{step}</span>{title}</div>
      {children}
    </div>
  );
}
function FormField({ label, children }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 6 }}><label className="cc-field-label">{label}</label>{children}</div>;
}
function TypeCard({ active, color, title, desc, onClick }) {
  return (
    <button className="cc-type-card" onClick={onClick}
      style={{ borderColor: active ? color : "#D9E6ED", background: active ? `${color}0f` : "#fff" }}>
      <div className="cc-type-title" style={{ color: active ? color : "#1E2A32" }}>{title}</div>
      <div className="cc-type-desc">{desc}</div>
      {active && <div className="cc-type-check" style={{ background: color }}>✓</div>}
    </button>
  );
}
function TicketInput({ value, onChange, onKeyDown, state, error, placeholder, noMargin }) {
  const borderColor = state === "ok" ? "#16a34a" : state === "err" ? "#dc2626" : "#D9E6ED";
  return (
    <div style={{ marginBottom: noMargin ? 0 : 12 }}>
      <div className="cc-ticket-input-wrap" style={{ borderColor }}>
        <span style={{ color: "#9fb3be", fontSize: 16 }}>⌕</span>
        <input value={value} onChange={e => onChange(e.target.value)} onKeyDown={onKeyDown}
          placeholder={placeholder} className="cc-ticket-input-field" />
        {state === "loading" && <Spin size={14} />}
        {state === "ok"      && <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>}
        {state === "err"     && <span style={{ color: "#dc2626" }}>✕</span>}
      </div>
      {state === "err" && error && <p className="cc-input-err">⚠ {error}</p>}
    </div>
  );
}
function ProductFetchedCard({ product, compact }) {
  const configs = getConfigs(product?.configurations);
  return (
    <div className="cc-fetched-card">
      <div className="cc-fetched-tag">AUTO-FETCHED · {product?.ticketNumber}</div>
      <div className="cc-fetched-cat">{product?.categoryName || "—"}</div>
      <div className="cc-fetched-configs">
        {(compact ? configs.slice(0, 3) : configs).map(([k, v]) => (
          <span key={k} className="cc-chip"><span className="cc-chip-k">{k}:</span><span className="cc-chip-v">{String(v)}</span></span>
        ))}
        {compact && configs.length > 3 && <span className="cc-chip-more">+{configs.length - 3} more</span>}
      </div>
    </div>
  );
}
function DetailRow({ label, value, accent }) {
  return (
    <div className="cc-detail-row">
      <span>{label}</span><strong style={{ color: accent || "#1E2A32" }}>{value}</strong>
    </div>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
  .cc-root { --primary:#2B6F84; --primary-dark:#1F5668; --bg:#F2F6F9; --card:#fff; --border:#D9E6ED; --text:#1E2A32; --muted:#6B7C86; font-family:'DM Sans',sans-serif; background:var(--bg); min-height:100vh; padding:20px 20px 60px; }
  .cc-root *,.cc-root *::before,.cc-root *::after { box-sizing:border-box; }
  @keyframes cc-spin { to { transform:rotate(360deg); } }
  @keyframes cc-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  @keyframes cc-fadein { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  .cc-tabs { display:flex; gap:4px; margin-bottom:16px; background:var(--card); border-radius:12px; padding:6px; border:1px solid var(--border); }
  .cc-tab { flex:1; display:flex; align-items:center; justify-content:center; gap:7px; padding:9px 16px; border-radius:9px; border:none; background:transparent; font-size:13px; font-weight:600; color:var(--muted); cursor:pointer; transition:all .18s; font-family:'DM Sans',sans-serif; }
  .cc-tab.active { background:var(--primary); color:#fff; }
  .cc-tab:not(.active):hover { background:#eef5f8; color:var(--primary); }
  .cc-tab-badge { background:#d97706; color:#fff; border-radius:20px; font-size:10px; font-weight:700; padding:1px 7px; }
  .cc-card { background:var(--card); border-radius:16px; border:1px solid var(--border); box-shadow:0 4px 24px rgba(43,111,132,.07); overflow:hidden; }
  .cc-header { background:linear-gradient(135deg,var(--primary-dark),var(--primary)); padding:20px 24px 16px; }
  .cc-header-row { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
  .cc-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; color:#fff; margin:0 0 3px; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
  .cc-subtitle { font-size:12px; color:rgba(255,255,255,.55); margin:0; }
  .cc-count-badge { font-size:11px; font-weight:600; background:rgba(255,255,255,.18); border:1px solid rgba(255,255,255,.22); border-radius:20px; padding:2px 10px; color:#fff; font-family:'DM Sans',sans-serif; }
  .cc-refresh { display:flex; align-items:center; gap:6px; padding:7px 14px; background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.3); border-radius:8px; font-size:12px; font-weight:700; color:#fff; cursor:pointer; transition:all .15s; white-space:nowrap; font-family:'DM Sans',sans-serif; }
  .cc-refresh:hover:not(:disabled) { background:rgba(255,255,255,.28); }
  .cc-refresh:disabled { opacity:.5; cursor:not-allowed; }
  .cc-sel-bar { background:linear-gradient(135deg,#1a3a45,#1d4a5a); border-bottom:1px solid #2a5a6e; padding:12px 22px; display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; }
  .cc-sel-info { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#90cfe0; font-weight:600; flex-wrap:wrap; flex:1; }
  .cc-sel-dot { width:8px; height:8px; border-radius:50%; background:#4ade80; margin-top:3px; box-shadow:0 0 6px #4ade80; flex-shrink:0; }
  .cc-sel-chips { display:flex; flex-wrap:wrap; gap:5px; margin-top:6px; width:100%; }
  .cc-sel-chip { display:inline-flex; align-items:center; gap:5px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); border-radius:6px; padding:3px 8px; font-size:11px; color:#e0f2fe; font-family:'DM Mono',monospace; }
  .cc-sel-x { background:none; border:none; color:#90cfe0; cursor:pointer; font-size:10px; padding:0 2px; }
  .cc-sel-actions { display:flex; gap:8px; align-items:center; flex-shrink:0; }
  .cc-toolbar { padding:12px 20px; border-bottom:1px solid var(--border); background:#fafcfd; }
  .cc-search { position:relative; max-width:460px; }
  .cc-search input { width:100%; padding:9px 34px 9px 36px; border:1.5px solid var(--border); border-radius:9px; font-size:13px; outline:none; background:#fff; color:var(--text); font-family:'DM Sans',sans-serif; transition:border-color .2s; }
  .cc-search input:focus { border-color:var(--primary); }
  .cc-search input::placeholder { color:#c0d4dc; }
  .cc-search-icon { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:var(--muted); font-size:16px; pointer-events:none; }
  .cc-clear-srch { position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; color:var(--muted); cursor:pointer; font-size:12px; }
  .cc-groups { padding:14px 18px 18px; display:flex; flex-direction:column; gap:12px; }
  .cc-cat-group { border:1.5px solid var(--border); border-radius:11px; overflow:hidden; }
  .cc-cat-hdr { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:#f8fbfc; border-left:4px solid; cursor:pointer; transition:background .14s; gap:12px; flex-wrap:wrap; }
  .cc-cat-hdr:hover { background:#eef5f8; }
  .cc-cat-left { display:flex; align-items:center; gap:9px; flex-wrap:wrap; }
  .cc-cat-name { font-size:12px; font-weight:700; padding:3px 11px; border-radius:7px; }
  .cc-cat-count { font-size:12px; font-weight:600; }
  .cc-cat-sel-badge { background:#d1fae5; color:#065f46; border:1px solid #6ee7b7; border-radius:10px; font-size:11px; font-weight:700; padding:2px 8px; }
  .cc-selall-btn { font-size:11px; font-weight:700; padding:5px 11px; border:1.5px solid var(--border); border-radius:7px; background:#fff; color:var(--muted); cursor:pointer; transition:all .14s; font-family:'DM Sans',sans-serif; white-space:nowrap; }
  .cc-selall-btn:hover { border-color:var(--primary); color:var(--primary); }
  .cc-selall-btn.active { background:var(--primary); color:#fff; border-color:var(--primary); }
  .cc-ticket-rows { border-top:1px solid var(--border); }
  .cc-ticket-thead { display:grid; grid-template-columns:28px 140px 100px 1fr 160px; padding:7px 16px; background:#f4f8fa; border-bottom:1px solid var(--border); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:var(--muted); gap:10px; align-items:center; }
  .cc-ticket-row { display:grid; grid-template-columns:28px 140px 100px 1fr 160px; padding:10px 16px; gap:10px; align-items:center; border-bottom:1px solid #f0f5f7; cursor:pointer; transition:background .12s; }
  .cc-ticket-row:hover { background:#f4fbfd; }
  .cc-ticket-row.selected { background:#e8f8f0; }
  .cc-ticket-row.row-open { background:#eef5f8; }
  .cc-ticket-row:last-child { border-bottom:none; }
  .cc-checkbox { width:18px; height:18px; border-radius:5px; border:2px solid var(--border); background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .14s; font-size:11px; color:#fff; font-weight:700; flex-shrink:0; }
  .cc-checkbox:hover { border-color:var(--primary); }
  .cc-ticket-badge { font-family:'DM Mono',monospace; font-size:11px; font-weight:500; padding:4px 9px; border-radius:6px; white-space:nowrap; }
  .cc-ticket-date { font-size:12px; color:var(--muted); white-space:nowrap; }
  .cc-ticket-configs { display:flex; flex-wrap:wrap; gap:4px; align-items:center; }
  .cc-ticket-actions { display:flex; align-items:center; gap:5px; justify-content:flex-end; }
  .cc-chip { display:inline-flex; gap:3px; align-items:center; background:#f0f7fa; border:1px solid var(--border); border-radius:5px; padding:2px 7px; font-size:11px; white-space:nowrap; }
  .cc-chip.large { padding:4px 10px; font-size:12px; }
  .cc-chip-k { color:var(--muted); }
  .cc-chip-v { color:var(--primary); font-weight:700; }
  .cc-chip-more { font-size:11px; color:var(--muted); background:#eef5f8; border:1px solid var(--border); border-radius:5px; padding:2px 7px; font-weight:600; }
  .cc-act-btn { display:inline-flex; align-items:center; gap:4px; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer; transition:all .14s; border:1.5px solid; white-space:nowrap; font-family:'DM Sans',sans-serif; }
  .cc-act-btn.copy { background:#fff; border-color:var(--border); color:var(--muted); }
  .cc-act-btn.copy:hover { border-color:var(--primary); color:var(--primary); }
  .cc-act-btn.copy.copied { background:#dcfce7; border-color:#6ee7b7; color:#15803d; }
  .cc-act-btn.select { background:#fff; border-color:var(--border); color:var(--muted); }
  .cc-act-btn.select:hover { border-color:#16a34a; color:#16a34a; }
  .cc-act-btn.select.selected { background:#dcfce7; border-color:#6ee7b7; color:#15803d; }
  /* ── Delete button styles ── */
  .cc-del-btn { background:#fff5f5; border-color:#fca5a5 !important; color:#dc2626; padding:4px 8px; }
  .cc-del-btn:hover:not(:disabled) { background:#fee2e2; border-color:#f87171 !important; color:#b91c1c; }
  .cc-del-btn:disabled { opacity:.4; cursor:not-allowed; }
  .cc-del-full { padding:4px 12px; }
  .cc-row-detail { padding:12px 16px 14px 48px; background:#f0f8fb; border-top:1px solid var(--border); border-left:4px solid; }
  .cc-detail-label { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; margin-bottom:8px; }
  .cc-detail-chips { display:flex; flex-wrap:wrap; gap:6px; }
  .cc-bottom-bar { display:flex; align-items:center; justify-content:space-between; padding:12px 22px; border-top:1px solid var(--border); background:#f0fdf4; font-size:13px; font-weight:600; color:#15803d; gap:12px; flex-wrap:wrap; }
  .cc-form-body { padding:20px 24px 28px; display:flex; flex-direction:column; gap:0; }
  .cc-form-section { margin-bottom:28px; }
  .cc-step-label { display:flex; align-items:center; gap:9px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:var(--muted); margin-bottom:14px; }
  .cc-step-num { background:#e8f2f6; color:var(--primary); padding:2px 8px; border-radius:5px; font-size:10px; font-weight:800; }
  .cc-field-label { font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--muted); font-weight:700; }
  .cc-input { background:#f8fbfc; border:1.5px solid var(--border); border-radius:9px; padding:10px 13px; color:var(--text); font-size:13px; font-family:'DM Sans',sans-serif; transition:border-color .18s,box-shadow .18s; width:100%; }
  .cc-input:focus { outline:none; border-color:var(--primary); box-shadow:0 0 0 3px rgba(43,111,132,.1); }
  .cc-input::placeholder { color:#c0d4dc; }
  .cc-grid3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
  .cc-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media (max-width:640px) { .cc-grid3,.cc-grid2 { grid-template-columns:1fr; } }
  .cc-type-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .cc-type-card { border:2px solid; border-radius:11px; padding:18px 16px; text-align:left; cursor:pointer; position:relative; transition:all .18s; font-family:'DM Sans',sans-serif; }
  .cc-type-title { font-size:14px; font-weight:700; margin-bottom:4px; }
  .cc-type-desc { font-size:11px; color:var(--muted); line-height:1.5; }
  .cc-type-check { position:absolute; top:10px; right:10px; width:20px; height:20px; border-radius:50%; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
  .cc-ticket-input-wrap { display:flex; align-items:center; gap:10px; background:#f8fbfc; border:1.5px solid; border-radius:10px; padding:11px 13px; transition:border-color .18s; margin-bottom:0; }
  .cc-ticket-input-field { flex:1; background:transparent; border:none; color:var(--text); font-size:13px; outline:none; font-family:'DM Mono',monospace; }
  .cc-ticket-input-field::placeholder { color:#c0d4dc; font-family:'DM Sans',sans-serif; }
  .cc-input-err { font-size:12px; color:#dc2626; margin:5px 0 0; }
  .cc-fetched-card { margin-top:12px; background:#f0fdf4; border:1.5px solid #86efac; border-radius:10px; padding:12px 16px; animation:cc-fadein .3s ease; }
  .cc-fetched-tag { font-size:10px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:#16a34a; margin-bottom:5px; }
  .cc-fetched-cat { font-size:14px; font-weight:700; color:var(--text); margin-bottom:8px; }
  .cc-fetched-configs { display:flex; flex-wrap:wrap; gap:6px; }
  .cc-bulk-hint { background:#f8fbfc; border:1px solid var(--border); border-radius:8px; padding:10px 14px; font-size:12px; color:var(--muted); margin-bottom:12px; line-height:1.6; }
  .cc-bulk-input-row { display:flex; gap:10px; align-items:flex-start; margin-bottom:10px; }
  .cc-add-btn { background:var(--primary); color:#fff; border:none; border-radius:9px; padding:11px 18px; font-size:13px; font-weight:700; cursor:pointer; white-space:nowrap; font-family:'DM Sans',sans-serif; transition:background .15s; }
  .cc-add-btn:hover:not(.disabled) { background:var(--primary-dark); }
  .cc-add-btn.disabled { opacity:.3; cursor:not-allowed; }
  .cc-bulk-table { border:1.5px solid var(--border); border-radius:10px; overflow:hidden; margin-top:12px; }
  .cc-bulk-thead { display:grid; grid-template-columns:28px 160px 100px 1fr 28px; padding:8px 14px; background:#f4f8fa; border-bottom:1px solid var(--border); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:var(--muted); gap:10px; }
  .cc-bulk-row { display:grid; grid-template-columns:28px 160px 100px 1fr 28px; padding:10px 14px; gap:10px; align-items:center; border-bottom:1px solid #f0f5f7; animation:cc-fadein .25s ease; }
  .cc-bulk-row:last-child { border-bottom:none; }
  .cc-bulk-total { display:grid; grid-template-columns:28px 160px 100px 1fr 28px; padding:9px 14px; gap:10px; background:#f8fbfc; border-top:1px solid var(--border); }
  .cc-bulk-idx { font-size:12px; color:var(--muted); }
  .cc-bulk-cat { font-size:12px; color:var(--muted); }
  .cc-bulk-configs { display:flex; flex-wrap:wrap; gap:4px; }
  .cc-remove-btn { background:transparent; border:1px solid var(--border); color:var(--muted); border-radius:5px; width:22px; height:22px; cursor:pointer; font-size:10px; display:flex; align-items:center; justify-content:center; }
  .cc-remove-btn:hover { border-color:#dc2626; color:#dc2626; }
  .cc-submit-row { display:flex; flex-direction:column; align-items:center; gap:8px; padding-top:6px; }
  .cc-submit-btn { background:linear-gradient(135deg,var(--primary),var(--primary-dark)); color:#fff; border:none; padding:14px 48px; border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; display:inline-flex; align-items:center; gap:8px; transition:opacity .18s; }
  .cc-submit-btn.disabled { opacity:.3; cursor:not-allowed; }
  .cc-submit-btn:hover:not(.disabled) { opacity:.88; }
  .cc-submit-hint { font-size:12px; color:var(--muted); margin:0; text-align:center; }
  .cc-submit-error { background:#fff5f5; border:1px solid #fca5a5; border-left:3px solid #dc2626; border-radius:9px; padding:10px 14px; font-size:13px; color:#b91c1c; margin-bottom:12px; }
  .cc-btn-green { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; background:#16a34a; color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; transition:background .14s; white-space:nowrap; font-family:'DM Sans',sans-serif; }
  .cc-btn-green:hover { background:#15803d; }
  .cc-btn-ghost-light { padding:7px 13px; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.3); border-radius:8px; font-size:12px; font-weight:700; color:#fff; cursor:pointer; font-family:'DM Sans',sans-serif; }
  .cc-btn-ghost-light:hover { background:rgba(255,255,255,.22); }
  .cc-btn-primary { display:inline-flex; align-items:center; gap:6px; padding:10px 22px; background:var(--primary); color:#fff; border:none; border-radius:9px; font-size:13px; font-weight:700; cursor:pointer; transition:background .14s; font-family:'DM Sans',sans-serif; }
  .cc-btn-primary:hover { background:var(--primary-dark); }
  .cc-btn-outline-dark { padding:10px 20px; background:#fff; border:1.5px solid var(--border); color:var(--text); border-radius:9px; font-size:13px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; }
  .cc-toast { position:fixed; bottom:28px; left:50%; transform:translateX(-50%); background:#1a3a45; color:#e0f2fe; padding:10px 20px; border-radius:10px; font-size:13px; font-weight:600; box-shadow:0 8px 32px rgba(0,0,0,.25); z-index:9999; white-space:nowrap; font-family:'DM Sans',sans-serif; animation:cc-fadein .25s ease; }
  .cc-skeleton { border-radius:8px; background:linear-gradient(90deg,#e8f0f4 25%,#d4e4ec 50%,#e8f0f4 75%); background-size:200% 100%; animation:cc-shimmer 1.4s infinite; }
  .cc-error-bar { margin:14px 20px; padding:11px 15px; background:#fff5f5; border:1px solid #fca5a5; border-left:3px solid #e57373; border-radius:9px; color:#b91c1c; font-size:13px; display:flex; align-items:center; gap:8px; }
  .cc-retry-btn { color:var(--primary); font-weight:700; background:none; border:none; cursor:pointer; }
  .cc-empty { text-align:center; padding:48px 24px; color:var(--muted); font-size:14px; }
  .cc-success-wrap { max-width:560px; margin:48px auto; background:var(--card); border:1.5px solid #86efac; border-radius:18px; padding:40px 36px; text-align:center; animation:cc-fadein .4s ease; }
  .cc-success-icon { width:56px; height:56px; background:#f0fdf4; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:24px; color:#16a34a; margin:0 auto 18px; border:2px solid #86efac; }
  .cc-success-title { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:var(--text); margin:0 0 6px; }
  .cc-success-sub { color:var(--muted); font-size:13px; margin:0 0 24px; }
  .cc-detail-box { background:#f8fbfc; border-radius:10px; padding:16px 18px; margin-bottom:20px; text-align:left; }
  .cc-detail-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border); font-size:13px; color:var(--muted); }
  .cc-detail-row:last-child { border-bottom:none; }
  .cc-saved-tickets { display:flex; flex-direction:column; gap:4px; margin-bottom:6px; text-align:left; }
  .cc-saved-ticket-row { display:flex; justify-content:space-between; align-items:center; background:#f8fbfc; border:1px solid var(--border); border-radius:7px; padding:7px 12px; gap:12px; flex-wrap:wrap; }
  .cc-mono { font-family:'DM Mono',monospace; font-size:12px; color:var(--primary); }
  .cc-chevron { display:inline-flex; transition:transform .2s; font-size:11px; }
  .cc-chevron.open { transform:rotate(90deg); }
`; 

