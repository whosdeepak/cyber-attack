import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Shield, AlertTriangle } from 'lucide-react';
import { AttackTypeCount } from '../types/cyberAttack';

interface AttackTypeChartProps {
  data: AttackTypeCount[];
}

export const AttackTypeChart: React.FC<AttackTypeChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
          <p className="text-white font-medium">{data.type}</p>
          <p className="text-blue-400">{`Attacks: ${data.count.toLocaleString()}`}</p>
          <p className="text-gray-300">{`Percentage: ${data.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-gray-300">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Shield size={20} className="text-purple-400" />
          Attack Type Distribution
        </h3>
        <div className="flex items-center gap-2 text-xs bg-red-900/20 text-red-300 px-2 py-1 rounded">
          <AlertTriangle size={12} />
          <span>Live Monitoring</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Attack Type Statistics */}
      <div className="mt-6 space-y-2">
        {data.map((attack, index) => (
          <div key={attack.type} className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: attack.color }}
              ></div>
              <span className="text-gray-300 text-sm font-medium">{attack.type}</span>
            </div>
            <div className="text-right">
              <span className="text-white font-semibold">{attack.count.toLocaleString()}</span>
              <span className="text-gray-400 text-xs ml-2">({attack.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};