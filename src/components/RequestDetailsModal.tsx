import React, { useState } from 'react';
import { X, FileText, MessageCircle, CheckCircle, Clock } from 'lucide-react';

interface RequestDetailsModalProps {
  request: any;
  onClose: () => void;
  onStatusUpdate: (requestId: string, status: string, comments?: string) => void;
  isAdmin: boolean;
}

export default function RequestDetailsModal({ 
  request, 
  onClose, 
  onStatusUpdate, 
  isAdmin 
}: RequestDetailsModalProps) {
  const [comments, setComments] = useState('');
  const [status, setStatus] = useState(request.status);

  const handleStatusUpdate = () => {
    if (status !== request.status) {
      onStatusUpdate(request.id, status, comments);
      onClose();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Request Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Request Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Request ID</label>
              <p className="text-sm text-gray-900 mt-1">#{request.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(request.status)}`}>
                {request.status.replace('-', ' ')}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Requester</label>
              <p className="text-sm text-gray-900 mt-1">{request.requester}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Plant</label>
              <p className="text-sm text-gray-900 mt-1">{request.plant}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Submission Date</label>
              <p className="text-sm text-gray-900 mt-1">
                {new Date(request.submissionDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">File</label>
              {request.fileName && (
                <div className="flex items-center text-sm text-blue-600 mt-1">
                  <FileText className="h-4 w-4 mr-1" />
                  {request.fileName}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Remarks</label>
            <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
              {request.remarks || 'No remarks provided'}
            </p>
          </div>

          {request.spComments && (
            <div>
              <label className="block text-sm font-medium text-gray-700">SP Team Comments</label>
              <p className="text-sm text-gray-900 mt-1 p-3 bg-blue-50 rounded-lg">
                {request.spComments}
              </p>
            </div>
          )}

          {/* Admin Actions */}
          {isAdmin && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Actions</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Comments
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add your comments..."
                  />
                </div>

                <button
                  onClick={handleStatusUpdate}
                  disabled={status === request.status && !comments}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}