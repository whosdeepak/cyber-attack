export interface CyberAttack {
  id: string;
  timestamp: Date;
  sourceIP: string;
  asn?: string;
  asName?: string;
  sourceCountry: string;
  sourceCountryCode: string;
  continent?: string;
  attackType: 'DDoS' | 'Phishing' | 'Malware' | 'Brute Force' | 'SQL Injection' | 'XSS' | 'Ransomware';
  severity: 'low' | 'medium' | 'high' | 'critical';
  targetEndpoint: string;
  blocked: boolean;
  hackerID: string;
  userAgent?: string;
  requestSize?: number;
}

export interface AttackMetrics {
  totalToday: number;
  totalThisMonth: number;
  liveAttacks: number;
  uniqueHackers: number;
  topCountries: CountryAttack[];
  attackTypes: AttackTypeCount[];
  hourlyTrend: HourlyAttack[];
}

export interface CountryAttack {
  country: string;
  countryCode: string;
  count: number;
  percentage: number;
}

export interface AttackTypeCount {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

export interface HourlyAttack {
  hour: string;
  attacks: number;
  hackers: number;
}

export interface HackerProfile {
  hackerID: string;
  sourceIP: string;
  asn?: string;
  asName?: string;
  country: string;
  continent?: string;
  totalAttempts: number;
  lastSeen: Date;
  attackTypes: string[];
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
}