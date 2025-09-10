import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, CheckCircle, XCircle, FileText, DollarSign } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function Dashboard() {
  const { libraryItems, vendors } = useData();

  const totalItems = libraryItems.length;
  const approvedItems = libraryItems.filter(item => item.approved).length;
  const rejectedItems = totalItems - approvedItems;
  const totalVendors = vendors.length;
  const totalSpend = libraryItems.reduce((sum, item) => sum + (item.grnQuantity * item.itemRate), 0);

  const plantData = [
    { name: 'Plant 1', items: 15, approved: 12, rejected: 3 },
    { name: 'Plant 2', items: 8, approved: 7, rejected: 1 },
    { name: 'Plant 3', items: 12, approved: 10, rejected: 2 },
    { name: 'SPD', items: 6, approved: 5, rejected: 1 },
    { name: 'KMC', items: 4, approved: 3, rejected: 1 },
  ];

  const categoryData = [
    { name: 'Fabrication', value: 35, color: '#3B82F6' },
    { name: 'Packaging', value: 25, color: '#10B981' },
    { name: 'Hardware', value: 20, color: '#F59E0B' },
    { name: 'General', value: 12, color: '#EF4444' },
    { name: 'Others', value: 8, color: '#8B5CF6' },
  ];

  const StatCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Items Validated"
          value={totalItems}
          icon={FileText}
          color="bg-blue-500"
          subtitle="This month"
        />
        <StatCard
          title="Approved Items"
          value={approvedItems}
          icon={CheckCircle}
          color="bg-green-500"
          subtitle={`${((approvedItems / totalItems) * 100).toFixed(1)}% approval rate`}
        />
        <StatCard
          title="Rejected Items"
          value={rejectedItems}
          icon={XCircle}
          color="bg-red-500"
          subtitle={`${((rejectedItems / totalItems) * 100).toFixed(1)}% rejection rate`}
        />
        <StatCard
          title="Active Vendors"
          value={totalVendors}
          icon={Users}
          color="bg-purple-500"
          subtitle="Registered suppliers"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plant-wise Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Plant-wise Validation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={plantData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="approved" fill="#10B981" name="Approved" />
              <Bar dataKey="rejected" fill="#EF4444" name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spend Audited</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(totalSpend / 100000).toFixed(2)}L
              </p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-full">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Processing Time</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">2.4 days</p>
              <p className="text-sm text-green-600 mt-1">-0.6 days improvement</p>
            </div>
            <div className="p-3 bg-indigo-500 rounded-full">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Quality Score</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">94.2%</p>
              <p className="text-sm text-green-600 mt-1">+2.1% this quarter</p>
            </div>
            <div className="p-3 bg-emerald-500 rounded-full">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}