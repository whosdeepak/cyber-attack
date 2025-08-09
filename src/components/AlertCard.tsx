import React from 'react';
import { AlertTriangle, Shield, Users, Database } from 'lucide-react';
import { format } from 'date-fns';

export interface Alert {
  id: string;
  type: 'security' | 'user' | 'data';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  source: string;
}

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const severityColors = {
    low: 'border-l-blue-400 bg-blue-900/20',
    medium: 'border-l-yellow-400 bg-yellow-900/20',
    high: 'border-l-orange-400 bg-orange-900/20',
    critical: 'border-l-red-400 bg-red-900/20'
  };

  const typeIcons = {
    security: Shield,
    user: Users,
    data: Database
  };

  const Icon = typeIcons[alert.type];

  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${severityColors[alert.severity]}`}>
      <div className="flex items-start space-x-3">
        <Icon size={20} className="text-gray-300 mt-1" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium">{alert.title}</h4>
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {alert.severity}
            </span>
          </div>
          <p className="text-gray-300 text-sm mt-1">{alert.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400">{alert.source}</span>
            <span className="text-xs text-gray-400">
              {format(alert.timestamp, 'HH:mm:ss')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};