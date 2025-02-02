import { createContext, useContext, useState, useEffect } from 'react';
import { AuthState } from '../types/auth';

const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', 
    email: 'admin@example.com',
    role: 'admin',
    name: 'مدیر سیستم',
    department: 'مدیریت',
    permissions: [
      'manage_users',
      'manage_meetings',
      'view_reports',
      'manage_files',
      'manage_settings',
      'create_meeting',
      'edit_meeting',
      'delete_meeting'
    ]
  },
  {
    id: 2,
    username: 's.dadkhah',
    password: 'dadkhah123', 
    email: 'admin@example.com',
    role: 'admin',
    name: 'سهیل دادخواه',
    department: 'بنیاد کسب و کار',
    permissions: [
      'manage_users',
      'manage_meetings',
      'view_reports',
      'manage_files',
      'manage_settings',
      'create_meeting',
      'edit_meeting',
      'delete_meeting'
    ]
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager123',
    email: 'manager@example.com',
    role: 'manager',
    name: 'مدیر پروژه',
    department: 'مدیریت پروژه',
    permissions: [
      'view_reports',
      'manage_meetings',
      'create_meeting',
      'edit_meeting'
    ]
  },
  {
    id: 3,
    username: 'user',
    password: 'user123',
    email: 'user@example.com',
    role: 'user',
    name: 'کاربر عادی',
    department: 'توسعه',
    permissions: [
      'create_meeting'
    ]
  }
] as const;

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = MOCK_USERS.find(u => u.id === parseInt(localStorage.getItem('userId') || '0'));
      if (user) {
        setState({
          user: user,
          token,
          isAuthenticated: true,
          isLoading: false
        });
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (username: string, password: string) => {
    // در محیط واقعی اینجا باید با API ارتباط برقرار کنید
    const user = MOCK_USERS.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = 'mock_token_' + Math.random();
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.id.toString());

    setState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const hasPermission = (permission: string) => {
    return state.user?.permissions.includes(permission) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};