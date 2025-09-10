import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, FileText, Database, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, roles: ['finance', 'procurement', 'seven-procure'] },
    { name: 'Requests', href: '/requests', icon: FileText, roles: ['finance', 'procurement', 'seven-procure'] },
    { name: 'Library', href: '/library', icon: Database, roles: ['seven-procure'] },
    { name: 'Vendors', href: '/vendors', icon: Users, roles: ['finance', 'procurement', 'seven-procure'] },
    { name: 'Reports', href: '/reports', icon: TrendingUp, roles: ['finance', 'procurement', 'seven-procure'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="bg-white w-64 shadow-sm border-r border-gray-200">
      <div className="p-6">
        <div className="text-xl font-bold text-blue-600">IMQAP Portal</div>
        <div className="text-sm text-gray-500 mt-1">Quality Management</div>
      </div>
      
      <nav className="mt-6">
        {filteredNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}