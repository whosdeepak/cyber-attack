import { useState, useEffect } from 'react';
import { Alert } from '../components/AlertCard';

interface SecurityMetrics {
  failedLogins: number;
  activeUsers: number;
  suspiciousIPs: number;
  dataTransfers: number;
  alertsToday: number;
}

interface ChartData {
  time: string;
  attacks: number;
  users: number;
  dataFlow: number;
}

export const useRealtimeData = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    failedLogins: 47,
    activeUsers: 1247,
    suspiciousIPs: 8,
    dataTransfers: 2847,
    alertsToday: 12
  });

  const [chartData, setChartData] = useState<ChartData[]>([
    { time: '00:00', attacks: 15, users: 890, dataFlow: 2340 },
    { time: '04:00', attacks: 23, users: 1120, dataFlow: 2890 },
    { time: '08:00', attacks: 31, users: 1450, dataFlow: 3200 },
    { time: '12:00', attacks: 18, users: 1680, dataFlow: 3800 },
    { time: '16:00', attacks: 47, users: 1247, dataFlow: 2847 },
    { time: '20:00', attacks: 29, users: 980, dataFlow: 2100 }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'security',
      severity: 'critical',
      title: 'Multiple Failed Login Attempts',
      description: 'IP 192.168.1.100 attempted 15 failed logins in 5 minutes',
      timestamp: new Date(Date.now() - 300000),
      source: 'Authentication System'
    },
    {
      id: '2',
      type: 'user',
      severity: 'medium',
      title: 'Unusual User Activity Spike',
      description: 'User activity increased by 340% in the last 30 minutes',
      timestamp: new Date(Date.now() - 600000),
      source: 'User Analytics'
    },
    {
      id: '3',
      type: 'data',
      severity: 'high',
      title: 'Large Data Transfer Detected',
      description: 'Unusual 2.4GB data transfer to external endpoint',
      timestamp: new Date(Date.now() - 900000),
      source: 'Data Flow Monitor'
    }
  ]);

  const [topIPs, setTopIPs] = useState([
    { ip: '192.168.1.100', attempts: 15, country: 'Unknown' },
    { ip: '10.0.0.55', attempts: 8, country: 'US' },
    { ip: '172.16.0.23', attempts: 6, country: 'RU' },
    { ip: '203.124.45.67', attempts: 4, country: 'CN' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      setMetrics(prev => ({
        ...prev,
        failedLogins: prev.failedLogins + Math.floor(Math.random() * 5),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
        suspiciousIPs: prev.suspiciousIPs + (Math.random() > 0.8 ? 1 : 0),
        dataTransfers: prev.dataTransfers + Math.floor(Math.random() * 100)
      }));

      // Update chart data
      setChartData(prev => {
        const newData = [...prev];
        const currentTime = new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        newData.push({
          time: currentTime,
          attacks: Math.floor(Math.random() * 50) + 10,
          users: Math.floor(Math.random() * 1000) + 800,
          dataFlow: Math.floor(Math.random() * 2000) + 2000
        });

        return newData.slice(-10); // Keep only last 10 data points
      });

      // Occasionally add new alerts
      if (Math.random() > 0.85) {
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: ['security', 'user', 'data'][Math.floor(Math.random() * 3)] as Alert['type'],
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as Alert['severity'],
          title: 'New Security Event Detected',
          description: 'Real-time monitoring detected suspicious activity',
          timestamp: new Date(),
          source: 'Real-time Monitor'
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    chartData,
    alerts,
    topIPs
  };
};