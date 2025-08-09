import React from 'react';
import { User, MapPin, Clock, AlertTriangle, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { HackerProfile } from '../types/cyberAttack';

interface HackerProfileCardProps {
  hacker: HackerProfile;
}

export const HackerProfileCard: React.FC<HackerProfileCardProps> = ({ hacker }) => {
  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'border-red-500 bg-red-900/20 text-red-300';
      case 'high': return 'border-orange-500 bg-orange-900/20 text-orange-300';
      case 'medium': return 'border-yellow-500 bg-yellow-900/20 text-yellow-300';
      default: return 'border-blue-500 bg-blue-900/20 text-blue-300';
    }
  };

  const getThreatIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle size={16} className="text-red-400" />;
      case 'high': return <AlertTriangle size={16} className="text-orange-400" />;
      case 'medium': return <Shield size={16} className="text-yellow-400" />;
      default: return <Shield size={16} className="text-blue-400" />;
    }
  };

  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${getThreatLevelColor(hacker.threatLevel)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <User size={18} className="text-gray-300" />
          </div>
          <div>
            <h4 className="text-white font-medium">{hacker.hackerID}</h4>
            <p className="text-gray-400 text-sm font-mono">{hacker.sourceIP}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getThreatIcon(hacker.threatLevel)}
          <span className="text-xs uppercase font-bold">
            {hacker.threatLevel}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin size={14} />
            <span>Origin</span>
          </div>
          <span className="text-gray-300">{hacker.country} ({hacker.continent})</span>
        </div>

        {hacker.asn && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield size={14} />
              <span>ASN</span>
            </div>
            <span className="text-gray-300 font-mono text-xs">{hacker.asn}</span>
          </div>
        )}

        {hacker.asName && (
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 text-xs">Network Provider:</span>
            <span className="text-gray-300 text-xs">{hacker.asName}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <AlertTriangle size={14} />
            <span>Attempts</span>
          </div>
          <span className="text-red-400 font-semibold">{hacker.totalAttempts.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock size={14} />
            <span>Last Seen</span>
          </div>
          <span className="text-gray-300">{format(hacker.lastSeen, 'HH:mm:ss')}</span>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-gray-400 text-xs mb-2">Attack Types:</p>
        <div className="flex flex-wrap gap-1">
          {hacker.attackTypes.map((type) => (
            <span 
              key={type} 
              className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};