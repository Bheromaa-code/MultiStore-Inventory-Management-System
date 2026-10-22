import React, { useState, useEffect } from 'react';

function GlobalInventory({ inventoryList, setInventoryList, onSelectProduct, setActivePage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [warningItem, setWarningItem] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [tempName, setTempName] = useState('');

  const filteredInventory = (inventoryList || []).filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete bag ${id} from the inventory?`)) {
      const updated = inventoryList.filter(item => item.id !== id);
      setInventoryList(updated);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      
      {/* Header & Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Global Stock Overview</h2>
          <p className="text-sm text-gray-500">Real-time inventory levels across all items in the central warehouse. Click any row to view product details.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search SKU or Item ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase placeholder:normal-case font-medium"
          />
        </div>
      </div>

      {/* Inventory Table (Scrollable container without fixed height to avoid layout scrollbar lockups) */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Master Stock Registry</h3>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded">Live Sync Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-xs text-gray-500 uppercase">
                <th className="px-6 py-3">Item ID</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3 text-center">Total Quantity</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item, index) => {
                  const isLowStock = item.qty < 50;

                  return (
                    <tr 
                      key={index} 
                      onClick={() => onSelectProduct && onSelectProduct(item)}
                      className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {item.id}
                      </td>

                      <td className="px-6 py-4">
                        <img 
                          src={item.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&auto=format&fit=crop&q=60'} 
                          alt={item.id} 
                          className="w-12 h-12 object-cover rounded-md border border-gray-200 shadow-sm"
                        />
                      </td>

                      <td className="px-6 py-4 font-bold text-center text-lg text-gray-800">
                        {item.qty.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        {isLowStock ? (
                          <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md text-xs font-semibold">
                            Low Stock
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">
                            In Stock
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={(e) => handleDelete(item.id, e)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                    No inventory items found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Stock Button at the Bottom Outside the List Div */}
      <div className="flex justify-center my-2">
        <button 
          onClick={() => setActivePage && setActivePage('add-stock-open')}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm transition shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Stock
        </button>
      </div>

    </div>
  );
}

export default GlobalInventory;