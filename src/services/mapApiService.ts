interface MapApiResponse {
  ip: string;
  asn: string;
  as_name: string;
  country: string;
  continent: string;
  timestamp: string;
  attack_type?: string;
  severity?: string;
  latitude?: number;
  longitude?: number;
}

interface RealTimeAttackData {
  attacks: MapApiResponse[];
  total_attacks: number;
  active_threats: number;
  countries_affected: number;
  blocked_attacks: number;
}

class MapApiService {
  private apiKey: string;
  private baseUrl: string;
  private wsConnection: WebSocket | null = null;

  constructor() {
    this.apiKey = '79df118f4971fec0423be6c91ccba8a3254aaf0c3641c7280b5d265ef52306bdfb65488cc85cc8d7';
    this.baseUrl = 'https://api.cybermap.io/v1'; // Replace with actual API endpoint
  }

  // Fetch real-time attack data
  async getRealTimeAttacks(): Promise<RealTimeAttackData> {
    try {
      const response = await fetch(`${this.baseUrl}/attacks/live`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Map API unavailable, using fallback data:', error);
      return this.getFallbackData();
    }
  }

  // Get IP geolocation data
  async getIpGeolocation(ip: string): Promise<MapApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/geoip/${ip}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Geolocation API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Geolocation API unavailable:', error);
      return this.getFallbackIpData(ip);
    }
  }

  // WebSocket connection for real-time updates
  connectWebSocket(onMessage: (data: MapApiResponse) => void): void {
    try {
      this.wsConnection = new WebSocket(`wss://api.cybermap.io/v1/ws?token=${this.apiKey}`);
      
      this.wsConnection.onopen = () => {
        console.log('🔗 Connected to real-time cyber threat feed');
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const attackData = JSON.parse(event.data);
          onMessage(attackData);
        } catch (error) {
          console.error('WebSocket message parsing error:', error);
        }
      };

      this.wsConnection.onerror = (error) => {
        console.warn('External WebSocket service unavailable (cybermap.io):', error);
      };

      this.wsConnection.onclose = () => {
        console.log('🔌 WebSocket connection closed, attempting reconnect...');
        // Auto-reconnect after 5 seconds
        setTimeout(() => this.connectWebSocket(onMessage), 5000);
      };
    } catch (error) {
      console.warn('WebSocket unavailable, using polling fallback:', error);
      // Fallback to polling every 3 seconds
      setInterval(async () => {
        const data = await this.getRealTimeAttacks();
        if (data.attacks.length > 0) {
          onMessage(data.attacks[0]);
        }
      }, 3000);
    }
  }

  // Disconnect WebSocket
  disconnect(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  // Fallback data when API is unavailable
  private getFallbackData(): RealTimeAttackData {
    return {
      attacks: [
        {
          ip: "103.174.27.65",
          asn: "AS132296",
          as_name: "Seven Star Digital Network Private Limited",
          country: "India",
          continent: "Asia",
          timestamp: new Date().toISOString(),
          attack_type: "DDoS",
          severity: "critical",
          latitude: 28.6139,
          longitude: 77.2090
        },
        {
          ip: "185.220.101.42",
          asn: "AS9009",
          as_name: "M247 Ltd",
          country: "Russia",
          continent: "Europe",
          timestamp: new Date().toISOString(),
          attack_type: "Phishing",
          severity: "high",
          latitude: 55.7558,
          longitude: 37.6176
        }
      ],
      total_attacks: 87085,
      active_threats: 23,
      countries_affected: 45,
      blocked_attacks: 65432
    };
  }

  private getFallbackIpData(ip: string): MapApiResponse {
    return {
      ip,
      asn: "AS0000",
      as_name: "Unknown Network",
      country: "Unknown",
      continent: "Unknown",
      timestamp: new Date().toISOString()
    };
  }
}

export const mapApiService = new MapApiService();
export type { MapApiResponse, RealTimeAttackData };