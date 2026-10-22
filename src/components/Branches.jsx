import React, { useState } from 'react';

function Branches() {
  // Initial onboarded branches matching your system state
  const [branches, setBranches] = useState([

  ]);

  const [showModal, setShowModal] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchLocation, setNewBranchLocation] = useState('');
  const [newBranchManager, setNewBranchManager] = useState('');

  const handleAddBranch = (e) => {
    e.preventDefault();
    if (!newBranchName || !newBranchLocation) return;

    const newId = `BR${branches.length + 1}`;
    const newBranch = {
      id: newId,
      name: newBranchName,
      location: newBranchLocation,
      manager: newBranchManager || 'Unassigned',
      status: 'Active'
    };

    setBranches([...branches, newBranch]);
    setNewBranchName('');
    setNewBranchLocation('');
    setNewBranchManager('');
    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      
      {/* Header and Add Branch Action */}
      <span className='grid grid-col gap-1 mt-5'>
        <h2 className="text-3xl uppercase font-extrabold text-gray-800">Branch Management</h2>
        <p className="text-sm text-gray-500 mt-2">Manage all active branches and assign branch managers.</p>
      </span>
     
    <button 
        onClick={() => setShowModal(true)}
        className="flex justify-center w-[50%] mx-auto py-4 bg-green-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition flex items-center gap-2 text-sm"
    >
        <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Onboard a Branch
    </button>

      {/* Dynamic Branch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 bg-gray-100 text-green-700 text-xs font-bold rounded uppercase tracking-wider">
                  {branch.id}
                </span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> {branch.status}
                </span>
              </div>
              <h3 className="text-xl font-extrabold uppercase text-gray-900 mt-6 mb-1">{branch.name}</h3>
              <p className="flex justify-center text-sm text-gray-500 flex items-center gap-1.5 mb-4">
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {branch.location}
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-4">
              <div className="text-xs text-gray-500">
                <span className="font-bold uppercase text-gray-800">{branch.manager}</span>
              </div>
              <button className="text-xs font-semibold text-green-600 hover:text-blue-800 transition">
                Portal View &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Onboard Branch Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-extrabold uppercase text-gray-900">Onboard New Branch</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddBranch} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Branch / Store Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Funmi Branch" 
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-3000 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Physical Location</label>
                <input 
                  type="text" 
                  placeholder="e.g., 6, Ike Ekweremmadu plaza" 
                  value={newBranchLocation}
                  onChange={(e) => setNewBranchLocation(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Branch Manager</label>
                <input 
                  type="text" 
                  placeholder="e.g., Funmi" 
                  value={newBranchManager}
                  onChange={(e) => setNewBranchManager(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-md transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 bg-green-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition shadow-sm"
                >
                  Save & Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Branches;