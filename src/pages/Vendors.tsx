// import React, { useState } from 'react';
// import { Plus, Search, Star, Calendar } from 'lucide-react';
// import { useData } from '../contexts/DataContext';
// import AddVendorModal from '../components/AddVendorModal';

// export default function Vendors() {
//   const { vendors } = useData();
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [supplyTypeFilter, setSupplyTypeFilter] = useState('');

//   const filteredVendors = vendors.filter(vendor => {
//     const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          vendor.vendorCode.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesSupplyType = supplyTypeFilter === '' || vendor.supplyType === supplyTypeFilter;
    
//     return matchesSearch && matchesSupplyType;
//   });

//   const formatCurrency = (amount: number) => {
//     return `₹${(amount / 100000).toFixed(2)}L`;
//   };

//   const getRatingColor = (rating: number) => {
//     if (rating >= 4.5) return 'text-green-600';
//     if (rating >= 4.0) return 'text-blue-600';
//     if (rating >= 3.5) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         className={`h-4 w-4 ${
//           i < Math.floor(rating)
//             ? 'text-yellow-400 fill-current'
//             : 'text-gray-300'
//         }`}
//       />
//     ));
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
        
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Plus className="h-5 w-5 mr-2" />
//           Add Vendor
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Search Vendors</label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search by vendor name or code..."
//                 className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Vendors Type</label>
//             <select
//               value={supplyTypeFilter}
//               onChange={(e) => setSupplyTypeFilter(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">All Types</option>
//               <option value="regular">Regular</option>
//               <option value="one-time">One-time</option>
//               <option value="Black Listed">Black Listed</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Vendors Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVendors.map((vendor) => (
//           <div key={vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
//                 <p className="text-sm text-gray-500">Code: {vendor.vendorCode}</p>
//               </div>
//               <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                 vendor.supplyType === 'regular'
//                   ? 'bg-green-100 text-green-800'
//                   : 'bg-blue-100 text-blue-800'
//               }`}>
//                 {vendor.supplyType === 'regular' ? 'Regular' : 'One-time'}
//               </span>
//             </div>

//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Annual Sale Value</span>
//                 <span className="text-sm font-medium text-gray-900">
//                   {formatCurrency(vendor.annualSaleValue)}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Quality Check</span>
//                 <span className={`text-sm font-medium ${
//                   vendor.qualityCheckEligible ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {vendor.qualityCheckEligible ? 'Eligible' : 'Not Eligible'}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Last Audit</span>
//                 <div className="flex items-center text-sm text-gray-900">
//                   <Calendar className="h-4 w-4 mr-1" />
//                   {new Date(vendor.lastAuditDate).toLocaleDateString()}
//                 </div>
//               </div>

//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Performance Rating</span>
//                 <div className="flex items-center space-x-2">
//                   <div className="flex">
//                     {renderStars(vendor.performanceRating)}
//                   </div>
//                   <span className={`text-sm font-medium ${getRatingColor(vendor.performanceRating)}`}>
//                     {vendor.performanceRating.toFixed(1)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <div className="flex space-x-2">
//                 <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
//                   View Details
//                 </button>
//                 <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
//                   Edit
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredVendors.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No vendors found matching your criteria.</p>
//         </div>
//       )}

//       {showAddModal && (
//         <AddVendorModal
//           onClose={() => setShowAddModal(false)}
//         />
//       )}
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Plus, Search, Star, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import AddVendorModal from '../components/AddVendorModal';

export default function Vendors() {
  const { vendors } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [supplyTypeFilter, setSupplyTypeFilter] = useState('');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.vendorCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSupplyType = supplyTypeFilter === '' || 
                             vendor.supplyType.toLowerCase() === supplyTypeFilter.toLowerCase();
    
    return matchesSearch && matchesSupplyType;
  });

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)}L`;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Vendor
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Vendors</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by vendor name or code..."
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vendors Type</label>
            <select
              value={supplyTypeFilter}
              onChange={(e) => setSupplyTypeFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="regular">Regular</option>
              <option value="one-time">One-time</option>
              <option value="Black Listed">Black Listed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                <p className="text-sm text-gray-500">Code: {vendor.vendorCode}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  vendor.supplyType.toLowerCase() === 'regular'
                    ? 'bg-green-100 text-green-800'
                    : vendor.supplyType.toLowerCase() === 'one-time'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {vendor.supplyType}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Annual Sale Value</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(vendor.annualSaleValue)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quality Check</span>
                <span className={`text-sm font-medium ${
                  vendor.qualityCheckEligible ? 'text-green-600' : 'text-red-600'
                }`}>
                  {vendor.qualityCheckEligible ? 'Eligible' : 'Not Eligible'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Audit</span>
                <div className="flex items-center text-sm text-gray-900">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(vendor.lastAuditDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Performance Rating</span>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {renderStars(vendor.performanceRating)}
                  </div>
                  <span className={`text-sm font-medium ${getRatingColor(vendor.performanceRating)}`}>
                    {vendor.performanceRating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No vendors found matching your criteria.</p>
        </div>
      )}

      {showAddModal && (
        <AddVendorModal
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}