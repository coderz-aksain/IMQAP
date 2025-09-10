import React, { useState } from 'react';
import { X, Upload, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

interface AddLibraryItemModalProps {
  onClose: () => void;
}

const plants = ['Plant 1', 'Plant 2', 'Plant 3', 'SPD', 'KMC', 'Corporate'];
const categories = ['Marketing', 'Fabrication', 'Packaging', 'Hardware', 'General Consumables', 'Machinery', 'Tools'];
const inspectionMethods = ['Visual', 'Measurement', 'Lab'];

export default function AddLibraryItemModal({ onClose }: AddLibraryItemModalProps) {
  const { addLibraryItem, vendors } = useData();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    itemDescription: '',
    grnNo: '',
    grnDate: '',
    supplierName: '',
    poNo: '',
    grnQuantity: 0,
    itemRate: 0,
    itemCode: '',
    vendorCode: '',
    plant: '',
    category: '',
    regularSupply: true,
    physicalSample: false,
    repeatInspection: false,
    repeatDate: '',
    technicalSpecs: '',
    inspectionMethod: '',
    outcome: '',
    remarks: '',
    approved: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedVendor = vendors.find(v => v.name === formData.supplierName);
    
    addLibraryItem({
      ...formData,
      vendorCode: selectedVendor?.vendorCode || '',
      userName: user?.name || '',
      createdDate: new Date().toISOString().split('T')[0],
    });

    onClose();
  };

  const handleSupplierChange = (supplierName: string) => {
    const vendor = vendors.find(v => v.name === supplierName);
    setFormData(prev => ({
      ...prev,
      supplierName,
      vendorCode: vendor?.vendorCode || '',
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Library Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Description *
              </label>
              <input
                type="text"
                value={formData.itemDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, itemDescription: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GRN No *
              </label>
              <input
                type="text"
                value={formData.grnNo}
                onChange={(e) => setFormData(prev => ({ ...prev, grnNo: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GRN Date *
              </label>
              <input
                type="date"
                value={formData.grnDate}
                onChange={(e) => setFormData(prev => ({ ...prev, grnDate: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier Name *
              </label>
              <select
                value={formData.supplierName}
                onChange={(e) => handleSupplierChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Supplier</option>
                {vendors.map(vendor => (
                  <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PO No *
              </label>
              <input
                type="text"
                value={formData.poNo}
                onChange={(e) => setFormData(prev => ({ ...prev, poNo: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GRN Quantity *
              </label>
              <input
                type="number"
                value={formData.grnQuantity}
                onChange={(e) => setFormData(prev => ({ ...prev, grnQuantity: parseInt(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Rate *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.itemRate}
                onChange={(e) => setFormData(prev => ({ ...prev, itemRate: parseFloat(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Code *
              </label>
              <input
                type="text"
                value={formData.itemCode}
                onChange={(e) => setFormData(prev => ({ ...prev, itemCode: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Code
              </label>
              <input
                type="text"
                value={formData.vendorCode}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plant *
              </label>
              <select
                value={formData.plant}
                onChange={(e) => setFormData(prev => ({ ...prev, plant: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Plant</option>
                {plants.map(plant => (
                  <option key={plant} value={plant}>{plant}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Flags Section */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Flags & Settings</h3>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.regularSupply}
                  onChange={(e) => setFormData(prev => ({ ...prev, regularSupply: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Regular Supply</span>
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.physicalSample}
                  onChange={(e) => setFormData(prev => ({ ...prev, physicalSample: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Physical Sample</span>
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.repeatInspection}
                  onChange={(e) => setFormData(prev => ({ ...prev, repeatInspection: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Repeat Inspection</span>
              </label>
            </div>

            {formData.repeatInspection && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repeat Date
                </label>
                <input
                  type="date"
                  value={formData.repeatDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, repeatDate: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Quality Information */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Quality Information</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Specs
              </label>
              <textarea
                value={formData.technicalSpecs}
                onChange={(e) => setFormData(prev => ({ ...prev, technicalSpecs: e.target.value }))}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inspection Method *
              </label>
              <select
                value={formData.inspectionMethod}
                onChange={(e) => setFormData(prev => ({ ...prev, inspectionMethod: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Method</option>
                {inspectionMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Outcome
              </label>
              <input
                type="text"
                value={formData.outcome}
                onChange={(e) => setFormData(prev => ({ ...prev, outcome: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Passed, Failed, etc."
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.approved}
                  onChange={(e) => setFormData(prev => ({ ...prev, approved: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Approved</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}