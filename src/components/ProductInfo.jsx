import React, { useState } from 'react';

function ProductInfo({ product, onBack, updateProductStock }) {
  const [successMsg, setSuccessMsg] = useState('');
  const [showDebitModal, setShowDebitModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState('Branch A (Lagos)');
  const [debitQty, setDebitQty] = useState('');
  const [restockQty, setRestockQty] = useState('');

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border p-8">
        <p className="text-gray-500 mb-4">No product selected.</p>
        <button onClick={onBack} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Back to Inventory</button>
      </div>
    );
  }

  const branchesList = ['Branch A (Lagos)', 'Branch B (Abuja)', 'Branch C (Port Harcourt)'];

  const handleDebitSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(debitQty);
    if (!amount || amount <= 0) return;
    if (amount > product.qty) {
      alert("Cannot debit more than available stock quantity!");
      return;
    }

    const newQty = product.qty - amount;
    const newHistoryEntry = {
      action: `Debit to ${selectedBranch}`,
      qty: `-${amount}`,
      user: 'Admin / Boss',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    updateProductStock(product.id, newQty, newHistoryEntry);
    setSuccessMsg(`Successfully debited ${amount} units to ${selectedBranch}!`);
    setDebitQty('');
    setShowDebitModal(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(restockQty);
    if (!amount || amount <= 0) return;

    const newQty = product.qty + amount;
    const newHistoryEntry = {
      action: 'Restocked Head Office',
      qty: `+${amount}`,
      user: 'The Boss',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    updateProductStock(product.id, newQty, newHistoryEntry);
    setSuccessMsg(`Successfully added ${amount} units to Head Office inventory database!`);
    setRestockQty('');
    setShowRestockModal(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      
      <div>
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm transition cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Global Inventory
        </button>
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm shadow-sm">
          {successMsg}
        </div>
      )}

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        <div className="flex justify-center">
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&auto=format&fit=crop&q=60'} 
            alt={product.id} 
            className="w-56 h-56 object-cover rounded-xl border border-gray-200 shadow-md"
          />
        </div>

        <div className="md:col-span-2 flex flex-col justify-between gap-6">
          <div>
            <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded uppercase tracking-wider">
              SKU Item Profile
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-1">{product.id}</h2>
            <p className="text-2xl font-bold text-green-600 mb-4">{product.qty.toLocaleString()} <span className="text-sm font-normal text-gray-500">Total Units in Central Stock</span></p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-wrap gap-4">
            <button 
              onClick={() => setShowDebitModal(true)}
              className="flex-1 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              Debit to Branch
            </button>

            <button 
              onClick={() => setShowRestockModal(true)}
              className="flex-1 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              Add Stock Quantity
            </button>
          </div>
        </div>

      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Transaction History for {product.id}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-xs text-gray-500 uppercase">
                <th className="px-6 py-3">Action Type</th>
                <th className="px-6 py-3">Quantity Change</th>
                <th className="px-6 py-3">Performed By</th>
                <th className="px-6 py-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {product.history && product.history.length > 0 ? (
                product.history.map((h, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{h.action}</td>
                    <td className={`px-6 py-4 font-bold ${h.qty.startsWith('+') ? 'text-green-600' : 'text-amber-600'}`}>{h.qty}</td>
                    <td className="px-6 py-4 text-gray-600">{h.user}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{h.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                    No recorded transaction history for this item yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDebitModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800">Debit Stock to Branch</h3>
              <button onClick={() => setShowDebitModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleDebitSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Choose Branch</label>
                <select 
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  {branchesList.map((b, i) => <option key={i} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Quantity Amount</label>
                <input 
                  type="number"
                  min="1"
                  placeholder="e.g. 10"
                  value={debitQty}
                  onChange={(e) => setDebitQty(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowDebitModal(false)} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold cursor-pointer">Confirm Debit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRestockModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800">Add Stock to Database</h3>
              <button onClick={() => setShowRestockModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleRestockSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Quantity to Add</label>
                <input 
                  type="number"
                  min="1"
                  placeholder="e.g. 50"
                  value={restockQty}
                  onChange={(e) => setRestockQty(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowRestockModal(false)} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold cursor-pointer">Save to Database</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductInfo;