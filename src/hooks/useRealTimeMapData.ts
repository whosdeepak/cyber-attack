import { useState, useEffect, useCallback } from 'react';
import { mapApiService, MapApiResponse, RealTimeAttackData } from '../services/mapApiService';

interface RealTimeMapHook {
  attackData: RealTimeAttackData;
  liveAttacks: MapApiResponse[];
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  reconnect: () => void;
}

export const useRealTimeMapData = (): RealTimeMapHook => {
  const [attackData, setAttackData] = useState<RealTimeAttackData>({
    attacks: [],
    total_attacks: 0,
    active_threats: 0,
    countries_affected: 0,
    blocked_attacks: 0
  });
  
  const [liveAttacks, setLiveAttacks] = useState<MapApiResponse[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');

  // Handle incoming real-time attack data
  const handleNewAttack = useCallback((newAttack: MapApiResponse) => {
    console.log('🚨 New cyber attack detected:', newAttack);
    
    // Add to live attacks list (keep last 50)
    setLiveAttacks(prev => [newAttack, ...prev.slice(0, 49)]);
    
    // Update attack statistics
    setAttackData(prev => ({
      ...prev,
      total_attacks: prev.total_attacks + 1,
      active_threats: Math.floor(Math.random() * 30) + 15,
      attacks: [newAttack, ...prev.attacks.slice(0, 99)]
    }));
    
    setIsConnected(true);
    setConnectionStatus('connected');
  }, []);

  // Initialize connection
  const connectToApi = useCallback(() => {
    setConnectionStatus('connecting');
    
    // Connect to WebSocket for real-time updates
    mapApiService.connectWebSocket(handleNewAttack);
    
    // Initial data fetch
    mapApiService.getRealTimeAttacks()
      .then(data => {
        setAttackData(data);
        setLiveAttacks(data.attacks);
        setIsConnected(true);
        setConnectionStatus('connected');
      })
      .catch(error => {
        console.error('Failed to fetch initial data:', error);
        setConnectionStatus('error');
      });
  }, [handleNewAttack]);

  // Reconnect function
  const reconnect = useCallback(() => {
    mapApiService.disconnect();
    connectToApi();
  }, [connectToApi]);

  // Initialize on mount
  useEffect(() => {
    connectToApi();
    
    // Cleanup on unmount
    return () => {
      mapApiService.disconnect();
    };
  }, [connectToApi]);

  // Periodic data refresh (fallback)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (connectionStatus !== 'connected') {
        try {
          const data = await mapApiService.getRealTimeAttacks();
          setAttackData(data);
          if (data.attacks.length > 0) {
            handleNewAttack(data.attacks[0]);
          }
        } catch (error) {
          console.warn('Periodic refresh failed:', error);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [connectionStatus, handleNewAttack]);

  return {
    attackData,
    liveAttacks,
    isConnected,
    connectionStatus,
    reconnect
  };
};