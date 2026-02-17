// import  { useState } from 'react';
// import React from 'react'
// import CustomerCareHome from './CustomerCareHome';
// import CustomerCareProductHistory from './cutomerCareProductHis';
// import CustomerCareComplains from './CutomerCareComplains';
// const CustomerCarePanel = () => {
//   const [activeTab, setActiveTab] = useState('home');

//   const navItems = [
//     { id: 'home', label: 'Home' },
//     { id: 'producthistory', label: 'Product History' },
//     { id: 'complains', label: 'Complains' },
//     // { id: 'register', label: 'Register' }
//   ];

//   const renderContent = {
//      "Home":<CustomerCareHome/>,
//     "Product History":<CustomerCareProductHistory/>,
//     "Complains":<CustomerCareComplains/>

//     }
  

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-md">
//         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex space-x-8">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveTab(item.id)}
//                 className={`py-4 px-3 border-b-2 font-medium text-sm transition-colors ${
//                   activeTab === item.id
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </nav>
//       </header>

//       {/* Content */}
//       <main className="max-w-7xl mx-auto">
//         {renderContent[navItems.find(item => item.id === activeTab)?.label]}
//       </main>
//     </div>
//   );
// };

// export default CustomerCarePanel;


// import { useEffect, useState } from 'react';
// import CustomerCareHome from './CustomerCareHome';
// import CustomerCareProductHistory from './cutomerCareProductHis';
// import CustomerCareComplains from './CutomerCareComplains';
// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// const CustomerCarePanel = () => {
//   const [activeTab, setActiveTab] = useState('home');
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isAuth, setIsAuth] = useState(false);
//   const navigate = useNavigate();

//   const navItems = [
//     {
//       id: 'home',
//       label: 'Home',
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
//           <polyline points="9 22 9 12 15 12 15 22"/>
//         </svg>
//       ),
//       desc: 'Registration'
//     },
//     {
//       id: 'producthistory',
//       label: 'Product History',
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//           <polyline points="14 2 14 8 20 8"/>
//           <line x1="16" y1="13" x2="8" y2="13"/>
//           <line x1="16" y1="17" x2="8" y2="17"/>
//           <polyline points="10 9 9 9 8 9"/>
//         </svg>
//       ),
//       desc: 'All records'
//     },
//     {
//       id: 'complains',
//       label: 'Complaints',
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//         </svg>
//       ),
//       desc: 'Support tickets'
//     },
//   ];

//   const contentMap = {
//     home: <CustomerCareHome />,
//     producthistory: <CustomerCareProductHistory />,
//     complains: <CustomerCareComplains />,
//   };

//   const activeItem = navItems.find(item => item.id === activeTab);
//   useEffect(()=>{
//      setIsAuth(localStorage.getItem('loggedInUser') ? true : false)
//   })
//   const handleLogout = () => {
//     // Add your logout logic here
//     localStorage.removeItem('loggedInUser');
//     localStorage.removeItem('token');
//     setTimeout(()=>{
//       navigate('/login')
//     })
//     console.log('Logging out...');
//     setShowLogoutModal(false);
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Figtree:wght@300;400;500;600&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         .panel-root {
//           min-height: 100vh;
//           display: flex;
//           background: #0a0a0f;
//           font-family: 'Figtree', sans-serif;
//           position: relative;
//           overflow: hidden;
//         }

//         /* Ambient bg */
//         .panel-root::before {
//           content: '';
//           position: fixed;
//           inset: 0;
//           background:
//             radial-gradient(ellipse 50% 70% at 0% 30%, rgba(255, 80, 30, 0.07) 0%, transparent 60%),
//             radial-gradient(ellipse 40% 50% at 100% 80%, rgba(255, 160, 50, 0.05) 0%, transparent 60%);
//           pointer-events: none;
//           z-index: 0;
//         }

//         /* ─── SIDEBAR ─── */
//         .sidebar {
//           width: ${sidebarOpen ? '240px' : '72px'};
//           min-height: 100vh;
//           background: rgba(255,255,255,0.025);
//           border-right: 1px solid rgba(255,255,255,0.07);
//           display: flex;
//           flex-direction: column;
//           position: fixed;
//           left: 0; top: 0; bottom: 0;
//           z-index: 10;
//           transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
//           backdrop-filter: blur(20px);
//           overflow: hidden;
//         }

//         .sidebar-top {
//           padding: 24px 16px 20px;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .sidebar-logo {
//           width: 40px;
//           height: 40px;
//           border-radius: 11px;
//           background: linear-gradient(135deg, #ff7040, #ff4010);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//           box-shadow: 0 4px 16px rgba(255,100,40,0.4);
//         }

//         .sidebar-logo svg { color: #fff; }

//         .sidebar-brand {
//           overflow: hidden;
//           white-space: nowrap;
//           opacity: ${sidebarOpen ? '1' : '0'};
//           transition: opacity 0.2s ease;
//         }

//         .sidebar-brand-name {
//           font-family: 'Syne', sans-serif;
//           font-size: 15px;
//           font-weight: 800;
//           color: #fff;
//           letter-spacing: -0.01em;
//           line-height: 1.2;
//         }

//         .sidebar-brand-sub {
//           font-size: 11px;
//           color: rgba(255,255,255,0.35);
//           letter-spacing: 0.03em;
//         }

//         /* Nav */
//         .sidebar-nav {
//           flex: 1;
//           padding: 16px 10px;
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .nav-label {
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.2);
//           padding: 8px 10px 6px;
//           white-space: nowrap;
//           overflow: hidden;
//           opacity: ${sidebarOpen ? '1' : '0'};
//           transition: opacity 0.15s ease;
//         }

//         .nav-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 11px 12px;
//           border-radius: 11px;
//           cursor: pointer;
//           border: none;
//           background: transparent;
//           width: 100%;
//           text-align: left;
//           transition: all 0.2s ease;
//           position: relative;
//           white-space: nowrap;
//         }

//         .nav-item:hover:not(.active) {
//           background: rgba(255,255,255,0.05);
//         }

//         .nav-item.active {
//           background: linear-gradient(135deg, rgba(255,112,64,0.2), rgba(255,80,32,0.12));
//           border: 1px solid rgba(255,112,64,0.2);
//         }

//         .nav-item-icon {
//           width: 36px;
//           height: 36px;
//           border-radius: 9px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//           transition: all 0.2s ease;
//           color: rgba(255,255,255,0.35);
//           background: rgba(255,255,255,0.04);
//         }

//         .nav-item.active .nav-item-icon {
//           color: #ff7040;
//           background: rgba(255,112,64,0.12);
//         }

//         .nav-item-text {
//           overflow: hidden;
//           opacity: ${sidebarOpen ? '1' : '0'};
//           transition: opacity 0.15s ease;
//         }

//         .nav-item-label {
//           font-size: 13px;
//           font-weight: 600;
//           color: rgba(255,255,255,0.5);
//           line-height: 1.2;
//         }

//         .nav-item.active .nav-item-label {
//           color: #fff;
//         }

//         .nav-item-desc {
//           font-size: 11px;
//           color: rgba(255,255,255,0.25);
//           margin-top: 1px;
//         }

//         .nav-active-bar {
//           position: absolute;
//           right: 0; top: 50%;
//           transform: translateY(-50%);
//           width: 3px; height: 20px;
//           background: linear-gradient(180deg, #ff7040, #ff4010);
//           border-radius: 3px 0 0 3px;
//         }

//         /* Sidebar bottom */
//         .sidebar-bottom {
//           padding: 12px 10px 20px;
//           border-top: 1px solid rgba(255,255,255,0.06);
//         }

//         .sidebar-user {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 10px 12px;
//           border-radius: 11px;
//           margin-bottom: 6px;
//           background: rgba(255,255,255,0.03);
//         }

//         .user-avatar {
//           width: 34px;
//           height: 34px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #2a1f3d, #3d2a1f);
//           border: 2px solid rgba(255,112,64,0.3);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 13px;
//           font-weight: 700;
//           color: #ff7040;
//           flex-shrink: 0;
//           font-family: 'Syne', sans-serif;
//         }

//         .user-info {
//           overflow: hidden;
//           opacity: ${sidebarOpen ? '1' : '0'};
//           transition: opacity 0.15s ease;
//           flex: 1;
//         }

//         .user-name {
//           font-size: 13px;
//           font-weight: 600;
//           color: #fff;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .user-role {
//           font-size: 11px;
//           color: rgba(255,255,255,0.3);
//         }

//         .logout-btn {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           width: 100%;
//           padding: 10px 12px;
//           border-radius: 11px;
//           border: 1px solid rgba(255, 60, 60, 0.15);
//           background: rgba(255, 60, 60, 0.06);
//           cursor: pointer;
//           transition: all 0.2s ease;
//           white-space: nowrap;
//         }

//         .logout-btn:hover {
//           background: rgba(255, 60, 60, 0.14);
//           border-color: rgba(255, 60, 60, 0.3);
//         }

//         .logout-icon {
//           width: 34px;
//           height: 34px;
//           border-radius: 9px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: rgba(255, 60, 60, 0.1);
//           color: #ff5050;
//           flex-shrink: 0;
//         }

//         .logout-text {
//           overflow: hidden;
//           opacity: ${sidebarOpen ? '1' : '0'};
//           transition: opacity 0.15s ease;
//         }

//         .logout-label {
//           font-size: 13px;
//           font-weight: 600;
//           color: #ff5050;
//         }

//         .logout-sublabel {
//           font-size: 11px;
//           color: rgba(255, 80, 80, 0.5);
//         }

//         /* Toggle button */
//         .sidebar-toggle {
//           position: fixed;
//           top: 28px;
//           left: ${sidebarOpen ? '208px' : '50px'};
//           z-index: 20;
//           width: 28px;
//           height: 28px;
//           border-radius: 50%;
//           background: #1a1a24;
//           border: 1px solid rgba(255,255,255,0.1);
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: rgba(255,255,255,0.5);
//           transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
//           box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//         }

//         .sidebar-toggle:hover {
//           background: #222230;
//           color: #fff;
//           border-color: rgba(255,255,255,0.2);
//         }

//         .toggle-arrow {
//           transition: transform 0.3s ease;
//           transform: rotate(${sidebarOpen ? '0deg' : '180deg'});
//         }

//         /* ─── MAIN CONTENT ─── */
//         .panel-main {
//           flex: 1;
//           margin-left: ${sidebarOpen ? '240px' : '72px'};
//           min-height: 100vh;
//           display: flex;
//           flex-direction: column;
//           transition: margin-left 0.3s cubic-bezier(0.22,1,0.36,1);
//           position: relative;
//           z-index: 1;
//         }

//         /* Topbar */
//         .topbar {
//           height: 64px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0 32px;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           background: rgba(10,10,15,0.8);
//           backdrop-filter: blur(12px);
//           position: sticky;
//           top: 0;
//           z-index: 5;
//         }

//         .topbar-left {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .topbar-page-icon {
//           width: 32px;
//           height: 32px;
//           border-radius: 8px;
//           background: rgba(255,112,64,0.12);
//           border: 1px solid rgba(255,112,64,0.2);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #ff7040;
//         }

//         .topbar-breadcrumb {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .breadcrumb-base {
//           font-size: 13px;
//           color: rgba(255,255,255,0.3);
//           font-weight: 500;
//         }

//         .breadcrumb-sep {
//           color: rgba(255,255,255,0.15);
//           font-size: 13px;
//         }

//         .breadcrumb-current {
//           font-family: 'Syne', sans-serif;
//           font-size: 14px;
//           font-weight: 700;
//           color: #fff;
//         }

//         .topbar-right {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .topbar-badge {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 8px;
//           padding: 6px 12px;
//           font-size: 12px;
//           color: rgba(255,255,255,0.4);
//           font-weight: 500;
//         }

//         .online-dot {
//           width: 6px;
//           height: 6px;
//           background: #4ade80;
//           border-radius: 50%;
//           animation: glow-pulse 2s ease-in-out infinite;
//         }

//         @keyframes glow-pulse {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
//           50% { box-shadow: 0 0 0 4px rgba(74,222,128,0); }
//         }

//         /* Content area */
//         .content-area {
//           flex: 1;
//           animation: fade-in 0.3s ease both;
//         }

//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         /* ─── LOGOUT MODAL ─── */
//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.7);
//           backdrop-filter: blur(6px);
//           z-index: 100;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           animation: overlay-in 0.2s ease both;
//         }

//         @keyframes overlay-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .modal-card {
//           background: #13131c;
//           border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 20px;
//           padding: 32px;
//           width: 360px;
//           box-shadow: 0 24px 64px rgba(0,0,0,0.6);
//           animation: modal-up 0.3s cubic-bezier(0.22,1,0.36,1) both;
//         }

//         @keyframes modal-up {
//           from { opacity: 0; transform: translateY(20px) scale(0.96); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         .modal-icon {
//           width: 52px;
//           height: 52px;
//           border-radius: 14px;
//           background: rgba(255,60,60,0.1);
//           border: 1px solid rgba(255,60,60,0.2);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #ff5050;
//           margin-bottom: 20px;
//         }

//         .modal-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 20px;
//           font-weight: 800;
//           color: #fff;
//           letter-spacing: -0.01em;
//           margin-bottom: 8px;
//         }

//         .modal-body {
//           font-size: 14px;
//           color: rgba(255,255,255,0.4);
//           line-height: 1.6;
//           margin-bottom: 28px;
//         }

//         .modal-actions {
//           display: flex;
//           gap: 10px;
//         }

//         .modal-cancel {
//           flex: 1;
//           padding: 12px;
//           border-radius: 11px;
//           border: 1px solid rgba(255,255,255,0.1);
//           background: rgba(255,255,255,0.04);
//           color: rgba(255,255,255,0.6);
//           font-family: 'Figtree', sans-serif;
//           font-size: 14px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s ease;
//         }

//         .modal-cancel:hover {
//           background: rgba(255,255,255,0.08);
//           color: #fff;
//         }

//         .modal-confirm {
//           flex: 1;
//           padding: 12px;
//           border-radius: 11px;
//           border: none;
//           background: linear-gradient(135deg, #ff4040, #cc2020);
//           color: #fff;
//           font-family: 'Figtree', sans-serif;
//           font-size: 14px;
//           font-weight: 700;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           box-shadow: 0 4px 16px rgba(255,60,60,0.35);
//         }

//         .modal-confirm:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 6px 24px rgba(255,60,60,0.5);
//         }
//       `}</style>

//       <div className="panel-root">

//         {/* Sidebar toggle */}
//         <button className="sidebar-toggle" onClick={() => setSidebarOpen(o => !o)}>
//           <span className="toggle-arrow">
//             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <polyline points="15 18 9 12 15 6"/>
//             </svg>
//           </span>
//         </button>

//         {/* Sidebar */}
//         <aside className="sidebar">
//           {/* Brand */}
//           <div className="sidebar-top">
//             <div className="sidebar-logo">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12c-.88-2.64-1.42-5.39-1.6-8.18A2 2 0 0 1 5.37 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 24 16.92z"/>
//               </svg>
//             </div>
//             <div className="sidebar-brand">
//               <div className="sidebar-brand-name">CareDesk</div>
//               <div className="sidebar-brand-sub">Support Portal</div>
//             </div>
//           </div>

//           {/* Nav */}
//           <nav className="sidebar-nav">
//             <div className="nav-label">Navigation</div>
//             {navItems.map(item => (
//               <button
//                 key={item.id}
//                 className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//                 onClick={() => setActiveTab(item.id)}
//               >
//                 <div className="nav-item-icon">{item.icon}</div>
//                 <div className="nav-item-text">
//                   <div className="nav-item-label">{item.label}</div>
//                   <div className="nav-item-desc">{item.desc}</div>
//                 </div>
//                 {activeTab === item.id && <div className="nav-active-bar" />}
//               </button>
//             ))}
//           </nav>

//           {/* Bottom */}
//           <div className="sidebar-bottom">
//             <div className="sidebar-user">
//               <div className="user-avatar">AG</div>
//               <div className="user-info">
//                 <div className="user-name">Agent User</div>
//                 <div className="user-role">Support Agent</div>
//               </div>
//             </div>
//             <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
//               <div className="logout-icon">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//                   <polyline points="16 17 21 12 16 7"/>
//                   <line x1="21" y1="12" x2="9" y2="12"/>
//                 </svg>
//               </div>
//               <div className="logout-text">
//                 <div className="logout-label">Sign Out</div>
//                 <div className="logout-sublabel">End session</div>
//               </div>
//             </button>
//           </div>
//         </aside>

//         {/* Main content */}
//         <div className="panel-main">
//           {/* Topbar */}
//           <header className="topbar">
//             <div className="topbar-left">
//               <div className="topbar-page-icon">
//                 {activeItem?.icon}
//               </div>
//               <div className="topbar-breadcrumb">
//                 <span className="breadcrumb-base">CareDesk</span>
//                 <span className="breadcrumb-sep">/</span>
//                 <span className="breadcrumb-current">{activeItem?.label}</span>
//               </div>
//             </div>
//             <div className="topbar-right">
//               <div className="topbar-badge">
//                 <div className="online-dot" />
//                 Online
//               </div>
//               <div className="topbar-badge">
//                 {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
//               </div>
//             </div>
//           </header>

//           {/* Page content */}
//           <main className="content-area" key={activeTab}>
//             {contentMap[activeTab]}
//           </main>
//         </div>
//       </div>

//       {/* Logout Confirmation Modal */}
//       {showLogoutModal && (
//         <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
//           <div className="modal-card" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//                 <polyline points="16 17 21 12 16 7"/>
//                 <line x1="21" y1="12" x2="9" y2="12"/>
//               </svg>
//             </div>
//             <div className="modal-title">Sign out?</div>
//             <div className="modal-body">
//               You're about to end your session. Any unsaved changes will be lost. Are you sure you want to continue?
//             </div>
//             <div className="modal-actions">
//               <button className="modal-cancel" onClick={() => setShowLogoutModal(false)}>
//                 Stay
//               </button>
//               <button className="modal-confirm" onClick={handleLogout}>
//                 Yes, Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomerCarePanel;

// ============================================================
// FILE: src/pages/CustomerCarePanel.jsx
// CHANGES:
//   1. useEffect — added [] dependency array (was running on every render)
//   2. useEffect — reads from "user" key (was "loggedInUser" → always false)
//   3. handleLogout — removes "user" key, no setTimeout, no extra keys
//   4. sidebar-user section — shows real username from localStorage
// ============================================================

// import { useEffect, useState } from 'react';
// import CustomerCareHome from './CustomerCareHome';
// import CustomerCareProductHistory from './cutomerCareProductHis';
// import CustomerCareComplains from './CutomerCareComplains';
// import { useNavigate } from 'react-router-dom';
// import React from "react";
// const CustomerCarePanel = () => {
//   const [activeTab, setActiveTab] = useState('home');
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isAuth, setIsAuth] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null); 
//   const navigate = useNavigate();

//   const navItems = [
//     {
//       id: 'home',
//       label: 'Home',
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
//           <polyline points="9 22 9 12 15 12 15 22"/>
//         </svg>
//       ),
//       desc: 'Registration'
//     },
//     {
//       id: 'producthistory',
//       label: 'Product History',
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//           <polyline points="14 2 14 8 20 8"/>
//           <line x1="16" y1="13" x2="8" y2="13"/>
//           <line x1="16" y1="17" x2="8" y2="17"/>
//           <polyline points="10 9 9 9 8 9"/>
//         </svg>
//       ),
//       desc: 'All records'
//     },
//     {
//       id: 'complains',
//       label: 'Complaints',
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//         </svg>
//       ),
//       desc: 'Support tickets'
//     },
//   ];

//   const contentMap = {
//     home: <CustomerCareHome />,
//     producthistory: <CustomerCareProductHistory />,
//     complains: <CustomerCareComplains />,
//   };

//   const activeItem = navItems.find(item => item.id === activeTab);

//   // ✅ FIX #1 — useEffect dependency array added
//   //
//   // ❌ OLD CODE:
//   //   useEffect(() => {
//   //     setIsAuth(localStorage.getItem('loggedInUser') ? true : false)
//   //   })  ← no [] → ran on EVERY single render → performance issue / potential loop
//   //
//   // ✅ NEW CODE:
//   //   - Added [] so it only runs ONCE when component mounts
//   //   - Changed key from 'loggedInUser' to 'user' to match what login.jsx now saves
//   //   - Also load the user object so we can show real username in sidebar
//   useEffect(() => {
//     const stored = localStorage.getItem('user');
//     if (stored) {
//       const user = JSON.parse(stored);
//       setIsAuth(true);
//       setCurrentUser(user); // { token, username, role }
//     } else {
//       setIsAuth(false);
//       navigate('/login'); // ✅ Redirect if not logged in
//     }
//   }, []); // ← [] means: run once on mount only

//   // ✅ FIX #2 — handleLogout cleaned up
//   //
//   // ❌ OLD CODE:
//   //   localStorage.removeItem('loggedInUser');  ← wrong key
//   //   localStorage.removeItem('token');         ← separate key no longer used
//   //   setTimeout(() => { navigate('/login') })  ← pointless 0ms timeout
//   //
//   // ✅ NEW CODE:
//   //   - Remove only "user" (the one unified key)
//   //   - Call navigate directly — no timeout needed
//   //   - Close modal first so there's no visual flash
//   const handleLogout = () => {
//     localStorage.removeItem('user'); // ← the ONE key we use now
//     setShowLogoutModal(false);
//     navigate('/login');
//     console.log('✅ Logged out successfully');
//   };

//   // ✅ Helper: get initials for avatar from username
//   const getInitials = (username) => {
//     if (!username) return 'AG';
//     return username.slice(0, 2).toUpperCase();
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Figtree:wght@300;400;500;600&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         .panel-root {
//           min-height: 100vh;
//           display: flex;
//           background: #0a0a0f;
//           font-family: 'Figtree', sans-serif;
//           position: relative;
//           overflow: hidden;
//         }

//         .panel-root::before {
//           content: '';
//           position: fixed;
//           inset: 0;
//           background:
//             radial-gradient(ellipse 50% 70% at 0% 30%, rgba(255, 80, 30, 0.07) 0%, transparent 60%),
//             radial-gradient(ellipse 40% 50% at 100% 80%, rgba(255, 160, 50, 0.05) 0%, transparent 60%);
//           pointer-events: none;
//           z-index: 0;
//         }

//         .sidebar {
//           width: ${sidebarOpen ? '240px' : '72px'};
//           min-height: 100vh;
//           background: rgba(255,255,255,0.025);
//           border-right: 1px solid rgba(255,255,255,0.07);
//           display: flex;
//           flex-direction: column;
//           position: fixed;
//           left: 0; top: 0; bottom: 0;
//           z-index: 10;
//           transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
//           backdrop-filter: blur(20px);
//           overflow: hidden;
//         }

//         .sidebar-top {
//           padding: 24px 16px 20px;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .sidebar-logo {
//           width: 40px; height: 40px;
//           border-radius: 11px;
//           background: linear-gradient(135deg, #ff7040, #ff4010);
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0;
//           box-shadow: 0 4px 16px rgba(255,100,40,0.4);
//         }

//         .sidebar-brand {
//           overflow: hidden; white-space: nowrap;
//           opacity: ${sidebarOpen ? '1' : '0'};
//           transition: opacity 0.2s ease;
//         }

//         .sidebar-brand-name {
//           font-family: 'Syne', sans-serif;
//           font-size: 15px; font-weight: 800; color: #fff;
//           letter-spacing: -0.01em; line-height: 1.2;
//         }

//         .sidebar-brand-sub {
//           font-size: 11px; color: rgba(255,255,255,0.35); letter-spacing: 0.03em;
//         }

//         .sidebar-nav {
//           flex: 1; padding: 16px 10px;
//           display: flex; flex-direction: column; gap: 4px;
//         }

//         .nav-label {
//           font-size: 10px; font-weight: 700;
//           letter-spacing: 0.12em; text-transform: uppercase;
//           color: rgba(255,255,255,0.2); padding: 8px 10px 6px;
//           white-space: nowrap; overflow: hidden;
//           opacity: ${sidebarOpen ? '1' : '0'};
//           transition: opacity 0.15s ease;
//         }

//         .nav-item {
//           display: flex; align-items: center; gap: 12px;
//           padding: 11px 12px; border-radius: 11px;
//           cursor: pointer; border: none; background: transparent;
//           width: 100%; text-align: left;
//           transition: all 0.2s ease; position: relative; white-space: nowrap;
//         }

//         .nav-item:hover:not(.active) { background: rgba(255,255,255,0.05); }

//         .nav-item.active {
//           background: linear-gradient(135deg, rgba(255,112,64,0.2), rgba(255,80,32,0.12));
//           border: 1px solid rgba(255,112,64,0.2);
//         }

//         .nav-item-icon {
//           width: 36px; height: 36px; border-radius: 9px;
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0; transition: all 0.2s ease;
//           color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.04);
//         }

//         .nav-item.active .nav-item-icon { color: #ff7040; background: rgba(255,112,64,0.12); }

//         .nav-item-text {
//           overflow: hidden;
//           opacity: ${sidebarOpen ? '1' : '0'};
//           transition: opacity 0.15s ease;
//         }

//         .nav-item-label { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.5); line-height: 1.2; }
//         .nav-item.active .nav-item-label { color: #fff; }
//         .nav-item-desc { font-size: 11px; color: rgba(255,255,255,0.25); margin-top: 1px; }

//         .nav-active-bar {
//           position: absolute; right: 0; top: 50%;
//           transform: translateY(-50%);
//           width: 3px; height: 20px;
//           background: linear-gradient(180deg, #ff7040, #ff4010);
//           border-radius: 3px 0 0 3px;
//         }

//         .sidebar-bottom {
//           padding: 12px 10px 20px;
//           border-top: 1px solid rgba(255,255,255,0.06);
//         }

//         .sidebar-user {
//           display: flex; align-items: center; gap: 10px;
//           padding: 10px 12px; border-radius: 11px; margin-bottom: 6px;
//           background: rgba(255,255,255,0.03);
//         }

//         .user-avatar {
//           width: 34px; height: 34px; border-radius: 50%;
//           background: linear-gradient(135deg, #2a1f3d, #3d2a1f);
//           border: 2px solid rgba(255,112,64,0.3);
//           display: flex; align-items: center; justify-content: center;
//           font-size: 13px; font-weight: 700; color: #ff7040;
//           flex-shrink: 0; font-family: 'Syne', sans-serif;
//         }

//         .user-info {
//           overflow: hidden;
//           opacity: ${sidebarOpen ? '1' : '0'};
//           transition: opacity 0.15s ease; flex: 1;
//         }

//         .user-name {
//           font-size: 13px; font-weight: 600; color: #fff;
//           white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
//         }

//         .user-role { font-size: 11px; color: rgba(255,255,255,0.3); }

//         .logout-btn {
//           display: flex; align-items: center; gap: 10px;
//           width: 100%; padding: 10px 12px; border-radius: 11px;
//           border: 1px solid rgba(255, 60, 60, 0.15);
//           background: rgba(255, 60, 60, 0.06);
//           cursor: pointer; transition: all 0.2s ease; white-space: nowrap;
//         }

//         .logout-btn:hover { background: rgba(255, 60, 60, 0.14); border-color: rgba(255, 60, 60, 0.3); }

//         .logout-icon {
//           width: 34px; height: 34px; border-radius: 9px;
//           display: flex; align-items: center; justify-content: center;
//           background: rgba(255, 60, 60, 0.1); color: #ff5050; flex-shrink: 0;
//         }

//         .logout-text {
//           overflow: hidden;
//           opacity: ${sidebarOpen ? '1' : '0'};
//           transition: opacity 0.15s ease;
//         }

//         .logout-label { font-size: 13px; font-weight: 600; color: #ff5050; }
//         .logout-sublabel { font-size: 11px; color: rgba(255, 80, 80, 0.5); }

//         .sidebar-toggle {
//           position: fixed; top: 28px;
//           left: ${sidebarOpen ? '208px' : '50px'};
//           z-index: 20; width: 28px; height: 28px; border-radius: 50%;
//           background: #1a1a24; border: 1px solid rgba(255,255,255,0.1);
//           cursor: pointer; display: flex; align-items: center; justify-content: center;
//           color: rgba(255,255,255,0.5);
//           transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
//           box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//         }

//         .sidebar-toggle:hover { background: #222230; color: #fff; border-color: rgba(255,255,255,0.2); }

//         .toggle-arrow {
//           transition: transform 0.3s ease;
//           transform: rotate(${sidebarOpen ? '0deg' : '180deg'});
//         }

//         .panel-main {
//           flex: 1;
//           margin-left: ${sidebarOpen ? '240px' : '72px'};
//           min-height: 100vh; display: flex; flex-direction: column;
//           transition: margin-left 0.3s cubic-bezier(0.22,1,0.36,1);
//           position: relative; z-index: 1;
//         }

//         .topbar {
//           height: 64px; display: flex; align-items: center;
//           justify-content: space-between; padding: 0 32px;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           background: rgba(10,10,15,0.8); backdrop-filter: blur(12px);
//           position: sticky; top: 0; z-index: 5;
//         }

//         .topbar-left { display: flex; align-items: center; gap: 12px; }

//         .topbar-page-icon {
//           width: 32px; height: 32px; border-radius: 8px;
//           background: rgba(255,112,64,0.12); border: 1px solid rgba(255,112,64,0.2);
//           display: flex; align-items: center; justify-content: center; color: #ff7040;
//         }

//         .topbar-breadcrumb { display: flex; align-items: center; gap: 8px; }
//         .breadcrumb-base { font-size: 13px; color: rgba(255,255,255,0.3); font-weight: 500; }
//         .breadcrumb-sep { color: rgba(255,255,255,0.15); font-size: 13px; }
//         .breadcrumb-current { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #fff; }

//         .topbar-right { display: flex; align-items: center; gap: 12px; }

//         .topbar-badge {
//           display: flex; align-items: center; gap: 6px;
//           background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 8px; padding: 6px 12px;
//           font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 500;
//         }

//         .online-dot {
//           width: 6px; height: 6px; background: #4ade80;
//           border-radius: 50%; animation: glow-pulse 2s ease-in-out infinite;
//         }

//         @keyframes glow-pulse {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
//           50% { box-shadow: 0 0 0 4px rgba(74,222,128,0); }
//         }

//         .content-area { flex: 1; animation: fade-in 0.3s ease both; }

//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .modal-overlay {
//           position: fixed; inset: 0;
//           background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
//           z-index: 100; display: flex; align-items: center; justify-content: center;
//           animation: overlay-in 0.2s ease both;
//         }

//         @keyframes overlay-in { from { opacity: 0; } to { opacity: 1; } }

//         .modal-card {
//           background: #13131c; border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 20px; padding: 32px; width: 360px;
//           box-shadow: 0 24px 64px rgba(0,0,0,0.6);
//           animation: modal-up 0.3s cubic-bezier(0.22,1,0.36,1) both;
//         }

//         @keyframes modal-up {
//           from { opacity: 0; transform: translateY(20px) scale(0.96); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         .modal-icon {
//           width: 52px; height: 52px; border-radius: 14px;
//           background: rgba(255,60,60,0.1); border: 1px solid rgba(255,60,60,0.2);
//           display: flex; align-items: center; justify-content: center;
//           color: #ff5050; margin-bottom: 20px;
//         }

//         .modal-title {
//           font-family: 'Syne', sans-serif; font-size: 20px;
//           font-weight: 800; color: #fff; letter-spacing: -0.01em; margin-bottom: 8px;
//         }

//         .modal-body { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 28px; }
//         .modal-actions { display: flex; gap: 10px; }

//         .modal-cancel {
//           flex: 1; padding: 12px; border-radius: 11px;
//           border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04);
//           color: rgba(255,255,255,0.6); font-family: 'Figtree', sans-serif;
//           font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s ease;
//         }

//         .modal-cancel:hover { background: rgba(255,255,255,0.08); color: #fff; }

//         .modal-confirm {
//           flex: 1; padding: 12px; border-radius: 11px; border: none;
//           background: linear-gradient(135deg, #ff4040, #cc2020);
//           color: #fff; font-family: 'Figtree', sans-serif;
//           font-size: 14px; font-weight: 700; cursor: pointer;
//           transition: all 0.2s ease; box-shadow: 0 4px 16px rgba(255,60,60,0.35);
//         }

//         .modal-confirm:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(255,60,60,0.5); }
//       `}</style>

//       <div className="panel-root">

//         {/* Sidebar Toggle */}
//         <button className="sidebar-toggle" onClick={() => setSidebarOpen(o => !o)}>
//           <span className="toggle-arrow">
//             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <polyline points="15 18 9 12 15 6"/>
//             </svg>
//           </span>
//         </button>

//         {/* Sidebar */}
//         <aside className="sidebar">
//           <div className="sidebar-top">
//             <div className="sidebar-logo">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12c-.88-2.64-1.42-5.39-1.6-8.18A2 2 0 0 1 5.37 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 24 16.92z"/>
//               </svg>
//             </div>
//             <div className="sidebar-brand">
//               <div className="sidebar-brand-name">CareDesk</div>
//               <div className="sidebar-brand-sub">Support Portal</div>
//             </div>
//           </div>

//           <nav className="sidebar-nav">
//             <div className="nav-label">Navigation</div>
//             {navItems.map(item => (
//               <button
//                 key={item.id}
//                 className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//                 onClick={() => setActiveTab(item.id)}
//               >
//                 <div className="nav-item-icon">{item.icon}</div>
//                 <div className="nav-item-text">
//                   <div className="nav-item-label">{item.label}</div>
//                   <div className="nav-item-desc">{item.desc}</div>
//                 </div>
//                 {activeTab === item.id && <div className="nav-active-bar" />}
//               </button>
//             ))}
//           </nav>

//           <div className="sidebar-bottom">
//             {/* ✅ FIX #3 — Show real username from localStorage */}
//             <div className="sidebar-user">
//               <div className="user-avatar">
//                 {getInitials(currentUser?.username)}
//               </div>
//               <div className="user-info">
//                 {/* ✅ Shows actual logged-in username now */}
//                 <div className="user-name">{currentUser?.username || 'Agent'}</div>
//                 <div className="user-role">{currentUser?.role || 'Support Agent'}</div>
//               </div>
//             </div>
//             <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
//               <div className="logout-icon">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//                   <polyline points="16 17 21 12 16 7"/>
//                   <line x1="21" y1="12" x2="9" y2="12"/>
//                 </svg>
//               </div>
//               <div className="logout-text">
//                 <div className="logout-label">Sign Out</div>
//                 <div className="logout-sublabel">End session</div>
//               </div>
//             </button>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <div className="panel-main">
//           <header className="topbar">
//             <div className="topbar-left">
//               <div className="topbar-page-icon">{activeItem?.icon}</div>
//               <div className="topbar-breadcrumb">
//                 <span className="breadcrumb-base">CareDesk</span>
//                 <span className="breadcrumb-sep">/</span>
//                 <span className="breadcrumb-current">{activeItem?.label}</span>
//               </div>
//             </div>
//             <div className="topbar-right">
//               <div className="topbar-badge">
//                 <div className="online-dot" />
//                 Online
//               </div>
//               <div className="topbar-badge">
//                 {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
//               </div>
//             </div>
//           </header>

//           <main className="content-area" key={activeTab}>
//             {contentMap[activeTab]}
//           </main>
//         </div>
//       </div>

//       {/* Logout Modal */}
//       {showLogoutModal && (
//         <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
//           <div className="modal-card" onClick={e => e.stopPropagation()}>
//             <div className="modal-icon">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//                 <polyline points="16 17 21 12 16 7"/>
//                 <line x1="21" y1="12" x2="9" y2="12"/>
//               </svg>
//             </div>
//             <div className="modal-title">Sign out?</div>
//             <div className="modal-body">
//               You're about to end your session. Any unsaved changes will be lost. Are you sure?
//             </div>
//             <div className="modal-actions">
//               <button className="modal-cancel" onClick={() => setShowLogoutModal(false)}>Stay</button>
//               <button className="modal-confirm" onClick={handleLogout}>Yes, Sign Out</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomerCarePanel;
// import { useEffect, useState } from 'react';
// import CustomerCareHome from './CustomerCareHome';
// import CustomerCareProductHistory from './cutomerCareProductHis';
// import CustomerCareComplains from './CutomerCareComplains';
// import { useNavigate } from 'react-router-dom';
// import React from "react";
// import CustomerCareCustomerHistroy from './CustomerCareCustomerHistroy';

// const CustomerCarePanel = () => {
//   const [activeTab, setActiveTab] = useState('home');
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null); 
//   const navigate = useNavigate();

//   const navItems = [
//     {
//       id: 'home',
//       label: 'Home',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
//           <polyline points="9 22 9 12 15 12 15 22"/>
//         </svg>
//       )
//     },
//     {
//       id: 'customerhistory',
//       label: 'customer History',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//           <polyline points="14 2 14 8 20 8"/>
//           <line x1="16" y1="13" x2="8" y2="13"/>
//           <line x1="16" y1="17" x2="8" y2="17"/>
//         </svg>
//       )
//     },
//     {
//       id: 'producthistory',
//       label: 'Product History',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//           <polyline points="14 2 14 8 20 8"/>
//           <line x1="16" y1="13" x2="8" y2="13"/>
//           <line x1="16" y1="17" x2="8" y2="17"/>
//         </svg>
//       )
//     },
//     {
//       id: 'complains',
//       label: 'Complaints',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//         </svg>
//       )
//     },
//   ];

//   const contentMap = {
//     home: <CustomerCareHome />,
//     customerhistory: <CustomerCareCustomerHistroy />,
//     complains: <CustomerCareComplains />,
//     producthistory:<CustomerCareProductHistory/>
//   };

//   const activeItem = navItems.find(item => item.id === activeTab);

//   useEffect(() => {
//     const stored = localStorage.getItem('user');
//     if (stored) {
//       const user = JSON.parse(stored);
//       setCurrentUser(user);
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setShowLogoutModal(false);
//     navigate('/login');
//   };

//   const getInitials = (username) => {
//     if (!username) return 'U';
//     return username.slice(0, 2).toUpperCase();
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: 'Inter', sans-serif;
//           background: #faf9f6;
//         }

//         .panel-container {
//           display: flex;
//           min-height: 100vh;
//           background: #faf9f6;
//         }

//         /* Sidebar Styles */
//         .sidebar {
//           width: ${sidebarOpen ? '280px' : '80px'};
//           background: white;
//           border-right: 1px solid #f0f0f0;
//           transition: width 0.3s ease;
//           position: fixed;
//           height: 100vh;
//           z-index: 50;
//           box-shadow: 2px 0 20px rgba(0, 0, 0, 0.02);
//         }

//         .sidebar-header {
//           height: 70px;
//           display: flex;
//           align-items: center;
//           padding: 0 24px;
//           border-bottom: 1px solid #f5f5f5;
//         }

//         .logo {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .logo-icon {
//           width: 36px;
//           height: 36px;
//           background: linear-gradient(135deg, #f97316, #fb923c);
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-weight: 700;
//           font-size: 18px;
//           flex-shrink: 0;
//         }

//         .logo-text {
//           font-weight: 700;
//           font-size: 18px;
//           color: #1a1a1a;
//           white-space: nowrap;
//           opacity: ${sidebarOpen ? 1 : 0};
//           transition: opacity 0.2s;
//         }

//         .nav-menu {
//           padding: 24px 16px;
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .nav-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 12px 16px;
//           border-radius: 12px;
//           cursor: pointer;
//           border: none;
//           background: transparent;
//           width: 100%;
//           text-align: left;
//           transition: all 0.2s ease;
//           color: #666;
//           white-space: nowrap;
//         }

//         .nav-item:hover {
//           background: #fff7ed;
//           color: #f97316;
//         }

//         .nav-item.active {
//           background: #f97316;
//           color: white;
//         }

//         .nav-icon {
//           width: 24px;
//           height: 24px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }

//         .nav-label {
//           font-size: 15px;
//           font-weight: 500;
//           opacity: ${sidebarOpen ? 1 : 0};
//           transition: opacity 0.2s;
//         }

//         .sidebar-footer {
//           position: absolute;
//           bottom: 24px;
//           left: 0;
//           right: 0;
//           padding: 0 16px;
//         }

//         .user-profile {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 12px 16px;
//           background: #faf9f6;
//           border-radius: 12px;
//           margin-bottom: 8px;
//         }

//         .user-avatar {
//           width: 40px;
//           height: 40px;
//           background: linear-gradient(135deg, #f97316, #fb923c);
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-weight: 600;
//           font-size: 14px;
//           flex-shrink: 0;
//         }

//         .user-details {
//           opacity: ${sidebarOpen ? 1 : 0};
//           transition: opacity 0.2s;
//           overflow: hidden;
//         }

//         .user-name {
//           font-weight: 600;
//           font-size: 14px;
//           color: #1a1a1a;
//           white-space: nowrap;
//         }

//         .user-role {
//           font-size: 12px;
//           color: #999;
//           margin-top: 2px;
//         }

//         .logout-button {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 12px 16px;
//           width: 100%;
//           border: none;
//           background: transparent;
//           border-radius: 12px;
//           color: #ef4444;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           white-space: nowrap;
//         }

//         .logout-button:hover {
//           background: #fef2f2;
//         }

//         .logout-icon {
//           width: 24px;
//           height: 24px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }

//         .logout-text {
//           opacity: ${sidebarOpen ? 1 : 0};
//           transition: opacity 0.2s;
//         }

//         /* Toggle Button */
//         .toggle-button {
//           position: fixed;
//           top: 20px;
//           left: ${sidebarOpen ? '260px' : '60px'};
//           z-index: 60;
//           width: 32px;
//           height: 32px;
//           background: white;
//           border: 1px solid #f0f0f0;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
//           color: #666;
//         }

//         .toggle-button:hover {
//           background: #f97316;
//           color: white;
//           border-color: #f97316;
//         }

//         .toggle-icon {
//           transition: transform 0.3s ease;
//           transform: rotate(${sidebarOpen ? '0deg' : '180deg'});
//         }

//         /* Main Content */
//         .main-content {
//           flex: 1;
//           margin-left: ${sidebarOpen ? '280px' : '80px'};
//           transition: margin-left 0.3s ease;
//           min-height: 100vh;
//         }

//         .top-bar {
//           height: 70px;
//           background: white;
//           border-bottom: 1px solid #f0f0f0;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0 32px;
//           position: sticky;
//           top: 0;
//           z-index: 40;
//         }

//         .page-title {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .page-icon {
//           width: 36px;
//           height: 36px;
//           background: #fff7ed;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #f97316;
//         }

//         .page-name {
//           font-weight: 600;
//           font-size: 18px;
//           color: #1a1a1a;
//         }

//         .date-badge {
//           padding: 8px 16px;
//           background: #faf9f6;
//           border-radius: 20px;
//           font-size: 14px;
//           color: #666;
//           font-weight: 500;
//         }

//         .content-area {
//           padding: 32px;
//           animation: fadeIn 0.3s ease;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* Modal Styles */
//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.5);
//           backdrop-filter: blur(4px);
//           z-index: 100;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           animation: overlayShow 0.2s ease;
//         }

//         @keyframes overlayShow {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .modal-card {
//           background: white;
//           border-radius: 20px;
//           padding: 32px;
//           width: 400px;
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//           animation: modalShow 0.3s ease;
//         }

//         @keyframes modalShow {
//           from {
//             opacity: 0;
//             transform: scale(0.95) translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1) translateY(0);
//           }
//         }

//         .modal-icon {
//           width: 56px;
//           height: 56px;
//           background: #fef2f2;
//           border-radius: 16px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #ef4444;
//           margin-bottom: 20px;
//         }

//         .modal-title {
//           font-size: 22px;
//           font-weight: 700;
//           color: #1a1a1a;
//           margin-bottom: 8px;
//         }

//         .modal-description {
//           color: #666;
//           font-size: 15px;
//           line-height: 1.6;
//           margin-bottom: 24px;
//         }

//         .modal-actions {
//           display: flex;
//           gap: 12px;
//         }

//         .modal-button {
//           flex: 1;
//           padding: 12px;
//           border-radius: 12px;
//           font-size: 15px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           border: none;
//         }

//         .modal-button.cancel {
//           background: #f5f5f5;
//           color: #666;
//         }

//         .modal-button.cancel:hover {
//           background: #eee;
//         }

//         .modal-button.confirm {
//           background: #f97316;
//           color: white;
//         }

//         .modal-button.confirm:hover {
//           background: #fb923c;
//         }
//       `}</style>

//       <div className="panel-container">
//         {/* Sidebar Toggle */}
//         <button className="toggle-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
//           <span className="toggle-icon">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//               <polyline points="15 18 9 12 15 6" />
//             </svg>
//           </span>
//         </button>

//         {/* Sidebar */}
//         <aside className="sidebar">
//           <div className="sidebar-header">
//             <div className="logo">
//               <div className="logo-icon">CC</div>
//               <span className="logo-text">Customer Care</span>
//             </div>
//           </div>

//           <nav className="nav-menu">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//                 onClick={() => setActiveTab(item.id)}
//               >
//                 <span className="nav-icon">{item.icon}</span>
//                 <span className="nav-label">{item.label}</span>
//               </button>
//             ))}
//           </nav>

//           <div className="sidebar-footer">
//             <div className="user-profile">
//               <div className="user-avatar">
//                 {getInitials(currentUser?.username)}
//               </div>
//               <div className="user-details">
//                 <div className="user-name">{currentUser?.username || 'User'}</div>
//                 <div className="user-role">Customer Support</div>
//               </div>
//             </div>

//             <button className="logout-button" onClick={() => setShowLogoutModal(true)}>
//               <span className="logout-icon">
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                   <polyline points="16 17 21 12 16 7" />
//                   <line x1="21" y1="12" x2="9" y2="12" />
//                 </svg>
//               </span>
//               <span className="logout-text">Sign Out</span>
//             </button>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="main-content">
//           <div className="top-bar">
//             <div className="page-title">
//               <div className="page-icon">{activeItem?.icon}</div>
//               <span className="page-name">{activeItem?.label}</span>
//             </div>
//             <div className="date-badge">
//               {new Date().toLocaleDateString('en-IN', { 
//                 day: 'numeric', 
//                 month: 'short', 
//                 year: 'numeric' 
//               })}
//             </div>
//           </div>

//           <div className="content-area">
//             {contentMap[activeTab]}
//           </div>
//         </main>

//         {/* Logout Modal */}
//         {showLogoutModal && (
//           <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
//             <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-icon">
//                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                   <polyline points="16 17 21 12 16 7" />
//                   <line x1="21" y1="12" x2="9" y2="12" />
//                 </svg>
//               </div>
//               <h2 className="modal-title">Sign Out</h2>
//               <p className="modal-description">
//                 Are you sure you want to sign out? You'll need to login again to access your account.
//               </p>
//               <div className="modal-actions">
//                 <button 
//                   className="modal-button cancel" 
//                   onClick={() => setShowLogoutModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="modal-button confirm" 
//                   onClick={handleLogout}
//                 >
//                   Sign Out
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CustomerCarePanel;


import { useEffect, useState } from 'react';
import CustomerCareHome from './CustomerCareHome';
import CustomerCareProductHis from './CutomerCareProductHis';
import CustomerCareComplains from './CutomerCareComplains';
import { useNavigate } from 'react-router-dom';
import React from "react";
import CustomerCareCustomerHistroy from './CustomerCareCustomerHistroy';

const CustomerCarePanel = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); 
  const navigate = useNavigate();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      id: 'customerhistory',
      label: 'Customer History',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      )
    },
    {
      id: 'producthistory',
      label: 'Product History',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      )
    },
    {
      id: 'complains',
      label: 'Complaints',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
  ];

  const contentMap = {
    home: <CustomerCareHome />,
    customerhistory: <CustomerCareCustomerHistroy />,
    producthistory: <CustomerCareProductHis />,
    complains: <CustomerCareComplains />
  };

  const activeItem = navItems.find(item => item.id === activeTab);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      setCurrentUser(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShowLogoutModal(false);
    navigate('/login');
  };

  const getInitials = (username) => {
    if (!username) return 'U';
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: #faf9f6;
        }

        .panel-container {
          display: flex;
          min-height: 100vh;
          background: #faf9f6;
        }

        /* Sidebar Styles */
        .sidebar {
          width: ${sidebarOpen ? '280px' : '80px'};
          background: white;
          border-right: 1px solid #f0f0f0;
          transition: width 0.3s ease;
          position: fixed;
          height: 100vh;
          z-index: 50;
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.02);
          overflow-y: auto; /* Add scroll for many items */
        }

        .sidebar-header {
          height: 70px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          border-bottom: 1px solid #f5f5f5;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #f97316, #fb923c);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }

        .logo-text {
          font-weight: 700;
          font-size: 18px;
          color: #1a1a1a;
          white-space: nowrap;
          opacity: ${sidebarOpen ? 1 : 0};
          transition: opacity 0.2s;
        }

        .nav-menu {
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          transition: all 0.2s ease;
          color: #666;
          white-space: nowrap;
        }

        .nav-item:hover {
          background: #fff7ed;
          color: #f97316;
        }

        .nav-item.active {
          background: #f97316;
          color: white;
        }

        .nav-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nav-label {
          font-size: 15px;
          font-weight: 500;
          opacity: ${sidebarOpen ? 1 : 0};
          transition: opacity 0.2s;
        }

        .sidebar-footer {
          padding: 0 16px 24px;
          margin-top: auto;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #faf9f6;
          border-radius: 12px;
          margin-bottom: 8px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #f97316, #fb923c);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }

        .user-details {
          opacity: ${sidebarOpen ? 1 : 0};
          transition: opacity 0.2s;
          overflow: hidden;
        }

        .user-name {
          font-weight: 600;
          font-size: 14px;
          color: #1a1a1a;
          white-space: nowrap;
        }

        .user-role {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
        }

        .logout-button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          width: 100%;
          border: none;
          background: transparent;
          border-radius: 12px;
          color: #ef4444;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .logout-button:hover {
          background: #fef2f2;
        }

        .logout-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .logout-text {
          opacity: ${sidebarOpen ? 1 : 0};
          transition: opacity 0.2s;
        }

        /* Toggle Button */
        .toggle-button {
          position: fixed;
          top: 20px;
          left: ${sidebarOpen ? '260px' : '60px'};
          z-index: 60;
          width: 32px;
          height: 32px;
          background: white;
          border: 1px solid #f0f0f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          color: #666;
        }

        .toggle-button:hover {
          background: #f97316;
          color: white;
          border-color: #f97316;
        }

        .toggle-icon {
          transition: transform 0.3s ease;
          transform: rotate(${sidebarOpen ? '0deg' : '180deg'});
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: ${sidebarOpen ? '280px' : '80px'};
          transition: margin-left 0.3s ease;
          min-height: 100vh;
        }

        .top-bar {
          height: 70px;
          background: white;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .page-icon {
          width: 36px;
          height: 36px;
          background: #fff7ed;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f97316;
        }

        .page-name {
          font-weight: 600;
          font-size: 18px;
          color: #1a1a1a;
        }

        .date-badge {
          padding: 8px 16px;
          background: #faf9f6;
          border-radius: 20px;
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .content-area {
          padding: 32px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: overlayShow 0.2s ease;
        }

        @keyframes overlayShow {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          width: 400px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          animation: modalShow 0.3s ease;
        }

        @keyframes modalShow {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-icon {
          width: 56px;
          height: 56px;
          background: #fef2f2;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ef4444;
          margin-bottom: 20px;
        }

        .modal-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .modal-description {
          color: #666;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
        }

        .modal-button {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .modal-button.cancel {
          background: #f5f5f5;
          color: #666;
        }

        .modal-button.cancel:hover {
          background: #eee;
        }

        .modal-button.confirm {
          background: #f97316;
          color: white;
        }

        .modal-button.confirm:hover {
          background: #fb923c;
        }
      `}</style>

      <div className="panel-container">
        {/* Sidebar Toggle */}
        <button className="toggle-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <span className="toggle-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </span>
        </button>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <div className="logo-icon">CC</div>
              <span className="logo-text">Customer Care</span>
            </div>
          </div>

          <nav className="nav-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">
                {getInitials(currentUser?.username)}
              </div>
              <div className="user-details">
                <div className="user-name">{currentUser?.username || 'User'}</div>
                <div className="user-role">Customer Support</div>
              </div>
            </div>

            <button className="logout-button" onClick={() => setShowLogoutModal(true)}>
              <span className="logout-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </span>
              <span className="logout-text">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="top-bar">
            <div className="page-title">
              <div className="page-icon">{activeItem?.icon}</div>
              <span className="page-name">{activeItem?.label}</span>
            </div>
            <div className="date-badge">
              {new Date().toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </div>
          </div>

          <div className="content-area">
            {contentMap[activeTab]}
          </div>
        </main>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              <h2 className="modal-title">Sign Out</h2>
              <p className="modal-description">
                Are you sure you want to sign out? You'll need to login again to access your account.
              </p>
              <div className="modal-actions">
                <button 
                  className="modal-button cancel" 
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="modal-button confirm" 
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerCarePanel;