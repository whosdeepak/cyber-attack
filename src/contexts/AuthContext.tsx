import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async (firebaseUser: FirebaseUser): Promise<User> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName || userData.displayName,
          role: userData.role || 'viewer',
          department: userData.department,
          lastLogin: new Date(),
          isActive: userData.isActive !== false
        };
      } else {
        // Create default user profile for new users
        const defaultUser: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
          role: 'viewer', // Default role
          department: 'Security Operations',
          lastLogin: new Date(),
          isActive: true
        };
        
        try {
          await setDoc(doc(db, 'users', firebaseUser.uid), defaultUser);
        } catch (setDocError) {
          console.warn('Could not save user profile to Firestore (offline):', setDocError);
          // Continue with default user data even if we can't save to Firestore
        }
        
        return defaultUser;
      }
    } catch (error: any) {
      console.warn('Firestore unavailable, using fallback user data:', error);
      
      // Return fallback user data when Firestore is offline
      const defaultUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
        role: 'viewer', // Default role
        department: 'Security Operations',
        lastLogin: new Date(),
        isActive: true
      };
      return defaultUser;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = await getUserData(result.user);
      
      // Try to update last login, but don't fail if offline
      try {
        await setDoc(doc(db, 'users', result.user.uid), {
          ...userData,
          lastLogin: new Date()
        }, { merge: true });
      } catch (updateError) {
        console.warn('Could not update last login (offline):', updateError);
        // Continue with login even if we can't update Firestore
      }
      
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signup = async (email: string, password: string, displayName?: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore
      const newUser: User = {
        uid: result.user.uid,
        email: result.user.email!,
        displayName: displayName || result.user.email!.split('@')[0],
        role: 'viewer', // Default role for new signups
        department: 'Security Operations',
        lastLogin: new Date(),
        isActive: true
      };
      
      try {
        await setDoc(doc(db, 'users', result.user.uid), newUser);
      } catch (setDocError) {
        console.warn('Could not save user profile to Firestore (offline):', setDocError);
        // Continue with signup even if we can't save to Firestore
      }
      
      setUser(newUser);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const hasPermission = (requiredRole: 'admin' | 'viewer'): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.role === requiredRole;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser);
          setUser(userData);
        } catch (error) {
          console.warn('Error fetching user data, using fallback:', error);
          // Create fallback user data instead of setting user to null
          const fallbackUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
            role: 'viewer',
            department: 'Security Operations',
            lastLogin: new Date(),
            isActive: true
          };
          setUser(fallbackUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};