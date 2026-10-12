import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authApi } from "../services/api";

const AuthContext = createContext();
const ACCESS_TOKEN_KEY = "Pearl Promise-access-token";
const REFRESH_TOKEN_KEY = "Pearl Promise-refresh-token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem(ACCESS_TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);

  const saveSession = (session) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, session.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
    setAccessToken(session.access_token);
    setUser(session.user);
  };

  const clearSession = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem("Pearl Promise-user");
    setAccessToken(null);
    setUser(null);
  };

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      const savedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      const savedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (!savedAccessToken || !savedRefreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authApi.me(savedAccessToken);
        if (!cancelled) setUser(currentUser);
      } catch {
        try {
          const refreshed = await authApi.refresh(savedRefreshToken);
          if (!cancelled) saveSession(refreshed);
        } catch {
          if (!cancelled) clearSession();
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const signup = async (name, email, password, confirmPassword) => {
    try {
      const session = await authApi.signup({
        name,
        email,
        password,
        confirm_password: confirmPassword,
      });
      saveSession(session);
      return { success: true, message: "Account created successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const session = await authApi.login({ email, password });
      saveSession(session);
      return { success: true, message: "Login successful." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };


  const googleLogin = async (idToken) => {
    try {
      const session = await authApi.google(idToken);
      saveSession(session);
      return { success: true, message: "Google login successful." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    const currentToken = accessToken;
    clearSession();
    if (currentToken) {
      try {
        await authApi.logout(currentToken);
      } catch {
        // Local session is cleared even when the server is unavailable.
      }
    }
  };

  const updateProfile = async (updatedData) => {
    if (!accessToken) return { success: false, message: "You are not logged in." };
    try {
      const updatedUser = await authApi.updateMe(accessToken, updatedData);
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user && !!accessToken,
      isLoading,
      signup,
      login,
      googleLogin,
      logout,
      updateProfile,
    }),
    [user, accessToken, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
