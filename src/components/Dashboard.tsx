import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Activity, 
  Database, 
  AlertTriangle,
  Bell,
  Settings,
  Eye,
  TrendingUp,
  Server,
  Globe,
  Lock,
  Target,
  UserX,
  Map
} from 'lucide-react';
import { UserProfile } from './UserProfile';
import { MetricCard } from './MetricCard';
import { AlertCard } from './AlertCard';
import { SecurityChart } from './SecurityChart';
import { PowerBIEmbed } from './PowerBIEmbed';
import { CyberAttackMap } from './CyberAttackMap';
import { AttackTypeChart } from './AttackTypeChart';
import { HackerProfileCard } from './HackerProfileCard';
import { AlertSystem } from './AlertSystem';
import { RealTimeCyberMap } from './RealTimeCyberMap';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { useCyberAttackData } from '../hooks/useCyberAttackData';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { metrics, chartData, alerts, topIPs } = useRealtimeData();
  const { attacks, metrics: attackMetrics, hackerProfiles, alertThreshold, isHighAlert } = useCyberAttackData();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'attacks', label: 'Cyber Attacks', icon: Target },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'data', label: 'Data Flow', icon: Database },
    { id: 'powerbi', label: 'Power BI', icon: TrendingUp },
    { id: 'alerts', label: 'Alerts', icon: Bell }
  ];

  // Filter tabs based on user role
  const availableTabs = tabs.filter(tab => {
    if (user?.role === 'admin') return true;
    // Viewers can access Power BI but with limited features
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="text-blue-400" size={28} />
              <div>
                <h1 className="text-xl font-bold">CyberWatch Pro</h1>
                <p className="text-sm text-gray-400">Real-time Security Operations Center</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-900/30 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Live</span>
            </div>
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 px-6">
        <div className="flex space-x-8">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Real-time API Connected Cyber Threat Map */}
            <RealTimeCyberMap />

            {/* User Welcome */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Welcome back, {user?.displayName}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Role: {user?.role} | Department: {user?.department || 'Security Operations'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Security Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">All Systems Operational</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <MetricCard
                title="Attacks Today"
                value={attackMetrics.totalToday.toLocaleString()}
                change={`${attackMetrics.liveAttacks} live attacks`}
                changeType="negative"
                icon={Target}
                iconColor="text-red-400"
              />
              <MetricCard
                title="Failed Login Attempts"
                value={metrics.failedLogins}
                change="+12 in last hour"
                changeType="negative"
                icon={Lock}
                iconColor="text-red-400"
              />
              <MetricCard
                title="Active Users"
                value={metrics.activeUsers.toLocaleString()}
                change="+5.2% from yesterday"
                changeType="positive"
                icon={Users}
                iconColor="text-green-400"
              />
              <MetricCard
                title="Unique Hackers"
                value={attackMetrics.uniqueHackers}
                change="IP-based tracking"
                changeType="negative"
                icon={UserX}
                iconColor="text-orange-400"
              />
              <MetricCard
                title="Data Transfers"
                value={`${(metrics.dataTransfers / 1000).toFixed(1)}K`}
                change="+8.7% from average"
                changeType="neutral"
                icon={Database}
                iconColor="text-blue-400"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity size={20} className="text-red-400" />
                  Attack Attempts Over Time
                </h3>
                <SecurityChart
                  data={chartData}
                  type="line"
                  dataKey="attacks"
                  stroke="#EF4444"
                />
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users size={20} className="text-green-400" />
                  Active Users
                </h3>
                <SecurityChart
                  data={chartData}
                  type="line"
                  dataKey="users"
                  stroke="#10B981"
                />
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell size={20} className="text-yellow-400" />
                Recent Security Alerts
              </h3>
              <div className="space-y-3">
                {alerts.slice(0, 3).map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attacks' && (
          <div className="space-y-6">
            {/* Attack Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Attacks Today"
                value={attackMetrics.totalToday.toLocaleString()}
                change={`${attackMetrics.totalThisMonth.toLocaleString()} this month`}
                changeType="neutral"
                icon={Target}
                iconColor="text-red-400"
              />
              <MetricCard
                title="Live Attacks"
                value={attackMetrics.liveAttacks}
                change="Real-time monitoring"
                changeType="negative"
                icon={Activity}
                iconColor="text-orange-400"
              />
              <MetricCard
                title="Unique Hackers"
                value={attackMetrics.uniqueHackers}
                change="IP-based identification"
                changeType="negative"
                icon={UserX}
                iconColor="text-purple-400"
              />
              <MetricCard
                title="Top Source"
                value={attackMetrics.topCountries[0]?.country || 'N/A'}
                change={`${attackMetrics.topCountries[0]?.percentage || 0}% of attacks`}
                changeType="negative"
                icon={Map}
                iconColor="text-yellow-400"
              />
            </div>

            {/* Charts and Maps */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CyberAttackMap countries={attackMetrics.topCountries} />
              <AttackTypeChart data={attackMetrics.attackTypes} />
            </div>

            {/* Hourly Trends and Hacker Profiles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity size={20} className="text-blue-400" />
                  Hourly Attack Trends
                </h3>
                <SecurityChart
                  data={attackMetrics.hourlyTrend}
                  type="line"
                  dataKey="attacks"
                  stroke="#EF4444"
                />
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <UserX size={20} className="text-red-400" />
                  Top Threat Actors
                </h3>
                <div className="space-y-3">
                  {hackerProfiles.slice(0, 3).map((hacker) => (
                    <HackerProfileCard key={hacker.hackerID} hacker={hacker} />
                  ))}
                </div>
              </div>
            </div>

            {/* Alert System */}
            <AlertSystem 
              isHighAlert={isHighAlert}
              currentAttacks={attackMetrics.liveAttacks}
              threshold={alertThreshold}
            />
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            {user?.role !== 'admin' && (
              <div className="bg-yellow-900/20 border border-yellow-500 text-yellow-300 px-4 py-3 rounded-lg">
                <p className="text-sm">⚠️ Limited access: Some security features require admin privileges</p>
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-red-400" />
                  Top Suspicious IPs
                </h3>
                <div className="space-y-3">
                  {topIPs.map((ip, index) => (
                    <div key={ip.ip} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-red-900 text-red-300 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-white font-mono">{ip.ip}</p>
                          <p className="text-sm text-gray-400">{ip.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-red-400 font-semibold">{ip.attempts}</p>
                        <p className="text-xs text-gray-400">attempts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity size={20} className="text-orange-400" />
                  Attack Patterns
                </h3>
                <SecurityChart
                  data={chartData}
                  type="bar"
                  dataKey="attacks"
                  fill="#F97316"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-400" />
                User Activity Monitoring
              </h3>
              <SecurityChart
                data={chartData}
                type="line"
                dataKey="users"
                stroke="#3B82F6"
              />
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database size={20} className="text-purple-400" />
                Data Flow Monitoring
              </h3>
              <SecurityChart
                data={chartData}
                type="line"
                dataKey="dataFlow"
                stroke="#8B5CF6"
              />
            </div>
          </div>
        )}

        {activeTab === 'powerbi' && (
          <div className="space-y-6">
            <PowerBIEmbed />
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Bell size={20} className="text-yellow-400" />
                  Security Alerts Timeline
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Alert Channels:</span>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs">Email</span>
                    <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs">WhatsApp</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs">Telegram</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};