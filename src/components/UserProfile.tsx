import React, { useState } from 'react';
import { User, LogOut, Shield, Settings, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'admin' 
      ? 'bg-red-900/50 text-red-300 border-red-500' 
      : 'bg-blue-900/50 text-blue-300 border-blue-500';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
        <div className="text-left hidden md:block">
          <p className="text-sm font-medium text-white">{user.displayName}</p>
          <p className="text-xs text-gray-400">{user.role}</p>
        </div>
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">{user.displayName}</h3>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded text-xs border ${getRoleBadgeColor(user.role)}`}>
                {user.role.toUpperCase()}
              </span>
              {user.role === 'admin' && (
                <div className="flex items-center text-xs text-yellow-400">
                  <Shield size={12} className="mr-1" />
                  Full Access
                </div>
              )}
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center text-sm text-gray-300">
              <Clock size={14} className="mr-2 text-gray-400" />
              Last login: {user.lastLogin ? format(user.lastLogin, 'MMM dd, HH:mm') : 'Unknown'}
            </div>
            
            {user.department && (
              <div className="flex items-center text-sm text-gray-300">
                <Settings size={14} className="mr-2 text-gray-400" />
                Department: {user.department}
              </div>
            )}
          </div>

          <div className="border-t border-gray-700 p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};