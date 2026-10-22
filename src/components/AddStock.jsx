import React, { useState, useEffect } from 'react';

function AddStock({ inventoryList, setInventoryList, onSelectProduct, openWithForm = false }) {
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [showForm, setShowForm] = useState(openWithForm);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  
  // Warning modal state when saving a new item ID
  const [pendingEntry, setPendingEntry] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const [recentAdditions, setRecentAdditions] = useState([
    { id: 1, sku: 'BAG-2024-BLK', qty: 250, image: '', time: '10:45 AM', notes: 'Initial batch shipment' },
    { id: 2, sku: 'WALLET-LTH-01', qty: 100, image: '', time: '11:20 AM', notes: 'Express restock' }
  ]);

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (!itemId || !quantity) return;

    const sanitizedId = itemId.replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
    const parsedQty = parseInt(quantity);
    
    // Trigger the mandatory warning modal before saving permanently
    setPendingEntry({
      sku: sanitizedId,
      qty: parsedQty,
      image: imageUrl.trim() || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&auto=format&fit=crop&q=60',
      notes: notes || 'No additional notes'
    });
  };

  const confirmSaveEntry = () => {
    if (!pendingEntry) return;

    const newEntry = {
      id: Date.now(),
      ...pendingEntry,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setRecentAdditions([newEntry, ...recentAdditions]);

    if (setInventoryList && inventoryList) {
      const existingItemIndex = inventoryList.findIndex(item => item.id === pendingEntry.sku);
      if (existingItemIndex > -1) {
        const updated = [...inventoryList];
        updated[existingItemIndex].qty += pendingEntry.qty;
        if (pendingEntry.image) updated[existingItemIndex].image = pendingEntry.image;
        setInventoryList(updated);
      } else {
        setInventoryList([...inventoryList, { 
          id: pendingEntry.sku, 
          qty: pendingEntry.qty, 
          image: pendingEntry.image,
          history: [{ action: 'Initial Stock Added', qty: `+${pendingEntry.qty}`, user: 'The Boss', time: new Date().toLocaleDateString() }] 
        }]);
      }
    }

    setSuccessMessage(`Successfully added ${pendingEntry.qty} units of ${pendingEntry.sku} to Head Office inventory!`);
    setItemId('');
    setQuantity('');
    setImageUrl('');
    setNotes('');
    setPendingEntry(null);
    setShowForm(false);

    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleDeleteRecent = (id) => {
    setRecentAdditions(recentAdditions.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      
      <div className="flex flex-col gap-4 mt-5">
        <span className="grid grid-col gap-1">
          <h2 className="text-3xl font-extrabold uppercase text-gray-800 mb-1">Add Stock to Shop</h2>
          <p className="text-sm text-gray-500 mt-0.5">Enter new product batches directly into the central warehouse.</p>
        </span>

        <div className='flex justify-center'>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex justify-center mt-3 mb-3 px-5 py-3 bg-green-600 w-[50%] hover:bg-green-700 text-white font-medium rounded-lg text-sm transition shadow-sm items-center gap-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d={showForm ? "M5 12h14" : "M12 4.5v15m7.5-7.5h-15"} />
            </svg>
            {showForm ? "Close Stock Form" : "Add New Stock"}
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2 shadow-sm">
          <span>{successMessage}</span>
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleInitialSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Item ID / SKU</label>
                <input 
                  type="text" 
                  placeholder="e.g., BAG-LUX-BLU" 
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Quantity Received</label>
                <input 
                  type="number" 
                  min="1"
                  placeholder="e.g., 250" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Product Image URL (Optional)</label>
              <input 
                type="url" 
                placeholder="https://example.com/bag-image.jpg" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Shipment Notes (Optional)</label>
              <textarea 
                rows="3"
                placeholder="e.g., Shipped from primary manufacturer."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm transition shadow-sm"
              >
                Save & Update Inventory
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Warning Modal for Saving Item ID */}
      {pendingEntry && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-bold text-amber-600 flex items-center gap-2">
              ⚠️ Warning: Permanent Item ID
            </h3>
            <p className="text-sm text-gray-600">
              Please review the item name <strong>{pendingEntry.sku}</strong> carefully. Once saved to the database, you cannot modify this item ID. Are you sure you want to proceed?
            </p>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setPendingEntry(null)}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold cursor-pointer"
              >
                Cancel / Recheck
              </button>
              <button 
                onClick={confirmSaveEntry}
                className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold cursor-pointer"
              >
                Yes, Save Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recently Added Stock Section */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mt-2">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Recently Added Stock</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">Live Session Log</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-xs text-gray-500 uppercase">
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Item SKU</th>
                <th className="px-6 py-3">Qty Added</th>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3 text-right">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {recentAdditions.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => {
                    if (inventoryList) {
                      const found = inventoryList.find(i => i.id === item.sku);
                      if (found && onSelectProduct) onSelectProduct(found);
                    }
                  }}
                  className="hover:bg-gray-50 transition-colors relative cursor-pointer"
                >
                  <td className="px-6 py-3">
                    <img src={item.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&auto=format&fit=crop&q=60'} alt="item" className="w-10 h-10 object-cover rounded-md border" />
                  </td>
                  <td className="px-6 py-3 font-semibold text-gray-900">{item.sku}</td>
                  <td className="px-6 py-3 font-bold text-green-600">+{item.qty}</td>
                  <td className="px-6 py-3 text-gray-500 text-xs">{item.time}</td>
                  
                  {/* Options Column with 3 Dots Menu */}
                  <td className="px-6 py-3 text-right relative" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === item.id ? null : item.id);
                      }}
                      className="p-1.5 hover:bg-gray-200 rounded-full text-gray-600 transition cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                      </svg>
                    </button>

                    {openDropdownId === item.id && (
                      <div className="absolute right-6 top-10 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 text-left">
                        <button 
                          onClick={() => {
                            if (inventoryList) {
                              const found = inventoryList.find(i => i.id === item.sku);
                              if (found && onSelectProduct) onSelectProduct(found);
                            }
                          }}
                          className="w-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 text-left flex items-center gap-2"
                        >
                          ➕ Add Stock
                        </button>
                        <button 
                          onClick={() => {
                            if (inventoryList) {
                              const found = inventoryList.find(i => i.id === item.sku);
                              if (found && onSelectProduct) onSelectProduct(found);
                            }
                          }}
                          className="w-full px-4 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 text-left flex items-center gap-2"
                        >
                          📤 Debit to Branch
                        </button>
                        <button 
                          onClick={() => handleDeleteRecent(item.id)}
                          className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 text-left flex items-center gap-2 border-t border-gray-100"
                        >
                          🗑️ Delete Entry
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

export default AddStock;