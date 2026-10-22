import React from 'react';

function AdminHeader({ toggleSidebar, isSidebarOpen }) {
  return (
    <header className="flex items-center justify-between w-full h-16 px-6 bg-green-700 text-white rounded-b-xl md:rounded-b-none shadow-md z-50 shrink-0">
      
      {/* COMPANY NAME */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold tracking-wider">MIMS Inventory</span>
      </div>

      {/* TOGGLE MENU BUTTON (Changes between Hamburger and X) */}
      <button 
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {isSidebarOpen ? (
          /* X Close Icon */
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-7 h-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          /* Hamburger Menu Icon */
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-7 h-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

    </header>
  );
}

export default AdminHeader;