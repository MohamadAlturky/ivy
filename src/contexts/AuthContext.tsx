import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Check if token exists in cookie on mount
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      setIsAuthenticated(true);
      // In a real app, you would decode the JWT and get the username
      setUser(token.split('=')[1].split('.')[1]); // Simple example
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Dummy API call - in real app, this would be your actual API endpoint
      const response = await new Promise<{ token: string }>((resolve) => {
        setTimeout(() => {
          // Simulating successful login with dummy credentials
          if (username === "admin" && password === "password") {
            resolve({ token: `dummy.${username}.token` });
          } else {
            return false;
          }
        }, 1000);
      });

      // Set the token in a cookie (httpOnly should be true in production)
      document.cookie = `token=${response.token}; path=/; max-age=86400`;
      setIsAuthenticated(true);
      setUser(username);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 