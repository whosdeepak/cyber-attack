import React from 'react';
import { AlertTriangle, Mail, Bell, FileText, CheckCircle } from 'lucide-react';

interface AlertSystemProps {
  isHighAlert: boolean;
  currentAttacks: number;
  threshold: number;
}

export const AlertSystem: React.FC<AlertSystemProps> = ({ 
  isHighAlert, 
  currentAttacks, 
  threshold 
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Bell size={20} className="text-yellow-400" />
          Alert System
        </h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
          isHighAlert 
            ? 'bg-red-900/50 text-red-300 border border-red-500' 
            : 'bg-green-900/50 text-green-300 border border-green-500'
        }`}>
          {isHighAlert ? (
            <>
              <AlertTriangle size={12} />
              <span>HIGH ALERT</span>
            </>
          ) : (
            <>
              <CheckCircle size={12} />
              <span>NORMAL</span>
            </>
          )}
        </div>
      </div>

      {/* Alert Status */}
      <div className={`p-4 rounded-lg border-l-4 mb-6 ${
        isHighAlert 
          ? 'border-red-500 bg-red-900/20' 
          : 'border-green-500 bg-green-900/20'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h4 className={`font-medium ${isHighAlert ? 'text-red-300' : 'text-green-300'}`}>
            {isHighAlert ? '🚨 Attack Threshold Exceeded!' : '✅ System Operating Normally'}
          </h4>
          <span className={`text-sm ${isHighAlert ? 'text-red-400' : 'text-green-400'}`}>
            {currentAttacks}/{threshold} attacks/hour
          </span>
        </div>
        <p className={`text-sm ${isHighAlert ? 'text-red-200' : 'text-green-200'}`}>
          {isHighAlert 
            ? 'Automated security measures activated. Notifications sent to security team.'
            : 'All security metrics within normal parameters. Continuous monitoring active.'
          }
        </p>
      </div>

      {/* Notification Channels */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Notification Channels</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Mail size={18} className="text-blue-400" />
              <span className="text-white font-medium">Email Alerts</span>
            </div>
            <p className="text-gray-400 text-xs mb-2">security@company.com</p>
            <div className={`flex items-center gap-1 text-xs ${
              isHighAlert ? 'text-green-400' : 'text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isHighAlert ? 'bg-green-400' : 'bg-gray-500'
              }`}></div>
              <span>{isHighAlert ? 'Sent' : 'Standby'}</span>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Bell size={18} className="text-green-400" />
              <span className="text-white font-medium">WhatsApp</span>
            </div>
            <p className="text-gray-400 text-xs mb-2">+1 (555) 123-4567</p>
            <div className={`flex items-center gap-1 text-xs ${
              isHighAlert ? 'text-green-400' : 'text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isHighAlert ? 'bg-green-400' : 'bg-gray-500'
              }`}></div>
              <span>{isHighAlert ? 'Sent' : 'Standby'}</span>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={18} className="text-purple-400" />
              <span className="text-white font-medium">PDF Reports</span>
            </div>
            <p className="text-gray-400 text-xs mb-2">Daily at 09:00 AM</p>
            <div className="flex items-center gap-1 text-xs text-blue-400">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span>Scheduled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Configuration */}
      <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
        <h5 className="text-white font-medium mb-3">Alert Configuration</h5>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Attack Threshold:</span>
            <span className="text-white">{threshold} attacks/hour</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email Notifications:</span>
            <span className="text-green-400">Enabled</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Auto-blocking:</span>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Report Generation:</span>
            <span className="text-blue-400">Daily</span>
          </div>
        </div>
      </div>
    </div>
  );
};