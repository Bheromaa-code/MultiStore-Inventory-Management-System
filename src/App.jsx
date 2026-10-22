import React, { useState, useEffect } from 'react';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/AdminSidebar';
import Dashboard from './components/Dashboard';
import Branches from './components/Branches';
import GlobalInventory from './components/GlobalInventory';
import ProductInfo from './components/ProductInfo';
import AddStock from './components/AddStock';
import History from './components/History';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [inventoryList, setInventoryList] = useState([
    { 
      id: 'BAG-2024-BLK', 
      qty: 450, 
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&auto=format&fit=crop&q=60',
      history: [{ action: 'Initial Stock', qty: '+450', user: 'The Boss', time: '10:00 AM' }]
    },
    { 
      id: 'WALLET-LTH-01', 
      qty: 185, 
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&auto=format&fit=crop&q=60',
      history: [{ action: 'Initial Stock', qty: '+185', user: 'The Boss', time: '11:30 AM' }]
    },
    { 
      id: 'BAG-LUX-RED', 
      qty: 20, 
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&auto=format&fit=crop&q=60',
      history: [{ action: 'Initial Stock', qty: '+20', user: 'The Boss', time: '09:15 AM' }]
    }
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeMobileSidebar = () => { if (window.innerWidth < 768) setIsSidebarOpen(false); };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setActivePage('product-info');
  };

  const updateProductStock = (productId, newQty, historyEntry) => {
    const updated = inventoryList.map(item => {
      if (item.id === productId) {
        const updatedItem = {
          ...item,
          qty: newQty,
          history: [historyEntry, ...(item.history || [])]
        };
        setSelectedProduct(updatedItem);
        return updatedItem;
      }
      return item;
    });
    setInventoryList(updated);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <AdminHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {isSidebarOpen && (
          <div className="absolute inset-0 z-40 md:relative md:w-auto h-full flex-shrink-0 bg-slate-900">
            <AdminSidebar setActivePage={setActivePage} closeMobileSidebar={closeMobileSidebar} />
          </div>
        )}
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activePage === 'dashboard' && <Dashboard setActivePage={setActivePage} onSelectProduct={handleSelectProduct} inventoryList={inventoryList} />}
          {activePage === 'branches' && <Branches />}
          {activePage === 'inventory' && <GlobalInventory inventoryList={inventoryList} setInventoryList={setInventoryList} onSelectProduct={handleSelectProduct} setActivePage={setActivePage} />}
          {activePage === 'product-info' && <ProductInfo product={selectedProduct} onBack={() => setActivePage('inventory')} updateProductStock={updateProductStock} />}
          {activePage === 'add-stock' && <AddStock inventoryList={inventoryList} setInventoryList={setInventoryList} onSelectProduct={handleSelectProduct} openWithForm={false} />}
          {activePage === 'add-stock-open' && <AddStock inventoryList={inventoryList} setInventoryList={setInventoryList} onSelectProduct={handleSelectProduct} openWithForm={true} />}
          {activePage === 'history' && <History />}
        </main>
      </div>
    </div>
  );
}

export default App;