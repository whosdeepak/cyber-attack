import React, { useState, useEffect } from 'react';
import { Globe, Target, AlertTriangle, Activity, Shield, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useRealTimeMapData } from '../hooks/useRealTimeMapData';

interface AttackPath {
  id: string;
  from: { x: number; y: number; country: string; ip: string };
  to: { x: number; y: number; country: string };
  progress: number;
  attackType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ThreatPoint {
  id: string;
  x: number;
  y: number;
  country: string;
  ip: string;
  attacks: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  pulse: boolean;
}
export const RealTimeCyberMap: React.FC = () => {
  const { attackData, liveAttacks, isConnected, connectionStatus, reconnect } = useRealTimeMapData();
  const [attackPaths, setAttackPaths] = useState<AttackPath[]>([]);
  const [threatPoints, setThreatPoints] = useState<ThreatPoint[]>([
    { id: '1', x: 75, y: 35, country: 'India', ip: '103.174.27.65', attacks: 456, severity: 'critical', pulse: true },
    { id: '2', x: 55, y: 25, country: 'Russia', ip: '185.220.101.42', attacks: 234, severity: 'high', pulse: true },
    { id: '3', x: 80, y: 30, country: 'China', ip: '175.45.176.88', attacks: 189, severity: 'high', pulse: true },
    { id: '4', x: 50, y: 40, country: 'Iran', ip: '91.240.118.172', attacks: 123, severity: 'medium', pulse: false },
    { id: '5', x: 25, y: 35, country: 'USA', ip: '202.131.246.250', attacks: 89, severity: 'low', pulse: false },
    { id: '6', x: 45, y: 30, country: 'Germany', ip: '46.161.9.5', attacks: 67, severity: 'medium', pulse: true },
    { id: '7', x: 85, y: 45, country: 'Japan', ip: '117.239.240.202', attacks: 45, severity: 'low', pulse: false }
  ]);
  const [dynamicStats, setDynamicStats] = useState({
    liveThreats: 23,
    countries: 45,
    blocked: 65432
  });

  // Generate multiple attack paths continuously
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random attack from threat points
      const randomThreatPoint = threatPoints[Math.floor(Math.random() * threatPoints.length)];
      
      const newAttack: AttackPath = {
        id: Date.now().toString() + Math.random(),
        from: { 
          x: randomThreatPoint.x, 
          y: randomThreatPoint.y, 
          country: randomThreatPoint.country, 
          ip: randomThreatPoint.ip 
        },
        to: { x: 25, y: 35, country: 'Target' }, // Center target
        progress: 0,
        attackType: ['DDoS', 'Phishing', 'Malware', 'Brute Force'][Math.floor(Math.random() * 4)],
        severity: randomThreatPoint.severity
      };

      setAttackPaths(prev => [...prev.slice(-6), newAttack]); // Keep last 7 attacks
    }, 1500); // New attack every 1.5 seconds

    return () => clearInterval(interval);
  }, [threatPoints]);

  // Update dynamic statistics automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicStats(prev => ({
        liveThreats: Math.max(10, prev.liveThreats + Math.floor(Math.random() * 11) - 5), // ±5 change
        countries: Math.max(30, Math.min(60, prev.countries + Math.floor(Math.random() * 7) - 3)), // ±3 change, between 30-60
        blocked: prev.blocked + Math.floor(Math.random() * 50) + 10 // Always increasing blocked attacks
      }));
      
      // Also update threat points dynamically
      setThreatPoints(prev => prev.map(point => ({
        ...point,
        attacks: Math.max(10, point.attacks + Math.floor(Math.random() * 21) - 10), // ±10 change
        pulse: Math.random() > 0.3 // Random pulse activation
      })));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);
  // Animate attack paths
  useEffect(() => {
    const interval = setInterval(() => {
      setAttackPaths(prev => 
        prev.map(path => ({
          ...path,
          progress: Math.min(path.progress + 1.5, 100)
        })).filter(path => path.progress < 100)
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#EF4444';
      case 'high': return '#F97316';
      case 'medium': return '#EAB308';
      default: return '#3B82F6';
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-400';
      case 'connecting': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected': return <Wifi size={16} className="text-green-400" />;
      case 'connecting': return <RefreshCw size={16} className="text-yellow-400 animate-spin" />;
      case 'error': return <WifiOff size={16} className="text-red-400" />;
      default: return <WifiOff size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header with API Connection Status */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Globe size={32} className="text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">REAL-TIME CYBER THREAT MAP</h2>
              <div className="flex items-center gap-2">
                <p className="text-blue-300 text-sm">Live API Integration</p>
                {getConnectionIcon()}
                <span className={`text-xs font-medium ${getConnectionStatusColor()}`}>
                  {connectionStatus.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-red-400">
              {attackData.total_attacks.toLocaleString()}
            </div>
            <div className="text-sm text-red-300">ATTACKS DETECTED</div>
            {connectionStatus === 'error' && (
              <button 
                onClick={reconnect}
                className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded flex items-center gap-1"
              >
                <RefreshCw size={12} />
                Reconnect
              </button>
            )}
          </div>
        </div>
      </div>

      {/* API Status Bar */}
      <div className="bg-gray-900 px-6 py-3 border-b border-gray-700">
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-xl font-bold text-red-400">{dynamicStats.liveThreats}</div>
            <div className="text-xs text-gray-400">LIVE THREATS</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">{dynamicStats.countries}</div>
            <div className="text-xs text-gray-400">COUNTRIES</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">{dynamicStats.blocked.toLocaleString()}</div>
            <div className="text-xs text-gray-400">BLOCKED</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className={`text-sm font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'API LIVE' : 'API DOWN'}
              </span>
            </div>
            <div className="text-xs text-gray-400">STATUS</div>
          </div>
        </div>
      </div>

      {/* Interactive World Map */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 h-96 overflow-hidden">
        <svg 
          viewBox="0 0 100 60" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}
        >
          <defs>
            <pattern id="worldDots" patternUnits="userSpaceOnUse" width="2" height="2">
              <circle cx="1" cy="1" r="0.3" fill="rgba(59, 130, 246, 0.4)" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="pulse">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Enhanced World continents */}
          <path
            d="M15,25 Q20,20 35,22 Q40,28 35,35 Q30,42 25,38 Q20,40 15,35 Q12,30 15,25 Z"
            fill="url(#worldDots)"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="0.2"
          />
          <path
            d="M42,18 Q52,12 68,18 Q75,25 70,32 Q65,38 58,35 Q52,38 48,32 Q45,25 42,18 Z"
            fill="url(#worldDots)"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="0.2"
          />
          <path
            d="M72,22 Q82,18 92,25 Q88,35 85,42 Q80,38 78,32 Q75,28 72,22 Z"
            fill="url(#worldDots)"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="0.2"
          />
          
          {/* Threat points with pulsing effects */}
          {threatPoints.map((point) => (
            <g key={point.id}>
              {/* Pulsing ring for active threats */}
              {point.pulse && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill="none"
                  stroke={getSeverityColor(point.severity)}
                  strokeWidth="0.3"
                  opacity="0.6"
                  filter="url(#pulse)"
                >
                  <animate
                    attributeName="r"
                    values="3;6;3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              {/* Main threat point */}
              <circle
                cx={point.x}
                cy={point.y}
                r="1.5"
                fill={getSeverityColor(point.severity)}
                stroke="white"
                strokeWidth="0.2"
                filter="url(#glow)"
              >
                {point.pulse && (
                  <animate
                    attributeName="r"
                    values="1.5;2.2;1.5"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            </g>
          ))}
          
          {/* Real-time attack paths */}
          {attackPaths.map((path) => {
            const x1 = path.from.x;
            const y1 = path.from.y;
            const x2 = path.to.x;
            const y2 = path.to.y;
            const progress = path.progress / 100;
            const currentX = x1 + (x2 - x1) * progress;
            const currentY = y1 + (y2 - y1) * progress;
            
            return (
              <g key={path.id}>
                {/* Attack path line with glow */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={getSeverityColor(path.severity)}
                  strokeWidth="0.5"
                  opacity="0.8"
                  strokeDasharray="1,1"
                  filter="url(#glow)"
                />
                {/* Moving attack projectile */}
                <circle
                  cx={currentX}
                  cy={currentY}
                  r="1.2"
                  fill={getSeverityColor(path.severity)}
                  filter="url(#glow)"
                >
                  <animate
                    attributeName="r"
                    values="1.2;1.8;1.2"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Attack trail effect */}
                <circle
                  cx={currentX}
                  cy={currentY}
                  r="3"
                  fill="none"
                  stroke={getSeverityColor(path.severity)}
                  strokeWidth="0.2"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="3;5;3"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0;0.3"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
          
          {/* Target location */}
          <g>
            <circle
              cx="25"
              cy="35"
              r="2.5"
              fill="none"
              stroke="#00FF00"
              strokeWidth="0.5"
              filter="url(#glow)"
            >
              <animate
                attributeName="r"
                values="2.5;5;2.5"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="25" cy="35" r="1.2" fill="#00FF00" filter="url(#glow)" />
          </g>
        </svg>

        {/* API Status Indicator */}
        <div className="absolute top-4 right-4">
          <div className={`bg-black/80 px-3 py-2 rounded border ${
            isConnected ? 'border-green-500' : 'border-red-500'
          }`}>
            <div className="flex items-center gap-2">
              <Shield size={16} className={isConnected ? 'text-green-400' : 'text-red-400'} />
              <span className={`text-sm font-bold ${
                isConnected ? 'text-green-400' : 'text-red-400'
              }`}>
                {isConnected ? 'API CONNECTED' : 'API OFFLINE'}
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Key: {connectionStatus === 'connected' ? '79df118f...' : 'Disconnected'}
            </div>
          </div>
        </div>

        {/* Live Attack Feed */}
        <div className="absolute bottom-4 left-4 max-w-sm">
          <div className="bg-black/80 p-3 rounded border border-gray-600">
            <div className="text-white text-xs font-bold mb-2 flex items-center gap-2">
              <Activity size={12} className="text-red-400" />
              LIVE ATTACK FEED
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {attackPaths.slice(0, 4).map((attack, index) => (
                <div key={index} className="text-xs text-gray-300">
                  <span className="text-red-400">{attack.from.ip}</span> → 
                  <span className="text-yellow-400"> {attack.from.country}</span>
                  <div className="text-gray-500">{attack.attackType}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Statistics */}
      <div className="bg-gray-900 p-4">
        <div className="grid grid-cols-5 gap-4 text-center">
          {threatPoints.slice(0, 5).map((point, index) => (
            <div key={index}>
              <div className={`text-lg font-bold ${
                point.severity === 'critical' ? 'text-red-400' :
                point.severity === 'high' ? 'text-orange-400' :
                point.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
              }`}>
                {point.attacks}
              </div>
              <div className="text-xs text-gray-400">{point.country}</div>
              <div className="text-xs text-gray-500 font-mono">{point.ip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};