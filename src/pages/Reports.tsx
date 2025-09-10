import React, { useState } from 'react';
import { Download, Filter, Calendar, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useData } from '../contexts/DataContext';

export default function Reports() {
  const { libraryItems, vendors } = useData();
  const [filters, setFilters] = useState({
    plant: '',
    dateFrom: '',
    dateTo: '',
    vendor: '',
    category: '',
  });

  const plants = ['Plant 1', 'Plant 2', 'Plant 3', 'SPD', 'KMC', 'Corporate'];
  const categories = ['Marketing', 'Fabrication', 'Packaging', 'Hardware', 'General Consumables', 'Machinery', 'Tools'];

  // Filter library items based on selected filters
  const filteredItems = libraryItems.filter(item => {
    const itemDate = new Date(item.createdDate);
    const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

    return (
      (filters.plant === '' || item.plant === filters.plant) &&
      (filters.vendor === '' || item.supplierName === filters.vendor) &&
      (filters.category === '' || item.category === filters.category) &&
      (!fromDate || itemDate >= fromDate) &&
      (!toDate || itemDate <= toDate)
    );
  });

  // Generate report data
  const reportData = {
    totalItems: filteredItems.length,
    approvedItems: filteredItems.filter(item => item.approved).length,
    rejectedItems: filteredItems.filter(item => !item.approved).length,
    totalValue: filteredItems.reduce((sum, item) => sum + (item.grnQuantity * item.itemRate), 0),
  };

  const plantWiseData = plants.map(plant => {
    const plantItems = filteredItems.filter(item => item.plant === plant);
    return {
      plant,
      total: plantItems.length,
      approved: plantItems.filter(item => item.approved).length,
      rejected: plantItems.filter(item => !item.approved).length,
      value: plantItems.reduce((sum, item) => sum + (item.grnQuantity * item.itemRate), 0),
    };
  }).filter(data => data.total > 0);

  const categoryWiseData = categories.map(category => {
    const categoryItems = filteredItems.filter(item => item.category === category);
    return {
      category,
      total: categoryItems.length,
      approved: categoryItems.filter(item => item.approved).length,
      rejected: categoryItems.filter(item => !item.approved).length,
    };
  }).filter(data => data.total > 0);

  const timelineData = [
    { month: 'Jan', approved: 12, rejected: 3, total: 15 },
    { month: 'Feb', approved: 18, rejected: 2, total: 20 },
    { month: 'Mar', approved: 16, rejected: 4, total: 20 },
    { month: 'Apr', approved: 22, rejected: 3, total: 25 },
    { month: 'May', approved: 19, rejected: 1, total: 20 },
    { month: 'Jun', approved: 25, rejected: 5, total: 30 },
  ];

  const handleExport = (format: 'excel' | 'pdf') => {
    // Simulate export functionality
    console.log(`Exporting report as ${format.toUpperCase()}...`);
    alert(`Report exported as ${format.toUpperCase()} successfully!`);
  };

  const clearFilters = () => {
    setFilters({
      plant: '',
      dateFrom: '',
      dateTo: '',
      vendor: '',
      category: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quality Reports</h1>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handleExport('excel')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Export Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900">Report Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
            <select
              value={filters.vendor}
              onChange={(e) => setFilters(prev => ({ ...prev, vendor: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Vendors</option>
              {vendors.map(vendor => (
                <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
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
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{reportData.totalItems}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{reportData.approvedItems}</p>
              <p className="text-sm text-gray-500">
                {reportData.totalItems > 0 ? ((reportData.approvedItems / reportData.totalItems) * 100).toFixed(1) : 0}% rate
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{reportData.rejectedItems}</p>
              <p className="text-sm text-gray-500">
                {reportData.totalItems > 0 ? ((reportData.rejectedItems / reportData.totalItems) * 100).toFixed(1) : 0}% rate
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                ₹{(reportData.totalValue / 100000).toFixed(2)}L
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plant-wise Report */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Plant-wise Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={plantWiseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plant" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, name === 'approved' ? 'Approved' : name === 'rejected' ? 'Rejected' : 'Total']}
              />
              <Bar dataKey="approved" fill="#10B981" name="approved" />
              <Bar dataKey="rejected" fill="#EF4444" name="rejected" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="approved" stroke="#10B981" name="Approved" strokeWidth={3} />
              <Line type="monotone" dataKey="rejected" stroke="#EF4444" name="Rejected" strokeWidth={3} />
              <Line type="monotone" dataKey="total" stroke="#3B82F6" name="Total" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category-wise Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category-wise Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryWiseData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="approved" fill="#10B981" name="Approved" />
            <Bar dataKey="rejected" fill="#EF4444" name="Rejected" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Table */}
      {filteredItems.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Report</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.slice(0, 10).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.itemDescription}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.grnNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.supplierName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.plant}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ₹{(item.grnQuantity * item.itemRate).toLocaleString()}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredItems.length > 10 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing 10 of {filteredItems.length} items. Export for complete data.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}