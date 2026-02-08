import React, { useState } from 'react';

const CustomerCareHome = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'producthistory', label: 'Product History' },
    { id: 'complains', label: 'Complains' },
    { id: 'register', label: 'Register' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Customer Care</h2>
            <p className="text-gray-600">Select an option from the menu to get started.</p>
          </div>
        );
      case 'producthistory':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Product History</h2>
            <p className="text-gray-600">View your past purchases and product details here.</p>
          </div>
        );
      case 'complains':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Complains</h2>
            <p className="text-gray-600">Submit or track your complaints here.</p>
          </div>
        );
    
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-4 px-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === item.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default CustomerCareHome;