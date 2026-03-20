


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
      )},
    
    {
      id: 'Complains',
      label: 'Customer Complains',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      )
    },
    

   
  ];

  const contentMap = {
    home: <CustomerCareHome />,
    customerhistory: <CustomerCareCustomerHistroy />,
    producthistory: <CustomerCareProductHis />,
    Complains: <CustomerCareComplains />
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
          background: #f5f7fa;
        }

        .panel-container {
          display: flex;
          min-height: 100vh;
          background: #f5f7fa;
        }

        /* Sidebar Styles */
        .sidebar {
          width: ${sidebarOpen ? '280px' : '80px'};
          background: #FFFFFF;
          border-right: 1px solid #eef2f6;
          transition: width 0.3s ease;
          position: fixed;
          height: 100vh;
          z-index: 50;
          box-shadow: 2px 0 20px rgba(31, 110, 140, 0.08);
          overflow-y: auto;
        }

        .sidebar-header {
          height: 70px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          border-bottom: 1px solid #eef2f6;
          background: #1F6E8C; /* Header background */
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: #D9A441; /* CTA button color */
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F7F7F2; /* Logo text color */
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }

        .logo-text {
          font-weight: 700;
          font-size: 18px;
          color: #F7F7F2; /* Logo text color */
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
          color: #4a5568;
          white-space: nowrap;
        }

        .nav-item:hover {
          background: rgba(107, 163, 104, 0.1); /* #6BA368 with opacity */
          color: #6BA368; /* Icon color on hover */
        }

        .nav-item.active {
          background: #1F6E8C; /* Button color for active */
          color: #F7F7F2;
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
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 8px;
          border: 1px solid #eef2f6;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: #6BA368; /* Icon color */
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F7F7F2;
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
          color: #1F6E8C; /* Header color for name */
          white-space: nowrap;
        }

        .user-role {
          font-size: 12px;
          color: #6BA368; /* Icon color for role */
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
          color: #D9A441; /* CTA button color */
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .logout-button:hover {
          background: rgba(217, 164, 65, 0.1); /* #D9A441 with opacity */
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
          background: #FFFFFF;
          border: 1px solid #eef2f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(31, 110, 140, 0.1);
          color: #1F6E8C;
        }

        .toggle-button:hover {
          background: #1F6E8C;
          color: #F7F7F2;
          border-color: #1F6E8C;
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
          background: #1F6E8C; /* Header background */
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
          background: rgba(247, 247, 242, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F7F7F2;
        }

        .page-name {
          font-weight: 600;
          font-size: 18px;
          color: #F7F7F2; /* Logo text color */
        }

        .date-badge {
          padding: 8px 16px;
          background: #D9A441; /* CTA button color */
          border-radius: 20px;
          font-size: 14px;
          color: #F7F7F2;
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
          background: rgba(31, 110, 140, 0.5);
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
          background: #FFFFFF;
          border-radius: 20px;
          padding: 32px;
          width: 400px;
          box-shadow: 0 20px 40px rgba(31, 110, 140, 0.15);
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
          background: rgba(217, 164, 65, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D9A441;
          margin-bottom: 20px;
        }

        .modal-title {
          font-size: 22px;
          font-weight: 700;
          color: #1F6E8C;
          margin-bottom: 8px;
        }

        .modal-description {
          color: #4a5568;
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
          background: #f1f5f9;
          color: #1F6E8C;
        }

        .modal-button.cancel:hover {
          background: #e2e8f0;
        }

        .modal-button.confirm {
          background: #D9A441;
          color: #F7F7F2;
        }

        .modal-button.confirm:hover {
          background: #c08c2e;
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
              <div className="logo-icon">IT</div>
              <span className="logo-text">IT Support</span>
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
                <div className="user-role">IT Support</div>
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