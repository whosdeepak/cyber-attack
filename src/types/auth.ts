export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'viewer';
  department?: string;
  lastLogin?: Date;
  isActive: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (requiredRole: 'admin' | 'viewer') => boolean;
}