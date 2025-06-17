import { getAuthUser, loginUser, logoutUser } from "@/apis/user";
import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "sonner";

interface authContextType {
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const initialAuthContext: authContextType = {
  username: null,
  setUsername: () => null,
  login: () => null,
  logout: () => null,
};

export const AuthContext = createContext<authContextType>(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);

  // Fetch the authenticated user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getAuthUser();

      if (res.success) {
        setUsername(res.user.username);
      }
    };
    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await loginUser(username, password);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    setUsername(username);
  };
  const logout = async () => {
    const res = await logoutUser();
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    setUsername(null);
  };

  const value = {
    username,
    setUsername,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
