import { useState, useEffect } from 'react';
import { CyberAttack, AttackMetrics, CountryAttack, AttackTypeCount, HourlyAttack, HackerProfile } from '../types/cyberAttack';

export const useCyberAttackData = () => {
  const [attacks, setAttacks] = useState<CyberAttack[]>([]);
  const [metrics, setMetrics] = useState<AttackMetrics>({
    totalToday: 1247,
    totalThisMonth: 34567,
    liveAttacks: 23,
    uniqueHackers: 156,
    topCountries: [
      { country: 'India', countryCode: 'IN', count: 456, percentage: 35.2 },
      { country: 'China', countryCode: 'CN', count: 398, percentage: 30.8 },
      { country: 'Russia', countryCode: 'RU', count: 234, percentage: 18.1 },
      { country: 'Iran', countryCode: 'IR', count: 123, percentage: 9.5 },
      { country: 'USA', countryCode: 'US', count: 89, percentage: 6.9 }
    ],
    attackTypes: [
      { type: 'DDoS', count: 456, percentage: 36.6, color: '#EF4444' },
      { type: 'Phishing', count: 234, percentage: 18.8, color: '#F97316' },
      { type: 'Malware', count: 189, percentage: 15.2, color: '#EAB308' },
      { type: 'Brute Force', count: 156, percentage: 12.5, color: '#8B5CF6' },
      { type: 'SQL Injection', count: 123, percentage: 9.9, color: '#06B6D4' },
      { type: 'XSS', count: 89, percentage: 7.1, color: '#10B981' }
    ],
    hourlyTrend: [
      { hour: '00:00', attacks: 45, hackers: 12 },
      { hour: '01:00', attacks: 32, hackers: 8 },
      { hour: '02:00', attacks: 28, hackers: 7 },
      { hour: '03:00', attacks: 23, hackers: 6 },
      { hour: '04:00', attacks: 34, hackers: 9 },
      { hour: '05:00', attacks: 56, hackers: 15 },
      { hour: '06:00', attacks: 78, hackers: 21 },
      { hour: '07:00', attacks: 89, hackers: 24 },
      { hour: '08:00', attacks: 123, hackers: 32 },
      { hour: '09:00', attacks: 156, hackers: 41 },
      { hour: '10:00', attacks: 134, hackers: 35 },
      { hour: '11:00', attacks: 145, hackers: 38 }
    ]
  });

  const [hackerProfiles, setHackerProfiles] = useState<HackerProfile[]>([
    {
      hackerID: 'HKR_001',
      sourceIP: '103.174.27.65',
      asn: 'AS132296',
      asName: 'Seven Star Digital Network Private Limited',
      country: 'India',
      continent: 'Asia',
      totalAttempts: 456,
      lastSeen: new Date(Date.now() - 300000),
      attackTypes: ['DDoS', 'Brute Force'],
      threatLevel: 'critical'
    },
    {
      hackerID: 'HKR_002',
      sourceIP: '185.220.101.42',
      asn: 'AS9009',
      asName: 'M247 Ltd',
      country: 'Russia',
      continent: 'Europe',
      totalAttempts: 234,
      lastSeen: new Date(Date.now() - 600000),
      attackTypes: ['Phishing', 'Malware'],
      threatLevel: 'high'
    },
    {
      hackerID: 'HKR_003',
      sourceIP: '175.45.176.88',
      asn: 'AS4837',
      asName: 'China Unicom Backbone',
      country: 'North Korea',
      continent: 'Asia',
      totalAttempts: 189,
      lastSeen: new Date(Date.now() - 900000),
      attackTypes: ['SQL Injection', 'XSS'],
      threatLevel: 'high'
    }
  ]);

  const [alertThreshold] = useState(100); // Alert if attacks > 100 per hour
  const [isHighAlert, setIsHighAlert] = useState(false);

  // Simulate real-time attack data
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate new attack
      const attackTypes: CyberAttack['attackType'][] = ['DDoS', 'Phishing', 'Malware', 'Brute Force', 'SQL Injection', 'XSS', 'Ransomware'];
      
      // Real IP geolocation data samples
      const realIPData = [
        { ip: '103.174.27.65', asn: 'AS132296', asName: 'Seven Star Digital Network Private Limited', country: 'India', countryCode: 'IN', continent: 'Asia' },
        { ip: '185.220.101.42', asn: 'AS9009', asName: 'M247 Ltd', country: 'Russia', countryCode: 'RU', continent: 'Europe' },
        { ip: '175.45.176.88', asn: 'AS4837', asName: 'China Unicom Backbone', country: 'China', countryCode: 'CN', continent: 'Asia' },
        { ip: '91.240.118.172', asn: 'AS197695', asName: 'Domain names registrar REG.RU', country: 'Russia', countryCode: 'RU', continent: 'Europe' },
        { ip: '202.131.246.250', asn: 'AS45609', asName: 'Bharti Airtel Ltd', country: 'India', countryCode: 'IN', continent: 'Asia' },
        { ip: '123.125.71.35', asn: 'AS4808', asName: 'China Unicom Beijing Province Network', country: 'China', countryCode: 'CN', continent: 'Asia' },
        { ip: '46.161.9.5', asn: 'AS29182', asName: 'JSC IOT', country: 'Russia', countryCode: 'RU', continent: 'Europe' },
        { ip: '117.239.240.202', asn: 'AS4134', asName: 'Chinanet', country: 'China', countryCode: 'CN', continent: 'Asia' }
      ];
      
      const randomIPData = realIPData[Math.floor(Math.random() * realIPData.length)];
      
      const newAttack: CyberAttack = {
        id: Date.now().toString(),
        timestamp: new Date(),
        sourceIP: randomIPData.ip,
        asn: randomIPData.asn,
        asName: randomIPData.asName,
        sourceCountry: randomIPData.country,
        sourceCountryCode: randomIPData.countryCode,
        continent: randomIPData.continent,
        attackType: attackTypes[Math.floor(Math.random() * attackTypes.length)],
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as CyberAttack['severity'],
        targetEndpoint: '/api/login',
        blocked: Math.random() > 0.3,
        hackerID: `HKR_${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        requestSize: Math.floor(Math.random() * 10000)
      };

      setAttacks(prev => [newAttack, ...prev.slice(0, 99)]); // Keep last 100 attacks

      // Update metrics
      setMetrics(prev => {
        const currentHour = new Date().getHours();
        const currentHourAttacks = prev.hourlyTrend.find(h => h.hour === `${String(currentHour).padStart(2, '0')}:00`)?.attacks || 0;
        
        // Check alert threshold
        if (currentHourAttacks > alertThreshold) {
          setIsHighAlert(true);
          // In real app, trigger email notification here
          console.log('🚨 HIGH ALERT: Attack threshold exceeded!', currentHourAttacks);
        }

        return {
          ...prev,
          totalToday: prev.totalToday + 1,
          liveAttacks: Math.floor(Math.random() * 50) + 10,
          uniqueHackers: prev.uniqueHackers + (Math.random() > 0.8 ? 1 : 0)
        };
      });
    }, 3000); // New attack every 3 seconds

    return () => clearInterval(interval);
  }, [alertThreshold]);

  // Reset high alert after 30 seconds
  useEffect(() => {
    if (isHighAlert) {
      const timeout = setTimeout(() => setIsHighAlert(false), 30000);
      return () => clearTimeout(timeout);
    }
  }, [isHighAlert]);

  return {
    attacks,
    metrics,
    hackerProfiles,
    alertThreshold,
    isHighAlert
  };
};