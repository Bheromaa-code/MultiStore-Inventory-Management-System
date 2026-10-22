import React from 'react';

function History() {
  const auditLogs = [
    { id: 1, action: "Stock Added", item: "BAG-2024-BLK", qty: "+200", user: "The Boss", time: "Today, 10:30 AM" },
    { id: 2, action: "Sale Approved", item: "WALLET-LTH-01", qty: "-5", user: "The Boss", time: "Yesterday, 2:15 PM" },
    { id: 3, action: "Branch Debit", item: "SHOE-LUX-BRN", qty: "-15", user: "Manager A", time: "May 12, 11:00 AM" },
    { id: 4, action: "Import Logged", item: "BAG-DUFF-NVY", qty: "+100", user: "The Boss", time: "May 10, 9:45 AM" }
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-1">System Audit History</h2>
        <p className="text-sm text-gray-500 mb-6">A complete historical timeline of all stock movements, sales, and branch imports.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs text-gray-500 uppercase">
                <th className="px-4 py-3">Action Type</th>
                <th className="px-4 py-3">Item ID</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Performed By</th>
                <th className="px-4 py-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-blue-600">{log.action}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{log.item}</td>
                  <td className="px-4 py-3 font-bold">{log.qty}</td>
                  <td className="px-4 py-3 text-gray-600">{log.user}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;