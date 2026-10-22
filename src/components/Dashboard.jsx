import React, { useState, useEffect } from 'react';

function Dashboard({ setActivePage, onSelectProduct, inventoryList }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const branchCount = 3;
  const recentBags = inventoryList || [
    { id: "BAG-2024-BLK", qty: 450, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&auto=format&fit=crop&q=60' },
    { id: "WALLET-LTH-01", qty: 185, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&auto=format&fit=crop&q=60' },
    { id: "BAG-LUX-RED", qty: 20, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&auto=format&fit=crop&q=60' }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-cyan-500 rounded-sm shadow-sm flex flex-col text-white relative overflow-hidden">
          <div className="p-5 z-10 flex-1">
            <h3 className="text-4xl font-bold mb-1">{branchCount}</h3>
            <p className="text-lg font-medium">Branches</p>
          </div>
          <button 
            onClick={() => setActivePage && setActivePage('branches')}
            className="bg-black/10 hover:bg-black/20 w-full py-1.5 flex justify-center items-center gap-1 text-sm z-10 cursor-pointer"
          >
            View branches &rarr;
          </button>
        </div>

        <div className="bg-green-500 rounded-sm shadow-sm flex flex-col text-white relative overflow-hidden">
          <div className="p-5 z-10 flex-1">
            <h3 className="text-4xl font-bold mb-1">{recentBags.length}</h3>
            <p className="text-lg font-medium">Products</p>
          </div>
        </div>

        <div className="bg-amber-500 rounded-sm shadow-sm flex flex-col text-white relative overflow-hidden">
          <div className="p-5 z-10 flex-1">
            <h3 className="text-4xl font-bold mb-1">5</h3>
            <p className="text-lg font-medium">Pending Approvals</p>
          </div>
        </div>

        <div className="bg-red-500 rounded-sm shadow-sm flex flex-col text-white relative overflow-hidden">
          <div className="p-5 z-10 flex-1">
            <h3 className="text-4xl font-bold mb-1">12</h3>
            <p className="text-lg font-medium">Pending Imports</p>
          </div>
        </div>
      </div>

      {/* Add Stock Button */}
      <div className="flex justify-start">
        <button 
          onClick={() => setActivePage && setActivePage('add-stock-open')}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full shadow-sm hover:bg-blue-700 transition cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Stock
        </button>
      </div>

      {/* Recent Inventory Widget */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden mt-2">
        <div className="px-4 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <h2 className="text-lg font-semibold text-gray-800">Recently Updated Bags</h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-sm">Top 10</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Item ID</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm w-24">Qty.</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm w-24 text-center">Image</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm w-24 text-right">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
              {recentBags.map((bag) => (
                <tr 
                  key={bag.id} 
                  onClick={() => onSelectProduct && onSelectProduct(bag)}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{bag.id}</td>
                  <td className="px-4 py-3 font-semibold">{bag.qty}</td>
                  <td className="px-4 py-3 flex justify-center">
                    <img src={bag.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&auto=format&fit=crop&q=60'} alt="bag" className="w-8 h-8 object-cover rounded" />
                  </td>
                  
                  <td className="px-4 py-3 text-right relative" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === bag.id ? null : bag.id);
                      }}
                      className="p-1.5 hover:bg-gray-200 rounded-full text-gray-600 transition cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                      </svg>
                    </button>

                    {openDropdown === bag.id && (
                      <div className="absolute right-4 top-10 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 text-left">
                        <button 
                          onClick={() => onSelectProduct && onSelectProduct(bag)}
                          className="w-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 text-left flex items-center gap-2"
                        >
                          ➕ Add Stock
                        </button>
                        <button 
                          onClick={() => onSelectProduct && onSelectProduct(bag)}
                          className="w-full px-4 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 text-left flex items-center gap-2"
                        >
                          📤 Debit to Branch
                        </button>
                        <button 
                          onClick={() => onSelectProduct && onSelectProduct(bag)}
                          className="w-full px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 text-left flex items-center gap-2 border-t border-gray-100"
                        >
                          👁️ View History
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;