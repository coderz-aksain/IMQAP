import React, { useState } from 'react';
import { Plus, Filter, Download, Check, X, Search } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import AddLibraryItemModal from '../components/AddLibraryItemModal';

export default function Library() {
  const { libraryItems, updateLibraryItem } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    plant: '',
    category: '',
    approved: '',
    search: '',
  });

  const plants = ['Plant 1', 'Plant 2', 'Plant 3', 'SPD', 'KMC', 'Corporate'];
  const categories = ['Marketing', 'Fabrication', 'Packaging', 'Hardware', 'General Consumables', 'Machinery', 'Tools'];

  const filteredItems = libraryItems.filter(item => {
    return (
      (filters.plant === '' || item.plant === filters.plant) &&
      (filters.category === '' || item.category === filters.category) &&
      (filters.approved === '' || item.approved.toString() === filters.approved) &&
      (filters.search === '' || 
        item.itemDescription.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.supplierName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.grnNo.toLowerCase().includes(filters.search.toLowerCase())
      )
    );
  });

  const handleBulkAction = (action: 'approve' | 'reject') => {
    selectedItems.forEach(id => {
      updateLibraryItem(id, { approved: action === 'approve' });
    });
    setSelectedItems([]);
    // Simulate consolidated email
    console.log(`Consolidated email sent for ${action}ing ${selectedItems.length} items`);
  };

  const handleExport = () => {
    // Simulate export functionality
    console.log('Exporting library data...');
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quality Library</h1>
        
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plant</label>
            <select
              value={filters.plant}
              onChange={(e) => setFilters(prev => ({ ...prev, plant: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Plants</option>
              {plants.map(plant => (
                <option key={plant} value={plant}>{plant}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.approved}
              onChange={(e) => setFilters(prev => ({ ...prev, approved: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="true">Approved</option>
              <option value="false">Rejected</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Search items..."
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-700">
              {selectedItems.length} item(s) selected
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                <Check className="h-4 w-4 mr-1" />
                Bulk Approve
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                <X className="h-4 w-4 mr-1" />
                Bulk Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Library Items Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={(e) => setSelectedItems(e.target.checked ? filteredItems.map(item => item.id) : [])}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GRN No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.itemDescription}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.grnNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.supplierName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.plant}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.grnQuantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ₹{item.itemRate}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.approved ? 'Approved' : 'Rejected'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddLibraryItemModal
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}