import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface AddVendorModalProps {
  onClose: () => void;
}

export default function AddVendorModal({ onClose }: AddVendorModalProps) {
  const { addVendor } = useData();
  
  const [formData, setFormData] = useState({
    vendorCode: '',
    name: '',
    supplyType: 'regular' as 'regular' | 'one-time',
    annualSaleValue: 0,
    qualityCheckEligible: true,
    lastAuditDate: '',
    performanceRating: 4.0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addVendor(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Vendor</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vendor Code *
            </label>
            <input
              type="text"
              value={formData.vendorCode}
              onChange={(e) => setFormData(prev => ({ ...prev, vendorCode: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="e.g., V003"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vendor Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="Enter vendor name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supply Type *
            </label>
            <select
              value={formData.supplyType}
              onChange={(e) => setFormData(prev => ({ ...prev, supplyType: e.target.value as 'regular' | 'one-time' }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="regular">Regular</option>
              <option value="one-time">One-time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Sale Value (₹) *
            </label>
            <input
              type="number"
              value={formData.annualSaleValue}
              onChange={(e) => setFormData(prev => ({ ...prev, annualSaleValue: parseInt(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="0"
              placeholder="Enter annual sale value"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Audit Date
            </label>
            <input
              type="date"
              value={formData.lastAuditDate}
              onChange={(e) => setFormData(prev => ({ ...prev, lastAuditDate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Performance Rating (1-5) *
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={formData.performanceRating}
              onChange={(e) => setFormData(prev => ({ ...prev, performanceRating: parseFloat(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="qualityCheckEligible"
              checked={formData.qualityCheckEligible}
              onChange={(e) => setFormData(prev => ({ ...prev, qualityCheckEligible: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="qualityCheckEligible" className="ml-2 text-sm text-gray-700">
              Quality Check Eligible
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
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
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}