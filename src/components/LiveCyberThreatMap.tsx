import React, { useState, useEffect } from 'react';
import { Globe, Target, AlertTriangle, Activity, Shield, Zap } from 'lucide-react';

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

export const LiveCyberThreatMap: React.FC = () => {
  const [attackPaths, setAttackPaths] = useState<AttackPath[]>([]);
  const [threatPoints, setThreatPoints] = useState<ThreatPoint[]>([
    { id: '1', x: 75, y: 35, country: 'India', ip: '103.174.27.65', attacks: 456, severity: 'critical', pulse: true },
    { id: '2', x: 55, y: 25, country: 'Russia', ip: '185.220.101.42', attacks: 234, severity: 'high', pulse: true },
    { id: '3', x: 80, y: 30, country: 'China', ip: '175.45.176.88', attacks: 189, severity: 'high', pulse: true },
    { id: '4', x: 50, y: 40, country: 'Iran', ip: '91.240.118.172', attacks: 123, severity: 'medium', pulse: false },
    { id: '5', x: 25, y: 35, country: 'USA', ip: '202.131.246.250', attacks: 89, severity: 'low', pulse: false }
  ]);
  const [liveStats, setLiveStats] = useState({
    totalAttacks: 87085,
    activeThreats: 23,
    countriesAffected: 45,
    blockedAttacks: 65432
  });

  // Generate attack paths
  useEffect(() => {
    const interval = setInterval(() => {
      const newAttack: AttackPath = {
        id: Date.now().toString(),
        from: threatPoints[Math.floor(Math.random() * threatPoints.length)],
        to: { x: 25, y: 35, country: 'Target' }, // Center target
        progress: 0,
        attackType: ['DDoS', 'Phishing', 'Malware', 'Brute Force'][Math.floor(Math.random() * 4)],
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as AttackPath['severity']
      };

      setAttackPaths(prev => [...prev.slice(-4), newAttack]);
      
      // Update live stats
      setLiveStats(prev => ({
        ...prev,
        totalAttacks: prev.totalAttacks + Math.floor(Math.random() * 5) + 1,
        activeThreats: Math.floor(Math.random() * 30) + 15
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [threatPoints]);

  // Animate attack paths
  useEffect(() => {
    const interval = setInterval(() => {
      setAttackPaths(prev => 
        prev.map(path => ({
          ...path,
          progress: Math.min(path.progress + 2, 100)
        })).filter(path => path.progress < 100)
      );
    }, 50);

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

  const getPathColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#FF0000';
      case 'high': return '#FF6600';
      case 'medium': return '#FFAA00';
      default: return '#00AAFF';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Globe size={32} className="text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">LIVE CYBER THREAT MAP</h2>
              <p className="text-blue-300 text-sm">Real-time Global Attack Monitoring</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-red-400">{liveStats.totalAttacks.toLocaleString()}</div>
            <div className="text-sm text-red-300">ATTACKS ON THIS DAY</div>
          </div>
        </div>
      </div>

      {/* Live Stats Bar */}
      <div className="bg-gray-900 px-6 py-3 border-b border-gray-700">
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-xl font-bold text-red-400">{liveStats.activeThreats}</div>
            <div className="text-xs text-gray-400">ACTIVE THREATS</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">{liveStats.countriesAffected}</div>
            <div className="text-xs text-gray-400">COUNTRIES AFFECTED</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">{liveStats.blockedAttacks.toLocaleString()}</div>
            <div className="text-xs text-gray-400">BLOCKED ATTACKS</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">LIVE</span>
            </div>
            <div className="text-xs text-gray-400">MONITORING</div>
          </div>
        </div>
      </div>

      {/* World Map */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 h-96 overflow-hidden">
        {/* World Map SVG */}
        <svg 
          viewBox="0 0 100 60" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}
        >
          {/* Simplified world map paths */}
          <defs>
            <pattern id="dots" patternUnits="userSpaceOnUse" width="2" height="2">
              <circle cx="1" cy="1" r="0.3" fill="rgba(59, 130, 246, 0.4)" />
            </pattern>
          </defs>
          
          {/* Continents as simplified shapes */}
          <path
            d="M15,25 Q20,20 30,25 Q35,30 30,35 Q25,40 20,35 Q15,30 15,25 Z"
            fill="url(#dots)"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="0.2"
          />
          <path
            d="M45,20 Q55,15 65,20 Q70,25 65,30 Q60,35 55,30 Q50,25 45,20 Z"
            fill="url(#dots)"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="0.2"
          />
          <path
            d="M70,25 Q80,20 90,25 Q85,35 80,30 Q75,35 70,25 Z"
            fill="url(#dots)"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="0.2"
          />
          
          {/* Attack paths */}
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
                {/* Attack path line */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={getPathColor(path.severity)}
                  strokeWidth="0.3"
                  opacity="0.6"
                  strokeDasharray="1,1"
                />
                {/* Moving attack point */}
                <circle
                  cx={currentX}
                  cy={currentY}
                  r="0.8"
                  fill={getPathColor(path.severity)}
                  opacity="0.9"
                >
                  <animate
                    attributeName="r"
                    values="0.8;1.2;0.8"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Attack trail */}
                <circle
                  cx={currentX}
                  cy={currentY}
                  r="2"
                  fill="none"
                  stroke={getPathColor(path.severity)}
                  strokeWidth="0.2"
                  opacity="0.4"
                >
                  <animate
                    attributeName="r"
                    values="2;4;2"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
          
          {/* Threat points */}
          {threatPoints.map((point) => (
            <g key={point.id}>
              {/* Pulsing ring */}
              {point.pulse && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill="none"
                  stroke={getSeverityColor(point.severity)}
                  strokeWidth="0.3"
                  opacity="0.6"
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
              >
                {point.pulse && (
                  <animate
                    attributeName="r"
                    values="1.5;2;1.5"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            </g>
          ))}
          
          {/* Target location (center) */}
          <g>
            <circle
              cx="25"
              cy="35"
              r="2"
              fill="none"
              stroke="#00FF00"
              strokeWidth="0.4"
            >
              <animate
                attributeName="r"
                values="2;4;2"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="25"
              cy="35"
              r="1"
              fill="#00FF00"
            />
          </g>
        </svg>

        {/* Threat point labels */}
        {threatPoints.map((point) => (
          <div
            key={`label-${point.id}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
            }}
          >
            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded border border-gray-600 min-w-max">
              <div className="font-bold text-red-400">{point.country}</div>
              <div className="font-mono text-gray-300">{point.ip}</div>
              <div className="text-yellow-400">{point.attacks} attacks</div>
            </div>
          </div>
        ))}

        {/* Live indicators */}
        <div className="absolute top-4 right-4 space-y-2">
          <div className="bg-black/60 px-3 py-2 rounded border border-red-500">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-red-400" />
              <span className="text-red-400 text-sm font-bold">UNDER ATTACK</span>
            </div>
          </div>
          <div className="bg-black/60 px-3 py-2 rounded border border-green-500">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-400" />
              <span className="text-green-400 text-sm font-bold">PROTECTED</span>
            </div>
          </div>
        </div>

        {/* Attack type legend */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/80 p-3 rounded border border-gray-600">
            <div className="text-white text-xs font-bold mb-2">ATTACK TYPES</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-300">DDoS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-gray-300">Phishing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-gray-300">Malware</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-gray-300">Brute Force</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="bg-gray-900 p-4">
        <div className="grid grid-cols-5 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-red-400">456</div>
            <div className="text-xs text-gray-400">India</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-400">234</div>
            <div className="text-xs text-gray-400">Russia</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-400">189</div>
            <div className="text-xs text-gray-400">China</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">123</div>
            <div className="text-xs text-gray-400">Iran</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">89</div>
            <div className="text-xs text-gray-400">USA</div>
          </div>
        </div>
      </div>
    </div>
  );
};