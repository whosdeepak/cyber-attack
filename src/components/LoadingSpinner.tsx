import React from 'react';
import { Shield } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-6">
          <Shield className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">CyberWatch Pro</h2>
        <p className="text-gray-400">Loading security dashboard...</p>
      </div>
    </div>
  );
};