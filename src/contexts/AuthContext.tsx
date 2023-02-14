import axios from 'axios';
import { createContext, useContext } from 'react';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export interface LoginData {
  emailAddress: string;
  password: string;
}

interface AuthContext {
  token: string | null;
  register: (regData: any, type: 'student' | 'employer') => Promise<boolean>;
  login: (token: LoginData | null) => Promise<boolean>;
  logout: () => void;
}

const authDefault: AuthContext = { token: null, register: async () => false, 
  login: async () => false, logout: () => {} };

const AuthContext = createContext<AuthContext>(authDefault);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useStore(state => state.token);
  const setToken = useStore(state => state.setToken);

  const register = async (regData: any, type: 'student' | 'employer') => {
    try {
      const { data } = await axios
        .post(`${API}/Accounts/registration/${type}`, 
        regData,
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
          }
        });
      return true;
    } catch (err: any) {
      console.log(err.response);
    }

    return false;
  };

  const login = async (token: LoginData | null) => {
    try {
      const { data } = await axios
        .post(`${API}/Accounts/signing`, 
        token,
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
          }
        });
      setToken(data);
      return true;
    } catch (err: any) {
      console.log(err.response);
    }

    return false;
  }

  const logout = () => {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  return useContext(AuthContext);
}