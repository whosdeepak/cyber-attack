import React, { useState } from 'react';
import { 
  ExternalLink, 
  Shield, 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Database,
  Play,
  Pause,
  RefreshCw,
  Maximize2,
  Settings,
  Download,
  Share2,
  Eye,
  Lock,
  Zap,
  AlertTriangle,
  Users,
  Globe,
  Server,
  LineChart,
  PieChart,
  Monitor,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SecurityChart } from './SecurityChart';

export const PowerBIEmbed: React.FC = () => {
  const { user } = useAuth();
  const [activeReport, setActiveReport] = useState('security-overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const powerBIReports = [
    {
      id: 'security-overview',
      title: 'Security Overview',
      description: 'Real-time security metrics and KPIs',
      icon: Shield,
      color: 'blue',
      status: 'live',
      lastUpdated: '2 mins ago',
      embedUrl: 'https://app.powerbi.com/embed/reports/security-overview',
      features: ['Failed Logins', 'Active Sessions', 'Threat Levels', 'Security Alerts']
    },
    {
      id: 'user-analytics',
      title: 'User Analytics',
      description: 'User behavior and activity patterns',
      icon: Users,
      color: 'green',
      status: 'live',
      lastUpdated: '1 min ago',
      embedUrl: 'https://app.powerbi.com/embed/reports/user-analytics',
      features: ['Session Duration', 'Page Views', 'User Journey', 'Activity Heatmap']
    },
    {
      id: 'threat-intelligence',
      title: 'Threat Intelligence',
      description: 'Advanced threat monitoring and analysis',
      icon: AlertTriangle,
      color: 'red',
      status: 'live',
      lastUpdated: '30 sec ago',
      embedUrl: 'https://app.powerbi.com/embed/reports/threat-intelligence',
      features: ['Attack Patterns', 'IP Reputation', 'Malware Detection', 'Threat Hunting']
    },
    {
      id: 'network-monitoring',
      title: 'Network Monitoring',
      description: 'Network traffic and infrastructure monitoring',
      icon: Globe,
      color: 'purple',
      status: 'live',
      lastUpdated: '45 sec ago',
      embedUrl: 'https://app.powerbi.com/embed/reports/network-monitoring',
      features: ['Bandwidth Usage', 'Network Topology', 'Device Status', 'Performance Metrics']
    },
    {
      id: 'data-flow',
      title: 'Data Flow Analysis',
      description: 'Data pipeline monitoring and analytics',
      icon: Database,
      color: 'indigo',
      status: 'live',
      lastUpdated: '1 min ago',
      embedUrl: 'https://app.powerbi.com/embed/reports/data-flow',
      features: ['API Calls', 'Data Pipelines', 'Transfer Volumes', 'Processing Times']
    },
    {
      id: 'compliance',
      title: 'Compliance Dashboard',
      description: 'Regulatory compliance and audit reports',
      icon: Lock,
      color: 'yellow',
      status: 'live',
      lastUpdated: '5 mins ago',
      embedUrl: 'https://app.powerbi.com/embed/reports/compliance',
      features: ['GDPR Compliance', 'Audit Logs', 'Policy Violations', 'Risk Assessment']
    }
  ];

  const activeReportData = powerBIReports.find(report => report.id === activeReport);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-500 bg-blue-900/20 text-blue-300',
      green: 'border-green-500 bg-green-900/20 text-green-300',
      red: 'border-red-500 bg-red-900/20 text-red-300',
      purple: 'border-purple-500 bg-purple-900/20 text-purple-300',
      indigo: 'border-indigo-500 bg-indigo-900/20 text-indigo-300',
      yellow: 'border-yellow-500 bg-yellow-900/20 text-yellow-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  // Sample data for different reports
  const getReportData = (reportId: string) => {
    switch (reportId) {
      case 'security-overview':
        return [
          { time: '00:00', value: 45, attacks: 15, blocked: 12 },
          { time: '04:00', value: 67, attacks: 23, blocked: 20 },
          { time: '08:00', value: 89, attacks: 31, blocked: 28 },
          { time: '12:00', value: 123, attacks: 45, blocked: 40 },
          { time: '16:00', value: 156, attacks: 52, blocked: 48 },
          { time: '20:00', value: 134, attacks: 38, blocked: 35 }
        ];
      case 'user-analytics':
        return [
          { time: '00:00', users: 890, sessions: 1200, pageViews: 3400 },
          { time: '04:00', users: 1120, sessions: 1450, pageViews: 4200 },
          { time: '08:00', users: 1450, sessions: 1800, pageViews: 5600 },
          { time: '12:00', users: 1680, sessions: 2100, pageViews: 6800 },
          { time: '16:00', users: 1247, sessions: 1650, pageViews: 4900 },
          { time: '20:00', users: 980, sessions: 1300, pageViews: 3800 }
        ];
      case 'threat-intelligence':
        return [
          { time: '00:00', threats: 25, malware: 8, phishing: 12 },
          { time: '04:00', threats: 34, malware: 12, phishing: 18 },
          { time: '08:00', threats: 56, malware: 20, phishing: 28 },
          { time: '12:00', threats: 78, malware: 28, phishing: 35 },
          { time: '16:00', threats: 67, malware: 24, phishing: 30 },
          { time: '20:00', threats: 45, malware: 16, phishing: 22 }
        ];
      default:
        return [
          { time: '00:00', value: 100 },
          { time: '04:00', value: 150 },
          { time: '08:00', value: 200 },
          { time: '12:00', value: 180 },
          { time: '16:00', value: 220 },
          { time: '20:00', value: 190 }
        ];
    }
  };

  const renderReportContent = () => {
    const data = getReportData(activeReport);
    
    switch (activeReport) {
      case 'security-overview':
        return (
          <div className="space-y-6">
            {/* Security Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Failed Logins</p>
                    <p className="text-2xl font-bold text-red-400">247</p>
                  </div>
                  <Shield className="text-red-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Sessions</p>
                    <p className="text-2xl font-bold text-green-400">1,247</p>
                  </div>
                  <Users className="text-green-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Threats Blocked</p>
                    <p className="text-2xl font-bold text-blue-400">89</p>
                  </div>
                  <AlertTriangle className="text-blue-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Security Score</p>
                    <p className="text-2xl font-bold text-yellow-400">94%</p>
                  </div>
                  <Shield className="text-yellow-400" size={24} />
                </div>
              </div>
            </div>
            
            {/* Security Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="text-white font-medium mb-4">Security Events Over Time</h4>
              <SecurityChart
                data={data}
                type="line"
                dataKey="attacks"
                stroke="#EF4444"
              />
            </div>
          </div>
        );

      case 'user-analytics':
        return (
          <div className="space-y-6">
            {/* User Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-green-400">1,247</p>
                  </div>
                  <Users className="text-green-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Sessions</p>
                    <p className="text-2xl font-bold text-blue-400">1,650</p>
                  </div>
                  <Activity className="text-blue-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Page Views</p>
                    <p className="text-2xl font-bold text-purple-400">4,900</p>
                  </div>
                  <Eye className="text-purple-400" size={24} />
                </div>
              </div>
            </div>
            
            {/* User Activity Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="text-white font-medium mb-4">User Activity Trends</h4>
              <SecurityChart
                data={data}
                type="line"
                dataKey="users"
                stroke="#10B981"
              />
            </div>
          </div>
        );

      case 'threat-intelligence':
        return (
          <div className="space-y-6">
            {/* Threat Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Threats</p>
                    <p className="text-2xl font-bold text-red-400">67</p>
                  </div>
                  <AlertTriangle className="text-red-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Malware Detected</p>
                    <p className="text-2xl font-bold text-orange-400">24</p>
                  </div>
                  <Shield className="text-orange-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Phishing Attempts</p>
                    <p className="text-2xl font-bold text-yellow-400">30</p>
                  </div>
                  <AlertTriangle className="text-yellow-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Risk Score</p>
                    <p className="text-2xl font-bold text-red-400">High</p>
                  </div>
                  <AlertTriangle className="text-red-400" size={24} />
                </div>
              </div>
            </div>
            
            {/* Threat Intelligence Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="text-white font-medium mb-4">Threat Detection Timeline</h4>
              <SecurityChart
                data={data}
                type="line"
                dataKey="threats"
                stroke="#F59E0B"
              />
            </div>
          </div>
        );

      case 'network-monitoring':
        return (
          <div className="space-y-6">
            {/* Network Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Bandwidth Usage</p>
                    <p className="text-2xl font-bold text-blue-400">2.4 GB</p>
                  </div>
                  <Globe className="text-blue-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Network Topology</p>
                    <p className="text-2xl font-bold text-green-400">Active</p>
                  </div>
                  <Server className="text-green-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Device Status</p>
                    <p className="text-2xl font-bold text-green-400">Online</p>
                  </div>
                  <Monitor className="text-green-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Performance</p>
                    <p className="text-2xl font-bold text-yellow-400">98%</p>
                  </div>
                  <TrendingUp className="text-yellow-400" size={24} />
                </div>
              </div>
            </div>
            
            {/* Network Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="text-white font-medium mb-4">Network Performance Metrics</h4>
              <SecurityChart
                data={getReportData('network-monitoring')}
                type="line"
                dataKey="value"
                stroke="#8B5CF6"
              />
            </div>
          </div>
        );

      case 'data-flow':
        return (
          <div className="space-y-6">
            {/* Data Flow Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">API Calls</p>
                    <p className="text-2xl font-bold text-blue-400">12,847</p>
                  </div>
                  <Database className="text-blue-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Data Pipelines</p>
                    <p className="text-2xl font-bold text-green-400">Active</p>
                  </div>
                  <Activity className="text-green-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Transfer Volume</p>
                    <p className="text-2xl font-bold text-purple-400">1.2 TB</p>
                  </div>
                  <Database className="text-purple-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Processing Time</p>
                    <p className="text-2xl font-bold text-yellow-400">2.3s</p>
                  </div>
                  <TrendingUp className="text-yellow-400" size={24} />
                </div>
              </div>
            </div>
            
            {/* Data Flow Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="text-white font-medium mb-4">Data Processing Analytics</h4>
              <SecurityChart
                data={getReportData('data-flow')}
                type="bar"
                dataKey="value"
                fill="#6366F1"
              />
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-6">
            {/* Compliance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">GDPR Compliance</p>
                    <p className="text-2xl font-bold text-green-400">98%</p>
                  </div>
                  <Lock className="text-green-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Audit Logs</p>
                    <p className="text-2xl font-bold text-blue-400">2,847</p>
                  </div>
                  <FileText className="text-blue-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Policy Violations</p>
                    <p className="text-2xl font-bold text-red-400">3</p>
                  </div>
                  <AlertTriangle className="text-red-400" size={24} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Risk Assessment</p>
                    <p className="text-2xl font-bold text-yellow-400">Low</p>
                  </div>
                  <Shield className="text-yellow-400" size={24} />
                </div>
              </div>
            </div>
            
            {/* Compliance Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="text-white font-medium mb-4">Compliance Monitoring</h4>
              <SecurityChart
                data={getReportData('compliance')}
                type="bar"
                dataKey="value"
                fill="#EAB308"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <BarChart3 size={64} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Select a report to view analytics</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Power BI Security Dashboard</h2>
              <p className="text-blue-300">Advanced analytics and business intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-gray-300">Connected as</div>
              <div className="text-white font-medium">{user?.displayName}</div>
            </div>
            <div className="flex items-center gap-2 bg-green-900/30 px-3 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {powerBIReports.map((report) => {
            const Icon = report.icon;
            const isActive = activeReport === report.id;
            return (
              <button
                key={report.id}
                onClick={() => setActiveReport(report.id)}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  isActive 
                    ? getColorClasses(report.color)
                    : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon size={24} />
                  <div className="text-left">
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-xs opacity-75">{report.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded ${
                    report.status === 'live' 
                      ? 'bg-green-900/50 text-green-300' 
                      : 'bg-yellow-900/50 text-yellow-300'
                  }`}>
                    {report.status}
                  </span>
                  <span className="opacity-75">{report.lastUpdated}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Report Display */}
      {activeReportData && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {/* Report Header */}
          <div className="bg-gray-900 p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <activeReportData.icon size={24} className="text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{activeReportData.title}</h3>
                  <p className="text-sm text-gray-400">{activeReportData.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors"
                >
                  <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <Maximize2 size={16} />
                </button>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className={`relative ${isFullscreen ? 'h-screen' : 'min-h-96'} bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10 p-6`}>
            {renderReportContent()}

            {/* Loading Overlay */}
            {refreshing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 text-center">
                  <RefreshCw size={32} className="text-blue-400 animate-spin mx-auto mb-3" />
                  <p className="text-white">Refreshing report data...</p>
                </div>
              </div>
            )}
          </div>

          {/* Report Footer */}
          <div className="bg-gray-900 p-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Last updated: {activeReportData.lastUpdated}</span>
                <span className={`px-2 py-1 rounded ${
                  activeReportData.status === 'live' 
                    ? 'bg-green-900/50 text-green-300' 
                    : 'bg-yellow-900/50 text-yellow-300'
                }`}>
                  {activeReportData.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors">
                  <Download size={14} />
                  Export
                </button>
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors">
                  <Share2 size={14} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integration Guide */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings size={20} className="text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Power BI Integration Setup</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Quick Setup Steps</h4>
            <div className="space-y-3">
              {[
                { step: 1, title: 'Create Power BI Workspace', desc: 'Set up your Power BI Pro/Premium workspace' },
                { step: 2, title: 'Configure Azure AD App', desc: 'Register app and get client credentials' },
                { step: 3, title: 'Generate Embed Tokens', desc: 'Create access tokens for report embedding' },
                { step: 4, title: 'Update Component', desc: 'Replace placeholder with actual embed URLs' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Configuration Example</h4>
            <div className="bg-gray-900 rounded-lg p-4 text-xs font-mono">
              <div className="text-green-400 mb-2">// Power BI Embed Configuration</div>
              <div className="text-gray-300">const embedConfig = {`{`}</div>
              <div className="text-gray-300 ml-2">type: 'report',</div>
              <div className="text-gray-300 ml-2">id: '[YOUR_REPORT_ID]',</div>
              <div className="text-gray-300 ml-2">embedUrl: '[EMBED_URL]',</div>
              <div className="text-gray-300 ml-2">accessToken: '[ACCESS_TOKEN]',</div>
              <div className="text-gray-300 ml-2">settings: {`{`}</div>
              <div className="text-gray-300 ml-4">filterPaneEnabled: false,</div>
              <div className="text-gray-300 ml-4">navContentPaneEnabled: true</div>
              <div className="text-gray-300 ml-2">{`}`}</div>
              <div className="text-gray-300">{`};`}</div>
              <div className="text-yellow-400 mt-2">// Embed using Power BI JavaScript SDK</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-blue-400" />
            <span className="text-blue-300 font-medium">Pro Tip</span>
          </div>
          <p className="text-blue-200 text-sm">
            Use Power BI Embedded service for seamless integration. Configure row-level security (RLS) 
            to ensure users only see data they're authorized to access based on their role.
          </p>
        </div>
      </div>
    </div>
  );
};