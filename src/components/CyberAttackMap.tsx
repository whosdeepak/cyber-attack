import React from 'react';
import { Globe, MapPin, AlertTriangle } from 'lucide-react';
import { CountryAttack } from '../types/cyberAttack';

interface CyberAttackMapProps {
  countries: CountryAttack[];
}

export const CyberAttackMap: React.FC<CyberAttackMapProps> = ({ countries }) => {
  const getCountryThreatLevel = (percentage: number) => {
    if (percentage > 30) return 'critical';
    if (percentage > 20) return 'high';
    if (percentage > 10) return 'medium';
    return 'low';
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Globe size={20} className="text-red-400" />
          Global Attack Origins
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Threat Level:</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-red-300">Critical</span>
            <div className="w-3 h-3 bg-orange-500 rounded ml-2"></div>
            <span className="text-orange-300">High</span>
            <div className="w-3 h-3 bg-yellow-500 rounded ml-2"></div>
            <span className="text-yellow-300">Medium</span>
          </div>
        </div>
      </div>

      {/* World Map Placeholder */}
      <div className="bg-gray-900 rounded-lg p-8 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="relative z-10 text-center">
          <Globe size={64} className="text-blue-400 mx-auto mb-4 opacity-50" />
          <p className="text-gray-400 text-sm mb-2">Interactive World Map</p>
          <p className="text-xs text-gray-500">
            Real-time attack visualization by country
          </p>
        </div>
        
        {/* Simulated attack points */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
      </div>

      {/* Country Statistics */}
      <div className="space-y-3">
        <h4 className="text-white font-medium flex items-center gap-2">
          <MapPin size={16} className="text-blue-400" />
          Top Attack Sources (Real IP Data)
        </h4>
        {countries.map((country, index) => {
          const threatLevel = getCountryThreatLevel(country.percentage);
          return (
            <div key={country.countryCode} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 bg-gray-600 text-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{country.countryCode === 'IN' ? '🇮🇳' :
                                                country.countryCode === 'CN' ? '🇨🇳' : 
                                                country.countryCode === 'RU' ? '🇷🇺' :
                                                country.countryCode === 'KP' ? '🇰🇵' :
                                                country.countryCode === 'IR' ? '🇮🇷' :
                                                country.countryCode === 'US' ? '🇺🇸' : '🌍'}</span>
                  <div>
                    <p className="text-white font-medium">{country.country}</p>
                    <p className="text-xs text-gray-400">{country.countryCode} • Real IP Tracking</p>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="text-white font-semibold">{country.count.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{country.percentage}%</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${getThreatColor(threatLevel)}`}></div>
                {threatLevel === 'critical' && (
                  <AlertTriangle size={16} className="text-red-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};